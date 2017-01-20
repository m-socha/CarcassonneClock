$(document).ready(function(){
    
    performHides();
    
    initPages();
    
    setPageChanges();
    loadPage('user_setup_page', true);

});

function performHides(){
    $('.error_container').hide();
}

function appendUserInputs(num){
    
    for(var i = 0; i < num; i++){
        
        var playerNum = getNewPlayerNum();
        
        var userInputHTML = '<div class="user_input" playerID="' + playerNum + '">';
        
        userInputHTML += '<table>';
        userInputHTML += '<tr>';
        userInputHTML += '<td colspan="4"><div class="player_title">Player ' + playerNum + '</div></td>';
        userInputHTML += '</tr>';
        
        userInputHTML += '<tr>';
        userInputHTML += '<td>Name:</td>';
        userInputHTML += '<td colspan="3"><input class="user_name name_input" type="text" maxlength="' + MAX_NAME_LENGTH + '"></td>';
        userInputHTML += '</tr>';
        
        userInputHTML += '<tr>';
        userInputHTML += '<td>Color:</td>';
        userInputHTML += '<td><div class="color_select" playerID="' + playerNum + '" val=""></div></td>';
        userInputHTML += '<td colspan="2"><div class="color_cancel" playerID="' + playerNum + '">Cancel</div></td>';
        userInputHTML += '</tr>';
        
        userInputHTML += '</table>';
        userInputHTML += '</div>';
        
        $('#users').append(userInputHTML);
        $('.color_cancel[playerID="' + playerNum + '"]').hide();
        
        $('#user_setup_page').find('.user_input[playerID="' + playerNum + '"]').append('<div playerID="' + playerNum + '" class="user_remove"></div>');

        positionPlayerRemoves();

    }
    
}

function positionPlayerRemoves(){
    
    var maxNum = getNewPlayerNum() - 1;
    
    for(var playerNum = 1; playerNum <= maxNum; playerNum++){
    
        var userInput = $('#user_setup_page').find('.user_input[playerID="' + playerNum + '"]');
        
        if(userInput.length >= 1){  
            var topPos = userInput.position().top;
            var leftPos = userInput.position().left;
            var width = userInput.width();

            $('.user_remove[playerID="' + playerNum + '"]').css({top:topPos - 6, left:leftPos + width - 40});
        }
        
    }
}

function setUserAdd(){
    
    $('#new_user_sign').click(function(){
        appendUserInputs(1);
        setColorSelection();
        setUserRemove();
        if($('#user_setup_page').find('.user_input').length >= 6){
            $(this).hide();
        }  
        if($('#user_setup_page').find('.user_input').length >= 3){
            $('.user_remove').show();
        }
        positionPlayerRemoves();
    });
}

function setUserRemove(){
    
    $('.user_remove').hide(); //initially, since only two users
    
    $('.user_remove').unbind('click');
    $('.user_remove').bind('click', function(){
        
        var color = $(this).parent('.user_input').find('.color_select').attr('val');
        releaseColor(color);
        
        $(this).parent('.user_input').remove();
        
        if($('#user_setup_page').find('.user_input').length < 6){
            $('#new_user_sign').show();
        }
        if($('.user_remove').length < 3){
            $('.user_remove').hide();
        }
        
        positionPlayerRemoves();
        
    });
    
}

function setMeepleAnimations(){
    
    $('.meeple_holder').mouseenter(function(){
        $(this).animate({borderRadius:'30px'}, 100);
    });
    
    $('.meeple_holder').mouseleave(function(){
        $(this).animate({borderRadius:'0px'}, 50);
    });
    
}

function populateTimingInputs(){
    
    $('#user_timing_input').html('');
    
    for(var i = 0; i < users.length; i++){
        
        var user = users[i];
        
        timingInputDiv = '<div class="user_input" playerID="' + user.playerID + '">';
        timingInputDiv += '<table>';
        
        timingInputDiv += '<tr>';
        timingInputDiv += '<td colspan="3"><div style="color:' + user.color + '" class="player_title">Player ' + user.playerID + ': ' + user.playerName + '</div></td>';
        timingInputDiv += '</tr>';
        
        timingInputDiv += '<tr>';
        timingInputDiv += '<td>Base Time:</td>';
        timingInputDiv += '<td><input type="text" placeholder="min" class="base_time_input_min time_input" playerID="' + user.playerID + '"></td>';
        timingInputDiv += '<td><input type="text" placeholder="sec" class="base_time_input_sec time_input" playerID="' + user.playerID + '"></td>';
        timingInputDiv += '</tr>';
        
        timingInputDiv += '<tr>';
        timingInputDiv += '<td>Increment:</td>';
        timingInputDiv += '<td colspan="2"><input type="text" placeholder="sec" class="increment_input time_input_wide" playerID="' + user.playerID + '"></td>';
        timingInputDiv += '</tr>';
        
        timingInputDiv += '<tr>';
        timingInputDiv += '<td colspan="3"><div class="replicate_timing" playerID="' + user.playerID + '">Replicate</div></td>';
        timingInputDiv += '</tr>';
        
        timingInputDiv += '</table>';
        timingInputDiv += '</div>';
        
        $('#user_timing_input').append(timingInputDiv);
    }  
}

function setReplicateTiming(){
    
    $('.replicate_timing').parent('td').hide();
     
    $('.base_time_input_min, .base_time_input_sec, .increment_input').unbind('click');
    $('.base_time_input_min, .base_time_input_sec, .increment_input').bind('click', function(){
        
        $('.replicate_timing').parent('td').hide();
        var playerID = $(this).attr('playerID');
        $('.replicate_timing[playerID="' + playerID + '"]').parent('td').show();
        
    });
    
    $('.replicate_timing').unbind('click');
    $('.replicate_timing').bind('click', function(){
        
        var playerID = $(this).attr('playerID');
        var baseTimeMin = $('.base_time_input_min[playerID="' + playerID + '"]').val();
        var baseTimeSec = $('.base_time_input_sec[playerID="' + playerID + '"]').val();
        var increment = $('.increment_input[playerID="' + playerID + '"]').val();
        
        $('.base_time_input_min').val(baseTimeMin);
        $('.base_time_input_sec').val(baseTimeSec);
        $('.increment_input').val(increment);
        
    });
    
}

function populateGameClock(){
    
    $('#gameplay_display').html('');
    
    for(var i = 0; i < users.length; i++){
        
        var user = users[i];
        
        gameplayDisplayDiv = '<div class="user_input" playerID="' + user.playerID + '">';
        gameplayDisplayDiv += '<table>';
        
        gameplayDisplayDiv += '<tr>';
        gameplayDisplayDiv += '<td colspan="2"><div style="color:' + user.color + '" class="player_title">Player ' + user.playerID + ': ' + user.playerName + '</div></td>';
        gameplayDisplayDiv += '</tr>';
        
        gameplayDisplayDiv += '<tr>';
        gameplayDisplayDiv += '<td>Time:</td>';
        gameplayDisplayDiv += '<td><div class="time_display" playerID="' + user.playerID + '"></div></td>';
        gameplayDisplayDiv += '</tr>';
        
        gameplayDisplayDiv += '</table>';
        gameplayDisplayDiv += '</div>';
        
        $('#gameplay_display').append(gameplayDisplayDiv);
        
    }
    
}

function setupTiming(){
    
    clock = {
        paused:true,
        activeUserIndex:0,
        freq:1,
        setNextUserIndex:function(){
            var originalIndex = this.activeUserIndex;
            do{
                this.activeUserIndex = (this.activeUserIndex + 1) % users.length;
                if(this.activeUserIndex === originalIndex && users[this.activeUserIndex].currentTime <= 0){ //no active users
                    return false;
                }
            }while(users[this.activeUserIndex].currentTime <= 0);
        }
    };
    
    clockIntervalID = setInterval(function(){updateTime();}, 1000/clock.freq);
    
    for(var i = 0; i < users.length; i++){
        displayTime(users[i], i);
    }
    
}

function setStartPauseButton(){
    
    $('#start_pause_button').show(); //might be hidden from time previously running out
    $('#start_pause_button').attr('class', 'start');
    $('#start_pause_button').html('Start');
    
    $('#start_pause_button').unbind("click");
    $('#start_pause_button').bind("click", function(){
        
        var classVal = $(this).attr('class');
        
        var newLabel, newClass;
        
        switch(classVal){
            case 'start':
                newLabel = 'Pause';
                newClass = 'pause';
                clock.paused = false;
                break;
            case 'pause':
                newLabel = 'Start';
                newClass = 'start';
                clock.paused = true;
                break;
        }
        
        $(this).html(newLabel);
        $(this).attr('class', newClass);
        
    });
    
}

function setKeypressUserTransitions(){
    
    $('body').unbind("keypress");
    $('body').bind("keypress", function(){
        users[clock.activeUserIndex].incrementTime();
        clock.setNextUserIndex();
        for(var i = 0; i < users.length; i++){
            displayTime(users[i], i);
        }
    });
    
}