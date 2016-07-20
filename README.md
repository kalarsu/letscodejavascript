Webstorm prefix code:
================================
perferences -> editor -> file and code templates

How To Course:
==============

To try the code on your computer:
-----------------------------------
1. Install [Node.js v5.5.0]
2. Install [Git]
3. Open command prompt and go the the directory that contain the project.
4. Copy the source repository to your computer : 'git clone https://github.com/kalarsu/letscodejavascript.git'
5. Change to the project directory: 'cd letscodejavascript'

To run the build
1. Run './jake.sh' (Mac), or 'jake' (Windows)


To reset to a clean directory
1. sudo git clean -fdx         (Ereased generated fiels. f: force clean to occor, d: remove all directories, X:remove)
2. sudo git reset --hard       (This is to reset files to last commit status. Reset any changes)
3. git pull
4. ./jake.sh



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
        - Jake is a automation build tool
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

        i.	new file: jake.sh, type in node_modules/.bin/jake $* ($* will pass in parameter in like  --help  --tasks or -T )
        ii.	because this file doesn’t have permission to execute, need to do:
            chmod +x jake.sh     (chmod : change mode, +x: adding execution permission)
        iii.	 ./jake.sh : now this will run
        iv.	new jake.cmd   and type in node_modules\.bin\jake   %*, in command line just type >jake. This is for windows user

b.	sudo git commit  --amend, and shift+z+z to save the changes, this is to modify from previous commit.
c.	in jake.cmd file, add at the first line as #!/bin/sh  : this is a build in command prom for Unix, it tells Unix which command to use when running shell script. It’s using #!/bin/sh to understand $*, so the jake.sh looks like following now.

#!/bin/sh

node_modules/.bin/jake $*

d.	in jake.cmd modify as following, @echo off will not show node_modules\.bin\jake path in the command line

@echo off

node_modules\.bin\jake %*

e.	In another machine, when need to recover back to a clean repositories, do fillowing
    >sudo git clean –fdx:
    >sudo git reset --hard: reset files to last commit status
    >git pull  ,to get all the files from git and then
    >npm rebuild
i.	clean: delete untracked files ,
ii.	 -fdx: f: force clean to occur, d: remove directories too, x: remove excluded(gitignore would files too)
    This will reset to clean files, when just git pull from git repository. So before running jake , need to do >npm rebuild.
f.	New .gitignore file, and type in following

        #Mac OS X
        .DS_Store

        #WebStorm
        .idea/workspace.xml

        # npm
        node_modules/**/.bin/

    This is to ignore unnecessary file to check in.

g.	Sudo rm –rf node_modules/.bin    Delete unnecessary .bin files
    - rm: delete files
    - –rf: recursively delete directories, force everything to delete
h.	Add npm rebuild in the second line for both jake.sh and jake.cmd. So when git pull a clean repositories and run >sudo ./jake.sh  or >jake(for windows), it will automatic build the project (automatically install all the dependencies).

        @echo off

        echo Building npm modules:
        npm rebuild

        node_modules\.bin\jake $*

i.	Add following into jake.sh and jake.cmd
        [ ! -f node_modules/.bin/jake ] && echo "Building npm modules:" && npm rebuild
    from jake.sh file: if node_modules/.bin/jake doesn’t exists then print out message and npm rebuild. So it doesn’t npm rebuild all the time when running >./jake.sh


    •For jake.sh file: if node_modules/.bin/jake doesn’t exists then print out message and npm rebuild, and npm rebuild. Complete code as following:

            #!/bin/sh

            [ ! -f node_modules/.bin/jake ] && echo "Building npm modules:" && npm rebuild

            node_modules/.bin/jake $*



    •For jake.cmd (Windows) code as following:

            @echo off

            if not exist node_modules\.bin\jake(
                echo building npm modules:
                call npm rebuild
            )

            call node_modules\.bin\jake %*


    Now , In another machine, when need to recover back to a clean repository, do following:
        sudo git clean -fdx:
        sudo git reset --hard
        git pull
        sudo ./jake.sh       : Jake will automatically rebuild
        sudo ./jake.sh –T     : list all the tasks




Ht6: External Dependencies:
------------------------------------------

1.	When rebuild, we should also check if node version matching. Adding new task(“version”) in jakefile.js as following:

        (function(){
            "use strict";

            desc("default build");
                task("default", ["version"], function(){ //run version before running default
                        console.log("\n\nBUILD OK");
            });

            desc("Check Node version");
            task("version", function(){
                console.log("Checking Node version: .");
                let actualVersion = process.version;
                if(actualVersion !== EXPECTED_NODE_VERSION){
                  fail("Incorrect Node version: expedted:" + EXPECTED_NODE_VERSION + ", but was: "+actualVersion);  //fail is a Jake function
                }
            });
        }());


        ./jake.sh –T    to see all the tasks
        ./jake.sh version   to run task version

2.	Add “engines”: {“node”: “5.5.0”} to package.json, for Jakefile.js to fetch and verify node version. Package.json looks as following:
    (ref: https://docs.npmjs.com/files/package.json  for engine)

        {
          "name": "letscodejavascript",
          "version": "1.0.0",
          "private": true,
          "engines":{
            "node": "5.5.0"
          },
          "devDependencies": {
            "jake": "^8.0.12"
          }
        }



3.	In Jakefile.js change code as following. (get node version from package.json)

        (function(){
            "use strict";//help javascript prevent errors, not allow sloppy coding

            desc("default build");//documentation for following task, >jake --tasks or >jake -T  will show all the tasks, this is what it meant self-documentation
            task("default", ["version"], function(){ //run "version" task before running default
                console.log("\n\nBUILD OK");
            });

            desc("Check Node version");
            task("version", function(){
                console.log("Checking Node version: .");


                var packageJson = require("./package.json"); //require was build into node
                var expectedVersion = "v" + packageJson.engines.node;

                let actualVersion = process.version; //current node version
                if(actualVersion !== expectedVersion){
                    fail("Incorrect Node version: expedted:" + expectedVersion + ", but was: "+actualVersion);  //fail is a Jake function
                }
            });

        }());


4.	sudo npm install semver --ignore-scripts --save-dev:
        (1) semver is a parser for node for parsing version number.
        (2) https://github.com/npm/node-semver
        (3) It will check 2 version number is equal and ignore the first letter. A leading "=" or "v" character is stripped off and ignored.

        a.	--ignore-scripts: because we would like to check into git
        b.	--save-dev: save as development dependency
5.	git add .,    git commit –am “message”: check in semver
6.	sudo npm rebuild: to see if there is dependency we need to ignore
7.	git status: looks like not no file need to be ignore
8.	In Jakefile.js, add var semver = require("semver"); at the top, and in if statement change to if( semver.neq(actualVersion, expectedVersion) ) //neq = not equal, this will ignore the first “v” character.
        (function(){
            "use strict";//help javascript prevent errors, not allow sloppy coding
            var semver = require("semver");

            desc("default build
            task("default", ["version"], function(){
            console.log("\n\nBUILD OK");
            });

            desc("Check Node version");
            task("version", function(){
                console.log("Checking Node version: .");

                var packageJson = require("./package.json"); //require was build into node
                var expectedVersion = packageJson.engines.node;

                let actualVersion = process.version; //current node version
                if( semver.neq(actualVersion, expectedVersion) ){//neq : not equal
                    fail("Incorrect Node version: expedted:" + expectedVersion + ", but was: "+actualVersion);
                }
            });
        }());





Ht7: Lint: Safe coding
=================================

-	Static code analysis
-	Link will look into source code and find error without running it.
-	https://en.wikipedia.org/wiki/List_of_tools_for_static_code_analysis#JavaScript

-   IIFE around every file : ( function(){}() ), to have a function expression and use () to execute right away. And use ( ………..) to wrap it called IIFE. So nothing run at global scope.
-   “use strict”;    This tell JavaScript to check error at run time.


1.	sudo npm install jshint --ignore-scripts --save-dev
2.	git add .,    git commit –am “message”: check in jshint
3.	sudo npm rebuild: to see if there is dependency we need to ignore
4.	git status: looks like not no file need to be ignore
5.	use sudo node_modules/.bin/jshint to run
6.	sudo node_modules/.bin/jshint --help
7.	sudo node_modules/.bin/jshint Jakefile.js Check if there is error in Jakefile.js
8.	Add task into Jakefile.js as following: so we don’t have to run line 6 long script.
    Ref: http://jakejs.com/docs#running_shell-commands:_`jakeexec`_and_`jake.create_exec`


        task("default", ["version", "lint"], function(){ //run "version","lint" task before running default
            console.log("\n\nBUILD OK");
        });

        desc(“Lint Javascript Code”);
        task("lint", function(){
            console.log("Linting Javascript: .");
            jake.exec("node node_modules/jshint/bin/jshint Jakefile.js", {interactive: true}, complete);
        }, { async: true });

-	complete: //run complete funtion when it's done
-	async: true: tell jake not to end the task until the complete function is called

9.	sudo ./jake.sh  to see if lint task is working good to check jakefile.js file error.
10.	Running jake.exec is a bit slow, so let’s use simplebuild plugin as following, to simplify the script.
a.	ref: https://www.npmjs.com/package/simplebuild-jshint
b.	sudo npm install simplebuild-jshint --ignore-scripts --save-dev
c.	document under https://www.npmjs.com/package/simplebuild-jshint
11.	git add .,    git commit –am “check in simplebuild”
12.	sudo npm rebuild: to see if there is dependency we need to ignore
13.	git status: looks like not no file need to be ignore
14.	In Jakefile.js:
-	var jshint = require("simplebuild-jshint")
-	Command out jake.exec(“….”)
-	Under task (“Lint”, function(){    …….   }, update to following:


        process.stdout.write("Linting Javascript: ");//using global process instead of console.log

        jshint.checkFiles({
            files: "Jakefile.js",
            options: {
                bitwise: true, //to check if bitwise issue single & or | typeo, detail at http://jshint.com/docs/options/
                eqeqeq : true
            },
            globals: {}
        }, complete, fail); //complete, fail are Jake build in




Ht8, 9: JavaScript Gotchas
====================================

1.	Using IFEE, to prevent creating global scope variable, and execute right away.
        (function(){
        }());
2.	Variable scope is defined for closest function , not other {} - elastic scope like if statement.

    Function test(){
        var xx = true;
        If(xx == true){
            var xx = “false”;
        }
        console.log(“xx=”+xx); // result xx=false
    }

In this case yy doesn’t belongs to if {} , instead, it belong to test() function scope.

3.	In jakefile.js, use bitwise: true  //to check if bitwise issue (single & or | typo), detail at http://jshint.com/docs/options/
-	“use strict” in javasscript will do the run time checking, but using Lint within jakefile.js will check before run time.
-	Now the code with bitwise looks like:

        task("lint", function(){
            process.stdout.write("Linting Javascript: ");
            jshint.checkFiles({
                files: "Jakefile.js",
                options: {
                    bitwise: true
                },
                globals: {}
            }, complete, fail);
        }, {async: true});

4.	curly: true // always put curly braces around blocks
5.	eqeqeq : true //to see error caused by ==, instead, should use ===
        function test(){
            var a = 0;
        var b = [];
        if(a==b) console.log(“Equal”); //this result will be Equal, so use === to avoid this
        }
6.	freeze: true,//prohibits overwriting prototype of native object such as Array, and Date
7.	latedef: "nofunc" // prohibits the use of a variable before it was defined, nofunc: not for function. Note: Call a function before it declares is valid as following, because JavaScript hoisting function to the top.

        callme();

        function callme(){
        }

However, using a variable before it declared is invalid as following. Variable will be hoisted to the top as well, but only var x will be hoisted not the value.

        Console.log(x);
        var x=19;

ref: http://www.w3schools.com/js/js_hoisting.asp

8.	strict: true;// required to use "use strict" at the top
9.	undef: true, // prohibits the use of explicitly undeclared variables.
    This will start complain a lot of errs. So type in following in #10, #11
10.	node: true, browser: true // we are using node and browser
11.	under globals:
        globals: {
            desc: false, // we sue desc, task, complete, fail, but we don’t change them
            task: false,
            complete: false,
            fail: false
        }

//meaning we are not changing it to prevent desc, task, not defined.
However, we only use desc, task, complete, fail in jake.js file , so put them at the top of js file and command out as
	/* globals desc: false, task: false, complete : false, fail: false */





Ht10: Localhost server: Automated Cross browser testing
===============================================================

1.	Create new folder src and new html file index.html for cross browsers testing. When hover this index.html file , top right corner will appear different browser icon and just click either of them to test this file.
2.	However, we will install http-server, so the result will be closest to the production.
3.	sudo npm install http-server --ignore-scripts --save-dev
4.	./node_modules/.bin/http-server src : will activate the web server
5.	according to the message show on terminal, http://127.0.0.1:8080, or http://localhost:8080 : will launch the index.html page
6.	sudo git add . , sudo git commit –am “message”, sudo npm rebuild
7.	Adding a task “run” as following: //this will execute the command and run the web server

        desc("Run a localhost server");
        task("run", function(){
            jake.exec("node node_modules/http-server/bin/http-server src", {interactive: true, async: true}, complete);
        });

-	interactive: true: so we can see the output
-	complete: To run the complete function when it’s don.

Add jake:false  in Jakefile.js on the top command line within globals as following:
-	This is to define jake as a global variable.
	/* globals jake:false, desc:false, task:false, complete:false, fail:false */
8.	./jake.sh run















