import csv from 'csv-parser'
import fs from 'fs'
const pp = require('../personality.json')
const id = '_f'
const result: any[] = [] // Explicitly define the type of 'result' as 'any[]'
fs.createReadStream('../source/f.csv')
    .pipe(csv())
    .on('data', (data: any) => result.push(data)) // Explicitly define the type of 'data' as 'any'
    .on('end', () => {
        for (var i of result) {
            pp[i["act"] + id] = [{ "role": "system", "content": i["prompt"] }]
        }
        const pppp = JSON.stringify(pp)
        fs.writeFileSync('../personality.json', pppp)
    })


