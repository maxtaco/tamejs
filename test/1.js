
var parser = require ('../src/parser').parser;
var astmod = require ('../src/ast');

// Set the ast bindings into the parser's free yy variable
parser.yy = astmod;

var res = parser.parse ("foo; bam; bar; if (x) { poop; }");
console.log (parser.yy.output);

