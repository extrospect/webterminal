define(["require", "exports"], function(require, exports) {
    (function (KeyCommand) {
        KeyCommand[KeyCommand["DeleteCharacter"] = 0] = "DeleteCharacter";
        KeyCommand[KeyCommand["Submit"] = 1] = "Submit";
        KeyCommand[KeyCommand["HistoryBack"] = 2] = "HistoryBack";
        KeyCommand[KeyCommand["HistoryForwards"] = 3] = "HistoryForwards";
    })(exports.KeyCommand || (exports.KeyCommand = {}));
    var KeyCommand = exports.KeyCommand;
});
