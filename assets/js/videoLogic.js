window.onload = function() {
    // Video
    var video = document.getElementById("video");

    // playlist
    var playlist = [{ id: "abc123", start: 0, end: 40, url: "http://vod.linnovate.net:1935/weplay/weplay/BigBuckBunny/smil:BigBuckBunny.smil/manifest.mpd?wowzaplaystart=30000&wowzaplayduration=40000" },
        { id: "abc124", start: 40, end: 160, url: "http://vod.linnovate.net:1935/weplay/weplay/berlad/berlad_720p.mp4/manifest.mpd" }
    ];
    var durationSum = getDurationSum();

    var player = dashjs.MediaPlayer().create();
    player.initialize(document.querySelector("#video"), playlist[0].url, true);
    var currentVideo = playlist[0];

    // Buttons
    var playButton = document.getElementById("play-pause");
    var muteButton = document.getElementById("mute");
    var fullScreenButton = document.getElementById("full-screen");

    // Sliders
    var seekBar = document.getElementById("seek-bar");
    var volumeBar = document.getElementById("volume-bar");

    // PLAY BUTTON  =====================================================

    // Event listener for the play/pause button
    playButton.addEventListener("click", function() {
        if (video.paused == true) {
            // Play the video
            video.play();

            // Update the button text to 'Pause'
            playButton.innerHTML = "Pause";
        } else {
            // Pause the video
            video.pause();

            // Update the button text to 'Play'
            playButton.innerHTML = "Play";
        }
    });
    // MUTE BUTTON =====================================================
    // Event listener for the mute button
    muteButton.addEventListener("click", function() {
        if (video.muted == false) {
            // Mute the video
            video.muted = true;

            // Update the button text
            muteButton.innerHTML = "Unmute";
        } else {
            // Unmute the video
            video.muted = false;

            // Update the button text
            muteButton.innerHTML = "Mute";
        }
    });

    // Event listener for the full-screen button
    fullScreenButton.addEventListener("click", function() {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen(); // Firefox
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen(); // Chrome and Safari
        }
    });

    // SEEKBAR ============================================================

    // Event listener for the seek bar
    seekBar.addEventListener("change", function() {
        // Calculate the new time
        //var time = video.duration * (seekBar.value / 100);
        checkCurrentVideo(seekBar.value);
        var time = durationSum * (seekBar.value / 100);
        // Update the video time
        video.currentTime = time - currentVideo.start;
    });

    // Update the seek bar as the video plays
    video.addEventListener("timeupdate", function() {
        // Calculate the slider value
        var value = (100 / durationSum) * (video.currentTime + currentVideo.start);
        console.log(value.toFixed(5));
        // Update the slider value
        seekBar.value = value.toFixed(5);
    });

    // Pause the video when the slider handle is being dragged
    seekBar.addEventListener("mousedown", function() {
        video.pause();
        playButton.innerHTML = "Play"
    });

    // Play the video when the slider handle is dropped
    seekBar.addEventListener("mouseup", function() {
        video.play();
        playButton.innerHTML = "Pause"
    });

    // LOAD NEW VIDEO ================================================
    video.addEventListener("ended", function() {
    	checkCurrentVideo(seekBar.value);
    });

    // VOLUME SHIT ========================================================

    // Event listener for the volume bar
    volumeBar.addEventListener("change", function() {
        // Update the video volume
        video.volume = volumeBar.value;
    });

    function getDurationSum() {
        return playlist[(playlist.length - 1)].end;
    }

    function checkCurrentVideo(range) {
        var currentTime = (durationSum * (range / 100));
        playlist.forEach(function(video) {
            if (currentVideo.id != video.id && currentTime >= video.start && currentTime < video.end) {
                currentVideo = video;
                loadNewVideo(video);
            }
        });
    }

    function loadNewVideo(video) {
        player.attachSource(video.url);
    }
}
