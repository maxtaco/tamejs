
default: build

lib/parser.js: lib/parser.y lib/lexer.l
	jison -o $@ $^

test/harness.js: test/harness.tjs lib/parser.js
	node lib/main.js -o $@ $< && chmod u+x $@

build: lib/parser.js test/harness.js

clean:
	rm -f lib/parser.js test/harness.js test/cases/*.out.js test/cases/lib/.*.cache

test: test/harness.js
	./test/harness.js

all: build

.PHONY: test
