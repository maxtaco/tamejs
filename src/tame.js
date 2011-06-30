//
// Functions to support the tame runtime!  Needs to required in every tame-
//   generated file. All are core, except for Rendezvous, which isn't
//   core, but is quite useful.
//

//-----------------------------------------------------------------------

function callChain (l) {
    if (l.length) {
	var first = l.shift ();
	first (function () { callChain (l); });
    }
};

//-----------------------------------------------------------------------

function end () {}

//-----------------------------------------------------------------------

function copy (from, to) {
    for (var i in from) { to[i] = from[i]; }
}

//-----------------------------------------------------------------------

function Rendezvous () {
    this._completed = [];
    this._waiters = [];

    this.mkev = function (id, dest) {
	this._count ++;
	var x = this;
	return (function () { copy (arguments, dest); x.trigger (id); });
    };

    this.wait = function (ev) {
	if (this._completed.length) {
	    var x = this._completed.shift ();
	    ev (x);
	} else {
	    this._waiters.push (ev);
	}
    };
    
    this.trigger = function (id) {
	if (this._waiters.length) {
	    var x = this._waiters.shift ();
	    x (id);
	} else {
	    this._completed.push (id);
	}
    };
    return this;
};

//-----------------------------------------------------------------------

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

//-----------------------------------------------------------------------

function noop (k) { k(); };

//-----------------------------------------------------------------------

var tame = {
    callChain : callChain,
    end : end,
    noop : noop,

    Event : Event,
    Rendezvous : Rendezvous,

    // Global labels for unadorned 'continue' and 'break' calls
    __k_global : { k_break : null, k_continue : null }
};

//-----------------------------------------------------------------------

exports.tame = tame;
