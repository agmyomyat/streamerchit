import * as aesEcb from 'aes-ecb';
export function decryption(key: string, payload: string) {
  return aesEcb.decrypt(key, payload) as string;
}
export function encryption(key: string, payload: string) {
  return aesEcb.encrypt(key, payload) as string;
}
