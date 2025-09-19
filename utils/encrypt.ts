import CryptoJS from "crypto-js";

const SECRET_KEY = "qwertyuioplkjhgfdsazxcvbnm1234567890<>{}"; // 前端加密用同一密钥

export function encryptAES(text: string) {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

export function decryptAES(encryptedText: string) {
    const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}