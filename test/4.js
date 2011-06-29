
var i = 0;
while (i < 400000) {
    twait { 
	setTimeout (mkevent (), 1); 
	setTimeout (mkevent (), 2); 
    }
    console.log ("foo: " + i);
    i++;
}
