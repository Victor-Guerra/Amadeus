require('dotenv/config'); 
const bip = require('../bot/parser');

async function getResponse(wit_response) {
    const bot_input = bip.parseInput(wit_response);
    const bot_response = processData(wit_response);
    return bot_response;
}

function processData(wit_response){
    const intents = wit_response.intents;
    const entities = wit_response.entities;
    const traits = wit_response.traits;

    /*
     * Super Complex logic, etc.
     */
    const bot_response = 'Thanks ^^';
    return bot_response
}

async function getBotResponse(eval_string) {
    const python = spawn('python3', ['../bot/evalYesNoBot.py', eval_string]);
    var bot_response;
    python.stdout.on('data', function (data) {
        bot_response = data.toString();
    });

    python.on('close', (code) => {
        return bot_response;
    });
}

function saveBotResponse(bot_input) {
    const fs = require('fs');

}


module.exports = {
    getResponse
}
