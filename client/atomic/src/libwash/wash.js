function WASH(opts) {
    this.stdin = parsePath("/dev/wash/stdin");
    this.stdout = parsePath("/dev/wash/stdout");

    this.exec = function(buf) {
        var cmd = this.parse(buf);
        this.execute(cmd);
    }

    this.parse = function(buf) {
        var cmdArgs = buf.split(/ /);
        var cmdName = cmdArgs.shift();

        return {name: cmdName, args: cmdArgs};
    }

    this.execute = function(cmd) {
        // cmd.name and/or cmd.args[]

        system.log("wash executing command:");
        system.log(cmd);

        switch(cmd.name) {
            case 'cd':
                cd(parsePath(cmd.args[0]));
                break;

            case 'ls':
                ls(parsePath(cmd.args[0]));
                break;

            case 'mkdir':
                break;

            case 'cat':
                break;

            case 'fprint':
                break;

            case 'open':
                break;

            case 'close':
                break;

            default:
                // eval or die
        }
    }
    
}
