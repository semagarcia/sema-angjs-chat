(function() {
  'use strict';

  /**
   * Login Controller
   */
  app.controller('LoginCtrl', ['$scope', '$state', 'AuthService', function($scope, $state, AuthService) {
    $scope.username = '';
    $scope.password = '';

    /**
     * Login function: call to the backend service.
     */
    $scope.login = function(user, pass) {
      AuthService.getUserInfo().username = user;
      AuthService.getUserInfo().password = pass;
      AuthService.login(AuthService.getUserInfo().username, AuthService.getUserInfo().password).then(
        function(userData) {  
          $state.go('sema-chat');
        },
        function(err) {
          window.alert('Login incorrecto!');
        }
      );
    };
  }]);

  /**
   * Main Controller
   */
  app.controller('mainCtrl', ['$scope', 'AuthService', 'ChatService', 
      function($scope, AuthService, ChatService) {

    // Init phase (first step): join into the rooms
    ChatService.joinRooms();

    // Init phase (second phase): this array will be populated after authService call
    $scope.messages = ChatService.chats;
    $scope.roomsSuscribed = AuthService.getUserInfo().projectRooms;
    $scope.dmChats = AuthService.getUserInfo().p2pChats;
    $scope.ocChats = AuthService.getUserInfo().otherGroups;
    $scope.username = AuthService.getUserInfo().username;

    // Function to switch the current room
    $scope.switchProjectRoom = function(roomId) { }

  }]);

})(angular);