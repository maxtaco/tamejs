
/* description: the parser definition for tamejs. */

/* To build parser:
     % <jison> tamejs.jison tamejs.jisonlex
*/


/* author: Max Krohn <max@m8api.com> */

/* Some borrowed from: http://www.opensource.apple.com/source/JavaScriptCore/ */

/* TODOS!
    - switch/case/default
    - labeled for's and while's --- how?
    - \n's instead of ';'
 */ 

%start Program

%nonassoc IF_WITHOUT_ELSE
%nonassoc ELSE

%%

String
     : String1 { $$ = $1; }
     | String2 { $$ = $2; }
     ;

String1
     : QUOTE1 StringAtoms QUOTE1 { $$ = "'" + $2 + "'"; }
     ;

String2
     : QUOTE2 StringAtoms QUOTE2 { $$ = '"' + $2 + '"' ; }
     ;

StringAtom
     : STRING_ATOM { $$ = yytext; }
     ;

StringAtoms
     : { $$ = ""; }
     | StringAtoms STRING_ATOM { $$ = $1 + $2; }
     ;

ExprAtomLeading
     : GENERIC { $$ = yytext; }
     | COMMA   { $$ = yytext; }
     | COLON   { $$ = yytext; }
     | ID      { $$ = yytext; }
     | String  { $$ = yytext; }
     | LPAREN Expr RPAREN     { $$ = [ '(', $2, ')' ]; }
     | LBRACKET Expr RBRACKET { $$ = [ '{', $2, '}' ]; }
     ;

ExprAtom
     : ExprAtomLeading        { $$ = $1; }
     | LBRACE ExprAtom RBRACE { $$ = [ $1, $2, $3 ]; }
     | FunctionDeclaration    { $$ = $1; }
     ;

ExprAtomList
     : { $$ = []; }
     | ExprAtomList ExprAtom { $1.push ($2); $$ = $1; }
     ;     

Expr
     : { $$ = new Expr ([]); } 
     | ExprAtomLeading ExprAtomList 
     { 
         $2.unshift ($1); 
	 $$ = new Expr ($2); 
     }
     ;

ExprStatement
     : Expr SEMICOLON { $$ = $1; }
     | FunctionDeclaration { $$ = $1; }
     ;
	
Statement
     : Block
     | ExprStatement
     | ForStatement
     | WhileStatement
     | IfStatement
     | TwaitStatement
     ;

Block
     : LBRACE SourceElements RBRACE  { $$ = new Block ($2); }
     ;

SourceElements
     : { $$ = []; } 
     | SourceElements Statement { $1.push ($2); $$ = $1; }
     ;

ForStatement
     : FOR LPAREN ForIter RPAREN Statement
     {
        $$ = new ForStatement ($3, $5);
     }
     ;

Label
     : ID { $$ = yytext; }
     ;

LabelOpt
     : { $$ = null; }
     | Label COLON { $$ = $1; }
     ;

WhileStatement
     : WHILE LPAREN Expr RPAREN Statement
     {
        $$ = new WhileStatement ($3, $5);
     }
     ;

IfStatement
     : IF LPAREN Expr RPAREN Statement %prec IF_WITHOUT_ELSE
     {
        $$ = new IfElseStatement ($3, $5, null);
     }
     | IF LPAREN Expr RPAREN Statement ELSE Statement
     {
        $$ = new IfElseStatement ($3, $5, $7);
     }
     ;

ForIter
     : Expr SEMICOLON Expr SEMICOLON Expr
     {
         $$ = new ForIterClassic ($1, $2, $);
     }
     | Expr
     {
         $$ = new ForIterIterator ($1); 
     }
     ;

FunctionDeclaration
     : FUNCTION	IdOpt LPAREN ParamListOpt RPAREN LBRACE FunctionBody RBRACE
     {
         $$ = new FunctionDeclaration ($2, $4, $7);
     }
     ;

TwaitStatement
     : TWAIT Statement
     {
        $$ = new TwaitStatement ($2);
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
     : SourceElements
     ;
     

