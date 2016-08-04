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


Test Automation components:
===============================================================
1.	Assertion library - Chai		Ht11
    -	This makes it a lot easier to test your code, so you don't have to do thousands of if statements.
2.	Test framework - Mocha		Ht12
    Testing frameworks are used to organize and execute tests.

3.	Cross-Browser Test Runner - Karma	Ht13
    Testing Environments are the places where you run your tests.


Ht11: Assertions - Chai
===============================================================
1.	Assertion :   Allow you to check the result of a function. Following assertEqual function is to check if the result is correct, but we don’t write our own assertion, we use popular plugin called “Chai”.

        (function () {
            "use strict";

            assertEqual(add(3,4), 7);

            function add(a,b){
                return a+b;
            }

            function assertEqual(actual, expected){
                if(actual !== expected) throw new Error("Expected=" + expected + ", but got="+actual);
            }
        }());

2.	modify jakefile.js, under lint, files: [ “Jakefile.js”, “src/**/*.js” ]
    -	src/**/*.js: means all file under “src” folder and all the sub directory .js files, will be verify by lint
    -	So, whatever js file modified and saved under src/ will run lint
    -	sudo ./jake.sh to test
    -	sudo node src/test.js to run javascript

3.	Created an assertion function (test.js) to check if there are error:

    assertEqual(add(3,4), 7)

    function add(a,b){
        return a + b;
    }

    function assertEqual(actual, expected){
        if (actual !== expected) throw new Error("Expected: "+expected + ", but got: " + actual);
        //throw new Error will stop the program if there is no try,catch
    }

    - Sudo node src/test.js 	to test it

4.	A popular third part assertion library: Chai http://chaijs.com/
    - Sudo npm install chai --save-dev --ignore-scripts
    - sudo git add . , sudo git commit –am “message”, sudo npm rebuild
    - var assert = require("chai").assert; //to include chai library
    - assert.equal(add(3,4),7); //chai assertion function, so we don’t have to write our own
    - node src/test.js   to test

        (function () {
            "use strict";

            var assert = require("chai").assert;

            assert.equal(add(3,4), 7); //simeple one line chai replace following write your own assertEqual function

            //assertEqual(add(3,4), 7);

            function add(a,b){
                return a+b;
            }

            // function assertEqual(actual, expected){
            //     if(actual !== expected) throw new Error("Expected=" + expected + ", but got="+actual);
            // }
        }());


Ht12: Test frameworks - Mocha
============================================================
1.	A popular JavaScript test framework Mocha https://mochajs.org/
    - sudo npm install mocha --ignore-scripts --save-dev
    - sudo git add . , sudo git commit –am “message”, sudo npm rebuild
    - Instead of using
        - sudo node src/test.js,
        - use sudo node_modules/.bin/mocha src/test.js
    - Group all the test cases within describe

            describe("Addition", function(){ //use "describe" to group all the test cases
                it("adds positive numbers", function(){ //use "it" for test case, and write the   comment in the code
                    assert.equal(add(3,4),7);// Chai
                });
                it("IEEE 754 floating point", function(){
                    assert.equal(add(0.1,0.2), 0.30000000000000004); //Chai
                });
            });

    - sudo node_modules/.bin/mocha src/test.js
        - When there is no error
        - When there are errors (function add()   ,change to a - b)

2.	Mocha is TDD (Test-Driven development) framework. Another popular framework is Jasmine (BBD: Behavior-Driven development) http://jasmine.github.io/. TDD is more focus on programmer, BDD is more focus on communication for none programmer. It’s all about script differences, but they all doing the same thing.



Ht13: Cross-Browser Test Runner -Karma
=======================================================
1.	Install Karma http://karma-runner.github.io/0.13/index.html
    -	sudo npm install karma --save-dev --ignore-scripts
    -	sudo git add . , sudo git commit –am “message”, sudo npm rebuild to see if there is any binary
    -	git status //there are a lot of untrack binary files, copy them and paste them into .gitignore file:

        # Karma binaries
        node_modules/karma/node_modules/chokidar/node_modules/fsevents/build/
        node_modules/karma/node_modules/socket.io/node_modules/engine.io/node_modules/ws/node_modules/bufferutil/build/
        node_modules/karma/node_modules/socket.io/node_modules/engine.io/node_modules/ws/node_modules/utf-8-validate/build/
        node_modules/karma/node_modules/socket.io/node_modules/socket.io-client/node_modules/engine.io-client/node_modules/ws/node_modules/bufferutil/build
        node_modules/karma/node_modules/socket.io/node_modules/socket.io-client/node_modules/engine.io-client/node_modules/ws/node_modules/utf-8-validate/build/

        # Karma's binaries don't build on vanilla Windows because they require Python.
        # They're optional, so we've removed them from the repository and ignored them:
        node_modules/karma/node_modules/chokidar/node_modules/fsevents/
        node_modules/karma/node_modules/socket.io/node_modules/engine.io/node_modules/ws/node_modules/bufferutil/
        node_modules/karma/node_modules/socket.io/node_modules/engine.io/node_modules/ws/node_modules/utf-8-validate/
        node_modules/karma/node_modules/socket.io/node_modules/socket.io-client/node_odules/engine.io-client/node_modules/ws/node_modules/bufferutil/
        node_modules/karma/node_modules/socket.io/node_modules/socket.io-client/node_odules/engine.io-client/node_modules/ws/node_modules/utf-8-validate/


    -	Delete following files, so windows system won’t fail. Karma’s binarys don’t build on vanilla windows because they require Python. They are optional, so we’ve removed them from the repository and ignored them:
    -	rm -rf : Means remove directory and all the sub directory without asking question.
    -	sudo rm -rf  node_modules/karma/node_modules/chokidar/node_modules/fsevents/
    -	rm -rf node_modules/karma/node_modules/socket.io/node_modules/engine.io/node_modules/ws/node_modules/bufferutil/
    -	sudo rm -rf node_modules/karma/node_modules/socket.io/node_modules/engine.io/node_modules/ws/node_modules/utf-8-validate/
    -	sudo rm -rf node_modules/karma/node_modules/socket.io/node_modules/socket.io-client/node_odules/engine.io-client/node_modules/ws/node_modules/bufferutil/
    -	sudo rm -rf node_modules/karma/node_modules/socket.io/node_modules/socket.io-client/node_odules/engine.io-client/node_modules/ws/node_modules/utf-8-validate/

2.	To initialize Karma: sudo node_modules/.bin/karma init.
    -	Options showing in following screen shot. (use tab to swap options)
    -	Karma.conf.js will be created.


3.	To start Karma server: sudo node_modules/.bin/karma start
    -	Copy the local host url: http://localhost:9876/ to browser, that will capture the browser. When Karma run the test, it will automatically send, run and test your javascript in the browser, and report the result back to command line.

4.	Open another Terminal and sudo node_moduels/.bin/karma run
    -	This error was found from test.js : var assert = require("chai").assert; //this is only good when running under node, so use assertEqual function instead as following:

        (function () {
            "use strict";

            //var assert = require("chai").assert;

            //Mocha--------------------------------------
            describe("Addition", function(){  //use "describe" to group all the test cases
                it("adds positive numbers", function(){ //use "it" for test case, and write the comment in the code
                    //assert.equal(add(3,4), 7); //Chai
                    assertEqual(add(3,4), 7);
                });

                it("uses IEEE 754 floating point", function(){
                    //assert.equal(add(0.1, 0.2), 0.30000000000000004);//Chai
                    assertEqual(add(0.1,0.2), 0.30000000000000004);
                });

                function assertEqual(actual, expected){
                    if (actual !== expected) throw new Error("expected"+ expected + ", but was " + actual);
                }
            });


            function add(a,b){
                return a + b;
            }

        }());



    -	After modification, run sudo node_moduels/.bin/karma run
    -	When size down the width of terminal and run above again, there is a little bug and not running correctly, so change karma.conf.js, change to reporters: ['dots’].
    -	Go back to Karma server and control+ C and start again sudo node_modules/.bin/karma start
    -	Go back to another terminal and run sudo node_moduels/.bin/karma run




Ht14: Automating Karma
==============================================================================

1.	We were using Karma or Mocha to run test.js, but eventually we just want to use one commend which is jake.sh to automat everything.
    -	Run  ./jake.sh
    -	There are err because “describe”, and “it” were global variable by Mocha, so we need to use Karma to run it, otherwise Jake file can not recognize them. So we have to define them in Jakefile.js under global to prevent Mocha global from triggering lint errors.

            globals: {
            //for Mocha
                describe: false, //false means we will never change it
                it: false,
                before: false,
                after: false,
                beforeEach: false,
                afterEach: false
            }

    -	Run ./jake.sh again, and it works without errors. Check in the code.
    -	Refactor Jakefile.js code so it looks cleaner. Cut data under lint options, and globals into a new lintOptions(), and lintGlobal() function:

            options: lintOptions(),
            globals: lintGlobal()


            function lintOptions(){
                return {
                    bitwise: true,
                    eqeqeq: true,
                    forin: true,
                    freeze: true,
                    futurehostile: true,
                    latedef: "nofunc",
                    noarg: true,
                    nocomma: true,
                    nonbsp: true,
                    nonew: true,
                    strict: true,
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

2.	So now get Karma automated in Jakefile
    -	Rather using node_modules/.bin/karma start, we should use ./jake.sh karma
    -	Create a new task “karma” to start up the Karma Server, before default task, and check in the code.

            desc("Start the Karma server (run this first)");
            task("karma", function(){
                console.log("Starting Karma server:");
            });

    -	sudo npm install simplebuild-karma --ignore-scripts --save-dev , so we don’t have to use jake.exec(“node node_modules/.bin/karma”) …
    -	sudo git add . , sudo git commit –am “message”, sudo npm rebuild to see if there is any binary
    -	Add following into Jakefile.js, so we don’t have to run sudo node_modules/.bin/karma start , to start Karma server:
           var karma = require("simplebuild-karma");

            desc("Start the Karma server (run this first)");
            task("karma", function(){
                console.log("Starting Karma Server:");
                karma.start({
                    configFile: "karma.conf.js"
                }, complete, fail);
            }, { async: true });
    -	Run ./jake.sh karma to start up Karma Server
    -	Add task “test” as following, , so we don’t have to run sudo node_modules/.bin/karma run , to run the test in Karma.
            desc("Run tests for javascript in Karma");
            task("test", function(){
                console.log("Testing JavaScript");
                karma.run({
                    configFile: "karma.conf.js"
                }, complete, fail);
            }, {async: true});
    -	Add task “test” to default task as :

            task("default", ["version", "lint", "test"], ……
    -	Another terminal run: sudo ./jake.sh , this will automatically run tasks that we set up in default task, including “test” which to test JavaScript if there is any error.
    -	Karma.conf.js is written twice in Jakefile.js, so we use variable to contain it to refactor the code a better way.

		    var KARMA_CONFIG = "karma.conf.js";

		    configFile: KARMA_CONFIG

    -	To make sure JavaScript been tested in different browser with correct version, add following with ”test” task:

            expectedBrowsers: [ //this will check if JavaScript been test in both browsers
                "Chrome 49.0.2623 (Mac OS X 10.10.5)",
                "Firefox 45.0.0 (Mac OS X 10.10.0)"
            ]

    -	Open both browser : http://localhost:9876/, and run:  ./jake.sh again. In console, it will show JavaScript were being tested in both browsers.
    -	strict: false  //so when browser version is wrong, jake won't abort
    -	strict: !process.env.loose , and run sudo ./jake.sh loose=true , so even browser type is not match Jake won’t fail. If just run sudo ./jake.sh and browser type is not match jake will fail.



Ht15: Testing Android, iOS, IE, and More
======================================================================
1.	http://dev.modern.ie/tools/vms/mac/  to download Virtual machine for IE11 on Win7 , platform: VirtualBox.
2.	Download XCode for iPhone simulator
3.	http://developer.android.com/sdk/index.html Download Android studio.
    -	Configure  SDK Manager  Install packages.
    -	New project  accept default setting  click on AVD Manager icon
    -	Create Virtual Device  choose the default device and install necessary plugin click on play (green arrow) button.
    -	In console dialog:  /Users/c.su/Library/Android/sdk/tools/emulator -netdelay none -netspeed full -avd Nexus_5_API_N     Copy and paste to launch simulator next time.


1.	Modular is multiple JavaScript files, each file called modular. So far 3/2016 JavaScript doesn’t support modularity. However, there are 3 different ways to convert multiple files (modular) into single JavaScript file.
-	Common JS: ex: the one we use in test.js require(“semver”);   Use this one
-	AMD (Asynchronous module definition)
-	forthcoming AMPscript
2.	Let’s break test.js into 2 files (moudlar), by creating _addition_test.js (test code start with underscore _) which contain test cases and addition.js which only contain add() function
-	Under _addition_test.js file, use following to require addition.js. require paired up with exports.
		var addition = require("./addition.js"); //.means current directory
-	Under addition.js file, insert exports.add = add under add function; or exports.add = function add(a,b){….}. It will exports add() function for require to use.


Ht16: Modularity: Modular Tests
======================================================================
1.	Modular is multiple JavaScript files, each file called modular. So far 3/2016 JavaScript doesn’t support modularity. However, there are 3 different ways to convert multiple files (modular) into single JavaScript file.
    -	Common JS: ex: the one we use in test.js require(“semver”);   Use this one
    -	AMD (Asynchronous module definition)
    -	forthcoming AMPscript
2.	Let’s break test.js into 2 files (moudlar), by creating _addition_test.js (test code start with underscore _) which contain test cases and addition.js which only contain add() function
    -	Under _addition_test.js file, use following to require addition.js. require paired up with exports.
            var addition = require("./addition.js"); //.means current directory
    -	Under addition.js file, insert exports.add = add under add function; or exports.add = function add(a,b){….}. It will exports add() function for require to use.

3.	When running ./jake.sh , require is not recognized by Karma. So we need to install karma-commonjs.
    -	sudo npm install karma-commonjs --ignore-scripts --save-dev
    -	sudo git add . , sudo git commit –am “message”, sudo npm rebuild
4.	In karma.conf.js: add following:
    -	frameworks: ['mocha','commonjs'], //tell Karma to load framework commjs

            preprocessors: {
                'src/**/*.js' : ['commonjs'] //tell Karma to process all js files under src to get processed by commonjs plugin
            },

5.	restart Karma server :  ./jake.sh karma
6.	Another console to run ./jake.sh again, Karma can recognized require, no more error message.



Ht17: Modular in Production browserify
============================================================
1.	When running on browser, require in JavaScript still not been recognized by browser so we need to use following plugin. Browserify analysis all required files from all JavaScript files (modules) into one single bundled JavaScript file.
    - browserify: http://browserify.org   Use this
    - webpack: http://webpack.github.io

2.	sudo npm install browserify --ignore-scripts --save-dev
3.	sudo git add . , sudo git commit –am “message”, sudo npm rebuild
4.	sudo node_modules/.bin/browserify to check out browserify usage information.
5.	Create app.js under src/ , and type following. Under index.html, add <script src="app.js"></script>

        (function () {
            "use strict";

            var addition = require("./addition.js");

            console.log("Hello!");
            console.log("42 + 13 =" + addition.add(42,13));
        }());


7.	Sudo ./jake.sh run, and http://localhost: 8080. Browser console will show require is not defined.

8.	sudo node_modules/.bin/browserify src/app.js -o src/bundle.js. browserify will analysis app.js all the required files and bundle them into src/bundle.js.
    - --outfile, -o: Write the browserify bundle to this file. If unspecified, browserify prints to stdout.
9.	Change <script src = “bundle.js”></script> in index.html
10.	Sudo ./jake.sh run, now http://localhost:8080 will console out the info without err message.




Ht18: The Build Step: browserify
==========================================================================================

1.	Because bunle.js file is generated for machine to read, so when >./jake.sh , there will be lots error cause by lint. Therefore, we need to copy index.html and move bundle.js under new folder /generated/dist. To separated source and generated code, and tell jake file not to lint generated code.
2.	node_modules/.bin/browserify src/app.js -o generated/dist/bundle.js to generated bundle.js again since the path had changed.
3.	node_modules/.bin/http-server generated/dist then run http://localhost:8080
4.	We don’t check in generated files, so under .gitignore file, type in following:

        #generated files
        generated/

5.	Instead of running broswerify and server manually, add a task “build” in Jakefile.js

        desc("Build distribution directory");
        task("build", function(){
           console.log("Building distribution directory:");
        });

6.	In Jakefile.js change task “run” update to:

        desc("Run a localhost server");
        task("run", ["build"], function(){  //run task “build” before run the server, so it will generate generated/dist folder first before running the server
            jake.exec("node node_modules/http-server/bin/http-server generated/dist", {interactive: true}, complete);
            //console.log("Run http-server here");
        });

    - Sudo ./jake.sh run, now http://localhost:8080 will console out the info without err message.

7.	Delete folder “generated”
8.	Under “build” task, modify as following:

        desc("Build distribution directory");
        task("build", ["generated/dist"], function(){  // ["generated/dist"] as a task which will run before “build” task , see following directory("generated/dist")
            console.log("Building distribution directory:");
        });
        directory("generated/dist");// this will create generated/dist folder

9.	To prevent repeat typing “generated/dist” , we create constant variable on the top as following and replace wherever contain this path with this variable.

        var DIST_DIR = "generated/dist";

10.	In Jakefile.js: Under //General-purpose tasks -------- section; create a new task to erase all the generated files as following:

        desc("Erase all generated files");
        task("clean", function(){
            console.log("Erasing generated files");
        });

11.	In order to run simple shell command line in Jakefile.js, we need to install following plugin:
    -	 sudo npm install shelljs --ignore-scripts --save-dev
    -	sudo git add . , sudo git commit –am “message”, sudo npm rebuild

12.	At the top of Jakefile.js, add

        var shell = require("shelljs");

13.	Under “clean” task, add following:
	shell.rm("-rf", "generated"); //force to remove all the file under generated without any question


14.	./jake.sh clean : this will delete all the files under /generated folder. Check in files.
15.	Under “build” task add following, and check in files:

        shell.rm("-rf", DIST_DIR + "/*"); //delete all the file under generated/dist, so it won't complain index.html already exist

        shell.cp("src/index.html", DIST_DIR); // copy index.html file into generated/dist

        //run browserify to bundle the javascript
        jake.exec(
            "node node_modules/browserify/bin/cmd.js src/app.js -o " + DIST_DIR + "/bundle.js" ,
            {interactive: true, async: true},
            complete
        );

16.	Now we run the server
    -	./jake.sh run , and
    -	http://localhost:8080
    -	./jake.sh clean  , this will clean out all the file under /generated
    -	./jake.sh run again , this will work again
17.	Refactor directory as following:
    -	Create /content under src , and move index.html under it.
    -	Under build task, Change to  shell.cp("src/content/*", DIST_DIR); //copy everything under content
    -	Create /javascript under src, and move all js file under it.
    -	Under build task modify as following:

        jake.exec(
            "node node_modules/browserify/bin/cmd.js src/javascript/app.js -o " + DIST_DIR + "/bundle.js" ,
            {interactive: true, async: true},
            complete
        );
    -	./jake.sh clean    then    ./jake.sh run
    -	Under lint task, change following:
            files: ["Jakefile.js", "src/javascript/**/*.js"],

    -	On very top of Jakefile.js add directory:false as global for Jake to recognize directory variable.
18.	Under all the task,

complete, fail); //after finish 'karma' task will run complete or fail function (async function)
}, {async: true}); //async: true, after finish calling complete or fail, then
it will move on to next thing

19.	Add , {async: true}  to ‘build’, and ‘run’ task.

        task("run", ["build"], function(){//run task "build" to generate generated/dist folder before running the server
            jake.exec("node node_modules/http-server/bin/http-server " + DIST_DIR , {interactive: true, async: true}, complete);
            //interactive:true , so we can see the output.
            //complete: to run complete function when it's done.
        }, {async: true});


    -	If we don’t add async: true, it will cost race condition which means before finish running build task, run task will start executing.



Ht19: Frontend Modules
================================================================
1.	In previous JavaScript file we disable using Chai because Karma can’t recognize Chai.
    -	Download http://chaijs.com/chai.js
    -	New folder “vendor” under /src.
    -	Rename chai file with version number as chai-3.5.0.js, and move to /src/vendor folder.
    -	In additiontest.js file, on the top insert following:

                var assert = require("../vendor/chai-3.5.0.js").assert;
                //.assert is to include Chai.assert library

    -	In Karma.conf.js, change following:

            files: [
              'src/javascript/**/*.js',  //tells Karma where to load js files
              'src/vendor/chai-3.5.0.js' //tells Karma to load plugin Chai
            ],

            preprocessors: {
              'src/javascript/**/*.js': ['commonjs'], //tell Karma to process all the js files under /src/javascript to get processed by commonjs plugin
              'src/vendor/chai-3.5.0.js': ['commonjs'] //tell Karma to process chai plugin to get process by commonjs, so require("chai...") will works
            },

    -	Restart Karma , ./jake.sh karma , refresh http://localhost:9876/ browser , ./jake.sh loose=true
    -	Fix up code in additiontest.js as following

            describe("Addition", function(){  //use "describe" to group all the test cases
                it("adds positive numbers", function(){ //use "it" for test case, and write the comment in the code
                    assert.equal(addition.add(3,4), 7); //use this Chai
                    //assertEqual(addition.add(3,4), 7);   <-- take this out
                });

                it("uses IEEE 754 floating point", function(){
                    assert.equal(addition.add(0.1, 0.2), 0.30000000000000004);//use this Chai
                    //assertEqual(addition.add(0.1,0.2), 0.30000000000000004);  <-- take this out
                });

                // take this out
                // function assertEqual(actual, expected){
                //     if (actual !== expected) throw new Error("expected"+ expected + ", but was " + actual);
                // }
            });

    -	> ./jake.sh loose=true, Chai works fine
    -	> sudo npm uninstall chai --save-dev, sudo git add. , sudo git commit -am “npm version of chai is not longer needed”


2.	Because we require Chai file with version number, but when Chai version changed, and we don’t want to change all the files that include Chai. So we create a assert.js file under /javascript as following. When Chai version changed, we just update assert.js file.

        (function () {
            "use strict";
            var assert = require("../vendor/chai-3.5.0.js").assert;  // .assert is to include Chai.assert library

            module.exports = assert;

        }());


    -	In _addition_test.js file

            var assert = require("./assert.js");
            //var assert = require("../vendor/chai-3.5.0.js").assert;  <-- take this out


Ht20: Test driven development (TDD)
================================================

1.	Important thing about TDD is to use tests to remain control of the code, and use test to drive development. It contains 5 steps.
    -	1. Think: of possible tests will fail your task/code.
    -	2. Red: Write the test and it will fail, because there is no code to test yet.
    -	3. Green: Write the code to make the test pass.
    -	4. Refactor: the code that you written so far.
    -	5. Repeat: the 3 and 4 steps , and repeat 1-4 steps.


2.	Following is the baby steps to TDD the code process:

    1)	Think: Write the test code in _addition_test.js:

            describe("Subtraction", function(){
               it("subtracts positive numbers", function(){
                    addition.subtract(10,3);
               });
            });

            >./jake.sh karma,
            >./jake.sh loose=true,

    2)	Red: When running server and test from step 1, there will be error message says no subtract function.

    3)	Green: Start writing function in addition.js

             exports.subtract = function subtract(a, b){
                return a - b;
             };

            >./jake.sh loose=true,  this will pass.

    4)	Refactor: edit additiontest.js:
    
            describe("Subtraction", function(){
                it("subtracts positive numbers", function(){
                    assert.equal(addition.subtract(10,3), 7);
                });
            });

    5)	Repeat: Think through the whole process again and make a better code.



Ht21: The DOM (Document Object Model)
=======================================================
1.	In order to start a tab example code, add a screen.css under /content with index.html file.
2.	Delete unnecessary files and set up the files for tab application:
    -	Delete addition.js
    -	Cut out the code in app.js, just leave it as initial JavaScript code as following:

            (function () {
                "use strict";

            }());


    -	Clean up _addition_test.js  as following:

            (function () {
                "use strict";

                var assert = require("./assert.js");

                //Mocha--------------------------------------

                describe("Something", function(){
                    it("Something", function(){

                    });
                });


            }());


    -	./jake.sh karma, ./jake.sh to check server is running correctly.
    -	Check in the code.

3.	In _addition_test.js, type in following to create element in DOM:

        (function () {
            "use strict";

            var assert = require("./assert.js");

            //Mocha--------------------------------------

            describe("Something", function(){
                it("Something", function(){
                    var div = document.createElement("div");
                    div.innerHTML = "This is an example";
                    document.body.appendChild(div);

                    var p = document.createElement("p");
                    p.innerHTML = "A new paragraph";
                    div.appendChild(p);
                });
            });


        }());

        -	./jake.sh , to lint and test javascript, so it will refresh the code that we just updated.
        -	http://localhost:9876/
        -	right click on “DEBUG” button and open link in new tab
        -	References for document., type mdn create element in the search will come out https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement

4.	In _addition_test.js, type in following to delete element in DOM:
        -	Add following

                div.remove();

        -	And run ./jake.sh again to refresh the code for server. You will see following error message saying IE 11 doesn’t support .remove();

        -	So use following instead, and ./jake.sh, and refresh browser.

                div.parentNode.removeChild(div);


Ht22: Fist front end testing (DOM)
===========================================================================
1.	Rename _addition_test.js to _tabs_test.js and modify as following:

        (function () {
            "use strict";

            var assert = require("./assert.js");
            var tabs = require("./tabs.js");

            //Mocha--------------------------------------
            describe("Tabs", function(){
                it("has an API", function(){
                    //Arrage
                    var element = document.createElement("div");

                    //Act
                    tabs.initialize(element);

                    //Assert
                    var styles = getComputedStyle(element);
                    var display = styles.getPropertyValue("display");
                    assert.equal(display, "none");
                });
            });
        }());

2.	New tabs.js under src/javascript/ and type following:

        (function () {
            "use strict";

            exports.initialize = function initialize(element){
                element.style.display = "none";
            };

        }());

3.	./jake.sh karma, launch all the browser for testing localhost:9876, ./jake.sh to test if everything is tested and run alight.
4.	Crosse browser testing and it’s result in ./jake.sh showing some browser passed, some browser didn’t.
