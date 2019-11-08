const re = require('./hu-range-equitity-calculator.js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());

// parse application/json
app.use(bodyParser.json())

app.post('/', function (req, res) {
    console.log(req.body);
    let data = req.body;
   
    let r1 = data[0];
    let r2 = data[1];
    if (!r1 || !r2 || r1.length === 0 || r2.length === 0) {
        res.end(JSON.stringify("empty range"))
    }else{
        r1 = r1.map((i) => i.trim());
        r2 = r2.map((i) => i.trim());
        res.end(JSON.stringify(re(r1, r2).toFixed(2)));
    }
})


app.listen(3000, function () {
    console.log('ouvindo na porta 3000');
})
