
/* description: the parser definition for tamejs. */

/* To build parser:
     % <jison> tamejs.jison tamejs.jisonlex
*/


/* author: Max Krohn <max@m8api.com> */

/* Some borred from: http://www.opensource.apple.com/source/JavaScriptCore/ */

%start Program

%nonassoc IF_WITHOUT_ELSE
%nonassoc ELSE

%%

ExprFrag
     : GENERIC
     | NestedAnything
     ;

NestedAnything
     : LPAREN Anything RPAREN
     | LBRACE Anything RBRACE
     ;

Anything
     : GENERIC
     | SEMICOLON
     | FOR
     | WHILE
     | BREAK
     | CONTINUE
     | RETURN
     | DO
     | IF
     | ELSE
     | TRY
     | CATCH
     | TWAIT
     | FUNCTION
     | MKEV
     | FINALLY
     | NestedAnything
     ;

ExprNonEmptyBody
     : 
     | ExprNonEmptyBody ExprFrag
     ;

ExprNonEmpty
     : GENERIC ExprNonEmptyBody
     ;

Expr
     : 
     | ExprNonEmpty
     ;

ExprStatement
     : Expr SEMICOLON
     ;

Statement
     : Block
     | ExprStatement
     | ForStatement
     | WhileStatement
     | IfStatement
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

Program
     : SourceElements
     ;
     

