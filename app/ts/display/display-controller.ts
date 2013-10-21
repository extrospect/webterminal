/// <reference path="../../lib/typings/angular/angular.d.ts" />

export class DisplayController {

    constructor(private $scope,
                private displayService) {

        this.$scope.textLog = this.$scope.textLog || [];

        this.displayService.writeLine = this.writeLine;
        this.displayService.write = this.write;
        this.displayService.flush = this.flush;

        this.$scope.inputEnabled = false;
    }

    private writeLine = (text: string) => {
        this.flush();
        this.$scope.textLog.push(text);
    }

    private write = (text: string) => {

    }

    private flush = () => {

    }

    private enableInput() {
        this.$scope.inputEnabled = true;
    }

    private disableInput() {
        this.$scope.inputEnabled = false;
    }
}
