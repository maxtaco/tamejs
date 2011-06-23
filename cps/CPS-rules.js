
// CPS[b k] is the CPS conversion of the block b, followed by the continuation
// k, which is the rest of the program...

// l is an optional label
CPS[ l : while (e) { b }  k ] = {

    var __labels;
    var __f1 = function () {
	if (e) {
	    var __f3 = CPS[b];
	    __f3 ();
	    __f1 ();
	} else {
	    __f2 ();
	}
    };
    var __f2 = CPS[k];
    __labels.l = __k_global = { k_break : __f2, k_continue : __f1 };
    __f1 ();
};

// See event.js for what the event does.  It's a pure-javascript
// doo-hickey.
CPS[ twait { b } k ] = {
    var __ev = new Event ();
    var __f1 = CPS[b];
    var __f2 = CPS[k];
    __ev._set_continuation (__f2);
    __f1 ();
    __ev._trigger (); 
};

CPS[mkev(obj, slot)] = {
    __ev.mkev_slot(obj, slot);
};

CPS[mkev()] = {
    __ev.mkev();
};

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

CPS[ if (e1) { b1 } else { b2 } k ] =  {

    var __f1 = function () {
	if (e1) {
	    var __f2 = CPS[b1 k];
	    __f2 ();
	} else {
	    var __f3 = CPS[b2 k];
	    __f3 ();
	}
    }
    __f1 ();
};

CPS[ if (e1) { b1 } k ] =  CPS[ if (e1) { b1 } else {} k ];

CPS[ l : for (e1; e2; e3) { b } k ] = {
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

// Unsure of this..
CPS[ try { b1 } catch (e) { b2 } k ] = {
    try { CPS[b1 k] } catch (e) { CSCP[b2 k] }
};

// This is a bit ugly since there's n^2 code generation.  There
// might be a better way.
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
    var __f1 = CPS[b1 b2 b3 ... d k];
    var __f2 = CPS[b2 b3 ..... d k];
    var __fn = CSC[d k];
    var __g2 = CPS[k];
    __k_global = { k_break : __g2 };
    __g1 ();
};
