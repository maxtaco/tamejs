tamejs
======
This package is a source-to-source translator that outputs JavaScript. The
input dialect looks a lot like JavaScript, but introduces the `await` 
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

NEWS
--------

Now available in
[NEWS.md](https://github.com/maxtaco/tamejs/blob/master/NEWS.md).
Version v0.4 just released, with initial support for what everyone has
been asking for --- Tame-aware stack traces! See the section
"Debugging and Stack Traces..." below for more details.   Also,
we've added `autocb`s, that fire whenever your tamed function returns.


Code Examples
--------
Here is a simple example that prints "hello" 10 times, with 100ms delay
slots in between:

```javascript  
for (var i = 0; i < 10; i++) {
    await { setTimeout (defer (), 100); }
    console.log ("hello");
}
```

There is one new language addition here, the `await { ... }` block,
and also one new primitive function, `defer`.  The two of them work
in concert.  A function must "wait" at the close of a `await` block
until all `defer`rals made in that `await` block are fulfilled.  The
function `defer` returns a callback, and a callee in an `await`
block can fulfill a deferral by simply calling the callback it was
given.  In the code above, there is only one deferral produced in each
iteration of the loop, so after it's fulfilled by `setTimer` in 100ms,
control continues past the `await` block, onto the log line, and back
to the next iteration of the loop.  The code looks and feels like
threaded code, but is still in the asynchronous idiom (if you look at
the rewritten code output by the *tamejs* compiler).

This next example does the same, while showcasing power of the
`await{..}` language addition.  In the example below, the two timers
are fired in parallel, and only when both have fulfilled their deferrals
(after 100ms), does progress continue...

```javascript
for (var i = 0; i < 10; i++) {
    await { 
        setTimeout (defer (), 100); 
        setTimeout (defer (), 10); 
    }
    console.log ("hello");
}
```

Now for something more useful. Here is a parallel DNS resolver that
will exit as soon as the last of your resolutions completes:

```javascript
var dns = require("dns");

function do_one (cb, host) {
    var err, ip;
    await { dns.resolve (host, "A", defer (err, ip));}
    if (err) { console.log ("ERROR! " + err); } 
    else { console.log (host + " -> " + ip); }
    cb();
}

function do_all (lst) {
    await {
        for (var i = 0; i < lst.length; i++) {
            do_one (defer (), lst[i]);
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
order of the `await` and `for` statements above:

```javascript  
function do_all (lst) {
    for (var i = 0; i < lst.length; i++) {
        await {
            do_one (defer (), lst[i]);
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
a program to continue as soon as the first deferral is fulfilled (rather than
the last):

```javascript  
function do_all (lst, windowsz) {
    var rv = new tame.Rendezvous ();
    var nsent = 0;
    var nrecv = 0;

    while (nrecv < lst.length) {
        if (nsent - nrecv < windowsz && nsent < n) {
            do_one (rv.id (nsent).defer (), lst[nsent]);
            nsent++;
        } else {
            var evid;
            await { rv.wait (defer (evid)); }
            console.log ("got back lookup nsent=" + evid);
            nrecv++;
        }
    }
}
```

This code maintains two counters: the number of requests sent, and the
number received.  It keeps looping until the last lookup is received.
Inside the loop, if there is room in the window and there are more to
send, then send; otherwise, wait and harvest.  `Rendezvous.defer`
makes a deferral much like the `defer` primitive, but it can be
labeled with an idenfitier.  This way, the waiter can know which
deferral has fulfileld.  In this case we use the variable `nsent` as the
defer ID --- it's the ID of this deferral in launch order.  When we
harvest the deferral, `rv.wait` fires its callback with the ID of the
deferral that's harvested.  

Note that with windowing, the arrival order might not be the same as
the issue order. In this example, a slower DNS lookup might arrive
after faster ones, even if issued before them.

Composing Serial And Parallel Patterns
--------------------------------------

In Tame, arbitrary composition of serial and parallel control flows is
possible with just normal functional decomposition.  Therefore, we
don't allow direct `await` nesting.  With inline anonymous JavaScript
functions, you can consicely achieve interesting patterns.  The code
below launches 10 parallel computations, each of which must complete
two serial actions before finishing:

```javascript
function f(cb) {
    await {
        for (var i = 0; i < n; i++) {
            (function (cb) {
                await { setTimeout (defer (), 5*Math.random ()); }
                await { setTimeout (defer (), 4*Math.random ()); }
                cb();
             })(defer ());
        }
    }
    cb();
}
```


autocb
-------------------

Most of the times, a tamed function will call its callback and return
at the same time.  To get this behavior "for free", you can simply
name this callback `autocb` and it will fire whenver your tamed function
returns.  For instance, the above example could be equivalently written as:

```javascript
function f(autocb) {
    await {
        for (var i = 0; i < n; i++) {
            (function (autocb) {
                await { setTimeout (defer (), 5*Math.random ()); }
                await { setTimeout (defer (), 4*Math.random ()); }
             })(defer ());
        }
    }
}
```
In the first example, recall, you call `cb()` explicitly.  In this
example, because the callback is named `autocb`, it's fired
automatically when the tamed function returns.

If your callback needs to fulfill with a value, then you can pass
that value via `return`.  Consider the following function, that waits
for a random number of seconds between 0 and 4. After waiting, it
then fulfills its callback `cb` with the amount of time it waited:

```javascript
function rand_wait(cb) {
    var time = Math.floor (Math.random()*5);
    if (time == 0) {
         cb(0); return;
    }
    await setTimeout (defer (), time);
    cb(time); // return here, implicitly.....
}
```

This function can written equivalently with `autocb` as:

```javascript
function rand_wait(autocb) {
    var time = Math.floor (Math.random()*5);
    if (time == 0) {
        return 0;
    }
    await setTimeout (defer (), time);
    return time;
}
```
Implicitly, `return 0;` is mapped by the tamejs compiler to `autocb(0); return`.
 

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

If you want a different extension, this will work:

```javascript
require ('tamejs').register ('tamejs'); // register the *.tamejs suffix
require ("mylib.tamejs");               // then use node.js's import as normal
```

Or, finally, you can call `register` to do a few things at once,
including multiple suffix registrations:

```javascript
// Will register suffixes 'tamejs' and 'yojs'; will
// also enable tame stack tracing, and disable caching of
// .tjs files included at runtime
require ('tamejs').register ({ extension       : [ 'tamejs', 'yojs'], 
                               catchExceptions : true,
			       disableCache    : true })
require ("mylib.tamejs");
require ("yourlib.yojs");
```


API and Documentation
---------------------

### defer

`defer` can be called in one of two ways.


#### Inline Variable Declaration

The first allows for inline declaration of the callback slot
variables:

```javascript

await { dns.resolve ("okcupid.com", defer (var err, ip)); }

```

In the tamed output code, the variables `err` and `ip` will be
declared right before the start of the `await` block that contains them.


#### Generic LHS Assignment w/ "Rest" Parameters

The second approach does not auto-declare the callback slot variables, but
allows more flexibility:

```javascript
var d = {};
var err = [];
await { dns.resolve ("okcupid.com", defer (err[0], d.ip)); }
```
This second version allows anything you'd normally put on the
left-hand side of an assignment.

For callbcacks with variadic return, `tamejs` also supports the [rest
parameter](http://wiki.ecmascript.org/doku.php?id=harmony:rest_parameters)
proposal. The above code could have been written as:

```javascript
var d = {};
var err = [];
var rest;
await { dns.resolve ("okcupid.com", defer (...rest)); }
err[0] = rest[0];
d.ip = rest[1];
```

And of course, it's allowable to mix and match:

```javascript
var d = {};
var err = [];
var rest;
await { dns.resolve ("okcupid.com", defer (err[0], ...rest)); }
d.ip = rest[0];
```

### tame.Rendezvous

The `Rendezvous` is a not a core *tamejs* feature, meaning it's written as a 
straight-ahead JavaScript library.  It's quite useful for more advanced
control flows, so we've included it in the main runtime library.

The `Rendezvous` is similar to a blocking condition variable (or a
"Hoare sytle monitor") in threaded programming.

#### tame.Rendezvous.id (i).defer (slots,...)

Associate a new deferral with the given Rendezvous, whose deferral ID is
`i`, and whose callbacks slots are supplied as `slots`.  Those slots
can take the two forms of `defer` return as above (i.e.,
declarative, or generic).  As with standard `defer`, the
return value of the `Rendezvous`'s `defer` is fed to a function
expecting a callback.  As soon as that callback fires (and the deferral
is fulfilled), the provided slots will be filled with the arguments to
that callback.

#### tame.Rendezvous.defer (slots,...)

You don't need to explicitly assign an ID to a deferral generated from a
Rendezvous.  If you don't, one will automatically be assigned, in
ascending order starting from `0`.

#### tame.Rendezvous.wait (cb)

Wait until the next deferral on this rendezvous is fulfilled.  When it
is, callback `cb` with the ID of the fulfilled deferral.  If an
unclaimed deferral fulfilled before `wait` was called, then `cb` is fired
immediately.

Though `wait` would work with any hand-rolled JS function expecting
a callback, it's meant to work particularly well with *tamejs*'s
`await` function.

#### Example

Here is an example that shows off the different inputs and 
outputs of a `Rendezvous`.  It does two parallel DNS lookups,
and reports only when the first returns:

```javascript
var hosts = [ "okcupid.com", "google.com" ];
var ips = [ ], errs = [];
var rv = new tame.Rendezvous ();
for (var i in hosts) {
    dns.resolve (hosts[i], rv.id (i).defer (errs[i], ips[i]));
}
await rv.wait (defer (var which));
console.log (hosts[which] + " -> " + ips[which]);
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
await dns.lookup (host, timeout (defer (var err, ip), 100, info));
if (!info[0]) {
    console.log (host + ": timed out!");
} else if (err) {
    console.log (host + ": error: " + err);
} else {
    console.log (host + " -> " + ip);
}
```

### The Pipeliner library

There's another way to do the windowed DNS lookups we saw earlier ---
you can use the control flow library called `Pipeliner`, which 
manages the common pattern of having "m calls total, with only
n of them in flight at once, where m > n."

The Pipeliner class is available in the connectors library:

```javascript
require ('tamejs').register (); // since connectors is a tamed library...
var Pipeliner = require ('tamejs/lib/connectors').Pipeliner;
var pipeliner = new Pipeliner (w,s);
```

Using the pipeliner, we can rewrite our earlier windowed DNS lookups
as follows:

```javascript  
function do_all (lst, windowsz) {
    var pipeliner = new Pipeliner (windowsz);

    for (var i in lst) {
        await pipeliner.waitInQueue (defer ());
        do_one (pipeliner.defer (), lst[i]);
    }
    await pipeliner.flush (defer ());
}
```

The API is as follows:

### new Pipeliner (w, s)

Create a new Pipeliner controller, with a window of at most `w` calls
out at once, and waiting `s` seconds before launching each call.  The
default values are `w = 10` and `s = 0`.

### Pipeliner.waitInQueue (c)

Wait in a queue until there's room in the window to launch a new call.
The callback `c` will be fulfilled when there is room.

### Pipeliner.defer (...args)

Create a new `defer`al for this pipeline, and pass it to whatever
function is doing the actual work.  When the work completes, fulfill
this `defer`al --- that will update the accounting in the pipeliner
class, allowing queued actions to proceed.

### Pipeliner.flush (c)

Wait for the pipeline to clear out.  Fulfills the callback `c`
when the last action in the pipeline is done.


Debugging and Stack Traces -- Now Greatly Improved!
---------------------------------------------------

An oft-cited problem with async-style programming, with Tame or
hand-rolled, is that stack traces are often incomplete or
incomprehensible.  If an exception is caught in a tamed function, the
stack trace will only show the "bottom half" of the call stack, or all
of those functions that are descendents of the main event loop.  The
"top half" of the call stack, telling you "who _really_ called this
function," is probably long gone.

Tame has a workaround to this problem.  When a tamed function is
entered, the runtime will find the first argument to the function that
was output by `defer()`.  Such callbacks are annotated to contain the
file, line and function where they were created.  They also are
annotated to hold a refernce to `defer()`-generated callback passed to
the function in which they were created.  This chaining creates an
implicit stack that can be walked when an exception is thrown.

Consider this example:

```javascript
tame.catchExceptions ();

function foo (y) {
    await setTimeout (defer (), 10);
    throw new Error ("oh no!")
    y(10);
}

function bar (x) {
    await foo (defer ());
    x();
}

function baz () {
   await bar (defer ());
};

baz ();
```

The function `tame.catchExceptions` sets the `uncaughtException`
handler in Node to print out the standard callstack, and also the Tame
"callstack", and then to exit.  The callback generated by `defer()`
in the function `bar` holds a reference to `x`.  Similarly, 
the callback generated in `foo` holds a reference to `y`.
Here's what happens when this program is run:

```
Error: oh no!
    at /home/max/node/tamejs/8.js:31:23
    at callChain (/home/max/node/tamejs/lib/runtime.js:38:2)
    at Deferrals._continuation (/home/max/node/tamejs/lib/runtime.js:38:23)
    at Deferrals._fulfill (/home/max/node/tamejs/lib/runtime.js:149:11)
    at Object._onTimeout (/home/max/node/tamejs/lib/runtime.js:64:4)
    at Timer.callback (timers.js:83:39)
Tame 'stack' trace:
    at bar (8.tjs:10)
    at baz (8.tjs:15)
```

The first stack trace is the standard Node stacktrace.  It is
inscrutable, since it mainly covers Tame internals, and has line
numbering relative to the translated file (I still haven't fixed this
bug, sorry). The second stack trace is much better.  It tells the
sequence of tamed calls the lead to this exception.  Line numbers are
relative to the original input file.

In future releases, we'll be cleaning this feature up, but for now, it's a
marked improvement over previous versions of tamejs.

The relavant API is as follows:

#### tame.stackWalk (cb)

Start from the given `cb`, or use the currently active callback
if none was given, and walk up the Tame-generated stack. Return
a list of call site descriptions.  You can call this from your
own exception-handling code.

#### tame.catchExceptions()

Tell the Tame runtime to catch uncaught exceptions, and to print
a Tame-aware stack dump as above.


How It's Implemented In JavaScript
----------------------------------

The key idea behind the *tamejs* implementation is
[Continuation-Passing Style
(CPS)](http://en.wikipedia.org/wiki/Continuation-passing_style)
compilation.  That is, elements of code like `for`, `while` and `if`
statements are converted to anonymous JavaScript functions written
in continuation-passing style.  Then, `await` blocks just grab
those continuations, store them away, and call them when the
time is right (i.e., when all relevant deferrals have been fulfilled).

For example, the simple program:

```javascript
if (true) { await { setTimeout (defer (), 100); } }
```

Is rewritten to something like the following (which has been hand-simplified
for demonstration purposes):

```javscript
var tame = require('tamejs').runtime;
var f0 = function (k) {
    var f1 = function (k) {
        var __cb = new tame.Deferrals (k);
        setTimeout ( __cb.defer(), 100 ) ;
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
the `true` branch, we call into `f1`, the rewrite of the `await`
block, and in the `false` branch, it's just go on with the rest of the
program by calling the continuation `k`.  Function `f1` is doing
something a little bit different --- it's passing its continuation
into the pure JavaScript class `tame.Deferrals`, which will hold onto it
until all associated deferrals (like the one passed to `setTimeout`) have
been fulfilled.  When the last deferral is fulfileld (here after 100ms), then
the `tame.Deferrals` class calls the continuation `k`, which here refers
to `tame.end`.

The *tamejs* implementation uses other CPS-conversions for `while` and
`for` loops, turning standard iteration into tail-recursion.  If you
are curious to learn more, examine the output of the *tamejs* compiler
to see what your favorite JavaScript control flow is translated to.
The translation of `switch` is probably the trickiest.

As you might guess, the output code is less efficient than the input
code.  All of the anonymous functions add bloat.  This unfortunate
side-effect of our approach is mitigated by skipping CPS compilation
when possible.  Functions with no `await` blocks are passed through
unmolested.  Similarly, blocks within tamed functions that don't call
`await` can also pass through.

Another concern is that the use of tail recursion in translated loops
might overflow the runtime callstack.  That is certainly true for
programs like the following:

```javascript
while (true) { await { i++; } }
```

...but you should never write programs like these!  That is, there's no
reason to have a `await` block unless your program needs to wait for
some asynchronous event, like a timer fired, a packet arrival, or a 
user action.  Programs like these:

```javascript
while (true) { await { setTimeout (defer (), 1); i++; } }
```

will **not** overflow the runtime stack, since the stack is unwound every
iteration through the loop (via `setTimeout`). And these are the types
of programs that you should be using `await` for.

ToDos
------
See the github issue tracker for the more immediate issues.

* Optimizations
     * Can passThrough blocks in a tamed function that don't have awaits,
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
* Max Krohn (first name AT okcupid DOT com)
* Chris Coyne (first name AT okcupid DOT com)
* Eddie Kohler (original Tame coauthor, and advisor)

License
-------
Copyright (c) 2011 Max Krohn for HumorRainbow, Inc., under the MIT license
