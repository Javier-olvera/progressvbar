
    var player;

    // flag to monitor UHD toggling
    var url ;
    var primerVideo = true;
    var config;
    var pag = 0;

    /**
     * Register keys used in this application
     */
    function registerKeys() {
        var usedKeys = [
            'MediaPlay',	
            'MediaPause',
            'MediaStop',
            'MediaFastForward',
            'MediaRewind',            
            '0',
            '1',
            '2',
            '3'
        ];

        usedKeys.forEach(
            function (keyName) {
                tizen.tvinputdevice.registerKey(keyName);
            }
        );
    }


    /**
     * Handle input from remote
     */
    function registerKeyHandler() {
        document.addEventListener('keydown', function (e) {
            switch (e.keyCode) {
                case 13:    // Enter
                    player.toggleFullscreen();
                    break;
                case 415:   // MediaPlay
                	player.play();
                	break;
                case 19:    // MediaPause
                    player.pause();
                    break;
                case 413:   // MediaStop
                    player.stop();
                    break;
                case 417:   // MediaFastForward
                	console.log("si existo");
                    player.ff();
                    break;
                case 412:   // MediaRewind
                    player.rew();
                    break;
                case 48: //Key 0
                	pag = 0;
                	console.log(pag);
                    break;
                case 49: //Key 1
                	//url = "http://localhost:8000/video1.mp4";
                	playback();
                    break;
                case 50: //Key 2
                	//url = "http://localhost:8000/video2.mp4";
                	playback();
                    break;
                case 51: //Key 3
                	console.log(pag);
                	pages();
                	pag = 1;
                	console.log(pag);
                    break;
                case 10009: // Return
                	exit();
                    /*if (webapis.avplay.getState() !== 'IDLE' && webapis.avplay.getState() !== 'NONE') {
                        player.stop();
                    }
                    tizen.application.getCurrentApplication().hide();*/
                    break;
              
            }
        });
    }
    function pages(){
    	pag = 1;
    	//window.location= "index2.html";
    	document.getElementById("test").style.href= "index2.html";
    }
    
    function exit(){
    	if (pag == 0){
    		console.log(pag);
    		 tizen.application.getCurrentApplication().hide();
    	}
    	else if(pag == 1){
    		console.log(pag);
    		window.location= "index.html";
    		
    		pag = 0; 
    		console.log(pag);
    	}
    }

    function playback(){
    	// initialize player - loaded from videoPlayer.js
    	if(primerVideo  == true){
    		primerVideo = false;
    		player = new VideoPlayer(config);
    	}
        
        player.open(url);
    }

    /**
     * Function initialising application.
     */
    window.onload = function () {

        registerKeys();
        registerKeyHandler();

        /**
         * Player configuration object.
         *
         * @property {String}    url                     - content url
         * @property {HTML Element} player           - application/avplayer object
         * @property {HTML Div Element} controls     - player controls
         * @property {HTLM Div Element} info         - place to display stream info
         */
        config = {
            url: url,
            player: document.getElementById('av-player'),
            controls: document.querySelector('.video-controls')
            /*Smooth Streaming examples*/
            //			url:
            // 'http://playready.directtaps.net/smoothstreaming/SSWSS720H264/SuperSpeedway_720.ism/Manifest',
            // url: 'http://playready.directtaps.net/smoothstreaming/TTLSS720VC1/To_The_Limit_720.ism/Manifest'
        };
        
        tizen.systeminfo.getPropertyValue(
                "DISPLAY",
                function (display) {
                    
                    config.resolutionWidth = display.resolutionWidth;

                    
                    
                    
                });
        


    }

