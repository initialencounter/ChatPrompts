const XLSX = require('xlsx')
import fs from 'fs';

const workbook = XLSX.readFile('../source/kzk.xlsx')
const sheetName = workbook.SheetNames["0"]

const worksheet = workbook.Sheets[sheetName];
const jsonData = XLSX.utils.sheet_to_json(worksheet)
const name_list:any[] = []
const ppp = require('../src/personality.json')
for(var i of jsonData){
    let key:any = i['__EMPTY']
    let count = 1
    const key_s = key
    while(name_list.includes(key)){
        key = key_s+String(count)
        count++
    }
    name_list.push(key)
    const value = i[' 关注公众号：                                                                 加我进群聊：']
    ppp[key+"_kzk"]=[{"role":"system","content":value}]
}
const pppp = JSON.stringify(ppp)
fs.writeFileSync('../personality.json',pppp)