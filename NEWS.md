News And Changelog
==================

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
