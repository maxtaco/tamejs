

function bar (x, cb) {
    cls.tot = 0;
    var i = 1;
    function b1a () {
	function b1b () {
	    i ++;
	}
	if (first) {
	    for (i = 0; i < 10; i++) {
		b1b ();
	    }
	} else {
	    b1b ();
	}
    }
	
	for (cls.i = 0; cls.i < arg.x; cls.i++) {
	    function b2 () {
		if (do_it) {
		    var k = 3;
		    function b3 () {
			var l = 4;
			jam (mkev (cls.tmp)); 
		    }
		    b3 ();
		    cls.tot += cls.tmp;
		}
	    }
	    b2 ();
	}
    }
    b1();
    cb(cls.tot);
}

