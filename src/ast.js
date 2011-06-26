
function Expr (atoms) {
    this._atoms = [];
    this.addAtomsDfs (atoms);

    this.addAtomsDfs = function (l) {
	if (l instanceof Array) {
	    for (var x in l) {
		this.addAtomsDfs(x);
	    }
	} else if (l) {
	    this._atoms.push (x);
	}
    };

    this.hasTwaitStatement = function () {
	return false;
    };
};

function Block (s) {
    this._body = s;

    this.hasTwaitStatement = function () {
	for (x in this._body) {
	    if (x.hasTwaitStatement ()) {
		return true;
	    }
	}
	return false;
    };
};

function ForStatement (forIter, statement) {
    this._forIter = forIter;
    this._statement = statement;

    this.hasTwaitStatement = function () {
	return this._statement.hasTwaitStatement ();
    };
};

function ForIterClassic (initExpr, condExpr, incExpr) {
    this._initExpr = initExpr;
    this._condExpr = condExpr;
    this._incExpr = incExpr;
};

function IfElseStatement (condExpr, ifStatement, elseStatement) {
    this._condExpr = condExpr;
    this._ifStatement = ifStatement;
    if (!elseStatement) { elseStatement = new Block([]); }
    this._elseStatement = elseStatement;

    this.hasTwaitStatement = function () {
	return this._ifStatement.hasTwaitStatement () ||
	    this._elseStatement.hasTwaitStatement ();
    };
};

function FunctionDeclaration (name, params, body) {
    this._name = name;
    this._params = params;
    this._body = new Block (body);

    this.hasTwaitStatement = function () {
	return this._body.hasTwaitStatement ();
    };
};

function TwaitStatement (body) {
    this._body = body;
    this.hasTwaitStatement = function () { return true; };
};

function WhileStatement (condExpr, body) {
    this._condExpr = condExpr;
    this._body = body ();
};

