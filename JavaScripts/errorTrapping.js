var MIN_NAME_LENGTH = 1;
var MAX_NAME_LENGTH = 20;

function usersSetupErrorTrap(){
    
    var callback = function(){
        
        var problems = [];
        var selectors = [];
        
        $('#users').find('.user_input').each(function(){
            
            var name = $(this).find('.user_name').val(); 
            var isNameProblem = false;
            var nameProblem;
            if(name.length > MAX_NAME_LENGTH){
                isNameProblem = true;
                nameProblem = "long - names must be within " + MAX_NAME_LENGTH + " characters";
            }else if(name.length < MIN_NAME_LENGTH){
                isNameProblem = true;
                nameProblem = "short - names must be at least " + MIN_NAME_LENGTH + " character";
            }
            
            if(isNameProblem){
                problems.push("Name of Player " + $(this).attr('playerID') + " is too " + nameProblem);
            }
            selectors.push({selector:$(this).find('.user_name'),
                            error:isNameProblem,
                            noDefaultBorder:true});
            
            
            var color = $(this).find('.color_select').attr('val');
            if(color == ""){
                problems.push("No color selected for Player " + $(this).attr('playerID'));
            }
            selectors.push({selector:$(this).find('.color_select'),
                            error:(color == ""),
                            noDefaultBorder:false});
                        
        });
        
        var errorObject = {
            problems:problems,
            selectors:selectors
        };
        
        return errorObject;
        
    };
    
    var pageName = 'user_setup_page';
    
    return errorTrap(pageName, callback);
    
}

function timingSetupErrorTrap(){
    
    var callback = function(){
      
        var problems = [];
        var selectors = [];
        
        $('#timing_setup_page').find('.user_input').each(function(){
           
            var baseMin = $(this).find('.base_time_input_min').val();
            if(!isNonNegativeInteger(baseMin)){
                problems.push('Invalid base time minutes input for Player ' + $(this).attr('playerID') + ' - input must be a non-negative integer');
            }
            selectors.push({selector:$(this).find('.base_time_input_min'),
                            error:!isNonNegativeInteger(baseMin),
                            noDefaultBorder:true});
            
            var baseSec = $(this).find('.base_time_input_sec').val();
            var isBaseSecProblem = (!isNonNegativeInteger(baseSec) || baseSec >= 60);
            if(isBaseSecProblem){
                problems.push('Invalid base time seconds input for Player ' + $(this).attr('playerID') + ' - input must be a non-negative integer below 60');
            }
            selectors.push({selector:$(this).find('.base_time_input_sec'),
                            error:isBaseSecProblem,
                            noDefaultBorder:true});
            
            if(baseSec == 0 && baseMin == 0){
                problems.push('Player ' + $(this).attr('playerID') + ' has no time - this is not allowed');
            }
            
            var increment = $(this).find('.increment_input').val();
            if(!isNonNegativeInteger(increment)){
                problems.push('Invalid increment input for Player ' + $(this).attr('playerID') + ' - input must be a non-negative integer');
            }
            selectors.push({selector:$(this).find('.increment_input'),
                            error:!isNonNegativeInteger(increment),
                            noDefaultBorder:true});
            
            
        });
        
        var errorObject = {
            problems:problems,
            selectors:selectors
        };
        
        return errorObject;
        
    };
    
    var pageName = 'timing_setup_page';
    
    return errorTrap(pageName, callback);
    
}

function isNonNegativeInteger(n){
    return (!isNaN(n) && n >= 0 && (n % 1) === 0);
}

function errorTrap(pageName, callback){
    
    var errorObject = callback();   
    var problems = errorObject.problems;
    var selectors = errorObject.selectors;
    
    var $errorContainer = $('#' + pageName).find('.error_container');
    
    var noErrors;
    
    if(problems.length !== 0){
        var problemList = "<center><h2>Validation Errors</h2></center>";
        problemList += "<ul>";
        for(var i = 0; i < problems.length; i++){
            problemList += "<li>" + problems[i] + "</li>";
        }
        problemList += "</ul>";
        $errorContainer.show();
        $errorContainer.html(problemList);
        noErrors = false;
    }else{
        $errorContainer.hide();
        $errorContainer.html("");
        noErrors = true;
    }
    
    for(var i = 0; i < selectors.length; i++){
        var selector = selectors[i];
        if(selector.error === true){
            selector.selector.css("border-color", "red");
        }else if(selector.noDefaultBorder === false){
            selector.selector.css("border-color", "black");
        }else if(selector.noDefaultBorder === true){
            selector.selector.css("border-color", "transparent");
        }
    }
    
    return noErrors;
        
}