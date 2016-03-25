(function(){

  var obj = {
    'tests'  : [],
    'passed' : [],
    'failed' : [],
  };

  // Export to node if running in node. Otherwise, export to window
  var isNode = false;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = obj;
    isNode = true;
  } else {
    window.TBA_tests = obj;
  }

  obj.run_tests = function( TBA ) {
    obj.TBA = TBA;

    var length = obj.tests.length;
    for( var i = 0; i < length; i++ ) {
      obj.tests[i]();
    }
  }

  function test( expected, actual, message ) {
    if ( typeof message === "undefined" ) {
      message = expected + "===" + actual;
    }

    if ( actual == expected ) {
      obj.passed.push( message );
    } else {
      obj.failed.push( message );
      console.log( "Failed Test: " + message );

      var err = new Error();
      console.log( err.stack );
    }
  }

  obj.team = {};

  // team.get
  obj.tests.push( function() {

    // Test standard get
    obj.TBA.team.get( "frc3128", function( data ) {
      test( "frc3128", data.key );
      test( "3128", data.team_number );
      test( "2010", data.rookie_year );
      test( "http://team3128.org/", data.website );
    } );

    // Test shorthand get
    obj.TBA.team.get( "3128", function( data ) {
      test( "frc3128", data.key );
    } );

    // Test invalid team input error
    try {
      obj.TBA.team.get( "bad-input", function() {
        test( false, true, "Expected exception in team.get" );
      } );
    } catch ( exc ) {
      test( true, true, "Expected exception in team.get" );
    }

    // Test invalid team input error
    try {
      obj.TBA.team.get( undefined, function() {
        test( false, true, "Expected exception in team.get" );
      } );
    } catch ( exc ) {
      test( true, true, "Expected exception in team.get" );
    }

  } );

  // team.list
  obj.tests.push( function() {

    obj.TBA.team.list( function( data ) {
      test( "frc1", data[0].key );
    } );

    obj.TBA.team.list( 1, function( data ) {
      test( "frc500", data[0].key );
    } );

    // Test invalid team input error
    try {
      obj.TBA.team.list( "bad-input", function() {
        test( false, true, "Expected exception in team.list" );
      } );
    } catch ( exc ) {
      test( true, true, "Expected exception in team.list" );
    }

  } );

  // team.years_participated
  obj.tests.push( function() {

    obj.TBA.team.list( function( data ) {
      test( "frc1", data[0].key );
    } );

    obj.TBA.team.list( 1, function( data ) {
      test( "frc500", data[0].key );
    } );

    // Test invalid team input error
    try {
      obj.TBA.team.years_participated( function() {
        test( false, true, "Expected exception in team.years_participated" );
      } );
    } catch ( exc ) {
      test( "Invalid team key argument given.", exc );
    }

    // Test invalid team input error
    try {
      obj.TBA.team.years_participated( undefined, function() {
        test( false, true, "Expected exception in team.years_participated" );
      } );
    } catch ( exc ) {
      test( "Invalid team key argument given.", exc );
    }

    // Test invalid team input error
    try {
      obj.TBA.team.years_participated( "bad-input", function() {
        test( false, true, "Expected exception in team.years_participated" );
      } );
    } catch ( exc ) {
      test( true, true, "Expected exception in team.years_participated" );
    }

  } );

  return obj;
})();
