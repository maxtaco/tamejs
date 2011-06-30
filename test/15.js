var dns = require("dns");

function do_one (ev, host) {
    var res = [];
    twait { dns.resolve (host, "A", mkevent (res));}
    console.log (host + " -> " + res[1]);
    ev();
};

function do_all (lst, windowsz) {
    var rv = new tame.Rendezvous ();
    var n = lst.length;
    var nsent = 0;
    var nrecv = 0;
    
    while (nrecv < n) {
	if (nsent - nrecv < windowsz && nsent < n) {
	    do_one (rv.mkev (nsent), lst[nsent]);
	    nsent++;
	} else {
	    var res = [];
	    twait { rv.wait (mkevent (res)); }
	    console.log ("got back lookup #" + res[0]);
	    nrecv++;
	}
    }
};

do_all (process.argv.slice (2), 3);
