require('dotenv/config'); 
const bip = require('../bot/parser');
const greets = require('../tools/greetings');
const { spawnSync } = require('child_process')

async function getResponse(wit_response) {
    const bot_input = await bip.parseInput(wit_response);
    const bot_response = await getBotResponse(bot_input);
    return bot_response;
}

async function getBotResponse(eval_string) {
    var bot_response = '';
    const { stdout } = spawnSync('python3', ['bot/evalYesNoBot.py', eval_string]);

    bot_response = stdout.toString();
    bot_response = bot_response.trimEnd();
    bot_response = bot_response.substring(1, bot_response.length - 1);
    bot_response = bot_response.split(',');
    bot_response[0] = parseFloat(bot_response[0]);
    bot_response[1] = parseFloat(bot_response[1]);
    console.log(bot_response);

    var actual_response = 'No';    
    if ( bot_response[0] > bot_response[1] ) {
        actual_response = 'Yes';
    }

    return actual_response;
}

function saveBotResponse(bot_input) {
    const fs = require('fs');

}

async function getHello() {
    const index = Math.floor(Math.random() * greets.Greetings.SalutationsResponses.length);
    const bot_response = greets.Greetings.SalutationsResponses[index];
    console.log(bot_response);
    return bot_response;
}

async function getGoodbye() {
    const index = Math.floor(Math.random() * greets.Greetings.FarewellResponses.length);
    const bot_response = greets.Greetings.FarewellResponses[index];
    return bot_response;

}


module.exports = {
    getResponse,
    getHello,
    getGoodbye
}
