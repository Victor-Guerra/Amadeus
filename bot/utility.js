class Dictionaries {

    static objectiveStructuralDict = {
        "Bot":1,
        "User":2,
        "Subject":3,
        "DirectObject":5,
        "IndirectObject":7
    }

    static intentsDict = {
        "Affirm": 0,
        "Demand": 1,
        "Ask":    2,
        "Meme":   3,
        "End":    4
    }

    static traitsDict = {
        "Complexity": 0,
        "Affection": 1,
        "Politeness": 2,
        "Enthusiasm": 3,
        "Truthfulness": 4,
        "Inquisitiveness": 5,
        "Naiveness": 6
    }

    static definingEntityDict = {
        "Adjective":1,
        "Adverb":2,
        "Conjunction":3,
        "Interjection":4,
        "Noun":5,
        "Preposition":6,
        "Pronoun":7,
        "Tense":8,
        "Verb":9
    }

    static adjectiveSubcatDict = {
        "indefiniteAdjective":0,
        "interrogativeAdjective":1,
        "properAdjective":2,
        "articleAdjective":3,
        "descriptiveSuperlativeAdjective":4,
        "descriptiveComparativeAdjective":5,
        "descriptiveGoodAdjective":6,
        "possesiveAdjective":7,
        "quantitativeAdjective":8,
        "demonstrativeAdjective":9
    }

    static adverbSubcatDict = {
        "placeAdverb":1,
        "linkingAdverb":2,
        "viewpointAdverb":3,
        "mannerAdverb":4,
        "degreeAdverb":5,
        "evaluativeAdverb":6,
        "focusingAdverb":7,
        "timeAdverb":8
    }

    static conjunctionSubcatDict = {
        "coordinatingConjunction":3,
        "subordinatingConjunction":5,
        "correlativeConjunction":7
    }

    static interjectionSubcatDict = {
        "moodInterjection":1,
        "yesInterjection":3,
        "noInterjection":5,
        "holdInterjection":7,
        "attentionInterjection":9
    }

    static nounSubcatDict = {
        "commonAbstractCountableNoun":0,
        "commonAbstractUncountableNoun":1,
        "commonConcreteCountableNoun":2,
        "commonConcreteUncountableNoun":3,
        "properAbstractCountableNoun":4,
        "properAbstractUncountableNoun":5,
        "properConcreteCountableNoun":6,
        "properConcreteUncountableNoun":7,
        "compoundNoun":8,
        "collectiveNoun":9
    }

    static prepositionSubcatDict = {
        "phrasalPreposition":1,
        "timePreposition":3,
        "placedirectionPreposition":5,
        "agentPreposition":7
    }

    static pronounSubcatDict = {
        "interrogativePronoun":1,
        "demonstrativePronoun":2,
        "possesivePronoun":3,
        "relativePronoun":4,
        "reflexivePronoun":5,
        "subjectPronoun":6,
        "objectPronoun":7,
        "intensivePronoun":8
    }

    static tenseSubcatDict = {
        "farPast":1,
        "nearPast":3,
        "now":5,
        "nearFuture":7,
        "farFuture":9,
        "someDay":0
    }

    static verbSubcatDict = {
        "finiteVerb":1,
        "nonfiniteVerb":2,
        "auxiliaryVerb":3,
        "modalVerb":4,
        "linkingVerb":5,
        "transitiveActionVerb":6,
        "intransitiveActionVerb":7
    }
}

module.exports = {
    Dictionaries
}
