

app.controller('AllUsersController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){


  $http.get('/users/all_users')
    .success(function(response){  
    $scope.top_users = response 
    console.log($scope.top_users);
    for (i=1; i < $scope.top_users.length;i++) {
      console.log(i);
    }
    $scope.count = response.count
    
  });
    // $scope.count = $scope.top_users.count
    // console.log($scope.count);
    // for (i=1; $scope.top_users.length;i++) {
    //   console.log(i);
    // }
 // console.log(data.index);
//  $scope.range = function(n) {
//   return new Array(n);
// };

  $http.get('/users/all_users')
 .success(function(response){  
  $scope.all_users = response
// Setting up the 2 button press event functions, then calling add new profile function
  $(document).ready(function(event) {  
    $("div#swipe_like").on( "click", function() {
      swipeLike();
    }); 
    $("div#swipe_dislike").on( "click", function() {
      swipeDislike();
    }); 
    addNewProfile();

  function swipe() {
    Draggable.create("#photo", {
      throwProps:true,
      onDragEnd:function(endX) {
        if(Math.round(this.endX) > 0 ) {
          swipeLike();      
        }
        else {
          swipeDislike();
        }
        console.log(Math.round(this.endX));
    }
    });
  }

  function swipeLike() {    
    var $photo = $("div.content").find('#photo');
    var swipe = new TimelineMax({repeat:0, yoyo:false, repeatDelay:0, onComplete:remove, onCompleteParams:[$photo]});
    swipe.staggerTo($photo, 0.8, {bezier:[{left:"+=400", top:"+=300", rotation:"60"}], ease:Power1.easeInOut});
    addNewProfile();
  }

  function swipeDislike() { 
    var $photo = $("div.content").find('#photo');
    var swipe = new TimelineMax({repeat:0, yoyo:false, repeatDelay:0, onComplete:remove, onCompleteParams:[$photo]});
    swipe.staggerTo($photo, 0.8, {bezier:[{left:"+=-350", top:"+=300", rotation:"-60"}], ease:Power1.easeInOut});
    addNewProfile();
  }

  function remove(photo) {
    $(photo).remove();
  }

  function addNewProfile() {

    var names = []
    var elo = []
    var photos = []
    var matches = []
    for (i = 0; i < response.length; i++ ) {
     elo.push(response[i].elo);
     names.push(response[i].first_name);
     photos.push(response[i].user_image.url);
     matches.push(response[i].losses + response[i].wins)
    }


    function random(response) {
      return Math.floor(Math.random() * response.length) + 1
    }
    var random = random(response);
    var names = names[random]
    var elo = elo[random]
    var photos = photos[random]
    var matches = matches[random]


    $("div.content").prepend('<div class="photo" id="photo" style="background-image:url('+photos+')">'
      + '<span class="meta">' 
      + '<p>'+names+'</p>' 
      + '<span class="distance">ELO ' +elo+'</span>'    
      + '<p>distance:</p>'
      + '<p>matches: '+matches+'</p>'
      + '</span>' 
      + '</div>');


    // $("div.tinder-info").prepend('<div class="td-info">'
    //   + '<h2>' + names + '</h2>'
    //   + '<p>ELO: ' +elo+ '</p>'  
    //   + '<p>matches: '+matches+'</p>'
    //   + '</div>');


      swipe();
  }

  });

});


 

}]);