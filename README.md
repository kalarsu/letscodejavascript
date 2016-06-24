How To Course:
==============

HT3: AUTOMATION: TO CREATE AN AUTOMATED BUILD
--------------


1.  New javascript file Jakefile.js, to write an automated build. For other people to come in and to make a build from an existing system with software installed. Here is the automation to rebuild the system from scratch.

        (function(){
            "use strict";    //help javascript prevent errors, not allow sloppy coding
            console.log("\n\nBUILD OK");
        }());

    - To run the build, type: node Jakefile.js , will see the result.
	- git status
	- git add . (. Means all files)
	- git commit –am “Got a basic ‘hello world’ program running”
    - git push     ,this will push all the changes to github

2. Build automation needs:
    - Self-Documentation
    - Command – Line Processing
    - Dependency Resolution
    - Code, Not Configuration
    - Straightforward and Simple

3. Instead of writing your own Jakefile.js, there are tools like Grunt, Gulp and Jake. Will use this build tool: Jake

4.
