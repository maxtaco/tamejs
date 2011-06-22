
function foo () {
	var i = 0;
	if (true) {
		var i = 10;
		for (var j = 0; j < 3; j ++) {
			i++;	
		}
	}
	console.log (i);
}
foo();
