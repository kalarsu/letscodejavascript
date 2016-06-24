(function(){
    "use strict";//help javascript prevent errors, not allow sloppy coding

    desc("default build");//documentation for following task, >jake --tasks or >jake -T  will show all the tasks, this is what it meant self-documentation
    task("default", function(){
        console.log("\n\nBUILD OK");
    });

}());