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
      var sorted = MatchHelper.separateMatches( data );
      var results = {
        'qm' : MatchHelper.getMatchesAverage( team_key, sorted.qm ),
        'ef' : MatchHelper.getMatchesAverage( team_key, sorted.ef ),
        'qf' : MatchHelper.getMatchesAverage( team_key, sorted.qf ),
        'sf' : MatchHelper.getMatchesAverage( team_key, sorted.sf ),
        'f'  : MatchHelper.getMatchesAverage( team_key, sorted.f ),
      }
      console.log( results );
    }

    obj.api.TBA.getTeamMatches( team_key, event_key, processEventAverage );
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

  return obj;
})(window);
