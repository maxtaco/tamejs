
if (false) {
    for (var i = 0; i < 5; i++) {
	console.log ("iter " + i);
    }
    console.log ("done");
}

var __labels;
var __k_global;

var __f1 = function () {
    var i = 0; 
    var __f2 = function () { return (i < 5); }; 
    var __f3 = function () { i++; }
    var __f4 = function () {
	if (__f2 ()) {
	    var __f5 = function () { console.log ("iter " + i); }
	    __f5 ();
	    __f3 ();
	    __f4 ();
	} else {
	    __f6 ();
	}
    }
    var __f6 = function() { console.log ("done"); }
    __k_global = { k_break : __f6, k_continue : __f4 };
    __f4 ();
};
__f1 ();
