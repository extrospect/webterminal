/// <reference path="../../lib/typings/requirejs/require.d.ts" />

// NOTE: When you export a class, the constructor is accessed via <importedModuleVar>.<className>()
import keyDownService = require('console/key-down-service');
import keyCommandEnum = require('console/key-command');
export class ConsoleController {
    constructor(private $scope,
                private $document,
                private consoleService,
                private defaultInputPrompt,
                private keyDownService) {
        this.$scope.inputPromptText = this.defaultInputPrompt;

        this.$scope.textLog = [];
        this.$scope.commandLog = [];
        this.$scope.commandHistoryIndex = -1;

        this.$scope.inputText = '';
        this.$scope.inputTextBackup = '';

        $document.bind('keypress', (event) => {
            this.$scope.$apply(() => {
                this.$scope.inputText += String.fromCharCode(event.keyCode);
            });
        });

        $document.bind('keydown', (event) => {
            var processResult = (<keyDownService.KeyDownService>this.keyDownService).process(this.$scope.inputText,
                event.keyCode,
                event.shiftHeld);

            this.$scope.$apply(() => {
                switch(processResult) {
                    case keyCommandEnum.KeyCommand.DeleteCharacter:
                        this.$scope.inputText = this.$scope.inputText.slice(0, -1);
                        break;
                    case keyCommandEnum.KeyCommand.Submit:
                        execCommand();
                        break;
                    case keyCommandEnum.KeyCommand.HistoryBack:
                        this.inputTextHistoryLoop(-1);
                        break;
                    case keyCommandEnum.KeyCommand.HistoryForwards:
                        this.inputTextHistoryLoop(1);
                        break;
                }
            });
        });

        var execCommand = () => {
            var command = <string>this.$scope.inputText;
            this.$scope.commandLog.push(command);
            this.$scope.textLog.push(this.defaultInputPrompt + command);

            this.$scope.inputText = '';
            this.$scope.commandHistoryIndex = -1;

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

    private inputTextHistoryLoop(delta) {
        var maxIndex = this.$scope.commandLog.length - 1;

        if(this.$scope.commandHistoryIndex === -1) {
            this.$scope.inputTextBackup = this.$scope.inputText;
        }

        this.$scope.commandHistoryIndex += delta;
        if(this.$scope.commandHistoryIndex < -1) {
            this.$scope.commandHistoryIndex = maxIndex;
        } else
        if(this.$scope.commandHistoryIndex > maxIndex) {
            this.$scope.commandHistoryIndex = -1;
        }

        if(this.$scope.commandHistoryIndex === -1) {
            this.$scope.inputText = this.$scope.inputTextBackup;
        } else {
            this.$scope.inputText = this.$scope.commandLog[this.$scope.commandHistoryIndex];
        }
    }
}
