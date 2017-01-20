var clock;
var clockIntervalID;

function updateTime(){
    
    if(!clock.paused){
        
        users[clock.activeUserIndex].decrementTime(clock.freq);
        displayTime(users[clock.activeUserIndex], clock.activeUserIndex);
                
        if(users[clock.activeUserIndex].currentTime <= 0){
            var oldActiveIndex = clock.activeUserIndex;
            var isNextUser = clock.setNextUserIndex();
            displayTime(users[oldActiveIndex], oldActiveIndex);
            displayTime(users[clock.activeUserIndex], clock.activeUserIndex);
            if(isNextUser === false){
                clock.paused = true;
                displayTime(users[clock.activeUserIndex], -1); //so that background shadow is unset
                $('#start_pause_button').hide();
                alert("All players out of time!");
            }
        }
        
    }
    
}

function displayTime(user, i){
    
    var timeObject = user.getTime();
    var mins = timeObject.mins;
    var secs = timeObject.secs;
    
    var playerID = user.playerID;
    $('.time_display[playerID="' + playerID + '"]').html(mins + " : " + secs);
    
    var outOfTime = (mins === '00' && secs === '00');
    
    var userInputSelector = '.user_input[playerID="' + playerID + '"]';
    if(outOfTime){
        $('#play_game_page').find(userInputSelector).find('table').css("background-color", "#65A99E");
    }
    if(i === clock.activeUserIndex){
        $('#play_game_page').find(userInputSelector).find('table').css("box-shadow", "4px -4px 4px #FF3232");
    }else{
        $('#play_game_page').find(userInputSelector).find('table').css("box-shadow", "none");
    }
    
}