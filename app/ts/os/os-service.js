define(["require", "exports"], function(require, exports) {
    var OsService = (function () {
        function OsService() {
        }
        OsService.prototype.badCommand = function (command) {
            var errorMsg = '', pick = Math.floor(Math.random() * 5);

            switch (pick) {
                case 0:
                    errorMsg = 'Incorrect syntax near \'' + command + '\'';
                    break;
                case 1:
                    errorMsg = 'Something went wrong';
                    break;
                case 2:
                    errorMsg = 'R Tape loading error';
                    break;
                case 3:
                    errorMsg = 'I\'m busy, try again later!';
                    break;
                default:
                    errorMsg = '¿¿¿Why would you do that???';
                    break;
            }
            //this.$scope.textLog.push(errorMsg);
        };
        return OsService;
    })();
    exports.OsService = OsService;
});
