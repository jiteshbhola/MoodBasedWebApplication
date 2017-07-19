var currentSongNumber = 1;
var willLoop = 0;
var willShuffle=0;
 var songNumber = 1;
// ------------------------------------------------------------------play and pause the songs-------------------------------------------------------------------

function toggleSong()  
    {    
        var song = document.querySelector('audio'); //select audio from document
        if(song.paused == true) //if song is paused then play
            {
                console.log('Playing');
                $('.play-icon').removeClass('fa-play').addClass('fa-pause');//change icon to play and pause
                song.play();
            }
        else//if playing then pause
            {
                console.log('Pausing');
                $('.play-icon').removeClass('fa-pause').addClass('fa-play');
                song.pause();
            }
        } 

// -------------------------------------------------play and pause the songs on click of icon play and pause------------------------------------------------------

$('.play-icon').on('click', function() 
        {
            toggleSong();
        });

//-----------------------------------------------------play and pause on keypress spacebar --------------------------------------------------------------------

$('body').on('keypress', function(event)
    {   
        var target=event.target;
        if (event.keyCode == 32 && target.tagName !='INPUT')  //!=input so that song doesnt pause on pressing space in input box 
            {
                toggleSong();
            }
    });

//--------------------------------------------to show the time in mm:ss format---------------------------------------------------------------------------------

function fancyTimeFormat(time)
    {   
        // Hours, minutes and seconds
        var hrs = ~~(time / 3600);
        var mins = ~~((time % 3600) / 60);
        var secs = time % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }

//--------------------------------------shows current time elapsed and total duration----------------------------------------------------------------------

function updateCurrentTime() 
    {
        var song = document.querySelector('audio');
        var currentTime = Math.floor(song.currentTime);     //store times in variables and math.floor alters decimal value and returns integer value
        currentTime = fancyTimeFormat(currentTime);  //fancytime function called to alter time value
        var duration = Math.floor(song.duration);
        duration = fancyTimeFormat(duration);
        $('.time-elapsed').text(currentTime);      //find where to display them and display times
        $('.song-duration').text(duration);
    }

//---------------------------Arrray of song details as objects. Objects are often represented as key:value pairs-------------------------------------------------

var songs = [{
        'name': 'Ikk Kudi', //name is a key,with value 'ikk kudi'
        'artist': 'Diljit Dosanjh',
        'album': 'Udta punjab',
        'duration': '4;07',
       'fileName': 'song/acoustic/ikk.mp3',
       'image':'ik.jpg' 
    },
    {
        'name': 'Jeena Jeena',
        'artist': 'Atif Aslam',
        'album': 'Badlapur',
        'duration': '3:49',
        'fileName': 'song/acoustic/jen.mp3',
        'image':'jen.png'
    },
    {
        'name': 'Khamoshiyan-Reprise',
        'artist': 'Arijit Singh',
        'album': 'Khamoshiyan',
        'duration': '2:30',
        'fileName': 'song/acoustic/kha.mp3',
        'image':'kha.jpg'
    },
    {
        'name': 'Mera Mann-Reprise',
        'artist': 'Falak Shabir',
        'album': 'Nautanki Saala',
        'duration': '4:20',
        'fileName': 'song/acoustic/mer.mp3',
        'image':'mer.jpg'
    },
    {
        'name': 'Yaariyan-Reprise',
        'artist': 'Sunidhi Chauhan',
        'album': 'Cocktail',
        'duration': '5:13',
        'fileName': 'song/acoustic/yar.mp3',
        'image':'yar.jpg'
    }];

//----------------------------------------WINDOW.ONLOAD() waits for website to load fully and execute the function inside it-----------------------------------

window.onload = function()
{ 
    changeCurrentSongDetails(songs[0]);
    for(var i =0; i < songs.length;i++) //for loop to update the object values
        {      
            var obj = songs[i];     //Save the song object in variable 'obj'
            var name = '#song' + (i+1);  //name=song1/2/3/4
            var song = $(name);
            song.find('.song-name').text(obj.name);  //Pick the relevant object property and show it in the website
            song.find('.song-artist').text(obj.artist);
            song.find('.song-album').text(obj.album);
            song.find('.song-length').text(obj.duration);
            addSongNameClickEvent(obj,i+1);     //Add a click event on each song
        }   
    updateCurrentTime(); //function call to update current time on window.onload
    setInterval(function() //wait for specific interval, i.e. 1000ms in this case and perform function
        {
            updateCurrentTime(); //again update current time after 1000ms
        },1000);
};

//------------------------------------------------------------------------Initialize Datatables------------------------------------------------------------------

$(document).ready(function()//jQuery equivalent of window.onload,but benefit of using it is that you can have many of these in your JS file, but only one of windowonload
{ 
    $('#songs').DataTable(
    {
         paging: false
    });
});

//--------------------------------------------------------play and pause song on clicking on name-------------------------------------------------------------- 

function addSongNameClickEvent(songObj,position) 
{   
    var songName = songObj.fileName; // New Variable   //here we're getting song name and postion as a paramenter from the array of objects                      
    var id = '#song' + position;    //song1/2/3/4
    $(id).click(function() 
        {
            var audio = document.querySelector('audio');
            var currentSong = audio.src;
            if(currentSong.search(songName) != -1) //if current song is found on desired src,perform desired func
                {
                    toggleSong();
                }
            else 
                {
                    audio.src = songName;
                    toggleSong();
                    changeCurrentSongDetails(songObj);  // Function Call
                }
        });
}

//---------------------------------------on changing the song, the below function changes song details dynamically------------------------------------------------ 

function changeCurrentSongDetails(songObj) { //show song details when playing it
    $('.current-song-image').attr('src','img/' + songObj.image); //select the element with class 'current-song-image'
    $('.current-song-name').text(songObj.name) ;                 //set it's src attribute to something (.attr('src',...)       
    $('.current-song-album').text(songObj.album) ;               //The src is made of two strings added together: folder name + fileName 
}

//----------------------------------------------------------------for toggling loop,shufflee and mute icon-----------------------------------------------------------

$('.fa-repeat').on('click',function() //for on and off of loop button
{         
    $('.fa-repeat').toggleClass('disabled');
    willLoop = 1 - willLoop;    //changes the value of will loop to 0(off) and 1(on)
});
$('.fa-random').on('click',function() //for on and off of shuffle button
{         
    $('.fa-random').toggleClass('disabled');
    willShuffle = 1 - willShuffle;//changes the value of will shuffle to 0(off) and 1(on)
});
$('.fa-volume-off').on('click',function() //for on and off of shuffle button
{
    $('.fa-volume-off').toggleClass('disabled');
    });

//--------------------------------------------------for timejump to last 2 seconds,callled in console tab---------------------------------------------------------

function timeJump() 
{ 
    var song = document.querySelector('audio');
    song.currentTime = song.duration - 2;
}

//----------------------------------------------------------for audio mute,on click of mute icon-----------------------------------------------------------------

function toggleMuteAudio(){ 
    $("audio").prop("muted",!$("audio").prop("muted")); //prop is for property
}
$('.fa-volume-off').on('click',function()
{
    toggleMuteAudio();
});

//--------------------------------------------------------------for volume up on click of icon------------------------------------------------------------------

function volumeUp(){    //volumeup
    var volume = $("audio").prop("volume")+0.2;
    if(volume >1){
        volume = 1;
    }
    $("audio").prop("volume",volume);
}
 $('.fa-volume-up').on('click',function()
{
    volumeUp();
});

//--------------------------------------------------------------for volume down on click of icon------------------------------------------------------------------

function volumeDown(){  //volmedown
    var volume = $("audio").prop("volume")-0.2;
    if(volume <0){
        volume = 0;
    }
    $("audio").prop("volume",volume);
}
$('.fa-volume-down').on('click',function()
{
    volumeDown();
});

//--------------------------------------------------------------------for song loop------------------------------------------------------------------------------

$('.fa-repeat').on('click',function()
{
    $('audio').on('ended',function()    //looop 
    {  
        var audio = document.querySelector('audio');
        if(currentSongNumber < 5) 
            {
                var nextSongObj = songs[currentSongNumber];
                audio.src = nextSongObj.fileName;
                toggleSong();
                changeCurrentSongDetails(nextSongObj);
                currentSongNumber = currentSongNumber + 1;
            }
        else if(willLoop == 1) 
        {
            var nextSongObj = songs[0];
            audio.src = nextSongObj.fileName;
            toggleSong();
            changeCurrentSongDetails(nextSongObj);
            currentSongNumber =  1;
        }
        else 
        {
            $('.play-icon').removeClass('fa-pause').addClass('fa-play');
            audio.currentTime = 0;
        }
    });
});
//----------------------------------------------------------------------for song shuffle----------------------------------------------------------------------

function randomExcluded(min, max, excluded) 
{
    var n = Math.floor(Math.random() * (max-min) + min);
    if (n >= excluded) n++;
    return n;
}
$('.fa-random').on('click',function()
{
    $('audio').on('ended',function() 
        {
            var audio = document.querySelector('audio');
            if (willShuffle == 1) 
                {
                    var nextSongNumber = randomExcluded(1,5,currentSongNumber); // Calling our function from Stackoverflow
                    var nextSongObj = songs[nextSongNumber-1];
                    audio.src = nextSongObj.fileName;
                    toggleSong();
                    changeCurrentSongDetails(nextSongObj);
                    currentSongNumber = nextSongNumber;
                }
            else if(currentSongNumber < 5) 
                {
                    var nextSongObj = songs[currentSongNumber];
                    audio.src = nextSongObj.fileName;
                    toggleSong();
                    changeCurrentSongDetails(nextSongObj);
                    currentSongNumber = currentSongNumber + 1;
                }
        else if(willLoop == 1) 
            {
                var nextSongObj = songs[0];
                audio.src = nextSongObj.fileName;
                toggleSong();
                changeCurrentSongDetails(nextSongObj);
                currentSongNumber =  1;
            }
        else 
            {
                $('.play-icon').removeClass('fa-pause').addClass('fa-play');
                audio.currentTime = 0;
            }
    });
});

//-----------------------------------------------------------for playing next song automatically------------------------------------------------------------------
$('audio').on('ended',function()     
    {  
        var audio = document.querySelector('audio');
        if(currentSongNumber < 5) 
            {
                var nextSongObj = songs[currentSongNumber];
                audio.src = nextSongObj.fileName;
                toggleSong();
                changeCurrentSongDetails(nextSongObj);
                currentSongNumber = currentSongNumber + 1;
            }
        else if(willLoop == 1) 
        {
            var nextSongObj = songs[0];
            audio.src = nextSongObj.fileName;
            toggleSong();
            changeCurrentSongDetails(nextSongObj);
            currentSongNumber =  1;
        }
        else 
        {
            $('.play-icon').removeClass('fa-pause').addClass('fa-play');
            audio.currentTime = 0;
        }
    });
//--------------------------------------------------------------for next song on click of button----------------------------------------------------------------
$('.fa-step-forward').on('click', function() {
  var audio = document.querySelector('audio');
  if(currentSongNumber < songs.length) {
    currentSongNumber++;
    var nextSongObj = songs[currentSongNumber - 1];
    audio.src = nextSongObj.fileName;
    toggleSong();
    changeCurrentSongDetails(nextSongObj);
  }
  else {
    currentSongNumber = 1;
    audio.src = songs[0].fileName;
    toggleSong();
    changeCurrentSongDetails(songs[0]);
  }
});

//-----------------------------------------------------for previous song on click of buttuon---------------------------------------------------------------------
$('.fa-step-backward').on('click', function() {
  var audio = document.querySelector('audio');
  if(currentSongNumber >= 1) {
    currentSongNumber--;
    var prevSongObj = songs[currentSongNumber - 1];
    audio.src = prevSongObj.fileName;
    toggleSong();
    changeCurrentSongDetails(prevSongObj);
  }
  else {
    currentSongNumber = songs.length;
    audio.src = songs[currentSongNumber - 1].fileName;
    toggleSong();
    changeCurrentSongDetails(songs[currentSongNumber - 1]);
  }
});

//------------------------------------------------------------------for progress bar-----------------------------------------------------------------------------
$('audio').on('timeupdate', function() {
  var audio = document.querySelector('audio');
  $('.progress-filled').stop().animate({'width': (audio.currentTime) / audio.duration * 100 + '%'}, 250, 'linear');
});

// The 'scrub' function: it updates the current time whenever the user clicks
// anywhere on the progress bar.
$('.player-progress').on('click', function(event) {
  var audio = document.querySelector('audio');
  var progress = document.querySelector('.player-progress');

  var scrubTime = (event.offsetX / progress.offsetWidth) * audio.duration;
  audio.currentTime = scrubTime;
});