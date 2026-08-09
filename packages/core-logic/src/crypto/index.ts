import CryptoJS from 'crypto-js';
import { ElsaVault, EncryptedData } from '../types';

/**
 * 1. Hàm tạo Chìa Khóa Mã Hóa từ Mật Khẩu Chủ
 * Sử dụng thuật toán PBKDF2 (Chuẩn an ninh mạng)
 */
export const generateEncryptionKey = (password: string, salt: string): string => {
  try {
    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: 256 / 32, // AES-256
      iterations: 10000   // Tăng độ khó để chống Brute-force
    });
    return key.toString(CryptoJS.enc.Hex);
  } catch (error) {
    console.error("Lỗi khi sinh Key: ", error);
    throw new Error("Không thể sinh khóa mã hóa.");
  }
};

/**
 * 2. Hàm Đóng Băng Két Sắt (Mã Hóa AES)
 * Biến toàn bộ cục JSON của Két sắt thành một chuỗi vô nghĩa
 */
export const encryptVault = (vaultData: ElsaVault, masterPassword: string): EncryptedData => {
  try {
    // 1. Sinh Salt ngẫu nhiên và IV (Initialization Vector)
    const salt = CryptoJS.lib.WordArray.random(128 / 8).toString();
    const iv = CryptoJS.lib.WordArray.random(128 / 8);

    // 2. Tạo Key từ Master Password + Salt
    const key = generateEncryptionKey(masterPassword, salt);
    const keyHex = CryptoJS.enc.Hex.parse(key);

    // 3. Chuyển Vault thành chuỗi String
    const jsonString = JSON.stringify(vaultData);

    // 4. Mã hóa bằng AES
    const encrypted = CryptoJS.AES.encrypt(jsonString, keyHex, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return {
      salt: salt,
      iv: iv.toString(),
      cipherText: encrypted.toString()
    };
  } catch (error) {
    console.error("Lỗi đóng băng Két Sắt:", error);
    throw new Error("Đóng băng thất bại.");
  }
};

/**
 * 3. Hàm Giải Nén Két Sắt (Giải Mã AES)
 */
export const decryptVault = (encryptedData: EncryptedData, masterPassword: string): ElsaVault => {
  try {
    // 1. Tạo lại Key từ Master Password và Salt cũ
    const key = generateEncryptionKey(masterPassword, encryptedData.salt);
    const keyHex = CryptoJS.enc.Hex.parse(key);
    const iv = CryptoJS.enc.Hex.parse(encryptedData.iv);

    // 2. Giải mã
    const decrypted = CryptoJS.AES.decrypt(encryptedData.cipherText, keyHex, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    // 3. Ép kiểu về chuỗi JSON
    const jsonString = decrypted.toString(CryptoJS.enc.Utf8);
    
    if (!jsonString) {
      throw new Error("Mật khẩu chủ không đúng hoặc file đã bị hỏng.");
    }

    return JSON.parse(jsonString) as ElsaVault;
  } catch (error) {
    console.error("Lỗi giải nén Két Sắt:", error);
    throw new Error("Sai mật khẩu hoặc file bị hỏng.");
  }
};
