let { eq, notation } = require('./hu-range-equitity-data');

// console.log(eq);

const cardRank = function (card) {
    return ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'].indexOf(card);
}

//Carta mais alta primeiro
//cartas do mesmo valor, com naipes em ordem alfabética
//pois o dicionário de equididades está ordenado dessa forma.
const holeCardNormalize = function (hl) {
    if
        ((cardRank(hl[0]) === cardRank(hl[2]) && hl[1] > hl[3]) ||
        (cardRank(hl[0]) !== cardRank(hl[2]) && cardRank(hl[0]) < cardRank(hl[2])))
        return hl.slice(2) + hl.slice(0, 2);
    return hl;
}

//hole cards similares, os naipes estão em ordem alfabética no dicionário de equidades.
//ex: existe a key: "AcAsAdAh", mas não: "AdAhAcAs", então antes de buscas é preciso
//normalizar
const normalizeCombo = function (c) {
    const hl1 = holeCardNormalize(c.slice(0, 4));
    const hl2 = holeCardNormalize(c.slice(4));

    let result = c;
    let changed = false;

    // if (holeCardsCompare(hl1, hl2) < 0)
    //     result = hl2 + hl1;

    if (!eq[c]) {
        changed = true;
        result = hl2 + hl1;
        if (!eq[result]) throw `Falta a entrada ${result}`
    }




    return {
        normalizedCombo: result,
        changed: changed
    };
}

const holeCardsCompare = function (hl1, hl2) {

    if (cardRank(hl1[0]) > cardRank(hl2[0])) return 1;
    if (cardRank(hl1[0]) < cardRank(hl2[0])) return -1;
    if (cardRank(hl1[2]) > cardRank(hl2[2])) return 1;
    if (cardRank(hl1[2]) < cardRank(hl2[2])) return -1;
    return 0;
}

const searchEquitity = function (combo) {
    let result;
    let { normalizedCombo, changed } = normalizeCombo(combo);
    if (eq[normalizedCombo]) result = eq[normalizedCombo];
    else result = eq[normalizedCombo.slice(4), normalizedCombo[0, 4]];
    if (changed) {
        return 1 - result / 1E4;
    }
    return result / 1E4;
}

const hasCardsInCommon = function (h1, h2) {
    if (
        h1.slice(0, 2) === h2.slice(0, 2) ||
        h1.slice(0, 2) === h2.slice(2) ||
        h1.slice(2) === h2.slice(0, 2) ||
        h1.slice(2) === h2.slice(2)
    ) return true;
    return false;
}

const rangeToHoleCards = function (range) {
    let result = [];
    for (let handNotation of range) {
        result = result.concat(notation[handNotation]);
    }
    return result;
}

const retiraMaosComCartasDoInimigo = function (holeCards, enemy) {
    return holeCards.filter( (h) => !hasCardsInCommon(h, enemy));
}

const rangeVersusRange = function(rangeHero, rangeVilain){
    cardsHero = rangeToHoleCards(rangeHero);
    let result = 0;
    for(ch of cardsHero){
        result += handVersusRange(ch, rangeVilain);
    }

    return result/cardsHero.length;

}

const handVersusRange = function (hand, range) {
    let rangeHands = rangeToHoleCards(range);
    rangeHands = retiraMaosComCartasDoInimigo(rangeHands, hand);
    let eqSum = 0;
    for (let enemyHand of rangeHands) {
        eqSum += searchEquitity(hand + enemyHand);
    }

    return (eqSum / rangeHands.length);

}

// console.log(notation['32o'])
pairs = ['22', '33', '44', '55', '66', '77', '88', '99', 'TT', 'JJ', 'QQ', 'KK', 'AA'];
range = ['AKo', 'QJo', '32o'].concat(pairs);
const range2 = ['AKo'].concat(pairs);
// console.log(rangeToHoleCards(range,'AdAh'));
// console.log(rangeToHoleCards(range, "AdAh"));
console.log(handVersusRange('AdAh', range));
console.log(rangeToHoleCards(range, 'AdAh').length);
console.log(rangeVersusRange(range, range2));


// console.log(holeCardNormalize('KdAh'))
// console.log(holeCardNormalize('AhAc'));
// console.log(holeCardNormalize('AcAs'));



// const c2 = searchEquitity('AdAhAcKd');
// // const c4 = searchEquitity('Ts3cJd5h');
// // const c1 = searchEquitity('AcAdAhKs');
// // const c3 = searchEquitity('2s2cTdTh');
// // const c5 = searchEquitity('2s3dTdTh');
// console.log(eq['AdAhAcKd']);
// console.log(c2);
// console.log(eq['AcKdAdAh']);

// console.log(`${c2 * 100}%`);
// console.log(`${c4 * 100}%`);
// console.log(`${c1 * 100}%`);
// console.log(`${c3 * 100}%`);
// console.log(`${c5 * 100}%`);
// console.log(`${searchEquitity['AhKsAcAd'] * 100}%`);

module.exports = rangeVersusRange;

