/* Jison generated parser */
var parser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"String":3,"String1":4,"String2":5,"QUOTE1":6,"StringAtoms":7,"QUOTE2":8,"StringAtom":9,"STRING_ATOM":10,"InnerExprAtom":11,"OuterExprAtom":12,"LABEL":13,"BraceExpr":14,"InnerExprAtomList":15,"InnerExpr":16,"ParenExpr":17,"LPAREN":18,"RPAREN":19,"BracketExpr":20,"LBRACKET":21,"RBRACKET":22,"LBRACE":23,"RBRACE":24,"GENERIC":25,"COMMA":26,"COLON":27,"ID":28,"Expr":29,"ExprStatement":30,"SEMICOLON":31,"FunctionDeclaration":32,"Statement":33,"Block":34,"ForStatement":35,"WhileStatement":36,"IfStatement":37,"TwaitStatement":38,"LabeledStatement":39,"ReturnStatement":40,"RETURN":41,"SourceElements":42,"LabelOpt":43,"FOR":44,"ForIter":45,"WHILE":46,"IF":47,"ELSE":48,"FUNCTION":49,"IdOpt":50,"ParamListOpt":51,"FunctionBody":52,"TWAIT":53,"ParamList":54,"Param":55,"Program":56,"$accept":0,"$end":1},
terminals_: {2:"error",6:"QUOTE1",8:"QUOTE2",10:"STRING_ATOM",13:"LABEL",18:"LPAREN",19:"RPAREN",21:"LBRACKET",22:"RBRACKET",23:"LBRACE",24:"RBRACE",25:"GENERIC",26:"COMMA",27:"COLON",28:"ID",31:"SEMICOLON",41:"RETURN",43:"LabelOpt",44:"FOR",46:"WHILE",47:"IF",48:"ELSE",49:"FUNCTION",53:"TWAIT"},
productions_: [0,[3,1],[3,1],[4,3],[5,3],[9,1],[7,0],[7,2],[11,1],[11,1],[11,1],[15,0],[15,2],[16,1],[17,3],[20,3],[14,3],[12,1],[12,1],[12,1],[12,1],[12,1],[12,1],[12,1],[29,0],[29,2],[30,2],[30,1],[33,1],[33,1],[33,1],[33,1],[33,1],[33,1],[33,1],[33,1],[39,2],[40,3],[34,3],[42,0],[42,2],[35,6],[36,5],[37,5],[37,7],[45,5],[45,1],[32,8],[38,2],[50,0],[50,1],[54,1],[54,3],[55,1],[51,0],[51,1],[52,1],[56,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: this.$ = $$[$0]; 
break;
case 2: this.$ = $$[$01]; 
break;
case 3: this.$ = "'" + $$[$0-1] + "'"; 
break;
case 4: this.$ = '"' + $$[$0-1] + '"' ; 
break;
case 5: this.$ = yytext; 
break;
case 6: this.$ = ""; 
break;
case 7: this.$ = $$[$0-1] + $$[$0]; 
break;
case 8: this.$ = $$[$0]; 
break;
case 9: this.$ = yytext; 
break;
case 10: this.$ = $$[$0]; 
break;
case 11: this.$ = []; 
break;
case 12: $$[$0-1].push ($$[$0]); this.$ = $$[$0-1]; 
break;
case 13: this.$ = new yy.Expr ($$[$0]); 
break;
case 14: this.$ = [ '(', $$[$0-1], ')' ]; 
break;
case 15: this.$ = [ '[', $$[$0-1], ']' ]; 
break;
case 16: this.$ = [ '{', $$[$0-1], '}' ]; 
break;
case 17: this.$ = yytext; 
break;
case 18: this.$ = yytext; 
break;
case 19: this.$ = yytext; 
break;
case 20: this.$ = yytext; 
break;
case 21: this.$ = yytext; 
break;
case 22: this.$ = $$[$0]; 
break;
case 23: this.$ = $$[$0]; 
break;
case 24: this.$ = new yy.Expr ([]); 
break;
case 25:
         $$[$0].unshift ($$[$0-1]);
	 this.$ = new yy.Expr ($$[$0]);
     
break;
case 26: $$[$0-1].addString (";"); this.$ = $$[$0-1]; 
break;
case 27: this.$ = $$[$0]; 
break;
case 36:
         $$[$0].setLabel ($$[$0-1]);
	 this.$ = $$[$0];
     
break;
case 37:
         this.$ = new yy.ReturnStatement($$[$0-1]);
     
break;
case 38: this.$ = new yy.Block ($$[$0-1]); 
break;
case 39: this.$ = []; 
break;
case 40: $$[$0-1].push ($$[$0]); this.$ = $$[$0-1]; 
break;
case 41:
        this.$ = new yy.ForStatement ($$[$0-3], $$[$0-1]);
     
break;
case 42:
        this.$ = new yy.WhileStatement ($$[$0-2], $$[$0]);
     
break;
case 43:
        this.$ = new yy.IfElseStatement ($$[$0-2], $$[$0], null);
     
break;
case 44:
        this.$ = new yy.IfElseStatement ($$[$0-4], $$[$0-2], $$[$0]);
     
break;
case 45:
         this.$ = new yy.ForIterClassic ($$[$0-4], $$[$0-3], $);
     
break;
case 46:
         this.$ = new yy.ForIterIterator ($$[$0]); 
     
break;
case 47:
         this.$ = new yy.FunctionDeclaration ($$[$0-6], $$[$0-4], $$[$0-1]);
     
break;
case 48:
        this.$ = new yy.TwaitStatement ($$[$0]);
     
break;
case 50: this.$ = yytext; 
break;
case 51: this.$ = [ $$[$0] ]; 
break;
case 52: $$[$0-2].push ($$[$0]); this.$ = $$[$0-2]; 
break;
case 53: this.$ = yytext; 
break;
case 54: this.$ = []; 
break;
case 57: yy.output = new yy.Program ($$[$0]); 
break;
}
},
table: [{1:[2,39],6:[2,39],8:[2,39],13:[2,39],18:[2,39],21:[2,39],23:[2,39],25:[2,39],26:[2,39],27:[2,39],28:[2,39],31:[2,39],41:[2,39],42:2,43:[2,39],46:[2,39],47:[2,39],49:[2,39],53:[2,39],56:1},{1:[3]},{1:[2,57],3:27,4:30,5:31,6:[1,34],8:[1,35],12:21,13:[1,19],17:28,18:[1,32],20:29,21:[1,33],23:[1,12],25:[1,23],26:[1,24],27:[1,25],28:[1,26],29:13,30:5,31:[2,24],32:14,33:3,34:4,35:6,36:7,37:8,38:9,39:10,40:11,41:[1,20],43:[1,15],46:[1,16],47:[1,17],49:[1,22],53:[1,18]},{1:[2,40],6:[2,40],8:[2,40],13:[2,40],18:[2,40],21:[2,40],23:[2,40],24:[2,40],25:[2,40],26:[2,40],27:[2,40],28:[2,40],31:[2,40],41:[2,40],43:[2,40],46:[2,40],47:[2,40],49:[2,40],53:[2,40]},{1:[2,28],6:[2,28],8:[2,28],13:[2,28],18:[2,28],21:[2,28],23:[2,28],24:[2,28],25:[2,28],26:[2,28],27:[2,28],28:[2,28],31:[2,28],41:[2,28],43:[2,28],46:[2,28],47:[2,28],48:[2,28],49:[2,28],53:[2,28]},{1:[2,29],6:[2,29],8:[2,29],13:[2,29],18:[2,29],21:[2,29],23:[2,29],24:[2,29],25:[2,29],26:[2,29],27:[2,29],28:[2,29],31:[2,29],41:[2,29],43:[2,29],46:[2,29],47:[2,29],48:[2,29],49:[2,29],53:[2,29]},{1:[2,30],6:[2,30],8:[2,30],13:[2,30],18:[2,30],21:[2,30],23:[2,30],24:[2,30],25:[2,30],26:[2,30],27:[2,30],28:[2,30],31:[2,30],41:[2,30],43:[2,30],46:[2,30],47:[2,30],48:[2,30],49:[2,30],53:[2,30]},{1:[2,31],6:[2,31],8:[2,31],13:[2,31],18:[2,31],21:[2,31],23:[2,31],24:[2,31],25:[2,31],26:[2,31],27:[2,31],28:[2,31],31:[2,31],41:[2,31],43:[2,31],46:[2,31],47:[2,31],48:[2,31],49:[2,31],53:[2,31]},{1:[2,32],6:[2,32],8:[2,32],13:[2,32],18:[2,32],21:[2,32],23:[2,32],24:[2,32],25:[2,32],26:[2,32],27:[2,32],28:[2,32],31:[2,32],41:[2,32],43:[2,32],46:[2,32],47:[2,32],48:[2,32],49:[2,32],53:[2,32]},{1:[2,33],6:[2,33],8:[2,33],13:[2,33],18:[2,33],21:[2,33],23:[2,33],24:[2,33],25:[2,33],26:[2,33],27:[2,33],28:[2,33],31:[2,33],41:[2,33],43:[2,33],46:[2,33],47:[2,33],48:[2,33],49:[2,33],53:[2,33]},{1:[2,34],6:[2,34],8:[2,34],13:[2,34],18:[2,34],21:[2,34],23:[2,34],24:[2,34],25:[2,34],26:[2,34],27:[2,34],28:[2,34],31:[2,34],41:[2,34],43:[2,34],46:[2,34],47:[2,34],48:[2,34],49:[2,34],53:[2,34]},{1:[2,35],6:[2,35],8:[2,35],13:[2,35],18:[2,35],21:[2,35],23:[2,35],24:[2,35],25:[2,35],26:[2,35],27:[2,35],28:[2,35],31:[2,35],41:[2,35],43:[2,35],46:[2,35],47:[2,35],48:[2,35],49:[2,35],53:[2,35]},{6:[2,39],8:[2,39],13:[2,39],18:[2,39],21:[2,39],23:[2,39],24:[2,39],25:[2,39],26:[2,39],27:[2,39],28:[2,39],31:[2,39],41:[2,39],42:36,43:[2,39],46:[2,39],47:[2,39],49:[2,39],53:[2,39]},{31:[1,37]},{1:[2,27],6:[2,27],8:[2,27],13:[2,27],18:[2,27],21:[2,27],23:[2,27],24:[2,27],25:[2,27],26:[2,27],27:[2,27],28:[2,27],31:[2,27],41:[2,27],43:[2,27],46:[2,27],47:[2,27],48:[2,27],49:[2,27],53:[2,27]},{44:[1,38]},{18:[1,39]},{18:[1,40]},{3:27,4:30,5:31,6:[1,34],8:[1,35],12:21,13:[1,19],17:28,18:[1,32],20:29,21:[1,33],23:[1,12],25:[1,23],26:[1,24],27:[1,25],28:[1,26],29:13,30:5,31:[2,24],32:14,33:41,34:4,35:6,36:7,37:8,38:9,39:10,40:11,41:[1,20],43:[1,15],46:[1,16],47:[1,17],49:[1,22],53:[1,18]},{3:27,4:30,5:31,6:[1,34],8:[1,35],12:21,13:[1,19],17:28,18:[1,32],20:29,21:[1,33],23:[1,12],25:[1,23],26:[1,24],27:[1,25],28:[1,26],29:13,30:5,31:[2,24],32:14,33:42,34:4,35:6,36:7,37:8,38:9,39:10,40:11,41:[1,20],43:[1,15],46:[1,16],47:[1,17],49:[1,22],53:[1,18]},{6:[2,11],8:[2,11],13:[2,11],15:44,16:43,18:[2,11],21:[2,11],23:[2,11],25:[2,11],26:[2,11],27:[2,11],28:[2,11],31:[2,11]},{6:[2,11],8:[2,11],13:[2,11],15:45,18:[2,11],19:[2,11],21:[2,11],23:[2,11],25:[2,11],26:[2,11],27:[2,11],28:[2,11],31:[2,11]},{18:[2,49],28:[1,47],50:46},{6:[2,17],8:[2,17],13:[2,17],18:[2,17],19:[2,17],21:[2,17],22:[2,17],23:[2,17],24:[2,17],25:[2,17],26:[2,17],27:[2,17],28:[2,17],31:[2,17]},{6:[2,18],8:[2,18],13:[2,18],18:[2,18],19:[2,18],21:[2,18],22:[2,18],23:[2,18],24:[2,18],25:[2,18],26:[2,18],27:[2,18],28:[2,18],31:[2,18]},{6:[2,19],8:[2,19],13:[2,19],18:[2,19],19:[2,19],21:[2,19],22:[2,19],23:[2,19],24:[2,19],25:[2,19],26:[2,19],27:[2,19],28:[2,19],31:[2,19]},{6:[2,20],8:[2,20],13:[2,20],18:[2,20],19:[2,20],21:[2,20],22:[2,20],23:[2,20],24:[2,20],25:[2,20],26:[2,20],27:[2,20],28:[2,20],31:[2,20]},{6:[2,21],8:[2,21],13:[2,21],18:[2,21],19:[2,21],21:[2,21],22:[2,21],23:[2,21],24:[2,21],25:[2,21],26:[2,21],27:[2,21],28:[2,21],31:[2,21]},{6:[2,22],8:[2,22],13:[2,22],18:[2,22],19:[2,22],21:[2,22],22:[2,22],23:[2,22],24:[2,22],25:[2,22],26:[2,22],27:[2,22],28:[2,22],31:[2,22]},{6:[2,23],8:[2,23],13:[2,23],18:[2,23],19:[2,23],21:[2,23],22:[2,23],23:[2,23],24:[2,23],25:[2,23],26:[2,23],27:[2,23],28:[2,23],31:[2,23]},{6:[2,1],8:[2,1],13:[2,1],18:[2,1],19:[2,1],21:[2,1],22:[2,1],23:[2,1],24:[2,1],25:[2,1],26:[2,1],27:[2,1],28:[2,1],31:[2,1]},{6:[2,2],8:[2,2],13:[2,2],18:[2,2],19:[2,2],21:[2,2],22:[2,2],23:[2,2],24:[2,2],25:[2,2],26:[2,2],27:[2,2],28:[2,2],31:[2,2]},{6:[2,11],8:[2,11],13:[2,11],15:44,16:48,18:[2,11],19:[2,11],21:[2,11],23:[2,11],25:[2,11],26:[2,11],27:[2,11],28:[2,11]},{6:[2,11],8:[2,11],13:[2,11],15:44,16:49,18:[2,11],21:[2,11],22:[2,11],23:[2,11],25:[2,11],26:[2,11],27:[2,11],28:[2,11]},{6:[2,6],7:50,10:[2,6]},{7:51,8:[2,6],10:[2,6]},{3:27,4:30,5:31,6:[1,34],8:[1,35],12:21,13:[1,19],17:28,18:[1,32],20:29,21:[1,33],23:[1,12],24:[1,52],25:[1,23],26:[1,24],27:[1,25],28:[1,26],29:13,30:5,31:[2,24],32:14,33:3,34:4,35:6,36:7,37:8,38:9,39:10,40:11,41:[1,20],43:[1,15],46:[1,16],47:[1,17],49:[1,22],53:[1,18]},{1:[2,26],6:[2,26],8:[2,26],13:[2,26],18:[2,26],21:[2,26],23:[2,26],24:[2,26],25:[2,26],26:[2,26],27:[2,26],28:[2,26],31:[2,26],41:[2,26],43:[2,26],46:[2,26],47:[2,26],48:[2,26],49:[2,26],53:[2,26]},{18:[1,53]},{3:27,4:30,5:31,6:[1,34],8:[1,35],12:21,17:28,18:[1,32],19:[2,24],20:29,21:[1,33],25:[1,23],26:[1,24],27:[1,25],28:[1,26],29:54},{3:27,4:30,5:31,6:[1,34],8:[1,35],12:21,17:28,18:[1,32],19:[2,24],20:29,21:[1,33],25:[1,23],26:[1,24],27:[1,25],28:[1,26],29:55},{1:[2,48],6:[2,48],8:[2,48],13:[2,48],18:[2,48],21:[2,48],23:[2,48],24:[2,48],25:[2,48],26:[2,48],27:[2,48],28:[2,48],31:[2,48],41:[2,48],43:[2,48],46:[2,48],47:[2,48],48:[2,48],49:[2,48],53:[2,48]},{1:[2,36],6:[2,36],8:[2,36],13:[2,36],18:[2,36],21:[2,36],23:[2,36],24:[2,36],25:[2,36],26:[2,36],27:[2,36],28:[2,36],31:[2,36],41:[2,36],43:[2,36],46:[2,36],47:[2,36],48:[2,36],49:[2,36],53:[2,36]},{31:[1,56]},{3:27,4:30,5:31,6:[1,34],8:[1,35],11:57,12:58,13:[1,59],14:60,17:28,18:[1,32],19:[2,13],20:29,21:[1,33],22:[2,13],23:[1,61],24:[2,13],25:[1,23],26:[1,24],27:[1,25],28:[1,26],31:[2,13]},{3:27,4:30,5:31,6:[1,34],8:[1,35],11:57,12:58,13:[1,59],14:60,17:28,18:[1,32],19:[2,25],20:29,21:[1,33],23:[1,61],25:[1,23],26:[1,24],27:[1,25],28:[1,26],31:[2,25]},{18:[1,62]},{18:[2,50]},{19:[1,63]},{22:[1,64]},{6:[1,65],10:[1,66]},{8:[1,67],10:[1,66]},{1:[2,38],6:[2,38],8:[2,38],13:[2,38],18:[2,38],21:[2,38],23:[2,38],24:[2,38],25:[2,38],26:[2,38],27:[2,38],28:[2,38],31:[2,38],41:[2,38],43:[2,38],46:[2,38],47:[2,38],48:[2,38],49:[2,38],53:[2,38]},{3:27,4:30,5:31,6:[1,34],8:[1,35],12:21,17:28,18:[1,32],19:[2,24],20:29,21:[1,33],25:[1,23],26:[1,24],27:[1,25],28:[1,26],29:69,31:[2,24],45:68},{19:[1,70]},{19:[1,71]},{1:[2,37],6:[2,37],8:[2,37],13:[2,37],18:[2,37],21:[2,37],23:[2,37],24:[2,37],25:[2,37],26:[2,37],27:[2,37],28:[2,37],31:[2,37],41:[2,37],43:[2,37],46:[2,37],47:[2,37],48:[2,37],49:[2,37],53:[2,37]},{6:[2,12],8:[2,12],13:[2,12],18:[2,12],19:[2,12],21:[2,12],22:[2,12],23:[2,12],24:[2,12],25:[2,12],26:[2,12],27:[2,12],28:[2,12],31:[2,12]},{6:[2,8],8:[2,8],13:[2,8],18:[2,8],19:[2,8],21:[2,8],22:[2,8],23:[2,8],24:[2,8],25:[2,8],26:[2,8],27:[2,8],28:[2,8],31:[2,8]},{6:[2,9],8:[2,9],13:[2,9],18:[2,9],19:[2,9],21:[2,9],22:[2,9],23:[2,9],24:[2,9],25:[2,9],26:[2,9],27:[2,9],28:[2,9],31:[2,9]},{6:[2,10],8:[2,10],13:[2,10],18:[2,10],19:[2,10],21:[2,10],22:[2,10],23:[2,10],24:[2,10],25:[2,10],26:[2,10],27:[2,10],28:[2,10],31:[2,10]},{6:[2,11],8:[2,11],13:[2,11],15:44,16:72,18:[2,11],21:[2,11],23:[2,11],24:[2,11],25:[2,11],26:[2,11],27:[2,11],28:[2,11]},{19:[2,54],28:[1,76],51:73,54:74,55:75},{6:[2,14],8:[2,14],13:[2,14],18:[2,14],19:[2,14],21:[2,14],22:[2,14],23:[2,14],24:[2,14],25:[2,14],26:[2,14],27:[2,14],28:[2,14],31:[2,14]},{6:[2,15],8:[2,15],13:[2,15],18:[2,15],19:[2,15],21:[2,15],22:[2,15],23:[2,15],24:[2,15],25:[2,15],26:[2,15],27:[2,15],28:[2,15],31:[2,15]},{6:[2,3],8:[2,3],13:[2,3],18:[2,3],19:[2,3],21:[2,3],22:[2,3],23:[2,3],24:[2,3],25:[2,3],26:[2,3],27:[2,3],28:[2,3],31:[2,3]},{6:[2,7],8:[2,7],10:[2,7]},{6:[2,4],8:[2,4],13:[2,4],18:[2,4],19:[2,4],21:[2,4],22:[2,4],23:[2,4],24:[2,4],25:[2,4],26:[2,4],27:[2,4],28:[2,4],31:[2,4]},{19:[1,77]},{19:[2,46],31:[1,78]},{3:27,4:30,5:31,6:[1,34],8:[1,35],12:21,13:[1,19],17:28,18:[1,32],20:29,21:[1,33],23:[1,12],25:[1,23],26:[1,24],27:[1,25],28:[1,26],29:13,30:5,31:[2,24],32:14,33:79,34:4,35:6,36:7,37:8,38:9,39:10,40:11,41:[1,20],43:[1,15],46:[1,16],47:[1,17],49:[1,22],53:[1,18]},{3:27,4:30,5:31,6:[1,34],8:[1,35],12:21,13:[1,19],17:28,18:[1,32],20:29,21:[1,33],23:[1,12],25:[1,23],26:[1,24],27:[1,25],28:[1,26],29:13,30:5,31:[2,24],32:14,33:80,34:4,35:6,36:7,37:8,38:9,39:10,40:11,41:[1,20],43:[1,15],46:[1,16],47:[1,17],49:[1,22],53:[1,18]},{24:[1,81]},{19:[1,82]},{19:[2,55],26:[1,83]},{19:[2,51],26:[2,51]},{19:[2,53],26:[2,53]},{3:27,4:30,5:31,6:[1,34],8:[1,35],12:21,13:[1,19],17:28,18:[1,32],20:29,21:[1,33],23:[1,12],25:[1,23],26:[1,24],27:[1,25],28:[1,26],29:13,30:5,31:[2,24],32:14,33:84,34:4,35:6,36:7,37:8,38:9,39:10,40:11,41:[1,20],43:[1,15],46:[1,16],47:[1,17],49:[1,22],53:[1,18]},{3:27,4:30,5:31,6:[1,34],8:[1,35],12:21,17:28,18:[1,32],20:29,21:[1,33],25:[1,23],26:[1,24],27:[1,25],28:[1,26],29:85,31:[2,24]},{1:[2,42],6:[2,42],8:[2,42],13:[2,42],18:[2,42],21:[2,42],23:[2,42],24:[2,42],25:[2,42],26:[2,42],27:[2,42],28:[2,42],31:[2,42],41:[2,42],43:[2,42],46:[2,42],47:[2,42],48:[2,42],49:[2,42],53:[2,42]},{1:[2,43],6:[2,43],8:[2,43],13:[2,43],18:[2,43],21:[2,43],23:[2,43],24:[2,43],25:[2,43],26:[2,43],27:[2,43],28:[2,43],31:[2,43],41:[2,43],43:[2,43],46:[2,43],47:[2,43],48:[1,86],49:[2,43],53:[2,43]},{6:[2,16],8:[2,16],13:[2,16],18:[2,16],19:[2,16],21:[2,16],22:[2,16],23:[2,16],24:[2,16],25:[2,16],26:[2,16],27:[2,16],28:[2,16],31:[2,16]},{23:[1,87]},{28:[1,76],55:88},{1:[2,41],6:[2,41],8:[2,41],13:[2,41],18:[2,41],21:[2,41],23:[2,41],24:[2,41],25:[2,41],26:[2,41],27:[2,41],28:[2,41],31:[2,41],41:[2,41],43:[2,41],46:[2,41],47:[2,41],48:[2,41],49:[2,41],53:[2,41]},{31:[1,89]},{3:27,4:30,5:31,6:[1,34],8:[1,35],12:21,13:[1,19],17:28,18:[1,32],20:29,21:[1,33],23:[1,12],25:[1,23],26:[1,24],27:[1,25],28:[1,26],29:13,30:5,31:[2,24],32:14,33:90,34:4,35:6,36:7,37:8,38:9,39:10,40:11,41:[1,20],43:[1,15],46:[1,16],47:[1,17],49:[1,22],53:[1,18]},{6:[2,39],8:[2,39],13:[2,39],18:[2,39],21:[2,39],23:[2,39],24:[2,39],25:[2,39],26:[2,39],27:[2,39],28:[2,39],31:[2,39],41:[2,39],42:92,43:[2,39],46:[2,39],47:[2,39],49:[2,39],52:91,53:[2,39]},{19:[2,52],26:[2,52]},{3:27,4:30,5:31,6:[1,34],8:[1,35],12:21,17:28,18:[1,32],19:[2,24],20:29,21:[1,33],25:[1,23],26:[1,24],27:[1,25],28:[1,26],29:93},{1:[2,44],6:[2,44],8:[2,44],13:[2,44],18:[2,44],21:[2,44],23:[2,44],24:[2,44],25:[2,44],26:[2,44],27:[2,44],28:[2,44],31:[2,44],41:[2,44],43:[2,44],46:[2,44],47:[2,44],48:[2,44],49:[2,44],53:[2,44]},{24:[1,94]},{3:27,4:30,5:31,6:[1,34],8:[1,35],12:21,13:[1,19],17:28,18:[1,32],20:29,21:[1,33],23:[1,12],24:[2,56],25:[1,23],26:[1,24],27:[1,25],28:[1,26],29:13,30:5,31:[2,24],32:14,33:3,34:4,35:6,36:7,37:8,38:9,39:10,40:11,41:[1,20],43:[1,15],46:[1,16],47:[1,17],49:[1,22],53:[1,18]},{19:[2,45]},{1:[2,47],6:[2,47],8:[2,47],13:[2,47],18:[2,47],21:[2,47],23:[2,47],24:[2,47],25:[2,47],26:[2,47],27:[2,47],28:[2,47],31:[2,47],41:[2,47],43:[2,47],46:[2,47],47:[2,47],48:[2,47],49:[2,47],53:[2,47]}],
defaultActions: {47:[2,50],93:[2,45]},
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
case 2: this.begin ('ST_EXPR_0'); return 44; 
break;
case 3: this.begin ('ST_EXPR_0'); return 46; 
break;
case 4:return 'BREAK';
break;
case 5:return 'CONTINUE';
break;
case 6:return 41;
break;
case 7:return 'DO';
break;
case 8:return 47;
break;
case 9:return 48;
break;
case 10:return 'TRY';
break;
case 11:return 'CATCH';
break;
case 12:return 53;
break;
case 13:return 49;
break;
case 14:return 'MKEV';
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
case 20: return 28; 
break;
case 21:return 23;
break;
case 22:return 24;
break;
case 23:return 18;
break;
case 24:return 19;
break;
case 25:return 21;
break;
case 26:return 22;
break;
case 27:return "SEMICOLON";
break;
case 28:return 26;
break;
case 29:return 27;
break;
case 30: this.begin ('ST_QUOTE2'); return 8; 
break;
case 31: this.begin ('ST_QUOTE1'); return 6; 
break;
case 32: this.begin ('ST_COMMENT'); 
break;
case 33:return 25;
break;
case 34:return 25;
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
lexer.rules = [/^\/\/.*/,/^\s+/,/^for\b/,/^while\b/,/^break\b/,/^continue\b/,/^return\b/,/^do\b/,/^if\b/,/^else\b/,/^try\b/,/^catch\b/,/^twait\b/,/^function\b/,/^mkev\b/,/^finally\b/,/^case\b/,/^switch\b/,/^default\b/,/^[a-zA-Z_][a-zA-Z_0-9]*[ ^]*[:]/,/^[a-zA-Z_][a-zA-Z_0-9]*/,/^\{/,/^\}/,/^\(/,/^\)/,/^\[/,/^\]/,/^;/,/^,/,/^:/,/^"/,/^\\'/,/^\/\*/,/^[^/bcdefimrstw{}()\[\];,:"'\s]+/,/^./,/^\\./,/^[^\\"]+/,/^"/,/^$/,/^\\./,/^[^\\']+/,/^'/,/^$/,/^\*\//,/^\*/,/^[^*]+/,/^$/];
lexer.conditions = {"ST_QUOTE2":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38],"inclusive":true},"ST_QUOTE1":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,39,40,41,42],"inclusive":true},"ST_COMMENT":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,43,44,45,46],"inclusive":true},"ST_EXPR_0":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34],"inclusive":true},"ST_EXPR_1":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34],"inclusive":true},"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34],"inclusive":true}};return lexer;})()
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