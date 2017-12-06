/*global QUnit steal*/

/**
   Usage:
         See the QUnit [api](http://api.qunitjs.com/)
*/

var moduleName = "spec_qunit.js";

import $ from "jQuery"; // dependency for qunit
//import myModuleUnderTest from "myModuleUnderTest"; // SUT

//debug only
function confirmjQueryLoaded() {
    try {//confirm if jQuery is loaded
         console.log('  jQuery version: ' + $.fn.jquery + ' loaded.');}
    catch(err) {
         console.log('  Were you expecting jQuery ...');
         console.log(err);
    }
}//end function confirmjQueryLoaded

var test01 = function (argument) {

    console.log("In module " + moduleName + " invoked function test01");
    //console.log("  SUT: myModuleUnderTest");
    //console.dir(myModuleUnderTest);
    confirmjQueryLoaded();
    console.log(`  QUnit  version: ${QUnit.version} loaded`);
    //console.dir(QUnit);
    steal.dev.log(`  steal.dev.log() is functioning`);

    // ES6 shortcut for QUnit.test, Qunit.skip etc
    const { test, skip, module, todo } = QUnit;

    /* * * * * * * * * * * * * * * * * * * * * * * * * */
    module( "steal" );
      steal.dev.log(`  steal function:`);
      console.dir(steal);

    todo( "version under test === steal.version", function( assert ) {
        assert.equal( steal.version, "1.6.2","Expecting version 1.6.2" );
    });

    test("is 1) a function that 2) has sixteen properties and methods.",
      function( assert ) {
        assert.equal(typeof(steal),'function',"Is a function.");
        var pmNames = Object.keys(steal);//array of property & method names
        assert.equal(pmNames.length,16,"Has sixteen properties and methods");
    });

    test("FYI `steal.loader` object methods and properties are exactly similar"+
         " to `steal.System` object",
      function( assert ) {
        var arry1 = Object.keys(steal.loader);//array of property & method names
        var arry2 = Object.keys(steal.System);//array of property & method names
        var similar = ( JSON.stringify(arry1) === JSON.stringify(arry2) );
        assert.equal(similar,true,"Are similar objects");
    });


    /* * * * * * * * * * * * * * * * * * * * * * * * * */
    module( "System" );

    test("is 1) an object that 2) has fifty five properties and methods.",
      function( assert ) {
        assert.equal(typeof(System),'object',"Is an object");
        var pmNames = Object.keys(System);//array of property & method names
        assert.equal(pmNames.length,55,"Expecting 55 properties and methods");
    });

    test("can also be called like steal.System",
      function( assert ) {
        assert.equal(typeof(steal.System),'object',"It is an object");
        var pmNames = Object.keys(steal.System);//array property & method names
        assert.equal(pmNames.length,55,"It has 55 properties and methods");
    });


    /* * * * * * * * * * * * * * * * * * * * * * * * * */
    module( "steal.loader method" );

    test("steal.loader.allowModuleExecution(name) expects a valid module name"+
         " as input and outputs an object promise ",
      function( assert ) {
        var name = "try_any_valid_string";
        var okToExecute = steal.loader.allowModuleExecution(name);
        assert.equal( typeof(okToExecute),'object',"The output is an object {Promise}." );
        console.log( "  okToExecute" );
        console.dir( okToExecute );

        console.log( "  okToExecute.then()" );
        okToExecute.then(
          function(value) { console.log("    resolved: " + value);},
          function(value) { console.log("    rejected: " + value);}
        );

        assert.equal( okToExecute._handler.resolved,true,"It is okay to"+
                    " execute the valid module named with: " + name );
    });





}; //end function Test01



// Run tests above when document is ready
$(document).ready(function(){
  console.log("In module " + moduleName + " DOMContentLoaded, Document ready for testing!");
     QUnit.config.autostart = false;
     test01(); // make the specs available
     QUnit.start();
});