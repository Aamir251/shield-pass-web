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
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );

  const { publicKey, privateKey } = keyPair



  return { publicKey: publicKey, privateKey: privateKey };
}

/**
 * convert the CryptoKey to a Base64 string for storing it in database
 * Used for converting Public Key to String format
*/

export const convertCryptoKeyToString = async (publicKey: CryptoKey) => {
  // Export the key in a spki format
  const exportedKey = await window.crypto.subtle.exportKey("spki", publicKey);

  // Convert the ArrayBuffer to a Base64 string
  const base64Key = btoa(String.fromCharCode(...new Uint8Array(exportedKey)));

  return base64Key; // This can be stored in the database
}


/**
 * convert the String to a CryptoKey for encrypting Credentials for Sharing
 * Used for converting Public Key stored in string format back to CryptoKey
*/

export const convertStringToCryptoKey = async (base64Key: string): Promise<CryptoKey> => {
  // Decode the Base64 string into an ArrayBuffer
  const binaryKey = Uint8Array.from(atob(base64Key), (char) => char.charCodeAt(0));

  // Import the ArrayBuffer back into a CryptoKey
  const publicKey = await window.crypto.subtle.importKey(
    "spki", // Same format used during export
    binaryKey.buffer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true, // Extractable
    ["encrypt"] // Use for encryption
  );

  return publicKey;
};

export const convertArrayBuffertoString = (publicKey : ArrayBuffer) => {
  const binary = String.fromCharCode(...new Uint8Array(publicKey));
  return btoa(binary); // Converts binary to Base64
}

export const convertStringToArrayBuffer = (base64 : string) => {
  const binary = atob(base64); // Decodes Base64 back to binary
  const buffer = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    buffer[i] = binary.charCodeAt(i);
  }
  return buffer.buffer;
}


/**
 * 
 * @param email 
 * @param masterPassword 
 * @returns encrypion key that is used to encrypt & decrypt user's credentials
 */
export const generateEncryptionKey = async (email: string, masterPassword: string) => {
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


export const storeEncryptionKeyLocally = async (key: CryptoKey) => {
  // Export the CryptoKey to JWK format
  const exportedKey = await crypto.subtle.exportKey("jwk", key);

  // Convert to JSON and store in localStorage
  saveDataToLocalStorage(LOCALSTORAGE_KEYS.ENCRYPTION_KEY, exportedKey)
  console.log("Key stored in localStorage");
}

export const getEncryptionKeyFromLocalStorage = async () => {
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



export const encryptCredentialPassword = async (password: string, key: CryptoKey) => {
  const encoder = new TextEncoder();
  const iv = window.crypto.getRandomValues(new Uint8Array(16)); // Random IV for security

  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-CBC", iv },
    key,
    encoder.encode(password)
  );

  return {
    iv: Buffer.from(iv).toString("base64"),
    data: Buffer.from(encrypted).toString("base64"),
  };
}

/**
 * 
 * @param data 
 * @param iv 
 * @param key 
 * @returns the final plain password which can be copied
 */

export const decryptCredentialPassword = async (
  data: string,
  iv: string,
  key: CryptoKey
): Promise<string> => {
  const decoder = new TextDecoder();

  // Convert the Base64 strings back to Uint8Array
  const ivArray = Uint8Array.from(atob(iv), (char) => char.charCodeAt(0));
  const encryptedArray = Uint8Array.from(
    atob(data),
    (char) => char.charCodeAt(0)
  );

  // Decrypt the password
  const decrypted = await window.crypto.subtle.decrypt(
    { name: "AES-CBC", iv: ivArray },
    key,
    encryptedArray
  );

  // Decode and return the original password
  return decoder.decode(decrypted);
};


export const encryptSharedPrivateKey = async (privateKey: CryptoKey, masterPassword: string) => {
  // Step 1: Convert CryptoKey to Base64 string
  const exportedKey = await window.crypto.subtle.exportKey("pkcs8", privateKey);
  const base64Key = btoa(String.fromCharCode(...new Uint8Array(exportedKey)));

  // Step 2: Derive encryption key from master password
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(masterPassword),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  const encryptionKey = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt"]
  );

  // Step 3: Encrypt the Base64 string
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    encryptionKey,
    encoder.encode(base64Key)
  );

  // Combine the salt, IV, and encrypted data into a single string for storage
  return {
    salt: btoa(String.fromCharCode(...salt)),
    iv: btoa(String.fromCharCode(...iv)),
    data: btoa(String.fromCharCode(...new Uint8Array(encryptedData))),
  };
};


type EncrytedSharedPrivateKey = {
  salt : string
  iv : string
  data : string
}


export const decryptSharedPrivateKey = async (
  encrypted: { salt: string; iv: string; data: string },
  masterPassword: string
): Promise<CryptoKey> => {
  const decoder = new TextDecoder();

  // Step 1: Decode the salt, IV, and encrypted data from Base64
  const salt = Uint8Array.from(atob(encrypted.salt), (c) => c.charCodeAt(0));
  const iv = Uint8Array.from(atob(encrypted.iv), (c) => c.charCodeAt(0));
  const encryptedData = Uint8Array.from(atob(encrypted.data), (c) => c.charCodeAt(0));

  // Step 2: Derive the decryption key from the master password
  const encoder = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(masterPassword),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  const decryptionKey = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["decrypt"]
  );

  // Step 3: Decrypt the Base64 private key string
  const decryptedData = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    decryptionKey,
    encryptedData
  );

  const base64Key = decoder.decode(decryptedData);

  // Step 4: Decode the private key from the Base64 string to an ArrayBuffer
  const exportedKey = Uint8Array.from(atob(base64Key), (c) => c.charCodeAt(0)).buffer;

  // Step 5: Import the private key back into a CryptoKey object
  const privateKey = await window.crypto.subtle.importKey(
    "pkcs8",
    exportedKey,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["decrypt"]
  );

  return privateKey;
};


export const encryptSharedCredentialPassword = async (password : string, recipientPublicKey : CryptoKey) => {


  const recipientKey = await crypto.subtle.exportKey("spki", recipientPublicKey)


  const publicKey = await crypto.subtle.importKey(
    "spki",
    recipientKey,
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["encrypt"]
  );

  const encrytedPassword = await crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    publicKey,
    new TextEncoder().encode(password)
  );

  return convertArrayBuffertoString(encrytedPassword);
}


export const decryptSharedCredentialPassword = async (password : string, recipientPrivateKey : CryptoKey) => {

  const privateRecipientKey = await crypto.subtle.exportKey("pkcs8", recipientPrivateKey)

  const passwordInBufferArray = convertStringToArrayBuffer(password)


  const privateCryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    privateRecipientKey,
    { name: "RSA-OAEP", hash: "SHA-256" },
    true,
    ["decrypt"]
  )


  const decryptedCredential = await crypto.subtle.decrypt(
    { name: "RSA-OAEP" },
    privateCryptoKey,
    passwordInBufferArray
  );


  return new TextDecoder().decode(decryptedCredential)

}