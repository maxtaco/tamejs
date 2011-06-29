tamejs
======

This package is a source-to-source translator that outputs JavaScript. The
input dialect looks a lot like JavaScript, but introduces the `twait` 
primitive, which allows asynchronous callback style code to work more
like straight-line threaded code.  **tamejs** is written in JavaScript.

Example
------

    for (var i = 0; i < 10; i++) {
        twait { setTimeout (mkevent (), 100); }
        console.log ("hello");
    }
