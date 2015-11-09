(function() {
	'use strict';

	/** 
	 * Profile user area: put the user image, the name and the responsability.
	 */
	app.directive('semaUserProfile', ['AuthService', function(AuthService) {
	  return {
	    restrict : 'E',
	    template : '<div class="team-menu">' +
	                '  <div class="profile">' +
	                '    <div class="profile-pic">' +
	                '     <img src="' + AuthService.getUserInfo().avatar + '" ng-click="testInc()" />' +
	                '   </div>' +
	                '   <div class="profile-whoami">' +
	                '     <span>' + AuthService.getUserInfo().name + '</span><br />' +
	                '     <span>' + AuthService.getUserInfo().charge + '</span>' +
	                '    </div>' +
	                '  </div>' +
	                '</div>',
	    replace : true
	  };
	}]);

	/**
	 * Message directive: sender's avatar, sender's name, date and message.
	 */
	app.directive('semaChatArea', function() {
	  return {
	    restrict : 'E',
	    replace : true,
	    scope : false,
	    template : ' <div class="chat-message-zone">' +
	                '   <div ng-repeat="message in messages track by $index">' +
	                '     <div class="message">' +
	                '       <a><img class="message_profile-pic" src="{{message.avatar}}" /></a>' +
	                '       <a class="message_username">{{message.user}}</a>' +
	                '       <span class="message_timestamp">{{message.timestamp}}</span>' +
	                '       <span class="message_star"></span>' +
	                '       <span ng-bind-html="message.msg | unsafe" class="message_content"></span>' +
	                '     </div>' +
	                '   </div>' +
	                '</div>', 
	    controller : function($scope) { },
	    link : function() { }
	  }
	});

	/**
	 * Room header info: show the name of the current room and then number of users.
	 */
	app.directive('semaCurrentRoomHeaderInfo', function() {
	  return {
	    restrict : 'E',
	    scope : true,
	    template : '<div class="channel-menu">' +
	                ' <span class="channel-menu_name">' +
	                '   <span class="channel-menu_prefix">#</span>{{room}}</span>' +
	                '   :: ' +
	                '   <span><i class="icon-large icon-user"></i><span>{{numUsers | semaPluralUsers}}</span>' +
	                ' </span>' +
	                '</div>',
	    replace : true,
	    controller : function($scope, RoomService) {
	      $scope.room = RoomService.getCurrentRoom().name;
	      $scope.numUsers = RoomService.getCurrentRoom().numUsers;
	    },
	    link : function($scope, element, attrs, controller) {}
	  };
	});

	/**
	 * List of user's project channel
	 */
	app.directive('semaProjectChannels', function() {
	  return {
	    restrict : 'E',
	    scope : false,
	    template : '<div class="listings_channels">' +
	                '   <h2 class="listings_header" ng-click="toggle()">Salas de conversación</h2>' +
	                '   <ul id="project-channel_list" class="channel_list" ng-repeat="room in roomsSuscribed">' +
	                '     <li class="channel">' +
	                '       <a class="channel_name" ng-click="switchProjectRoom(room.id)">' +
	                '         <span ng-show="room.unread > 0" class="unread">{{room.unread}}</span>' +
	                '         <span>'+
	                '           <span class="prefix"># </span>{{room.title}}' +
	                '         </span>' +
	                '       </a>' +
	                '     </li>' +
	                '   </ul>' +
	                '</div>',
	    replace : true,
	    controller : function($scope) { },
	    link : function(scope, element, attrs) { }
	  };
	});

	/**
	 * List of individual chats (P2P Direct Messages)
	 */
	app.directive('semaP2pDm', function() {
	  return {
	    restrict : 'E',
	    scope : { 
	      dmChats : '='
	    },
	    template : '<div class="listings_direct-messages">' +
	                ' <h2 class="listings_header">Conversaciones privadas</h2>' +
	                ' <ul id="offtopic-channel_list" class="offtopic-channel_list" ng-repeat="p2pChat in dmChats">' +
	                '   <li class="channel">' +
	                '     <a class="channel_name" ng-click="changeToP2pChannel($index)">' +
	                '       <span ng-show="p2pChat.unread > 0" class="unread">{{p2pChat.unread}}</span>' +
	                '       <span>'+
	                '         <span class="prefix"># </span>{{p2pChat.who}}' +
	                '       </span>' +
	                '     </a>' +
	                '   </li>' +
	                ' </ul>' +
	                '</div>',
	    replace : true,
	    transclude : false,
	    controller : function($scope) {
	      $scope.changeToP2pChannel = function(index) {
	      };
	    },
	    link : function($scope, element, attrs, controller) { }
	  };
	});

	/**
	 * List of OffTopic channels
	 */
	app.directive('semaOfftopicChannels', function() {
	  return {
	    restrict : 'E',
	    scope : { 
	      ocChats : '='
	    },
	    template : '<div class="listings_other-offtopic-groups">' +
	            ' <h2 class="listings_header">Otros grupos - Off topic</h2>' +
	            ' <ul id="offtopic-channel_list" class="offtopic-channel_list" ng-repeat="offTopicChat in ocChats">' +
	            '     <li class="channel">' +
	            '       <a class="channel_name" ng-click="changeToOffTopicChannel($index)">' +
	            '         <span ng-show="offTopicChat.unread > 0" class="unread">{{offTopicChat.unread}}</span>' +
	            '         <span>'+
	            '           <span class="prefix"># </span>{{offTopicChat.title}}' +
	            '         </span>' +
	            '       </a>' +
	            '     </li>' +
	            ' </ul>' +
	            '</div>',
	    replace : true,
	    transclude : false,
	    controller : function($scope) {
	      $scope.changeToOffTopicChannel = function(index) {
	      };
	    },
	    link : function($scope, element, attrs, controller) { } 
	  };
	});

	/**
	 *
	 */
	app.directive('semaWritterBox', function() {
	  return {
	    restrict : 'EA',  
	    scope : {
	      addMessage : '&'
	    },
	    template : '<div class="input-box">' +
	                ' <input type="text" id="input-box_text" class="input-box_text" placeholder="Escriba aquí su texto..." autofocus />' +
	                '</div>', 
	    replace : true,
	    controller : function($scope, ChatService) { 
	      // Send a message to the server
	      $scope.sendMessage = function(message) {
	        $scope.$apply(function() {
	          ChatService.sendMessage(message);
	        });
	      };
	    },
	    link : function($scope, element, attrs, controller) {
	      // Set a listener when the user press the enter key
	      element.bind('keypress', function(event){
	        var inputText = element.children();
	        if(event.keyCode === 13 && inputText.val().trim() !== '') {
	          $scope.sendMessage(inputText.val());
	          inputText.val('');
	        }
	      });
	    }
	  };
	});



	/**
	 * User menu area
	 */
	app.directive('semaChatMenu', function(AuthService) {
	  return {
	    restrict : 'E',
	    scope : { },
	    template : '<div class="user-menu">' +
	                ' <img class="user-menu_profile-pic" src="' + AuthService.getUserInfo().avatar + '" ng-click="addUnread()" />' +
	                ' <span id="user-name-username" class="user-menu_username">{{username}}</span>' +
	                ' <img class="connection_icon">' +
	                ' <span class="connection_status">online</span>' +
	                '</div>',
	    controller : function($scope) { },
	    link : function(scope, element, attrs, controller) { }
	  };
	});
})(angular);