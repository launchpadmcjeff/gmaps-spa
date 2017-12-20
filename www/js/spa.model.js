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

/*global TAFFY, $, spa */

spa.model = (function () {
  'use strict';

  var initModule, makePerson, vehicles,
    configMap = { anon_id: 'a0' },
    stateMap = {
      anon_user: null,
      cid_serial: 0,
      is_connected: false,
      people_cid_map: {},
      people_db: TAFFY(),
      user: null
    },
    personProto = {
      get_is_user: function () {
        return this.cid === stateMap.user.cid;
      },
      get_is_anon: function () {
        return this.cid === stateMap.anon_user.cid;
      }
    },
    isFakeData = true;

  vehicles = (function () {
    var addVehicle;

    addVehicle = function () {
      $.gevent.publish('addVehicle', { addVehicle: "isFakeData=" + isFakeData });
      console.log("addVehicle");

      
    };

    return {
      addVehicle: addVehicle
    };
  }());

  makePerson = function (person_map) {
    var person,
      cid = person_map.cid,
      css_map = person_map.css_map,
      id = person_map.id,
      name = person_map.name;

    if (cid === undefined || !name) {
      throw 'client id and name required';
    }

    person = Object.create(personProto);
    person.cid = cid;
    person.name = name;
    person.css_map = css_map;

    if (id) { person.id = id; }

    stateMap.people_cid_map[cid] = person;

    stateMap.people_db.insert(person);
    return person;
  };

  initModule = function () {
    console.log('spa.model initModule');

    // initialize anonymous person
    stateMap.anon_user = makePerson({
      cid: configMap.anon_id,
      id: configMap.anon_id,
      name: 'anonymous'
    });
    stateMap.user = stateMap.anon_user;

  };

  return {
    initModule: initModule,
    vehicles: vehicles
  };
}());
