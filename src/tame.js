
function callChain (l) {
    if (l.length) {
	var first = l.pop ();
	first (function () { callChain (l); });
    }
};

function end () {}

var Tame = {
    Runtime : {
	callChain : callChain,
	end : end
    };
};

exports.Tame = Tame;
