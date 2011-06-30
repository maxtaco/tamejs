var tame = require('tamejs').runtime;
var __tame_fn_0 = function (__tame_k) {
    function foo () {
        var __tame_fn_9 = function (__tame_k) {
            var lst = [ "dog" , "cat" , "bird" , "seal" ] ;
            var __tame_fn_1 = function (__tame_k) {
                var __tame_for_in_array = [];
                for (var animal in lst) { __tame_for_in_array.push(animal); }
                var __tame_for_in_iter = 0;
                var __tame_fn_2 = function (__tame_k) {
                    var __tame_fn_3 = function (__tame_k) {
                        __tame_for_in_iter++
                        tame.callChain([__tame_fn_2, __tame_k]);
                    };
                    if (__tame_for_in_iter < __tame_for_in_array.length) {
                        var __tame_fn_8 = function (__tame_k) {
                            var animal = __tame_for_in_array[__tame_for_in_iter];
                            var __tame_fn_4 = function (__tame_k) {
                                var __tame_fn_5 = function (__tame_k) {
                                    var __tame_ev = new tame.Event (__tame_k);
                                    var __tame_fn_6 = function (__tame_k) {
                                        setTimeout ( __tame_ev.mkevent ( ) , 100 ) ;
                                        tame.callChain([__tame_k]);
                                    };
                                    __tame_fn_6(tame.end);
                                    __tame_ev.trigger();
                                };
                                var __tame_fn_7 = function (__tame_k) {
                                    console .log ( "iter: " + lst [ animal ] ) ;
                                    tame.callChain([__tame_k]);
                                };
                                tame.callChain([__tame_fn_5, __tame_fn_7, __tame_k]);
                            };
                            tame.callChain([__tame_fn_4, __tame_k]);
                        };
                        tame.callChain([__tame_fn_8, __tame_fn_3, __tame_k]);
                    } else {
                        tame.callChain([__tame_k]);
                    }
                    tame.__k_global.k_break = __tame_k;
                    tame.__k_global.k_continue = function() { __tame_fn_3(__tame_k); };
                };
                tame.callChain([__tame_fn_2, __tame_k]);
            };
            tame.callChain([__tame_fn_1, __tame_k]);
        };
        tame.callChain([__tame_fn_9, __tame_k]);
    }
    ;
    
    foo ( ) ;
    tame.callChain([__tame_k]);
};
__tame_fn_0 (tame.end);