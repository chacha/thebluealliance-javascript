window.nar.api.TBA = (function( window ){
  var obj = {
    'current_version' : '0.1',
    'team'            : 'frc3128',
    'app_identifier'  : 'team-analysis',
  };

  obj.version = function(){
    return 'Currently running version ' + obj.current_version + ' of TBA API';
  }

  obj.getTeam = function( team_key, callback ) {

    if ( typeof team_key === "undefined" ) {
      throw "Invalid team key given.";
    }

    if ( typeof team_type === "function" ) {
      callback = type;
      type = undefined;
    }

    http_get( "https://www.thebluealliance.com/api/v2/team/" + team_key, {}, callback );

  }

  obj.getTeamMatches = function ( team_key, event_key, callback ) {

    if ( typeof event_key === "function" ) {
      callback = event_key;
      event_key = undefined;
    }

    if ( typeof event_key === "undefined" ) {
      throw "Invalid event key argument given.";
    }

    http_get( "https://www.thebluealliance.com/api/v2/team/" + team_key
      + "/event/" + event_key + "/matches", {}, callback );

  }

  obj.getTeamEvents = function ( team_key, year, callback ) {

    if ( typeof year === "function" ) {
      callback = year;
      year = undefined;
    }

    if ( typeof year === "undefined" ) {
      throw "Invalid year argument given.";
    }

    http_get( "https://www.thebluealliance.com/api/v2/team/" + team_key
      + "/" + year + "/events", {}, callback );

  }

  obj.getTeamsByEvent = function ( event_key, callback ) {

    if ( typeof event_key === "undefined" ) {
      throw "Invalid event key argument given.";
    }

    http_get( "https://www.thebluealliance.com/api/v2/event/" + event_key
      + "/teams", {}, callback );

  }

  function http_get(url, options, callback )
  {
    // Allow options argument to be optional
    if ( typeof options === "function" && options !== undefined ) {
      callback = options;
      options = {};
    }

    if ( typeof options !== "object" ) {
      throw 'Invalid options argument given.';
    }

    var resource = new XMLHttpRequest();
    resource.onreadystatechange = function() {
        if (resource.readyState == 4 && resource.status == 200) {
            var data = JSON.parse(resource.responseText);
            callback( data );
        }
    }

    var indentifier = obj.team + ':' + obj.app_identifier + ':' + obj.current_version;
    if ( url.indexOf( '?') === -1 ) {
      url = url + "?X-TBA-App-Id=" + indentifier;
    } else {
      url = url + "&X-TBA-App-Id=" + indentifier;
    }

    resource.open( "GET", url, true );
    resource.send();
  }

  return obj;
})(window);
