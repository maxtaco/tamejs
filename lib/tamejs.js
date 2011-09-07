
"use strict";

var runtime = require ('./runtime').runtime;
exports.runtime = runtime;

//-----------------------------------------------------------------------

function _extension (module, filename) {
    var Engine = require ('./engine').Engine;
    var engine = new Engine (filename);
    engine.readInputSync ();
    engine.parse ();
    var out = engine.compile ().formatOutput ();
    module._compile (out, filename);
};


//-----------------------------------------------------------------------

//
// Register the tamejs extension, with some options:
//
//  extension : is ".tjs" by default, but you can supply your own extension
//      here, or if you please, an array of extensions.
//
//  catchExceptions : turn to true if you want the tame runtime to catch
//      uncaught exceptions, and throw a "tame" stacktrace.
//
function register (options) {

    if (!options) { options = {}; }
    else if (typeof (options) == 'string') { 
	options = { extension : options } ;
    }

    var ext = "tjs";
    if (options.extension) { ext = options.extension; }
    if (!(ext instanceof Array)) { ext = [ ext ]; }
    for (var e in ext) {
	require.extensions["." + ext[e]] = _extension;
    }

    if (options.catchExceptions) { runtime.catchExceptions (); }

};

//-----------------------------------------------------------------------

exports.register = register;

