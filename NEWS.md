News And Changelog
==================

v0.4.9
------
* Fix bug in !== lexing

v0.4.8
------
* Fix bug in while(!foo) {} 

v0.4.4
-------
* Fix in caching of intermediate runtime files, and also some more switches to turn of caching

v0.4.3
------
* Add sktaylor's patch for a bug in findDeferCb (issue #20).

v0.4.2
------
* `Pipeliner class

v0.4.1
------
* `autocb` convenience

v0.4.0
------
* Tame-aware stack-traces.

v0.3.4
------
* Handle decimals properly, patch submitted by frew.

v0.3.3
-------
* Fix bug with `this` rewriting. Now all `this` references are rewritten inside a function that's tamed.
* Passthrough switch statements if possible

v0.3.2
------
* Fix bug with `switch (x) { case "foo": break; }`.

v0.3.1
-------
* Fix bugs with 'use strict'; in the parser
* Fix code generation to work with 'use strict' in the case of labeled break
points.

v0.3.0
------
 
* Due to popular outcry, we've renamed
    * `twait` --> `await`
    * `mkevent` --> `defer`
* Different `Rendezvous` semantics.  Now `Rendezvous.defer` is just as
  powerful as regular `defer`.
* Introduce "rest" parameters for variadic return from callbacks.
* Solve nasty bug in the following, having to do with when variables
are captured.  I think what we have now is quite close to C++-style
references, which was the goal:

```javascript
await { for (var i = 0; i < n; i++) { foo (defer (arr[i])); } }
```
