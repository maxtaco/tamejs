/* description: partial scanner for javascript in the tame dialect;
   uses paren-matching so as not to have to parse the whole language
 */

/* TODOS: regex in the form var x = /for/g;
      Might not be possible, we'll have to see....
      Maybe run the preprocessor as in v8?
*/

/* lexical grammar */
/* author: Max Krohn <max@m8api.com> */

%s ST_JS ST_QUOTE2 ST_QUOTE1 ST_COMMENT ST_EXPR_0 ST_EXPR_1
%%

/* ------------------------------------------------------------ */

<ST_JS>"//".*		/* skip over all space */
<ST_JS>"for"		%{ this.begin ('ST_EXPR_0'); return 'FOR'; }
<ST_JS>"while"		%{ this.begin ('ST_EXPR_0'); return 'WHILE'; }
<ST_JS>"break"		return 'BREAK';
<ST_JS>"continue"	return 'CONTINUE';
<ST_JS>"return"		return 'RETURN';
<ST_JS>"do"		return 'DO';
<ST_JS>"if"		return 'IF';
<ST_JS>"else"		return 'ELSE';
<ST_JS>"try"		return 'TRY';
<ST_JS>"catch"		return 'CATCH';
<ST_JS>"twait"		return 'TWAIT';
<ST_JS>"function"	return 'FUNCTION';
<ST_JS>"mkev"		return 'MKEV';
<ST_JS>"finally"	return 'FINALLY';
<ST_JS>"/*"		%{ this.begin ('ST_COMMENT'); }

<ST_JS>"{"		%{ this.begin ('ST_JS'); return 'LBRACE1'; }
<ST_JS>"}"		%{ this.popState(); return 'RBRACE1'; }
<ST_JS>"("		%{ this.begin ('ST_JS'); return 'LPAREN'; }
<ST_JS>")"		%{ this.popState(); return 'RPAREN'; }
<ST_JS>";"		return "SEMICOLON";

<ST_JS>"\""		%{ this.begin ('ST_QUOTE2'); return 'QUOTE2'; }
<ST_JS>"\'"		%{ this.begin ('ST_QUOTE1'); return 'QUOTE1'; }
<ST_JS>[^/fwbcrdietcfm{}();"']+    return 'GENERIC';
<ST_JS>.	 	return 'GENERIC';
<ST_JS><<EOF>>		return 'ENDOFFILE';

/* ------------------------------------------------------------ */

<ST_EXPR_0>\s+		/* skip whitespace */
<ST_EXPR_0>"("		%{ this.popState(); this.begin ('ST_EXPR_1'); 
			   return 'LPAREN'; }
<ST_EXPR_0><<EOF>>	return 'ENDOFFILE';
<ST_EXPR_0>.		return 'INVALID';

/* ------------------------------------------------------------ */

<ST_EXPR_1>"("		%{ this.begin ('ST_EXPR_1'); return 'RPAREN'; }
<ST_EXPR_1>")"		%{ this.popState(); return 'RPAREN'; }
<ST_EXPR_1>"{"		%{ this.begin ('ST_EXPR_1'); return 'LBRACE'; }
<ST_EXPR_1>"}"		%{ this.popState(); return 'RBRACE'; }
<ST_EXPR_1>";"		return 'SEMICOLON';
<ST_EXPR_1>"\""		%{ this.begin ('ST_QUOTE2'); return 'QUOTE2'; }
<ST_EXPR_1>"\'"		%{ this.begin ('ST_QUOTE1'); return 'QUOTE1'; }
<ST_EXPR_1>"/*"		%{ this.begin ('ST_COMMENT'); return 'LCOMMENT'; }
<ST_EXPR_1>[^(){};'"/]+	return 'GENERIC';
<ST_EXPR_1>.		return 'GENERIC';
<ST_EXPR_1><<EOF>>	return 'ENDOFFILE';

/* ------------------------------------------------------------ */

<ST_QUOTE2>"\\".	return 'QUOTE_FRAG';
<ST_QUOTE2>[^\\"]+	return 'QUOTE_FRAG';
<ST_QUOTE2>"\""		%{ this.popState (); return "QUOTE2"; }
<ST_QUOTE2><<EOF>>	return 'ENDOFFILE';

/* ------------------------------------------------------------ */

<ST_QUOTE1>"\\".	return 'QUOTE_FRAG';
<ST_QUOTE1>[^\\']+	return 'QUOTE_FRAG';
<ST_QUOTE1>"'"		%{ this.popState (); return "QUOTE1"; }
<ST_QUOTE1><<EOF>>	return 'ENDOFFILE';

/* ------------------------------------------------------------ */

<ST_COMMENT>"*/"	%{ this.popState(); }
<ST_COMMENT>"*"		/* ignore */
<ST_COMMENT>[^*]+	/* ignore */
<ST_COMMENT><<EOF>>	return 'ENDOFFILE';

/* ------------------------------------------------------------ */
