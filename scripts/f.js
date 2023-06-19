const csv = require('csv-parser')
const fs = require('fs')
const pp = require('../personality.json')
const id = '_f'
const result = []
fs.createReadStream('../source/f.csv')
    .pipe(csv())
    .on('data',(data)=> result.push(data))
    .on('end',()=>{
        for(var i of result){
            pp[i["act"]+id] = [{"role":"system","content":i["prompt"]}]
        }
        const pppp = JSON.stringify(pp)
        fs.writeFileSync('../personality.json',pppp)
    })


