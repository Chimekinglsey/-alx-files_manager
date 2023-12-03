const mime = require('mime-types')

console.log(mime.contentType('markdown'))
console.log(mime.contentType('alert.jpeg'))
console.log(mime.lookup('alert.jpeg'))