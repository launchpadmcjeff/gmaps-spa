/*
 * spa.map.js
 * Map module
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/

/*global $, spa */

spa.map = (function () {
    var configModule, initModule, initMap, show, showMap, setJqueryMap,
        configMap = {
            main_html: String()
            + '<div id="map" style="height: 100%" >'
            + '</div>',

            settable_map: {

            }
        },
        stateMap = {
            $append_target: null,
            gmap_init_bool: false
        },
        jqueryMap = {}
        ;

    showMap = function () {
        var myLatlng, map, c;

        myLatlng = new google.maps.LatLng(32.722152, -117.256908);
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: myLatlng
        });

        map.addListener('click', function (me) {
            console.log("lat " + me.latLng.lat() + " lon: " + me.latLng.lng() + " toString: " + me.latLng.toString() + " toUrlValue: " + me.latLng.toUrlValue());

            var speedMph, mph2MpsConvFactor, updHz, geomFactor, radius;

            speedMph = document.getElementById("speed").value;
            mph2MpsConvFactor = 0.44704;
            updHz = document.getElementById("updFreq").value;
            geomFactor = (2 / 1.414);
            radius = speedMph * mph2MpsConvFactor * updHz * geomFactor;

            if (c !== undefined) {
                c.setMap(null);
            }
            c = new google.maps.Circle({
                center: me.latLng,
                radius: radius,
                strokeColor: "#0000FF",
                strokeOpacity: 0.2,
                strokeWeight: 1,
                fillColor: "#0000FF",
                fillOpacity: 0.2
            });
            c.setMap(map);
        });
    };

    /* PUBLIC METHODS */
    configModule = function (input_map) {
        spa.util.setConfigMap({
            input_map: input_map,
            settable_map: configMap.settable_map,
            config_map: configMap
        });
        return true;
    };

    setJqueryMap = function () {
        var
            $append_target = stateMap.$append_target;
        console.log('spa.map setJqueryMap old=');
        console.log(jqueryMap);
        jqueryMap = {
            $append_target: $append_target
        };
        console.log('spa.map setJqueryMap new=');
        console.log(jqueryMap);
    };


    initModule = function ($append_target) {
        console.log('spa.map initModule - $append_target=' + $append_target);
        stateMap.$append_target = $append_target;
        setJqueryMap();

        return true;
    };

    initMap = function () {
        console.log('spa.map initMap');
        showMap();
        stateMap.map_init_bool = true;

    };

    show = function () {
        console.log('spa.map show');
        stateMap.$append_target.html(configMap.main_html);
        if (stateMap.map_init_bool) {
            showMap();
        }

    };

    return {
        configModule: configModule,
        initModule: initModule,
        initMap: initMap,
        show: show
    };
    /* END PUBLIC METHODS */
}());
