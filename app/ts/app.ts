/// <reference path="../lib/typings/angular/angular.d.ts" />
/// <reference path="../lib/typings/requirejs/require.d.ts" />
'use strict';

// NOTE: Using import/require to tell Typescript to add this to the AMD module definition it creates
import consoleController = require('console/console-controller');
import consoleService = require('console/console-service');
import consoleDirective = require('console/console-directive');
import keyDownService = require('console/key-down-service');
import keyCommandEnum = require('console/key-command');
export function start() {
    var providerCache: any = {},
        eagerAngular = angular,
        lazyAngular: any = {},
        lazyModules = {};

    // Declare app level module which depends on filters, and services
    angular.module('webterminal', [])
        .directive('console', [function() {
            return new consoleDirective.ConsoleDirective();
        }])
        .service('ConsoleService', <Function>consoleService.ConsoleService)
        .service('KeyDownService', <Function>keyDownService.KeyDownService)
        .value('defaultInputPrompt', 'C:/Extrali/WebClient/AngularJS> ')
        .value('keyCommandEnum', keyCommandEnum.KeyCommand)
        .controller('ConsoleController', [
            '$scope',
            '$document',
            'ConsoleService',
            'defaultInputPrompt',
            'KeyDownService',
            consoleController.ConsoleController])
        // TODO: $routeProvider is being left out of this demo
        .config(['$provide',
            '$compileProvider',
            '$filterProvider',
            '$controllerProvider',
            function($provide, $compileProvider, $filterProvider, $controllerProvider) {
                providerCache.$provide = $provide;
                providerCache.$compileProvider = $compileProvider;
                providerCache.$filterProvider = $filterProvider;
                providerCache.$controllerProvider = $controllerProvider;
        }]);

    // NOTE: Bootstrap is being applied manually here - I believe angular has a 'trick' to defer automatic bootstrap
    // when using require.js (involves setting window.name to NG_DEFER_BOOTSTRAP or something similar).
    angular.bootstrap(document.body, ['webterminal']);
}
