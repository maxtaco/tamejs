
function Node () {
    this._label = null;
    this.setLabel = function (x) { this._label = x; }
    this.getLabel = function () { return this._label; }
};

function Expr (atoms) {
    var that = new Node ();
    that._atoms = [];
    that.addAtomsDfs (atoms);

    that.addAtomsDfs = function (l) {
	if (l instanceof Array) {
	    for (var x in l) {
		this.addAtomsDfs(x);
	    }
	} else if (l) {
	    this._atoms.push (x);
	}
    };

    that.hasTwaitStatement = function () {
	return false;
    };

    return that;
};

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

    return that;
};

function ForStatement (forIter, statement) {
    var that = new Node ();
    that._forIter = forIter;
    that._statement = statement;

    that.hasTwaitStatement = function () {
	return this._statement.hasTwaitStatement ();
    };

    return that;
};

function ForIterClassic (initExpr, condExpr, incExpr) {
    var that = new Node ();
    that._initExpr = initExpr;
    that._condExpr = condExpr;
    that._incExpr = incExpr;
    return that;
};

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

    return that;
};

function FunctionDeclaration (name, params, body) {
    var that = new Node ();
    that._name = name;
    that._params = params;
    that._body = new Block (body);

    that.hasTwaitStatement = function () {
	return this._body.hasTwaitStatement ();
    };

    return that;
};

function TwaitStatement (body) {
    var that = new Node ();
    that._body = body;
    that.hasTwaitStatement = function () { return true; };
    return that;
};

function WhileStatement (condExpr, body) {
    var that = new Node ();
    that._body = body;
    that._condExpr = condExpr;
    that._body = body;
    return that;
};

function Program (body) {
    this._body = body;
};

