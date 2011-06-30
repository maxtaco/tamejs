
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
    default:
	ret = "don't know";
	break;
    }

    console.log (ret);
}
