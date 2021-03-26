const brain = require('brain.js'); 
const fs = require('fs');

var words_text = fs.readFileSync('./words2', 'utf8');
const words = words_text.split('\n');
var word_pairs = [];

/*
for( i = 0; i < words.length; i++ ) {
    words[i].trim()
    pair = words[i].split('\t');
    if( pair[1] ) {
        word_pairs.push({
            "word": pair[1],
            "type": pair[2]
            });
    }
    
}
*/

function getHash(toHash) {
    var output = ""
    //console.log(toHash);
    for (i = 0; i < toHash.length; i++) {
        var digit = toHash.charCodeAt(i);
        output = output + digit;
    }
    var denom = 1;
    for (i = 0; i < output.length; i++) {
        denom = denom * 10;
    }
    //console.log(output / denom);
    return output / denom;
}

function getInputFromWit(wit_response) {
    var sample_text = fs.readFileSync(wit_response, 'utf8');
    const sample = JSON.parse(sample_text);
    const entities = sample["entities"];
    var input = [];

    for(var i = 0; i < Object.keys(entities).length; i++) {
        var key = Object.keys(entities)[i];
        const entity = entities[key][0];

        const body = getHash(entity["body"]);
        const pos = entity["start"] / entity["end"];
        const role = getHash(entity["role"]);

        
        if(entity["entities"][0] != undefined){
            const entity2 = entity["entities"][0]; 
            const body2 = getHash(entity2["body"]);
            const role2 = getHash(entity2["role"]);
            
            input.push([
                body2,
                pos,
                role2
            ]);
        }

        input.push([
             body,
             pos,
             role
        ]);
    }
    console.log(input);
    return input;
}

const bot = new brain.recurrent.LSTM({
    //inputSize: 5,
    activation: 'relu',
    hiddenLayers: [3,3],
    outputSize: 2
});

const data = [
    {
        input: getInputFromWit('./obo'),
        output: {Yes: 1, No: 0},
    },
];

var out = getHash('obos');

bot.train(
    data,
    {
        log: (detail) => console.log(detail),
        iterations: 10
    });

