(function() {
	'use strict';

	/**
	 * Filter to set the label of numUsers
	 */
	app.filter('semaPluralUsers', function() {
	  return function(numUsers) {
	    if(isNaN(numUsers) || numUsers < 0) {
	      return numUsers;
	    } else {
	      if(numUsers == 0) return 'No hay usuarios';
	      if(numUsers == 1) return '1 usuario';
	      if(numUsers >= 2) return numUsers + ' usuarios';
	    }
	  };
	});



	/**
	 * Filter to allow emojis
	 */
	app.filter('unsafe', function($filter, $sce) {
	  return function(text) {
	    return $sce.trustAsHtml($filter('emoji')(text));
	  };
	});
	
})(angular);