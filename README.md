tamejs
======

This package is a source-to-source translator that outputs JavaScript. The
input dialect looks a lot like JavaScript, but introduces the `twait` 
primitive, which allows asynchronous callback style code to work more
like straight-line threaded code.  __tamejs__ is written in JavaScript.

Examples
--------

* Here is a simple example that prints "hello" 10 times, with 100ms delay
slots in between:

    for (var i = 0; i < 10; i++) {
        twait { setTimeout (mkevent (), 100); }
        console.log ("hello");
    }

* This example does the same.  A `twait` block will block all progress
until all events made inside via `mkevent` have fired. In the example below,
the two timers are fired in parallel, and only when both have returned 
(after 100ms), does progress continue...

    for (var i = 0; i < 10; i++) {
        twait { 
	    setTimeout (mkevent (), 100); 
	    setTimeout (mkevent (), 10); 
        }
        console.log ("hello");
    }
