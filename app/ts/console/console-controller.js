/// <reference path="../../lib/typings/requirejs/require.d.ts" />
define(["require", "exports", 'console/key-command'], function(require, exports, __keyCommandEnum__) {
    
    var keyCommandEnum = __keyCommandEnum__;
    var ConsoleController = (function () {
        function ConsoleController($scope, $document, consoleService, defaultInputPrompt, keyDownService) {
            var _this = this;
            this.$scope = $scope;
            this.$document = $document;
            this.consoleService = consoleService;
            this.defaultInputPrompt = defaultInputPrompt;
            this.keyDownService = keyDownService;
            this.$scope.inputPromptText = this.defaultInputPrompt;

            this.$scope.textLog = [];
            this.$scope.commandLog = [];
            this.$scope.commandHistoryIndex = -1;

            this.$scope.inputText = '';
            this.$scope.inputTextBackup = '';

            $document.bind('keypress', function (event) {
                _this.$scope.$apply(function () {
                    _this.$scope.inputText += String.fromCharCode(event.keyCode);
                });
            });

            $document.bind('keydown', function (event) {
                var processResult = (_this.keyDownService).process(_this.$scope.inputText, event.keyCode, event.shiftHeld);

                _this.$scope.$apply(function () {
                    switch (processResult) {
                        case keyCommandEnum.KeyCommand.DeleteCharacter:
                            _this.$scope.inputText = _this.$scope.inputText.slice(0, -1);
                            break;
                        case keyCommandEnum.KeyCommand.Submit:
                            execCommand();
                            break;
                        case keyCommandEnum.KeyCommand.HistoryBack:
                            _this.inputTextHistoryLoop(-1);
                            break;
                        case keyCommandEnum.KeyCommand.HistoryForwards:
                            _this.inputTextHistoryLoop(1);
                            break;
                    }
                });
            });

            var execCommand = function () {
                var command = _this.$scope.inputText;
                _this.$scope.commandLog.push(command);
                _this.$scope.textLog.push(_this.defaultInputPrompt + command);

                _this.$scope.inputText = '';
                _this.$scope.commandHistoryIndex = -1;

                command = command.trim();
                //this.getCommandAction(command)();
            };
            /*
            (<any>consoleService.addListener)(function(text) {
            (<any>this).$scope.$apply(() => {
            (<any>this).$scope.textLog.push(text);
            });
            }, this);*/
        }
        ConsoleController.prototype.inputTextHistoryLoop = function (delta) {
            var maxIndex = this.$scope.commandLog.length - 1;

            if (this.$scope.commandHistoryIndex === -1) {
                this.$scope.inputTextBackup = this.$scope.inputText;
            }

            this.$scope.commandHistoryIndex += delta;
            if (this.$scope.commandHistoryIndex < -1) {
                this.$scope.commandHistoryIndex = maxIndex;
            } else if (this.$scope.commandHistoryIndex > maxIndex) {
                this.$scope.commandHistoryIndex = -1;
            }

            if (this.$scope.commandHistoryIndex === -1) {
                this.$scope.inputText = this.$scope.inputTextBackup;
            } else {
                this.$scope.inputText = this.$scope.commandLog[this.$scope.commandHistoryIndex];
            }
        };
        return ConsoleController;
    })();
    exports.ConsoleController = ConsoleController;
});
