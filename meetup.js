
//=======================================================================

function loaddir(path, callback) {
    fs.readdir(path, function (err, filenames) {
	if (err) { callback(err); return; }
	var realfiles = [];
	var count = filenames.length;
	filenames.forEach(function (filename) {
	    fs.stat(filename, function (err, stat) {
		if (err) { callback(err); return; }
		if (stat.isFile()) {
		    realfiles.push(filename);
		}
		count--;
		if (count === 0) {
		    var results = [];
		    realfiles.forEach(function (filename) {
			fs.readFile(filename, function (err, data) {
			    if (err) { callback(err); return; }
			    results.push(data);
			    if (results.length === realfiles.length) {
				callback(null, results);
			    };
			});
		    });
		}
	    });
	});
    });
}

//=======================================================================

function loaddir_tamed (path, callback) {
    
    await fs.readdir(path, defer (var err, filenames));
    var results = [];
    var stat, data;
    for (var i = 0; !err && i < filenames.length; i++) {
	await fs.stat (filenames[i], defer (err, stat));
	if (!err && stat.isFile ()) {
	    await fs.readFile (filenames[i], defer (err, data));
	    if (!err) { results.push (data); }
	}
    }
    callback (err, results);
}

//=======================================================================


function loaddir_parallel (path, callback) {
    
    await fs.readdir(path, defer (var err, filenames));
    var results = [];
    await {
	for (var i = 0; !err && i < filenames.length; i++) {
	    (function (autocb) {
		var myerr, stat, data;
		await fs.stat (filenames[i], defer (myerr, stat));
		if (!myerr && stat.isFile ()) {
		    await fs.readFile (filenames[i], defer (myerr, data));
		    if (!myerr) { results.push (data); }
		}
		if (myerr) { err = myerr; }
	    }) (defer ());
	}
    }
    callback (err, results);
}

//=======================================================================

var Pipeliner = require ("connectors").Pipeliner;

function loaddir_windowed (path, callback, window) {
    
    var pipeline = new Pipeliner (window);
    await fs.readdir(path, defer (var err, filenames));
    var results = [];

    for (var i = 0; !err && i < filenames.length; i++) {
	await pipeline.waitInQueue (defer ());

	(function (autocb) {
	    var myerr, stat, data;
	    await fs.stat (filenames[i], defer (myerr, stat));
	    if (!myerr && stat.isFile ()) {
		await fs.readFile (filenames[i], defer (myerr, data));
		if (!myerr) { results.push (data); }
	    }
	    if (myerr) { err = myerr; }
	}) (pipeline.defer ());
    }
    await pipeliner.flush (defer ());

    callback (topErr, errors, results);
}

//=======================================================================
