

app.controller('ChallengeController', ['$route', '$scope', '$http', 'ChallengeService', 'UserService', 'GeolocationService', 'gps', function($route, $scope, $http, ChallengeService, UserService, geolocation, gps){

// ### the app.value in app.js works! ### \\\\
console.log(gps.userLat);
console.log(gps.userLon);

// getting the user data through http request so that i can have access to that id 
  $http.get('/users/current_user_profile')
 .success(function(data){
  $scope.user = data
 })

 
$scope.findOpponent = function() {
var x_allChallenges = []
var y_dist = []
ChallengeService.getChallenges()
  .then(function(response){ 
  x_allChallenges = response.data
  return x_allChallenges
  }).then(function(x_allChallenges){
    dataArray = [];
    for (var i = 0; i < x_allChallenges.length; i++) {  
      y_dist = getDistanceFromLatLonInKm(x_allChallenges[i].centre.latitude, x_allChallenges[i].centre.longitude, gps.userLat ,gps.userLon)
      dataArray.push(y_dist);
    }
    return dataArray
  }).then(function(){  
    $scope.challengesAndDistances = distanceHelper(x_allChallenges, dataArray);
    console.log($scope.challengesAndDistances)
  });
}


// player2 offering to play player1 \\
  $scope.challengePlayer1 = function(challenge) {
    $scope.challenge_id = challenge.id
    $scope.user_id = gon.current_user.id
    ChallengeService.putChallenge($scope.challenge_id, $scope.user_id)
    .then(function(response){
     $scope.challengeOffered = response.data
     console.log($scope.challengeOffered);
    });
    // $route.reload();
  };



}]);













