const p = require('../source/plexpt.json')
const fs = require('fs')
const pp = require('../src/personality.json')
const id = '_plexpt'
for(var i of p){
    pp[i["act"]+id] = [{"role":"system","content":i["prompt"]}]
}
const pppp = JSON.stringify(pp)
fs.writeFileSync('../personality.json',pppp)