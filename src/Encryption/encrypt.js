import CryptoJS from "crypto-js";

const key = process.env.REACT_APP_ENCRYPT_KEY;
// Encrypt function using AES
export function encryptAES(message) {
  var encrypted = CryptoJS.AES.encrypt(message, key);
  return encrypted.toString();
}

// Decrypt function using AES
export function decryptAES(ciphertext) {
  var decrypted = CryptoJS.AES.decrypt(ciphertext, key);
  return decrypted.toString(CryptoJS.enc.Utf8);
}
