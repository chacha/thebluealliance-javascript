window.nar.api.TBA = (function( window ){
  var nar = window.nar;
  var obj = {
    'current_version' : '0.1',
    'team_number'     : 'frc3128',
    'app_identifier'  : 'team-analysis',
    'api_base_url'    : 'https://www.thebluealliance.com/api/v2/',
  };

  obj.version = function(){
    return 'Currently running version ' + obj.current_version + ' of TBA API';
  }

  obj.team = {};
  obj.team.get = function( team_key, callback ) {

    if ( typeof team_key === "undefined" ) {
      throw "Invalid team key given.";
    }
    callback = nar.parseCallback( callback );

    path = "team/" + team_key;
    http_get( generate_api_url( path ), {}, callback );
  }

  obj.team.list = function( page_num, callback ) {

    if ( typeof page_num === "undefined" ) {
      page_num = 1;
    }
    callback = nar.parseCallback( callback );

    page_num = parseInt( page_num );
    path = "teams/" + page_num;
    http_get( generate_api_url( path ), {}, callback );

  }

  obj.team.years_participated = function ( team_key, callback ) {

    if ( typeof team_key === "undefined" ) {
      throw "Invalid team key argument given.";
    }
    callback = nar.parseCallback( callback );

    path = "team/" + team_key + "/years_participated";
    http_get( generate_api_url( path ), {}, callback );

  }

  obj.team.media = function ( team_key, year, callback ) {

    if ( typeof team_key === "undefined" ) {
      throw "Invalid team key argument given.";
    }
    if ( typeof year === "function" ) {
      callback = year;
      year = undefined;
    }
    callback = nar.parseCallback( callback );

    if ( year !== undefined ) {
      year = parseInt( year );
      path = "team/" + team_key + "/" + year + "/media";
    } else {
      path = "team/" + team_key + "/media";
    }

    http_get( generate_api_url( path ), {}, callback );

  }

  obj.team.history = {};
  obj.team.history.events = function ( team_key, callback ) {

    if ( typeof team_key === "undefined" ) {
      throw "Invalid team key argument given.";
    }
    callback = nar.parseCallback( callback );

    path = "team/" + team_key + "/history/events";
    http_get( generate_api_url( path ), {}, callback );

  }

  obj.team.history.awards = function ( team_key, callback ) {

    if ( typeof team_key === "undefined" ) {
      throw "Invalid team key argument given.";
    }
    callback = nar.parseCallback( callback );

    path = "team/" + team_key + "/history/awards";
    http_get( generate_api_url( path ), {}, callback );

  }

  obj.team.history.robots = function ( team_key, callback ) {

    if ( typeof team_key === "undefined" ) {
      throw "Invalid team key argument given.";
    }
    callback = nar.parseCallback( callback );

    path = "team/" + team_key + "/history/robots";
    http_get( generate_api_url( path ), {}, callback );

  }

  obj.team.event = {};
  obj.team.event.list = function ( team_key, year, callback ) {

    if ( typeof team_key === "undefined" ) {
      throw "Invalid team key argument given.";
    }
    if ( typeof year === "undefined" ) {
      throw "Invalid year argument given.";
    }
    callback = nar.parseCallback( callback );

    year = parseInt( year );
    path = "team/" + team_key + "/" + year + "/events";
    http_get( generate_api_url( path ), {}, callback );

  }

  obj.team.event.awards = function ( team_key, event_key, callback ) {

    if ( typeof team_key === "undefined" ) {
      throw "Invalid team key argument given.";
    }
    if ( typeof event_key === "undefined" ) {
      throw "Invalid event key argument given.";
    }
    callback = nar.parseCallback( callback );

    path = "team/" + team_key + "/event/" + event_key + "/awards";
    http_get( generate_api_url( path ), {}, callback );

  }

  obj.team.event.matches = function ( team_key, event_key, callback ) {

    if ( typeof team_key === "undefined" ) {
      throw "Invalid team key argument given.";
    }
    if ( typeof event_key === "undefined" ) {
      throw "Invalid event key argument given.";
    }
    callback = nar.parseCallback( callback );

    path = "team/" + team_key + "/event/" + event_key + "/matches";
    http_get( generate_api_url( path ), {}, callback );

  }

  obj.event = {};
  obj.event.list = function ( year, callback ) {

    if ( typeof year === "undefined" ) {
      throw "Invalid year argument given.";
    }
    callback = nar.parseCallback( callback );

    year = parseInt( year );
    path = "events/" + year;
    http_get( generate_api_url( path ), {}, callback );

  }

  obj.event.get = function ( event_key, callback ) {

    if ( typeof event_key === "undefined" ) {
      throw "Invalid event key argument given.";
    }
    callback = nar.parseCallback( callback );

    path = "event/" + event_key;
    http_get( generate_api_url( path ), {}, callback );

  }

  obj.event.teams = function ( event_key, callback ) {

    if ( typeof event_key === "undefined" ) {
      throw "Invalid event key argument given.";
    }
    callback = nar.parseCallback( callback );

    path = "event/" + event_key + "/teams";
    http_get( generate_api_url( path ), {}, callback );

  }

  obj.event.matches = function ( event_key, callback ) {

    if ( typeof event_key === "undefined" ) {
      throw "Invalid event key argument given.";
    }
    callback = nar.parseCallback( callback );

    path = "event/" + event_key + "/matches";
    http_get( generate_api_url( path ), {}, callback );

  }

  obj.event.stats = function ( event_key, callback ) {

    if ( typeof event_key === "undefined" ) {
      throw "Invalid event key argument given.";
    }
    callback = nar.parseCallback( callback );

    path = "event/" + event_key + "/stats";
    http_get( generate_api_url( path ), {}, callback );

  }

  obj.event.rankings = function ( event_key, callback ) {

    if ( typeof event_key === "undefined" ) {
      throw "Invalid event key argument given.";
    }
    callback = nar.parseCallback( callback );

    path = "event/" + event_key + "/rankings";
    http_get( generate_api_url( path ), {}, callback );

  }

  obj.event.awards = function ( event_key, callback ) {

    if ( typeof event_key === "undefined" ) {
      throw "Invalid event key argument given.";
    }
    callback = nar.parseCallback( callback );

    path = "event/" + event_key + "/awards";
    http_get( generate_api_url( path ), {}, callback );

  }

  obj.event.distrct_points = function ( event_key, callback ) {

    if ( typeof event_key === "undefined" ) {
      throw "Invalid event key argument given.";
    }
    callback = nar.parseCallback( callback );

    path = "event/" + event_key + "/district_points";
    http_get( generate_api_url( path ), {}, callback );

  }

  obj.match = {};
  obj.match.get = function ( match_key ) {

    if ( typeof match_key === "undefined" ) {
      throw "Invalid match key argument given.";
    }
    callback = nar.parseCallback( callback );

    path = "match/" + match_key;
    http_get( generate_api_url( path ), {}, callback );

  }

  obj.district = {};
  obj.district.list = function ( year ) {

    if ( typeof year === "undefined" ) {
      throw "Invalid year argument given.";
    }
    callback = nar.parseCallback( callback );

    path = "districts/" + year;
    http_get( generate_api_url( path ), {}, callback );

  }

  obj.district.events = function ( district_key, year, callback ) {

    if ( typeof district_key === "undefined" ) {
      throw "Invalid district key argument given.";
    }
    if ( typeof year === "undefined" ) {
      throw "Invalid year argument given.";
    }
    callback = nar.parseCallback( callback );

    year = parseInt( year );
    path = "district/" + district_key + "/" + year + "/events";
    http_get( generate_api_url( path ), {}, callback );

  }

  obj.district.rankings = function ( district_key, year, callback ) {

    if ( typeof district_key === "undefined" ) {
      throw "Invalid district key argument given.";
    }
    if ( typeof year === "undefined" ) {
      throw "Invalid year argument given.";
    }
    callback = nar.parseCallback( callback );

    year = parseInt( year );
    path = "district/" + district_key + "/" + year + "/rankings";
    http_get( generate_api_url( path ), {}, callback );

  }

  function http_get(url, options, callback )
  {
    run_config_check();

    // Allow options argument to be optional
    if ( typeof options === "function" && options !== undefined ) {
      callback = options;
      options = {};
    }

    if ( typeof options !== "object" ) {
      throw 'Invalid options argument given.';
    }

    if ( obj.cache.exists( url ) ) {
      callback( obj.cache.get( url ) );
      return true;
    }

    var resource = new XMLHttpRequest();
    resource.onreadystatechange = function() {
        if (resource.readyState == 4 && resource.status == 200) {
            var data = JSON.parse(resource.responseText);
            obj.cache.put( url, data );
            callback( data );
        }
    }

    resource.open( "GET", url, true );

    var indentifier = obj.team_number + ':' + obj.app_identifier + ':' + obj.current_version;
    resource.setRequestHeader( 'X-TBA-App-Id', indentifier );

    resource.send();
  }

  function run_config_check() {
    if ( obj.team_number === '' || obj.app_identifier === '' ) {
      throw 'Configuration error: Please configure team_number and app_identifier';
    }
  }

  function generate_api_url( path ) {
    return obj.api_base_url + path;
  }

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

    obj.put = function( key, value ) {
      data[key] = value;
      obj.stats.writes += 1;
      return true;
    }

    obj.get = function( key ) {
      var result = undefined;
      if ( obj.exists ( key ) ) {
        result = data[key];
      }
      return result;
    }

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

    obj.dump = function() {
      return data;
    }

    return obj;
  })();

  return obj;
})(window);
