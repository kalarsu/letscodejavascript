How To Course:
==============

HT3: AUTOMATION: TO CREATE AN AUTOMATED BUILD
--------------


1.  New javascript file build.js, to write an automated build. For other people to come in and to make a build from an existing system with software installed. Here is the automation to rebuild the system from scratch.

        (function(){
            "use strict";    //help javascript prevent errors, not allow sloppy coding
            console.log("\n\nBUILD OK");
        }());

    - To run the build, type: node build.js , will see the result.
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

3. Instead of writing your own build.js, there are tools like Grunt, Gulp and Jake. Will use this build tool: Jake

4. Sudo npm install jake –g
5. Rename build.js to Jakefile.js
6. >jake      this will run the Jakefile.js, but couldn’t find default task
7. in Jakefile.js add default task as following

        (function(){
            "use strict";//help javascript prevent errors, not allow sloppy coding

            console.log("\n\nBUILD OK");

            task("default", function(){
                console.log("Hello, I am the default task");
            });
        }());


8. command type >jake    this time, it will run good.

9. Add in a new task as following

    task("gooble", function(){
        console.log("gooble task");
    });

    command type >jake gooble      this will run task gooble

10. Add desc(“Default Task”) before default task, This will be documentation for that task.

        desc("default task");//documentation for following task
        task("default", function(){
            console.log("Hello, I am the default task");
        });

        >jake –T   or >jake –tasks , this will sow all the tasks with description.

    This is what it meant, self-documentation.

11. Clean the code as following

        (function(){
            "use strict";//help javascript prevent errors, not allow sloppy coding

            desc("default build");//documentation for following task, >jake --tasks or >jake -T  will show all the tasks, this is what it meant self-documentation
            task("default", function(){
                console.log("\n\nBUILD OK");
            });
        }());

12.	Check in the code







HT4: Dependency
--------------

1.	When moving the code from one machine to another, in order to make nodeJS and jake work, the other machine has to install all the dependencies. That was not automation.
2.	There are 2 dependency management strategies:
    a.	Automatically install dependencies from somewhere else.
    b.	Include dependencies in the source code repository.    Pro: Ensures correct dependency version is available.
3.	So we don’t use sudo npm install jake –g. Because when other people try to download the source code, then have to install all the dependencies that’s not automated build.






























