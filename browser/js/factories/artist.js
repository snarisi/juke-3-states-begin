app.factory('ArtistFactory', function ($http, $q, AlbumFactory, SongFactory, Cache) {
	var ArtistFactory = {};
    var artistCache = {};
	
	ArtistFactory.fetchAll = function () {
		Cache.clean(artistCache, 1);
		
		if (artistCache.all) return artistCache.all;
		
		return $http.get('/api/artists')
		.then(function (response) {
			artistCache.all = response.data;
			return response.data;
		});
	};
	ArtistFactory.fetchById = function (id) {
		Cache.clean(artistCache, 1);
		
		if (artistCache[id]) return artistCache[id];
		
		if (artistCache[id]) return 
		var url = '/api/artists/' + id;
		return $q.all([$http.get(url), $http.get(url + '/songs'), $http.get(url + '/albums')])
		.then(function (arr) {
			var artist = arr[0].data;
			var songs = arr[1].data.map(SongFactory.convert);
			var albums = arr[2].data.map(AlbumFactory.convert);
			artist.songs = songs;
			artist.albums = albums;
			artistCache[id] = artist;
			return artist;
		});
	};
	return ArtistFactory;
});