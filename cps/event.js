function Event () {
    this._counter = 1;
    this._continuation = null;

    this._set_continuation = function (k) {
	this._continuation = k;
    }

    this._trigger = function () {
	this._counter--;
	if (this._counter == 0) {
	    this._continuation ();
	}
    }

    this.mkev_slot = function (obj, slot) {
	this._counter++;
	return function (i) {
	    obj[slot] = i;
	    this.trigger ();
	}
    }

    this.mkev = function () {
	this._counter++;
	return function () { this.trigger (); }
    }
}


