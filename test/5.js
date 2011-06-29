

function main (x) {

    var action = function (ev) {
	twait { setTimeout (mkevent (), 100); }
	ev();
    };

    var iter = function (ev, i) {
	console.log ("+ " + i);
	twait { action (mkevent ()); }
	console.log ("- " + i);
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
