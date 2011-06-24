
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
     : String1
     | String2
     ;

String1
     : QUOTE1 StringAtoms QUOTE1
     ;

String2
     : QUOTE2 StringAtoms QUOTE2
     ;

StringAtoms
     :
     | StringAtoms STRING_ATOM
     ;

ExprAtomLeading
     : GENERIC
     | COMMA
     | COLON
     | ID
     | String
     | LPAREN Expr RPAREN
     | LBRACKET Expr RBRACKET
     | FunctionDeclaration
     ;

ExprAtom
     : ExprAtomLeading
     | LBRACE ExprAtom RBRACE
     ;

ExprAtomList
     : 
     | ExprAtomList ExprAtom
     ;     

ExprAtom
     : 
     | ExprAtomLeading ExprAtomList
     ;

ExprStatment
     : Expr SEMICOLON
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
     : LBRACE SourceElements RBRACE
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
     

