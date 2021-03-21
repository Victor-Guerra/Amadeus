const {Wit, log} = require('node-wit');
const responseManager = require('../manager/responseManager');
require('dotenv/config');

const client = new Wit({
    accessToken: process.env.MY_TOKEN,
});

async function test(req, res) {
    const message = req.body.message;
    const wit_response = client.message(message);
    res.json(wit_response);
}

async function handleMessage(req, res) {
    const message = req.body.message;
    const wit_response = await client.message(message);
    const bot_response = await responseManager.getResponse(wit_response);
    res.json(bot_response);
}

module.exports = {
    test,
    handleMessage
};
