
function foo () {
    var i = 0;
    while (i) {
	twait { bar (i, mkevent ()); }
	i--;
    }
}

function compiled_foo () {
    var i = 0;
    var __f1 = function () {
	while (i) {
	    var __f2 = function () {
		bar (__f3);
		var __f3 = function () {
		    i--;
		}
	    }
	    __f2 ();
	}
    }
    __f1 ();
}
    
