var pages;

function initPages(){
    
    pages = 
    [
        {
            pageName:'user_setup_page',
            header:['timing_setup_page_proceed'],
            callback:function(){
                initColors();
    
                appendUserInputs(2);
                setColorSelection();
                setUserAdd();
                setUserRemove();

                setMeepleAnimations();
            }
        },
        
        {
            pageName:'timing_setup_page',
            header:['user_setup_page_back','play_game_page_proceed'],
            callback:function(){
               
               populateTimingInputs();
               setReplicateTiming();
               
            }
            
        },
        
        {
            pageName:'play_game_page',
            header:['timing_setup_page_back'],
            callback:function(){
                
                populateGameClock();
                setupTiming();
                setStartPauseButton();
                setKeypressUserTransitions();
                
            }
            
        }
        
    ];
    
}

function setPageChanges(){
    
    $('.header_button').unbind('click');
    $('.header_button').bind('click', function(){
        
        var load = true;
        
        var id = $(this).attr('id');

        if(id === 'timing_setup_page_proceed'){
            load = usersSetupErrorTrap();
            if(load === true){
                usersSetupPopulateUsers();
            }
        }   
        
        if(id === 'play_game_page_proceed'){
            load = timingSetupErrorTrap();
            if(load === true){
                timingSetupPopulateUsers();
            }
        }
        
        if(id === 'timing_setup_page_back'){
            clearInterval(clockIntervalID);
        }
        
        if(load === true){
            var divToShow = id.substr(0, id.lastIndexOf('_'));
            var reload = $(this).attr('class').split(' ').indexOf('right_header') !== -1;
            loadPage(divToShow, reload);
        }
        
    });
    
}

function loadPage(pageName, reload){
    
    for(var i = 0; i < pages.length; i++){
        
        var page = pages[i]; 
        if(page.pageName === pageName){
            if(reload){
                page.callback();
            }
            $('.header_button').hide();
            for(var j = 0; j < page.header.length; j++){
                $('#' + page.header[j]).show();
            }
            $('.content_page').hide();
            $('#' + pageName).show();
        }
        
    }
    
}
