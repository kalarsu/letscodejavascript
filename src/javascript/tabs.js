/**
 * Created by c.su on 8/4/16.
 */
(function () {
    "use strict";

    var classList = require("../vendor/classList.js");

    classList.shim();

    exports.initialize = function initialize(element, className){

        element.classList.add(className);

        // var classes = element.getAttribute("class");
        //
        // //console.log("1className="+classes);
        // if (classes ===null){
        //     classes = className;
        // }else{
        //     classes += " " + className;
        // }
        // //console.log("2className="+classes);
        // element.setAttribute("class", classes);
    };
}());