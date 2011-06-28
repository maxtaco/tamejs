
var i = 0;
foo : while (i < 100) {

    if (i == 10) {
	i += 2;
	continue foo;
    }

    console.log ("iter: " + i);
    if (i == 3) {
	console.log ("double-up");
	i++;
    }
    if (i == 13) {
	break foo;
    }
    i++;
}
console.log ("bye!");
