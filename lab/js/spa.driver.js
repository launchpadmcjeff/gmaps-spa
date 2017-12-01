/*
 * spa.driver.js
 * Driver module
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/

/*global $, spa */

spa.driver = (function () {
    var configMap = {
        main_html: String()
        + '<div id="driver-content" class="container">'
        + '    <h2>Register Driver</h2>'
        + '    <hr>'
        + '  <form class="form-horizontal">'
        + '    <div class="form-group">'
        + '        <label for="fieldName">Name:</label>'
        + '        <input class="form-control" id="fieldName" type="text">'
        + '    </div>'
        + '    <div class="form-group">'
        + '        <label for="fieldEmail">Email address:</label>'
        + '        <input class="form-control" id="fieldEmail" type="email">'
        + '    </div>'
        + '    <div class="form-group">'
        + '        <label for="pwd">Password:</label>'
        + '        <input class="form-control" id="pwd" type="password">'
        + '    </div>'
        + '    <div class="checkbox">'
        + '        <label><input type="checkbox">Can see</label>'
        + '    </div>'
        + '    <div class="form-group">'
        + '        <label for="comment">Comment:</label>'
        + '        <textarea class="form-control" rows="5" id="comment"></textarea>'
        + '    </div>'
        + '    <button type="submit" class="btn btn-default btn-success">Submit</button>'
        + '  </form>'
        + '</div>',

        settable_map: {

        }
    },

        stateMap = {
            $append_target: null
        },
        jqueryMap = {
           
        },
        initModule, configModule, setJqueryMap, handleResize;

    setJqueryMap = function () {
        var
            $append_target = stateMap.$append_target;
        console.log('spa.driver setJqueryMap old=' + jqueryMap);
        jqueryMap = {
            $append_target: $append_target
        };
        console.log('spa.driver setJqueryMap new=' + jqueryMap);
    };

    initModule = function ($append_target) {
        $append_target.append(configMap.main_html);
        stateMap.$append_target = $append_target;
        setJqueryMap();

        return true;
    };

    handleResize = function () {
        return true;
    };

    configModule = function (input_map) {
        spa.util.setConfigMap({
            input_map: input_map,
            settable_map: configMap.settable_map,
            config_map: configMap
        });
        return true;
    };

    return {
        configModule: configModule,
        initModule: initModule,
        handleResize: handleResize
    };

}());
