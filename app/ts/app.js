define(["require", "exports", 'console/console-controller', 'console/console-service', 'console/console-directive', 'console/key-down-service', 'console/key-command'], function(require, exports, __consoleController__, __consoleService__, __consoleDirective__, __keyDownService__, __keyCommandEnum__) {
    /// <reference path="../lib/typings/angular/angular.d.ts" />
    /// <reference path="../lib/typings/requirejs/require.d.ts" />
    'use strict';

    // NOTE: Using import/require to tell Typescript to add this to the AMD module definition it creates
    var consoleController = __consoleController__;
    var consoleService = __consoleService__;
    var consoleDirective = __consoleDirective__;
    var keyDownService = __keyDownService__;
    var keyCommandEnum = __keyCommandEnum__;
    function start() {
        var providerCache = {}, eagerAngular = angular, lazyAngular = {}, lazyModules = {};

        // Declare app level module which depends on filters, and services
        angular.module('webterminal', []).directive('console', [
            function () {
                return new consoleDirective.ConsoleDirective();
            }
        ]).service('ConsoleService', consoleService.ConsoleService).service('KeyDownService', keyDownService.KeyDownService).value('defaultInputPrompt', 'C:/Extrali/WebClient/AngularJS> ').value('keyCommandEnum', keyCommandEnum.KeyCommand).controller('ConsoleController', [
            '$scope',
            '$document',
            'ConsoleService',
            'defaultInputPrompt',
            'KeyDownService',
            consoleController.ConsoleController
        ]).config([
            '$provide',
            '$compileProvider',
            '$filterProvider',
            '$controllerProvider',
            function ($provide, $compileProvider, $filterProvider, $controllerProvider) {
                providerCache.$provide = $provide;
                providerCache.$compileProvider = $compileProvider;
                providerCache.$filterProvider = $filterProvider;
                providerCache.$controllerProvider = $controllerProvider;
            }
        ]);

        // NOTE: Bootstrap is being applied manually here - I believe angular has a 'trick' to defer automatic bootstrap
        // when using require.js (involves setting window.name to NG_DEFER_BOOTSTRAP or something similar).
        angular.bootstrap(document.body, ['webterminal']);
    }
    exports.start = start;
});
