let crypto = require('crypto')
let Buffer = require('node:buffer')

const data = 'about'

// reproducible 1:1 ciphertext:plaintext relationship
// problems from a cryptographic POV:
// IV not randomized
// algorithm is weak
// key/IV not from proper random source
const iv = Buffer.Buffer.from([0xdb, 0x2f, 0x95, 0x7d, 0x5e, 0xd8, 0x4c, 0x9a, 0xa5, 0x59, 0xb9, 0x50, 0xc7, 0x8a, 0x0f, 0xe4])
const key = Buffer.Buffer.from([0x33, 0x81, 0x71, 0x30, 0x3f, 0x07, 0x44, 0x05, 0xaa, 0x14, 0x7d, 0xdc, 0x16, 0xaa, 0xae, 0x8d])

let mykey = crypto.createCipheriv('aes-128-cbc', key, iv)
let mystr = mykey.update(data, 'utf8', 'base64url')
mystr += mykey.final('base64url')

console.log(mystr)

mykey = crypto.createDecipheriv('aes-128-cbc', key, iv)
mystr = mykey.update(mystr, 'base64url', 'utf8')
mystr += mykey.final('utf8')

console.log(mystr) //about