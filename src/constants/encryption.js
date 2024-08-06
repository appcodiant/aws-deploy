const crypto = require("crypto");
require('dotenv').config();


const key = crypto
    .createHash('sha512')
    .update(process.env.SECRET_KEY)
    .digest('hex')
    .substring(0, 32);

const encryptionIV = crypto
    .createHash('sha512')
    .update(process.env.SECRET_IV)
    .digest('hex')
    .substring(0, 16);

const decryptData = (encryptedData) => {
    console.log(process.env.JWT_SECRET);
    const buff = Buffer.from(encryptedData, 'base64');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, encryptionIV);
    return (
        decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
        decipher.final('utf8')
    );
}

const encryptData = (data) => {
    console.log('data', data);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, encryptionIV)
    return Buffer.from(
        cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
    ).toString('base64') // Encrypts data and converts to hex and base64
}

module.exports = {
    encryptData,
    decryptData
};