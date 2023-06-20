const axios = require('axios')
const fs = require('fs')
const csv = require('csv-parser')
const result = require('./personality.json')


let step = 3
let success = 0
let failed = 0

const f_result = []
const f_data = async () => {
    const f_url = 'https://raw.githubusercontent.com/f/awesome-chatgpt-prompts/main/prompts.csv'
    return axios({
        url: f_url,
        method: 'GET',
        responseType: 'stream'
    }).then(res => {
        res.data.pipe(csv())
            .on('data', (data) => f_result.push(data))
            .on('end', () => {
                const id = '_f'
                for (var i of f_result) {
                    result[String(i["act"] + id)] = [{ "role": "system", "content": String(i["prompt"]) }]
                }
                step -= 1
                success++
            })

    })
        .catch(err => {
            console.log('download file failed' + err)
            step -= 1
            failed++
        })
}


const plexpt_data = async () => {
    const plexpt_url = 'https://raw.githubusercontent.com/PlexPt/awesome-chatgpt-prompts-zh/main/prompts-zh.json'
    return axios({
        url: plexpt_url,
        method: 'GET',
        responseType: 'application/json'
    }).then(res => {
        const id = '_plexpt'
        for (var i of res.data) {
            result[String(i["act"] + id)] = [{ "role": "system", "content": String(i["prompt"]) }]
        }
        step -= 1
        success++
    }).catch(err => {
        console.log('download file failed' + err)
        step -= 1
        failed++
    })
}



const DAN_data = async () => {
    const DAN_url = 'https://raw.githubusercontent.com/0xk1h0/ChatGPT_DAN/main/README.md'
    return axios({
        url: DAN_url,
        method: 'GET',
        responseType: 'application/text'
    }).then(res => {
        const id = '_DAN'
        const summary = res.data.match(/(?<=<summary>)(.*?)(?=<\/summary>)/g)
        const content = res.data.match(/(?<=<\/summary>)([\s\S]*?)(?=<\/details>)/g)
        for (const i in summary) {
            result[String(summary[i] + id)] = [{ "role": "system", "content": String(content[i]) }]
        }
        step -= 1
        success++
    }).catch(err => {
        console.log('download file failed' + err)
        step -= 1
        failed++
    })
}



const loop = async () => {
    return new Promise(resolve => {
        const intervalID = setInterval(() => {
            if (step < 1) {
                console.log(`Be updating, process: (${3 - step}/3)`)
                const personality = JSON.stringify(result, ' ', 4)
                fs.writeFileSync('personality.json', personality)
                console.log(`update done!\nsuccessed:${success}\nfailed:${failed}`)
                clearInterval(intervalID)
                resolve(result)
            }
            else {
                console.log(`Be updating, process: (${3 - step}/3)`)
            }
        }, 300)
    })

}

const ChatPrompts = {
    personality: result,
    update: async function main(update=false) {
        if(update){
            f_data()
            plexpt_data()
            DAN_data()
        }else{
            step = 0
        }
        return await loop()
    }
}
module.exports = ChatPrompts