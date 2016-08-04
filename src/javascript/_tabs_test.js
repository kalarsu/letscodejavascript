/**
 * Created by c.su on 7/18/16.
 */
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