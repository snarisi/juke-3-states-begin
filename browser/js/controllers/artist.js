app.controller('ArtistCtrl', function ($scope, $rootScope, PlayerFactory, ArtistFactory) {
	
	$rootScope.$on('changeView', function (evt, data) {
		if (data.name == 'oneArtist') {
			$scope.showMe = true;
			ArtistFactory.fetchById(data.id)
			.then(function (artist) {
				$scope.artist = artist;
			});
		} else {
			$scope.showMe = false;
		}
	});

	$scope.viewAlbum = function (albumId) {
		$rootScope.$broadcast('changeView', {
			name: 'oneAlbum',
			id: albumId
		});
	};

	$scope.isCurrent = function (song) {
		var current = PlayerFactory.getCurrentSong();
		return current && current._id == song._id;
	};
	$scope.start = function (song) {
		PlayerFactory.start(song, $scope.artist.songs);
	};

});