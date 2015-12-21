window.TBA = (function( window ){
  var obj = {
    'current_version' : '0.2',
    'team_number'     : 'frc3128',
    'app_identifier'  : 'team-analysis',
    'api_base_url'    : 'https://www.thebluealliance.com/api/v2/',
    'provide_default_callback' : true,
  };

  /**
   * Returns string on version information
   * @return {string} Version information.
   */
  obj.version = function(){
    return 'Currently running version ' + obj.current_version + ' of TBA Javascript API';
  }

  obj.team = {};

  /**
   * Gets information relating to a specific team.
   *
   * @param {string} team_key The team to get information on, prepended with the
   *    program tag. Example: 'frc3128'
   * @param {function} callback The function to call with the results of the API
   *    call. Passed a single JSON object with results.
   */
  obj.team.get = function( team_key, callback ) {

    if ( typeof team_key === "undefined" ) {
      throw "Invalid team key given.";
    }

    path = "team/" + team_key;
    http_get( path, callback );
  }

  /**
   * Returns a list of teams, by team number, paginated in sets of 500. Each
   *  page contains teams whose number is between start = 500 * page and
   *  end at end = start + 499, inclusive.
   *
   * @param {integer} page_num Page number of results to retrieve.
   * @param {function} callback The function to call with the results of the API
   *    call. Passed a single JSON object with results.
   */
  obj.team.list = function( page_num, callback ) {

    if ( typeof page_num === "undefined" ) {
      page_num = 1;
    }

    page_num = parseInt( page_num );
    path = "teams/" + page_num;
    http_get( path, callback );``

  }

  /**
   * Get an array of the years a specific team participated in events.
   *
   * @param {string} team_key The team to get information on, prepended with the
   *    program tag. Example: 'frc3128'
   * @param {function} callback The function to call with the results of the API
   *    call. Passed a single JSON object with results.
   */
  obj.team.years_participated = function ( team_key, callback ) {

    if ( typeof team_key === "undefined" ) {
      throw "Invalid team key argument given.";
    }

    path = "team/" + team_key + "/years_participated";
    http_get( path, callback );

  }

  /**
   * Gets media resource information relating to a team for a specific year, or
   *  the most current year.
   *
   * @param {string} team_key The team to get information on, prepended with the
   *    program tag. Example: 'frc3128'
   * @param {integer} year The year to get media information on. Defaults to the
   *    current year. Example: '2010', '2015'
   * @param {function} callback The function to call with the results of the API
   *    call. Passed a single JSON object with results.
   */
  obj.team.media = function ( team_key, year, callback ) {

    if ( typeof team_key === "undefined" ) {
      throw "Invalid team key argument given.";
    }
    if ( typeof year === "function" ) {
      callback = year;
      year = undefined;
    }

    if ( year !== undefined ) {
      year = parseInt( year );
      path = "team/" + team_key + "/" + year + "/media";
    } else {
      path = "team/" + team_key + "/media";
    }

    http_get( path, callback );

  }

  obj.team.history = {};

  /**
   * Gets an array of information on the events a team has ever participated in.
   *
   * @param {string} team_key The team to get information on, prepended with the
   *    program tag. Example: 'frc3128'
   * @param {function} callback The function to call with the results of the API
   *    call. Passed a single JSON object with results.
   */
  obj.team.history.events = function ( team_key, callback ) {

    if ( typeof team_key === "undefined" ) {
      throw "Invalid team key argument given.";
    }

    path = "team/" + team_key + "/history/events";
    http_get( path, callback );

  }

  /**
   * Get an array of objects containing the awards a team has ever received.
   *
   * @param {string} team_key The team to get information on, prepended with the
   *    program tag. Example: 'frc3128'
   * @param {function} callback The function to call with the results of the API
   *    call. Passed a single JSON object with results.
   */
  obj.team.history.awards = function ( team_key, callback ) {

    if ( typeof team_key === "undefined" ) {
      throw "Invalid team key argument given.";
    }

    path = "team/" + team_key + "/history/awards";
    http_get( path, callback );

  }

  /**
   * Get an array of objects contain information on the robots a team has
   *  produced, by year.
   *
   * @param {string} team_key The team to get information on, prepended with the
   *    program tag. Example: 'frc3128'
   * @param {function} callback The function to call with the results of the API
   *    call. Passed a single JSON object with results.
   */
  obj.team.history.robots = function ( team_key, callback ) {

    if ( typeof team_key === "undefined" ) {
      throw "Invalid team key argument given.";
    }

    path = "team/" + team_key + "/history/robots";
    http_get( path, callback );

  }

  obj.team.event = {};
  /**
   * Get an array of events a team participated in during a given year.
   *
   * @param {string} team_key The team to get information on, prepended with the
   *    program tag. Example: 'frc3128'
   * @param {integer} year The year to get information on. Example: '2015'
   * @param {function} callback The function to call with the results of the API
   *    call. Passed a single JSON object with results.
   */
  obj.team.event.list = function ( team_key, year, callback ) {

    if ( typeof team_key === "undefined" ) {
      throw "Invalid team key argument given.";
    }
    if ( typeof year === "undefined" ) {
      throw "Invalid year argument given.";
    }

    year = parseInt( year );
    path = "team/" + team_key + "/" + year + "/events";
    http_get( path, callback );

  }

  /**
   * Gets an array of awards given to a specific team at a specific event.
   *
   * @param {string} team_key The team to get information on, prepended with the
   *    program tag. Example: 'frc3128'
   * @param {string} event_key  The event to get information on. Includes the
   *    event code, prepended by the year. Example: '2016casd', '2015nvlv'
   * @param {function} callback The function to call with the results of the API
   *    call. Passed a single JSON object with results.
   */
  obj.team.event.awards = function ( team_key, event_key, callback ) {

    if ( typeof team_key === "undefined" ) {
      throw "Invalid team key argument given.";
    }
    if ( typeof event_key === "undefined" ) {
      throw "Invalid event key argument given.";
    }

    path = "team/" + team_key + "/event/" + event_key + "/awards";
    http_get( path, callback );

  }

  /**
   * Gets an array of match information on matches a given team participated
   *    at a given event.
   *
   * @param {string} team_key The team to get information on, prepended with the
   *    program tag. Example: 'frc3128'
   * @param {string} event_key  The event to get information on. Includes the
   *    event code, prepended by the year. Example: '2016casd', '2015nvlv'
   * @param {function} callback The function to call with the results of the API
   *    call. Passed a single JSON object with results.
   */
  obj.team.event.matches = function ( team_key, event_key, callback ) {

    if ( typeof team_key === "undefined" ) {
      throw "Invalid team key argument given.";
    }
    if ( typeof event_key === "undefined" ) {
      throw "Invalid event key argument given.";
    }

    path = "team/" + team_key + "/event/" + event_key + "/matches";
    http_get( path, callback );

  }

  obj.event = {};
  /**
   * Get all the events occuring during a given year.
   *
   * @param {integer} year The year to get information on. Example: '2015'
   * @param {function} callback The function to call with the results of the API
   *    call. Passed a single JSON object with results.
   */
  obj.event.list = function ( year, callback ) {

    if ( typeof year === "undefined" ) {
      throw "Invalid year argument given.";
    }

    year = parseInt( year );
    path = "events/" + year;
    http_get( path, callback );

  }

  /**
   * Gets information on a given event.
   *
   * @param {string} event_key  The event to get information on. Includes the
   *    event code, prepended by the year. Example: '2016casd', '2015nvlv'
   * @param {function} callback The function to call with the results of the API
   *    call. Passed a single JSON object with results.
   */
  obj.event.get = function ( event_key, callback ) {

    if ( typeof event_key === "undefined" ) {
      throw "Invalid event key argument given.";
    }

    path = "event/" + event_key;
    http_get( path, callback );

  }

  /**
   * Gets an array of teams that participated in a given event.
   *
   * @param {string} event_key  The event to get information on. Includes the
   *    event code, prepended by the year. Example: '2016casd', '2015nvlv'
   * @param {function} callback The function to call with the results of the API
   *    call. Passed a single JSON object with results.
   */
  obj.event.teams = function ( event_key, callback ) {

    if ( typeof event_key === "undefined" ) {
      throw "Invalid event key argument given.";
    }

    path = "event/" + event_key + "/teams";
    http_get( path, callback );

  }

  /**
   * Gets an array of matches that occured at a specific event.
   *
   * @param {string} event_key  The event to get information on. Includes the
   *    event code, prepended by the year. Example: '2016casd', '2015nvlv'
   * @param {function} callback The function to call with the results of the API
   *    call. Passed a single JSON object with results.
   */
  obj.event.matches = function ( event_key, callback ) {

    if ( typeof event_key === "undefined" ) {
      throw "Invalid event key argument given.";
    }

    path = "event/" + event_key + "/matches";
    http_get( path, callback );

  }

  /**
   * Gets various statistics about teams at a specific event.
   *
   * @param {string} event_key  The event to get information on. Includes the
   *    event code, prepended by the year. Example: '2016casd', '2015nvlv'
   * @param {function} callback The function to call with the results of the API
   *    call. Passed a single JSON object with results.
   */
  obj.event.stats = function ( event_key, callback ) {

    if ( typeof event_key === "undefined" ) {
      throw "Invalid event key argument given.";
    }

    path = "event/" + event_key + "/stats";
    http_get( path, callback );

  }

  /**
   * Gets a ranking of teams that attended a specific event.
   *
   * @param {string} event_key  The event to get information on. Includes the
   *    event code, prepended by the year. Example: '2016casd', '2015nvlv'
   * @param {function} callback The function to call with the results of the API
   *    call. Passed a single JSON object with results.
   */
  obj.event.rankings = function ( event_key, callback ) {

    if ( typeof event_key === "undefined" ) {
      throw "Invalid event key argument given.";
    }

    path = "event/" + event_key + "/rankings";
    http_get( path, callback );

  }

  /**
   * Gets an array of awards given at a specific event.
   *
   * @param {string} event_key  The event to get information on. Includes the
   *    event code, prepended by the year. Example: '2016casd', '2015nvlv'
   * @param {function} callback The function to call with the results of the API
   *    call. Passed a single JSON object with results.
   */
  obj.event.awards = function ( event_key, callback ) {

    if ( typeof event_key === "undefined" ) {
      throw "Invalid event key argument given.";
    }

    path = "event/" + event_key + "/awards";
    http_get( path, callback );

  }

  /**
   * Gets an array of district points given out at a specific event.
   *
   * @param {string} event_key  The event to get information on. Includes the
   *    event code, prepended by the year. Example: '2016casd', '2015nvlv'
   * @param {function} callback The function to call with the results of the API
   *    call. Passed a single JSON object with results.
   */
  obj.event.distrct_points = function ( event_key, callback ) {

    if ( typeof event_key === "undefined" ) {
      throw "Invalid event key argument given.";
    }

    path = "event/" + event_key + "/district_points";
    http_get( path, callback );

  }

  obj.match = {};
  /**
   * Gets information on a specifc match.
   *
   * @param {string} match_key  The match to get information on. Includes the
   *    event key, competition level, and number. Example: '2014cmp_f1m1'
   * @param {function} callback The function to call with the results of the API
   *    call. Passed a single JSON object with results.
   */
  obj.match.get = function ( match_key ) {

    if ( typeof match_key === "undefined" ) {
      throw "Invalid match key argument given.";
    }

    path = "match/" + match_key;
    http_get( path, callback );

  }

  obj.district = {};
  /**
   * Gets an array of districts active during a given year.
   *
   * @param {integer} year The year to get information on.
   * @param {function} callback The function to call with the results of the API
   *    call. Passed a single JSON object with results.
   */
  obj.district.list = function ( year ) {

    if ( typeof year === "undefined" ) {
      throw "Invalid year argument given.";
    }

    path = "districts/" + year;
    http_get( path, callback );

  }

  /**
   * Gets an array of events ocurring in a given district during a given year.
   *
   * @param {string} district_key  The dsitrict to get information on.
   *    Examples: 'ne', 'in', 'mar'
   * @param {integer} year The year to get information on.
   * @param {function} callback The function to call with the results of the API
   *    call. Passed a single JSON object with results.
   */
  obj.district.events = function ( district_key, year, callback ) {

    if ( typeof district_key === "undefined" ) {
      throw "Invalid district key argument given.";
    }
    if ( typeof year === "undefined" ) {
      throw "Invalid year argument given.";
    }

    year = parseInt( year );
    path = "district/" + district_key + "/" + year + "/events";
    http_get( path, callback );

  }

  /**
   * Gets an array of team rankings in a given district during a given year.
   *
   * @param {string} district_key  The dsitrict to get information on.
   *    Examples: 'ne', 'in', 'mar'
   * @param {integer} year The year to get information on.
   * @param {function} callback The function to call with the results of the API
   *    call. Passed a single JSON object with results.
   */
  obj.district.rankings = function ( district_key, year, callback ) {

    if ( typeof district_key === "undefined" ) {
      throw "Invalid district key argument given.";
    }
    if ( typeof year === "undefined" ) {
      throw "Invalid year argument given.";
    }

    year = parseInt( year );
    path = "district/" + district_key + "/" + year + "/rankings";
    http_get( path, callback );

  }

  /**
   * Fetches a resource from the API server
   * @param {string} path The API path, without begining slash, that follows the
   *    API directory and version path. Example: 'teams/1'
   * @param {function} callback The function to call with the results of the API
   *    call. Passed a single JSON object with results.
   */
  function http_get( path, callback )
  {
    if ( obj.team_number === '' || obj.app_identifier === '' ) {
      throw 'Configuration error: Please configure team_number and app_identifier';
    }

    if ( obj.cache.exists( path ) ) {
      callback( obj.cache.get( path ) );
      return true;
    }

    var resource = new XMLHttpRequest();
    resource.onreadystatechange = function() {
        if (resource.readyState == 4 && resource.status == 200) {
            var data = JSON.parse(resource.responseText);
            obj.cache.put( path, data );

            if ( typeof callback === "function" ) {
              callback( data );
            } else if ( obj.provide_default_callback === true ) {
              obj.defaultCallback( data );
            }
        }
    }

    var url = obj.api_base_url + path;
    resource.open( "GET", url, true );

    var indentifier = obj.team_number + ':' + obj.app_identifier + ':' + obj.current_version;
    resource.setRequestHeader( 'X-TBA-App-Id', indentifier );

    resource.send();
  }

  /**
   * Default callback to use if no callback is provided. Only used if
   *    obj.provide_default_callback === true. Can be overriden to provide your
   *    own implementation of the default callback.
   */
  obj.defaultCallback = function( results ){
    console.log( 'No callback provided. Printing to log.' );
    console.log( results );
    console.log( 'Current cache statistics:' );
    console.log( obj.cache.stats );
  };

  /**
   * Resource caching to reduce number of requests to the API server. Persists
   *    as long as the Javascript process is running. (Browser refresh clears)
   */
  obj.cache = ( function() {
    var data = {};
    var obj = {
      'enabled' : true,
      'stats'   : {
        'writes' : 0,
        'hits'   : 0,
        'misses' : 0,
      },
    };

    /**
     * Add key/value entry to the cache
     * @param {string} key The key to store the value under. Must be unique.
     * @param {mixed} value The value to associate with the key.
     */
    obj.put = function( key, value ) {
      data[key] = value;
      obj.stats.writes += 1;
      return true;
    }

    /**
     * Retrieves the value associated with a given key.
     * @param {string} key The key to retrieve the value of.
     * @return {mixed} The value associated with the key.
     */
    obj.get = function( key ) {
      var result = undefined;
      if ( obj.exists ( key ) ) {
        result = data[key];
      }
      return result;
    }

    /**
     * Checks if a given key has an associated value
     * @param {string} key The key to check for an associated value
     * @return {boolean} True if the key is associated with a value. If not,
     *    returns false.
     */
    obj.exists = function( key ) {
      var result = false;
      if ( key in data ) {
        result = true;
      }

      // Always record hits/misses for debugging
      if ( result === true ) {
        obj.stats.hits += 1;
      } else {
        obj.stats.misses += 1;
      }

      if ( obj.enabled === false ) {
        result = false;
      }
      return result;
    }

    /**
     * Returns the entire cache data object
     * @return {object} The cache data object containing all key and values
     */
    obj.dump = function() {
      return data;
    }

    return obj;
  })();

  return obj;
})(window);
