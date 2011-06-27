
//-----------------------------------------------------------------------
//
//  A piece of output as output by the compilation engine

function Output (fnName) {

    this._fnName = fnName;
    this._lines = [];
    this._indent = 0;

    this.indent = function () { this._indent ++; };
    this.unindent = function () { this._indent--; };

    this.addLine = function (l) {
	this._lines.push ([this._indent, l]);
    };

    this.addOutput = function (o) {
	for (var i in o._lines) {
	    var line = o._lines[i];
	    this._lines.push (this._indent + line[0], line[1]);
	}
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
