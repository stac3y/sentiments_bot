const {Telegraf} = require('telegraf')
require('custom-env').env('staging')
const { SentimentManager } = require('node-nlp');
const bot = new Telegraf(process.env.BOT_TOKEN)

const sentiment = new SentimentManager();

bot.start((ctx) => {
    ctx.reply(`Hi, ${ctx.message.from.first_name}!`)
})

bot.help((ctx) => {
    ctx.reply(`This bot will detect sentiments of text.`)
})

bot.hears(/.*/, (ctx) => {
    // let options = {
    //     extras: {
    //         'cats': 5,
    //         'kittens': 10
    //     }
    // }
    console.log(ctx.message.from.language_code)
    sentiment
        .process(ctx.message.from.language_code, ctx.message.text)
        .then((result) => {
            return ctx.reply(`Score: ${result.score}\nComparative: ${result.comparative}`)
        });
})

bot.launch()