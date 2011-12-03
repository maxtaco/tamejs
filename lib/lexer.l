

%s ST_QUOTE2 ST_QUOTE1 ST_COMMENT
%%

<INITIAL>"//".*		/* skip over C++-style comments */

<INITIAL>\s+             /* skip space */

<INITIAL>"for"		return 'FOR';
<INITIAL>"while"	return 'WHILE'; 
<INITIAL>"break"	return 'BREAK';
<INITIAL>"continue"	return 'CONTINUE';
<INITIAL>"return"	return 'RETURN';
<INITIAL>"do"		return 'DO';
<INITIAL>"if"		return 'IF';
<INITIAL>"else"		return 'ELSE';
<INITIAL>"try"		return 'TRY';
<INITIAL>"catch"	return 'CATCH';
<INITIAL>"await"	return 'AWAIT';
<INITIAL>"function"	return 'FUNCTION';
<INITIAL>"defer"	return 'DEFER';
<INITIAL>"finally"	return 'FINALLY';
<INITIAL>"case"		return 'CASE';
<INITIAL>"switch"	return 'SWITCH';
<INITIAL>"default"	return 'DEFAULT';
<INITIAL>"this"         return 'THIS';
<INITIAL>"with"         return 'WITH';
<INITIAL>"#!"[ ]*[/].*  return 'SHBANG'; 

<INITIAL>[a-zA-Z_0-9]+[ ^]*[:] { 
                                   yytext = yytext.replace (/[\s:]/g, ""); 
				   return 'LABEL'; 
                              }
<INITIAL>[a-zA-Z_][a-zA-Z_0-9]* { return 'ID'; }
<INITIAL>[-]?[0-9]*\.[0-9]+ { return 'DECIMAL'; }

<INITIAL>"{"		return 'LBRACE';
<INITIAL>"}"		return 'RBRACE';
<INITIAL>"("		return 'LPAREN';
<INITIAL>")"		return 'RPAREN';
<INITIAL>"["		return 'LBRACKET';
<INITIAL>"]"		return 'RBRACKET';
<INITIAL>";"		return "SEMICOLON";
<INITIAL>','		return 'COMMA';
<INITIAL>':'		return 'COLON';
<INITIAL>'.'            return 'DOT';
<INITIAL>[=]+           return 'EQUALS';
<INITIAL>"!=="          return 'EQUALS';
<INITIAL>"!="           return 'EQUALS';
<INITIAL>"<="           return 'EQUALS';
<INITIAL>">="           return 'EQUALS';
<INITIAL>[<>&\|*^/~+\-][=] return 'EQUALS';
<INITIAL>'!'            return 'BANG';

<INITIAL>"\""		{ this.begin ('ST_QUOTE2'); return 'QUOTE2'; }
<INITIAL>"'"		{ this.begin ('ST_QUOTE1'); return 'QUOTE1'; }
<INITIAL>"/*"		{ this.begin ('ST_COMMENT'); }
<INITIAL>[^!./{}()\[\];,:"'\s]+    return 'GENERIC';
<INITIAL>.	 	return 'GENERIC';

<ST_QUOTE2>"\\".	return 'STRING_ATOM';
<ST_QUOTE2>[^\\"]+	return 'STRING_ATOM';
<ST_QUOTE2>"\""		{ this.popState (); return "QUOTE2"; }
<ST_QUOTE2><<EOF>>	return 'ENDOFFILE';

<ST_QUOTE1>"\\".	return 'STRING_ATOM';
<ST_QUOTE1>[^\\']+	return 'STRING_ATOM';
<ST_QUOTE1>"'"		{ this.popState (); return "QUOTE1"; }
<ST_QUOTE1><<EOF>>	return 'ENDOFFILE';

<ST_COMMENT>"*/"	{ this.popState(); }
<ST_COMMENT>"*"		/* ignore */
<ST_COMMENT>[^*]+	/* ignore */
<ST_COMMENT><<EOF>>	return 'ENDOFFILE';
