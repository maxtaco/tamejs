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

Code Examples
--------
Here is a simple example that prints "hello" 10 times, with 100ms delay
slots in between:

```javascript  
for (var i = 0; i < 10; i++) {
    await { setTimeout (pledge (), 100); }
    console.log ("hello");
}
```

There is one new language addition here, the `await { ... }` block,
and also one new primitive function, `pledge`.  The two of them work
in concert.  A function must "wait" at the close of a `await` block
until all `pledge`s made in that `await` block are fulfilled.  The
primitive `pledge` returns a callback, and a a callee in an `await`
block can fulfill a pledge by simply calling the callback it was
given.  In the code above, there is only one pledge produced in each
iteration of the loop, so after it's fulfilled by `setTimer` in 100ms,
control continues past the `await` block, onto the log line, and back
to the next iteration of the loop.  The code looks and feels like
threaded code, but is still in the asynchronous idiom (if you look at
the rewritten code output by the *tamejs* compiler).

This next example does the same, while showcasing power of the
`await{..}` language addition.  In the example below, the two timers
are fired in parallel, and only when both have fulfilled their pledges
(after 100ms), does progress continue...

```javascript
for (var i = 0; i < 10; i++) {
    await { 
        setTimeout (pledge (), 100); 
        setTimeout (pledge (), 10); 
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
    await { dns.resolve (host, "A", pledge (err, ip));}
    if (err) { console.log ("ERROR! " + err); } 
    else { console.log (host + " -> " + ip); }
    ev();
}

function do_all (lst) {
    await {
        for (var i = 0; i < lst.length; i++) {
            do_one (pledge (), lst[i]);
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
            do_one (pledge (), lst[i]);
        }
    }
}
```

Slightly More Advanced Example
-----------------------------

We've shown parallel and serial work flows, what about something in
between?  For instance, we might want to make progress in parallel on
our DNS lookups, but not smash the server all at once. A compledge is
windowing, which can be achieved in *tamejs* conveniently in a number
of different ways.  The [2007 academic paper on
tame](http://pdos.csail.mit.edu/~max/docs/tame.pdf) suggests a
technique called a *rendezvous*.  A rendezvous is implemented in
*tamejs* as a pure JS construct (no rewriting involved), which allows
a program to continue as soon as the first pledge is fulfilled (rather than
the last):

```javascript  
function do_all (lst, windowsz) {
    var rv = new tame.Rendezvous ();
    var nsent = 0;
    var nrecv = 0;

    while (nrecv < lst.length) {
        if (nsent - nrecv < windowsz && nsent < n) {
            do_one (rv.id (nsent).pledge (), lst[nsent]);
            nsent++;
        } else {
            var evid;
            await { rv.wait (pledge (evid)); }
            console.log ("got back lookup nsent=" + evid);
            nrecv++;
        }
    }
}
```

This code maintains two counters: the number of requests sent, and the
number received.  It keeps looping until the last lookup is received.
Inside the loop, if there is room in the window and there are more to
send, then send; otherwise, wait and harvest.  `Rendezvous.pledge`
makes an pledge much like the `pledge` primitive, but it can be
labeled with an idenfitier.  This way, the waiter can know which
pledge has fulfileld.  In this case we use the variable `nsent` as the
pledge ID --- it's the ID of this pledge in launch order.  When we
harvest the pledge, `rv.wait` fires its callback with the ID of the
pledge that's harvested.  

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
                await { setTimeout (pledge (), 5*Math.random ()); }
                await { setTimeout (pledge (), 4*Math.random ()); }
                cb();
             })(pledge ());
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

### pledge

`pledge` can be called in one of three ways.  


#### Inline Variable Declaration

The first allows for inline declaration of the callback slot
variables:

```javascript

await { dns.resolve ("okcupid.com", pledge (var err, ip)); }

```

In the tamed output code, the variables `err` and `ip` will be
declared right before the start of the `await` block that contains them.


#### Generic LHS Assignment

The second approach does not auto-declare the callback slot variables, but
allows more flexibility:

```javascript
var d = {};
var err = [];
await { dns.resolve ("okcupid.com", pledge (err[0], d.ip)); }
```
This second version allows anything you'd normally put on the
left-hand side of an assignment.

#### Variadic Return

If your callback function might return an arbitrary number of elements,
`pledge` has a third mode that allows for variadic return:

```javascript
var arr = []
await { dns.resolve ("okcupid.com", pledge (arr)); }
var err = arr[0];
var ip = arr[1];
```

If `pledge` sees that it's passed one parameter, and that parameter
happens to be an empty array, it will choose this mode of operation.


### tame.Rendezvous

The `Rendezvous` is a not a core *tamejs* feature, meaning it's written as a 
straight-ahead JavaScript library.  It's quite useful for more advanced
control flows, so we've included it in the main runtime library.

The `Rendezvous` is similar to a blocking condition variable (or a
"Hoare sytle monitor") in threaded programming.

#### tame.Rendezvous.id (i).pledge (slots,...)

Associate a new pledge with the given Rendezvous, whose pledge ID is
`i`, and whose callbacks slots are supplied as `slots`.  Those slots
can take the three forms of `pledge` return as above (i.e.,
declarative, generic, or variadic).  As with standard `pledge`, the
return value of the `Rendezvous`'s `pledge` is fed to a function
expecting a callback.  As soon as that callback fires (and the pledge
is fulfilled), the provided slots will be filled with the arguments to
that callback.

#### tame.Rendezvous.pledge (...)

You don't need to explicitly assign an ID to a pledge generated from a
Rendezvous.  If you don't, one will automatically be assigned, in
ascending order starting from `0`.

#### tame.Rendezvous.wait (cb)

Wait until the next pledge on this rendezvous is fulfilled.  When it
is, callback `cb` with the ID of the fulfilled pledge.  If an
unclaimed pledge fulfilled before `wait` was called, then `cb` is fired
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
    capture (i) {
       dns.resolve (hosts[i], rv.id (i).pledge (errs[i], ips[i]));
    }
}
var which;
await { rv.wait (which); }
console.log (hosts[which] + " -> " + ips[which]);
```

What's with that `capture` thing?  Well, it's a third, and non-essential
`tamejs` langague feature.  It "captures" the value of `i` so that
`pledge` will get the value of `i` at the time of pledge issuance, 
rather than the time of its fulfillment (when chances are it will
always equal 1).  `capture (i) { ... }` is just syntactic sugar for
`(function (i) { ... })(i);`.

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
await { dns.lookup (host, timeout (pledge (var err, ip), 100, info)); }
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
in continuation-passing style.  Then, `await` blocks just grab
those continuations, store them away, and call them when the
time is right (i.e., when all relevant pledges have been fulfilled).

For example, the simple program:

```javascript
if (true) { await { setTimeout (pledge (), 100); } }
```

Is rewritten to something like the following (which has been hand-simplified
for demonstration purposes):

```javscript
var tame = require('tamejs').runtime;
var f0 = function (k) {
    var f1 = function (k) {
        var __ev = new tame.Pledges (k);
        setTimeout ( __ev.pledge(), 100 ) ;
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
into the pure JavaScript class `tame.Pledges`, which will hold onto it
until all associated pledges (like the one passed to `setTimeout`) have
been fulfilled.  When the last pledge is fulfileld (here after 100ms), then
the `tame.Pledges` class calls the continuation `k`, which here refers
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
while (true) { await { setTimeout (pledge (), 1); i++; } }
```

will **not** overflow the runtime stack, since the stack is unwound every
iteration through the loop (via `setTimeout`). And these are the types
of programs that you should be using `await` for.

ToDos
------
See the github issue tracker for the more immediate issues.

* Documentation
     * Change pledge to something else?
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
   rows = [ [ "dog", "cat"], ["parrot", "sparrow"] ];
   foreach (var row in rows) {{
       <tr>
       {% 
           foreach (var col in row) {{
               <td>%{col}</td>
           }} 
        %}
        </tr>
    }}
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
