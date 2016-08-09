/**
 * Created by c.su on 7/18/16.
 */
(function () {
    "use strict";

    var assert = require("./assert.js");
    var tabs = require("./tabs.js");

    //Mocha--------------------------------------
    describe("Tabs", function(){
        it("hides an element", function(){
            //Arrage
            var element = createElement("div");

            //Act
            tabs.initialize(element, "someClass");
            
            //Assert
            assert.equal(getClass(element), "someClass");


            //Reset
            removeElement(element);
        });

        function getClass(element){
            return element.getAttribute("class");
        }

        function createElement(tagName){
            var newtag = document.createElement(tagName);
            document.body.appendChild(newtag);
            return newtag;
        }
        function removeElement(elem){
            elem.parentNode.removeChild(elem);
        }
    });
}());