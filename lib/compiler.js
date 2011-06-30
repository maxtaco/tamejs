#!/usr/bin/env node

//
// Copyright (c) 2011 (MIT License)
//    Maxwell Krohn <max@okcupid.com>
//    HumorRainbow, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
//-----------------------------------------------------------------------
//

function parse (txt) {
    var astmod = require ('./ast');
    var parser = require ('./parser').parser;
    // Set the ast bindings into the parser's free yy variable
    parser.yy = astmod;

    var res = parser.parse (String (txt));
    var ast = null;
    if (res) { 
	ast = parser.yy.output;
	ast.compress ();

	// dump the compressed AST to the terminal, in case we're
	// curious as to what it is.
	//console.log (JSON.stringify (ast.dump ()));
    }
    return ast;
};

function produce (ast) {
    var Engine = require ('./engine').Engine;
    var engine = new Engine ();
    return engine.run (ast);
};

function main (infile, outfile) {
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

