import * as CryptoJS from 'crypto-js';

export function hashString(str: string): string {
  const fullHash = CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex);
  return fullHash.substring(0, 32);
}
