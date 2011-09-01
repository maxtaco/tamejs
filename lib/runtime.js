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

//=======================================================================

function Rendezvous () {
    this._completed = [];
    this._waiters = [];
    this._defer_id = 0;

    //-----------------------------------------

    this.RvId = function (rv, id) {
	this.defer = function (assign_fn) {
	    return rv._deferWithId (id, assign_fn);
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

    this.defer = function (assign_fn) {
	var id = this._defer_id++;
	this._deferWithId (id, assign_fn);
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
	return (function () { 
	    if (defer_args && defer_args.assign_fn) {
		defer_args.assign_fn.apply (null, arguments);
	    }
	    x._fulfill (id);
	});
    };

    return this;
};

//=======================================================================

function Defers (k) {
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
	return (function () { 
	    if (defer_args && defer_args.assign_fn) {
		defer_args.assign_fn.apply (null, arguments); 
	    } 
	    x._fulfill (); 
	});
    };
    return this;
};

//-----------------------------------------------------------------------

function noop (k) { k(); };

//-----------------------------------------------------------------------

var runtime = {
    callChain : callChain,
    end : end,
    noop : noop,

    Defers : Defers,
    Rendezvous : Rendezvous,
    restArr : restArr

};

//-----------------------------------------------------------------------

exports.runtime = runtime;
