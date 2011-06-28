
//-----------------------------------------------------------------------
//
//  A piece of output as output by the compilation engine

function Output (fnName, startLine) {

    this._fnName = fnName;
    this._lines = [];
    this._indent = 0;

    this.indent = function () { this._indent ++; };
    this.unindent = function () { this._indent--; };
    this.fnName = function () { return this._fnName; }

    this.addLine = function (l) {
	this._lines.push ([this._indent, l]);
    };

    this.addLines = function (v) {
	for (var i in v) {
	    this.addLine (v[i]);
	}
    };

    this.addOutput = function (o) {
	for (var i in o._lines) {
	    var line = o._lines[i];
	    this._lines.push (this._indent + line[0], line[1]);
	}
    };

    this.addLambda = function (fn) {
	this.addLine ("var " + fn + " = function (k) {");
	this.indent ();
    };

    this.closeLambda = function () {
	this.unindent ();
	this.addLine ("};");
    };

    this.addCall = function (calls) {
	var cc = "Tame.Runtime.callChain ([" + calls.join (", ") + "]);";
	this.addLine (cc);
    };

    this._indents = {};

    this.indent = function (n) {
	var ret;
	if (this._indents[n]) {
	    ret = this._indents[n];
	} else {
	    var spc = "  ";
	    var v = []
	    for (var i = 0; i < n; i++) {
		v.push_back (spc);
	    }
	    ret = v.join ("");
	    this._indents[n] = ret;
	}
	return ret;
    };

    this.formatOutputLines = function () {
	var out = [];
	for (var i in this._lines) {
	    var l = this._lines[i];
	    var line = this.indent (l[0]) + l[1];
	    out.push (line);
	}
	return out;
    };

    this.formatOutput = function () {
	return this.formatOutputLines().join ("\n");
    };

    this.dump = function () {
	console.log (this.formatOutput ());
    };
};

//-----------------------------------------------------------------------

function Engine () {

    this._fnId = 0;

    this.fnFresh = function () {
	var id = this._fnId;
	this._fnId ++;
	return "__tame_fn_" + id;
    };

    this.run = function (node) {
	node.compile (this);
    };

    return this;

    this.Output = Output;
};
