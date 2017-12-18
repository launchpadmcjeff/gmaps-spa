/*
 * spa.shell.js
 * Shell module for SPA
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global $, spa */

spa.shell = (function () {
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      anchor_schema_map: {
        content: { driver: true, vehicle: true }
      },
      resize_interval: 200,
      main_html: String()
      + '<div class="spa-shell-head">'
      + '  <div class="spa-shell-head-logo">'
      + '    <h1>ROBOWEBI</h1>'
      + '    <p>javascript end to end</p>'
      + '  </div>'
      + '  <div class="spa-shell-head-acct"></div>'
      + '</div>'
      + '<div class="spa-shell-main">'
      + '  <div class="spa-shell-main-nav">'
      + '        <div class="spa-shell-main-nav-link"><a href="#!content=home">Home</a></div>'
      + '        <div class="spa-shell-main-nav-link"><a href="#!content=about">About</a></div>'
      + '        <div class="spa-shell-main-nav-link"><a href="#!content=contact">Contact</a></div>'
      + '        <div class="spa-shell-main-nav-link"><a href="#!content=login">Login</a></div>'
      + '        <div class="spa-shell-main-nav-link"><a href="#!content=driver">Driver</a></div>'
      + '        <div class="spa-shell-main-nav-link"><a href="#!content=vehicle">Vehicle</a></div>'
      + '        <div class="spa-shell-main-nav-link"><a href="#!content=map">Map</a></div>'
      + '  </div>'
      + '  <div class="spa-shell-main-content"></div>'
      + '</div>'
      + '<div class="spa-shell-foot"></div>'
      + '<div class="spa-shell-modal"></div>'


    },
    stateMap = {
      $container: undefined,
      anchor_map: {},
      resize_idto: undefined
    },
    jqueryMap = {},

    setContentAnchor, copyAnchorMap, setJqueryMap,
    changeAnchorPart, onHashchange, onResize,
    initModule, onTapAcct, onLogin, onLogout;
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  // Returns copy of stored anchor map; minimizes overhead
  copyAnchorMap = function () {
    return $.extend(true, {}, stateMap.anchor_map);
  };
  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;
    jqueryMap = {
      $container: $container,
      $acct: $container.find('.spa-shell-head-acct'),
      $nav: $container.find('.spa-shell-main-nav'),
      $main_content: $container.find('.spa-shell-main-content')
    };
  };
  // End DOM method /setJqueryMap/

  // Begin DOM method /changeAnchorPart/
  // Purpose    : Changes part of the URI anchor component
  // Arguments  :
  //   * arg_map - The map describing what part of the URI anchor
  //     we want changed.
  // Returns    :
  //   * true  - the Anchor portion of the URI was updated
  //   * false - the Anchor portion of the URI could not be updated
  // Actions    :
  //   The current anchor rep stored in stateMap.anchor_map.
  //   See uriAnchor for a discussion of encoding.
  //   This method
  //     * Creates a copy of this map using copyAnchorMap().
  //     * Modifies the key-values using arg_map.
  //     * Manages the distinction between independent
  //       and dependent values in the encoding.
  //     * Attempts to change the URI using uriAnchor.
  //     * Returns true on success, and false on failure.
  //
  changeAnchorPart = function (arg_map) {
    var
      anchor_map_revise = copyAnchorMap(),
      bool_return = true,
      key_name, key_name_dep;

    // Begin merge changes into anchor map
    KEYVAL:
    for (key_name in arg_map) {
      if (arg_map.hasOwnProperty(key_name)) {

        // skip dependent keys during iteration
        if (key_name.indexOf('_') === 0) { continue KEYVAL; }

        // update independent key value
        anchor_map_revise[key_name] = arg_map[key_name];

        // update matching dependent key
        key_name_dep = '_' + key_name;
        if (arg_map[key_name_dep]) {
          anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
        }
        else {
          delete anchor_map_revise[key_name_dep];
          delete anchor_map_revise['_s' + key_name_dep];
        }
      }
    }
    // End merge changes into anchor map

    // Begin attempt to update URI; revert if not successful
    try {
      $.uriAnchor.setAnchor(anchor_map_revise);
    }
    catch (error) {
      // replace URI with existing state
      $.uriAnchor.setAnchor(stateMap.anchor_map, null, true);
      bool_return = false;
    }
    // End attempt to update URI...

    return bool_return;
  };
  // End DOM method /changeAnchorPart/
  //--------------------- END DOM METHODS ----------------------

  //------------------- BEGIN EVENT HANDLERS -------------------
  // Begin Event handler /onHashchange/
  // Purpose    : Handles the hashchange event
  // Arguments  :
  //   * event - jQuery event object.
  // Settings   : none
  // Returns    : false
  // Actions    :
  //   * Parses the URI anchor component
  //   * Compares proposed application state with current
  //   * Adjust the application only where proposed state
  //     differs from existing and is allowed by anchor schema
  //
  onHashchange = function (event) {
    var anchor_map_prior, anchor_map_proposed;
    anchor_map_prior = copyAnchorMap();

    console.log('spa.shell onHashchange event=');
    console.log(event);

    // attempt to parse anchor
    try { anchor_map_proposed = $.uriAnchor.makeAnchorMap(); }
    catch (error) {
      console.log('spa.shell onHashchange  message=makeAnchorMap_failed error=');
      console.log(error);
      $.uriAnchor.setAnchor(anchor_map_prior, null, true);
      return false;
    }
    console.log('spa.shell onHashchange anchor_map_prior=');
    console.log(anchor_map_prior);
    console.log('spa.shell onHashchange anchor_map_proposed=');
    console.log(anchor_map_proposed);

    switch (anchor_map_proposed.content) {
      case 'driver':
        console.log('spa.shell onHashchange event=driver');
        spa.driver.show();
        break;
      case 'vehicle':
        console.log('spa.shell onHashchange event=vehicle');
        spa.vehicle.show();
        break;
      case 'map':
        console.log('spa.shell onHashchange event=map');
        spa.map.show();
        break;
      default:
        console.log('spa.shell onHashchange event="unhandled_api"');
    }


    stateMap.anchor_map = anchor_map_proposed;

    return false;
  };
  // End Event handler /onHashchange/

  // Begin Event handler /onResize/
  onResize = function () {
    if (stateMap.resize_idto) { return true; }

    spa.driver.handleResize();
    stateMap.resize_idto = setTimeout(
      function () { stateMap.resize_idto = undefined; },
      configMap.resize_interval
    );

    return true;
  };
  // End Event handler /onResize/


  onTapAcct = function (event) {
    console.log('spa.shell onTapAcct event=' + event);
  };

  onLogin = function (event, login_user) {
    console.log('spa.shell onLogin event=' + event);
    jqueryMap.$acct.text(login_user.name);
  };

  onLogout = function (event, logout_user) {
    console.log('spa.shell onLogout event=' + event + ' logout_user=' + logout_user);
    jqueryMap.$acct.text('Please sign-in');
  };

  //-------------------- END EVENT HANDLERS --------------------

  //---------------------- BEGIN CALLBACKS ---------------------
  // Begin callback method /setConentAnchor/
  // Example  : setContentAnchor( 'vehicle' );
  // Purpose  : Change the ccontent component of the anchor
  // Arguments:
  //   * content_type - may be 'vehicle' or 'driver'
  // Action   :
  //   Changes the URI anchor parameter 'content' to the requested
  //   value if possible.
  // Returns  :
  //   * true  - requested anchor part was updated
  //   * false - requested anchor part was not updated
  // Throws   : none
  //
  setContentAnchor = function (content_type) {
    return changeAnchorPart({ content: content_type });
  };
  // End callback method /setContentAnchor/
  //----------------------- END CALLBACKS ----------------------

  //------------------- BEGIN PUBLIC METHODS -------------------
  // Begin Public method /initModule/
  // Example   : spa.shell.initModule( $('#app_div_id') );
  // Purpose   :
  //   Directs the Shell to offer its capability to the user
  // Arguments :
  //   * $container (example: $('#app_div_id')).
  //     A jQuery collection that should represent 
  //     a single DOM container
  // Action    :
  //   Populates $container with the shell of the UI
  //   and then configures and initializes feature modules.
  //   The Shell is also responsible for browser-wide issues
  //   such as URI anchor and cookie management
  // Returns   : none 
  // Throws    : none
  //
  initModule = function ($container) {
    // load HTML and map jQuery collections
    stateMap.$container = $container;
    $container.html(configMap.main_html);
    setJqueryMap();

    // configure uriAnchor to use our schema
    $.uriAnchor.configModule({
      schema_map: configMap.anchor_schema_map
    });

    // configure and initialize feature modules
    spa.driver.configModule({

    });
    spa.driver.initModule(jqueryMap.$main_content);

    spa.vehicle.configModule({

    });
    spa.vehicle.initModule(jqueryMap.$main_content);

    spa.map.configModule({

    });
    spa.map.initModule(jqueryMap.$main_content);
    // Handle URI anchor change events.
    // This is done /after/ all feature modules are configured
    // and initialized, otherwise they will not be ready to handle
    // the trigger event, which is used to ensure the anchor
    // is considered on-load
    //
    $(window)
      .bind('resize', onResize)
      .bind('hashchange', onHashchange)
      .trigger('hashchange');

    jqueryMap.$acct
      .text('Please sign-in')
      .bind('utap', onTapAcct);
  };
  // End PUBLIC method /initModule/


  return {
    initModule: initModule,
    onLogin: onLogin,
    onLogout: onLogout,
    setConentAnchor: setContentAnchor
  };
  //------------------- END PUBLIC METHODS ---------------------
}());
