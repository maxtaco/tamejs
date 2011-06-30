

function call (i, ev) {
    console.log ("+call " + i);
    twait { setTimeout (mkevent (), 3000*Math.random()); }
    console.log ("-call " + i);
    ev();
};

function window (n, window) {
    var rv = new tame.Rendezvous ();
    var nsent = 0;
    var nrecv = 0;

    while (nrecv < n) {
	if (nsent - nrecv < window && nsent < n) {
	    call (nsent, rv.mkev (nsent));
	    nsent++;
	} else {
	    var res = [];
	    twait { rv.wait (mkevent (res)); }
	    console.log ("got back id=" + res[0]);
	    nrecv++;
	}
    }
};

window (100, 10);
