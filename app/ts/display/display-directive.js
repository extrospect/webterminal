define(["require", "exports"], function(require, exports) {
    var DisplayDirective = (function () {
        function DisplayDirective() {
            this.templateUrl = './partials/console.tpl.html';
            this.controller = 'DisplayController';
        }
        return DisplayDirective;
    })();
    exports.DisplayDirective = DisplayDirective;
});
