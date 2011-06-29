/* Jison generated parser */
var parser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"String":3,"String1":4,"String2":5,"QUOTE1":6,"StringAtoms":7,"QUOTE2":8,"StringAtom":9,"STRING_ATOM":10,"InnerExprAtom":11,"OuterExprAtom":12,"LABEL":13,"BraceExpr":14,"FunctionDeclaration":15,"InnerExprAtomList":16,"InnerExpr":17,"ParenExpr":18,"LPAREN":19,"RPAREN":20,"BracketExpr":21,"LBRACKET":22,"RBRACKET":23,"LBRACE":24,"RBRACE":25,"GENERIC":26,"COMMA":27,"COLON":28,"ID":29,"MKEVENT":30,"Expr":31,"ExprStatement":32,"SEMICOLON":33,"Statement":34,"Block":35,"ForStatement":36,"WhileStatement":37,"IfStatement":38,"TwaitStatement":39,"LabeledStatement":40,"ReturnStatement":41,"BreakStatement":42,"ContinueStatement":43,"Label":44,"RETURN":45,"CONTINUE":46,"IdOpt":47,"BREAK":48,"SourceElements":49,"FOR":50,"ForIter":51,"WHILE":52,"IF":53,"ELSE":54,"FUNCTION":55,"ParamListOpt":56,"TWAIT":57,"ParamList":58,"Param":59,"FunctionBody":60,"Program":61,"$accept":0,"$end":1},
terminals_: {2:"error",6:"QUOTE1",8:"QUOTE2",10:"STRING_ATOM",13:"LABEL",19:"LPAREN",20:"RPAREN",22:"LBRACKET",23:"RBRACKET",24:"LBRACE",25:"RBRACE",26:"GENERIC",27:"COMMA",28:"COLON",29:"ID",30:"MKEVENT",33:"SEMICOLON",45:"RETURN",46:"CONTINUE",48:"BREAK",50:"FOR",52:"WHILE",53:"IF",54:"ELSE",55:"FUNCTION",57:"TWAIT"},
productions_: [0,[3,1],[3,1],[4,3],[5,3],[9,1],[7,0],[7,2],[11,1],[11,1],[11,1],[11,1],[16,0],[16,2],[17,1],[18,3],[21,3],[14,3],[12,1],[12,1],[12,1],[12,1],[12,1],[12,1],[12,1],[12,1],[31,0],[31,2],[32,2],[32,1],[34,1],[34,1],[34,1],[34,1],[34,1],[34,1],[34,1],[34,1],[34,1],[34,1],[44,1],[40,2],[41,3],[43,3],[42,3],[35,3],[49,0],[49,2],[36,5],[37,5],[38,5],[38,7],[51,5],[51,1],[15,6],[39,2],[47,0],[47,1],[58,1],[58,3],[59,1],[56,0],[56,1],[60,1],[61,1]],
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
case 29: this.$ = $$[$0]; 
break;
case 40: this.$ = new yy.Label (_$[$0].first_line, yytext); 
break;
case 41:
         $$[$0].setLabel ($$[$0-1]);
	 this.$ = $$[$0];
     
break;
case 42:
         this.$ = new yy.ReturnStatement (_$[$0-2].first_line, $$[$0-1]);
     
break;
case 43:
         this.$ = new yy.ContinueStatement (_$[$0-2].first_line, $$[$0-1]);
     
break;
case 44:
         this.$ = new yy.BreakStatement (_$[$0-2].first_line, $$[$0-1]);
     
break;
case 45: this.$ = new yy.Block (_$[$0-2].first_line, $$[$0-1]); 
break;
case 46: this.$ = []; 
break;
case 47: $$[$0-1].push ($$[$0]); this.$ = $$[$0-1]; 
break;
case 48:
        this.$ = new yy.ForStatement (_$[$0-4].first_line, $$[$0-2], $$[$0]);
     
break;
case 49:
        this.$ = new yy.WhileStatement (_$[$0-4].first_line, $$[$0-2], $$[$0]);
     
break;
case 50:
        this.$ = new yy.IfElseStatement (_$[$0-4].first_line, $$[$0-2], $$[$0], null);
     
break;
case 51:
        this.$ = new yy.IfElseStatement (_$[$0-6].first_line, $$[$0-4], $$[$0-2], $$[$0]);
     
break;
case 52:
         this.$ = new yy.ForIterClassic ($$[$0-4], $$[$0-3], $);
     
break;
case 53:
         this.$ = new yy.ForIterIterator ($$[$0]); 
     
break;
case 54:
         this.$ = new yy.FunctionDeclaration (_$[$0-5].first_line, $$[$0-4], $$[$0-2], $$[$0]);
     
break;
case 55:
        this.$ = new yy.TwaitStatement (_$[$0-1].first_line, $$[$0]);
     
break;
case 57: this.$ = yytext; 
break;
case 58: this.$ = [ $$[$0] ]; 
break;
case 59: $$[$0-2].push ($$[$0]); this.$ = $$[$0-2]; 
break;
case 60: this.$ = yytext; 
break;
case 61: this.$ = []; 
break;
case 64: yy.output = new yy.Program ($$[$0]); 
break;
}
},
table: [{1:[2,46],6:[2,46],8:[2,46],13:[2,46],19:[2,46],22:[2,46],24:[2,46],26:[2,46],27:[2,46],28:[2,46],29:[2,46],30:[2,46],33:[2,46],45:[2,46],46:[2,46],48:[2,46],49:2,50:[2,46],52:[2,46],53:[2,46],55:[2,46],57:[2,46],61:1},{1:[3]},{1:[2,64],3:32,4:36,5:37,6:[1,40],8:[1,41],12:25,13:[1,27],15:16,18:33,19:[1,38],21:34,22:[1,39],24:[1,14],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],31:15,32:5,33:[2,26],34:3,35:4,36:6,37:7,38:8,39:9,40:10,41:11,42:12,43:13,44:21,45:[1,22],46:[1,24],48:[1,23],50:[1,17],52:[1,18],53:[1,19],55:[1,26],57:[1,20]},{1:[2,47],6:[2,47],8:[2,47],13:[2,47],19:[2,47],22:[2,47],24:[2,47],25:[2,47],26:[2,47],27:[2,47],28:[2,47],29:[2,47],30:[2,47],33:[2,47],45:[2,47],46:[2,47],48:[2,47],50:[2,47],52:[2,47],53:[2,47],55:[2,47],57:[2,47]},{1:[2,30],6:[2,30],8:[2,30],13:[2,30],19:[2,30],22:[2,30],24:[2,30],25:[2,30],26:[2,30],27:[2,30],28:[2,30],29:[2,30],30:[2,30],33:[2,30],45:[2,30],46:[2,30],48:[2,30],50:[2,30],52:[2,30],53:[2,30],54:[2,30],55:[2,30],57:[2,30]},{1:[2,31],6:[2,31],8:[2,31],13:[2,31],19:[2,31],22:[2,31],24:[2,31],25:[2,31],26:[2,31],27:[2,31],28:[2,31],29:[2,31],30:[2,31],33:[2,31],45:[2,31],46:[2,31],48:[2,31],50:[2,31],52:[2,31],53:[2,31],54:[2,31],55:[2,31],57:[2,31]},{1:[2,32],6:[2,32],8:[2,32],13:[2,32],19:[2,32],22:[2,32],24:[2,32],25:[2,32],26:[2,32],27:[2,32],28:[2,32],29:[2,32],30:[2,32],33:[2,32],45:[2,32],46:[2,32],48:[2,32],50:[2,32],52:[2,32],53:[2,32],54:[2,32],55:[2,32],57:[2,32]},{1:[2,33],6:[2,33],8:[2,33],13:[2,33],19:[2,33],22:[2,33],24:[2,33],25:[2,33],26:[2,33],27:[2,33],28:[2,33],29:[2,33],30:[2,33],33:[2,33],45:[2,33],46:[2,33],48:[2,33],50:[2,33],52:[2,33],53:[2,33],54:[2,33],55:[2,33],57:[2,33]},{1:[2,34],6:[2,34],8:[2,34],13:[2,34],19:[2,34],22:[2,34],24:[2,34],25:[2,34],26:[2,34],27:[2,34],28:[2,34],29:[2,34],30:[2,34],33:[2,34],45:[2,34],46:[2,34],48:[2,34],50:[2,34],52:[2,34],53:[2,34],54:[2,34],55:[2,34],57:[2,34]},{1:[2,35],6:[2,35],8:[2,35],13:[2,35],19:[2,35],22:[2,35],24:[2,35],25:[2,35],26:[2,35],27:[2,35],28:[2,35],29:[2,35],30:[2,35],33:[2,35],45:[2,35],46:[2,35],48:[2,35],50:[2,35],52:[2,35],53:[2,35],54:[2,35],55:[2,35],57:[2,35]},{1:[2,36],6:[2,36],8:[2,36],13:[2,36],19:[2,36],22:[2,36],24:[2,36],25:[2,36],26:[2,36],27:[2,36],28:[2,36],29:[2,36],30:[2,36],33:[2,36],45:[2,36],46:[2,36],48:[2,36],50:[2,36],52:[2,36],53:[2,36],54:[2,36],55:[2,36],57:[2,36]},{1:[2,37],6:[2,37],8:[2,37],13:[2,37],19:[2,37],22:[2,37],24:[2,37],25:[2,37],26:[2,37],27:[2,37],28:[2,37],29:[2,37],30:[2,37],33:[2,37],45:[2,37],46:[2,37],48:[2,37],50:[2,37],52:[2,37],53:[2,37],54:[2,37],55:[2,37],57:[2,37]},{1:[2,38],6:[2,38],8:[2,38],13:[2,38],19:[2,38],22:[2,38],24:[2,38],25:[2,38],26:[2,38],27:[2,38],28:[2,38],29:[2,38],30:[2,38],33:[2,38],45:[2,38],46:[2,38],48:[2,38],50:[2,38],52:[2,38],53:[2,38],54:[2,38],55:[2,38],57:[2,38]},{1:[2,39],6:[2,39],8:[2,39],13:[2,39],19:[2,39],22:[2,39],24:[2,39],25:[2,39],26:[2,39],27:[2,39],28:[2,39],29:[2,39],30:[2,39],33:[2,39],45:[2,39],46:[2,39],48:[2,39],50:[2,39],52:[2,39],53:[2,39],54:[2,39],55:[2,39],57:[2,39]},{6:[2,46],8:[2,46],13:[2,46],19:[2,46],22:[2,46],24:[2,46],25:[2,46],26:[2,46],27:[2,46],28:[2,46],29:[2,46],30:[2,46],33:[2,46],45:[2,46],46:[2,46],48:[2,46],49:42,50:[2,46],52:[2,46],53:[2,46],55:[2,46],57:[2,46]},{33:[1,43]},{1:[2,29],6:[2,29],8:[2,29],13:[2,29],19:[2,29],22:[2,29],24:[2,29],25:[2,29],26:[2,29],27:[2,29],28:[2,29],29:[2,29],30:[2,29],33:[2,29],45:[2,29],46:[2,29],48:[2,29],50:[2,29],52:[2,29],53:[2,29],54:[2,29],55:[2,29],57:[2,29]},{19:[1,44]},{19:[1,45]},{19:[1,46]},{3:32,4:36,5:37,6:[1,40],8:[1,41],12:25,13:[1,27],15:16,18:33,19:[1,38],21:34,22:[1,39],24:[1,14],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],31:15,32:5,33:[2,26],34:47,35:4,36:6,37:7,38:8,39:9,40:10,41:11,42:12,43:13,44:21,45:[1,22],46:[1,24],48:[1,23],50:[1,17],52:[1,18],53:[1,19],55:[1,26],57:[1,20]},{3:32,4:36,5:37,6:[1,40],8:[1,41],12:25,13:[1,27],15:16,18:33,19:[1,38],21:34,22:[1,39],24:[1,14],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],31:15,32:5,33:[2,26],34:48,35:4,36:6,37:7,38:8,39:9,40:10,41:11,42:12,43:13,44:21,45:[1,22],46:[1,24],48:[1,23],50:[1,17],52:[1,18],53:[1,19],55:[1,26],57:[1,20]},{6:[2,12],8:[2,12],13:[2,12],16:50,17:49,19:[2,12],22:[2,12],24:[2,12],26:[2,12],27:[2,12],28:[2,12],29:[2,12],30:[2,12],33:[2,12],55:[2,12]},{29:[1,52],33:[2,56],47:51},{29:[1,52],33:[2,56],47:53},{6:[2,12],8:[2,12],13:[2,12],16:54,19:[2,12],20:[2,12],22:[2,12],24:[2,12],26:[2,12],27:[2,12],28:[2,12],29:[2,12],30:[2,12],33:[2,12],55:[2,12]},{19:[2,56],29:[1,52],47:55},{6:[2,40],8:[2,40],13:[2,40],19:[2,40],22:[2,40],24:[2,40],26:[2,40],27:[2,40],28:[2,40],29:[2,40],30:[2,40],33:[2,40],45:[2,40],46:[2,40],48:[2,40],50:[2,40],52:[2,40],53:[2,40],55:[2,40],57:[2,40]},{6:[2,18],8:[2,18],13:[2,18],19:[2,18],20:[2,18],22:[2,18],23:[2,18],24:[2,18],25:[2,18],26:[2,18],27:[2,18],28:[2,18],29:[2,18],30:[2,18],33:[2,18],55:[2,18]},{6:[2,19],8:[2,19],13:[2,19],19:[2,19],20:[2,19],22:[2,19],23:[2,19],24:[2,19],25:[2,19],26:[2,19],27:[2,19],28:[2,19],29:[2,19],30:[2,19],33:[2,19],55:[2,19]},{6:[2,20],8:[2,20],13:[2,20],19:[2,20],20:[2,20],22:[2,20],23:[2,20],24:[2,20],25:[2,20],26:[2,20],27:[2,20],28:[2,20],29:[2,20],30:[2,20],33:[2,20],55:[2,20]},{6:[2,21],8:[2,21],13:[2,21],19:[2,21],20:[2,21],22:[2,21],23:[2,21],24:[2,21],25:[2,21],26:[2,21],27:[2,21],28:[2,21],29:[2,21],30:[2,21],33:[2,21],55:[2,21]},{6:[2,22],8:[2,22],13:[2,22],19:[2,22],20:[2,22],22:[2,22],23:[2,22],24:[2,22],25:[2,22],26:[2,22],27:[2,22],28:[2,22],29:[2,22],30:[2,22],33:[2,22],55:[2,22]},{6:[2,23],8:[2,23],13:[2,23],19:[2,23],20:[2,23],22:[2,23],23:[2,23],24:[2,23],25:[2,23],26:[2,23],27:[2,23],28:[2,23],29:[2,23],30:[2,23],33:[2,23],55:[2,23]},{6:[2,24],8:[2,24],13:[2,24],19:[2,24],20:[2,24],22:[2,24],23:[2,24],24:[2,24],25:[2,24],26:[2,24],27:[2,24],28:[2,24],29:[2,24],30:[2,24],33:[2,24],55:[2,24]},{6:[2,25],8:[2,25],13:[2,25],19:[2,25],20:[2,25],22:[2,25],23:[2,25],24:[2,25],25:[2,25],26:[2,25],27:[2,25],28:[2,25],29:[2,25],30:[2,25],33:[2,25],55:[2,25]},{6:[2,1],8:[2,1],13:[2,1],19:[2,1],20:[2,1],22:[2,1],23:[2,1],24:[2,1],25:[2,1],26:[2,1],27:[2,1],28:[2,1],29:[2,1],30:[2,1],33:[2,1],55:[2,1]},{6:[2,2],8:[2,2],13:[2,2],19:[2,2],20:[2,2],22:[2,2],23:[2,2],24:[2,2],25:[2,2],26:[2,2],27:[2,2],28:[2,2],29:[2,2],30:[2,2],33:[2,2],55:[2,2]},{6:[2,12],8:[2,12],13:[2,12],16:50,17:56,19:[2,12],20:[2,12],22:[2,12],24:[2,12],26:[2,12],27:[2,12],28:[2,12],29:[2,12],30:[2,12],55:[2,12]},{6:[2,12],8:[2,12],13:[2,12],16:50,17:57,19:[2,12],22:[2,12],23:[2,12],24:[2,12],26:[2,12],27:[2,12],28:[2,12],29:[2,12],30:[2,12],55:[2,12]},{6:[2,6],7:58,10:[2,6]},{7:59,8:[2,6],10:[2,6]},{3:32,4:36,5:37,6:[1,40],8:[1,41],12:25,13:[1,27],15:16,18:33,19:[1,38],21:34,22:[1,39],24:[1,14],25:[1,60],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],31:15,32:5,33:[2,26],34:3,35:4,36:6,37:7,38:8,39:9,40:10,41:11,42:12,43:13,44:21,45:[1,22],46:[1,24],48:[1,23],50:[1,17],52:[1,18],53:[1,19],55:[1,26],57:[1,20]},{1:[2,28],6:[2,28],8:[2,28],13:[2,28],19:[2,28],22:[2,28],24:[2,28],25:[2,28],26:[2,28],27:[2,28],28:[2,28],29:[2,28],30:[2,28],33:[2,28],45:[2,28],46:[2,28],48:[2,28],50:[2,28],52:[2,28],53:[2,28],54:[2,28],55:[2,28],57:[2,28]},{3:32,4:36,5:37,6:[1,40],8:[1,41],12:25,18:33,19:[1,38],20:[2,26],21:34,22:[1,39],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],31:62,33:[2,26],51:61},{3:32,4:36,5:37,6:[1,40],8:[1,41],12:25,18:33,19:[1,38],20:[2,26],21:34,22:[1,39],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],31:63},{3:32,4:36,5:37,6:[1,40],8:[1,41],12:25,18:33,19:[1,38],20:[2,26],21:34,22:[1,39],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],31:64},{1:[2,55],6:[2,55],8:[2,55],13:[2,55],19:[2,55],22:[2,55],24:[2,55],25:[2,55],26:[2,55],27:[2,55],28:[2,55],29:[2,55],30:[2,55],33:[2,55],45:[2,55],46:[2,55],48:[2,55],50:[2,55],52:[2,55],53:[2,55],54:[2,55],55:[2,55],57:[2,55]},{1:[2,41],6:[2,41],8:[2,41],13:[2,41],19:[2,41],22:[2,41],24:[2,41],25:[2,41],26:[2,41],27:[2,41],28:[2,41],29:[2,41],30:[2,41],33:[2,41],45:[2,41],46:[2,41],48:[2,41],50:[2,41],52:[2,41],53:[2,41],54:[2,41],55:[2,41],57:[2,41]},{33:[1,65]},{3:32,4:36,5:37,6:[1,40],8:[1,41],11:66,12:67,13:[1,68],14:69,15:70,18:33,19:[1,38],20:[2,14],21:34,22:[1,39],23:[2,14],24:[1,71],25:[2,14],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],33:[2,14],55:[1,26]},{33:[1,72]},{19:[2,57],33:[2,57]},{33:[1,73]},{3:32,4:36,5:37,6:[1,40],8:[1,41],11:66,12:67,13:[1,68],14:69,15:70,18:33,19:[1,38],20:[2,27],21:34,22:[1,39],24:[1,71],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],33:[2,27],55:[1,26]},{19:[1,74]},{20:[1,75]},{23:[1,76]},{6:[1,77],10:[1,78]},{8:[1,79],10:[1,78]},{1:[2,45],6:[2,45],8:[2,45],13:[2,45],19:[2,45],20:[2,45],22:[2,45],23:[2,45],24:[2,45],25:[2,45],26:[2,45],27:[2,45],28:[2,45],29:[2,45],30:[2,45],33:[2,45],45:[2,45],46:[2,45],48:[2,45],50:[2,45],52:[2,45],53:[2,45],54:[2,45],55:[2,45],57:[2,45]},{20:[1,80]},{20:[2,53],33:[1,81]},{20:[1,82]},{20:[1,83]},{1:[2,42],6:[2,42],8:[2,42],13:[2,42],19:[2,42],22:[2,42],24:[2,42],25:[2,42],26:[2,42],27:[2,42],28:[2,42],29:[2,42],30:[2,42],33:[2,42],45:[2,42],46:[2,42],48:[2,42],50:[2,42],52:[2,42],53:[2,42],54:[2,42],55:[2,42],57:[2,42]},{6:[2,13],8:[2,13],13:[2,13],19:[2,13],20:[2,13],22:[2,13],23:[2,13],24:[2,13],25:[2,13],26:[2,13],27:[2,13],28:[2,13],29:[2,13],30:[2,13],33:[2,13],55:[2,13]},{6:[2,8],8:[2,8],13:[2,8],19:[2,8],20:[2,8],22:[2,8],23:[2,8],24:[2,8],25:[2,8],26:[2,8],27:[2,8],28:[2,8],29:[2,8],30:[2,8],33:[2,8],55:[2,8]},{6:[2,9],8:[2,9],13:[2,9],19:[2,9],20:[2,9],22:[2,9],23:[2,9],24:[2,9],25:[2,9],26:[2,9],27:[2,9],28:[2,9],29:[2,9],30:[2,9],33:[2,9],55:[2,9]},{6:[2,10],8:[2,10],13:[2,10],19:[2,10],20:[2,10],22:[2,10],23:[2,10],24:[2,10],25:[2,10],26:[2,10],27:[2,10],28:[2,10],29:[2,10],30:[2,10],33:[2,10],55:[2,10]},{6:[2,11],8:[2,11],13:[2,11],19:[2,11],20:[2,11],22:[2,11],23:[2,11],24:[2,11],25:[2,11],26:[2,11],27:[2,11],28:[2,11],29:[2,11],30:[2,11],33:[2,11],55:[2,11]},{6:[2,12],8:[2,12],13:[2,12],16:50,17:84,19:[2,12],22:[2,12],24:[2,12],25:[2,12],26:[2,12],27:[2,12],28:[2,12],29:[2,12],30:[2,12],55:[2,12]},{1:[2,44],6:[2,44],8:[2,44],13:[2,44],19:[2,44],22:[2,44],24:[2,44],25:[2,44],26:[2,44],27:[2,44],28:[2,44],29:[2,44],30:[2,44],33:[2,44],45:[2,44],46:[2,44],48:[2,44],50:[2,44],52:[2,44],53:[2,44],54:[2,44],55:[2,44],57:[2,44]},{1:[2,43],6:[2,43],8:[2,43],13:[2,43],19:[2,43],22:[2,43],24:[2,43],25:[2,43],26:[2,43],27:[2,43],28:[2,43],29:[2,43],30:[2,43],33:[2,43],45:[2,43],46:[2,43],48:[2,43],50:[2,43],52:[2,43],53:[2,43],54:[2,43],55:[2,43],57:[2,43]},{20:[2,61],29:[1,88],56:85,58:86,59:87},{6:[2,15],8:[2,15],13:[2,15],19:[2,15],20:[2,15],22:[2,15],23:[2,15],24:[2,15],25:[2,15],26:[2,15],27:[2,15],28:[2,15],29:[2,15],30:[2,15],33:[2,15],55:[2,15]},{6:[2,16],8:[2,16],13:[2,16],19:[2,16],20:[2,16],22:[2,16],23:[2,16],24:[2,16],25:[2,16],26:[2,16],27:[2,16],28:[2,16],29:[2,16],30:[2,16],33:[2,16],55:[2,16]},{6:[2,3],8:[2,3],13:[2,3],19:[2,3],20:[2,3],22:[2,3],23:[2,3],24:[2,3],25:[2,3],26:[2,3],27:[2,3],28:[2,3],29:[2,3],30:[2,3],33:[2,3],55:[2,3]},{6:[2,7],8:[2,7],10:[2,7]},{6:[2,4],8:[2,4],13:[2,4],19:[2,4],20:[2,4],22:[2,4],23:[2,4],24:[2,4],25:[2,4],26:[2,4],27:[2,4],28:[2,4],29:[2,4],30:[2,4],33:[2,4],55:[2,4]},{3:32,4:36,5:37,6:[1,40],8:[1,41],12:25,13:[1,27],15:16,18:33,19:[1,38],21:34,22:[1,39],24:[1,14],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],31:15,32:5,33:[2,26],34:89,35:4,36:6,37:7,38:8,39:9,40:10,41:11,42:12,43:13,44:21,45:[1,22],46:[1,24],48:[1,23],50:[1,17],52:[1,18],53:[1,19],55:[1,26],57:[1,20]},{3:32,4:36,5:37,6:[1,40],8:[1,41],12:25,18:33,19:[1,38],21:34,22:[1,39],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],31:90,33:[2,26]},{3:32,4:36,5:37,6:[1,40],8:[1,41],12:25,13:[1,27],15:16,18:33,19:[1,38],21:34,22:[1,39],24:[1,14],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],31:15,32:5,33:[2,26],34:91,35:4,36:6,37:7,38:8,39:9,40:10,41:11,42:12,43:13,44:21,45:[1,22],46:[1,24],48:[1,23],50:[1,17],52:[1,18],53:[1,19],55:[1,26],57:[1,20]},{3:32,4:36,5:37,6:[1,40],8:[1,41],12:25,13:[1,27],15:16,18:33,19:[1,38],21:34,22:[1,39],24:[1,14],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],31:15,32:5,33:[2,26],34:92,35:4,36:6,37:7,38:8,39:9,40:10,41:11,42:12,43:13,44:21,45:[1,22],46:[1,24],48:[1,23],50:[1,17],52:[1,18],53:[1,19],55:[1,26],57:[1,20]},{25:[1,93]},{20:[1,94]},{20:[2,62],27:[1,95]},{20:[2,58],27:[2,58]},{20:[2,60],27:[2,60]},{1:[2,48],6:[2,48],8:[2,48],13:[2,48],19:[2,48],22:[2,48],24:[2,48],25:[2,48],26:[2,48],27:[2,48],28:[2,48],29:[2,48],30:[2,48],33:[2,48],45:[2,48],46:[2,48],48:[2,48],50:[2,48],52:[2,48],53:[2,48],54:[2,48],55:[2,48],57:[2,48]},{33:[1,96]},{1:[2,49],6:[2,49],8:[2,49],13:[2,49],19:[2,49],22:[2,49],24:[2,49],25:[2,49],26:[2,49],27:[2,49],28:[2,49],29:[2,49],30:[2,49],33:[2,49],45:[2,49],46:[2,49],48:[2,49],50:[2,49],52:[2,49],53:[2,49],54:[2,49],55:[2,49],57:[2,49]},{1:[2,50],6:[2,50],8:[2,50],13:[2,50],19:[2,50],22:[2,50],24:[2,50],25:[2,50],26:[2,50],27:[2,50],28:[2,50],29:[2,50],30:[2,50],33:[2,50],45:[2,50],46:[2,50],48:[2,50],50:[2,50],52:[2,50],53:[2,50],54:[1,97],55:[2,50],57:[2,50]},{6:[2,17],8:[2,17],13:[2,17],19:[2,17],20:[2,17],22:[2,17],23:[2,17],24:[2,17],25:[2,17],26:[2,17],27:[2,17],28:[2,17],29:[2,17],30:[2,17],33:[2,17],55:[2,17]},{24:[1,14],35:98},{29:[1,88],59:99},{3:32,4:36,5:37,6:[1,40],8:[1,41],12:25,18:33,19:[1,38],20:[2,26],21:34,22:[1,39],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],31:100},{3:32,4:36,5:37,6:[1,40],8:[1,41],12:25,13:[1,27],15:16,18:33,19:[1,38],21:34,22:[1,39],24:[1,14],26:[1,28],27:[1,29],28:[1,30],29:[1,31],30:[1,35],31:15,32:5,33:[2,26],34:101,35:4,36:6,37:7,38:8,39:9,40:10,41:11,42:12,43:13,44:21,45:[1,22],46:[1,24],48:[1,23],50:[1,17],52:[1,18],53:[1,19],55:[1,26],57:[1,20]},{1:[2,54],6:[2,54],8:[2,54],13:[2,54],19:[2,54],20:[2,54],22:[2,54],23:[2,54],24:[2,54],25:[2,54],26:[2,54],27:[2,54],28:[2,54],29:[2,54],30:[2,54],33:[2,54],45:[2,54],46:[2,54],48:[2,54],50:[2,54],52:[2,54],53:[2,54],54:[2,54],55:[2,54],57:[2,54]},{20:[2,59],27:[2,59]},{20:[2,52]},{1:[2,51],6:[2,51],8:[2,51],13:[2,51],19:[2,51],22:[2,51],24:[2,51],25:[2,51],26:[2,51],27:[2,51],28:[2,51],29:[2,51],30:[2,51],33:[2,51],45:[2,51],46:[2,51],48:[2,51],50:[2,51],52:[2,51],53:[2,51],54:[2,51],55:[2,51],57:[2,51]}],
defaultActions: {100:[2,52]},
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
case 2:return 50;
break;
case 3:return 52; 
break;
case 4:return 48;
break;
case 5:return 46;
break;
case 6:return 45;
break;
case 7:return 'DO';
break;
case 8:return 53;
break;
case 9:return 54;
break;
case 10:return 'TRY';
break;
case 11:return 'CATCH';
break;
case 12:return 57;
break;
case 13:return 55;
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