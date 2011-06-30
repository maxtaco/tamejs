

function foo () {
    for (var i = 0; i < 10; i++) {
	twait { setTimeout (mkevent (), 100); }
	console.log ("iter: " + i);
    }
};

foo ();
