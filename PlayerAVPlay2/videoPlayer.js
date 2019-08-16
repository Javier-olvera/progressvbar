/**
 * Player object constructor.
 *
 * @param   {Object} config - Playback and player configuration.
 * @returns {Object}
 */
function VideoPlayer(config) {


    /**
     * HTML av-player element
     */
    var player = config.player;
    var progress = 0;
    var totalMilisec =0;
    /**
     * HTML controls div
     */
    var controls = config.controls;

    /**
     * Fullscreen flag
     * @type {Boolean}
     */
    var isFullscreen = false;

    var defaultResolutionWidth = 1920;
    var resolutionWidth = config.resolutionWidth;

    var playerCoords = {
        x: 533,
        y: 400,
        width: 854,
        height: 480
    };
    
    return {
        /**
         * Function to initialize the playback.
         * @param {String} url - content url, if there is no value then take url from config
         */
    	open: function(url){
    		/* Create listener object. */
            var listener = {
                onbufferingstart: function () {
                    console.log("Buffering start.");
                },
                onbufferingprogress: function (percent) {
                	console.log("Buffering progress data : " + percent);
                },
                onbufferingcomplete: function () {
                	console.log("Buffering complete.");
                	this.play();
                	//calculo de tiempo de duracion para imprimir
                	totalMilisec = webapis.avplay.getDuration();
                	var Hours = Math.floor(totalMilisec/3600000);
                	var Minutes = Math.floor((totalMilisec - (Hours * 3600000)) / 60000);
                	var Seconds = Math.floor((totalMilisec - (Hours * 3600000) - (Minutes * 60000)) / 1000);
                	var HorasF = "0";
                	var MinutosF = "0";
                	var SegundosF = "0";
                	if(Hours%10 == 0){
                		HorasF = "0"+Hours;
                		
                	}else{
                		HorasF = Hours;
                	}
                	
                	if(Seconds%10 == 0){
                		SegundosF = "0"+Seconds;
                		
                	}else{
                		SegundosF = Seconds;
                	}
                	if(Minutes%10 == 0){
                		MinutosF = "0"+Minutes;
                		
                	}else{
                		MinutosF = Minutes;
                	}
                	
                	console.log("Tiempo de duracion");
                	console.log(HorasF+":"+MinutosF+":"+SegundosF);
                	
                },
                oncurrentplaytime: function (currentTime) {
                	console.log("Current playtime: " + currentTime);
                	console.log("la peque videos: "+ webapis.avplay.getCurrentTime());
                	progress = ((currentTime*100) / totalMilisec);
                	console.log(progress);
                	document.getElementById("progressbar").style.width = progress+"%";
                },
                onevent: function (eventType, eventData) {
                	console.log("event type: " + eventType + ", data: " + eventData);
                },
                onstreamcompleted: function () {
                	console.log("Stream Completed");
                    this.stop();
                }.bind(this),
                onerror: function (eventType) {
                	console.log("event type error : " + eventType);
                }
            };
            if (!url) {
                url = config.url;
            }
           
            try {
                webapis.avplay.open(url);
                webapis.avplay.setDisplayRect(
                        playerCoords.x,
                        playerCoords.y,
                        playerCoords.width,
                        playerCoords.height
                    );
                webapis.avplay.setListener(listener);
            } catch (e) {
                console.log(e);
            }
            
            	
            
           
    	},
    	
        play: function () {
                   
            
            if (webapis.avplay.getState() === 'IDLE') {
            	webapis.avplay.prepare();                
                webapis.avplay.play();
            } else if(webapis.avplay.getState() === 'PAUSED'){
            	webapis.avplay.play();
            }            
        },
       
        /**
         * Function to stop current playback.
         */
        stop: function () {
            webapis.avplay.stop();

            //switch back from fullscreen to window if stream finished playing
            if (isFullscreen === true) {
                this.toggleFullscreen();
            }
            
        },
        /**
         * Function to pause/resume playback.
         * @param {String} url - content url, if there is no value then take url from config
         */
        pause: function (url) {
            if (!url) {
                url = config.url;
            }
            webapis.avplay.pause();
        },
        /**
         * Jump forward 3 seconds (3000 ms).
         */
        ff: function () {
            webapis.avplay.jumpForward('3000');
        },
        /**
         * Rewind 3 seconds (3000 ms).
         */
        rew: function () {
            webapis.avplay.jumpBackward('3000');
        },
        /**
         * Show streaming properties on the screen.
         */
        progressBar: function(tiempo){
        	progress = ((tiempo*100) / totalMilisec);
        	document.getElementById("progressbar").style.width = "progress%";
        },
        
        getProperties: function () {
            var text =  webapis.avplay.getStreamingProperty("DURATION");
            console.log(text);
          
            
        },
        /**
         * Switch between full screen mode and normal windowed mode.
         */
        toggleFullscreen: function () {
            if (isFullscreen === false) {
                webapis.avplay.setDisplayRect(0, 0, 1920, 1080);
                player.classList.add('fullscreenMode');
                controls.classList.add('fullscreenMode');
                isFullscreen = true;
            } else {
            	console.log('Fullscreen off');
                try {
                    webapis.avplay.setDisplayRect(
                        playerCoords.x,
                        playerCoords.y,
                        playerCoords.width,
                        playerCoords.height
                    );
                } catch (e) {
                	console.log(e);
                }
                player.classList.remove('fullscreenMode');
                controls.classList.remove('fullscreenMode');
                isFullscreen = false;
            }
        }
    };
}
