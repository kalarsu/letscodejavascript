/* globals jake:false, desc:false, task:false, complete:false, fail:false */
//defint all the global variable only for this jakefile.js

(function(){
    "use strict";//Tell javascript at run time to check error , help javascript prevent errors, not allow sloppy coding

    var semver = require("semver"); //semver is a parser for node for parsing version number
    var jshint = require("simplebuild-jshint");
    var karma = require("simplebuild-karma");
    var KARMA_CONFIG = "karma.conf.js";

    //******** General-purpose tasks ----------------------------

    desc("Start the Karma server (run this first)");
    task("karma", function(){
        console.log("Starting Karma server:");
        karma.start({
            configFile: KARMA_CONFIG
        }, complete, fail);
    }, {async: true});

    desc("default build");//documentation for following task, >jake --tasks or >jake -T  will show all the tasks, this is what it meant self-documentation
    task("default", ["version", "lint", "test"], function(){ //run "version","lint" task before running default
        console.log("\n\nBUILD OK");
    });

    desc("Run a localhost server");
    task("run", function(){
        jake.exec("node node_modules/http-server/bin/http-server src", {interactive: true, async: true}, complete);
        //interactive:true , so we can see the output.
        //complete: to run complete function when it's done.
    });


    //******** Supporting tasks ---------------------------------

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
            files: ["Jakefile.js", "src/**/*.js"],
            options: lintOptions(),
            globals: lintGlobal()
        }, complete, fail);
    }, {async: true}); // async: true , tell jake not to end the task until the complete function is called.


    desc("Run tests in Karma");
    task("test", function(){
        console.log("Testing Javascript:");
        karma.run({
            configFile: KARMA_CONFIG,
            expectedBrowsers: [
                "Chrome 51.0.2704 (Mac OS X 10.11.5)",
                "Firefox 47.0.0 (Mac OS X 10.11.0)",
                "Safari 9.1.0 (Mac OS X 10.11.5)"
            ],
            strict: !process.env.loose  //run sudo ./jake.sh loose=true , so even browser type is not match Jake won’t fail. If just run sudo ./jake.sh and browser type is not match jake will fail.
        }, complete, fail);
    }, {async: true});




    function lintOptions(){
        return {
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
            browser: true
        };
    }

    function lintGlobal(){
        return{
            //Mocha
            describe: false, // false means , we will never change it
            it : false,
            before: false,
            after: false,
            beforeEach: false,
            afterEach: false
        };
    }


}());