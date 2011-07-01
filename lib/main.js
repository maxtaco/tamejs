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

//-----------------------------------------------------------------------
// Dump in code from options.js, cloned from here:
//
//   git://gist.github.com/982499.git
//
// Node.js should really standardize option parsing, so as not to 
// introduce dependencies.

/** Command-line options parser (http://valeriu.palos.ro/1026/).
    Copyright 2011 Valeriu Paloş (valeriu@palos.ro). All rights reserved.
    Released as Public Domain.

    Expects the "schema" array with options definitions and produces the
    "options" object and the "arguments" array, which will contain all
    non-option arguments encountered (including the script name and such).

    Syntax:
        [«short», «long», «attributes», «brief», «callback»]

    Attributes:
        ! - option is mandatory;
        : - option expects a parameter;
        + - option may be specified multiple times (repeatable).

    Notes:
        - Parser is case-sensitive.
        - The '-h|--help' option is provided implicitly.
        - Parsed options are placed as fields in the "options" object.
        - Non-option arguments are placed in the "arguments" array.
        - Options and their parameters must be separated by space.
        - Either one of «short» or «long» must always be provided.
        - The «callback» function is optional.
        - Cumulated short options are supported (i.e. '-tv').
        - If an error occurs, the process is halted and the help is shown.
        - Repeatable options will be cumulated into arrays.
        - The parser does *not* test for duplicate option definitions.
    */

// Thus for, only one option, with more to come...
var schema = [
    ['o', 'outfile', ':', "the file to output to" ],
    ['v', 'verbose', '', 'dump internal states to console' ]
];

// Parse options.
try {
    var tokens = [];
    var options = {};
    var arguments = [];
    for (var i = 0, item = process.argv[0]; i < process.argv.length; 
	 i++, item = process.argv[i]) {
        if (item.charAt(0) == '-') {
            if (item.charAt(1) == '-') {
                tokens.push('--', item.slice(2));
            } else {
                tokens = tokens.concat(item.split('').join('-').
				       split('').slice(1));
            }
        } else {
            tokens.push(item);
        }
    }
    while (type = tokens.shift()) {
        if (type == '-' || type == '--') {
            var name = tokens.shift();
            if (name == 'help' || name == 'h') {
                throw 'help';
                continue;
            }
            var option = null;
            for (var i = 0, item = schema[0]; i < schema.length; 
		 i++, item = schema[i]) {
                if (item[type.length - 1] == name) {
                    option = item;
                    break;
                }
            }
            if (!option) {
                throw "Unknown option '" + type + name + "' encountered!";
            }
            var value = true;
            if ((option[2].indexOf(':') != -1) && !(value = tokens.shift())) {
                throw "Option '" + type + name + "' expects a parameter!";
            }
            var index = option[1] || option[0];
            if (option[2].indexOf('+') != -1) {
                options[index] = options[index] instanceof Array 
		    ? options[index] : [];
                options[index].push(value);
            } else {
                options[index] = value;
            }
            if (typeof(option[4]) == 'function') {
                option[4](value);
            }
            option[2] = option[2].replace('!', '');
        } else {
            arguments.push(type);
            continue;
        }
    }
    for (var i = 0, item = schema[0]; i < schema.length; 
	 i++, item = schema[i]) {
        if (item[2].indexOf('!') != -1) {
            throw "Option '" + (item[1] ? '--' + item[1] : '-' + item[0]) +
                  "' is mandatory and was not given!";
        }
    }

} catch(e) {
    if (e == 'help') {
        console.log("Usage: tamejs [-o <outfile>] [<infile>]\n");
        console.log("Options:");
        for (var i = 0, item = schema[0]; i < schema.length; 
	     i++, item = schema[i]) {
            var names = (item[0] ? '-' + item[0] + 
			 (item[1] ? '|' : ''): '   ') +
                (item[1] ? '--' + item[1] : '');
            var syntax = names + (item[2].indexOf(':') != -1 ? ' «value»' : '');
            syntax += syntax.length < 20 ? 
		new Array(20 - syntax.length).join(' ') : '';
            console.log("\t" + (item[2].indexOf('!') != -1 ? '*' : ' ')
                             + (item[2].indexOf('+') != -1 ? '+' : ' ')
                             + syntax + "\t" + item[3]);
        }
	console.log ("\n" +
		     "\t- If no infile is specified, stdin is assumed\n" +
		     "\n" +
		     "\t- If the input file specified ends in .tjs, and no\n" +
		     "\t    explicit output file is given, then the output\n" +
		     "\t    will be written to stem.js, for the given stem\n" +
		     "\n" +
		     "\t- If no explicit output file is given, and the\n" +
		     "\t    input file is not of the form <stem>.tjs, then\n" +
		     "\t    output is written to stdout.");
		     
        process.exit(0);
    }
    console.error(e);
    console.error("Use  the '-h|--help' option for usage details.");
    process.exit(1);
}

//
// End options.js
//-----------------------------------------------------------------------

function produce (infile, ast) {
    return engine.run (ast);
};

function main (infile, outfile) {
    var fs = require ('fs');
    var Engine = require ('./engine').Engine;
    var engine = new Engine (infile);

    engine.readInput (function () {
	engine.parse ();
	if (options.verbose) {
	    engine.dump ();
	}
	var outdat = engine.compile ().formatOutput ();
	if (outfile == "-") {
	    process.stdout.write (outdat);
	} else {
	    fs.writeFile (outfile, outdat, function (err) {
		if (err) throw err;
	    });
	}
    });
};


var named_file = false;
if (arguments.length <= 2) {
    infn = "/dev/stdin";
} else {
    named_file = true;
    infn = arguments[2];
} 

var rxx = new RegExp ("^(.*)\.tjs$");
var m;

if (options.outfile) {
    outfn = options.outfile;
} else if (named_file && (m = infn.match (rxx))) {
    outfn = m[1] + ".js";
} else {
    outfn = "-";
}

main (infn, outfn);

