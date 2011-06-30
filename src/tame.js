//
// Functions to support the tame runtime!  Needs to required in every tame-
//   generated file.
//
function callChain (l) {
    if (l.length) {
	var first = l.shift ();
	first (function () { callChain (l); });
    }
};

function end () {}

function copy (from, to) {
    for (var i in from) { to[i] = from[i]; }
}

function Event (k) {
    this._count = 1;
    this._continuation = k;
    this.trigger = function () {
	this._count--;
	if (this._count == 0) {
	    this._continuation ();
	}
    };
    this.mkevent = function (dest) {
	this._count++;
	var x = this;
	return (function () { copy (arguments, dest); x.trigger (); });
    };
    return this;
};

function noop (k) { k(); };

var tame = {
    callChain : callChain,
    end : end,
    Event : Event,
    noop : noop,

    // Global labels for unadorned 'continue' and 'break' calls
    __k_global : { k_break : null, k_continue : null }
};

exports.tame = tame;
