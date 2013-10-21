/// <reference path="../../lib/typings/angular/angular.d.ts" />
define(["require", "exports"], function(require, exports) {
    var DisplayController = (function () {
        function DisplayController($scope, displayService) {
            var _this = this;
            this.$scope = $scope;
            this.displayService = displayService;
            this.writeLine = function (text) {
                _this.flush();
                _this.$scope.textLog.push(text);
            };
            this.write = function (text) {
            };
            this.flush = function () {
            };
            this.$scope.textLog = this.$scope.textLog || [];

            this.displayService.writeLine = this.writeLine;
            this.displayService.write = this.write;
            this.displayService.flush = this.flush;

            this.$scope.inputEnabled = false;
        }
        DisplayController.prototype.enableInput = function () {
            this.$scope.inputEnabled = true;
        };

        DisplayController.prototype.disableInput = function () {
            this.$scope.inputEnabled = false;
        };
        return DisplayController;
    })();
    exports.DisplayController = DisplayController;
});
