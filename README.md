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
i.	rm: delete files
ii.	–rf: recursively delete directories, force everything to delete
h.	Add npm rebuild in the second line for both jake.sh and jake.cmd. So when git pull a clean repositories and run >sudo ./jake.sh  or >jake(for windows), it will automatic build the project (automatically install all the dependencies).

@echo off

echo Building npm modules:
npm rebuild

node_modules\.bin\jake $*

i.	Add following into jake.sh and jake.cmd
[ ! -f node_modules/.bin/jake ] && echo "Building npm modules:" && npm rebuild : from jake.sh file: if node_modules/.bin/jake doesn’t exists then print out message and npm rebuild. So it doesn’t npm rebuild all the time when running >./jake.sh

#!/bin/sh

[ ! -f node_modules/.bin/jake ] && echo "Building npm modules:" && npm rebuild

node_modules/.bin/jake $*




























