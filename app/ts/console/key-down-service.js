define(["require", "exports"], function(require, exports) {
    var KeyDownService = (function () {
        function KeyDownService(keyCommandEnum) {
            this.keyCommandEnum = keyCommandEnum;
        }
        KeyDownService.prototype.process = function (text, keyCode, shiftHeld) {
            var command = this.keyCommandEnum.AddCharacter;

            switch (keyCode) {
                case 8:
                    // Backspace
                    command = this.keyCommandEnum.DeleteCharacter;

                    // Stop browser navigating back
                    event.preventDefault();
                    break;
                case 13:
                    // Return
                    command = this.keyCommandEnum.Submit;
                    break;
                case 38:
                    // Up arrow
                    command = this.keyCommandEnum.HistoryBack;
                    break;
                case 40:
                    // Down arrow
                    command = this.keyCommandEnum.HistoryForwards;
                    break;
            }

            return command;
        };
        return KeyDownService;
    })();
    exports.KeyDownService = KeyDownService;
});
