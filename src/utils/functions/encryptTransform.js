import CryptoJS from "crypto-js";

// Create a transform for encrypting and decrypting the state
export const encryptTransform = {
  in: (inboundState) => {
    // Encrypt the inbound state before persisting it
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(inboundState),
      "dine savvy admin web panel"
    ).toString();
    return encrypted;
  },
  out: (outboundState) => {
    // Decrypt the persisted state when rehydrating
    const bytes = CryptoJS.AES.decrypt(
      outboundState,
      "dine savvy admin web panel"
    );
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decrypted;
  },
};
