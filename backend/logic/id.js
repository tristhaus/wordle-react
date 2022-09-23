const crypto = require('crypto')
const { Buffer } = require('node:buffer')

// reproducible 1:1 ciphertext:plaintext relationship
// problems from a cryptographic POV:
// IV not randomized
// algorithm is weak
// key/IV not from proper random source
const iv = Buffer.from([0xdb, 0x2f, 0x95, 0x7d, 0x5e, 0xd8, 0x4c, 0x9a, 0xa5, 0x59, 0xb9, 0x50, 0xc7, 0x8a, 0x0f, 0xe4])
const key = Buffer.from([0x33, 0x81, 0x71, 0x30, 0x3f, 0x07, 0x44, 0x05, 0xaa, 0x14, 0x7d, 0xdc, 0x16, 0xaa, 0xae, 0x8d])

const algorithm = 'aes-128-cbc'
const utf8Encoding = 'utf8'
const base64UrlEncoding = 'base64url'

const getId = word => {
    const cipher = crypto.createCipheriv(algorithm, key, iv)
    let id = cipher.update(word, utf8Encoding, base64UrlEncoding)
    id += cipher.final(base64UrlEncoding)

    return id
}

const getWord = id => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv)
    let word = decipher.update(id, base64UrlEncoding, utf8Encoding)
    word += decipher.final(utf8Encoding)

    return word
}

module.exports = { getId, getWord }
