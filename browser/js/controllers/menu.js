app.controller('MenuCtrl', function ($scope, $rootScope) {
	$scope.viewAlbums = function () {
		$rootScope.$broadcast('changeView', {
			name: 'allAlbums'
		});
	};
	$scope.viewArtists = function () {
		$rootScope.$broadcast('changeView', {
			name: 'allArtists'
		});
	};
});