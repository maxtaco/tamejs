
/* description: the parser definition for tamejs. */

/* To build parser:
     % <jison> tamejs.jison tamejs.jisonlex
*/


/* author: Max Krohn <max@m8api.com> */

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

Expr
     : ExprFrag Expr
     |
     ;

ExprStatement
     : Expr SEMICOLON
     ;

Statement
     : Block
     | ExprStatement
     | ForStatement
     | WhileStatement
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

ForIter
     : Expr SEMICOLON Expr SEMICOLON Expr
     : Expr
     ;

