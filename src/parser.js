/* Jison generated parser */
var parser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"String":3,"String1":4,"String2":5,"QUOTE1":6,"StringAtoms":7,"QUOTE2":8,"StringAtom":9,"STRING_ATOM":10,"InnerExprAtom":11,"OuterExprAtom":12,"LABEL":13,"BraceExpr":14,"FunctionDeclaration":15,"InnerExprAtomList":16,"InnerExpr":17,"ParenExpr":18,"LPAREN":19,"RPAREN":20,"BracketExpr":21,"LBRACKET":22,"RBRACKET":23,"LBRACE":24,"RBRACE":25,"GENERIC":26,"COMMA":27,"COLON":28,"ID":29,"MKEVENT":30,"Expr":31,"ExprStatement":32,"SEMICOLON":33,"SemicolonOpt":34,"Statement":35,"Block":36,"ForStatement":37,"WhileStatement":38,"IfStatement":39,"TwaitStatement":40,"LabeledStatement":41,"ReturnStatement":42,"BreakStatement":43,"ContinueStatement":44,"Label":45,"RETURN":46,"CONTINUE":47,"IdOpt":48,"BREAK":49,"SourceElements":50,"FOR":51,"ForIter":52,"WHILE":53,"IF":54,"ELSE":55,"FUNCTION":56,"ParamListOpt":57,"TWAIT":58,"ParamList":59,"Param":60,"FunctionBody":61,"Program":62,"$accept":0,"$end":1},
terminals_: {2:"error",6:"QUOTE1",8:"QUOTE2",10:"STRING_ATOM",13:"LABEL",19:"LPAREN",20:"RPAREN",22:"LBRACKET",23:"RBRACKET",24:"LBRACE",25:"RBRACE",26:"GENERIC",27:"COMMA",28:"COLON",29:"ID",30:"MKEVENT",33:"SEMICOLON",46:"RETURN",47:"CONTINUE",49:"BREAK",51:"FOR",53:"WHILE",54:"IF",55:"ELSE",56:"FUNCTION",58:"TWAIT"},
productions_: [0,[3,1],[3,1],[4,3],[5,3],[9,1],[7,0],[7,2],[11,1],[11,1],[11,1],[11,1],[16,0],[16,2],[17,1],[18,3],[21,3],[14,3],[12,1],[12,1],[12,1],[12,1],[12,1],[12,1],[12,1],[12,1],[31,0],[31,2],[32,2],[32,1],[34,0],[34,1],[35,1],[35,1],[35,1],[35,1],[35,1],[35,1],[35,1],[35,1],[35,1],[35,1],[45,1],[41,2],[42,3],[44,3],[43,3],[36,3],[50,0],[50,2],[37,5],[38,5],[39,5],[39,7],[52,5],[52,1],[15,6],[40,2],[48,0],[48,1],[59,1],[59,3],[60,1],[57,0],[57,1],[61,1],[62,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: this.$ = $$[$0]; 
break;
case 2: this.$ = $$[$0]; 
break;
case 3: this.$ = new yy.String (_$[$0-2].first_line, _$[$0].last_line, "'" + $$[$0-1] + "'"); 
break;
case 4: this.$ = new yy.String (_$[$0-2].first_line, _$[$0].last_line, '"' + $$[$0-1] + '"'); 
break;
case 5: this.$ = yytext; 
break;
case 6: this.$ = ""; 
break;
case 7: this.$ = $$[$0-1] + $$[$0]; 
break;
case 8: this.$ = $$[$0]; 
break;
case 9: this.$ = [ new yy.Atom (_$[$0].first_line, yytext)]; 
break;
case 10: this.$ = $$[$0]; 
break;
case 11: this.$ = [ $$[$0] ]; 
break;
case 12: this.$ = []; 
break;
case 13: this.$ = $$[$0-1].concat ($$[$0]); 
break;
case 14: this.$ = new yy.Expr ($$[$0]); 
break;
case 15: 
         var out = [ new yy.Atom (_$[$0-2].first_line, '(') ];
	 $$[$0-1].pushAtomsToArray (out);
	 out.push (new yy.Atom (_$[$0].first_line, ')'));
	 this.$ = out;
     
break;
case 16: 
         var out = [ new yy.Atom (_$[$0-2].first_line, '[') ];
	 $$[$0-1].pushAtomsToArray (out);
	 out.push (new yy.Atom (_$[$0].first_line, ']'));
	 this.$ = out;
     
break;
case 17: 
         var out = [ new yy.Atom (_$[$0-2].first_line, '{') ];
	 $$[$0-1].pushAtomsToArray (out);
	 out.push (new yy.Atom (_$[$0].first_line, '}'));
	 this.$ = out;
     
break;
case 18: this.$ = [ new yy.Atom (_$[$0].first_line, yytext) ]; 
break;
case 19: this.$ = [ new yy.Atom (_$[$0].first_line, yytext) ]; 
break;
case 20: this.$ = [ new yy.Atom (_$[$0].first_line, yytext) ]; 
break;
case 21: this.$ = [ new yy.Atom (_$[$0].first_line, yytext) ]; 
break;
case 22: this.$ = $$[$0]; 
break;
case 23: this.$ = $$[$0]; 
break;
case 24: this.$ = $$[$0]; 
break;
case 25: this.$ = [ new yy.Atom (_$[$0].first_line, "__ev.mkevent") ] ; 
break;
case 26: this.$ = new yy.Expr ([]); 
break;
case 27:
	 var lst = $$[$0-1].concat ($$[$0]);
	 this.$ = new yy.Expr (lst);
     
break;
case 28: 
         $$[$0-1].addAtom (new yy.Atom (_$[$0].first_line, ";")); 
	 this.$ = $$[$0-1]; 
     
break;
case 29:
         this.$ = yy.Expr ([ $$[$0] ] );
     
break;
case 42: this.$ = new yy.Label (_$[$0].first_line, yytext); 
break;
case 43:
         $$[$0].setLabel ($$[$0-1]);
	 this.$ = $$[$0];
     
break;
case 44:
         this.$ = new yy.ReturnStatement (_$[$0-2].first_line, $$[$0-1]);
     
break;
case 45:
         this.$ = new yy.ContinueStatement (_$[$0-2].first_line, $$[$0-1]);
     
break;
case 46:
         this.$ = new yy.BreakStatement (_$[$0-2].first_line, $$[$0-1]);
     
break;
case 47: this.$ = new yy.Block (_$[$0-2].first_line, $$[$0-1]); 
break;
case 48: this.$ = []; 
break;
case 49: $$[$0-1].push ($$[$0]); this.$ = $$[$0-1]; 
break;
case 50:
        this.$ = new yy.ForStatement (_$[$0-4].first_line, $$[$0-2], $$[$0]);
     
break;
case 51:
        this.$ = new yy.WhileStatement (_$[$0-4].first_line, $$[$0-2], $$[$0]);
     
break;
case 52:
        this.$ = new yy.IfElseStatement (_$[$0-4].first_line, $$[$0-2], $$[$0], null);
     
break;
case 53:
        this.$ = new yy.IfElseStatement (_$[$0-6].first_line, $$[$0-4], $$[$0-2], $$[$0]);
     
break;
case 54:
         this.$ = new yy.ForIterClassic ($$[$0-4], $$[$0-2], $$[$0]);
     
break;
case 55:
         this.$ = new yy.ForIterIterator ($$[$0]); 
     
break;
case 56:
         this.$ = new yy.FunctionDeclaration (_$[$0-5].first_line, $$[$0-4], $$[$0-2], $$[$0]);
     
break;
case 57:
        this.$ = new yy.TwaitStatement (_$[$0-1].first_line, $$[$0]);
     
break;
case 59: this.$ = yytext; 
break;
case 60: this.$ = [ $$[$0] ]; 
break;
case 61: $$[$0-2].push ($$[$0]); this.$ = $$[$0-2]; 
break;
case 62: this.$ = yytext; 
break;
case 63: this.$ = []; 
break;
case 66: yy.output = new yy.Program ($$[$0]); 
break;
}
},
table: [{1:[2,48],6:[2,48],8:[2,48],13:[2,48],19:[2,48],22:[2,48],24:[2,48],26:[2,48],27:[2,48],28:[2,48],29:[2,48],30:[2,48],33:[2,48],46:[2,48],47:[2,48],49:[2,48],50:2,51:[2,48],53:[2,48],54:[2,48],56:[2,48],58:[2,48],62:1},{1:[3]},{1:[2,66],3:32,4:36,5:37,6:[1,40],8:[1,41],12:25,13:[1,27],15:16,18:33,19:[1,38],21:34,22:[1,39],24:[1,14],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],31:15,32:5,33:[2,26],35:3,36:4,37:6,38:7,39:8,40:9,41:10,42:11,43:12,44:13,45:21,46:[1,22],47:[1,24],49:[1,23],51:[1,17],53:[1,18],54:[1,19],56:[1,26],58:[1,20]},{1:[2,49],6:[2,49],8:[2,49],13:[2,49],19:[2,49],22:[2,49],24:[2,49],25:[2,49],26:[2,49],27:[2,49],28:[2,49],29:[2,49],30:[2,49],33:[2,49],46:[2,49],47:[2,49],49:[2,49],51:[2,49],53:[2,49],54:[2,49],56:[2,49],58:[2,49]},{1:[2,32],6:[2,32],8:[2,32],13:[2,32],19:[2,32],22:[2,32],24:[2,32],25:[2,32],26:[2,32],27:[2,32],28:[2,32],29:[2,32],30:[2,32],33:[2,32],46:[2,32],47:[2,32],49:[2,32],51:[2,32],53:[2,32],54:[2,32],55:[2,32],56:[2,32],58:[2,32]},{1:[2,33],6:[2,33],8:[2,33],13:[2,33],19:[2,33],22:[2,33],24:[2,33],25:[2,33],26:[2,33],27:[2,33],28:[2,33],29:[2,33],30:[2,33],33:[2,33],46:[2,33],47:[2,33],49:[2,33],51:[2,33],53:[2,33],54:[2,33],55:[2,33],56:[2,33],58:[2,33]},{1:[2,34],6:[2,34],8:[2,34],13:[2,34],19:[2,34],22:[2,34],24:[2,34],25:[2,34],26:[2,34],27:[2,34],28:[2,34],29:[2,34],30:[2,34],33:[2,34],46:[2,34],47:[2,34],49:[2,34],51:[2,34],53:[2,34],54:[2,34],55:[2,34],56:[2,34],58:[2,34]},{1:[2,35],6:[2,35],8:[2,35],13:[2,35],19:[2,35],22:[2,35],24:[2,35],25:[2,35],26:[2,35],27:[2,35],28:[2,35],29:[2,35],30:[2,35],33:[2,35],46:[2,35],47:[2,35],49:[2,35],51:[2,35],53:[2,35],54:[2,35],55:[2,35],56:[2,35],58:[2,35]},{1:[2,36],6:[2,36],8:[2,36],13:[2,36],19:[2,36],22:[2,36],24:[2,36],25:[2,36],26:[2,36],27:[2,36],28:[2,36],29:[2,36],30:[2,36],33:[2,36],46:[2,36],47:[2,36],49:[2,36],51:[2,36],53:[2,36],54:[2,36],55:[2,36],56:[2,36],58:[2,36]},{1:[2,37],6:[2,37],8:[2,37],13:[2,37],19:[2,37],22:[2,37],24:[2,37],25:[2,37],26:[2,37],27:[2,37],28:[2,37],29:[2,37],30:[2,37],33:[2,37],46:[2,37],47:[2,37],49:[2,37],51:[2,37],53:[2,37],54:[2,37],55:[2,37],56:[2,37],58:[2,37]},{1:[2,38],6:[2,38],8:[2,38],13:[2,38],19:[2,38],22:[2,38],24:[2,38],25:[2,38],26:[2,38],27:[2,38],28:[2,38],29:[2,38],30:[2,38],33:[2,38],46:[2,38],47:[2,38],49:[2,38],51:[2,38],53:[2,38],54:[2,38],55:[2,38],56:[2,38],58:[2,38]},{1:[2,39],6:[2,39],8:[2,39],13:[2,39],19:[2,39],22:[2,39],24:[2,39],25:[2,39],26:[2,39],27:[2,39],28:[2,39],29:[2,39],30:[2,39],33:[2,39],46:[2,39],47:[2,39],49:[2,39],51:[2,39],53:[2,39],54:[2,39],55:[2,39],56:[2,39],58:[2,39]},{1:[2,40],6:[2,40],8:[2,40],13:[2,40],19:[2,40],22:[2,40],24:[2,40],25:[2,40],26:[2,40],27:[2,40],28:[2,40],29:[2,40],30:[2,40],33:[2,40],46:[2,40],47:[2,40],49:[2,40],51:[2,40],53:[2,40],54:[2,40],55:[2,40],56:[2,40],58:[2,40]},{1:[2,41],6:[2,41],8:[2,41],13:[2,41],19:[2,41],22:[2,41],24:[2,41],25:[2,41],26:[2,41],27:[2,41],28:[2,41],29:[2,41],30:[2,41],33:[2,41],46:[2,41],47:[2,41],49:[2,41],51:[2,41],53:[2,41],54:[2,41],55:[2,41],56:[2,41],58:[2,41]},{6:[2,48],8:[2,48],13:[2,48],19:[2,48],22:[2,48],24:[2,48],25:[2,48],26:[2,48],27:[2,48],28:[2,48],29:[2,48],30:[2,48],33:[2,48],46:[2,48],47:[2,48],49:[2,48],50:42,51:[2,48],53:[2,48],54:[2,48],56:[2,48],58:[2,48]},{33:[1,43]},{1:[2,29],6:[2,29],8:[2,29],13:[2,29],19:[2,29],22:[2,29],24:[2,29],25:[2,29],26:[2,29],27:[2,29],28:[2,29],29:[2,29],30:[2,29],33:[2,29],46:[2,29],47:[2,29],49:[2,29],51:[2,29],53:[2,29],54:[2,29],55:[2,29],56:[2,29],58:[2,29]},{19:[1,44]},{19:[1,45]},{19:[1,46]},{3:32,4:36,5:37,6:[1,40],8:[1,41],12:25,13:[1,27],15:16,18:33,19:[1,38],21:34,22:[1,39],24:[1,14],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],31:15,32:5,33:[2,26],35:47,36:4,37:6,38:7,39:8,40:9,41:10,42:11,43:12,44:13,45:21,46:[1,22],47:[1,24],49:[1,23],51:[1,17],53:[1,18],54:[1,19],56:[1,26],58:[1,20]},{3:32,4:36,5:37,6:[1,40],8:[1,41],12:25,13:[1,27],15:16,18:33,19:[1,38],21:34,22:[1,39],24:[1,14],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],31:15,32:5,33:[2,26],35:48,36:4,37:6,38:7,39:8,40:9,41:10,42:11,43:12,44:13,45:21,46:[1,22],47:[1,24],49:[1,23],51:[1,17],53:[1,18],54:[1,19],56:[1,26],58:[1,20]},{6:[2,12],8:[2,12],13:[2,12],16:50,17:49,19:[2,12],22:[2,12],24:[2,12],26:[2,12],27:[2,12],28:[2,12],29:[2,12],30:[2,12],33:[2,12],56:[2,12]},{29:[1,52],33:[2,58],48:51},{29:[1,52],33:[2,58],48:53},{6:[2,12],8:[2,12],13:[2,12],16:54,19:[2,12],20:[2,12],22:[2,12],24:[2,12],26:[2,12],27:[2,12],28:[2,12],29:[2,12],30:[2,12],33:[2,12],56:[2,12]},{19:[2,58],29:[1,52],48:55},{6:[2,42],8:[2,42],13:[2,42],19:[2,42],22:[2,42],24:[2,42],26:[2,42],27:[2,42],28:[2,42],29:[2,42],30:[2,42],33:[2,42],46:[2,42],47:[2,42],49:[2,42],51:[2,42],53:[2,42],54:[2,42],56:[2,42],58:[2,42]},{6:[2,18],8:[2,18],13:[2,18],19:[2,18],20:[2,18],22:[2,18],23:[2,18],24:[2,18],25:[2,18],26:[2,18],27:[2,18],28:[2,18],29:[2,18],30:[2,18],33:[2,18],56:[2,18]},{6:[2,19],8:[2,19],13:[2,19],19:[2,19],20:[2,19],22:[2,19],23:[2,19],24:[2,19],25:[2,19],26:[2,19],27:[2,19],28:[2,19],29:[2,19],30:[2,19],33:[2,19],56:[2,19]},{6:[2,20],8:[2,20],13:[2,20],19:[2,20],20:[2,20],22:[2,20],23:[2,20],24:[2,20],25:[2,20],26:[2,20],27:[2,20],28:[2,20],29:[2,20],30:[2,20],33:[2,20],56:[2,20]},{6:[2,21],8:[2,21],13:[2,21],19:[2,21],20:[2,21],22:[2,21],23:[2,21],24:[2,21],25:[2,21],26:[2,21],27:[2,21],28:[2,21],29:[2,21],30:[2,21],33:[2,21],56:[2,21]},{6:[2,22],8:[2,22],13:[2,22],19:[2,22],20:[2,22],22:[2,22],23:[2,22],24:[2,22],25:[2,22],26:[2,22],27:[2,22],28:[2,22],29:[2,22],30:[2,22],33:[2,22],56:[2,22]},{6:[2,23],8:[2,23],13:[2,23],19:[2,23],20:[2,23],22:[2,23],23:[2,23],24:[2,23],25:[2,23],26:[2,23],27:[2,23],28:[2,23],29:[2,23],30:[2,23],33:[2,23],56:[2,23]},{6:[2,24],8:[2,24],13:[2,24],19:[2,24],20:[2,24],22:[2,24],23:[2,24],24:[2,24],25:[2,24],26:[2,24],27:[2,24],28:[2,24],29:[2,24],30:[2,24],33:[2,24],56:[2,24]},{6:[2,25],8:[2,25],13:[2,25],19:[2,25],20:[2,25],22:[2,25],23:[2,25],24:[2,25],25:[2,25],26:[2,25],27:[2,25],28:[2,25],29:[2,25],30:[2,25],33:[2,25],56:[2,25]},{6:[2,1],8:[2,1],13:[2,1],19:[2,1],20:[2,1],22:[2,1],23:[2,1],24:[2,1],25:[2,1],26:[2,1],27:[2,1],28:[2,1],29:[2,1],30:[2,1],33:[2,1],56:[2,1]},{6:[2,2],8:[2,2],13:[2,2],19:[2,2],20:[2,2],22:[2,2],23:[2,2],24:[2,2],25:[2,2],26:[2,2],27:[2,2],28:[2,2],29:[2,2],30:[2,2],33:[2,2],56:[2,2]},{6:[2,12],8:[2,12],13:[2,12],16:50,17:56,19:[2,12],20:[2,12],22:[2,12],24:[2,12],26:[2,12],27:[2,12],28:[2,12],29:[2,12],30:[2,12],56:[2,12]},{6:[2,12],8:[2,12],13:[2,12],16:50,17:57,19:[2,12],22:[2,12],23:[2,12],24:[2,12],26:[2,12],27:[2,12],28:[2,12],29:[2,12],30:[2,12],56:[2,12]},{6:[2,6],7:58,10:[2,6]},{7:59,8:[2,6],10:[2,6]},{3:32,4:36,5:37,6:[1,40],8:[1,41],12:25,13:[1,27],15:16,18:33,19:[1,38],21:34,22:[1,39],24:[1,14],25:[1,60],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],31:15,32:5,33:[2,26],35:3,36:4,37:6,38:7,39:8,40:9,41:10,42:11,43:12,44:13,45:21,46:[1,22],47:[1,24],49:[1,23],51:[1,17],53:[1,18],54:[1,19],56:[1,26],58:[1,20]},{1:[2,28],6:[2,28],8:[2,28],13:[2,28],19:[2,28],22:[2,28],24:[2,28],25:[2,28],26:[2,28],27:[2,28],28:[2,28],29:[2,28],30:[2,28],33:[2,28],46:[2,28],47:[2,28],49:[2,28],51:[2,28],53:[2,28],54:[2,28],55:[2,28],56:[2,28],58:[2,28]},{3:32,4:36,5:37,6:[1,40],8:[1,41],12:25,18:33,19:[1,38],20:[2,26],21:34,22:[1,39],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],31:62,33:[2,26],52:61},{3:32,4:36,5:37,6:[1,40],8:[1,41],12:25,18:33,19:[1,38],20:[2,26],21:34,22:[1,39],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],31:63},{3:32,4:36,5:37,6:[1,40],8:[1,41],12:25,18:33,19:[1,38],20:[2,26],21:34,22:[1,39],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],31:64},{1:[2,57],6:[2,57],8:[2,57],13:[2,57],19:[2,57],22:[2,57],24:[2,57],25:[2,57],26:[2,57],27:[2,57],28:[2,57],29:[2,57],30:[2,57],33:[2,57],46:[2,57],47:[2,57],49:[2,57],51:[2,57],53:[2,57],54:[2,57],55:[2,57],56:[2,57],58:[2,57]},{1:[2,43],6:[2,43],8:[2,43],13:[2,43],19:[2,43],22:[2,43],24:[2,43],25:[2,43],26:[2,43],27:[2,43],28:[2,43],29:[2,43],30:[2,43],33:[2,43],46:[2,43],47:[2,43],49:[2,43],51:[2,43],53:[2,43],54:[2,43],55:[2,43],56:[2,43],58:[2,43]},{33:[1,65]},{3:32,4:36,5:37,6:[1,40],8:[1,41],11:66,12:67,13:[1,68],14:69,15:70,18:33,19:[1,38],20:[2,14],21:34,22:[1,39],23:[2,14],24:[1,71],25:[2,14],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],33:[2,14],56:[1,26]},{33:[1,72]},{19:[2,59],33:[2,59]},{33:[1,73]},{3:32,4:36,5:37,6:[1,40],8:[1,41],11:66,12:67,13:[1,68],14:69,15:70,18:33,19:[1,38],20:[2,27],21:34,22:[1,39],24:[1,71],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],33:[2,27],56:[1,26]},{19:[1,74]},{20:[1,75]},{23:[1,76]},{6:[1,77],10:[1,78]},{8:[1,79],10:[1,78]},{1:[2,47],6:[2,47],8:[2,47],13:[2,47],19:[2,47],20:[2,47],22:[2,47],23:[2,47],24:[2,47],25:[2,47],26:[2,47],27:[2,47],28:[2,47],29:[2,47],30:[2,47],33:[2,47],46:[2,47],47:[2,47],49:[2,47],51:[2,47],53:[2,47],54:[2,47],55:[2,47],56:[2,47],58:[2,47]},{20:[1,80]},{20:[2,55],33:[1,81]},{20:[1,82]},{20:[1,83]},{1:[2,44],6:[2,44],8:[2,44],13:[2,44],19:[2,44],22:[2,44],24:[2,44],25:[2,44],26:[2,44],27:[2,44],28:[2,44],29:[2,44],30:[2,44],33:[2,44],46:[2,44],47:[2,44],49:[2,44],51:[2,44],53:[2,44],54:[2,44],55:[2,44],56:[2,44],58:[2,44]},{6:[2,13],8:[2,13],13:[2,13],19:[2,13],20:[2,13],22:[2,13],23:[2,13],24:[2,13],25:[2,13],26:[2,13],27:[2,13],28:[2,13],29:[2,13],30:[2,13],33:[2,13],56:[2,13]},{6:[2,8],8:[2,8],13:[2,8],19:[2,8],20:[2,8],22:[2,8],23:[2,8],24:[2,8],25:[2,8],26:[2,8],27:[2,8],28:[2,8],29:[2,8],30:[2,8],33:[2,8],56:[2,8]},{6:[2,9],8:[2,9],13:[2,9],19:[2,9],20:[2,9],22:[2,9],23:[2,9],24:[2,9],25:[2,9],26:[2,9],27:[2,9],28:[2,9],29:[2,9],30:[2,9],33:[2,9],56:[2,9]},{6:[2,10],8:[2,10],13:[2,10],19:[2,10],20:[2,10],22:[2,10],23:[2,10],24:[2,10],25:[2,10],26:[2,10],27:[2,10],28:[2,10],29:[2,10],30:[2,10],33:[2,10],56:[2,10]},{6:[2,11],8:[2,11],13:[2,11],19:[2,11],20:[2,11],22:[2,11],23:[2,11],24:[2,11],25:[2,11],26:[2,11],27:[2,11],28:[2,11],29:[2,11],30:[2,11],33:[2,11],56:[2,11]},{6:[2,12],8:[2,12],13:[2,12],16:50,17:84,19:[2,12],22:[2,12],24:[2,12],25:[2,12],26:[2,12],27:[2,12],28:[2,12],29:[2,12],30:[2,12],56:[2,12]},{1:[2,46],6:[2,46],8:[2,46],13:[2,46],19:[2,46],22:[2,46],24:[2,46],25:[2,46],26:[2,46],27:[2,46],28:[2,46],29:[2,46],30:[2,46],33:[2,46],46:[2,46],47:[2,46],49:[2,46],51:[2,46],53:[2,46],54:[2,46],55:[2,46],56:[2,46],58:[2,46]},{1:[2,45],6:[2,45],8:[2,45],13:[2,45],19:[2,45],22:[2,45],24:[2,45],25:[2,45],26:[2,45],27:[2,45],28:[2,45],29:[2,45],30:[2,45],33:[2,45],46:[2,45],47:[2,45],49:[2,45],51:[2,45],53:[2,45],54:[2,45],55:[2,45],56:[2,45],58:[2,45]},{20:[2,63],29:[1,88],57:85,59:86,60:87},{6:[2,15],8:[2,15],13:[2,15],19:[2,15],20:[2,15],22:[2,15],23:[2,15],24:[2,15],25:[2,15],26:[2,15],27:[2,15],28:[2,15],29:[2,15],30:[2,15],33:[2,15],56:[2,15]},{6:[2,16],8:[2,16],13:[2,16],19:[2,16],20:[2,16],22:[2,16],23:[2,16],24:[2,16],25:[2,16],26:[2,16],27:[2,16],28:[2,16],29:[2,16],30:[2,16],33:[2,16],56:[2,16]},{6:[2,3],8:[2,3],13:[2,3],19:[2,3],20:[2,3],22:[2,3],23:[2,3],24:[2,3],25:[2,3],26:[2,3],27:[2,3],28:[2,3],29:[2,3],30:[2,3],33:[2,3],56:[2,3]},{6:[2,7],8:[2,7],10:[2,7]},{6:[2,4],8:[2,4],13:[2,4],19:[2,4],20:[2,4],22:[2,4],23:[2,4],24:[2,4],25:[2,4],26:[2,4],27:[2,4],28:[2,4],29:[2,4],30:[2,4],33:[2,4],56:[2,4]},{3:32,4:36,5:37,6:[1,40],8:[1,41],12:25,13:[1,27],15:16,18:33,19:[1,38],21:34,22:[1,39],24:[1,14],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],31:15,32:5,33:[2,26],35:89,36:4,37:6,38:7,39:8,40:9,41:10,42:11,43:12,44:13,45:21,46:[1,22],47:[1,24],49:[1,23],51:[1,17],53:[1,18],54:[1,19],56:[1,26],58:[1,20]},{3:32,4:36,5:37,6:[1,40],8:[1,41],12:25,18:33,19:[1,38],21:34,22:[1,39],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],31:90,33:[2,26]},{3:32,4:36,5:37,6:[1,40],8:[1,41],12:25,13:[1,27],15:16,18:33,19:[1,38],21:34,22:[1,39],24:[1,14],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],31:15,32:5,33:[2,26],35:91,36:4,37:6,38:7,39:8,40:9,41:10,42:11,43:12,44:13,45:21,46:[1,22],47:[1,24],49:[1,23],51:[1,17],53:[1,18],54:[1,19],56:[1,26],58:[1,20]},{3:32,4:36,5:37,6:[1,40],8:[1,41],12:25,13:[1,27],15:16,18:33,19:[1,38],21:34,22:[1,39],24:[1,14],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],31:15,32:5,33:[2,26],35:92,36:4,37:6,38:7,39:8,40:9,41:10,42:11,43:12,44:13,45:21,46:[1,22],47:[1,24],49:[1,23],51:[1,17],53:[1,18],54:[1,19],56:[1,26],58:[1,20]},{25:[1,93]},{20:[1,94]},{20:[2,64],27:[1,95]},{20:[2,60],27:[2,60]},{20:[2,62],27:[2,62]},{1:[2,50],6:[2,50],8:[2,50],13:[2,50],19:[2,50],22:[2,50],24:[2,50],25:[2,50],26:[2,50],27:[2,50],28:[2,50],29:[2,50],30:[2,50],33:[2,50],46:[2,50],47:[2,50],49:[2,50],51:[2,50],53:[2,50],54:[2,50],55:[2,50],56:[2,50],58:[2,50]},{33:[1,96]},{1:[2,51],6:[2,51],8:[2,51],13:[2,51],19:[2,51],22:[2,51],24:[2,51],25:[2,51],26:[2,51],27:[2,51],28:[2,51],29:[2,51],30:[2,51],33:[2,51],46:[2,51],47:[2,51],49:[2,51],51:[2,51],53:[2,51],54:[2,51],55:[2,51],56:[2,51],58:[2,51]},{1:[2,52],6:[2,52],8:[2,52],13:[2,52],19:[2,52],22:[2,52],24:[2,52],25:[2,52],26:[2,52],27:[2,52],28:[2,52],29:[2,52],30:[2,52],33:[2,52],46:[2,52],47:[2,52],49:[2,52],51:[2,52],53:[2,52],54:[2,52],55:[1,97],56:[2,52],58:[2,52]},{6:[2,17],8:[2,17],13:[2,17],19:[2,17],20:[2,17],22:[2,17],23:[2,17],24:[2,17],25:[2,17],26:[2,17],27:[2,17],28:[2,17],29:[2,17],30:[2,17],33:[2,17],56:[2,17]},{24:[1,14],36:98},{29:[1,88],60:99},{3:32,4:36,5:37,6:[1,40],8:[1,41],12:25,18:33,19:[1,38],20:[2,26],21:34,22:[1,39],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],31:100},{3:32,4:36,5:37,6:[1,40],8:[1,41],12:25,13:[1,27],15:16,18:33,19:[1,38],21:34,22:[1,39],24:[1,14],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],31:15,32:5,33:[2,26],35:101,36:4,37:6,38:7,39:8,40:9,41:10,42:11,43:12,44:13,45:21,46:[1,22],47:[1,24],49:[1,23],51:[1,17],53:[1,18],54:[1,19],56:[1,26],58:[1,20]},{1:[2,56],6:[2,56],8:[2,56],13:[2,56],19:[2,56],20:[2,56],22:[2,56],23:[2,56],24:[2,56],25:[2,56],26:[2,56],27:[2,56],28:[2,56],29:[2,56],30:[2,56],33:[2,56],46:[2,56],47:[2,56],49:[2,56],51:[2,56],53:[2,56],54:[2,56],55:[2,56],56:[2,56],58:[2,56]},{20:[2,61],27:[2,61]},{20:[2,54]},{1:[2,53],6:[2,53],8:[2,53],13:[2,53],19:[2,53],22:[2,53],24:[2,53],25:[2,53],26:[2,53],27:[2,53],28:[2,53],29:[2,53],30:[2,53],33:[2,53],46:[2,53],47:[2,53],49:[2,53],51:[2,53],53:[2,53],54:[2,53],55:[2,53],56:[2,53],58:[2,53]}],
defaultActions: {100:[2,54]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this,
        stack = [0],
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    //this.reductionCount = this.shiftCount = 0;

    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    if (typeof this.lexer.yylloc == 'undefined')
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);

    if (typeof this.yy.parseError === 'function')
        this.parseError = this.yy.parseError;

    function popStack (n) {
        stack.length = stack.length - 2*n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

    function lex() {
        var token;
        token = self.lexer.lex() || 1; // $end = 1
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    };

    var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length-1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol == null)
                symbol = lex();
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {

            if (!recovering) {
                // Report error
                expected = [];
                for (p in table[state]) if (this.terminals_[p] && p > 2) {
                    expected.push("'"+this.terminals_[p]+"'");
                }
                var errStr = '';
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+'\nExpecting '+expected.join(', ');
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == 1 /*EOF*/ ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr,
                    {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol == EOF) {
                    throw new Error(errStr || 'Parsing halted.');
                }

                // discard current lookahead and grab another
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            while (1) {
                // check for error recovery rule in this state
                if ((TERROR.toString()) in table[state]) {
                    break;
                }
                if (state == 0) {
                    throw new Error(errStr || 'Parsing halted.');
                }
                popStack(1);
                state = stack[stack.length-1];
            }

            preErrorSymbol = symbol; // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {

            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = this.lexer.yyleng;
                    yytext = this.lexer.yytext;
                    yylineno = this.lexer.yylineno;
                    yyloc = this.lexer.yylloc;
                    if (recovering > 0)
                        recovering--;
                } else { // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2: // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3: // accept
                return true;
        }

    }

    return true;
}};/* Jison generated lexer */
var lexer = (function(){var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parseError) {
            this.yy.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext+=ch;
        this.yyleng++;
        this.match+=ch;
        this.matched+=ch;
        var lines = ch.match(/\n/);
        if (lines) this.yylineno++;
        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        this._input = ch + this._input;
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            match = this._input.match(this.rules[rules[i]]);
            if (match) {
                lines = match[0].match(/\n.*/g);
                if (lines) this.yylineno += lines.length;
                this.yylloc = {first_line: this.yylloc.last_line,
                               last_line: this.yylineno+1,
                               first_column: this.yylloc.last_column,
                               last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match[0].length}
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                this._more = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, rules[i],this.conditionStack[this.conditionStack.length-1]);
                if (token) return token;
                else return;
            }
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(), 
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    }});
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:/* skip over C++-style comments */
break;
case 1:/* skip space */
break;
case 2:return 51;
break;
case 3:return 53; 
break;
case 4:return 49;
break;
case 5:return 47;
break;
case 6:return 46;
break;
case 7:return 'DO';
break;
case 8:return 54;
break;
case 9:return 55;
break;
case 10:return 'TRY';
break;
case 11:return 'CATCH';
break;
case 12:return 58;
break;
case 13:return 56;
break;
case 14:return 30;
break;
case 15:return 'FINALLY';
break;
case 16:return 'CASE';
break;
case 17:return 'SWITCH';
break;
case 18:return 'DEFAULT';
break;
case 19: 
                                   yy_.yytext = yy_.yytext.replace (/[\s:]/g, ""); 
				   return 13; 
                              
break;
case 20: return 29; 
break;
case 21:return 24;
break;
case 22:return 25;
break;
case 23:return 19;
break;
case 24:return 20;
break;
case 25:return 22;
break;
case 26:return 23;
break;
case 27:return "SEMICOLON";
break;
case 28:return 27;
break;
case 29:return 28;
break;
case 30: this.begin ('ST_QUOTE2'); return 8; 
break;
case 31: this.begin ('ST_QUOTE1'); return 6; 
break;
case 32: this.begin ('ST_COMMENT'); 
break;
case 33:return 26;
break;
case 34:return 26;
break;
case 35:return 10;
break;
case 36:return 10;
break;
case 37: this.popState (); return "QUOTE2"; 
break;
case 38:return 'ENDOFFILE';
break;
case 39:return 10;
break;
case 40:return 10;
break;
case 41: this.popState (); return "QUOTE1"; 
break;
case 42:return 'ENDOFFILE';
break;
case 43: this.popState(); 
break;
case 44:/* ignore */
break;
case 45:/* ignore */
break;
case 46:return 'ENDOFFILE';
break;
}
};
lexer.rules = [/^\/\/.*/,/^\s+/,/^for\b/,/^while\b/,/^break\b/,/^continue\b/,/^return\b/,/^do\b/,/^if\b/,/^else\b/,/^try\b/,/^catch\b/,/^twait\b/,/^function\b/,/^mkevent\b/,/^finally\b/,/^case\b/,/^switch\b/,/^default\b/,/^[a-zA-Z_][a-zA-Z_0-9]*[ ^]*[:]/,/^[a-zA-Z_][a-zA-Z_0-9]*/,/^\{/,/^\}/,/^\(/,/^\)/,/^\[/,/^\]/,/^;/,/^,/,/^:/,/^"/,/^\\'/,/^\/\*/,/^[^/bcdefimrstw{}()\[\];,:"'\s]+/,/^./,/^\\./,/^[^\\"]+/,/^"/,/^$/,/^\\./,/^[^\\']+/,/^'/,/^$/,/^\*\//,/^\*/,/^[^*]+/,/^$/];
lexer.conditions = {"ST_QUOTE2":{"rules":[35,36,37,38],"inclusive":true},"ST_QUOTE1":{"rules":[39,40,41,42],"inclusive":true},"ST_COMMENT":{"rules":[43,44,45,46],"inclusive":true},"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34],"inclusive":true}};return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); }
exports.main = function commonjsMain(args) {
    if (!args[1])
        throw new Error('Usage: '+args[0]+' FILE');
    if (typeof process !== 'undefined') {
        var source = require('fs').readFileSync(require('path').join(process.cwd(), args[1]), "utf8");
    } else {
        var cwd = require("file").path(require("file").cwd());
        var source = cwd.join(args[1]).read({charset: "utf-8"});
    }
    return exports.parser.parse(source);
}
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
}