//
// Copyright (c) 2011 (MIT License)
//    Maxwell Krohn <max@okcupid.com>
//    HumorRainbow, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
//
//-----------------------------------------------------------------------
//
// Functions to support the tame runtime!  Needs to required in every tame-
//   generated file. All are core, except for Rendezvous, which isn't
//   core, but is quite useful.
//
//-----------------------------------------------------------------------

"use strict";

function callChain (l) {
    if (l.length) {
	var first = l.shift ();
	first (function () { callChain (l); });
    }
};

//-----------------------------------------------------------------------

function end () {}

//-----------------------------------------------------------------------

function restArr (from, offset) {
    var to = [];
    for (var i in from) { 
	var j = parseInt (i);
	to[j] = from[offset + j]; 
    }
    return to;
}

//-----------------------------------------------------------------------

function makeDeferReturn (x, defer_args, id) {
    var ret = function () { 
	if (defer_args && defer_args.assign_fn) {
	    defer_args.assign_fn.apply (null, arguments); 
	} 
	x._fulfill (id); 
    };
    if (defer_args) {
	ret.__tame_trace = {};
	var keys = [ "parent_cb", "file", "line", "func_name" ];
	for (var k in keys) {
	    var key = keys[k];
	    ret.__tame_trace[key] = defer_args[key];
	}
    }
    return ret;
};
    
//=======================================================================

function Rendezvous () {
    this._completed = [];
    this._waiters = [];
    this._defer_id = 0;

    //-----------------------------------------

    this.RvId = function (rv, id) {
	this.defer = function (defer_args) {
	    return rv._deferWithId (id, defer_args);
	};
    };

    //-----------------------------------------
    //
    // The public interface has 3 methods --- wait, defer and id

    this.wait = function (ev) {
	if (this._completed.length) {
	    var x = this._completed.shift ();
	    ev (x);
	} else {
	    this._waiters.push (ev);
	}
    };

    this.defer = function (defer_args) {
	var id = this._defer_id++;
	this._deferWithId (id, defer_args);
    };

    this.id = function (i) {
	return { __tame_defers : new this.RvId (this, i) };
    };
    
    //
    //-----------------------------------------

    // This is a hack to work with the semantic desugaring of
    // 'defers' output by the tamejs compiler.
    this.__tame_defers = this;

    //-----------------------------------------

    this._fulfill = function (id) {
	if (this._waiters.length) {
	    var x = this._waiters.shift ();
	    x (id);
	} else {
	    this._completed.push (id);
	}
    };

    this._deferWithId = function (id, defer_args) {
	this._count ++;
	var x = this;
	return makeDeferReturn (x, defer_args, id);
    };

    return this;
};

//=======================================================================

function Deferrals (k) {
    this._count = 1;
    this._continuation = k;
    this._fulfill = function () {
	this._count--;
	if (this._count == 0) {
	    this._continuation ();
	}
    };
    this.defer = function (defer_args) {
	this._count++;
	var x = this;
	return makeDeferReturn (x, defer_args, null);
    };
    return this;
};

//-----------------------------------------------------------------------

var _active_cb = null;
function setActiveCb (c) { _active_cb = c; };
function getActiveCb () { return _active_cb; }

//-----------------------------------------------------------------------

function findDeferCb (l) {
    var ret = null;
    for (var i in l) {
	var arg = l[i];
	if (arg && arg.__tame_trace) {
	    ret = arg;
	    break;
	}
    }
    return ret;
}

//-----------------------------------------------------------------------

function noop (k) { k(); };

//-----------------------------------------------------------------------

// Starting at the given callback, walk the Tame callback stack
// outputting a vector of strings, which can later be joined to
// make console output.
function stackWalk (cb) {
    var ret = [];
    if (!cb) { cb = getActiveCb (); }
    var tr;
    while (cb && (tr = cb.__tame_trace)) {
	var fn = tr.func_name;
	if (!fn) { fn = "<anonymous>"; }
	var line = "    at " + fn + " (" + tr.file + ":" + tr.line + ")";
	ret.push (line);
	cb = tr.parent_cb;
    }
    return ret;
}

//-----------------------------------------------------------------------

// Output the standard node.js exception, and also the tame exception
// stack (if such a thing exists).
function exceptionHandler (err) {
    console.log (err.stack);
    var stack = stackWalk ();
    if (stack.length) {
	console.log ("Tame 'stack' trace:");
	console.log (stack.join ("\n"));
    }
};

//-----------------------------------------------------------------------

// Catch all uncaught exceptions with the tamejs exception handler.
// As mentioned here:
//
//    http://debuggable.com/posts/node-js-dealing-with-uncaught-exceptions:4c933d54-1428-443c-928d-4e1ecbdd56cb 
// 
// It's good idea to kill the service at this point, since state
// is probably horked. See his examples for more explanations.
function catchExceptions () {
    process.on ('uncaughtException', function (err) {
	exceptionHandler (err);
	process.exit (1);
    });
};

//-----------------------------------------------------------------------

var runtime = {
    callChain : callChain,
    end : end,
    noop : noop,

    Deferrals : Deferrals,
    Rendezvous : Rendezvous,
    restArr : restArr,
    setActiveCb : setActiveCb,

    stackWalk : stackWalk,
    exceptionHandler : exceptionHandler,
    catchExceptions : catchExceptions,
    findDeferCb : findDeferCb
};

//-----------------------------------------------------------------------

exports.runtime = runtime;
