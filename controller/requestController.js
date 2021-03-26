const {Wit, log} = require('node-wit');
const responseManager = require('../manager/responseManager');
require('dotenv/config');

const client = new Wit({
    accessToken: process.env.MY_TOKEN,
    logger: new log.Logger(log.DEBUG)
});

async function test(req, res) {
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
