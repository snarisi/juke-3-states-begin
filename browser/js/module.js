var app = angular.module('juke', ['ui.router']);

app.config(function($stateProvider) {

  $stateProvider.state('albums', {
    url: '/albums',
    templateUrl: '/albums.html',
    controller: 'AlbumsCtrl'
  });
    
  $stateProvider.state('artists', {
    url: '/artists',
    templateUrl: '/artists.html',
    controller: 'ArtistsCtrl'
  });

  $stateProvider.state('album',{
    url: '/albums/:id',
    templateUrl: '/album.html',
    controller: 'AlbumCtrl'
  });

  $stateProvider.state('artist',{
    url: '/artists/:id',
    templateUrl: '/artist.html',
    controller: 'ArtistCtrl'
  });
  
  $stateProvider.state('artist.albums',{
    url: '/artists/:id/albums',
    templateUrl: '/artist-albums.html',
  });
  
  $stateProvider.state('artist.songs',{
    url: '/artists/:id/songs',
    templateUrl: '/artist-songs.html',
  });

});
