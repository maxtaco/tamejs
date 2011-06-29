
console.log ("start");
derp : for (var i = 0; i < 10; i++) {
    if (i == 9) {
	console.log ("derp");
	continue derp;
    }
    twait { setTimeout (mkevent (), 100); }
    console.log ("blah: " + i);
}
console.log ("done");
