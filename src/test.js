/**
 * Created by c.su on 7/18/16.
 */
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