#!/usr/bin/env node
var tame = require('tamejs').runtime;
var __tame_defer_cb = null;
var __tame_fn_2 = function (__tame_k) {
    tame.setActiveCb (__tame_defer_cb);
    var fs = require ( 'fs' ) ;
    function caseCmp (a, b) {
        return a . index ( ) - b . index ( );
    }
    ;
    function Case (index, nm, file) {
        this . _nm = nm ;
        this . _file = file ;
        this . _index = index ;
        this . index =
        function  () {
            return this . _index;
        }
        this . run =
        function  (cb) {
            var __tame_defer_cb = tame.findDeferCb ([cb]);
            tame.setActiveCb (__tame_defer_cb);
            var __tame_this = this;
            var __tame_fn_15 = function (__tame_k) {
                tame.setActiveCb (__tame_defer_cb);
                var ret = true ;
                var x = require ( "../" + __tame_this . _file ) ;
                var __tame_fn_3 = function (__tame_k) {
                    tame.setActiveCb (__tame_defer_cb);
                    var __tame_fn_4 = function (__tame_k) {
                        tame.setActiveCb (__tame_defer_cb);
                        var __tame_k_implicit = {};
                        var __tame_for_in_array = [];
                        for (var c in x) { __tame_for_in_array.push(c); }
                        var __tame_for_in_iter = 0;
                        var __tame_fn_5 = function (__tame_k) {
                            tame.setActiveCb (__tame_defer_cb);
                            var __tame_fn_6 = function (__tame_k) {
                                tame.setActiveCb (__tame_defer_cb);
                                __tame_for_in_iter++
                                tame.callChain([__tame_fn_5, __tame_k]);
                                tame.setActiveCb (null);
                            };
                            __tame_k_implicit.k_break = __tame_k;
                            __tame_k_implicit.k_continue = function() { __tame_fn_6(__tame_k); };
                            if (__tame_for_in_iter < __tame_for_in_array.length) {
                                var __tame_fn_13 = function (__tame_k) {
                                    tame.setActiveCb (__tame_defer_cb);
                                    var c = __tame_for_in_array[__tame_for_in_iter];
                                    var __tame_fn_7 = function (__tame_k) {
                                        tame.setActiveCb (__tame_defer_cb);
                                        var __tame_fn_8 = function (__tame_k) {
                                            tame.setActiveCb (__tame_defer_cb);
                                            var __tame_defers = new tame.Deferrals (__tame_k);
                                            var __tame_fn_9 = function (__tame_k) {
                                                tame.setActiveCb (__tame_defer_cb);
                                                x [ c ] . run (
                                                __tame_defers.defer ( { 
                                                    parent_cb : __tame_defer_cb,
                                                    line : 21,
                                                    file : "test/harness.tjs"
                                                } )
                                                ) ;
                                                tame.callChain([__tame_k]);
                                                tame.setActiveCb (null);
                                            };
                                            __tame_fn_9(tame.end);
                                            __tame_defers._fulfill();
                                            tame.setActiveCb (null);
                                        };
                                        var __tame_fn_10 = function (__tame_k) {
                                            tame.setActiveCb (__tame_defer_cb);
                                                try {
                                                    var __tame_fn_11 = function (__tame_k) {
                                                        tame.setActiveCb (__tame_defer_cb);
                                                        x [ c ] . check ( ) ;
                                                        console . log ( __tame_this . _nm + ": passed" ) ;
                                                        tame.callChain([__tame_k]);
                                                        tame.setActiveCb (null);
                                                    };
                                                    tame.callChain([__tame_fn_11, __tame_k]);
                                                }
                                                catch (e) {
                                                    var __tame_fn_12 = function (__tame_k) {
                                                        tame.setActiveCb (__tame_defer_cb);
                                                        console . log ( __tame_this . _nm + ": " + c + ": regtest failed: " + e ) ;
                                                        ret = false ;
                                                        tame.callChain([__tame_k]);
                                                        tame.setActiveCb (null);
                                                    };
                                                    tame.callChain([__tame_fn_12, __tame_k]);
                                                }
                                            tame.setActiveCb (null);
                                        };
                                        tame.callChain([__tame_fn_8, __tame_fn_10, __tame_k]);
                                        tame.setActiveCb (null);
                                    };
                                    tame.callChain([__tame_fn_7, __tame_k]);
                                    tame.setActiveCb (null);
                                };
                                tame.callChain([__tame_fn_13, __tame_fn_6, __tame_k]);
                            } else {
                                tame.callChain([__tame_k]);
                            }
                            tame.setActiveCb (null);
                        };
                        tame.callChain([__tame_fn_5, __tame_k]);
                        tame.setActiveCb (null);
                    };
                    var __tame_fn_14 = function (__tame_k) {
                        tame.setActiveCb (__tame_defer_cb);
                        cb ( ret ) ;
                        tame.callChain([__tame_k]);
                        tame.setActiveCb (null);
                    };
                    tame.callChain([__tame_fn_4, __tame_fn_14, __tame_k]);
                    tame.setActiveCb (null);
                };
                tame.callChain([__tame_fn_3, __tame_k]);
                tame.setActiveCb (null);
            };
            tame.callChain([__tame_fn_15, __tame_k]);
            tame.setActiveCb (null);
        }
        ;
        return this;
    }
    ;
    function TamedCase (index, prfx, infile, outfile) {
        var that = new Case ( index , prfx + infile , prfx + outfile ) ;
        that . _infile = prfx + infile ;
        
        that . compile =
        function  (ev) {
            var __tame_defer_cb = tame.findDeferCb ([ev]);
            tame.setActiveCb (__tame_defer_cb);
            var __tame_this = this;
            var __tame_fn_26 = function (__tame_k) {
                tame.setActiveCb (__tame_defer_cb);
                var fs = require ( 'fs' ) ;
                var Engine = require ( '../lib/engine' ) . Engine ;
                var engine = new Engine ( __tame_this . _infile ) ;
                var __tame_fn_16 = function (__tame_k) {
                    tame.setActiveCb (__tame_defer_cb);
                    var __tame_fn_17 = function (__tame_k) {
                        tame.setActiveCb (__tame_defer_cb);
                        var __tame_defers = new tame.Deferrals (__tame_k);
                        var __tame_fn_18 = function (__tame_k) {
                            tame.setActiveCb (__tame_defer_cb);
                            engine . readInput (
                            __tame_defers.defer ( { 
                                parent_cb : __tame_defer_cb,
                                line : 44,
                                file : "test/harness.tjs"
                            } )
                            ) ;
                            tame.callChain([__tame_k]);
                            tame.setActiveCb (null);
                        };
                        __tame_fn_18(tame.end);
                        __tame_defers._fulfill();
                        tame.setActiveCb (null);
                    };
                    var __tame_fn_25 = function (__tame_k) {
                        tame.setActiveCb (__tame_defer_cb);
                        engine . parse ( ) ;
                        var outdat = engine . compile ( ) . formatOutput ( ) ;
                        var __tame_fn_19 = function (__tame_k) {
                            tame.setActiveCb (__tame_defer_cb);
                            var err;
                            var __tame_fn_20 = function (__tame_k) {
                                tame.setActiveCb (__tame_defer_cb);
                                var __tame_defers = new tame.Deferrals (__tame_k);
                                var __tame_fn_21 = function (__tame_k) {
                                    tame.setActiveCb (__tame_defer_cb);
                                    fs . writeFile ( __tame_this . _file , outdat ,
                                    __tame_defers.defer ( { 
                                        assign_fn : 
                                            function () {
                                                err = arguments[0];
                                            }
                                            ,
                                        parent_cb : __tame_defer_cb,
                                        line : 47,
                                        file : "test/harness.tjs"
                                    } )
                                    ) ;
                                    tame.callChain([__tame_k]);
                                    tame.setActiveCb (null);
                                };
                                __tame_fn_21(tame.end);
                                __tame_defers._fulfill();
                                tame.setActiveCb (null);
                            };
                            var __tame_fn_22 = function (__tame_k) {
                                tame.setActiveCb (__tame_defer_cb);
                                var __tame_fn_23 = function (__tame_k) {
                                    tame.setActiveCb (__tame_defer_cb);
                                    throw err ;
                                    tame.callChain([__tame_k]);
                                    tame.setActiveCb (null);
                                };
                                if (err) {
                                    tame.callChain([__tame_fn_23, __tame_k]);
                                } else {
                                    tame.callChain([__tame_k]);
                                }
                                tame.setActiveCb (null);
                            };
                            var __tame_fn_24 = function (__tame_k) {
                                tame.setActiveCb (__tame_defer_cb);
                                ev ( ) ;
                                tame.callChain([__tame_k]);
                                tame.setActiveCb (null);
                            };
                            tame.callChain([__tame_fn_20, __tame_fn_22, __tame_fn_24, __tame_k]);
                            tame.setActiveCb (null);
                        };
                        tame.callChain([__tame_fn_19, __tame_k]);
                        tame.setActiveCb (null);
                    };
                    tame.callChain([__tame_fn_17, __tame_fn_25, __tame_k]);
                    tame.setActiveCb (null);
                };
                tame.callChain([__tame_fn_16, __tame_k]);
                tame.setActiveCb (null);
            };
            tame.callChain([__tame_fn_26, __tame_k]);
            tame.setActiveCb (null);
        }
        ;
        return that;
    }
    ;
    function JsCase (index, file) {
        var that = new Case ( index , file , file ) ;
        that . compile =
        function  (ev) {
            ev ( ) ;
        }
        ;
        return that;
    }
    ;
    function read_cases (ev) {
        var __tame_defer_cb = tame.findDeferCb ([ev]);
        tame.setActiveCb (__tame_defer_cb);
        var __tame_this = this;
        var __tame_fn_36 = function (__tame_k) {
            tame.setActiveCb (__tame_defer_cb);
            var tests = [ ] ;
            var res = [ ] ;
            var prfx = "test/cases/" ;
            var __tame_fn_27 = function (__tame_k) {
                tame.setActiveCb (__tame_defer_cb);
                var err, files;
                var __tame_fn_28 = function (__tame_k) {
                    tame.setActiveCb (__tame_defer_cb);
                    var __tame_defers = new tame.Deferrals (__tame_k);
                    var __tame_fn_29 = function (__tame_k) {
                        tame.setActiveCb (__tame_defer_cb);
                        fs . readdir ( 'test/cases/' ,
                        __tame_defers.defer ( { 
                            assign_fn : 
                                function () {
                                    err = arguments[0];
                                    files = arguments[1];
                                }
                                ,
                            func_name : "read_cases",
                            parent_cb : __tame_defer_cb,
                            line : 65,
                            file : "test/harness.tjs"
                        } )
                        ) ;
                        tame.callChain([__tame_k]);
                        tame.setActiveCb (null);
                    };
                    __tame_fn_29(tame.end);
                    __tame_defers._fulfill();
                    tame.setActiveCb (null);
                };
                var __tame_fn_30 = function (__tame_k) {
                    tame.setActiveCb (__tame_defer_cb);
                    var __tame_fn_31 = function (__tame_k) {
                        tame.setActiveCb (__tame_defer_cb);
                        throw err ;
                        tame.callChain([__tame_k]);
                        tame.setActiveCb (null);
                    };
                    if (err) {
                        tame.callChain([__tame_fn_31, __tame_k]);
                    } else {
                        tame.callChain([__tame_k]);
                    }
                    tame.setActiveCb (null);
                };
                var __tame_fn_35 = function (__tame_k) {
                    tame.setActiveCb (__tame_defer_cb);
                    var rxx = new RegExp ( '^(\\d+)([^.]*)\\.(t)?js$' ) ;
                    var __tame_fn_32 = function (__tame_k) {
                        tame.setActiveCb (__tame_defer_cb);
                        var __tame_fn_33 = function (__tame_k) {
                            tame.setActiveCb (__tame_defer_cb);
                             for (f in files) {
                                var file = files [ f ] ;
                                var m = file . match ( rxx ) ;
                                if (m) {
                                    var index = m [ 1 ] ;
                                    if (m [ 3 ]) {
                                        tests . push ( new TamedCase ( index , prfx , file ,
                                        m [ 1 ] + ".out.js" ) ) ;
                                    } else {
                                        tests . push ( new JsCase ( index , prfx + file ) ) ;
                                    }
                                } else {
                                }
                            }
                            tame.callChain([__tame_k]);
                            tame.setActiveCb (null);
                        };
                        var __tame_fn_34 = function (__tame_k) {
                            tame.setActiveCb (__tame_defer_cb);
                            tests . sort ( caseCmp ) ;
                            ev ( tests ) ;
                            tame.callChain([__tame_k]);
                            tame.setActiveCb (null);
                        };
                        tame.callChain([__tame_fn_33, __tame_fn_34, __tame_k]);
                        tame.setActiveCb (null);
                    };
                    tame.callChain([__tame_fn_32, __tame_k]);
                    tame.setActiveCb (null);
                };
                tame.callChain([__tame_fn_28, __tame_fn_30, __tame_fn_35, __tame_k]);
                tame.setActiveCb (null);
            };
            tame.callChain([__tame_fn_27, __tame_k]);
            tame.setActiveCb (null);
        };
        tame.callChain([__tame_fn_36, __tame_k]);
        tame.setActiveCb (null);
    }
    ;
    function do_cases (ev) {
        var __tame_defer_cb = tame.findDeferCb ([ev]);
        tame.setActiveCb (__tame_defer_cb);
        var __tame_this = this;
        var __tame_fn_37 = function (__tame_k) {
            tame.setActiveCb (__tame_defer_cb);
            var cases;
            var __tame_fn_38 = function (__tame_k) {
                tame.setActiveCb (__tame_defer_cb);
                var __tame_defers = new tame.Deferrals (__tame_k);
                var __tame_fn_39 = function (__tame_k) {
                    tame.setActiveCb (__tame_defer_cb);
                    read_cases (
                    __tame_defers.defer ( { 
                        assign_fn : 
                            function () {
                                cases = arguments[0];
                            }
                            ,
                        func_name : "do_cases",
                        parent_cb : __tame_defer_cb,
                        line : 88,
                        file : "test/harness.tjs"
                    } )
                    ) ;
                    tame.callChain([__tame_k]);
                    tame.setActiveCb (null);
                };
                __tame_fn_39(tame.end);
                __tame_defers._fulfill();
                tame.setActiveCb (null);
            };
            var __tame_fn_58 = function (__tame_k) {
                tame.setActiveCb (__tame_defer_cb);
                var tot = 0 ;
                var good = 0 ;
                var __tame_fn_40 = function (__tame_k) {
                    tame.setActiveCb (__tame_defer_cb);
                    var __tame_fn_41 = function (__tame_k) {
                        tame.setActiveCb (__tame_defer_cb);
                        var __tame_k_implicit = {};
                        var __tame_for_in_array = [];
                        for (var i in cases) { __tame_for_in_array.push(i); }
                        var __tame_for_in_iter = 0;
                        var __tame_fn_42 = function (__tame_k) {
                            tame.setActiveCb (__tame_defer_cb);
                            var __tame_fn_43 = function (__tame_k) {
                                tame.setActiveCb (__tame_defer_cb);
                                __tame_for_in_iter++
                                tame.callChain([__tame_fn_42, __tame_k]);
                                tame.setActiveCb (null);
                            };
                            __tame_k_implicit.k_break = __tame_k;
                            __tame_k_implicit.k_continue = function() { __tame_fn_43(__tame_k); };
                            if (__tame_for_in_iter < __tame_for_in_array.length) {
                                var __tame_fn_53 = function (__tame_k) {
                                    tame.setActiveCb (__tame_defer_cb);
                                    var i = __tame_for_in_array[__tame_for_in_iter];
                                    var __tame_fn_44 = function (__tame_k) {
                                        tame.setActiveCb (__tame_defer_cb);
                                        var __tame_fn_45 = function (__tame_k) {
                                            tame.setActiveCb (__tame_defer_cb);
                                            var __tame_defers = new tame.Deferrals (__tame_k);
                                            var __tame_fn_46 = function (__tame_k) {
                                                tame.setActiveCb (__tame_defer_cb);
                                                cases [ i ] . compile (
                                                __tame_defers.defer ( { 
                                                    func_name : "do_cases",
                                                    parent_cb : __tame_defer_cb,
                                                    line : 92,
                                                    file : "test/harness.tjs"
                                                } )
                                                ) ;
                                                tame.callChain([__tame_k]);
                                                tame.setActiveCb (null);
                                            };
                                            __tame_fn_46(tame.end);
                                            __tame_defers._fulfill();
                                            tame.setActiveCb (null);
                                        };
                                        var __tame_fn_52 = function (__tame_k) {
                                            tame.setActiveCb (__tame_defer_cb);
                                            tot ++ ;
                                            var __tame_fn_47 = function (__tame_k) {
                                                tame.setActiveCb (__tame_defer_cb);
                                                var res;
                                                var __tame_fn_48 = function (__tame_k) {
                                                    tame.setActiveCb (__tame_defer_cb);
                                                    var __tame_defers = new tame.Deferrals (__tame_k);
                                                    var __tame_fn_49 = function (__tame_k) {
                                                        tame.setActiveCb (__tame_defer_cb);
                                                        cases [ i ] . run (
                                                        __tame_defers.defer ( { 
                                                            assign_fn : 
                                                                function () {
                                                                    res = arguments[0];
                                                                }
                                                                ,
                                                            func_name : "do_cases",
                                                            parent_cb : __tame_defer_cb,
                                                            line : 94,
                                                            file : "test/harness.tjs"
                                                        } )
                                                        ) ;
                                                        tame.callChain([__tame_k]);
                                                        tame.setActiveCb (null);
                                                    };
                                                    __tame_fn_49(tame.end);
                                                    __tame_defers._fulfill();
                                                    tame.setActiveCb (null);
                                                };
                                                var __tame_fn_50 = function (__tame_k) {
                                                    tame.setActiveCb (__tame_defer_cb);
                                                    var __tame_fn_51 = function (__tame_k) {
                                                        tame.setActiveCb (__tame_defer_cb);
                                                        good ++ ;
                                                        tame.callChain([__tame_k]);
                                                        tame.setActiveCb (null);
                                                    };
                                                    if (res) {
                                                        tame.callChain([__tame_fn_51, __tame_k]);
                                                    } else {
                                                        tame.callChain([__tame_k]);
                                                    }
                                                    tame.setActiveCb (null);
                                                };
                                                tame.callChain([__tame_fn_48, __tame_fn_50, __tame_k]);
                                                tame.setActiveCb (null);
                                            };
                                            tame.callChain([__tame_fn_47, __tame_k]);
                                            tame.setActiveCb (null);
                                        };
                                        tame.callChain([__tame_fn_45, __tame_fn_52, __tame_k]);
                                        tame.setActiveCb (null);
                                    };
                                    tame.callChain([__tame_fn_44, __tame_k]);
                                    tame.setActiveCb (null);
                                };
                                tame.callChain([__tame_fn_53, __tame_fn_43, __tame_k]);
                            } else {
                                tame.callChain([__tame_k]);
                            }
                            tame.setActiveCb (null);
                        };
                        tame.callChain([__tame_fn_42, __tame_k]);
                        tame.setActiveCb (null);
                    };
                    var __tame_fn_54 = function (__tame_k) {
                        tame.setActiveCb (__tame_defer_cb);
                        var __tame_fn_55 = function (__tame_k) {
                            tame.setActiveCb (__tame_defer_cb);
                            console . log ( "All " + tot + " tests passed! YES!" ) ;
                            tame.callChain([__tame_k]);
                            tame.setActiveCb (null);
                        };
                        var __tame_fn_56 = function (__tame_k) {
                            tame.setActiveCb (__tame_defer_cb);
                            console . log ( "XXX only " + good + "/" + tot + " tessed pased. BOO!" ) ;
                            tame.callChain([__tame_k]);
                            tame.setActiveCb (null);
                        };
                        if (tot == good) {
                            tame.callChain([__tame_fn_55, __tame_k]);
                        } else {
                            tame.callChain([__tame_fn_56, __tame_k]);
                        }
                        tame.setActiveCb (null);
                    };
                    var __tame_fn_57 = function (__tame_k) {
                        tame.setActiveCb (__tame_defer_cb);
                        ev ( ) ;
                        tame.callChain([__tame_k]);
                        tame.setActiveCb (null);
                    };
                    tame.callChain([__tame_fn_41, __tame_fn_54, __tame_fn_57, __tame_k]);
                    tame.setActiveCb (null);
                };
                tame.callChain([__tame_fn_40, __tame_k]);
                tame.setActiveCb (null);
            };
            tame.callChain([__tame_fn_38, __tame_fn_58, __tame_k]);
            tame.setActiveCb (null);
        };
        tame.callChain([__tame_fn_37, __tame_k]);
        tame.setActiveCb (null);
    }
    ;
    var __tame_fn_0 = function (__tame_k) {
        tame.setActiveCb (__tame_defer_cb);
        var __tame_defers = new tame.Deferrals (__tame_k);
        var __tame_fn_1 = function (__tame_k) {
            tame.setActiveCb (__tame_defer_cb);
            do_cases (
            __tame_defers.defer ( { 
                parent_cb : __tame_defer_cb,
                line : 107,
                file : "test/harness.tjs"
            } )
            ) ;
            tame.callChain([__tame_k]);
            tame.setActiveCb (null);
        };
        __tame_fn_1(tame.end);
        __tame_defers._fulfill();
        tame.setActiveCb (null);
    };
    tame.callChain([__tame_fn_0, __tame_k]);
    tame.setActiveCb (null);
};
__tame_fn_2 (tame.end);