

%s ST_QUOTE2 ST_QUOTE1 ST_COMMENT NST
%%

<INITIAL,NST>"//".*		/* skip over C++-style comments */

<INITIAL,NST>[ \t\n]             /* skip space */

<INITIAL,NST>"for"		return 'FOR';
<INITIAL,NST>"while"	return 'WHILE'; 
<INITIAL,NST>"break"	return 'BREAK';
<INITIAL,NST>"continue"	return 'CONTINUE';
<INITIAL,NST>"return"	return 'RETURN';
<INITIAL,NST>"do"		return 'DO';
<INITIAL,NST>"if"		return 'IF';
<INITIAL,NST>"else"		return 'ELSE';
<INITIAL,NST>"try"		return 'TRY';
<INITIAL,NST>"catch"	return 'CATCH';
<INITIAL,NST>"twait"	return 'TWAIT';
<INITIAL,NST>"function"	return 'FUNCTION';
<INITIAL,NST>"mkevent"	return 'MKEVENT';
<INITIAL,NST>"finally"	return 'FINALLY';
<INITIAL,NST>"case"		return 'CASE';
<INITIAL,NST>"switch"	return 'SWITCH';
<INITIAL,NST>"default"	return 'DEFAULT';
<INITIAL,NST>"this"         return 'THIS';
<INITIAL,NST>"with"         return 'WITH';
<INITIAL,NST>"#!"[ ]*[/].*  return 'SHBANG'; 

<INITIAL,NST>[a-zA-Z_0-9]+[ ^]*[:] { 
                                   yytext = yytext.replace (/[\s:]/g, ""); 
				   return 'LABEL'; 
                              }
<INITIAL,NST>[a-zA-Z_][a-zA-Z_0-9]* { return 'ID'; }

<INITIAL,NST>"{"		{ this.begin ('NST'); return 'LBRACE'; }
<INITIAL,NST>"}"		{ this.popState (); return 'RBRACE'; }
<INITIAL,NST>"("		{ this.begin ('NST'); return 'LPAREN'; }
<INITIAL,NST>")"		{ this.popState(); return 'RPAREN'; }
<INITIAL,NST>"["		{ this.begin ('NST'); return 'LBRACKET'; }
<INITIAL,NST>"]"		{ this.popState (); return 'RBRACKET'; }
<INITIAL,NST>";"		return "SEMICOLON";
<INITIAL,NST>','		return 'COMMA';
<INITIAL,NST>':'		return 'COLON';

<INITIAL,NST>"\""		{ this.begin ('ST_QUOTE2'); return 'QUOTE2'; }
<INITIAL,NST>"'"		{ this.begin ('ST_QUOTE1'); return 'QUOTE1'; }
<INITIAL,NST>"/*"		{ this.begin ('ST_COMMENT'); }
<INITIAL,NST>[^/{}()\[\];,:"'\s]+    return 'GENERIC';
<INITIAL,NST>.	 	return 'GENERIC';

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
