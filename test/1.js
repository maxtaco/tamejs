
var parser = require ('../src/parser').parser;
var astmod = require ('../src/ast');

// Set the ast bindings into the parser's free yy variable
parser.yy = astmod;

//var res = parser.parse ("foo; bam; bar; var b = { you : me }; if (x) { while (x) { poop; } }");
var res = parser.parse ("x ; y ; while (z) { if (y) { bar; } else { jam (a); } } ");
var out = parser.yy.output;
var dump = out.dump ();
var s = JSON.stringify (dump);
console.log (s);

