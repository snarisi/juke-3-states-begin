app.factory('PlayerFactory', function ($rootScope) {

	var isPlaying = false;
	var currentSongList;
	var currentSong = null;
	var progress = 0;
	var Player = {};
	
	var songCache = {};
	var currentAudio;

	var makeAudio = function(url) {
		var audio = document.createElement('audio');
		audio.addEventListener('ended', function () {
			Player.next();
		});

		audio.addEventListener('timeupdate', function () {
			progress = audio.currentTime / audio.duration;
			$rootScope.$digest();
		});

		audio.timeStamp = Date.now();
		audio.src = url;
		audio.load();
		return audio;
	}


	Player.getCurrentSong = function () {
		return currentSong;
	};

	Player.getProgress = function () {
		return progress;
	};

	Player.isPlaying = function () {
		return isPlaying;
	};

//	load
		
	
	function preLoad(song) {
		console.log(song);
		songCache[song._id] = songCache[song._id] || makeAudio(song.audioUrl);
	}
	
	function load (song, songList) {
		songCache[song._id] = songCache[song._id] || makeAudio(song.audioUrl);
		currentSong = song;
		currentSongList = songList;
		currentAudio = songCache[song._id];
		currentAudio.currentTime = 0;
		preLoad(getNextSong(currentSongList.indexOf(song)));
	}

	Player.pause = function () {
		if (currentAudio) currentAudio.pause();
		isPlaying = false;
	};

	Player.resume = function () {
		currentAudio.play();
		isPlaying = true;
	};

	Player.start = function (song, songList) {
		songList = songList || currentSongList;
		Player.pause();
		load(song, songList);
		Player.resume();
	};
	
	function getNextSong (index) {
		index += currentSongList.length
		index %= currentSongList.length;
		return currentSongList[index + 1];
	}

	function moveTo (index) {
		Player.start(getNextSong(index));
	};

	Player.next = function () {
		var index = currentSongList.indexOf(currentSong);
		moveTo(index + 1);
	};

	Player.previous = function () {
		var index = currentSongList.indexOf(currentSong);
		moveTo(index - 1);
	};

	return Player;
});