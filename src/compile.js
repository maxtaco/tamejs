

function parse (txt) {
    var astmod = require ('./ast');
    var parser = require ('./parser').parser;

    // Set the ast bindings into the parser's free yy variable
    parser.yy = astmod;

    var res = parser.parse (txt);
    var ast = null;
    if (res) { 
	ast = parser.yy.output;
    }
    return ast;
};

function produce (ast) {
    var engine = require ('./engine').engine;
    engine.run (ast);
};

