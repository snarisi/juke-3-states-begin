app.controller('AlbumCtrl', function ($scope, $rootScope, PlayerFactory, AlbumFactory, $stateParams) {

	$scope.isCurrent = function (song) {
		var current = PlayerFactory.getCurrentSong();
		return current && current._id == song._id;
	};
	$scope.start = function (song) {
		PlayerFactory.start(song, $scope.album.songs);
	};

	
	AlbumFactory.fetchById($stateParams.id)
	.then(function (album) {
		$scope.album = album;
	});



});