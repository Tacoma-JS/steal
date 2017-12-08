/*global QUnit steal System*/

/**
 * QUnit test specifications to help gain understanding of the steal.js methods
 * and properties.  You can do something like `console.dir(steal)` to
 * display these in alphabetical order.  The tests are in the same order.
 *
 * Passing tests do NOT mean that `steal` is functioning as expected, it only
 * means that the tests were written retrospectively to pass the way it is
 * working, which may be different than the expectation.
 *
 * QUnit Usage:
 *       See the [api](http://api.qunitjs.com/)
*/

var moduleName = "spec_qunit.js";

import $ from "jQuery"; // dependency for qunit
//import myModuleUnderTest from "myModuleUnderTest"; // SUT
import myImportedLoader from "@loader";

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




    /**
     * Steal version 1.6.2 under test === steal.version
     * from https://cdn.jsdelivr.net/npm/steal@1.6.2/steal.js
     * (This property does not exist, yet.)
    */
    todo( "version 1.6.2 under test === steal.version . From"+
          " https://cdn.jsdelivr.net/npm/steal@1.6.2/steal.js",
      function( assert ) {
        assert.equal( steal.version, "1.6.2",
                      "Expecting `steal.version` to return 1.6.2" );
    });



    /* * * * * * * * * * * * * * * * * * * * * * * * * */
    module( "steal" );
    /* * * * * * * * * * * * * * * * * * * * * * * * * */

      steal.dev.log(`  steal function:`);
      console.dir(steal);


    /**
     * `steal` is a function that has sixteen properties and methods.
    */
    test("is 1) a function that 2) has sixteen properties and methods.",
      function( assert ) {
        assert.equal(typeof(steal),'function',"Is a function.");
        var propertyMethodNames = Object.keys(steal);//array
        propertyMethodNames.sort();
        var addToEnd = propertyMethodNames.shift();// for readability...
        propertyMethodNames.push(addToEnd);// put `System` at end of list
        assert.equal(propertyMethodNames.length,16,
                     "Has sixteen properties and methods: " + propertyMethodNames );
    });



   /**
    *     The `addExtension` method expects a function as input, and pushes
    *     that function onto the `System._extensions` array if it exists,
    *     else calls input function with System as argument like `in(System)`
    *     There is no return value.
    */
    test("`addExtension` method expects a function as input, and pushes "+
         "that function onto the `System._extensions` array if it exists, "+
         "else calls input function with System as argument like `in(System)`"+
         ". There is no return value.",
      function( assert ) {
        var f1 = JSON.stringify(steal.addExtension);
        var f2 = JSON.stringify(steal.addStealExtension);
        var similar = ( f1 === f2 );// compare text of each function

        assert.equal(similar,true,"Is the same as addStealExtension");

        var btf = function BogusTestFunction(inp) {return inp;};
        steal.addExtension( btf );

        function didItLoad(inp) { return inp.name === "BogusTestFunction" }
        var f3 = System._extensions.find( didItLoad );//find BogusTestFunction

        assert.equal( f3("itworks"),"itworks",
                      " BogusTestFunction extension loaded ok." );
    });


/**
 * `Clone` can receive nothing as input and returns a copy of the `steal`
 * object with the `System` object copied onto steal as the `loader`
 * object such that System === steal.loader.
*/
    test("`clone` can receive nothing as input and returns a copy of the "+
         "steal object with the `System` object copied onto steal as the "+
         "`loader` object such that steal.loader === System.",
      function( assert ) {
        var testMe = JSON.stringify( steal.clone() );
        var expectedValue = JSON.stringify( steal );
        assert.equal(testMe,expectedValue,
                    "Copies itself so that steal.clone() returns steal");
        assert.equal(steal.loader,System,"steal.loader === System");
    });



    /* * * * * * * * * * * * * * * * * * * * * * * * * */
    module( "steal.loader" );
    /* * * * * * * * * * * * * * * * * * * * * * * * * */

    /**
     * FYI `steal.loader` object methods and properties are exactly similar
     * to the `steal.System` object are exactly similar to System. The
     * steal.System name is kept for backwards compatibility.
    */
    test("`steal.loader` object methods and properties are exactly similar"+
         " to the `steal.System` and `System` object by definition.",
      function( assert ) {
        assert.equal(typeof(steal.loader),'object',"steal.loader is an object");
        assert.equal(typeof(steal.System),'object',"steal.System is an object");
        var arry1 = Object.keys(steal.loader);//array of property & method names
        var arry2 = Object.keys(steal.System);//array of property & method names
        var arry3 = Object.keys(System);//array of property & method names
        var similar = ( JSON.stringify(arry1) === JSON.stringify(arry2) );
        assert.equal(similar,true,
                     "`steal.loader` and `steal.System` are similar objects");

        similar = ( JSON.stringify(arry1) === JSON.stringify(arry3) );
        assert.equal(similar,true,
                     "`steal.loader` and `System` are similar objects");



        assert.equal(1,1,"Use steal.loader, the name steal.System is being "+
                     "kept for backwards compatibility");

        /*
           The API docs recommend this usage:
           ` import myImportedLoader from "@loader"; `
        */
        assert.equal( Object.keys(myImportedLoader).length,55,
                    "`import myImportedLoader from '@loader' ` imports "+
                    "steal.loader which has 55 properties and methods");

        var propertyMethodNames = Object.keys(steal.loader);//array
        propertyMethodNames.sort();
        var pmList = QUnit.dump.parse( propertyMethodNames );
        assert.equal(propertyMethodNames.length,55,
                     "steal.loader has 55 properties and methods:"+
                     pmList);


        var diff = Object.keys(steal.loader).length - Object.keys(steal.System).length;
        assert.equal(diff,0,"steal.System has the same quanity");
    });//end test


    /* * * * * * * * * * * * * * * * * * * * * * * * * */
    module( "steal.loader METHOD" );
    /* * * * * * * * * * * * * * * * * * * * * * * * * */


/**     `steal.loader.allowModuleExecution(name)` expects a valid string
        in `name` as input and returns an object promise that notifies when
        the property steal.loader._allowModuleExecution[name] is set.
*/
    test("`steal.loader.allowModuleExecution(name)` expects a valid string "+
        "in `name` as input and returns an object promise that notifies when "+
        "the property steal.loader._allowModuleExecution[name] is set.",
      function( assert ) {
        var name = "try_any_valid_string"; // only testing correct usage
        var okToExecute = steal.loader.allowModuleExecution(name);

        assert.equal( typeof(okToExecute),
                      'object',"Returns an object {Promise}." );

        return okToExecute.then(
            function(value) {
              assert.equal( steal.loader._allowModuleExecution[name],true,
                    "It is okay to "+
                    "execute the valid module named with: " + name );
            },
          // should never fail in this test
          function(value) {console.log("okToExecute.then() rejected: "+value); }
        );// end then
    }); // end test steal.loader.allowModuleExecution(name)



/*
    test("template test copy me :) ",
      function( assert ) {
        assert.equal(testMe,expectedValue,"Is a testMe");
    });
*/

}; //end function Test01



// Run tests above when document is ready
$(document).ready(function(){
  console.log("In module " + moduleName + " DOMContentLoaded, Document ready for testing!");
     QUnit.config.autostart = false;
     test01(); // make the specs available
     QUnit.start();
});