var users;

function getNewPlayerNum(){
    
    var maxNum = 0;
    
    $('#user_setup_page').find('.user_input').each(function(){
        
        var playerNum = Number($(this).attr('playerID'));
        
        if(playerNum > maxNum){
            maxNum = playerNum;
        }
        
    });
    
    return maxNum + 1;
    
}

function usersSetupPopulateUsers(){
    
    users = [];
    
    $('#user_setup_page').find('.user_input').each(function(){
        
        var playerID = $(this).attr('playerID');      
        var playerName = $(this).find('.user_name').val();
        var color = $(this).find('.color_select').attr('val');
        
        var user = {
            playerID:playerID,
            playerName:playerName,
            color:color
        };
        
        users.push(user);
        
    });
    
}

function timingSetupPopulateUsers(){
    
    $('#timing_setup_page').find('.user_input').each(function(){
        
        var playerID = $(this).attr('playerID');      
        
        for(var i = 0; i < users.length; i++){
            if(users[i].playerID === playerID){
                
                var baseTimeMin = $(this).find('.base_time_input_min').val();
                var baseTimeSec = $(this).find('.base_time_input_sec').val();
                var increment = $(this).find('.increment_input').val();
                
                users[i].currentTime = Number(baseTimeMin)*60 + Number(baseTimeSec);
                users[i].increment = Number(increment);
                
                users[i].decrementTime = function(freq){
                    this.currentTime -= 1/freq;
                };
                
                users[i].incrementTime = function(){
                    this.currentTime += this.increment;
                };
                
                users[i].getTime = function(){
                    var mins = Math.floor(this.currentTime /  60).toString();
                    var secs = (this.currentTime % 60).toString();
                    while(mins.length < 2){
                        mins = '0' + mins;
                    }
                    while(secs.length < 2){
                        secs = '0' + secs;
                    }
                    return {
                        mins:mins,
                        secs:secs
                    };
                };
                
                break;
            }
        }
        
    });

}
