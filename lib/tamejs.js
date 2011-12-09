
"use strict";

var runtime = require ('./runtime').runtime;
var fs = require('fs');
var path = require('path');
var engineVersion = "0.4.9";
var useCache = true;

exports.runtime = runtime;

//-----------------------------------------------------------------------

function _extension (module, filename) {

    var recompile = true;

    if (useCache) {
	var cachePath = path.join(path.dirname(filename), "." + 
				  path.basename(filename) + "." + 
				  engineVersion + ".cache");
	
	try {
            var cacheStats = fs.statSync (cachePath);
	
	    if (cacheStats) {
		var tjsStats = fs.statSync(filename);
		if (cacheStats.mtime > tjsStats.mtime && 
		    cacheStats.size > 0){ 
		    recompile = false;
		}
	    }

	} catch (e) { cacheStats = null; }
    }
    
    var out = "";

    if (recompile) {
        var Engine = require ('./engine').Engine;
        var engine = new Engine (filename);
        engine.readInputSync ();
        engine.parse ();
        out = engine.compile ().formatOutput ();
	if (useCache) {
            fs.writeFileSync(cachePath, out);
	}
    } else {
        out = fs.readFileSync(cachePath, 'utf8');
    }

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
    else if (typeof (options) == 'string' || options instanceof Array) { 
    	options = { extension : options } ;
    }

    var ext = "tjs";
    if (options.extension) { ext = options.extension; }
    if (options.disableCache) { useCache = false; }
    if (!(ext instanceof Array)) { ext = [ ext ]; }
    for (var e in ext) {
	require.extensions["." + ext[e]] = _extension;
    }

    if (options.catchExceptions) { runtime.catchExceptions (); }

};

//-----------------------------------------------------------------------

exports.register = register;

