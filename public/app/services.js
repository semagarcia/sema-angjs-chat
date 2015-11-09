(function() {
	'use strict';

	/**
	 * AuthService
	 */
	app.service('AuthService', ['$q', '$http', function($q, $http){
	  var userInfo = { };

	  var login = function(user, pass) {
	    var deferred = $q.defer();
	    $http.post('/api/login', { user : user, pass : pass })
	      .success(function(data){
	        userInfo = data;
	        deferred.resolve(true);
	      })
	      .error(function(msg, code){
	        deferred.reject(msg);
	      });
	    return deferred.promise;
	  }

	  var isLoggedIn = function() {
	    return (userInfo.userId) ? true : false;
	  }

	  var getUserInfo = function() {
	    return userInfo;
	  }

	  var getRoomsToJoin = function() {
	    return userInfo.projectRooms;
	  }

	  return {
	    login : login,
	    isLoggedIn : isLoggedIn,
	    getUserInfo : getUserInfo,
	    getRoomsToJoin : getRoomsToJoin
	  }
	}]);



	/**
	 * ChatService
	 */
	app.service('ChatService', ['NotificationService', 'RoomService', 'SocketService', function(NotificationService, RoomService, SocketService){ 
	  var chats = [];

	  function initListeners() {
	    SocketService.on('join:logged-user', function(newUser) {
	    	newUserJoined(newUser);
	    });
	    SocketService.on('msg:recv-message', function(dataMessageReceived) {
	      addMessage(dataMessageReceived);
	    });

	  }

	  function joinRooms() {
	    initListeners();
	    RoomService.joinRooms();
	  }

	  function newUserJoined(newUser) {
	  	if(newUser.room === RoomService.getCurrentRoom().id)
	  		NotificationService.newConnectedUser(newUser);
	  }

	  function addMessage(dataMessageBundle) {
	    chats.push({
	      roomId : dataMessageBundle.roomId,
	      user : dataMessageBundle.sender,
	      timestamp : moment(dataMessageBundle.timestamp).format('llll'),
	      msg : dataMessageBundle.message,
	      avatar : dataMessageBundle.avatar
	    });
	  }

	  function sendMessage(message) {
	    SocketService.sendMessage(RoomService.getCurrentRoom().id, message);
	  }

	  return {
	    chats : chats,
	    joinRooms : joinRooms,
	    sendMessage : sendMessage
	  }
	}]);



	/**
	 * RoomService
	 */
	app.service('RoomService', ['AuthService', 'SocketService', function(AuthService, SocketService){ 
	  var currentRoom = {
	    id : '5afc06e3-398a-45de-95f7-197cc07fba92',
	    name : 'Conversación global',
	    numUsers : 9
	  };

	  function joinRooms() {
	    angular.forEach(AuthService.getRoomsToJoin(), function(room) {
	      /*if(room.defaultRoom) RoomService.setDefaultRoom(room);
	      chats[room.id] = {
	        title : room.title,
	        messages : [], // TODO: populate with the 5 last messages from server mongodb
	        numUsers : 1 // TODO: populate with the real number of users
	      };*/
	    });

	    // Join to the server
	    SocketService.emitInitJoinEvent();
	  }

	  function getCurrentRoom() {
	    return currentRoom;
	  }

	  return {
	    joinRooms : joinRooms,
	    getCurrentRoom : getCurrentRoom
	  }
	}]);



	/**
	 * SocketService
	 */
	app.service('SocketService', ['AuthService', '$timeout', function(AuthService, $timeout){ 

	  var socket = io.connect();

	  function on(eventName, callback) {
	    socket.on(eventName, function(data) {
	      $timeout(function() {  // Test to replace $timeout by $scope.$evalAsync() 
	        // As a very high level, the $digest loop looks like this:
	        // Do:
	        // - - - If asyncQueue.length, flush asyncQueue.
	        // - - - Trigger all $watch handlers.
	        // - - - Check for "too many" $digest iterations.
	        // While: ( Dirty data || asyncQueue.length )

	        // $scope.$evalAsync() encola la expresión en la asyncQueue para intentar ejecutarla en el mismo "tick of JS loop"
	        // Con $timeout lo que Angular intenta es posponerlo para ejecutarlo en el siguiente tick posible
	        callback(data);
	      });
	    });
	  }

	  function emitInitJoinEvent() {
	    socket.emit('join:init', {
	    	who : AuthService.getUserInfo().name,
	    	rooms : AuthService.getRoomsToJoin(),
	    	avatar : AuthService.getUserInfo().avatar
	    });
	  }

	  function sendMessage(roomId, message) {
	    socket.emit('msg:send-message', {
	      room : roomId,
	      message : message, 
	      sender : AuthService.getUserInfo().name,
	      avatar : AuthService.getUserInfo().avatar
	    });
	  }

	  return {
	    on : on,
	    sendMessage : sendMessage,
	    emitInitJoinEvent : emitInitJoinEvent
	  }
	}]);



	/**
	 * NotificationService
	 */
	app.factory('NotificationService', function(){

		var notificationEvents = ['onclick', 'onshow', 'onerror', 'onclose'];

	  function sendNotification() {
	    Notification.requestPermission(function() {
	      var notification = new Notification('Evento registrado', {
	        body: 'Texto de la nueva notificación',
	        tag: 'message',
	        icon: 'http://www.everis.com/spain/Style%20Library/Images/General/logo_everis.png'
	      });

	      notificationEvents.forEach(function(eventName) {
	        notification[eventName] = function(event) {
	          console.log('Event: ' + eventName);
	        };
	      });
	    });
	  }

	  function newConnectedUser(newUser) {
	  	Notification.requestPermission(function() {
	      var notification = new Notification(newUser.action, {
	        body: newUser.who + ' está ahora online',
	        tag: 'message',
	        icon: newUser.avatar
	      });
	  	});
	  }

	  return {
	  	newConnectedUser : newConnectedUser,
	    sendNotification : sendNotification
	  }
	});
	
})(angular);