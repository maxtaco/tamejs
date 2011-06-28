

function parse (txt) {
    var astmod = require ('./ast');
    var parser = require ('./parser').parser;

    console.log ("XXX " + parser);

    // Set the ast bindings into the parser's free yy variable
    parser.yy = astmod;

    var res = parser.parse (txt);
    var ast = null;
    if (res) { 
	ast = parser.yy.output;
	ast.compress ();
    }
    return ast;
};

function produce (ast) {
    var engine = require ('./engine').engine;
    return engine.run (ast);
};

function main (infile, output) {
    var fs = require ('fs');
    fs.readFile (infile, function (err, data) {
	if (err) throw err;
	var ast = parse (data);
	var out = produce (ast);
	fs.writeFile (outfile, out.formatOutput (), function (err)  {
	    if (err) throw err;
	});
    });
};

main (process.argv[2], process.argv[3]);

