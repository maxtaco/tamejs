
var i = 0;
while (i < 100) {
    console.log ("iter: " + i);
    if (i == 3) {
	console.log ("double-up");
	i++;
    }
    if (i == 8) {
	break;
    }
    i++;
}
console.log ("bye!");
