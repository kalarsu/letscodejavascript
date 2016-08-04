/**
 * Created by c.su on 7/18/16.
 */
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

            div.parentNode.removeChild(div);
        });
    });


}());