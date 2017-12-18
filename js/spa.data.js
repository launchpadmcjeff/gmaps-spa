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
  var
    getBuf,
    initModule = function ($container) {
      console.log('spa.data initModule - $container=' + $container);
    };

  getBuf = function () {
    console.log("createItem");

    $.ajax({
      contentType: "application/json",
      url: "https://ql6ak84d5c.execute-api.us-west-1.amazonaws.com/Prod/resource/buf",
      type: "GET",
      dataType: "json"
    })
      .done(function (json) {
        console.log(json);
        // $("<h1>").text(json.title).appendTo("body");
        // $("<div class=\"content\">").html(json.html).appendTo("body");
      })
      .fail(function (xhr, status, errorThrown) {
        alert("Sorry, there was a problem!");
        console.log("Error: " + errorThrown);
        console.log("Status: " + status);
        console.dir(xhr);
      })
      .always(function (xhr, status) {
        alert("The request is complete!");
      });


  };

  return {
    initModule: initModule,
    getBuf: getBuf
  };
}());


