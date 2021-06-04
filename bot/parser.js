const fs = require('fs');
const dicts = require('./utility');
const wl = require('./words');

function getBodyIndex(body_text) {
    let index = wl.wordlist[body_text.toLowerCase()];
    return index;
}

function mapEntityToInteger(name, role) {
    var x1 = 0;
    var x2 = 0;
    var y = 0;
    var z = 0;
    let definingEntities = {
        0:{},
        1:dicts.Dictionaries.adjectiveSubcatDict, 
        2:dicts.Dictionaries.adverbSubcatDict, 
        3:dicts.Dictionaries.conjunctionSubcatDict,
        4:dicts.Dictionaries.interjectionSubcatDict,
        5:dicts.Dictionaries.nounSubcatDict,
        6:dicts.Dictionaries.prepositionSubcatDict,
        7:dicts.Dictionaries.pronounSubcatDict,
        8:dicts.Dictionaries.tenseSubcatDict,
        9:dicts.Dictionaries.verbSubcatDict
        };

    if (name in dicts.Dictionaries.objectiveStructuralDict) {
        const value = dicts.Dictionaries.objectiveStructuralDict[name];
        if (value < 3) {
            y = value;
        } else {
            z = value;
        }
    }

    if (name in dicts.Dictionaries.definingEntityDict) {
        const name_value = dicts.Dictionaries.definingEntityDict[name];
        const role_value = definingEntities[name_value][role];

        x1 = name_value;
        x2 = role_value;
        if( x2 == undefined ) {
            x2 = 0;     
        }
    }

    return [x1,x2,y,z];
}


async function parseInput(wit_response) {
    const intent = wit_response["intents"];
    const entities = wit_response["entities"];
    const traits = wit_response["traits"];
    const text = wit_response["text"];
 
    var intent_name = "";
    if (intent[0] != undefined) {
        intent_name = intent[0]["name"];
    }
    var intent_value = 2;
    if(intent_name != "") {
        intent_value = dicts.Dictionaries.intentsDict[intent_name] / 5;
    }

    var trait_values = [0,0,0,0,0,0,0];
    for(var i = 0; i < Object.keys(traits).length; i++) {
        var key = Object.keys(traits)[i];

        const value = traits[key][0]["value"];
        const index = dicts.Dictionaries.traitsDict[key];
        trait_values[index] = value / 5;

    }

    const output = [intent_value];
    var i = 0;
    for(var i = 0; i < trait_values.length; i++) {
        output.push(Number(trait_values[i]));
    }



    var entities_values = []
    for(var i = 0; i < Object.keys(entities).length; i++) {
        var key = Object.keys(entities)[i];
        const entity = entities[key][0];
        
        var body = getBodyIndex(entity["body"]);
        if (body == undefined) {
            body = 0;
        }
        const position = entity["start"] / text.length;

        var entities_string = "";
        const name = entity["name"];
        const role = entity["role"];

        var indicators = mapEntityToInteger(name, role);
        var x1 = indicators[0];
        var x2 = indicators[1];
        var y = indicators[2];
        var z = indicators[3];

        if (entity["entities"][0] != undefined) {
            const name2 = entity["entities"][0]["name"];
            const role2 = entity["entities"][0]["role"];
            var indicators2 = mapEntityToInteger(name2, role2);

            x1 = indicators2[0] != 0 ? indicators2[0] : x1;
            x2 = indicators2[1] != 0 ? indicators2[1] : x2;
            y  = indicators2[2] != 0 ? indicators2[2] : y;
            z  = indicators2[3] != 0 ? indicators2[3] : z;
        }
        entities_string = "0." + x1.toString() + x2.toString() + y.toString() + z.toString() + "1";
         
        output.push(body);
        output.push(position);
        output.push(Number(entities_string));
    }
    while(output.length < 41) {
        output.push(0);
    }
    return output;
}

module.exports = {
    parseInput
}
