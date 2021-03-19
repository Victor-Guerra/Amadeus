const {Wit, log} = require('node-wit');
async function test(req, res) {
    const client = new Wit({
        accessToken: req.body.accessToken,
        logger: new log.Logger(log.DEBUG)
    });

    const message = req.body.message;
    const wit_response = client.message(message);
    res.json(wit_response);
}

module.exports = {
    test
};
