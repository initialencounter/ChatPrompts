import axios from 'axios'

async function chat_with_gpt(text) {
    let message = [{ role: 'system', content: '你是一个翻译引擎，请将文本翻译为' + '中文' + '，只需要翻译不需要解释。' }, { role: 'user', content: `请帮我我将如下文字翻译成${'中文'},“${text}”` }]
    const res = await axios({
        method: 'POST',
        url: `https://api.chatanywhere.com.cn/v1/chat/completions`,
        headers: {
            Authorization: `Bearer sk-GxM30Cliw`,
            'Content-Type': 'application/json',
        },
        data: {
            model: 'gpt-3.5-turbo',
            temperature: 0,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            messages: message
        },
        timeout: 0
    })
    console.dir(res.data)
    console.dir(res.data["choices"])
    console.dir(res.data["choices"][0])
}


chat_with_gpt('hello')