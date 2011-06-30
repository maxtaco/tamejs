
/* description: the parser definition for tamejs. */

/* To build parser:
     % <jison> tamejs.jison tamejs.jisonlex
*/


/* author: Max Krohn <max@m8api.com> */

/* Some borrowed from: http://www.opensource.apple.com/source/JavaScriptCore/ */

/* TODOS!
    - switch/case/default
    - \n's instead of ';'
 */ 


%start Program


%nonassoc IF_WITHOUT_ELSE
%nonassoc ELSE

%%

String
     : String1 { $$ = $1; }
     | String2 { $$ = $1; }
     ;

String1
     : QUOTE1 StringAtoms QUOTE1 
     { $$ = new yy.String (@1.first_line, @3.last_line, "'" + $2 + "'"); }
     ;

String2
     : QUOTE2 StringAtoms QUOTE2 
     { $$ = new yy.String (@1.first_line, @3.last_line, '"' + $2 + '"'); }
     ;

StringAtom
     : STRING_ATOM { $$ = yytext; }
     ;

StringAtoms
     : { $$ = ""; }
     | StringAtoms STRING_ATOM { $$ = $1 + $2; }
     ;

InnerExprAtom
     : OuterExprAtom { $$ = $1; }
     | LABEL         { $$ = [ new yy.Atom (@1.first_line, yytext)]; }
     | BraceExpr     { $$ = $1; }
     | FunctionDeclaration { $$ = [ $1 ]; }
     ;

InnerExprAtomList
     : { $$ = []; }
     | InnerExprAtomList InnerExprAtom { $$ = $1.concat ($2); }
     ;

InnerExpr
     : InnerExprAtomList { $$ = new yy.Expr ($1); }
     ;

ParenExpr
     : LPAREN InnerExpr RPAREN     
     { 
         var out = [ new yy.Atom (@1.first_line, '(') ];
	 $2.pushAtomsToArray (out);
	 out.push (new yy.Atom (@3.first_line, ')'));
	 $$ = out;
     }
     ;

BracketExpr 
     : LBRACKET InnerExpr RBRACKET 
     { 
         var out = [ new yy.Atom (@1.first_line, '[') ];
	 $2.pushAtomsToArray (out);
	 out.push (new yy.Atom (@3.first_line, ']'));
	 $$ = out;
     }
     ;

BraceExpr
     : LBRACE InnerExpr RBRACE    
     { 
         var out = [ new yy.Atom (@1.first_line, '{') ];
	 $2.pushAtomsToArray (out);
	 out.push (new yy.Atom (@3.first_line, '}'));
	 $$ = out;
     }
     ;

OuterExprAtom
     : GENERIC     { $$ = [ new yy.Atom (@1.first_line, yytext) ]; }
     | COMMA       { $$ = [ new yy.Atom (@1.first_line, yytext) ]; }
     | COLON       { $$ = [ new yy.Atom (@1.first_line, yytext) ]; }
     | ID          { $$ = [ new yy.Atom (@1.first_line, yytext) ]; }
     | String      { $$ = $1; }
     | ParenExpr   { $$ = $1; } 
     | BracketExpr { $$ = $1; }
     | MKEVENT     
     { $$ = [ new yy.Atom (@1.first_line, "__tame_ev.mkevent") ] ; }
     ;

Expr
     : { $$ = new yy.Expr ([]); }
     | OuterExprAtom InnerExprAtomList
     {
	 var lst = $1.concat ($2);
	 $$ = new yy.Expr (lst);
     }
     ;

ExprStatement
     : Expr SEMICOLON 
     { 
         $1.addAtom (new yy.Atom (@2.first_line, ";")); 
	 $$ = $1; 
     }
     | FunctionDeclaration 
     {
         $$ = yy.Expr ([ $1 ] );
     }
     ;

SemicolonOpt
     : 
     | SEMICOLON
     ;

Statement
     : Block
     | ExprStatement
     | ForStatement
     | WhileStatement
     | IfStatement
     | TwaitStatement
     | LabeledStatement
     | ReturnStatement
     | BreakStatement
     | ContinueStatement
     | SwitchStatement
     ;

Label
     : LABEL { $$ = new yy.Label (@1.first_line, yytext); }
     ;

LabeledStatement 
     : Label Statement
     {
         $2.setLabel ($1);
	 $$ = $2;
     }
     ;

ReturnStatement
     : RETURN InnerExpr SEMICOLON
     {
         $$ = new yy.ReturnStatement (@1.first_line, $2);
     }
     ;

ContinueStatement
     : CONTINUE IdOpt SEMICOLON
     {
         $$ = new yy.ContinueStatement (@1.first_line, $2);
     }
     ;

BreakStatement
     : BREAK IdOpt SEMICOLON
     {
         $$ = new yy.BreakStatement (@1.first_line, $2);
     }
     ;

Block
     : LBRACE SourceElements RBRACE { $$ = new yy.Block (@1.first_line, $2); }
     ;

SourceElements
     : { $$ = []; } 
     | SourceElements Statement { $1.push ($2); $$ = $1; }
     ;

ForStatement
     : FOR LPAREN ForIter RPAREN Statement
     {
        $$ = new yy.ForStatement (@1.first_line, $3, $5);
     }
     ;

WhileStatement
     : WHILE LPAREN Expr RPAREN Statement
     {
        $$ = new yy.WhileStatement (@1.first_line, $3, $5);
     }
     ;

SwitchStatement
     : SWITCH LPAREN Expr RPAREN LBRACE CaseBlock RBRACE
     {
         $$ = new yy.SwitchStatement (@1.first_line, $3, $6);
     }
     ;

CaseBlock
     : { $$ = []; }
     | CaseBlock Case 
     {
         $1.push ($2);
	 $$ = $1;
     }
     ;

Case
     : CaseLabel CaseBody
     {
         $1.addBody (@1.first_line, $2);
	 $$ = $1;
     }
     ;

CaseLabel
     : DEFAULT COLON     { $$ = yy.Case (@1.first_line); }
     | CASE LABEL        { $$ = yy.Case (@1.first_line, $2); }
     | CASE String COLON { $$ = yy.Case (@1.first_line, $2); }
     ;

CaseBody
     : SourceElements { $$ = $1; }
     ;

IfStatement
     : IF LPAREN Expr RPAREN Statement %prec IF_WITHOUT_ELSE
     {
        $$ = new yy.IfElseStatement (@1.first_line, $3, $5, null);
     }
     | IF LPAREN Expr RPAREN Statement ELSE Statement
     {
        $$ = new yy.IfElseStatement (@1.first_line, $3, $5, $7);
     }
     ;

ForIter
     : Expr SEMICOLON Expr SEMICOLON Expr
     {
         $$ = new yy.ForIterClassic ($1, $3, $5);
     }
     | Expr
     {
         $$ = new yy.ForIterIterator ($1); 
     }
     ;

FunctionDeclaration
     : FUNCTION	IdOpt LPAREN ParamListOpt RPAREN Block
     {
         $$ = new yy.FunctionDeclaration (@1.first_line, $2, $4, $6);
     }
     ;

TwaitStatement
     : TWAIT Statement
     {
        $$ = new yy.TwaitStatement (@1.first_line, $2);
     }
     ;

IdOpt
     : 
     | ID { $$ = yytext; }
     ;

ParamList
     : Param { $$ = [ $1 ]; }
     | ParamList COMMA Param { $1.push ($3); $$ = $1; }
     ;

Param
     : ID { $$ = yytext; }
     ;

ParamListOpt
     : { $$ = []; }
     | ParamList
     ;

FunctionBody
     : SourceElements
     ;

Program
     : SourceElements { yy.output = new yy.Program ($1); }
     ;
     
