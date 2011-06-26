

function parse (txt) {
    var ast = require ('./ast');
    var parser = require ('./parser').parser;
    parser.parse (txt);

};

