
default: build

lib/parser.js: lib/parser.y lib/lexer.l
	jison -o $@ $^

test/harness.js: test/harness.tjs
	node lib/main.js -o $@ $< && chmod u+x $@

build: lib/parser.js test/harness.js

clean:
	rm lib/parser.js test/harness.js

all: build
