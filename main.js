window.nar = (function( window ){
  var obj = {
    'current_version' : '0.1',
    'api' : {},
  };

  obj.version = function(){
    return 'Currently running version ' + obj.current_version + ' of TBA Analysis';
  }

  obj.getTeamEventAverage = function( team_key, event_key ) {

    var processEventAverage = function( data ) {
      var sorted = separateMatches( data );
      var results = {
        'qm' : getMatchesAverage( team_key, sorted.qm ),
        'ef' : getMatchesAverage( team_key, sorted.ef ),
        'qf' : getMatchesAverage( team_key, sorted.qf ),
        'sf' : getMatchesAverage( team_key, sorted.sf ),
        'f'  : getMatchesAverage( team_key, sorted.f ),
      }
      console.log( results );
    }

    obj.api.TBA.getTeamMatches( team_key, event_key, processEventAverage );
  }

  function separateMatches( matches ) {
    var results = {
      "qm" : [],
      "ef" : [],
      "qf" : [],
      "sf" : [],
      "f"  : [],
    };

    matches.forEach( function( entry ) {
      results[ entry.comp_level ].push(entry);
    } );

    return results;
  }

  function findMatchTeamAlliance( team_key, match ) {
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

  function getMatchesAverage( team_key, matches ) {
    if ( matches.length < 1 ) {
      return 0;
    }

    var total = 0;
    var count = 0;
    matches.forEach( function( match ) {

      var alliance = findMatchTeamAlliance( team_key, match );
      if ( alliance === "none" ) {
        return;
      }

      var score = match.alliances[alliance].score;
      total += score;
      count += 1;

    } );

    return total / count;
  }

  return obj;
})(window);
