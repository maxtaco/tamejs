

function loop (x) {
    
    for (var i = 0; i < x; i++) {
	console.log ("hi " + i);
	blocker (function () {});
	console.log ("back " + i);
    }
}

function blocker (cb) {
    console.log ("Blocked!");
    cb ();
}

function compiled_loop (x) {
    
    var i = 0;

    function __f1 () {
	if (i < x) {
	    __f2 ();
	}
    }
    
    function __f3 () {
	i++;
	__f1 ();
    }
    
    function __f2 () {
	console.log ("hi " + i);
	function __g () {
	    console.log ("back " + i);
	    __f3 ();
	}
	blocker (__g);
    }
    __f1 ();
}

loop (10);
compiled_loop (10);
