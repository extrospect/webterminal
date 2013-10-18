define(["require", "exports"], function(require, exports) {
    var ConsoleService = (function () {
        function ConsoleService() {
        }
        ConsoleService.prototype.test = function (msg) {
            alert('(AppService) ' + msg);
        };
        return ConsoleService;
    })();
    exports.ConsoleService = ConsoleService;
});
