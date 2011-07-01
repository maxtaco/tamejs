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
//
//-----------------------------------------------------------------------

function endFn () { return "tame.end"; }

//=======================================================================
//
//  A piece of output as output by the compilation engine

function Output (fnName, startLine) {

    this._fnName = fnName;
    this._lines = [];
    this._indent = 0;

    this.indent = function () { this._indent ++; };
    this.unindent = function () { this._indent--; };
    this.fnName = function () { return this._fnName; }

    //----------------------------------------

    this.fnNameRequired = function () {
	var ret = this._fnName;
	if (!ret) {
	    ret = "tame.noop";
	}
	return ret;
    };

    //----------------------------------------

    this.fnNameList = function () {
	if (this._fnName) { return [ this._fnName ] ; }
	else { return []; }
    };

    //----------------------------------------

    this.localLabelName = function (l) {
	return "__tame_k_local_" + l;
    };

    //----------------------------------------

    this.addLine = function (l) {
	this._lines.push ([this._indent, l]);
    };

    //----------------------------------------

    this.addLines = function (v) {
	for (var i in v) {
	    this.addLine (v[i]);
	}
    };

    //----------------------------------------

    this.addOutput = function (o) {
	for (var i in o._lines) {
	    var line = o._lines[i];
	    this._lines.push ([this._indent + line[0], line[1]]);
	}
    };

    //----------------------------------------

    this.initLocalLabel = function (l) {
	this.addLine ("var " + l + " = {};");
    };

    //----------------------------------------

    this.kBreak = function () { return "k_break"; } ;
    this.kContinue = function () { return "k_continue"; } ;
    this.globalLabel = function () { return "tame.__k_global"; } ;
    this.twaitEv = function () { return "__tame_ev"; }
    this.endFn = endFn;

    //----------------------------------------

    this.populateLabels = function (lbl, k_cont, k_break) {

	// For a continue, we still need to preserve the rest of the program,
	// so we rewrite it here. This is a slight hack, but I think 
	// in all situations this is what we want.
	if (k_cont) {
	    k_cont = "function() { " + k_cont + "(" + k_break + "); }";
	}

	if (k_break) {
	    this.addLine (this.globalLabel() + "." + this.kBreak () + 
			  " = " + k_break + ";");
	}
	if (k_cont) {
	    this.addLine (this.globalLabel() + "." + this.kContinue () +
			  " = " + k_cont + ";");
	}
	if (k_break && lbl) {
	    this.addLine (lbl + "." + this.kBreak () + " = " + k_break + ";");
	}
	if (k_cont && lbl) {
	    this.addLine (lbl + "." + this.kContinue () + " = " + k_cont + ";");
	}
    };

    //----------------------------------------

    this.callLabel = function (lbl, typ) {
	var name = "";
	if (lbl) {
	    name = this.localLabelName (lbl);
	} else {
	    name = this.globalLabel ();
	}
	this.addLine (name + "." + typ + "();");
    };

    //----------------------------------------

    this.addLambda = function (fn) {
	this.addLine ("var " + fn + " = function (" + 
		      this.genericCont () + ") {");
	this.indent ();
    };

    //----------------------------------------

    this.closeLambda = function () {
	this.unindent ();
	this.addLine ("};");
    };

    //----------------------------------------

    this.genericCont = function () { return "__tame_k"; }

    //----------------------------------------

    this.callChain = function (arg) {
	return "tame.callChain(" + arg + ");";
    };

    //----------------------------------------

    this.addCall = function (calls, skipGenericCall) {
	if (!skipGenericCall) {
	    calls.push (this.genericCont ());
	}
	if (calls.length) {
	    var cc = this.callChain ("[" + calls.join (", ") + "]");
	    this.addLine (cc);
	}
    };
    
    //----------------------------------------

    this._cachedIndents = {};
    this.outputIndent = function (n) {
	var ret;
	if (this._cachedIndents[n]) {
	    ret = this._cachedIndents[n];
	} else {
	    var spc = "    ";
	    var v = []
	    for (var i = 0; i < n; i++) {
		v.push (spc);
	    }
	    ret = v.join ("");
	    this._cachedIndents[n] = ret;
	}
	return ret;
    };

    //----------------------------------------

    this.formatOutputLines = function () {
	var out = [];
	for (var i in this._lines) {
	    var l = this._lines[i];
	    var line = this.outputIndent (l[0]) + l[1];
	    out.push (line);
	}
	return out;
    };

    //----------------------------------------

    this.formatOutput = function () {
	return this.formatOutputLines().join ("\n");
    };

    //----------------------------------------

    this.inlineOutput = function () {
	return this.formatOutputLines().join (" ");
    };

    //----------------------------------------

    this.dump = function () {
	console.log (this.formatOutput ());
    };

    //----------------------------------------

    return this;
};

//=======================================================================

function Engine (filename) {

    this._fnId = 0;
    this._filename = filename;
    this._txt = null;
    this._ast = null;

    // Return a fresh lambda function for internal compilation
    // purposes
    this.fnFresh = function () {
	var id = this._fnId;
	this._fnId ++;
	return "__tame_fn_" + id;
    };

    this.compile = function () {
	return this._ast.compile (this);
    };

    // Fix this up a bunch!
    this.error = function (node, msg) {
	console.log (this._filename + ":" + node.startLine () + ": " + msg);
	process.exit (1);
    };

    this.endFn = endFn;

    // A block of output is given by this class.
    this.Output = Output;

    this.readInput = function (cb) {
	var fs = require ('fs');
	var self = this;
	fs.readFile (this._filename, function (err, data) {
	    if (err) throw err;
	    self._txt = String (data);
	    console.log ("BAR: " + data);
	    cb();
	});
    };

    this.dump = function () {
	// dump the compressed AST to the terminal, in case we're
	// curious as to what it is.
	console.log (JSON.stringify (this._ast.dump ()));
    };

    // Load up the parser and run it on the input text 
    this.parse = function (txt) {
	if (!txt) { txt = this._txt; }
	console.log ("FOO: " + txt);
	var astmod = require ('./ast');
	var parser = require ('./parser').parser;
	// Set the ast bindings into the parser's free yy variable
	parser.yy = astmod;
	
	var res = parser.parse (txt);
	var ast = null;
	if (res) { 
	    ast = parser.yy.output;
	    ast.compress ();
	    this._ast = ast;
	}
	return ast;
    };

    return this;
};

//-----------------------------------------------------------------------

exports.Engine = Engine;
