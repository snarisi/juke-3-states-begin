app.factory('PlayerFactory', function ($rootScope) {

	var audio = document.createElement('audio');
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
			tools.next();
		});

		audio.addEventListener('timeupdate', function () {
			progress = 100 * audio.currentTime / audio.duration;
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

	function load (song, songList) {
		songCache[song._id] = songCache[song._id] || makeAudio(song.audioUrl);
		currentSong = song;
		currentSongList = songList;
		currentAudio = songCache[song._id]
		progress = 0;
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

	function moveTo (index) {
		index += currentSongList.length
		index %= currentSongList.length;
		Player.start(currentSongList[index]);
	};

	Player.next = function () {
		var index = currentSongList.indexOf(currentSong);
		moveTo(index + 1);
	};

	Player.previous = function () {
		var index = currentSongList.indexOf(currentSong);
		moveTo(index - 1);
	};

	audio.addEventListener('timeupdate', function () {
		progress = audio.currentTime / audio.duration;
		$rootScope.$digest();
	});

	audio.addEventListener('ended', function () {
		Player.next();
		$rootScope.$digest();
	});

	return Player;
});