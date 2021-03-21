require('dotenv/config'); 

async function getResponse(wit_response) {
    const intents = wit_response.intents;
    const entities = wit_response.entities;
    const traits = wit_response.traits;

    return 'Thanks ^^';
}


module.exports = {
    getResponse
}
