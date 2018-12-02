var path = require("path");
var fs = require("fs");

fs.readdir(__dirname, function(err, files) {
    if(err) {
        process.exit(1);
    }

    var tests = files.filter(function(item) {
        return item.indexOf("spec.js") !== -1;
    });

    tests.forEach(function(file) {

        console.log(`: ${file}`);

        var me = fs.readFileSync(path.join(__dirname, file))

        // eval maybe evil, but its your code, are you evil?
        eval(me.toString());

        test.run();
    });
});
