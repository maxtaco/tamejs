
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

InnerExprAtom
     : OuterExprAtom { $$ = $1; }
     | LABEL         { $$ = yytext; }
     | BraceExpr     { $$ = $1; } 
     ;

InnerExprAtomList
     : { $$ = []; }
     | InnerExprAtomList InnerExprAtom { $1.push ($2); $$ = $1; }
     ;

InnerExpr
     : InnerExprAtomList { $$ = new ast.Expr ($1); }
     ;

ParenExpr
     : LPAREN InnerExpr RPAREN     { $$ = [ '(', $2, ')' ]; }
     ;

BracketExpr 
     : LBRACKET InnerExpr RBRACKET { $$ = [ '[', $2, ']' ]; }
     ;

BraceExpr
     : LBRACE InnerExpr RBRACE     { $$ = [ '{', $2, '}' ]; }
     ;

OuterExprAtom
     : GENERIC { $$ = yytext; }
     | COMMA   { $$ = yytext; }
     | COLON   { $$ = yytext; }
     | ID      { $$ = yytext; }
     | String  { $$ = yytext; }
     | ParenExpr   { $$ = $1; } 
     | BracketExpr { $$ = $1; }
     ;

Expr
     : { $$ = new ast.Expr ([]); }
     | OuterExprAtom InnerExprAtomList
     {
         $2.unshift ($1);
	 $$ = new ast.Expr ($2);
     }
     ;

ExprStatement
     : Expr SEMICOLON { $$ = [ $1, ';' ]; }
     | FunctionDeclaration { $$ = $1; }
     ;
	
Statement
     : Block
     | ExprStatement
     | ForStatement
     | WhileStatement
     | IfStatement
     | TwaitStatement
     | LabeledStatement
     ;

LabeledStatement 
     : LABEL Statement
     {
         $2.setLabel ($1);
	 $$ = $2;
     }
     ;

Block
     : LBRACE SourceElements RBRACE  { $$ = new ast.Block ($2); }
     ;

SourceElements
     : { $$ = []; } 
     | SourceElements Statement { $1.push ($2); $$ = $1; }
     ;

ForStatement
     : LabelOpt FOR LPAREN ForIter RPAREN Statement
     {
        $$ = new ast.ForStatement ($3, $5);
     }
     ;

WhileStatement
     : WHILE LPAREN Expr RPAREN Statement
     {
        $$ = new ast.WhileStatement ($3, $5);
     }
     ;

IfStatement
     : IF LPAREN Expr RPAREN Statement %prec IF_WITHOUT_ELSE
     {
        $$ = new ast.IfElseStatement ($3, $5, null);
     }
     | IF LPAREN Expr RPAREN Statement ELSE Statement
     {
        $$ = new ast.IfElseStatement ($3, $5, $7);
     }
     ;

ForIter
     : Expr SEMICOLON Expr SEMICOLON Expr
     {
         $$ = new ast.ForIterClassic ($1, $2, $);
     }
     | Expr
     {
         $$ = new ast.ForIterIterator ($1); 
     }
     ;

FunctionDeclaration
     : FUNCTION	IdOpt LPAREN ParamListOpt RPAREN LBRACE FunctionBody RBRACE
     {
         $$ = new ast.FunctionDeclaration ($2, $4, $7);
     }
     ;

TwaitStatement
     : TWAIT Statement
     {
        $$ = new ast.TwaitStatement ($2);
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
     : SourceElements { $$ = new ast.Program ($1); }
     ;
     

