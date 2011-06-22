
CPSC[ l : while (e) { b }  k ] = {

    var __labels;
    var __f1 = function () {
	if (e) {
	    var __f3 = CPSC[b];
	    __f3 ();
	    __f1 ();
	} else {
	    __f2 ();
	}
    };
    var __f2 = CPSC[k];
    __labels.l = __k_global = { k_break : __f2, k_continue : __f1 };
    __f1 ();
};

CPSC[ twait { b } k ] = {
    var __ev = new Event ();
    var __f1 = CPSC[b];
    var __f2 = CPSC[k];
    __ev.set_continuation (__f2);
    __f1 ();
    __ev.trigger ();
};

CPSC[mkev()] = {
    __ev.mkev();
};

CPSC[break l; k] = {
    __labels.l.k_break ();
};

CPSC[break; k] = {
    __k_global.k_break ();
};

CPSC[continue l; k] = {
    __labels.l.k_continue ();
};

CPSC[continue; k] = {
    __k_global.k_continue ();
};

CPSC[ if (e1) { b1 } else { b2 } k ] =  {

    var __f1 = function () {
	if (e1) {
	    var __f2 = CPSC[b1 k];
	    __f2 ();
	} else {
	    var __f3 = CPSC[b2 k];
	    __f3 ();
	}
    }
    __f1 ();
};

CPSC[ if (e1) { b1 }  k ] =  {

    var __f1 = function () {
	if (e1) {
	    var __f2 = CPSC[b1 k];
	    __f2 ();
	} else {
	    var __f3 = CPSC[k];
	    __f3 ();
	}
    }
    __f1 ();
};

CSPC[ l : for (e1; e2; e3) { b } k ] = {
    var __f1 = function () {
	e1; 
	var __f2 = function () { return e2; }; 
	var __f3 = function () { e3; }
	var __f4 = function () {
	    if (__f2 ()) {
		var __f5 = CPSC[b];
		__f5 ();
		__f3 ();
		__f4 ();
	    } else {
		__f6 ();
	    }
	}
	var __f6 = CPSC[k];
	__labels.l = __k_global = { k_break : __f6, k_continue : __f4 };
	__f4 ();
    };
    __f1 ();
};

CPSC[ try { b1 } catch (e) { b2 } k ] = {
    try { CPSC[b1 k] } catch (e) { CSCP[b2 k] }
};

