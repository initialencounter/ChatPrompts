const fs = require('fs')
const personality = fs.readFileSync('./personality-plus.json')

const safe = personality.toString('base64')
fs.writeFileSync('safe',safe)