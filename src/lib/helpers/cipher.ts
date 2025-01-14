/**
 * Password encryption and Decryption functions
*/

import { LOCALSTORAGE_KEYS } from "@/constants";
import { getDataFromLocalStorage, saveDataToLocalStorage } from "./utils";


/**
 * 
 * @returns a publicKey and a Private Key
 * Public key is stored in database and is accessible to others.
 * It is used to encrypt the sender's credential using this public key
 * 
 * Private Key is stored in User's browser. It is used to Decrypt the credentials that was shared to him
 * The Public & Private key are a pair, one is used for encryption and other for decryption
 */

export const generateKeyPair = async () => {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048, // Key size in bits
      publicExponent: new Uint8Array([1, 0, 1]), // Standard exponent
      hash: "SHA-256",
    },
    true, // Keys are extractable
    ["encrypt", "decrypt"]
  );

  // Export keys for storage
  const publicKey = await crypto.subtle.exportKey("spki", keyPair.publicKey);
  const privateKey = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

  return { publicKey, privateKey };
}

/**
 * convert the ArrayBuffer to a Base64 string for storing it in database
*/

export const convertPublickKeytoBase64 = (publicKey : ArrayBuffer) => {
  const binary = String.fromCharCode(...new Uint8Array(publicKey));
  return btoa(binary); // Converts binary to Base64
}

export const convertBase64ToArrayBuffer = (base64 : string) => {
  const binary = atob(base64); // Decodes Base64 back to binary
  const buffer = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    buffer[i] = binary.charCodeAt(i);
  }
  return buffer.buffer;
}


export const generatePrivateEncryptionKey = async (email : string, masterPassword: string) => {
  const encoder = new TextEncoder();
  const salt = encoder.encode(email);
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(masterPassword),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  const key = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-CBC", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  return key;
}


export const storeKeyLocally = async (key : CryptoKey) => {
  // Export the CryptoKey to JWK format
  const exportedKey = await crypto.subtle.exportKey("jwk", key);

  // Convert to JSON and store in localStorage
  saveDataToLocalStorage(LOCALSTORAGE_KEYS.ENCRYPTION_KEY, exportedKey)
  console.log("Key stored in localStorage");
}

export const getKeyFromLocalStorage = async () => {
  // Get the JSON string from localStorage
  const importedKeyData = getDataFromLocalStorage(LOCALSTORAGE_KEYS.ENCRYPTION_KEY);

  if (!importedKeyData) {
    return null;
  }

  // Re-import the key into a CryptoKey object
  const key = await crypto.subtle.importKey(
    "jwk", // The format of the key
    importedKeyData,
    { name: "AES-CBC", length: 256 }, // Algorithm and key details
    true, // Whether the key is extractable
    ["encrypt", "decrypt"] // Key usage
  );

  console.log("Key retrieved from localStorage");
  return key;
}

/**
 * 
 * @param password 
 * @param key 
 * @returns Iv and Encrypted Password strings
 * This is used to to encrypt user's own credential for storing in database
 */

export const encryptPassword = async (password : string, key : CryptoKey ) => {
  const iv = window.crypto.getRandomValues(new Uint8Array(16)); // Random IV
  const encoder = new TextEncoder();
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: "AES-CBC",
      iv: iv,
    },
    key,
    encoder.encode(password)
  );

  return {
    encryptedPassword: Buffer.from(encrypted).toString("base64"),
    iv: Buffer.from(iv).toString("base64"),
  };
}

/**
 * 
 * @param encryptedPassword 
 * @param iv 
 * @param key 
 * @returns the final plain password which can be copied
 */

export const decryptPassword = async (encryptedPassword : string, iv : string, key : CryptoKey) => {

  // console.log({ encryptedPassword, iv, key })
  const decoder = new TextDecoder();
  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "AES-CBC",
      iv: Buffer.from(iv, "base64"),
    },
    key,
    Buffer.from(encryptedPassword, "base64")
  );

  return decoder.decode(decrypted);
}


export const encryptCredentialForSharing = async (password : string, recipientPublicKey : string) => {
  /**
   * note the recipientPublicKey needs to be converted back into Array Buffer format for encrypting the credential
  */

  const recipientPublicKeyArrayBuffer = convertBase64ToArrayBuffer(recipientPublicKey)
  const publicKey = await crypto.subtle.importKey(
    "spki",
    recipientPublicKeyArrayBuffer,
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["encrypt"]
  );

  const encryptedPassword = await crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    publicKey,
    new TextEncoder().encode(password)
  );

  return encryptedPassword;
}
