
before:

A(block) {
    B(If) {
	C(If) {
            D(Block) {
		E(passthrough);
		F(Return);
		G(passthrough);
	    }
	    H(Else) {
		I(block) {
		    J(passthrough);
		    K(await);
		    L(passthrough);
		}
	    }
	}
	M(block) {
            N(passthrough);
	}
    }
    O(block);
}

after:


A(block) {
    B(If) {
	C(If) {
            D(Block) {
		E(passthrough);
		F(Return) {
		    G(passthrough);
		    _k_C;
		}
	    }
	    H(Else) {
		I(block) {
		    J(passthrough);
		    K(await) {
			L(passthrough);
			_k_C;
		    }
		}
	    }
	    _k_C : M(block) {
		N(passthrough);
		_k_B;
	    }
	}
	_k_B : O(block);
    }
}
        
       



function bar (x) {
    if (x) { 
	if (x == 3) {
	    if (y == 4) {
		return x;
	    }
	    x++;
	} else {
	    x += 3
	    await { foo (defer()); }
	    x++;
	}
	b++;
    }
    x++;
    return x;
}

function bar (x) {
    var _ret;
    (function (_k) {
	if (x) { 
	    (function (_k) {
		if (x == 3) {
		    _ret = 3;
		    function () {
			x++;
			_k();
		    };
		} else {
		    x += 3
		    (function (_k) {
			var d = Defers (_k);
			foo (defers.defer ());
		    })(function () {
			x++;
			_k ();
		    });
		}
	    })(function () {
		b++;
		_k();
	    });
	}
    })(function() {
	x++;
	_ret = x;
    });
    return _ret;
}




function foo (x) {
    if (x) {
	blah ();
    } else if (boobs) {
	booring ();
    } else if (blahblahs ()) {
	jam ();
    } else {

    }
    rest ();
}

function foo (x) {
    (function (_k) {
	if (x) {
	    blah ();
	} else if (boobs) {
	    booring ();
	} else if (blahblahs ()) {
	    (function (_k) {
		if (bad ()) {
		    _k = stop;
		}
		_k ();
	    ))(function () {
		other_stuff ();
	    });
	} else {
	}
	_k();
    })(function () {
	rest ();
    });
}
