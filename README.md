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
4.  Steps to re-set up environment that other person doesn’t need to install anything just git pull then can run on another machine:
    a.	sudo npm uninstall jake –g
    b.	npm init : this will generate package.json. Ref: docs.npmjs.com/files/package.json
    c.	clean the code as following
            {
             "name": "letscodejavascript",
             "version": "1.0.0",
             "private": true
           }

        //private: true ,  this will tell npm if someone try to publish it it will cause error

    d.	sudo npm install jake --ignore-scripts --save-dev:
        - install locally and -ignore-scripts don’t check in binary files from jake to git.
        - --save-dev: Jake will save the setting into package.json.
    e.	npm rebuild: go through and run all installed script and run all installed files
    f.	sudo node_modules/.bin/jake : since jake wasn’t installed –g globaly, use this command to run.
    g. At other machine to download the code from git and run:
        - git pull
        - npm rebuild
        - node_modules/.bin/jake



 HT5: Shell Scripting
 --------------

    h. to avoid typing sudo node_modules/.bin/jake all the time, adding following shell script:
       - new file: jake.sh, type in node_modules/.bin/jake $* ($* will pass in parameter in like  --help  --tasks or -T )
       - because this file doesn’t have permission to execute, need to do: chmod +x jake.sh     (chmod : change mode, +x: adding execution permission)
       - sudo ./jake.sh : now this will run






























