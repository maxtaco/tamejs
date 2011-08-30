
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

// Register the tamejs extension. It's ".tjs" by default, or 
// supply your own.
function register (ext) {
    if (!ext) { ext = "tjs"; }
    require.extensions["." + ext] = _extension;
};

//-----------------------------------------------------------------------

exports.register = register;

