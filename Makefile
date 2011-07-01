
lib/parser.js: lib/parser.y lib/lexer.l
	jison -o $@ $^

test/harness.js: test/harness.tjs
	tamejs 

build: lib/parser.js test/harness.js

clean:
	rm lib/parser.js test/harness.js

default: build
all: build
