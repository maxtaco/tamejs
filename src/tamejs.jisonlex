
%s ST_QUOTE2 ST_QUOTE1 ST_COMMENT ST_EXPR_0 ST_EXPR_1
%%

"//".*		/* skip over all space */
[a-zA-Z_][a-zA-Z_0-9]* return 'ID';
"for"		{ this.begin ('ST_EXPR_0'); return 'FOR'; }
"while"		{ this.begin ('ST_EXPR_0'); return 'WHILE'; }
"break"		return 'BREAK';
"continue"	return 'CONTINUE';
"return"		return 'RETURN';
"do"		return 'DO';
"if"		return 'IF';
"else"		return 'ELSE';
"try"		return 'TRY';
"catch"		return 'CATCH';
"twait"		return 'TWAIT';
"function"	return 'FUNCTION';
"mkev"		return 'MKEV';
"finally"	return 'FINALLY';
"case"		return 'CASE';
'switch'	return 'SWITCH';
'default'	return 'DEFAULT';
"/*"		{ this.begin ('ST_COMMENT'); }

"{"		{ this.begin ('ST_JS'); return 'LBRACE'; }
"}"		{ this.popState(); return 'RBRACE'; }
"("		{ this.begin ('ST_JS'); return 'LPAREN'; }
")"		{ this.popState(); return 'RPAREN'; }
"["		{ this.begin ('ST_JS'); return 'LBRACKET'; }
"]"		{ this.popState(); return 'RBRACKET'; }
";"		return "SEMICOLON";
','		return 'COMMA';
':'		return 'COLON';

"\""		{ this.begin ('ST_QUOTE2'); return 'QUOTE2'; }
"\'"		{ this.begin ('ST_QUOTE1'); return 'QUOTE1'; }
[^/fwbcrdietcfm{}();,:"']+    return 'GENERIC';
.	 	return 'GENERIC';
<<EOF>>		return 'ENDOFFILE';

<ST_EXPR_0>\s+	        /* skip whitespace */
<ST_EXPR_0>"("          { this.popState(); this.begin ('ST_EXPR_1'); 
                          return 'LPAREN'; }
<ST_EXPR_0><<EOF>>      return 'ENDOFFILE';
<ST_EXPR_0>.	        return 'INVALID';

<ST_EXPR_1>"("		{ this.begin ('ST_EXPR_1'); return 'RPAREN'; }
<ST_EXPR_1>")"		{ this.popState(); return 'RPAREN'; }
<ST_EXPR_1>"{"		{ this.begin ('ST_EXPR_1'); return 'LBRACE'; }
<ST_EXPR_1>"}"		{ this.popState(); return 'RBRACE'; }
<ST_EXPR_1>";"		return 'SEMICOLON';
<ST_EXPR_1>"\""		{ this.begin ('ST_QUOTE2'); return 'QUOTE2'; }
<ST_EXPR_1>"\'"		{ this.begin ('ST_QUOTE1'); return 'QUOTE1'; }
<ST_EXPR_1>"/*"		{ this.begin ('ST_COMMENT'); return 'LCOMMENT'; }
<ST_EXPR_1>[^(){};'"/]+	return 'GENERIC';
<ST_EXPR_1>.		return 'GENERIC';
<ST_EXPR_1><<EOF>>	return 'ENDOFFILE';

<ST_QUOTE2>"\\".	return 'QUOTE_FRAG';
<ST_QUOTE2>[^\\"]+	return 'QUOTE_FRAG';
<ST_QUOTE2>"\""		{ this.popState (); return "QUOTE2"; }
<ST_QUOTE2><<EOF>>	return 'ENDOFFILE';

<ST_QUOTE1>"\\".	return 'QUOTE_FRAG';
<ST_QUOTE1>[^\\']+	return 'QUOTE_FRAG';
<ST_QUOTE1>"'"		{ this.popState (); return "QUOTE1"; }
<ST_QUOTE1><<EOF>>	return 'ENDOFFILE';

<ST_COMMENT>"*/"	{ this.popState(); }
<ST_COMMENT>"*"		/* ignore */
<ST_COMMENT>[^*]+	/* ignore */
<ST_COMMENT><<EOF>>	return 'ENDOFFILE';
