/*
 * spa.vehicle.js
 * Vehicle module
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/

/*global $, spa */

spa.vehicle = (function () {
    var configMap = {
        main_html: String()
        + '<div id="vehicle-content" class="container">'
        + '    <h2>Register Vehicle</h2>'
        + '    <hr>'
        + '    <form class="form-horizontal">'
        + '        <div class="form-group">'
        + '            <label for="fieldName">Name:</label>'
        + '            <input class="form-control" id="fieldName" type="text">'
        + '        </div>'
        + '        <div class="form-group">'
        + '            <label for="fieldYear">Year:</label>'
        + '            <input class="form-control" id="fieldYear" type="text">'
        + '        </div>'
        + '        <div class="form-group">'
        + '            <label for="fieldMake">Make:</label>'
        + '            <input class="form-control" id="fieldMake" type="text">'
        + '        </div>'
        + '        <div class="form-group">'
        + '            <label for="fieldModel">Model:</label>'
        + '            <input class="form-control" id="fieldModel" type="text">'
        + '        </div>'
        + '        <button type="submit" id="submit" class="btn btn-default btn-success">Submit</button>'
        + '    </form>'
        + '</div>',

        settable_map: {

        }
    },

        stateMap = {
            $append_target: null
        },
        jqueryMap = {},
        initModule, configModule, setJqueryMap, show;

    setJqueryMap = function () {
        var
            $append_target = stateMap.$append_target;
        console.log('spa.vehicle setJqueryMap old=' + jqueryMap);
        jqueryMap = {
            $append_target: $append_target
        };
        console.log('spa.vehicle setJqueryMap new=' + jqueryMap);
    };


    initModule = function ($append_target) {
        console.log('spa.vehicle initModule - $append_target=' + $append_target);
        stateMap.$append_target = $append_target;
        setJqueryMap();

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

    show = function () {
        stateMap.$append_target.html(configMap.main_html);

        $("#submit").click(spa.data.getBuf);
    };

    return {
        configModule: configModule,
        initModule: initModule,
        show: show
    };

}());
