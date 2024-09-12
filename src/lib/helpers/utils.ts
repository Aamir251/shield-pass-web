import crypto from "crypto"

export const getFieldsThatHaveChanged = <T extends object>(
  objectOne: T,
  objectTwo: T
): (keyof T)[] => {
  let changedFields: (keyof T)[] = [];

  (Object.keys(objectOne) as (keyof T)[]).forEach((key) => {
    if (objectOne[key] !== objectTwo[key]) {
      changedFields.push(key);
    }
  });

  return changedFields;
};

export const extractProperties = <T extends object, K extends keyof T>(
  obj: T,
  keysArray: K[]
): Partial<T> => {
  return keysArray.reduce((acc, key) => {
    if (key in obj) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as Partial<T>);
};



export const hashPassword = async (password: string) => {
  const secret = process.env.NEXTINNERPASS_SECRET as string;

  const key = getKey(secret); // Ensure key is 32 bytes for AES-256
  const iv = crypto.randomBytes(16); // 16 bytes IV for AES-CBC
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Convert the key to a hex string
  const keyHex = key.toString('hex');
  const ivHex = iv.toString('hex');

  // Send the iv, encrypted data, and key as a hex string
  return `${ivHex}:${encrypted}:${keyHex}`;
};

/**
 * If the url does not contain https:// it adds it
 */
export const formatWebsiteUrl = (url: string) => {
  return url.includes("https://") ? url : `https://${url}`;
};



function getKey(secret: string) {
  return crypto.createHash('sha256').update(secret).digest(); // 32-byte key for AES-256
}