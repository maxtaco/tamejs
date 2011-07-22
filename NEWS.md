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
