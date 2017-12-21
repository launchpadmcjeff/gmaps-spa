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
    var onAddVehicle, onSubmit,
        configMap = {
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
            + '    <div class="driver-table"></div>'
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
            $append_target: $append_target,
            $name_input: $append_target.find('#fieldName'),
            $year_input: $append_target.find('#fieldYear'),
            $make_input: $append_target.find('#fieldMake'),
            $model_input: $append_target.find('#fieldModel'),
            $submit: $append_target.find('#submit'),
            $driver_table: $append_target.find('.driver-table')

        };
        console.log('spa.vehicle setJqueryMap new=' + jqueryMap);
    };

    onSubmit = function (event) {
        console.log('onSubmit', event);
        spa.model.vehicles.addVehicle({
            name: jqueryMap.$name_input.val(),
            year: jqueryMap.$year_input.val(),
            make: jqueryMap.$make_input.val(),
            model: jqueryMap.$model_input.val()
        });

    };

    onAddVehicle = function (event, vehicle) {
        console.log('onAddVehicle', event);
        console.log('onAddVehicle vehicle=', vehicle);
        var list_html = String()
            + '<div class="spa-chat-list-note">'
            + 'To chat alone is the fate of all great souls...<br><br>'
            + 'No one is online'
            + '</div>';
        jqueryMap.$driver_table.html(list_html);
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
        setJqueryMap();

        $.gevent.subscribe(jqueryMap.$driver_table, 'addVehicle', onAddVehicle);

        jqueryMap.$submit.click(spa.data.getBuf);
        jqueryMap.$submit.click(onSubmit);
    };

    return {
        configModule: configModule,
        initModule: initModule,
        show: show
    };

}());
