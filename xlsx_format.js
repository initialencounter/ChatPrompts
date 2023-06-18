const XLSX = require('xlsx')
const fs = require('fs')

const workbook = XLSX.readFile('./卡兹克-Prompt指令大全.xlsx')
const sheetName = workbook.SheetNames["0"]

const worksheet = workbook.Sheets[sheetName];
const jsonData = XLSX.utils.sheet_to_json(worksheet)
const name_list = []
const ppp = require('./personality.json')
for(var i of jsonData){
    let key = i['__EMPTY']
    let count = 1
    const key_s = key
    while(name_list.includes(key)){
        key = key_s+String(count)
        count++
    }
    name_list.push(key)
    const value = i[' 关注公众号：                                                                 加我进群聊：']
    ppp[key+"_kzk"]=[{"role":"system","content":value}],
    console.log(key)
}
const pppp = JSON.stringify(ppp)
const name_list_str = JSON.stringify(name_list)
fs.writeFileSync('./personality.json',pppp)