/*
 * spa.data.js
 * Data module
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global $, spa */

spa.data = (function () {
  var initModule = function ($container) {
    console.log('spa.data initModule - $container=' + $container);
  };
  
  return {
    initModule: initModule
  };
}());
