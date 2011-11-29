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
//
// Code for making the elements of the abstract syntax tree (AST)
// for the tamejs grammar.  Everything should inherit from a Node
// object.  A Program object is output by the parser
//

var autocb_name = "autocb";

//-----------------------------------------------------------------------

function Node (startLine) {
    this._label = null;
    this._startLine = startLine;
    this.setLabel = function (x) { this._label = x; }
    this.getLabel = function () { return this._label; }
    this.toAtom = function () { return null; }
    this.getChildren = function () { return []; }
    this.toExpr = function () { return null; }
    this.startLine = function () { return this._startLine; }
    this.toIndexExpr = function () { return null; }
    this.toThis = function () { return null; }
    this.toFunction = function () { return null; }

    //----------------------------------------

    this.compress = function () {
	var v = this.getChildren ();
	for (var i in v) {
	    v[i].compress ();
	}
    };
    
    //----------------------------------------

    this._hasAwaitStatement = -1;
    this.hasAwaitStatement = function () {
	if (this._hasAwaitStatement >= 0) {
	    return this._hasAwaitStatement;
	}

	var v = this.getChildren ();
	var ret = 0;
	for (i in v) {
	    if (v[i].hasAwaitStatement ()) {
		ret = 1;
		break;
	    }
	}
	this._hasAwaitStatement = ret;
	return ret;
    };

    //----------------------------------------

    this._thisses = null;
    this.getThisses = function () {
	if (this._thisses) {
	    return this._thisses;
	}
	this._thisses = [];
	var v = this.getChildren ();
	for (var i in v) {
	    var c = v[i];
	    if (c.toThis ()) { this._thisses.push (c); }
	    else if (!c.toFunction ()) { 
		this._thisses = this._thisses.concat (c.getThisses());
	    }
	}
	return this._thisses;
    };

    //----------------------------------------

    this._declarations = null;
    this.getDeclarations = function (eng) {
	if (this._declarations) {
	    return this._declarations;
	}
	this._declarations = [];
	var v = this.getChildren ();
	for (var i in v) {
	    d = v[i].getDeclarations (eng);
	    this._declarations = this._declarations.concat (d);
	}
	return this._declarations;
    };

    //----------------------------------------

    // Optimization:
    // We can short-circuit CPS-conversion in a bunch of cases,
    // just make sure that we wrap the output in a lambda.  
    this.cpsShortCircuit = function (eng) {

	var ret = null;

	if (!this.hasAwaitStatement ()) {
	    var fn = eng.fnFresh ();
	    ret = eng.newOutput (fn);
	    ret.addLambda (fn);
	    var out = this.passThrough (eng);
	    ret.addOutput (out);
	    ret.addCall ([]);
	    ret.closeLambda ();
	}
	return ret;
    };

    //----------------------------------------

    this.passThrough = function (eng) {
	return this.compile (eng);
    };
};

//-----------------------------------------------------------------------

function Slot (obj, eng, varRxx, i) {
    
    this._obj = obj;
    s = obj.inline (eng, true).trim ();

    // if the first term is "var i", then strip out the "var"
    if (i == 0) {
	s = s.replace (varRxx, "");
    }

    this._str = s;
    this._base = null;
    this._field = null;
    this._index = null;

    if ((m = s.match (/^(\s*\.\s*){3}\s*(.*?)$/))) {
	this._rest = m[2];
    } else if ((m = s.match (/^(.*)\.([^.\[]+)$/))) {
	this._base = m[1];
	this._field = m[2];
    } else {
	var o = this._obj.inlineAllButLastIndexExpr (eng, true);
	if (o.index) {
	    this._index = o.index;
	    this._base = o.prefix;
	} else {
	    this._base = this._str;
	}
    }

    this._simple = true;
    if (this._index || this._field) { this._simple = false; }

    this.simple = function () { return this._simple; }

    this.pushOutput = function (params, outputs, args) {
	var po = params.length;
	var n = 0;
	var prfx = "__tame_slot_";
	var lhs;

	if (!this.simple ()) { 
	    n++;
	    args.push (this._base);
	    if (this._index) {
		n++;
		args.push (this._index);
		lhs = prfx + po + "[" + prfx + (po+1) + "]";
	    } else {
		lhs = prfx + i + "." + this._field;
	    }
	} else if (this._rest) {
	    lhs = this._rest;
	} else {
	    lhs = this._base;
	}
	
	var rhs;
	var o = outputs.length;
	if (this._rest) {
	    rhs = "tame.restArr (arguments, " + o + ")";
	} else {
	    rhs = "arguments[" + o + "]";
	}

	var assignment = lhs + " = " + rhs + ";";
	outputs.push (assignment);

	for (var j = 0; j < n; j++) {
	    params.push (prfx + (j + po));
	}
    };
};

//-----------------------------------------------------------------------

function DeferExpr (startLine, slotList) {
    var that = new Node (startLine);
    that._slotList = slotList;
    that._id = 0;
    that._declarations = null;

    //-----------------------------------------

    that.getChildren = function () { return this._slotList; };
    that.setId = function (i) { this._id = i; }

    //-----------------------------------------

    that.dump = function () {
	return { type : "defer",
		 slots : this._slotList.map (
		     function (x) { return x.dump () })
	       };
    };
    
    that._varRxx = new RegExp ("^\\s*var\\s+");

    //-----------------------------------------

    that.getDeclarations = function (eng) {

	if (this._declarations) {
	    return this._declarations;
	}

	var ret = [];
	if (this._slotList.length > 0) {
	    var x = this._slotList[0].inline (eng, false);
	    if (x.match (this._varRxx)) {
		var vars = [ x ].concat (
		    this._slotList.slice (1).map (
			function (x) { return x.inline (eng, false) }));
		var l = vars.join (", ") + ";";
		ret = [ l ];
	    }
	}
	this._declarations = ret;
	return ret;
    };

    //-----------------------------------------

    that.compile = function (eng) {
	var ret = eng.newOutput ();
	var slots = [], outputs = [], args = [], params = [];
	var simple = true;

	for (var i in this._slotList) {
	    var o = this._slotList[i];
	    var slot = new Slot (o, eng, this._varRxx, i);
	    if (!slot.simple ()) { 
		simple = false; 
	    }
	    slot.pushOutput (params, outputs, args);
	    slots.push (slot);
	}

	ret.addLine (ret.awaitDefers () + ".defer ( { ");
	ret.indent ();
	if (slots.length) {
	    ret.addLine ("assign_fn : ");
	    ret.indent ();
	    if (!simple) {
		ret.addLine ("(function (" + params.join (", ") + ") {");
		ret.indent ();
		ret.addLine ("return function () { ");
		ret.indent ();
	    } else {
		ret.addLine ("function () {");
		ret.indent ();
	    }
	    
	    for (var i in outputs) {
		ret.addLine (outputs[i]);
	    }
	    
	    ret.unindent ();
	    ret.addLine ("}");
	    
	    if (!simple) {
		ret.addLine (";");
		ret.unindent ();
		ret.addLine ("}) (" + args.join (", ") + "),");
	    } else {
		ret.addLine (",");
	    }
	    ret.unindent ();
	}
	var parent, pn;
	if ((parent = eng.getCurrentFunc ()) && (pn = parent.getName ())) {
	    ret.addLine ("func_name : \"" + pn + "\",");
	}

	ret.addLine ("parent_cb : __tame_defer_cb,");

	ret.addLine ("line : " + this._startLine + ",");
	ret.addLine ("file : \"" + eng.getFilename () + "\"");

	ret.unindent ();
	ret.addLine ("} )");
	return ret;
    };
    
    //-----------------------------------------

    return that;
};

//=======================================================================

function ThisExpr (startLine) {
    var that = new Node (startLine);
    that._func = null;
    
    that.dump = function () {
	return { type : "this" };
    };

    that.setParentFunc = function (f) { this._func = f; }

    that.toThis = function () { return this; }

    that.passThrough = function (eng, inTame) {
	var ret = null;
	if (this._func.funcHasAwaitStatement ()) {
	    ret = this.compile (eng);
	} else {
	    ret = eng.newOutput ();
	    ret.addLine ("this", this._startLine);
	    return ret;
	}
	return ret;
    }

    that.compile = function (eng) {
	var ret = eng.newOutput ();
	ret.addLine ("__tame_this", this._startLine);
	return ret;
    }

    return that;
};

//=======================================================================

function MyString (startLine, endLine, value) {
    var that = new Node (startLine);
    that._endLine = endLine;
    that._value = value;

    that.dump = function () {
	return { type : "String",
		 value : this._value };
    };
    that.toAtom = function () { 
	var atom = new Atom (this._startLine, this._value);
	atom._endLine = this._endLine;
	return atom;
    };

    that.toString = function () { return this._value; }

    return that;
};

//-----------------------------------------------------------------------

function Atom (startLine, value) {
    var that = new Node (startLine);
    that._endLine = startLine;
    that._value = value;

    that.toAtom = function () { return this; }
    that.addAtom = function (a) {
	var spc = "";
	while (this._endLine < a._startLine) {
	    spc += "\n";
	    this._endLine++;
	    
	}
	if (spc.length == 0) { spc = " "; }
	this._value += spc + a._value;
    };

    that.dump = function () {
	return { type : "Atom",
		 lines : [ this._startLine, this._endLine ],
		 value : this._value };
    };

    that.compile = function (eng) {
	var ret = eng.newOutput ();
	ret.addLines (this._value.split ("\n"), this._startLine);
	return ret;
    };

    that.toIndexExpr = function () { return null; }

    return that;
};

//=======================================================================


function Label (startLine, name) {
    var that = new Node (startLine);
    that._name= name;
    
    that.toAtom = function () {
	return new Atom (this._startLine, this._name);
    };

    that.getName = function () {
	return this._name;
    };

    return that;
};

//=======================================================================

function Expr (atoms) {
    
    // Figure out the start line if it's possible
    var tmp = 0;
    if (atoms.length) {
	tmp = atoms[0]._startLength;
    }
	
    var that = new Node (tmp);
    that._atoms = atoms;
    if (atoms.lengths) {
	this._endLine = atoms[atoms.length - 1]._startLine;
    }

    //-----------------------------------------

    that.getChildren = function () { return this._atoms; }

    //-----------------------------------------

    that.addAtom = function (a) {
	this._atoms.push (a);
    };

    //-----------------------------------------

    that.setLabel = function (x) { 
	this._atoms.unshift (x.toAtom ());
    };

    //-----------------------------------------

    that.dump = function () {
	return { type : "Expr",
		 atoms : this._atoms.map (function (x) { return x.dump (); }) };
    };

    //-----------------------------------------

    that.toExpr = function () { return this; };

    //-----------------------------------------

    //
    // Smush all of the atoms together so that we're dealing with 
    // a list of the form:
    //    
    //    a1 f1 a2 f2 a3 ...
    //  
    that.compress = function () {
	var l = this._atoms.length;
	if (l) {
	    var lastAtom = null;
	    var newAtoms = [];
	    for (var i = 0; i < l; i++) {
		var x = this._atoms[i];
		var a = x.toAtom ();
		if (!a) {
		    // If it's a function, we need to compress it, so 
		    // that its atoms are in the right form
		    x.compress ();
		    newAtoms.push (x);
		    lastAtom = null;
		} else if (!lastAtom) {
		    newAtoms.push (a);
		    lastAtom = a;
		} else {
		    lastAtom.addAtom (a);
		}
	    }
	    this._atoms = newAtoms;
	    this._startLine = newAtoms[0]._startLine;
	    this._endLine = newAtoms[newAtoms.length - 1]._endLine;
	}
    };

    //-----------------------------------------

    that.pushAtomsToArray = function (out) {
	for (var i in this._atoms) {
	    out.push (this._atoms[i]);
	}
    };
    
    //-----------------------------------------

    that.takeAtomsFrom = function (x) {
	this._atoms = this._atoms.concat (x._atoms);
    };

    //-----------------------------------------

    that.compile = function (eng, tailCall, skipFn) {

	var ret;
	
	if (skipFn) {
	    ret = eng.newOutput ();
	} else {
	    var fn = eng.fnFresh ();
	    ret = eng.newOutput (fn);
	    ret.addLambda (fn);
	}

	for (var i in this._atoms) {
	    var atom = this._atoms[i];
	    var atomc = atom.compile (eng);
	    ret.addOutput (atomc);
	}
	var calls = [];
	if (tailCall) {
	    ret.addOutput (tailCall);
	    calls.push (tailCall.fnName ());
	}
	ret.addCall(calls, skipFn);
	if (!skipFn) {
	    ret.closeLambda ();
	}
	return (ret);
    };

    //-----------------------------------------

    that.passThrough = function (eng) { 
	var out = eng.newOutput ();
	for (var i in this._atoms) {
	    var a = this._atoms[i].passThrough (eng);
	    out.addOutput (a);
	}
	return out;
    };

    //-----------------------------------------

    that.inlineAllButLastIndexExpr = function (eng, inTame) {
	var l = this._atoms.length;
	var ret = {};
	var last; 
	if (l && 
	    (last = this._atoms[l - 1]) &&
	    (x = last.toIndexExpr ())) {
	    ret.index = x.getExpr ().inline (eng, inTame);
	    var out = eng.newOutput ();
	    for (var i = 0; i < l - 1; i++) {
		var atom = this._atoms[i];
		var atomc = atom.passThrough (eng, inTame);
		out.addOutput (atomc);
	    }
	    ret.prefix = out.inlineOutput ();
	}
	return ret;
    };

    //-----------------------------------------

    that.inline = function (eng, inTame) {
	var out = eng.newOutput ();
	for (var i in this._atoms) {
	    var atom = this._atoms[i];
	    var atomc = atom.passThrough (eng, inTame);
	    out.addOutput (atomc);
	}
	return out.inlineOutput ();
    };

    return that;
};

//=======================================================================

function IndexExpr (startLine, expr) {
    var that = new Node (startLine);
    that._expr = expr;

    //----------------------------------

    that.getChildren = function () { return [ this._expr ]; }

    //----------------------------------

    that.dump = function () {
	return { type : "IndexExpr",
		 expr : this._expr.dump () };
    };

    //----------------------------------

    that.toIndexExpr = function () { return this; }

    //----------------------------------

    // XXX ?? not sure if this will work
    that.compile = function (eng, inTame) {
	var out = this._expr.compile (eng, inTame);
	out.first ().prepend ("[");
	out.last ().append ("]");
	return out;
    };

    //----------------------------------

    that.passThrough = function (eng, inTame) {
	var out = this._expr.passThrough (eng, inTame);
	out.first ().prepend ("[");
	out.last ().append ("]");
	return out;
    };

    //----------------------------------

    that.getExpr = function () { return this._expr; }
 
    //----------------------------------

    return that;
};

//=======================================================================

function Block (startLine, body, toplev) {
    var that = new Node (startLine);
    that._body = body;
    that._toplev = toplev;

    //----------------------------------------

    that.getChildren = function () { return this._body; };

    //----------------------------------------

    that.compress = function () {

	var l = 0;
	if (this._body) { l = this._body.length; }
	if (l) {
	    var lastExpr = null;
	    var newBody = [];
	    for (var i = 0; i < l; i++) {
		var e = this._body[i];
		var x = e.toExpr ();
		if (!x) {
		    if (lastExpr) { 
			lastExpr.compress (); 
			lastExpr = null;
		    }
		    e.compress ();
		    newBody.push (e);
		} else {
		    if (lastExpr) {
			lastExpr.takeAtomsFrom (x);
		    } else {
			lastExpr = x;
			newBody.push (x);
		    }
		}
	    }
	    if (lastExpr) { lastExpr.compress (); }
	    this._body = newBody;
	}
    };

    //----------------------------------------

    that.passThrough = function (eng) {
	var ret = eng.newOutput ();
	for (var i in this._body) {
	    var s = this._body[i].passThrough (eng);
	    ret.addOutput (s);
	}
	return ret;
    }

    //----------------------------------------

    that.compile = function (eng, tailCall, skipFn) {

	// Optimization -- for empty blocks, just add a call to the 
	// currently active continuation
	if (!this._body || !this._body.length) {
	    return eng.newOutput ();
	}

	// Optimization --- don't need to nest if it's a 
	// block with only one statement....
	if (this._body.length == 1) {
	    return this._body[0].compile(eng, tailCall, skipFn);
	} 

	// Another optimization -- no need to nest if we're
	// going to be making a tailCall on the first guy.
	var expr;
	if (this._body.length > 1 && (expr = this._body[0].toExpr ())) {
	    this._body.shift ();
	    var tailCalls = this.compile (eng);
	    var ret = expr.compile (eng, tailCalls);
	    return ret;
	}

	var fn = eng.fnFresh ();
	var ret = eng.newOutput (fn);
	ret.addLambda (fn);
	var calls = [];

	while (this._body.length) {
	    var nxt = this._body.shift ();

	    // Another optimization -- only do a nested tail call if
	    // the first item is an expression, and there are more than
	    // 1 items left.  Otherwise, we can do these guys serially.
	    if ((expr = nxt.toExpr ()) && this._body.length) {
		var tailCalls = this.compile (eng);
		var s = nxt.compile (eng, tailCalls);
		ret.addOutput (s);
		calls.push (s.fnName ());

		// The nested tail call does everything recursively
		// so our work at this level is dnoe.
		break;

	    } else {
		var s = nxt.compile (eng);
		ret.addOutput (s);
		calls.push (s.fnName ());
	    }
	}
	ret.addCall (calls);
	ret.closeLambda();
	return ret;
    };

    //----------------------------------------

    that.dump = function () {
	return { type : "Block",
		 statements : this._body.map (function (x) 
					      { return x.dump (); })  };
    };

    //----------------------------------------

    return that;
};

//=======================================================================

function ForStatement (startLine, forIter, body) {
    var that = new Node (startLine);
    that._forIter = forIter;
    that._body = body;

    that.getChildren = function () { return [ this._forIter, this._body ]; };

    that.dump = function () {
	return { type : "ForStatement",
		 iter : this._forIter.dump (),
		 body : this._statement.dump () };
    };

    that.passThrough = function (eng) {
	var ret = eng.newOutput ();
	var lbl = "";
	if (this.getLabel ()) {
	    label = this.getLabel () + " : ";
	}
	var iter = this._forIter.passThrough (eng);
	ret.addLine (lbl + " for (" + iter + ") {");
	ret.indent ();
	var body = this._body.passThrough (eng);
	ret.addOutput (body);
	ret.unindent ();
	ret.addLine ("}");
	return ret;
    };

    //-----------------------------------------

    that.compile = function (eng) {

	// Optimization --- pass through conversion if there
	// is no await-related stuff 
	var ss = this.cpsShortCircuit (eng);
	if (ss) { 
	    return ss; 
	}

	var outer = eng.fnFresh ();
	var ret = eng.newOutput (outer);
	ret.addLambda (outer);
	var lbl = null;

	if (this.getLabel ()) {
	    lbl = ret.localLabelName (this.getLabel ().getName ());
	}
	var ilbl = eng.implicitControl();
	ret.initLabels (ilbl, lbl);

	// If we have a for (var i in foo), we need to jump through
	// some hoops to convert it to a class for loop iteration
	var conversion = this._forIter.convertToClassic (eng);

	var iterObj;
	if (conversion) {
	    iterObj = conversion.classic;
	    this._body._body.unshift (conversion.setIter);
	    this._body.compress ();
	} else {
	    iterObj = this._forIter;
	}

	var iter = iterObj.inline (eng, true);

	// Populate our temporary list
	if (conversion) {
	    ret.addOutput (conversion.listPopulate);
	}

	ret.addLine (iter[0] + ";"); // initialization
	
	var inner = eng.fnFresh ();
	ret.addLambda (inner);

	var inc = eng.fnFresh ();
	ret.addLambda (inc);
	ret.addLine (iter[2]);
	ret.addCall([inner]);
	ret.closeLambda ();
	ret.populateLabels (eng.implicitControl(), inc, ret.genericCont ());

	ret.addLine ("if (" + iter[1] + ") {");
	ret.indent ();
	var body = this._body.compile (eng);
	ret.addOutput (body);
	ret.addCall([ body.fnName (), inc ]);
	ret.unindent ();
	ret.addLine ("} else {");
	ret.indent ();
	ret.addCall ([]);
	ret.unindent ();
	ret.addLine ("}");

	ret.closeLambda (); // inner
	ret.addCall ([ inner ]);
	ret.closeLambda (); // outer
	return ret;
    };

    return that;
};

//=======================================================================

function ForIterEach (expr) {
    var that = new Node ();
    that._expr = expr;
    that.getChildren = function () { return [ this._expr ]; };
    
    that.dump = function () {
	return { type : "ForIterEach",
		 expr : this._expr.dump () };
    };

    that.passThrough = function (eng) {
	var out = eng.newOutput ();
	var a = this._expr.passThrough (eng);
	out.addOutput (a);
	return out.inlineOutput ();
    };

    that.inline = function (eng, inTame) {
	var a = this._expr.inline (eng, inTame);
	return [ a ];
    };

    that.identifier = function (eng) {
	var x = this._expr.inline (eng, true);
	var rxx = new RegExp ("(\\S+)\\s+in\\s+");
	var m = x.match (rxx);
	if (!m) {
	    eng.error (this._expr,
		       "cannot find identifier in expression '" + x + "'");
	}
	return [ m[1], x];
    };

    that.array= function () { return "__tame_for_in_array"; };
    that.iter = function () { return "__tame_for_in_iter"; };

    that.convertToClassic = function (eng) {
	var p = this.identifier (eng);
	var id = p[0];
	var x = p[1];
	var ln = this._expr.startLine ();

	var out = eng.newOutput ();
	out.addLine ("var " + this.array() + " = [];");
	out.addLine ("for (" + x +  ") { " + this.array() 
		     + ".push(" + id + "); }");
	
	// We're adding this to every iteration of the loop in the body
	var atom = new Atom (ln, "var " + id + " = " + this.array() + "[" +
			     this.iter () + "];");
	var set_x = new Expr ([atom]);


	atom = new Atom (ln, "var " + this.iter () + " = 0");
	var init_x = new Expr ([atom]);
	atom = new Atom (ln, this.iter () + " < " + this.array() + ".length");
	var cond_x = new Expr ([atom]);
	atom = new Atom (ln, this.iter () + "++");
	var inc_x = new Expr ([atom]);

	var fic = new ForIterClassic (init_x, cond_x, inc_x);

	// Return a triple -- with the array population output,
	// the expression to set at the beginning of each iter in the loop;
	// and the modified loop conditions.
	return { listPopulate : out, setIter : set_x, classic : fic };
    };

    return that;
};

//=======================================================================

function ForIterClassic (initExpr, condExpr, incExpr) {
    var that = new Node ();
    that._initExpr = initExpr;
    that._condExpr = condExpr;
    that._incExpr = incExpr;

    that.getChildren = function () 
    { return [ this._initExpr, this._condExpr, this._incExpr ]; };

    that.dump = function () {
	return { type : "ForIterClassic",
		 initExpr : this._initExpr.dump (),
		 condExpr : this._condExpr.dump (),
		 incExpr : this._incExpr.dump () };
    };

    that.passThrough = function (eng) {
	var out = eng.newOutput ();
	var a = this._initExpr.passThrough (eng);
	out.addOutput (a); out.addLine (";");
	var b = this._condExpr.passThrough (eng);
	out.addOutput (b); out.addLine (";");
	var c = this._incExpr.passThrough (eng); 
	out.addOutput (c);
	return out.inlineOutput ();
    };

    that.inline = function (eng, inTame) {
	var a = this._initExpr.inline (eng, inTame);
	var b = this._condExpr.inline (eng, inTame);
	var c = this._incExpr.inline (eng, inTame);
	return [ a, b, c];
    };

    that.convertToClassic = function (eng) { return null; }

    return that;
};

//=======================================================================

function SwitchStatement (startLine, expr, cases) {
    var that = new Node (startLine);
    that._expr = expr;
    that._cases = cases;

    //-----------------------------------------

    that.getChildren = function () { return this._cases; }

    //-----------------------------------------

    that.dump = function () {
	return { type : "Switch",
		 expr : this._expr.dump (),
		 cases : this._cases.map (function (x) { return x.dump (); })
	       };
    };

    //-----------------------------------------

    that.passThrough = function (eng) {
	var ret = eng.newOutput ();
	ret.addLine ("switch (" + this._expr.inline (eng, false) + ") {");
	ret.indent ();
	for (var i in this._cases) {
	    var c = this._cases[i].passThrough (eng);
	    ret.addOutput (c);
	}
	ret.unindent ();
	ret.addLine ("}");
	return ret;
    };

    //-----------------------------------------

    // The rewrite strategy here is to rewrite switch as a nested
    // cascade of if...elses...  We need to model fall-through,
    // and want to avoid n^2 code explosion, so the best thing to do
    // is to manipulate the list of cases at runtime as we fall
    // through the cascade.  The runtime array __tame_switch_calls
    // contains all cases, and we pop cases off of its head as
    // cases are eliminated.
    that.compile = function (eng) {

	var ss = this.cpsShortCircuit (eng);
	if (ss) { 
	    return ss; 
	}

	var fn = eng.fnFresh ();
	var ret = eng.newOutput (fn);
	ret.addLambda (fn);
	var x = "__tame_switch_x";
	ret.addLine ("var " + x + " = " + this._expr.inline (eng, true) + ";");

	var lbl = null;
	if (this.getLabel ()) {
	    lbl = ret.localLabelName (this.getLabel ().getName ());
	}
	var ilbl = eng.implicitControl();
	ret.initLabels (ilbl, lbl);
	ret.populateLabels (ilbl, null, ret.genericCont ());

	var calls = [];
	for (i in this._cases) {
	    var c = this._cases[i].getBody ().compile (eng);
	    ret.addOutput (c);
	    calls.push (c.fnNameRequired ());
	}
	calls.push (ret.genericCont ());
	var l = "__tame_switch_calls";
	ret.addLine ("var " + l + " = [" + calls.join (", ") + "];");
	var n_open = 0;
	for (i in this._cases) {
	    var c = this._cases[i];
	    var v = c.getValue ();
	    if (v) {
		ret.addLine ("if (" + x + " == " + v + ") {");
		ret.indent ();
	    }
	    ret.addLine (ret.callChain(l));
	    if (v) {
		ret.unindent ();
		ret.addLine ("} else {");
		ret.indent ();
		ret.addLine (l + ".shift();");
		n_open++;
	    }
	}

	while (n_open) {
	    ret.unindent ();
	    ret.addLine ("}");
	    n_open--;
	}
	ret.closeLambda ();
	return ret;
    };

    //-----------------------------------------

    return that;
};

//=======================================================================

function Case (startLine, value) {
    var that = new Node (startLine);
    that._value = value;
    that._body = null;

    //-----------------------------------------

    that.getBody = function () { return this._body; }
    that.getValue = function () { return this._value; }

    //-----------------------------------------

    that.getChildren = function () { return [ that._body ]; };

    //-----------------------------------------

    that.dump = function () {
	return { type : "Case",
		 value : this._value,
		 body : this._body.dump ()
	       };
    };

    //-----------------------------------------

    that.addBody = function (startLine, b) {
	this._body = new Block (startLine, b);
    };

    //-----------------------------------------

    that.outputLabel = function () {
	var out;
	if (this._value) {
	    out = "case " + this._value;
	} else {
	    out = "default";
	}
	out += ":";
	return out;
    };

    //-----------------------------------------

    that.passThrough = function (eng) {
	var ret = eng.newOutput ();
	ret.addLine (this.outputLabel ());
	ret.indent ();
	var c = this._body.passThrough (eng);
	ret.addOutput (c);
	ret.unindent ();
	return ret;
    };

    //-----------------------------------------

    return that;
};

//=======================================================================

function WithStatement (startLine, expr, block) {
    var that = new Node (startLine);
    that._expr = expr;
    that._block = block;
    
    //-----------------------------------------

    that.dump = function () {
	return { type : "WithStatement",
		 expr : this._expr.dump (),
		 block : this._block.dump () };
    };

    //-----------------------------------------

    that.getChildren = function () { return [ this._expr, this._block ] };

    //-----------------------------------------

    that.compile = function (eng) {
	var fn = eng.fnFresh ();
	var ret = eng.newOutput (fn);
	ret.addLambda (fn);
	ret.addLine ("with (" + this._expr.inline (eng, true) + ") {");
	ret.indent ();
	var body = this._block.compile (eng);
	ret.addOutput (body);
	ret.addCall (body.fnNameList ());
	ret.unindent ();
	ret.addLine ("}");
	ret.closeLambda ();
	return ret;
    };

    //-----------------------------------------

    that.passThrough = function (eng) {
	var ret = eng.newOutput ();
	ret.addLine ("with (" + this._expr.inline (eng, false) + ") {");
	ret.indent ();
	var body = this._block.passThrough (eng);
	ret.addOutput (body);
	ret.unindent ();
	ret.addLine ("}");
	return ret;
    };

    //-----------------------------------------


    return that;
};

//=======================================================================

function IfElseStatement (startLine, condExpr, ifStatement, elseStatement) {
    var that = new Node (startLine);
    that._condExpr = condExpr;
    that._ifStatement = ifStatement;
    if (!elseStatement) { elseStatement = new Block(startLine, []); }
    that._elseStatement = elseStatement;

    //-----------------------------------------

    that.getChildren = function () 
    { return [ this._condExpr, this._ifStatement, this._elseStatement ]; };

    //-----------------------------------------

    that.dump = function () {
	return { type : "IfElseStatement",
		 condExpr : this._condExpr.dump (),
		 ifStatement : this._ifStatement.dump (),
		 elseStatement : this._elseStatement.dump () };
    };

    //-----------------------------------------

    that.compile = function (eng) {
	var fn = eng.fnFresh ();
	var ret = eng.newOutput (fn);
	ret.addLambda (fn);
	var ifStatement = this._ifStatement.compile (eng);
	var elseStatement = this._elseStatement.compile (eng);
	var condExpr = this._condExpr.inline (eng, true);
	ret.addOutput (ifStatement);
	ret.addOutput (elseStatement);
	ret.addLine ("if (" + condExpr + ") {");
	ret.indent ();
	ret.addCall (ifStatement.fnNameList () );
	ret.unindent ();
	ret.addLine ("} else {");
	ret.indent ();
	ret.addCall ( elseStatement.fnNameList () );
	ret.unindent ();
	ret.addLine ("}");
	ret.closeLambda ();
	return ret;
    };

    //-----------------------------------------

    that.passThrough = function (eng) {
	var ret = eng.newOutput ();
	var ifStatement = this._ifStatement.passThrough (eng);
	var elseStatement = this._elseStatement.passThrough (eng);
	var condExpr = this._condExpr.inline (eng, false);
	ret.addLine ("if (" + condExpr + ") {");
	ret.indent ();
	ret.addOutput (ifStatement);
	ret.unindent ();
	ret.addLine ("} else {");
	ret.indent ();
	ret.addOutput (elseStatement);
	ret.unindent ();
	ret.addLine ("}");
	return ret;
    };

    //-----------------------------------------

    return that;
};

//-----------------------------------------------------------------------

function FunctionDeclaration (startLine, name, params, body) {
    var that = new Node (startLine);
    that._name = name;
    that._params = params;
    that._body = body;
    that._has_autocb = false;

    for (var i in params) {
	if (params[i] == autocb_name) {
	    that._has_autocb = true;
	}
    }

    //-----------------------------------------

    that.getName = function () { return this._name; }

    //-----------------------------------------

    that.getChildren = function () { 
	return [ this._body ]; 
    };

    //-----------------------------------------

    that.toFunction = function () { return this; }

    //-----------------------------------------

    // Don't propogate down, since we don't need to tame the
    // surrounding block when the inner block is tamed. 
    that._superHasAwaitStatement = that.hasAwaitStatement;
    that.hasAwaitStatement = function () { return false; };

    //-----------------------------------------

    that.funcHasAwaitStatement = function () {
	return this._superHasAwaitStatement ();
    };

    //-----------------------------------------

    that.dump = function () {
	return { type : "FunctionDeclaration",
		 name : name,
		 params : params,
		 body : this._body.dump () };
    };

    //-----------------------------------------

    that.hasAutocb = function () { return this._has_autocb; } ;

    //-----------------------------------------

    that.compile = function (eng) {

	// Make a global note of what is the current function in
	// the compilation tree.
	eng.setCurrentFunc (this);

	// For each ThisExpr in this function, make a pointer from the 
	// ThisExpr back to its parent function, also know as "this".
	// ThisExpr's need to know if their parent is tamed or not.
	var thisses = this.getThisses ();
	for (var i in thisses) {
	    thisses[i].setParentFunc (this);
	}

	var ret = eng.newOutput ();
	var nm = this._name;
	if (!nm) { nm = ""; }
	var pl = this._params.join (", ");
	var tamed = this._body.hasAwaitStatement ();
	ret.addLine ("function " + nm + " (" + pl + ") {");
	ret.indent ();

	if (tamed) {
	    ret.addLine ("var __tame_defer_cb " + 
			 "= tame.findDeferCb ([" + pl + "]);");
	    ret.addLine (eng.setActiveCb (true));
	}

	var bod;
	if (this._body.hasAwaitStatement ()) {
	    ret.addLine("var __tame_this = this;");
	    bod = this._body.compile (eng, null, true);
	    ret.addOutput (bod);
	    var callchain = [ bod.fnName() ];
	    if (this.hasAutocb ()) {
		callchain.push (autocb_name);
	    }
	    ret.addCall (callchain);
	} else {
	    bod = this._body.passThrough (eng);
	    ret.addOutput (bod);
	}
	
	if (tamed) {
	    ret.addLine (eng.setActiveCb (false));
	}
	ret.unindent ();
	ret.addLine ("}");
	return ret;
    };

    //-----------------------------------------

    return that;
};

//=======================================================================


function AwaitStatement (startLine, body) {
    var that = new Node (startLine);
    that._body = body;
    that.hasAwaitStatement = function () { return true; };

    //-----------------------------------------

    that.getChildren = function () { return [ this._body ]; };

    //-----------------------------------------

    that.dump = function () {
	return { type : "AwaitStatement",
		 body : this._body.dump () };
    };

    //-----------------------------------------

    that.compile = function (eng) {
	var fn = eng.fnFresh ();
	var ret = eng.newOutput (fn);

	var decls = this._body.getDeclarations (eng);
	for (var i in decls) {
	    var decl = decls[i];
	    ret.addLine (decl);
	}

	ret.addLambda (fn);
	var ev = ret.awaitDefers ();
	ret.addLine ("var " + ev + " = new tame.Deferrals (" 
		     + ret.genericCont() +");");
	body = this._body.compile (eng);
	ret.addOutput (body);
	ret.addLine (body.fnName() + "(" + ret.endFn () + ");");
	ret.addLine (ev + "._fulfill();");
	ret.closeLambda ();
	return ret;
    };

    //-----------------------------------------

    return that;
};

//=======================================================================

function ContinueStatement (startLine, targetLabel) {  
    var that = new Node (startLine);
    that._targetLabel = targetLabel;
    
    //-----------------------------------------

    that.dump = function () {
	return { type : "ContinueStatement",
		 targetLabel : targetLabel };
    };

    //-----------------------------------------

    that.hasAwaitStatement = function () {
	// pessimistic -- assume all labeled breaks are out of 
	// await'ed loops.  we can refine this later.
	var ret = false;
	if (this._targetLabel) { ret = true; }
	return ret;
    };

    //-----------------------------------------

    that.passThrough = function (eng) {
	var ret = eng.newOutput ();
	var lbl = "";
	if (this._targetLabel) { lbl = this._targetLabel; }
	ret.addLine ("continue " + lbl + ";");
	return ret;
    };

    //-----------------------------------------

    that.compile = function (eng) {
	var fn = eng.fnFresh ();
	var ret = eng.newOutput (fn);
	ret.addLambda (fn);
	ret.callLabel (targetLabel, eng, ret.kContinue());
	ret.closeLambda ();
	return ret;
    };

    //-----------------------------------------

    return that;
};

//=======================================================================

function BreakStatement (startLine, targetLabel) {
    var that = new Node (startLine);
    that._targetLabel = targetLabel;
    
    //-----------------------------------------

    that.dump = function () {
	return { type : "BreakStatement",
		 targetLabel : targetLabel };
    };

    //-----------------------------------------

    that.hasAwaitStatement = function () {
	// pessimistic -- assume all labeled breaks are out of 
	// await'ed loops.  we can refine this later.
	var ret = false;
	if (this._targetLabel) { ret = true; }
	return ret;
    };

    //-----------------------------------------

    that.passThrough = function (eng) {
	var ret = eng.newOutput ();
	var lbl = "";
	if (this._targetLabel) { lbl = this._targetLabel; }
	ret.addLine ("break " + lbl + ";");
	return ret;
    };

    //-----------------------------------------

    that.compile = function (eng) {
	var fn = eng.fnFresh ();
	var ret = eng.newOutput (fn);
	ret.addLambda (fn);
	ret.callLabel (targetLabel, eng, ret.kBreak ());
	ret.closeLambda ();
	return ret;
    };

    //-----------------------------------------

    return that;
};

//=======================================================================

function DoWhileStatement (startLine, condExpr, body) {
    var that = new Node (startLine);
    that._condExpr = condExpr;
    that._body = body;

    //-----------------------------------------

    that.getChildren = 
	function () { return [ this._condExpr, this._body ]; };

    //-----------------------------------------

    that.compile = function (eng) {

	// Optimization --- pass through conversion if there
	// is no await-related stuff 
	var ss = this.cpsShortCircuit (eng);
	if (ss) { 
	    return ss; 
	}

	var outer = eng.fnFresh ();
	var ret = eng.newOutput (outer);
	ret.addLambda (outer);
	var lbl = null;
	if (this.getLabel ()) {
	    lbl = ret.localLabelName (this.getLabel ().getName ());
	}
	var ilbl = eng.implicitControl ();
	ret.initLabels (ilbl, lbl);

	var inner = eng.fnFresh ();
	ret.addLambda (inner);

	var body = this._body.compile (eng);
	ret.addOutput (body);

	var checkFn = eng.fnFresh ();
	var condExpr = this._condExpr.inline (eng, true);
	ret.addLambda (checkFn);
	ret.addLine ("if (" + condExpr + ") {");
	ret.indent ();
	ret.addCall ([inner]);
	ret.unindent ();
	ret.addLine ("} else { ");
	ret.indent ();
	ret.addCall ([]);
	ret.unindent ();
	ret.addLine ("}");
	ret.closeLambda (); // checkFn

	// Call the body function, followed by the check everytime through!
	ret.addCall ([ body.fnName (), checkFn ]);

	ret.closeLambda (); // inner

	ret.populateLabels (ilbl, inner, ret.genericCont ());
	ret.addCall ([inner]);
	ret.closeLambda (); // outer
	return ret;
    };

    //-----------------------------------------

    that.passThrough = function (eng) {
	var ret = eng.newOutput ();
	var lbl = "";
	if (this.getLabel ()) {
	    label = this.getLabel () + " : ";
	}
	var condExpr = this._condExpr.inline (eng, false);
	ret.addLine (lbl + "do {");
	ret.indent ();
	var body = this._body.passThrough (eng);
	ret.addOutput (body);
	ret.unindent ();
	ret.addLine ("} while (" + condExpr + ")" );
	return ret;
    };


    //-----------------------------------------

    that.dump = function () {
	return { type : "DoWhileStatement",
		 condExpr : this._condExpr.dump (),
		 body : this._body.dump () };
    };
		 
    //-----------------------------------------

    return that;
};

//=======================================================================

function WhileStatement (startLine, condExpr, body) {
    var that = new Node (startLine);
    that._condExpr = condExpr;
    that._body = body;

    //-----------------------------------------

    that.getChildren = 
	function () { return [ this._condExpr, this._body ]; };

    //-----------------------------------------

    that.compile = function (eng) {

	// Optimization --- pass through conversion if there
	// is no await-related stuff 
	var ss = this.cpsShortCircuit (eng);
	if (ss) { 
	    return ss; 
	}

	var outer = eng.fnFresh ();
	var ret = eng.newOutput (outer);
	ret.addLambda (outer);
	var lbl = null;
	if (this.getLabel ()) {
	    lbl = ret.localLabelName (this.getLabel ().getName ());
	}
	var ilbl = eng.implicitControl ();
	ret.initLabels (ilbl, lbl);

	var inner = eng.fnFresh ();
	ret.addLambda (inner);
	var condExpr = this._condExpr.inline (eng, true);
	ret.addLine ("if (" + condExpr + ") {");
	ret.indent ();

	var body = this._body.compile (eng);
	ret.addOutput (body);
	ret.addCall ([ body.fnName (), inner ]);

	ret.unindent ();
	ret.addLine ("} else {");

	ret.indent ();
	ret.addCall ([]);

	ret.unindent ();
	ret.addLine ("}");

	ret.closeLambda (); // inner
	ret.populateLabels (ilbl, inner, ret.genericCont ());
	ret.addCall ([inner]);
	ret.closeLambda (); // outer
	return ret;
    };

    //-----------------------------------------

    that.passThrough = function (eng) {
	var ret = eng.newOutput ();
	var lbl = "";
	if (this.getLabel ()) {
	    label = this.getLabel () + " : ";
	}
	var condExpr = this._condExpr.inline (eng, false);
	ret.addLine (lbl + "while (" + condExpr + ") {");
	ret.indent ();
	var body = this._body.passThrough (eng);
	ret.addOutput (body);
	ret.unindent ();
	ret.addLine ("}");
	return ret;
    };


    //-----------------------------------------

    that.dump = function () {
	return { type : "WhileStatement",
		 condExpr : this._condExpr.dump (),
		 body : this._body.dump () };
    };
		 
    //-----------------------------------------

    return that;
};

//=======================================================================

function ReturnStatement (startLine, expr) {
    var that = new Node (startLine);
    that._expr = expr;

    //-----------------------------------------

    that.getChildren = function () { return [ this._expr ]; } ; 

    //-----------------------------------------

    that.dump = function () {
	return { type : "ReturnStatement",
		 expr : this._expr.dump () };
    };

    //-----------------------------------------

    that.passThrough = function (eng) {
	var ret = eng.newOutput ();
	var expr = this._expr
	ret.addLine ("return " + expr.inline (eng, false) + ";");
	return ret;
    };

    //-----------------------------------------

    that.compile = function (eng, tailCall, skipFn) {
	var ret = null;
	var autocb = eng.getCurrentFunc ().hasAutocb ();

	if (autocb || this._expr) {
	    var fn = eng.fnFresh ();
	    ret = eng.newOutput (fn);

	    ret.addLambda (fn);
	    ret.indent ();

	    if (autocb) {
		var call = autocb_name;
		if (this._expr) {
		    var args = this._expr.inline (eng, false);
		    if (args[0] == '(') {
			call += args;
		    } else {
			call += "(" + args + ")";
		    }
		} else {
		    call += "()"
		}
		ret.addLine (call + ";");

	    } else {
		ret.addLine (this._expr.inline (eng, false) + ";");
		ret.addCall ([ eng.endFn () ]);
	    }

	    ret.unindent ();
	    ret.closeLambda ();
	    
	} else {
	    ret = eng.newOutput (eng.endFn ());
	}
	return ret;
    };

    return that;
};

//=======================================================================

function CatchStatement (startLine, expr, body) {
    var that = new Node (startLine);
    that._expr = expr;
    that._body = body;

    //--------------------------------------------------

    that.getChildren = function () {
	var ret = [ this._expr, this._body ];
	return ret;
    };

    //--------------------------------------------------

    that.dump = function () {
	return { type : "CatchStatement",
		 "expr" : this._expr,
		 "body" : this._block };
    };

    //--------------------------------------------------

    that.passThrough = function (eng) {
	var ret = eng.newOutput ();
	ret.addLine ('catch (' + this._expr.inline (eng, false) + ') {');
	ret.indent ();
	var x = this._body.passThrough (eng);
	ret.addOutput (x);
	ret.unindent ();
	ret.addLine ('}');
	return ret;
    };


    //--------------------------------------------------

    that.compile = function (eng) {
	var ret = eng.newOutput ();
	ret.addLine ('catch (' + this._expr.inline (eng, true) + ') {');
	ret.indent ();
	var x = this._body.compile (eng);
	ret.addOutput (x);
	ret.addCall ([x.fnName ()]);
	ret.unindent ();
	ret.addLine ('}');
	return ret;
    };

    return that;
};

//-----------------------------------------------------------------------

function TryStatement (startLine, tryBlock, catchStatement, finallyBlock) {
    var that = new Node (startLine);
    that._tryBlock = tryBlock;
    that._catchStatement = catchStatement;
    that._finallyBlock = finallyBlock;

    //--------------------------------------------------

    that.getChildren = function () {
	var ret = [ this._tryBlock ];
	if (this._catchStatement) {
	    ret.push (this._catchStatement);
	}
	if (this._finallyBlock) {
	    ret.push (this._finallyBlock);
	}
	return ret;
    };

    //--------------------------------------------------

    that.dump = function () {
	return { type : "TryStatement",
		 "try" : this._tryBlock,
		 "catch" : this._catchStatement,
		 "finally" : this._finallyBlock } ;
    };

    //--------------------------------------------------

    that.passThrough = function (eng) {
	var ret = eng.newOutput ();
	ret.addLine ("try {");
	ret.indent();
	var out = this._tryBlock.passThrough (eng);
	ret.addOutput (out);
	ret.unindent ();
	ret.addLine ("}");
	if (this._catchStatement) {
	    out = this._catchStatement.passThrough (eng);
	    ret.addOutput (out);
	}
	if (this._finallyBlock) {
	    ret.addOutput ("finally {");
	    ret.indent ();
	    out = this._finallyBlock.passThrough (eng);
	    ret.addOutput (out);
	    ret.unindent ();
	    ret.add ("}");
	}
	return ret;
    };

    //--------------------------------------------------

    that.compile = function (eng) {
	var fn = eng.fnFresh ();
	var ret = eng.newOutput (fn);
	ret.addLambda (fn);
	ret.indent ();
	ret.addLine ("try {");
	ret.indent();
	var out = this._tryBlock.compile (eng);
	ret.addOutput (out);
	if (out.fnName()) {
	    ret.addCall ([out.fnName()]);
	}
	ret.unindent ();
	ret.addLine ("}");
	if (this._catchStatement) {
	    out = this._catchStatement.compile (eng);
	    ret.addOutput (out);
	    if (out.fnName()) {
		ret.addCall ([out.fnName()]);
	    }
	}
	if (this._finallyBlock) {
	    ret.addOutput ("finally {");
	    ret.indent ();
	    out = this._finallyBlock.compile (eng);
	    ret.addOutput (out);
	    if (out.fnName()) {
		ret.addCall ([out.fnName()]);
	    }
	    ret.unindent ();
	    ret.add ("}");
	}
	ret.unindent ();
	ret.closeLambda ();
	return ret;
    };

    //--------------------------------------------------

    return that;
};


//-----------------------------------------------------------------------

function Program (shbang, statements) {
    var that = new Node (1);
    that._body = new Block (1, statements, true);
    that._shbang = shbang;

    that.getChildren = function () { return [ this._body ]; };

    //-----------------------------------------

    that.dump = function () {
	return { body : this._body.dump () };
    };

    //-----------------------------------------

    that.compile = function (eng) {
	var out = eng.newOutput (null, 1);

	if (this._shbang) {
	    out.addLine (this._shbang);
	}
	// Need the runtime
	out.addLine ("var tame = require('tamejs').runtime;");
	out.addLine ("var __tame_defer_cb = null;");
	var body = this._body.compile (eng);
	out.addOutput (body);
	out.addLine (body.fnName() + " (" + out.endFn() + ");");
	return out;
    };

    //-----------------------------------------

    return that;
};

//-----------------------------------------------------------------------

exports.Program = Program;
exports.WhileStatement = WhileStatement;
exports.IfElseStatement = IfElseStatement;
exports.Expr = Expr;
exports.Block = Block;
exports.AwaitStatement = AwaitStatement;
exports.ForStatement = ForStatement;
exports.FunctionDeclaration = FunctionDeclaration;
exports.ReturnStatement = ReturnStatement;
exports.Atom = Atom;
exports.Label = Label;
exports.String = MyString;
exports.BreakStatement = BreakStatement;
exports.ContinueStatement = ContinueStatement;
exports.ForIterClassic = ForIterClassic;
exports.ForIterEach = ForIterEach;
exports.Case = Case;
exports.SwitchStatement = SwitchStatement;
exports.TryStatement = TryStatement;
exports.CatchStatement = CatchStatement;
exports.ThisExpr = ThisExpr;
exports.DeferExpr = DeferExpr;
exports.DoWhileStatement = DoWhileStatement;
exports.WithStatement = WithStatement;
exports.IndexExpr = IndexExpr;
