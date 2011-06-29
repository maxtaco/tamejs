

function main (x) {

    var action = function (ev) {
	var timeout = 100;
	twait { setTimeout (mkevent (), timeout); }
	ev(timeout);
    };

    var iter = function (ev, i) {
	console.log ("+ " + i);
	var res = [];
	twait { action (mkevent (res)); }
	console.log ("- " + i + " (slept " + res[0] + ")");
	ev();
    };

    var go = function (ev, n) {
	console.log ("go!");
	var i = 0;
	while (1) {
	    twait { iter (mkevent (), i); }
	    i++;
	    if (i == n) {
		ev ();
		return;
	    }
	}
    };
    
    console.log ("main!");
    twait { go (mkevent (), x); }
    console.log ("done!");
};

main (200);
