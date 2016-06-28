(function(){
    "use strict";//Tell javascript at run time to check error , help javascript prevent errors, not allow sloppy coding

    var semver = require("semver");

    desc("default build");//documentation for following task, >jake --tasks or >jake -T  will show all the tasks, this is what it meant self-documentation
    task("default", ["version"], function(){ //run "version" task before running default
        console.log("\n\nBUILD OK");
    });

    desc("Check Node version");
    task("version", function(){
        console.log("Checking Node version: .");

        var packageJson = require("./package.json"); //require was build into node
        var expectedVersion = packageJson.engines.node;

        let actualVersion = process.version; //current node version
        if( semver.neq(actualVersion, expectedVersion) ){//neq : not equal
            fail("Incorrect Node version: expedted:" + expectedVersion + ", but was: "+actualVersion);  //fail is a Jake function
        }
    });
}());