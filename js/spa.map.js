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

    var configModule, initModule, initMap, show, showMap, setJqueryMap, gmap, gLatLng, gCircle, pollGmapInit,
        configMap = {
            main_html: String()
            + '<label for="speed">Speed:</label>'
            + '<input id="speed" type="text">'
            + '<label for="updFreq">Frequency:</label>'
            + '<input id="updFreq" type="text">'
            + '<div id="map" style="/*! height: 100%; */ position: absolute; overflow: hidden;top: 20px;left: 0;right: 0;bottom: 0;" >'
            + '</div>',

            settable_map: {

            }
        },
        stateMap = {
            $append_target: null,
            gmap_init_bool: false,
            gmap_zoom: 10,
            gmap_lat: 32.722152,
            gmap_lon: -117.256908
        },
        jqueryMap = {}
        ;

    showMap = function () {
        gLatLng = new google.maps.LatLng(stateMap.gmap_lat, stateMap.gmap_lon);
        gmap = new google.maps.Map(document.getElementById('map'), {
            zoom: stateMap.gmap_zoom,
            center: gLatLng
        });

        gmap.addListener('click', function (me) {
            console.log("lat " + me.latLng.lat() + " lon: " + me.latLng.lng() + " toString: " + me.latLng.toString() + " toUrlValue: " + me.latLng.toUrlValue());

            var speedMph, mph2MpsConvFactor, updHz, geomFactor, radius;

            speedMph = document.getElementById("speed").value;
            mph2MpsConvFactor = 0.44704;
            updHz = document.getElementById("updFreq").value;
            geomFactor = (2 / 1.414);
            radius = speedMph * mph2MpsConvFactor * updHz * geomFactor;

            if (gCircle !== undefined) {
                gCircle.setMap(null);
            }
            gCircle = new google.maps.Circle({
                center: me.latLng,
                radius: radius,
                strokeColor: "#0000FF",
                strokeOpacity: 0.2,
                strokeWeight: 1,
                fillColor: "#0000FF",
                fillOpacity: 0.2
            });
            gCircle.setMap(gmap);
            stateMap.gmap_lat = me.latLng.lat();
            stateMap.gmap_lon = me.latLng.lng();

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
        stateMap.gmap_init_bool = true;

    };

    pollGmapInit = function () {
        if (!stateMap.gmap_init_bool) {
            setTimeout(pollGmapInit, 0);
        } else {
            showMap();
        }
    }

    show = function () {
        console.log('spa.map show');
        stateMap.$append_target.html(configMap.main_html);
        if (stateMap.gmap_init_bool) {
            console.log('spa.map show event="gmap init prior"');
            showMap();
        } else {
            console.log('spa.map show event="waiting for gmap init"');
            pollGmapInit();
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
