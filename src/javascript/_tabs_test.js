/**
 * Created by c.su on 7/18/16.
 */
(function () {
    "use strict";

    var assert = require("./assert.js");
    var tabs = require("./tabs.js");
    //Mocha--------------------------------------
    describe("Tabs", function(){
        it("set a new class when that element has no existing classes", function(){
            //Arrage
            var element = addElement("div");
            //Act
            tabs.initialize(element, "someClass");
            //Assert
            assert.equal(getClass(element), "someClass");
            //Reset
            //removeElement(element);
        });

        it("set a new class when that element has existing classes", function(){
            var element = addElement("div");
            element.setAttribute("class", "existingClass");

            tabs.initialize(element, "someClass");

            assert.equal(getClass(element), "existingClass someClass");

            //removeElement(element);
        });

        function getClass(element){
            return element.getAttribute("class");
        }
        function addElement(tagName){
            var newtag = document.createElement(tagName);
            document.body.appendChild(newtag);
            return newtag;
        }
        function removeElement(elem){
            elem.parentNode.removeChild(elem);
        }
    });
}());