const contentful = require('contentful')


const clinet = contentful.createClient({
    space: process.env.CTF_SPACE_ID,
    accessToken: process.env.CTF_ACCESS_TOKEN
})

module.exports = clinet
