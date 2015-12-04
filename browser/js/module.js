var app = angular.module('juke', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  
  if(window.history && window.history.pushState) {
    $locationProvider.html5Mode({enabled: true});
  }
  
  $urlRouterProvider.when('/', '/albums');
  $urlRouterProvider.when('/artists/{id}', '/artists/{id}/albums');

  $stateProvider.state('albums', {
    url: '/albums',
    templateUrl: '/albums.html',
    resolve: {
      albums: function(AlbumFactory) {
        return AlbumFactory.fetchAll();
      }
    },
    controller: 'AlbumsCtrl'
  });
    
  $stateProvider.state('artists', {
    url: '/artists',
    templateUrl: '/artists.html',
    resolve: {
      artists: function(ArtistFactory) {
        return ArtistFactory.fetchAll();
      }
    },
    controller: 'ArtistsCtrl'
  });

  $stateProvider.state('album',{
    url: '/albums/:id',
    templateUrl: '/album.html',
    controller: 'AlbumCtrl',
    resolve: {
      album: function(AlbumFactory, $stateParams) {
        return AlbumFactory.fetchById($stateParams.id);
      }
    }
  });

  $stateProvider.state('artist',{
   abstract: true, //gives an error message when this is used
    url: '/artists/:id',
    templateUrl: '/artist.html',
    controller: 'ArtistCtrl',
    resolve: {
      artist: function(ArtistFactory, $stateParams) {
        return ArtistFactory.fetchById($stateParams.id);
      }
    }
  });
  
  $stateProvider.state('artist.albums',{
    url: '/albums',
    templateUrl: '/artist-albums.html',
  });
  
  $stateProvider.state('artist.songs',{
    url: '/songs',
    templateUrl: '/artist-songs.html',
  });

});
