# The Blue Alliance Analysis
This tool allows users to query the team match data stored on The Blue Alliance in a 
command line manner. This is useful for aggregating team data into a single view, as
well as creating custom metrics and more.

## How to use TBA Anaylsis
TBA Analysis is a Javascript script, and can be included in any javascript project you
are working on. However, to use it by itself, clone the repository and open `index.html`.

All commands should be entered via the Javascript console in your browser. Currently you
might need to launch the web page on a self-hosted server in order to bypass certain
Chrome security checks. You can also just use Firefox.

## Argument Definitions

`team_key` is the team number prepended by `frc`. So, for Team 3128 the team key woudl
be `frc3128`.

`event_key` is the letter code assigned by TheBlueAlliance/US FIRST prepended by the year
of the event. For the San Diego Regional of 2015, it would be `2015casd`. To find the event
key, look at URLs for [events pages](http://www.thebluealliance.com/events) of The Blue Alliance.

`callback` arguments are provided as the mechanism to receive data from the API. Pass a function 
that accepts a single argument that is the data object with the results of the query.

## Available Commands
The TBA Anaylsis project is stored under the `nar` namespace.

`nar.version()` returns the version of TBA Analysis currently being ran.

`nar.getTeamEventAverage( team_key, event_key, callback );` fetches and returns a team's 
match average to the provided callback. This match average is broken down into different
match types: `qm, ef, qf, sf, f`. 

`nar.getTeamYearAverage( team_key, year, callback );` fetches and returns a the average of their 
event averages to the provided callback. This match average is broken down into different
match types: `qm, ef, qf, sf, f`. 

`nar.getTeamsYearAverageByEvent( event_key, year, callback );` fetches all teams attending a the 
given event and returns their yearly average for the given year to the callback. This match average
is broken down into different match types: `qm, ef, qf, sf, f`, and is separated by team.
