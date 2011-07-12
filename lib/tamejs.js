
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

function register () {
    require.extensions['.tjs'] = _extension;
};

//-----------------------------------------------------------------------

exports.register = register;

