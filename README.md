How To Course:
--------------------

HT3: AUTOMATION: TO CREATE AN AUTOMATED BUILD
========================================================

1.  New javascript file build.js, to write an automated build.

    (function(){
       "use strict";//help javascript prevent errors, not allow sloppy coding

       console.log("BUILD OK");
    }());

    . To run the build, type: node build.js , will see the result.
	. git status
	. git add . (. Means all files)
	. git commit –am “Got a basic ‘hello world’ program running”

2. Build automation needs:
    a. Self-Documentation
    b. Command – Line Processing
    c. Dependency Resolution
    d. Code, Not Configuration
    e. Straightforward and Simple

3. Instead of writing your own build.js, use this build tool: Jake
