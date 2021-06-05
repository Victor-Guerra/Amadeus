const http = require('http-request');
const reqController = require('../controller/requestController');
const { Greetings } = require('../tools/greetings');

test('Sends an example message to the wit.ai, then back to the api', () => {
    http.post({
            url: "https://amadeus-ar.herokuapp.com/api/message",
            method: "POST",
            reqBody: {
               "message": "Hello"
           }
           }, function (err, res)  {
            if(err) {
                console.error(err);
            }
            return Greetings.SalutationsResponses.includes(expect(res).resolves);
    });
});
