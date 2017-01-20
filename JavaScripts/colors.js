var colors;

function initColors(){
    
    colors =
    {
        yellow:true,
        red:true,
        blue:true,
        black:true,
        green:true,
        grey:true
    };
    
}

function takeColor(color){
    
    switch(color){
        case 'yellow':
            colors.yellow = false;
            break;
        case 'red':
            colors.red = false;
            break;
        case 'blue':
            colors.blue = false;
            break;
        case 'black':
            colors.black = false;
            break;
        case 'green':
            colors.green = false;
            break;
        case 'grey':
            colors.grey = false;
            break;
    }
    
}

function releaseColor(color){
    
    switch(color){
        case 'yellow':
            colors.yellow = true;
            break;
        case 'red':
            colors.red = true;
            break;
        case 'blue':
            colors.blue = true;
            break;
        case 'black':
            colors.black = true;
            break;
        case 'green':
            colors.green = true;
            break;
        case 'grey':
            colors.grey = true;
            break;
    }
    
}

function hideTakenColors(){
    
    $('#meeple_row').find('td').css('display', 'block');
    
    if(colors.yellow === false){
        $('#yellow_meeple').parent('td').css('display', 'none');
    }
    if(colors.red === false){
        $('#red_meeple').parent('td').css('display', 'none');
    }
    if(colors.blue === false){
        $('#blue_meeple').parent('td').css('display', 'none');
    }
    if(colors.black === false){
        $('#black_meeple').parent('td').css('display', 'none');
    }
    if(colors.green === false){
        $('#green_meeple').parent('td').css('display', 'none');
    }
    if(colors.grey === false){
        $('#grey_meeple').parent('td').css('display', 'none');
    }
    
}

function setColorSelection(){
    
    $('.color_select').unbind('click');
    $('.color_select').bind('click', function(){
        
        var playerID = $(this).attr('playerID');
        
        if($('#meeples_holder').css('display') === 'none'){
            $('#meeples_holder').attr('playerID', playerID);
            $('#meeples_holder').find('.player_ID').html(" " + playerID);
            hideTakenColors(colors);
            $('#meeples_holder').css('display', 'inline-block');
        }else{
            
            var displayedID = $('#meeples_holder').attr('playerID');
            
            if(displayedID === playerID){
                $('#meeples_holder').css('display', 'none');
            }else{
                $('#meeples_holder').attr('playerID', playerID);
                hideTakenColors(colors);
                $('#meeples_holder').find('.player_ID').html(" " + playerID);
            }
            
        }
        
    });
    
    $('.meeple_holder').unbind('click');
    $('.meeple_holder').bind('click', function(){
        
       var clickedID = $(this).attr('id');
       var color = clickedID.replace('_meeple', '');
       
       var playerID = $('#meeples_holder').attr('playerID');
       
       var existingColor = $('.color_select[playerID="' + playerID + '"]').attr('val');
       releaseColor(existingColor); 
       takeColor(color);

       var colorSelect = $('#user_setup_page').find('.user_input[playerID=' + playerID + ']').find('.color_select');
       
       colorSelect.attr('val', color);
       colorSelect.css('background-color', color);
       colorSelect.css('background-image', 'none');
       $('.color_cancel[playerID="' + playerID + '"]').show();
       
       $('#meeples_holder').css('display', 'none');
        
    });
    
    $('.color_cancel').unbind('click');
    $('.color_cancel').bind('click', function(){
        
        var playerID = $(this).attr('playerID');
        var colorSelect = $('.color_select[playerID=' + playerID + ']');
        releaseColor(colorSelect.attr('val'));
        colorSelect.attr('val', '');
        colorSelect.css('background-color', 'initial');
        colorSelect.css('background-image', 'url("Images/add_button.png")');
        hideTakenColors();
        $(this).hide();
        
    });
    
}