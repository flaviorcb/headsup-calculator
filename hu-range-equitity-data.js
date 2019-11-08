const fs = require('fs');

let data = fs.readFileSync('./handEq.json');
let eq = JSON.parse(data);

let data2 = fs.readFileSync('./notation.json');
let notation = JSON.parse(data2);

module.exports = { eq, notation };



