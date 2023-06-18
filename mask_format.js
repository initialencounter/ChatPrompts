const p = require('./masks (1).json')
const fs = require('fs')
const pp = require('./personality.json')
const id = '_mask'
for(var i of p){
    pp[i["name"]+id] = i["context"]
}
const pppp = JSON.stringify(pp)
const ppppp = pppp.replace(/,"date":""/g,'')
fs.writeFileSync('./personality.json',ppppp)