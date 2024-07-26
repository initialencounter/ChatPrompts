import axios from 'axios'
import fs from 'fs'
let new_personality = {}
let count = 0


async function chat_with_gpt_stream(text,cont) {
    let message = [{ role: 'system', content: '你是一个翻译引擎，请将文本翻译为' + '中文' + '，只需要翻译不需要解释。' }, { role: 'user', content: `请帮我我将如下文字翻译成${'中文'},“${text}”` }]
    let contents = '';
    axios({
        method: 'POST',
        url: `https://api.chatanywhere.com.cn/v1/chat/completions`,
        headers: {
            Authorization: `Bearer skly6`,
            'Content-Type': 'application/json',
        },
        responseType: 'stream',
        data: {
            model: 'gpt-3.5-turbo',
            temperature: 0,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            messages: message,
            stream: true
        },
        timeout: 0
    }).then(response => {
        response.data.on('data', async (chunk) => {
            const new_string = chunk.toString();
            const json = new_string.match(/(?<="delta":{"content":")(.*?)(?="},"logprobs")/g);
            for(var i of json??[]){
                process.stdout.write(i)
                contents += i;
            }
        });
        response.data.on('end', () => {
            console.log('')
            console.log("-----------------------------------------------------------------------------------------------------------------------------------------------------------------------");
            let title = contents
            console.log(title)
            if(new_personality[title]){
                title+= String(count)
            }
            new_personality[title]=cont
            const personality = JSON.stringify(new_personality, null, 4)
            fs.writeFileSync('new_personality.json', personality)
            count++
        });
    })
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }