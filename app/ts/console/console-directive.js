define(["require", "exports"], function(require, exports) {
    var ConsoleDirective = (function () {
        function ConsoleDirective() {
            this.templateUrl = './partials/console.tpl.html';
            this.controller = 'ConsoleController';
        }
        return ConsoleDirective;
    })();
    exports.ConsoleDirective = ConsoleDirective;
});
