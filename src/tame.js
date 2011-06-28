
function callChain (l) {
    if (l.length) {
	var first = l.pop ();
	first (function () { callChain (l); });
    }
};

var Tame = {
    Runtime : {
	callChain : callChain
    };
};

exports.Tame = Tame;
