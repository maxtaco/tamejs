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

var tame = {
    callChain : callChain,
    end : end,

    // Global labels for unadorned 'continue' and 'break' calls
    __k_global : { k_break : null, k_continue : null }
};

exports.tame = tame;
