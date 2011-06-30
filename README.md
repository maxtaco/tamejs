tamejs
======
This package is a source-to-source translator that outputs JavaScript. The
input dialect looks a lot like JavaScript, but introduces the `twait` 
primitive, which allows asynchronous callback style code to work more
like straight-line threaded code.  *tamejs* is written in JavaScript.

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
A rendezvous is implemented in tamejs as a pure JS construct (no rewriting
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
            var res = [];
            twait { rv.wait (mkevent (res)); }
            console.log ("got back lookup #" + res[0]);
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
`mkevent`, but it also takes first argument that allows the waiter
to tell which event fired. 

Usage Examples
--------------

Bugs
---


ToDos (Basic Functionality)
---------------------------
* foreach loops
* try/catch
* support unterminated expressions (might not be possible without PEG)
* regtest suite
* with statements?

ToDos (Optimizations)
---------------------

ToDos (Future)
--------------
* Support output that preserves line numbering ; and/or switch to debug mode
only if asked for on the command line.
* Switch from Bison/Lex style grammar to PEG/Packrat style.


How It's Implemented In JavaScript
----------------------------------


Also Available In C++!
----------------------

The tame source-to-source translator was original written for
asynchronous code, for C++.  It's an actively maintained project, and
it widespread use at [OkCupid.com](http://www.okcupid.com).  See the
[sfslite/tame Wiki](http://okws.org/doku.php?id=sfslite:tame2) for more
information, or read the [2007 Usenix ATC
paper](http://pdos.csail.mit.edu/~max/docs/tame.pdf).
