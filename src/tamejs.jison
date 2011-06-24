
/* description: the parser definition for tamejs. */

/* To build parser:
     % <jison> tamejs.jison tamejs.jisonlex
*/


/* author: Max Krohn <max@m8api.com> */

%%

expr_frag
     : GENERIC
     | nested_anything
     ;

nested_anything
     : LPAREN anything RPAREN
     | LBRACE anything RBRACE
     ;

anything
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
     | nested_anything
     ;

expr
     : expr_frag expr
     |
     ;

statement
     : block
     | empty_statement
     | expr_statement
     ;

block
     : LBRACE source_elements RBRACE
     ;

source_elements
     : 
     | source_elements statement
     ;

for
     : FOR LPAREN for_iter RPAREN statement
     ;

for_iter
     : expr SEMICOLON expr SEMICOLON expr
     : expr
     ;

