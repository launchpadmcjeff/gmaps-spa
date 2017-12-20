/*
 * spa.model.js
 * Model module
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/

/*global $, spa */

spa.model = (function () {
  var initModule = function ($container) {
    console.log('spa.model initModule - $container=' + $container);
  };

  return {
    initModule: initModule
  };
}());
