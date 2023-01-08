
const crypto = require("crypto");

const algorithm = "aes-256-cbc"; 

const initVector = crypto.randomBytes(16);
const Securitykey = crypto.randomBytes(32);
const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

module.exports=(link)=>{
    const message = link;
    let encryptedData = cipher.update(message, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    return encryptedData;
}
