/**
 * Created by c.su on 7/18/16.
 */
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