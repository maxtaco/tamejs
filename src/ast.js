
//
// Code for making the elements of the abstract syntax tree (AST)
// for the tamejs grammar.  Everything should inherit from a Node
// object.  A Program object is output by the parser
//

//-----------------------------------------------------------------------

function Node () {
    this._label = null;
    this.setLabel = function (x) { this._label = x; }
    this.getLabel = function () { return this._label; }
};

//-----------------------------------------------------------------------

function Expr (atoms) {
    var that = new Node ();
    that._atoms = [];

    that.addAtomsDfs = function (l) {
	if (l instanceof Array) {
	    for (var x in l) {
		this.addAtomsDfs(l[x]);
	    }
	} else if (l) {
	    this._atoms.push (l);
	}
    };

    that.hasTwaitStatement = function () {
	return false;
    };

    that.addString = function (s) {
	this._atoms.push (s);
    };

    that.setLabel = function (x) { 
	this._atoms.unshift (":");
	this._atoms.unshift (x);
    };

    that.dumpAtom = function (x) {
	if (typeof (x) == 'string') {
	    return x;
	} else {
	    return x.dump ();
	}
    };

    that.dump = function () {
	return { type : "Expr",
		 atoms : this._atoms.map (this.dumpAtom) };
    };

    that.addAtomsDfs (atoms);

    return that;
};

//-----------------------------------------------------------------------

function Block (s) {
    var that = new Node ();
    that._body = s;

    that.hasTwaitStatement = function () {
	for (x in this._body) {
	    if (x.hasTwaitStatement ()) {
		return true;
	    }
	}
	return false;
    };

    that.dump = function () {
	return { type : "Block",
		 atoms : [ this._body.map (function (x) 
					   { return x.dump (); }) ] };
    };

    return that;
};

//-----------------------------------------------------------------------

function ForStatement (forIter, statement) {
    var that = new Node ();
    that._forIter = forIter;
    that._statement = statement;

    that.hasTwaitStatement = function () {
	return this._statement.hasTwaitStatement ();
    };

    that.dump = function () {
	return { type : "For",
		 iter : this._forIter.dump (),
		 statement : this._statement.dump () };
    };

    return that;
};

//-----------------------------------------------------------------------

function ForIterClassic (initExpr, condExpr, incExpr) {
    var that = new Node ();
    that._initExpr = initExpr;
    that._condExpr = condExpr;
    that._incExpr = incExpr;

    that.dump = function () {
	return { type : "ForIterClassic",
		 initExpr : this._initExpr.dump (),
		 condExpr : this._condExpr.dump (),
		 incExpr : this._incExpr.dump () };
    };
    return that;
};

//-----------------------------------------------------------------------

function IfElseStatement (condExpr, ifStatement, elseStatement) {
    var that = new Node ();
    that._condExpr = condExpr;
    that._ifStatement = ifStatement;
    if (!elseStatement) { elseStatement = new Block([]); }
    that._elseStatement = elseStatement;

    that.hasTwaitStatement = function () {
	return this._ifStatement.hasTwaitStatement () ||
	    this._elseStatement.hasTwaitStatement ();
    };

    that.dump = function () {
	return { type : "IfElseStatement",
		 condExpr : this._condExpr.dump (),
		 ifStatement : this._ifStatement.dump (),
		 elseStatement : this._elseStatement.dump () };
    };

    return that;
};

//-----------------------------------------------------------------------

function FunctionDeclaration (name, params, body) {
    var that = new Node ();
    that._name = name;
    that._params = params;
    that._body = new Block (body);

    that.hasTwaitStatement = function () {
	return this._body.hasTwaitStatement ();
    };

    that.dump = function () {
	return { type : "FunctionDeclaration",
		 name : name,
		 params : params,
		 body : this._body.dump () };
    };

    return that;
};

//-----------------------------------------------------------------------

function TwaitStatement (body) {
    var that = new Node ();
    that._body = body;
    that.hasTwaitStatement = function () { return true; };

    that.dump = function () {
	return { type : "TwaitStatement",
		 body : this._body.dump () };
    };
    return that;
};

//-----------------------------------------------------------------------

function WhileStatement (condExpr, body) {
    var that = new Node ();
    that._condExpr = condExpr;
    that._body = body;

    that.dump = function () {
	return { type : "WhileStatement",
		 condExpr : this._condExpr.dump (),
		 body : this._body.dump () };
    };
		 
    return that;
};

//-----------------------------------------------------------------------

function Program (body) {
    this._body = body;

    this.dump = function () {
	return { body : this._body.map (function (x) { return x.dump (); }) };
    };
};

//-----------------------------------------------------------------------

exports.Program = Program;
exports.WhileStatement = WhileStatement;
exports.IfElseStatement = IfElseStatement;
exports.Expr = Expr;
exports.Block = Block;
exports.TwaitStatement = TwaitStatement;
exports.ForStatement = ForStatement;
exports.FunctionDeclaration = FunctionDeclaration;
