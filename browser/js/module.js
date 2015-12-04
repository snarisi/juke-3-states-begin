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
});
