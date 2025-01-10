/**
 * Key ecryption and Decryption functions
 */

export const generatePublicEncryptionKey = async (email : string, masterPassword: string) => {
  const encoder = new TextEncoder();
  const salt = encoder.encode(email); // You can store a unique salt for each user
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
      salt: salt,
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
  localStorage.setItem("sp-pub-key", JSON.stringify(exportedKey));
  console.log("Key stored in localStorage");
}

export const getKeyFromLocalStorage = async () => {
  // Get the JSON string from localStorage
  const keyData = localStorage.getItem("sp-pub-key");

  if (!keyData) {
    return null;
  }

  // Parse the JSON back to an object
  const importedKeyData = JSON.parse(keyData);

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


export const decryptPassword = async (encryptedPassword : string, iv : string, key : CryptoKey) => {
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
