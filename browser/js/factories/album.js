app.factory('AlbumFactory', function ($http, SongFactory, Cache, $q) {
	var AlbumFactory = {};
  
    var albumCache = {};
  
	AlbumFactory.fetchAll = function () {
      
        //clean the cache
        Cache.clean(albumCache, 1)
        
        //return a promise for the cache if the cache exists
        if (albumCache.all) return Cache.returnCache(albumCache.all);
        
		return $http.get('/api/albums')
		.then(function (response) {
			return response.data;
		})
		.then(function (albums) {
            albums = albums.map(AlbumFactory.convert);
            albumCache.all = albums;
			return albums;
		});
	};
	AlbumFactory.fetchById = function (id) {
      
        Cache.clean(albumCache, 1);
      
        if (albumCache[id]) return Cache.returnCache(albumCache[id]);  
      
		return $http.get('/api/albums/' + id)
		.then(function (response) {
			return response.data;
		})
		.then(AlbumFactory.convert)
		.then(function (album) {
			album.songs = album.songs.map(function (s) {
				return SongFactory.convert(s, album.artists);
			});
            albumCache[id] = album;
			return album;
		});
	};
	AlbumFactory.convert = function (raw) {
		raw.imageUrl = '/api/albums/' + raw._id + '.image';
		return raw;
	};
	return AlbumFactory;
});