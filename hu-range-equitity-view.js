const getView = function (div, urlRequest) {
    
    let titleDiv = document.createElement('div');
    titleDiv.innerHTML = '<h2 class="calculatorTitle">Heads up Range Equitity Calculator</h2>';
    titleDiv.innerHTML += `<p class="textCenter">equitity:</p>`;
    titleDiv.innerHTML += `<p class="textCenter"><span id="resultView">0.00<span></p>`;
    div.appendChild(titleDiv);
    
    let cardTables = tablesRange();

    div.append(cardTables);



    let p = document.createElement('p');
    p.classList.add('textCenter' )
    let button = document.createElement('button');
    button.innerHTML = "Calculate!"
    button.addEventListener('click', equitityRequest.bind(urlRequest))
    button.classList.add('button');
    p.appendChild(button);
   
    div.appendChild(p);
}

function tablesRange() {
    let cardTables = document.createElement('div');
    cardTables.classList.add('cardTablesContainer');
    cardTables.classList.add('textCenter');
    
    let cardTable1Div = document.createElement('div');
    cardTable1Div.classList.add('inlineBlock');
    generateCardTable(cardTable1Div);
    let pRange1 = document.createElement('p');
    pRange1.classList.add('clear');
    pRange1.innerHTML = '<p class="textCenter">Range  = <span id="range1" class="range-percentage">0</span> % <br>';
    cardTable1Div.appendChild(pRange1);
    let cardTable2Div = document.createElement('div');
    cardTable2Div.classList.add('inlineBlock');
    generateCardTable(cardTable2Div);
    let pRange2 = document.createElement('p');
    pRange2.classList.add('clear');
    pRange2.innerHTML = '<p class="textCenter">Range  = <span id="range2" class="range-percentage">0</span> % </p>';
    cardTable2Div.appendChild(pRange2);
    cardTables.appendChild(cardTable1Div);
    cardTables.appendChild(cardTable2Div);
    
    return cardTables;
}

function equitityRequest() {
    console.log(generateModel());
    var xhttp = new XMLHttpRequest();
    //Send the proper header information along with the request
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("resultView").innerHTML = this.responseText.replace(/"/g, '');
        }
    };
    xhttp.open("POST", this, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify(generateModel()));
}

const generateCardTable = function (div) {

    let data = [
        ["AA", "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s"],
        ["AKo", "KK", "KQs", "KJs", "KTs", "K9s", "K8s", "K7s", "K6s", "K5s", "K4s", "K3s", "K2s"],
        ["AQo", "KQo", "QQ", "QJs", "QTs", "Q9s", "Q8s", "Q7s", "Q6s", "Q5s", "Q4s", "Q3s", "Q2s"],
        ["AJo", "KJo", "QJo", "JJ", "JTs", "J9s", "J8s", "J7s", "J6s", "J5s", "J4s", "J3s", "J2s"],
        ["ATo", "KTo", "QTo", "JTo", "TT", "T9s", "T8s", "T7s", "T6s", "T5s", "T4s", "T3s", "T2s"],
        ["A9o", "K9o", "Q9o", "J9o", "T9o", "99", "98s", "97s", "96s", "95s", "94s", "93s", "92s"],
        ["A8o", "K8o", "Q8o", "J8o", "T8o", "98o", "88", "87s", "86s", "85s", "84s", "83s", "82s"],
        ["A7o", "K7o", "Q7o", "J7o", "T7o", "97o", "87o", "77", "76s", "75s", "74s", "73s", "72s"],
        ["A6o", "K6o", "Q6o", "J6o", "T6o", "96o", "86o", "76o", "66", "65s", "64s", "63s", "62s"],
        ["A5o", "K5o", "Q5o", "J5o", "T5o", "95o", "85o", "75o", "65o", "55", "54s", "53s", "52s"],
        ["A4o", "K4o", "Q4o", "J4o", "T4o", "94o", "84o", "74o", "64o", "54o", "44", "43s", "42s"],
        ["A3o", "K3o", "Q3o", "J3o", "T3o", "93o", "83o", "73o", "63o", "53o", "43o", "33", "32s"],
        ["A2o", "K2o", "Q2o", "J2o", "T2o", "92o", "82o", "72o", "62o", "52o", "42o", "32o", "22"]];


    let divTable = document.createElement('div');
    let buttonClear = document.createElement('button');
    buttonClear.innerHTML = "clear";
    divTable.appendChild(buttonClear);

    let table = document.createElement('table');
    table.classList.add('range-table');
    table.classList.add('grab');

    buttonClear.addEventListener('click', clearTableRange.bind(table));

    data.forEach(function (line) {
        let tr = document.createElement('tr');
        line.forEach(function (cards) {
            let td = document.createElement('td');
            td.innerHTML = cards;
            td.addEventListener('mouseenter', mouseenter);
            td.addEventListener('mousedown', mousedown);
            tr.appendChild(td);
        });
        table.appendChild(tr);

    })

    divTable.append(table)
    div.appendChild(divTable);
}


const generateModel = function () {
    let tables = document.querySelectorAll('.range-table');
    let result = [];
    for (let t of tables) {
        let tds = t.querySelectorAll('.selected');
        let r = [];
        for (let td of tds) {
            r.push(td.innerHTML);
        }
        result.push(r);
    }
    return result;
}

const updatePercentage = function () {
    let tables = document.querySelectorAll('.range-table');
    let count = 1;
    for (let t of tables) {
        let result = 0;
        let tds = t.querySelectorAll('.selected');
        for (let td of tds) {
            if (td.innerHTML.indexOf('o') > 0) result += 12;
            else if (td.innerHTML.indexOf('s') > 0) result += 4;
            else result += 6;
        }
        result = (result / 1326) * 100;
        document.querySelector('#range' + count).innerHTML = result.toFixed(2);
        count++;
    }
}

const clearTableRange = function(){
    let tds = this.querySelectorAll('td');
    console.log('this', this, tds);
    console.log('tds', tds);
    for(td of tds){
        td.classList.remove('selected');
    }
    document.getElementById('resultView').innerHTML = "0.00";
}

const mousedown = (event) => changeState(event);

const mouseenter = (event) => changeState(event);

const changeState = (event) => {
    event.preventDefault();
    if (event.buttons === 1) {
        event.target.classList.toggle('selected');
        updatePercentage();
    }
}



