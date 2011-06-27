
var parser = require ('../src/parser').parser;
var astmod = require ('../src/ast');

// Set the ast bindings into the parser's free yy variable
parser.yy = astmod;

//var res = parser.parse ("foo; bam; bar; var b = { you : me }; if (x) { while (x) { poop; } }");
//var res = parser.parse ("function bar (foo) { twait { if (foo) { return x; } } } i++; while (i) { bar (i--); } j++;");
var res = parser.parse ("foo;\nbar\njam\n+\ndingles;\nx+1 = y ; blah blah;\n");
var out = parser.yy.output;

// Condense stuff
out.condense ();

var dump = out.dump ();
var s = JSON.stringify (dump);
console.log (s);

