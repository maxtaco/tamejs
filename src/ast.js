
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
};

function Block (s) {
    this._sourceElements = s;
};

