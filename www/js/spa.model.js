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

  var initModule, makePerson, vehicles, makeVehicle,
    configMap = { anon_id: 'a0' },
    stateMap = {
      anon_user: null,
      cid_serial: 0,
      is_connected: false,
      people_cid_map: {},
      people_db: TAFFY(),
      user: null,
      vehicle_cid_map: {},
      vehicle_db: TAFFY(),
      vehicle: null
    },
    personProto = {
      get_is_user: function () {
        return this.cid === stateMap.user.cid;
      },
      get_is_anon: function () {
        return this.cid === stateMap.anon_user.cid;
      }
    },
    vehicleProto = {

    },
    isFakeData = true;

  vehicles = (function () {
    var addVehicle;

    addVehicle = function (vehicle) {

      console.log("addVehicle vehicle=", vehicle);


      $.gevent.publish('addVehicle', vehicle);
    };

    return {
      addVehicle: addVehicle
    };
  }());

  makeVehicle = function (vehicle_map) {
    var vehicle,
      id = vehicle_map.id,
      cid = vehicle_map.cid,
      name = vehicle_map.name,
      year = vehicle_map.year,
      make = vehicle_map.make,
      model = vehicle_map.model;

    vehicle = Object.create(vehicleProto);
    vehicle.cid = cid;
    vehicle.name = name;
    vehicle.year = year;
    vehicle.make = make;
    vehicle.model = model;

    if (id) { vehicle.id = id; }
    stateMap.vehicle_cid_map[cid] = vehicle;

    stateMap.vehicle_db.insert(vehicle);
    return vehicle;
  };

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
    console.log('spa.model isFakeData=', isFakeData);

    // initialize anonymous person
    stateMap.anon_user = makePerson({
      cid: configMap.anon_id,
      id: configMap.anon_id,
      name: 'anonymous'
    });
    stateMap.user = stateMap.anon_user;

    stateMap.vehicle = makeVehicle({
      cid: 'a0',
      id: 'a0',
      name: '',
      year: '',
      make: '',
      model: ''
    });

  };

  return {
    initModule: initModule,
    vehicles: vehicles
  };
}());
