
src/parser.js: src/parser.y src/lexer.l
	jison -o $@ $^

build: src/parser.js

clean:
	rm src/parser.js
