export class OsService {
    private badCommand(command) {
        var errorMsg = '',
            pick = Math.floor(Math.random() * 5);

        switch(pick) {
            case 0:
                errorMsg = 'Incorrect syntax near \'' + command + '\'';
                break;
            case 1:
                errorMsg = <string>'Something went wrong';
                break;
            case 2:
                errorMsg = <string>'R Tape loading error';
                break;
            case 3:
                errorMsg = <string>'I\'m busy, try again later!';
                break;
            default:
                errorMsg = <string>'¿¿¿Why would you do that???';
                break;
        }

        //this.$scope.textLog.push(errorMsg);
    }
}

