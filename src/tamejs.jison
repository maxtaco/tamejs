
/* description: the parser definition for tamejs. */

/* To build parser:
     % <jison> tamejs.jison tamejs.jisonlex
*/


/* author: Max Krohn <max@m8api.com> */

/* Some borrowed from: http://www.opensource.apple.com/source/JavaScriptCore/ */

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
     | FunctionDeclaration    { $$ = $1; }
     ;

ExprAtom
     : ExprAtomLeading        { $$ = $1; }
     | LBRACE ExprAtom RBRACE { $$ = [ $1, $2, $3 ]; }
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

ExprStatment
     : Expr SEMICOLON { $$ = $1; }
     ;
	
Statement
     : Block
     | ExprStatement
     | ForStatement
     | WhileStatement
     | IfStatement
     | FunctionDeclaration
     ;

Block
     : LBRACE SourceElements RBRACE  { $$ = new Block ($2); }
     ;

SourceElements
     : 
     | SourceElements Statement
     ;

ForStatement
     : FOR LPAREN ForIter RPAREN Statement
     ;

WhileStatement
     : WHILE LPAREN Expr RPAREN Statement
     ;

IfStatement
    : IF LPAREN Expr RPAREN Statement %prec IF_WITHOUT_ELSE
    | IF LPAREN Expr RPAREN Statement ELSE Statement
    ;

ForIter
     : Expr SEMICOLON Expr SEMICOLON Expr
     | Expr
     ;

FunctionDeclaration
     : FUNCTION	IdOpt LPAREN ParamListOpt RPAREN LBRACE FunctionBody RBRACE
     ;

IdOpt
     : 
     | ID 
     ;

ParamList
     : Param
     | ParamList COMMA Param
     ;

Param
     : ID
     ;

ParamListOpt
     :
     | ParamList
     ;

FunctionBody
     : SourceElements
     ;

Program
     : SourceElements
     ;
     

