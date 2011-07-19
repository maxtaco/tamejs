tamejs
======
This package is a source-to-source translator that outputs JavaScript. The
input dialect looks a lot like JavaScript, but introduces the `twait` 
primitive, which allows asynchronous callback style code to work more
like straight-line threaded code.  *tamejs* is written in JavaScript.

One of the core powers of the *tamejs* rewriting idea is that it's
fully compatible with existing vanilla-JS code (like `node.js`'s
libraries).  That is, existing `node.js` can call code that's been
output by the *tamejs* rewriter, and conversely, code output by the
*tamejs* rewriter can call existing `node.js` code.  Thus, *tamejs* is
incrementally deployable --- you can keep all of your old code and
just write the new bits in *tamejs*!  So try it out and let us
know what you think.

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

There is one new language addition here, the `twait { ... }` block,
and also one new primitive function, `mkevent`.  The two of them work
in concert.  Within the context of a `twait` block, `mkevent` returns
anonymous callback functions associated with that block.  A function
must "wait" at the close of a `twait` block until all callbacks made
by `mkevent` in that `twait` block are called.  In the code above,
there is only one callback produced in each iteration of the loop, so
after it's called by `setTimer` in 100ms, control continues past the
`twait` block, onto the log line, and back to the next iteration of
the loop.  The code looks and feels like threaded code, but is still
in the asynchronous idiom (if you look at the rewritten code output by
the *tamejs* compiler).

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
    var err, ip;
    twait { dns.resolve (host, "A", mkevent (err, ip));}
    if (err) { console.log ("ERROR! " + err); } 
    else { console.log (host + " -> " + ip); }
    ev();
}

function do_all (lst) {
    twait {
        for (var i = 0; i < lst.length; i++) {
            do_one (mkevent (), lst[i]);
        }
    }
}

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
order of the `twait` and `for` statements above:

```javascript  
function do_all (lst) {
    for (var i = 0; i < lst.length; i++) {
        twait {
            do_one (mkevent (), lst[i]);
        }
    }
}
```

Slightly More Advanced Example
-----------------------------

We've shown parallel and serial work flows, what about something in
between?  For instance, we might want to make progress in parallel on
our DNS lookups, but not smash the server all at once. A compromise is
windowing, which can be achieved in *tamejs* conveniently in a number
of different ways.  The [2007 academic paper on
tame](http://pdos.csail.mit.edu/~max/docs/tame.pdf) suggests a
technique called a *rendezvous*.  A rendezvous is implemented in
*tamejs* as a pure JS construct (no rewriting involved), which allows
a program to continue as soon as the first event fires (rather than
the last):

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
            var evid;
            twait { rv.wait (mkevent (evid)); }
            console.log ("got back lookup nsent=" + evid);
            nrecv++;
        }
    }
}
```

This code maintains two counters: the number of requests sent, and the
number received.  It keeps looping until the last lookup is received.
Inside the loop, if there is room in the window and there are more to
send, then send; otherwise, wait and harvest.  `Rendezvous.mkev` makes
an event much like the `mkevent` primitive, but it also takes a first
argument that associates an idenitifer with the event fired.  This
way, the waiter can know which event he's getting back.  In this case
we use the variable `nsent` as the event ID --- it's the ID of this
event in launch order.  When we harvest the event, `rv.wait` fires its
callback with the ID of the event that's harvested.

Note that with windowing, the arrival order might not be the same as
the issue order. In this example, a slower DNS lookup might arrive
after faster ones, even if issued before them.


Composing Serial And Parallel Patterns
--------------------------------------

In Tame, arbitrary composition of serial and parallel control flows is
possible with just normal functional decomposition.  Therefore, we
don't allow direct `twait` nesting.  With inline anonymous JavaScript
functions, you can consicely achieve interesting patterns.  The code
below launches 10 parallel computations, each of which must complete
two serial actions before finishing:

```javascript
function f(cb) {
    twait {
        for (var i = 0; i < n; i++) {
            (function (cb) {
                twait { setTimeout (mkevent (), 5*Math.random ()); }
                twait { setTimeout (mkevent (), 4*Math.random ()); }
                cb();
             })(mkevent ());
        }
    }
    cb();
}
```

Installing and Using
--------------------

Install via npm:

    npm install -g tamejs

You can their either use the *tamejs* compiler on the command line:

    tamejs -o <outfile> <infile>
    node <outfile> # or whatever you want

Or as an extension to node's module import system:

```javascript
require ('tamejs').register (); // register the *.tjs suffix
require ("mylib.tjs");          // then use node.js's import as normal
```

API and Documentation
---------------------

### mkevent

`mkevent` can be called in one of three ways.  


#### Inline Variable Declaration

The first allows for inline declaration of the callback slot
variables:

```javascript

twait { dns.resolve ("okcupid.com", mkevent (var err, ip)); }

```

In the tamed output code, the variables `err` and `ip` will be
declared right before the start of the `twait` block that contains them.


#### Generic LHS Assignment

The second approach does not auto-declare the callback slot variables, but
allows more flexibility:

```javascript
var d = {};
var err = [];
twait { dns.resolve ("okcupid.com", mkevent (err[0], d.ip)); }
```
This second version allows anything you'd normally put on the
left-hand side of an assignment.

#### Variadic Return

If you callback function might return an arbitrary number of elements,
`mkevent` has a third mode that allows for variadic return:

```javascript
var arr = []
twait { dns.resolve ("okcupid.com", mkevent (arr)); }
var err = arr[0];
var ip = arr[1];
```

If `mkevent` sees that it's passed on parameter, and that parameter
happens to be an empty array, it will choose this mode of operation.


### tame.Rendezvous

The `Rendezvous` is a not a core *tamejs* feature, meaning it's written as a 
straight-ahead JavaScript library.  It's quite useful for more advances
control flows, so we've included it in the main runtime library.

The `Rendezvous` is similar to a blocking condition variable (or a
"Hoare sytle monitor") in threaded programming.

#### tame.Rendezvous.mkev(id,arr)

This is the `Rendezvous` equivalent of the `mkevent` built-in, but
shortened so it doesn't confuse the *tamejs* compiler.  It takes two
arguments, the event "ID" that the programmer is going to use to
idenitify this event later on, and also a empty array to return values
from the callback.  Thus, the `Rendezvous` only works in the third
style of built-in `mkevent` call above, with variadic return.

As with `mkevent`, the return value of `Rendezvous.mkev` is fed
to function expecting a callback.  As soon as that callback fires,
the slots of `arr` will be filled with the arguments to that callback.

#### tame.Rendezvous.wait (cb)

Wait until the next event is fired.  When it is, callback `cb`
with the ID of the event that fired.  If an unclaimed event fired
before `wait` was called, then `cb` is fired immediately. 

Though `wait` would work with any hand-rolled JS function expecting
a callback, it's meant to work particularly well with *tamejs*'s
`twait` function.

#### Example

Here is an example that shows off the different inputs and 
outputs of a `Rendezvous`.  It does two parallel DNS lookups,
and reports only when the first returns:

```javascript
var hosts = [ "okcupid.com", "google.com" ];
var arr = [ [], [] ];
var which;
var rv = new tame.Rendezvous ();
for (var i in hosts) {
    dns.resolve (hosts[i], rv.mkev (i, arr[i]));
}
twait { rv.wait (which); }
console.log (hosts[which] + " -> " + arr[which][1]);
```

### connectors

A *connector* is a *tamejs* function that takes as input
a callback, and outputs another callback.   The best example 
is a `timeout`, given here:

#### connectors.timeout(cb, time, res = [])

Timeout an arbitrary async operation.

Given a callback `cb`, a time to wait `time`, and an array to output a
result `res`, return another callback.  This connector will set up a
race between the callback returned to the caller, and the timer that
fires after `time` milliseconds.  If the callback returned to the
caller fires first, then fill `res[0] = true;`.  If the timer won
(i.e., if there was a timeout), then fill `res[0] = false;`.

In the following example, we timeout a DNS lookup after 100ms:

```javascript
require ('tamejs').register (); // since connectors is a tamed library...
var timeout = require ('tamejs/lib/connectors').timeout;
var info = [];
var host = "pirateWarezSite.ru";
twait { dns.lookup (host, timeout (mkevent (var err, ip), 100, info)); }
if (!info[0]) {
    console.log (host + ": timed out!");
} else if (err) {
    console.log (host + ": error: " + err);
} else {
    console.log (host + " -> " + ip);
}
```



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
the `tame.Event` class calls the continuation `k`, which here refers
to `tame.end`.

The *tamejs* implementation uses other CPS-conversions for `while` and
`for` loops, turning standard iteration into tail-recursion.  If you
are curious to learn more, examine the output of the *tamejs* compiler
to see what your favorite JavaScript control flow is translated to.
The translation of `switch` is probably the trickiest.

As you might guess, the output code is less efficient than the input
code.  All of the anonymous functions add bloat.  This unfortunate
side-effect of our approach is mitigated by skipping CPS compilation
when possible.  Functions with no `twait` blocks are passed through
unmolested.  Similarly, blocks within tamed functions that don't call
`twait` can also pass through.

Another concern is that the use of tail recursion in translated loops
might overflow the runtime callstack.  That is certainly true for
programs like the following:

```javascript
while (true) { twait { i++; } }
```

...but you should never write programs like these!  That is, there's no
reason to have a `twait` block unless your program needs to wait for
some asynchronous event, like a timer fired, a packet arrival, or a 
user action.  Programs like these:

```javascript
while (true) { twait { setTimeout (mkevent (), 1); i++; } }
```

will **not** overflow the runtime stack, since the stack is unwound every
iteration through the loop (via `setTimeout`). And these are the types
of programs that you should be using `twait` for.

ToDos
------
See the github issue tracker for the more immediate issues.

* Documentation
     * Change mkevent to something else?
* Optimizations
     * Can passThrough blocks in a tamed function that don't have twaits,
so can get more aggressive here --- in progress, but can still
seek out some more optimizations....
* Parsing
     * Switch to uglify's parser?  Would have to slightly modify it.

History
-------

The Tame rewriting idea come about at
[OkCupid](http://www.okcupid.com) in 2006. Until that time, the
website was written in an entirely asynchronous-callback-based style
with [OKWS](http://www.okws.org) in C++.  This serving technology was
extremely fast, and led to huge cost savings in hardware and hosting,
but as the site's code grew, it became increasingly
unmanageable. Simple serial loops with network access, like the
sequential DNS example above, required "stack-ripping" into multiple
mutually recursive calls.  As more employees began to work the code,
and editted code that they didn't write, development slowed to a
crawl.

Chris Coyne, OkCupid's director of product, demanded that something be
done.  The requirements were manifold.  The new solution had to be
compatible with existing code; it had to be incrementally deployable,
so that the whole codebase wouldn't need to be rewritten at once; it
had to be nearly as fast as the status quo; it had to clean the code
up, so that it was readable; it had to speed up and simplify
development.

The answer that emerged was Tame for C++.  It's a source-to-source
translator that mapped C++ with a few language additions into regular
C++, which is then compiled with a standard compiler (like `gcc`). The
key implementation ideas behind Tame C++ are: (1) generate a heap-allocated
"closure" for each tamed function; (2) use labels and `goto` to jump
back into tamed function as asynchronous events fired.  Once Tame was
brought to bear on OkCupid's code, it offered almost all of the
flexibilty and performance of hand-crafted
asynchronous-callback-passing code without any of the stack-ripping
headaches.  New employees picked it right up, and contributed to
the incremental effort to modernize OkCupid's code to the Tame
dialect.

OkCupid to this day runs Tame and OKWS in C++ to churn out
high-performance, parallel applications, without worrying about
traditional thread-based headaches, like deadlock and race-conditions.
Our goal with *tamejs* is to bring these benefits to JavaScript and
the `node.js` platform.

See our "Glossy Page"
---------------------

See [tamejs.org](http://tamejs.org) for documentation and information on 
*tamejs*.

Related Projects & Plugs
------------------------

[pubjs](https://github.com/maxtaco/pubjs) is yet another a node.js
templating engine.  But it allows arbtirarily nested code and output
sections.  Check it out, if you like this sample code:

```html
<table>
{% 
  foreach (match in matches) {
    if (match.score > 60) {{<div>Excellent Match (%{match.score})</div>}}
    else                  {{<div>Crap Match  (%{match.score})</div>}}
    foreach (friend in match.friends) {{
      <p>
        Has a friend named %{friend.name}
        {%
          if (friend.gender == "f") {{ and she's a girl }}
        %}
      </p>
    }}
  }
%}
</table>
```


Also Available In C++!
----------------------

As described above, the Tame source-to-source translator was
originally written for asynchronous C++ code.  It's an actively
maintained project, and it is in widespread use at
[OkCupid.com](http://www.okcupid.com).  See the [sfslite/tame
Wiki](http://okws.org/doku.php?id=sfslite:tame2) for more information,
or read the [2007 Usenix ATC
paper](http://pdos.csail.mit.edu/~max/docs/tame.pdf).

Authors
-------
* Max Krohn <max@okcupid.com>
* Chris Coyne <chris@okcupid.com>

License
-------
Copyright (c) 2011 Max Krohn for HumorRainbow, Inc., under the MIT license
