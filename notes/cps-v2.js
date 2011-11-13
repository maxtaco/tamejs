


/*
fun = (x) ->
     if x
        console.log ("foo")
     else
        x++
     x += 10
*/

fun = function(x) {
  if (x) {
    console.log("foo");
  } else {
    x++;
  }
  return x += 10;
};

fun = function (x) {
    var _ret = null;
    var j;
    (function (k) {
	if (x) { 
	    console.log("foo");
	    _ret = 10;
	    k = stop;
	} else {
	    j++;
	}
	k();
    })(function () {
	j += 10;
	(function (k) {
	    if (j) {
		console.log ("hi");
	    }
	    k();
	})(function () {
	    _ret = j;
	});
    });
    return _ret;
}

torture = function (x) {
    var _return_k = function () {}
    var _ret = null;
    var i;
    i = 0;
    var _while = function (k) {
	var _break_k = k;
        var _continue_k = function () { _while (k); };
	if (i < x) {
	    (function (k) {
		if (i === 90) {
		    k = _break_k;
		}
		k();
	    })(function () {
		(function (k) {
		    if (i === 20) {
			k = _continue_k;
		    }
		    k();
		})(function () {
		    (function (k) {
			if (random() % 200 == 4) {
			    k = _return_k;
			}
			k();
		    })(function () {
			i++;
			_continue_k();
		    });
		});
	    });
	} else {
	    _break_k ();
	}
    };
    _while (function () {
	i--;
	_ret = i;
    });
    return _ret;
};
	    



/*

foo = function () {
    function _f (k) {
       var i;
       foo (x)
       i = 10;
       function _while (k) {
          var _while_k = k;
          if (a < b) { 
             bar (z);
             i /= 3
             (function (k) { 
                 if (blah()) {
                     _while_k();
                 } else {
                     k();
                 }
              })(function (k) {
                    b++;
                    k();
                 })(_while);
           }	
       }

*/
