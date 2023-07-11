"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryption = exports.decryption = void 0;
const aesEcb = require("aes-ecb");
function decryption(key, payload) {
    return aesEcb.decrypt(key, payload);
}
exports.decryption = decryption;
function encryption(key, payload) {
    return aesEcb.encrypt(key, payload);
}
exports.encryption = encryption;
//# sourceMappingURL=aes-ecb.js.map