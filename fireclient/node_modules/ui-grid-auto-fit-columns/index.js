"use strict";
var angular = require('angular');
var UiGridAutoFitColumnsService_1 = require('./UiGridAutoFitColumnsService');
var UiGridAutoFitColumnsDirective_1 = require('./UiGridAutoFitColumnsDirective');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = angular.module('ui.grid.autoFitColumns', ['ui.grid'])
    .service('uiGridAutoFitColumnsService', UiGridAutoFitColumnsService_1.UiGridAutoFitColumnsService)
    .directive('uiGridAutoFitColumns', UiGridAutoFitColumnsDirective_1.UiGridAutoFitColumnsDirective)
    .name;
//# sourceMappingURL=index.js.map