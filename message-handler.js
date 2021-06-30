module.exports = async (client, msg) => {
    if (msg.body === '!ping') {
        msg.reply('pong')
    }
    const command = msg.body.toLowerCase().split(' ')[0] || ''
    switch (command) {
        case '!ping':
            msg.reply('pong')
            break
        case '!sticker':
        case '!stiker':
            if (msg.hasQuotedMsg) {
                const quotedMsg = await msg.getQuotedMessage()
                if (quotedMsg.hasMedia) {
                    const chat = await msg.getChat()
                    const media = await quotedMsg.downloadMedia()
                    chat.sendMessage(media, {
                        sendMediaAsSticker: true
                    })
                } else {
                    msg.reply('Please include media to your command!')
                }
            } else {
                if (msg.hasMedia) {
                    const chat = await msg.getChat()
                    const media = await msg.downloadMedia()
                    chat.sendMessage(media, {
                        sendMediaAsSticker: true
                    })
                } else {
                    msg.reply('Please include media to your command!')
                }
            }
            break
    }
}