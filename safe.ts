import fs from 'fs'
const personality = fs.readFileSync('./personality-plus.json').toString("base64")
fs.writeFileSync('safe',personality)
