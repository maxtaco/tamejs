
function foo () {
    var i = 1;
    while (i) {
	var i = 0;
	i--;
	twait { foo (mkev()); }
	break;
    }
    console.log (i);
}

function compiled_foo ()
{
    var __f1 = function () {
	var i = 1;
	var __f2 = function () {
	    var __f3 = function () {
		if (i) {
		    var __f4 = function () {
			var i = 0;
			var __f5 = function () {
			    i--;
			    
			    var __f7 = function () {
				__f6 ();
			    }
			    __f7 ();
			}
			__f5 ();
		    }
		    __f4 ();
		    __f3 ();
		} else {
		    __f6 ();
		}
	    }
	    var __f6 = function () { 
		console.log ();
	    }
	    __f3 ();
	}
	__f2 ();
    }
    __f1 ();
}
