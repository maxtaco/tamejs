
function blah (ev) { ev(); };

function tostr (x) {

    twait { blah (mkevent ()); }

    var ret = "";
    switch (x) {
    case 0:
	ret = "ZED";
	break;
    case 1:
	ret = "ONE";
	break;
    case 2:
	console.log ("fall through!");
    case 3:
	console.log ("and again!");
    default:
	ret = "don't know";
	break;
    }

    console.log (ret);
}

tostr (0);
tostr (1);
tostr (2);
tostr (3);
tostr (4);
