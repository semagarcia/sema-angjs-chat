var app = angular.module('SemaChat', ['ui.router', 'emoji']); 

/**
 * Configuration
 */
app
  .config(function($stateProvider, $urlRouterProvider) {
    // TODO: add security check (resolve attr of each state)
    $stateProvider
      .state('login', {
          url: '/login',
          templateUrl: 'html/login.html'
      })    
      .state('sema-chat', {
          url : '/sema-chat',
          templateUrl : 'html/sema-chat.html'
      });

    // Default URL
    $urlRouterProvider.otherwise('/login');

    // Set the moment locale => pass to a specific config phase (I18N config step)
    moment.locale(window.navigator.userLanguage || window.navigator.language);
  })
  .run(function($rootScope, $location, $state, AuthService) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
      if(next.name !== 'login' && !AuthService.isLoggedIn()) {
        event.preventDefault();
        $state.go('login');
      } 
    });
  });