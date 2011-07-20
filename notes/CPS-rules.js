
// CPS[b k] is the CPS conversion of the block b, followed by the continuation
// k, which is the rest of the program...
// This conversion is inspired by CPS conversion, but obviously isn't
// a formal example of it.

// l is an optional label
CPS[ l : while (e) { b }  ] = function (k) {

    var __k_label_l = {};
    var __f1 = function () {
	if (e) {
	    var __f3 = CPS[b];
	    call_chain ([__f3, __f1, k]);
	} else {
	    call_chain([k]);
	}
    };
    tame.setLabels (__k_label_l, { k_break : k, k_continue : __f1 });
    __f1 ();
};

// See event.js for what the event does.  It's a pure-javascript
// doo-hickey.
CPS[ await { b } k ] = {
    var __ev = new Event ();
    var __f1 = CPS[b];
    var __f2 = CPS[k];
    __ev._set_continuation (__f2);
    __f1 ();
    __ev._fulfill (); 
};

CPS[mkev] = { __ev.mkev };

// break to the given label l
CPS[break l; k] = {
    __labels.l.k_break ();
};

// break to the globally-innermost block.
CPS[break; k] = {
    __k_global.k_break ();
};

CPS[continue l; k] = {
    __labels.l.k_continue ();
};

CPS[continue; k] = {
    __k_global.k_continue ();
};

// We want to make sure not to have exponential code-explosion,
// so only translate the continuation for the rest of the program once.
CPS[if (e1) { b1 } else { b2 } k] =  {

    var __f1 = function () {
	if (e1) {
	    var __f2 = CPS[b1 ; __f4()];
	    __f2 ();
	} else {
	    var __f3 = CPS[b2 ; __f4()];
	    __f3 ();
	}
    }
    var __f4 = CPS[k];
    __f1 ();
};

CPS[ if (e1) { b1 } k ] =  CPS[ if (e1) { b1 } else {} k ];

CPS[ l : for (e1; e2; e3) { b } k ] = {
    var __labels;
    var __f1 = function () {
	e1; 
	var __f2 = function () { return e2; }; 
	var __f3 = function () { e3; }
	var __f4 = function () {
	    if (__f2 ()) {
		var __f5 = CPS[b];
		__f5 ();
		__f3 ();
		__f4 ();
	    } else {
		__f6 ();
	    }
	}
	var __f6 = CPS[k];
	__labels.l = __k_global = { k_break : __f6, k_continue : __f4 };
	__f4 ();
    };
    __f1 ();
};

// For now, just do the naive thing.  Realize the iteration up-front and
// then iterate over the fixed vector.  This translation might be buggy
// in the cases that the iteration changes the thing being iterated over.
CPS[ l : for (i in X) { b } k ] = {
    var __f1 = function () {
	var _v = [];
	for (i in X) { v.push (i); }
	CPS[l : for (var __k = 0; __k < X.length; __k++) { b } k ];
    };
    __f1 ();
};

// Unsure of this..
CPS[ try { b1 } catch (e) { b2 } k ] = {
    try { CPS[b1 k] } catch (e) { CPS[b2 k] }
};

CPS[ switch (e) { case e1 : b1  case e2 : b2 : default : d }  k ] =
{
    var __g1 = function () {
	switch (e) {
	case e1: __f1 ();
	case e2: __f2 ();
	...
	default: __fn ();
	}
    };
    var __f1 = CPS[b1; __f2() ];
    var __f2 = CPS[b2; __f3() ];
    var __fn = CPS[d;  __g2() ];
    var __g2 = CPS[k];
    __k_global = { k_break : __g2 };
    __g1 ();
};

// The function name [name] is optional...
CPS[ function [name] (params) { b } ] =
{
    function [name] (params) {
	__ret_global.push (null);
	var __f1 = CPS[b];
	__f1 ();
	return __ret_global.pop ();
    }
};

CPS[ return X;  k ] =
{
    __ret_global[__ret_global.length - 1] = X;
};

// Need to fix this to handle tail calls, as in ast.js
CPS[ s1; s2; s3; ... ] = function (k) {
    CPS[s1; CPS[s2; .... ]];
};

