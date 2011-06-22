

function loop (x) {
    
    for (var i = 0; i < x; i++) {

	if (i == 4) { 
	    continue;
	} else if (i == 5) {
	    //twait { blocker (mkevent ()); }
	    console.log ("jammed!");
	} else if (i == 9) {
	    console.log ("outtie");
	    break;
	} else {
	    console.log ("hi " + i);
	    // twait { blocker (mkevent ()); }
	    console.log ("back " + i);
	}
	console.log ("ass-end");
    }
}

function blocker (cb) {
    console.log ("Blocked!");
    cb ();
}

function blk2 (e) {
    console.log ("EEEEE1");
    e.trigger ();
}

function blk3 (e) {
    console.log ("EEEEE2");
    e.trigger ();
}

function Event (k) {
    this._k = k;
    this._count = 1;

    this.mkevent = function () {
	this._count ++;
	return this;
    }

    this.trigger = function () {
	this._count --;
	if (this._count == 0) {
	    this._k ();
	}
    }
}


function compiled_loop (x) {
    
    var i = 0;

    function __f1 () {
	if (i < x) {
	    __f2 ();
	} else {

	}
    }
    
    function __f3 () {
	i++;
	__f1 ();
    }
    
    function __f2 () {

	function __b2 () {
	    console.log ("ass-end");
	    __f3 ();
	}
	    

	if (i == 4) {
	    __f3 ();
	} else if (i == 5) {
	    function __g1 () {
		console.log ("jammed");
		__b2 ();
	    }
	    e = new Event (__g1);
	    blk2 (e.mkevent ());
	    blk3 (e.mkevent ());
	    e.trigger ();
	} else if (i == 9) {
	    console.log ("outtie!");
	} else {
	    console.log ("hi " + i);
	    function __g2 () {
		console.log ("back " + i);
		__b2 ();
	    }
	    blocker (__g2);
	}
    }
    __f1 ();
}

compiled_loop (10);
