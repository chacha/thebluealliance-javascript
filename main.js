window.nar = (function( window ){
  var obj = {
    'current_version' : '0.1',
    'api' : {},
    'provide_defautl_callback' : true,
  };

  obj.version = function(){
    return 'Currently running version ' + obj.current_version + ' of TBA Analysis';
  }

  obj.getTeamsYearAverageByEvent = function( event_key, year, callback ) {

    if ( typeof event_key === "undefined" ) {
      throw "No event key argument provided.";
    }

    if ( typeof year === "undefined" ) {
      throw "No year argument provided.";
    }

    if ( typeof callback !== "function" ) {
      callback = function( results ){
        console.log( 'No callback provided for getTeamsYearAverageByEvent(). Printing to log.')
        console.log( results );
      }
    }

    var processTeamList = function ( data ) {

      var teamResults = [];
      data.forEach( function( team ){

        var promise = new Promise( function( resolve, reject ) {
          obj.getTeamYearAverage( team.key, year, function( data ) {
            resolve( data );
          });
        } );
        teamResults.push( promise );

      } );

      Promise.all( teamResults ).then( function( results ){
        callback( results );
      } );

    };

    obj.api.TBA.getTeamsByEvent( event_key, processTeamList );
    return true;
  }

  obj.getTeamYearAverage = function( team_key, year, callback ) {
    if ( typeof team_key === "undefined" ) {
      throw "No team key argument provided.";
    }

    if ( typeof year === "undefined" ) {
      throw "No year argument provided.";
    }

    if ( typeof callback !== "function" ) {
      callback = function( results ){
        console.log( 'No callback provided for getTeamYearAverage(). Printing to log.')
        console.log( results );
      }
    }

    var eventResults = [];
    var processYearEvents = function( data ) {
      data.forEach( function( event ){

        var eventPromise = new Promise( function( resolve, reject ) {
          obj.getTeamEventAverage( team_key, event.key, function( data ) {
            resolve( data );
          });
        } );
        eventResults.push( eventPromise );

      } );

      Promise.all( eventResults ).then( function( results ){

        var scores = {
          'key'  : team_key,
          'year' : year,
          'qm'   : 0,
          'ef'   : 0,
          'qf'   : 0,
          'sf'   : 0,
          'f'    : 0,
        }

        results.forEach( function( result ){
          scores.qm += result.qm;
          scores.ef += result.ef;
          scores.qf += result.qf;
          scores.sf += result.sf;
          scores.f  += result.f;
        } );

        scores.qm = scores.qm/results.length;
        scores.ef = scores.ef/results.length;
        scores.qf = scores.qf/results.length;
        scores.sf = scores.sf/results.length;
        scores.f  = scores.f/results.length;

        callback( scores );

      } );
    }

    obj.api.TBA.getTeamEvents( team_key, year, processYearEvents );

    return true;
  }

  obj.getTeamEventAverage = function( team_key, event_key, callback ) {

    if ( typeof team_key === "undefined" ) {
      throw "No team key argument provided.";
    }

    if ( typeof event_key === "undefined" ) {
      throw "No event key argument provided.";
    }

    if ( typeof callback !== "function" ) {
      callback = function( results ){
        console.log( 'No callback provided for getTeamEventAverage(). Printing to log.')
        console.log( results );
      }
    }

    var processEventAverage = function( data ) {
      var sorted = MatchHelper.separateMatches( data );
      var results = {
        'team'  : team_key,
        'event' : event_key,
        'qm'    : MatchHelper.getMatchesAverage( team_key, sorted.qm ),
        'ef'    : MatchHelper.getMatchesAverage( team_key, sorted.ef ),
        'qf'    : MatchHelper.getMatchesAverage( team_key, sorted.qf ),
        'sf'    : MatchHelper.getMatchesAverage( team_key, sorted.sf ),
        'f'     : MatchHelper.getMatchesAverage( team_key, sorted.f ),
      }

      callback( results );
    }
    obj.api.TBA.getTeamMatches( team_key, event_key, processEventAverage );

    return true;
  }

  var MatchHelper = {
    'separateMatches' : function ( matches ) {
      var results = {
        "qm" : [],
        "ef" : [],
        "qf" : [],
        "sf" : [],
        "f"  : [],
      };

      matches.forEach( function ( entry ) {
        results[ entry.comp_level ].push(entry);
      } );

      return results;
    },
    'getMatchesAverage' : function ( team_key, matches ) {
      if ( matches.length < 1 ) {
        return 0;
      }

      var total = 0;
      var count = 0;
      matches.forEach( function( match ) {

        var alliance = MatchHelper.findMatchTeamAlliance( team_key, match );
        if ( alliance === "none" ) {
          return;
        }

        var score = match.alliances[alliance].score;
        total += score;
        count += 1;

      } );

      return total / count;
    },
    'findMatchTeamAlliance' : function ( team_key, match ) {
      var blue_teams = match.alliances.blue.teams;
      if ( blue_teams.indexOf( team_key ) !== -1 ) {
        return 'blue';
      }

      var red_teams = match.alliances.red.teams;
      if ( red_teams.indexOf( team_key ) !== -1 ) {
        return 'red';
      }

      return 'none';
    }
  };

  obj.defaultCallback = function( results ){
    console.log( 'No callback provided. Printing to log.')
    console.log( results );
  };

  obj.parseCallback = function( callback ) {

    if ( obj.provide_default_callback === false ) {
      return callback;
    }

    if ( typeof callback !== "function" ) {
      callback = obj.defaultCallback;
    }
    return callback;

  }

  return obj;
})(window);
