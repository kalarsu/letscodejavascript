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
            var element = createElement("div");

            //Act
            tabs.initialize(element);

            //Assert
            assert.equal(getDisplayProperty(element), "none");

            //Reset
            removeElement(element);
        });

        function createElement(tagName){
            var newtag = document.createElement(tagName);
            document.body.appendChild(newtag);
            return newtag;
        }
        function getDisplayProperty(elem){
            var styles = getComputedStyle(elem);
            return styles.getPropertyValue("display");
        }
        function removeElement(elem){
            elem.parentNode.removeChild(elem);
        }
    });
}());