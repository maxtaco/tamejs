tamejs
======
This package is a source-to-source translator that outputs JavaScript. The
input dialect looks a lot like JavaScript, but introduces the `twait` 
primitive, which allows asynchronous callback style code to work more
like straight-line threaded code.  *tamejs* is written in JavaScript.

One of the core powers of the *tamejs* rewriting idea is that it's fully
compatible with existing vanilla-JS code (like `node.js`'s libraries).
That is, existing `node.js` can call code that's been output by the
*tamejs* rewriter, and conversely, code output by the *tamejs*
rewriter can call existing `node.js` code.  This means that *tamejs*
is incrementally deployable --- you can keep all of your old code and
just write the new bits in *tamejs*!
 
Code Examples
--------
Here is a simple example that prints "hello" 10 times, with 100ms delay
slots in between:

```javascript  
for (var i = 0; i < 10; i++) {
    twait { setTimeout (mkevent (), 100); }
    console.log ("hello");
}
```

The way to read this is: "wait in the `twait{..}` block until all
events made by `mkevent` have been fired."  In this case, there is only
one event, so after that's fired (in 100ms), control continues past
the `twait` block, onto the log line, and back to the next iteration of the
loop.  The code looks and feels like threaded code, but is still in
the asynchronous idiom (if you look at the rewritten code output by the 
*tamejs* compiler).

This next example does the same, while showcasing power of the
`twait{..}` language addition.  In the example below, the two timers
are fired in parallel, and only when both have returned (after 100ms),
does progress continue...

```javascript
for (var i = 0; i < 10; i++) {
    twait { 
        setTimeout (mkevent (), 100); 
        setTimeout (mkevent (), 10); 
    }
    console.log ("hello");
}
```

Now for something more useful. Here is a parallel DNS resolver that
will exit as soon as the last of your resolutions completes:

```javascript
var dns = require("dns");

function do_one (ev, host) {
    var res = [];
    twait { dns.resolve (host, "A", mkevent (res));}
    if (res[0]) { console.log ("ERROR! " + res[0]); } 
    else { console.log (host + " -> " + res[1]); }
    ev();
};

function do_all (lst) {
    twait {
        for (var i = 0; i < lst.length; i++) {
            do_one (mkevent (), lst[i]);
        }
    }
};

do_all (process.argv.slice (2));
```

You can run this on the command line like so:

    node src/13out.js yahoo.com google.com nytimes.com okcupid.com tinyurl.com

And you will get a response:

    yahoo.com -> 72.30.2.43,98.137.149.56,209.191.122.70,67.195.160.76,69.147.125.65
    google.com -> 74.125.93.105,74.125.93.99,74.125.93.104,74.125.93.147,74.125.93.106,74.125.93.103
    nytimes.com -> 199.239.136.200
    okcupid.com -> 66.59.66.6
    tinyurl.com -> 195.66.135.140,195.66.135.139

If you want to run these DNS resolutions in serial (rather than
parallel), then the change from above is trivial: just switch the
order of the twait and for statements above:

```javascript  
function do_all (lst) {
    for (var i = 0; i < lst.length; i++) {
        twait {
            do_one (mkevent (), lst[i]);
        }
    }
};
```

Slightly More Advanced Example
-----------------------------

We've already shown how parallel and serial network flows works, what about
something in between?  For instance, we might want to make progress in
parallel on our DNS lookups, but not smash the server all at once. A compromise
is windowing, which can be achieved in *tamejs* conveniently in a number of 
different ways.  In the 2007 paper, the technique suggested is a *rendezvous*. 
A rendezvous is implemented in *tamejs* as a pure JS construct (no rewriting
involved), which allows a program to continue as soon as the first 
event fires (rather than the last):

```javascript  
function do_all (lst, windowsz) {
    var rv = new tame.Rendezvous ();
    var nsent = 0;
    var nrecv = 0;

    while (nrecv < lst.length) {
        if (nsent - nrecv < windowsz && nsent < n) {
            do_one (rv.mkev (nsent), lst[nsent]);
            nsent++;
        } else {
            var evid = [];
            twait { rv.wait (mkevent (evid)); }
            console.log ("got back lookup nsent=" + evid[0]);
            nrecv++;
        }
    }
};
```

The way to read this code is that there are two counters maintained:
the number of requests sent, and the number received.  We keep looping
until the last lookup is received.  Inside the loop, if there is room
in the window and there are more to send, then we send; otherwise, we
wait and harvest.  `Rendezvous.mkev` makes an event much like the
`mkevent`, but it also takes a first argument that associates an
idenitifer with the event fired.  This way, the waiter can know which
event he's getting back.  In this case we use the variable `nsent` as
the event ID --- it's the ID of this event in launch order.  When we
harvest the event, `rv.wait` fires its callback with the ID of the
event that's harvested.

Installing and Using
--------------------

    npm install -g tamejs
    tamejs <infile> <outfile>
    node <outfile> # or whatever you want


Bugs
----

ToDos (Basic Functionality)
---------------------------
* try/catch
* support unterminated expressions (might not be possible without PEG)
* regtest suite
* with statements?

ToDos (Optimizations)
---------------------
* Can passThrough blocks in a tamed function that don't have twaits,
  so can get more aggressive here.

ToDos (Future)
--------------
* Support output that preserves line numbering ; and/or switch to debug mode
only if asked for on the command line.
* Switch from Bison/Lex style grammar to PEG/Packrat style.


How It's Implemented In JavaScript
----------------------------------

The key idea behind the *tamejs* implementation is
[Continuation-Passing Style
(CPS)](http://en.wikipedia.org/wiki/Continuation-passing_style)
compilation.  That is, elements of code like `for`, `while` and `if`
statements are converted to anonymous JavaScript functions written
in continuation-passing style.  Then, `twait` blocks just grab
those continuations, store them away, and call them when the
time is right (i.e., when all relevant events have completed).

For example, the simple program:

```javascript
if (true) { twait { setTimeout (mkevent (), 100); } }
```

Is rewritten to something like the following (which has been hand-simplified
for demonstration purposes):

```javscript
var tame = require('tamejs').runtime;
var f0 = function (k) {
    var f1 = function (k) {
        var __ev = new tame.Event (k);
        setTimeout ( __ev.mkevent(), 100 ) ;
    };
    if (true) {
        f1 (k);
    } else {
        k();
    }
};
f0 (tame.end);

```

That is, the function `f0` is the rewrite of the `if` statement.
Function `f0` takes as a parameter the continuation `k`, which
signifies "the rest of the program".  In the case of this trivial
program, the rest of the program is just a call to the exit function
`tame.end`.  Inside the `if` statement, there are two branches.  In
the `true` branch, we call into `f1`, the rewrite of the `twait`
block, and in the `false` branch, it's just go on with the rest of the
program by calling the continuation `k`.  Function `f1` is doing
something a little bit different --- it's passing its continuation
into the pure JavaScript class `tame.Event`, which will hold onto it
until all associated events (like the one passed to `setTimeout`) have
been called.  When the last event is fired (here after 100ms), then
the `tame.Event` class calls the continuation `k`, which in this case
just the end of the program.

The *tamejs* implementation uses other CPS-conversions for `while` and
`for` loops, turning standard iteration into tail-recursion.  If you
want to see for yourself, just examine the output of the *tamejs* compiler
to see what your favorite JavaScript control flow is translated to.


Also Available In C++!
----------------------

The tame source-to-source translator was original written for
asynchronous code, for C++.  It's an actively maintained project, and
it widespread use at [OkCupid.com](http://www.okcupid.com).  See the
[sfslite/tame Wiki](http://okws.org/doku.php?id=sfslite:tame2) for more
information, or read the [2007 Usenix ATC
paper](http://pdos.csail.mit.edu/~max/docs/tame.pdf).

Authors
-------
Max Krohn <max@okcupid.com> or <max@m8api.com>

License
-------
Copyright (c) 2011 Max Krohn for HumorRainbow, Inc., under the MIT license
