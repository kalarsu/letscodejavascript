/* globals desc: false, task: false, complete: false, fail: false */

(function(){
    "use strict";//Tell javascript at run time to check error , help javascript prevent errors, not allow sloppy coding

    var semver = require("semver"); //semver is a parser for node for parsing version number
    var jshint = require("simplebuild-jshint");

    desc("default build");//documentation for following task, >jake --tasks or >jake -T  will show all the tasks, this is what it meant self-documentation
    task("default", ["version", "lint"], function(){ //run "version","lint" task before running default
        console.log("\n\nBUILD OK");
    });

    desc("Check Node version");
    task("version", function(){
        console.log("Checking Node version: .");

        var packageJson = require("./package.json"); //require was build into node
        var expectedVersion = packageJson.engines.node;
        var actualVersion = process.version; //current node version
        if( semver.neq(actualVersion, expectedVersion) ){//neq : not equal
            fail("Incorrect Node version: expedted:" + expectedVersion + ", but was: "+actualVersion);  //fail is a Jake function
        }
    });

    desc("Lint Javascript Code");
    task("lint", function(){
        //console.log("Linting Javascript: ");
        process.stdout.write("Linting Javascript: "); //using global process instead of console.log
        jshint.checkFiles({
            files: "Jakefile.js",
            options: {
                bitwise: true,    // single | or & is mistype , should be || or &&
                //curly: true,  //always put curly braces around blocks
                eqeqeq: true,
                forin: true,
                freeze: true,
                futurehostile: true,
                latedef: "nofunc",
                noarg: true,
                nocomma: true,
                nonbsp: true,
                nonew: true,
                strict: true, // required to use "use strict" at the top
                undef: true,

                node: true,
                browser: true,
            },
            globals: {

            }
        }, complete, fail);
    }, {async: true}); // async: true , tell jake not to end the task until the complete function is called.


}());