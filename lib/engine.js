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

function Line (indent, text, number) {
    this._indent = indent;
    this._text = text;
    this._number = number;

    this.indent = function () { return this._indent; }
    this.text = function () { return this._text; }
    this.number = function () { return this._number; }
    this.incIndent = function (i) { this._indent += i; }
    this.append = function (l) { this._text += " " + l; }
    this.prepend = function (l) { this._text = l + " " + this._text; }
};

//=======================================================================
//
//  A piece of output as output by the compilation engine

function Output (eng, fnName, startLine) {

    this._fnName = fnName;
    this._lines = [];
    this._indent = 0;
    this._eng = eng;

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

    this.first = function () {
	var ret = null;
	if (this._lines.length) {
	    ret = this._lines[0];
	}
	return ret;
    };

    //----------------------------------------

    this.last = function () {
	var ret = null;
	if (this._lines.length) {
	    ret = this._lines[this._lines.length - 1];
	}
	return ret;
    };

    //----------------------------------------

    this.addLine = function (l, no) {
	if (!no) { no = -1; }
	var lst = this.last ();
	if (lst && (no >= 0) && lst.number () == no) {
	    lst.append (l);
	} else {
	    this._lines.push (new Line (this._indent, l, no));
	}
    };

    //----------------------------------------

    this.addLines = function (v, no) {
	if (!no) { no = -1; }
	for (var i in v) {
	    this.addLine (v[i], no);
	    if (no >= 0) { no++; }
	}
    };

    //----------------------------------------

    this.addLineObj = function (o) {
	var lst = this.last ();
	if (lst && lst.number () >= 0 && (lst.number () == o.number ())) {
	    lst.append (o.text ());
	} else {
	    this._lines.push (o);
	}
    };

    //----------------------------------------

    this.addOutput = function (o) {
	for (var i in o._lines) {
	    var line = o._lines[i];
	    line.incIndent (this._indent);
	    this.addLineObj (line);
	}
    };

    //----------------------------------------

    this.initLabels = function (implicit, label) {
	this.addLine ("var " + implicit + " = {};");
	if (label) {
	    this.addLine ("var " + label + " = " + implicit + ";");
	}
    };

    //----------------------------------------

    this.kBreak = function () { return "k_break"; } ;
    this.kContinue = function () { return "k_continue"; } ;
    this.awaitDefers = function () { return "__tame_defers"; }
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
	    this.addLine (lbl + "." + this.kBreak () + " = " + k_break + ";");
	}
	if (k_cont) {
	    this.addLine (lbl + "." + this.kContinue () + " = " + k_cont + ";");
	}
    };

    //----------------------------------------

    this.callLabel = function (lbl, eng, typ) {
	var name = "";
	if (lbl) {
	    name = this.localLabelName (lbl);
	} else {
	    name = eng.implicitControl ();
	}
	this.addLine (name + "." + typ + "();");
    };

    //----------------------------------------

    this.addLambda = function (fn) {
	this.addLine ("var " + fn + " = function (" + 
		      this.genericCont () + ") {");
	this.indent ();
	var parent = this._eng.getCurrentFunc ();
	this.addLine (eng.setActiveCb (true));
    };

    //----------------------------------------

    this.closeLambda = function () {
	var parent = this._eng.getCurrentFunc ();
	this.addLine (eng.setActiveCb (false));
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

	// prune out any nulls (caused by code inlining)
	var pruned = [];
	for (var i in calls) {
	    if (calls[i]) {
		pruned.push (calls[i]);
	    }
	}

	if (pruned.length) {
	    var cc = this.callChain ("[" + pruned.join (", ") + "]");
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
	    var line = this.outputIndent (l.indent ()) + l.text ();
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
    this._current_func = null;

    // Return a fresh lambda function for internal compilation
    // purposes
    this.fnFresh = function () {
	var id = this._fnId;
	this._fnId ++;
	return "__tame_fn_" + id;
    };

    //-----------------------------------------

    this.getFilename = function () { return this._filename; }

    //-----------------------------------------

    this.implicitControl = function () {
	return "__tame_k_implicit";
    };

    //-----------------------------------------

    this.compile = function () {
	return this._ast.compile (this);
    };

    //-----------------------------------------

    this.setActiveCb = function (on) { 
	var setto = on ? "__tame_defer_cb" : "null";
	return "tame.setActiveCb (" + setto + ");" 
    };

    //-----------------------------------------

    // Fix this up a bunch!
    this.error = function (node, msg) {
	console.log (this._filename + ":" + node.startLine () + ": " + msg);
	process.exit (1);
    };

    this.endFn = endFn;

    //-----------------------------------------

    // A block of output is given by this class.
    this.newOutput = function (name, sl) { return new Output (this, name, sl); }

    this.Line = Line;

    //-----------------------------------------

    this.readInput = function (cb) {
	var fs = require ('fs');
	var self = this;
	fs.readFile (this._filename, function (err, data) {
	    if (err) throw err;
	    self._txt = String (data);
	    cb();
	});
    };

    //-----------------------------------------

    this.setCurrentFunc = function (f) { this._current_func = f; }
    this.getCurrentFunc = function ()  { return this._current_func; }

    //-----------------------------------------

    this.readInputSync = function () {
	var fs = require ('fs');
	this._txt = fs.readFileSync (this._filename, 'utf-8');
    };

    //-----------------------------------------

    this.dump = function () {
	// dump the compressed AST to the terminal, in case we're
	// curious as to what it is.
	console.log (JSON.stringify (this._ast.dump ()));
    };

    //-----------------------------------------

    // Load up the parser and run it on the input text 
    this.parse = function (txt) {
	if (!txt) { txt = this._txt; }
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
