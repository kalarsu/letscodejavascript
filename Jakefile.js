(function(){
    "use strict";//help javascript prevent errors, not allow sloppy coding

    var EXPECTED_NODE_VERSION = "v5.5.0";

    desc("default build");//documentation for following task, >jake --tasks or >jake -T  will show all the tasks, this is what it meant self-documentation
    task("default", ["version"], function(){ //run "version" task before running default
        console.log("\n\nBUILD OK");
    });

    desc("Check Node version");
    task("version", function(){
        console.log("Checking Node version: .");

        let actualVersion = process.version; //current node version
        if(actualVersion !== EXPECTED_NODE_VERSION){
            fail("Incorrect Node version: expedted:" + EXPECTED_NODE_VERSION + ", but was: "+actualVersion);  //fail is a Jake function
        }
    });

}());