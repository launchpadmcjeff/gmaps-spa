/*
 * nodeunit_suite.js
 * Unit test suite for Robowebi
 *
 * Please run using nodeunit nodeunit_suite.js
 */

/*jslint            node : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global global, $, spa, document, window */


var testOne, testTwo;

testOne = function (test_obj) {
  var idx = 0;
  test_obj.expect(0);
  test_obj.done();
};


testTwo = function (test_obj) {
  var idx = 1;
  test_obj.expect(0);
  test_obj.done();
};

module.exports = {
  testOne          : testOne,
  testTwo          : testTwo
};
