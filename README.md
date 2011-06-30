tamejs
======
This package is a source-to-source translator that outputs JavaScript. The
input dialect looks a lot like JavaScript, but introduces the `twait` 
primitive, which allows asynchronous callback style code to work more
like straight-line threaded code.  __tamejs__ is written in JavaScript.

Code Examples
--------
Here is a simple example that prints "hello" 10 times, with 100ms delay
slots in between:

    for (var i = 0; i < 10; i++) {
        twait { setTimeout (mkevent (), 100); }
        console.log ("hello");
    }

This example does the same.  A `twait` block will block all progress
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

Here is a parallel DNS resolver that will ll exit as soon as the last of 
your resolutions completes:


	var dns = require("dns");

	function do_one (ev, host) {
		var res = [];
		twait { dns.resolve (host, "A", mkevent (res));}
		console.log (host + " -> " + res[1]);
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

You can run this on the command line like so:

    node src/13out.js yahoo.com google.com nytimes.com okcupid.com tinyurl.com

And you will get a response:

    yahoo.com -> 72.30.2.43,98.137.149.56,209.191.122.70,67.195.160.76,69.147.125.65
    google.com -> 74.125.93.105,74.125.93.99,74.125.93.104,74.125.93.147,74.125.93.106,74.125.93.103
    nytimes.com -> 199.239.136.200
    okcupid.com -> 66.59.66.6
    tinyurl.com -> 195.66.135.140,195.66.135.139

If you want to run these DNS resolutions in serial (rather than parallel), then the change from above is trivial:
just switch the order of the twait and for statements above:

	function do_all (lst) {
		for (var i = 0; i < lst.length; i++) {
			twait {
				do_one (mkevent (), lst[i]);
			}
		}
	};


Usage Examples
--------------

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


What About the Rendezvous?
--------------------------


Also Available In C++!
----------------------

The tame source-to-source translator was original written for
asynchronous code, for C++.  It's an actively maintained project, and
it widespread use at [OkCupid.com](http://www.okcupid.com).  See the
[sfslite/tame Wiki](http://okws.org/doku.php?id=sfslite:tame2) for more
information, or read the [2007 Usenix ATC
paper](http://pdos.csail.mit.edu/~max/docs/tame.pdf).
