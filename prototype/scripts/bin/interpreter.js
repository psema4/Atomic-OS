var Interpreter = {
    execute: function(command) {

    var commandArray = command.split(" ");
 
    try{
        var commandName = commandArray.shift();
        var commandObject = eval(commandName);
        commandObject.execute(commandArray);

       } catch(ex) {
       }
    }
};
