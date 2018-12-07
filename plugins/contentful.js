const contentful = require('contentful')

module.exports = contentful.createClient({
    space: process.env.CTF_SPACE_ID,
    accessToken: process.env.CTF_ACCESS_TOKEN
})

console.log('--CTF_ACCESS_TOKEN---')
console.log(process.env.CTF_ACCESS_TOKEN)
console.log('---------------')
