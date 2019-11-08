# headsup-calculator
Poker Equitity calculator Texas for holdem heads up

How to use:
on the file "hu-range-equitity-calculator.js" use the function ex: 
rangeVersusRange(["Ako", "TT","KQs"], ["22", "33", "98s"])

There is a server(server.js) and client(hu-equitity-calculator.html) for use the calculator.
Just pass your div and de url of your server ex:
getView(document.getElementById('range-calculator'), "http://localhost:3000/");


The file handEq.json contains the equitity of all hand x hand, this is used for calculate range x range equitities.
ex: {AcAdAcAh":4998} this is a equitity of AcAd x AcAh, was used 10.000 iterations for each calculaton, for obtain percentages, just divide to 100.

The file\hu-range-equitity-calculator-data-generator-utils.js contain a function for generate the table of handxhand equitities,
use generateAllEquititiesHandVersusHand(), I generated my table with 1E4 iterations, my notebook took almost one hour.




