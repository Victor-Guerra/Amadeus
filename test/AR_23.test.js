const http = require('http-request');
const reqController = require('../controller/requestController');

test('Sends an example message to the wit.ai, then back to the api', () => {
    http.post({
            url: "http://localhost:3000/api/message",
            method: "POST",
            reqBody: {
               "message": "How are you?"
           }
           }, function (err, res)  {
            if(err) {
                console.error(err);
            }
            return expect(res).resolves.toEqual('Thanks ^^');
                    
    });
});
