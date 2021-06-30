const {
    Client
} = require('whatsapp-web.js')

const qrcode = require('qrcode-terminal')
const fs = require('fs')
const ffmpeg = require('ffmpeg-static')

const client = new Client({
    session: require('./session.json'),
    ffmpegPath: ffmpeg
})
client.on('qr', (qr) => {
    qrcode.generate(qr, {
        small: true
    })
})

client.on('authenticated', (session) => {
    fs.writeFileSync('./session.json', JSON.stringify(session))
})

client.on('ready', () => {
    console.log('Client is ready!')
})

client.on('message', (msg) => {
    require('./message-handler')(client, msg)
})

client.initialize()