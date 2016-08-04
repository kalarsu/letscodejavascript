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

            tabs.initialize();
            // var div = document.createElement("div");
            // div.innerHTML = "This is an example";
            // document.body.appendChild(div);
            // div.parentNode.removeChild(div);
        });
    });


}());