(function(){
    'use strict';
    angular
        .module('app.reqc', [])
        .controller('Reqc', Reqc)
        .run(['$rootScope', 'ws', '$log', 'storage', 'growl', function($rootScope, ws, $log, storage, growl){
            ws.$on('getDocsByTags', function(message){
                storage.docs = [];
                if(Array.isArray(message)) storage.docs = message;
                reInitSelects();
                $rootScope.$apply();
            });
        }]);
    Reqc.$inject = ['$log', '$scope', 'ws', 'storage', '$location', '$state', '$stateParams', '$filter', '$sce','modalsService'];
    function Reqc($log, $scope, ws, storage, $location, $state, $stateParams, $filter, $sce, modalsService){
        var vm = this;
        vm.command = {};
        vm.storage = storage;
        vm.command = {};
        vm.today = new Date();
        vm.year = new Date();
        vm.saveCurrentYear;
        vm.listYears = [];
        vm.listMonths = storage.clientSettings.periods.listMonths;
        vm.listQuarters = storage.clientSettings.periods.listQuarters;
        vm.listHalfYear = storage.clientSettings.periods.listHalfYear;
        vm.listStatus = storage.clientSettings.periods.listStatus;
        vm.includeStatReports = storage.clientSettings.periods.includeStatReports;
        vm.listMonths.selected = {};
        vm.listYears.selected = {name: new Date().getFullYear()};
        vm.listQuarters.selected = {};
        vm.listHalfYear.selected = {};
        vm.listStatus.selected = {};
        vm.datePicker = {
            startDate: new Date(new Date().setDate(new Date().getDate() - 1)),
            endDate: new Date()
        };

        vm.getYears = function() {
          for (let i = 0; i <= 50; i++) {
            vm.listYears.push({name:new Date().getFullYear() - i});
          }
          JSON.stringify({array: vm.listYears});
            return vm.listYears;
        };

        vm.applyMonthFilter = function() {
            vm.command = {
                creationDateFrom: new Date(
                    vm.listYears.selected.name,
                    vm.listMonths.selected.indexMonth,
                    1).valueOf(),
                creationDateTo: new Date(
                    vm.listYears.selected.name,
                    vm.listMonths.selected.indexMonth + 1,
                    0).valueOf(),
                freeDate: false
            };
        };

        vm.applyQuarterFilter = function() {
            if (vm.listQuarters.selected.name == "Первый квартал") {
                vm.command = {
                    creationDateFrom: new Date(
                        vm.listYears.selected.name, 0, 1).valueOf(),
                    creationDateTo: new Date(
                        vm.listYears.selected.name, 2, 29).valueOf(),
                    freeDate: false
                };
            }
            else if(vm.listQuarters.selected.name == "Второй квартал") {
                vm.command = {
                    creationDateFrom: new Date(
                        vm.listYears.selected.name, 3, 1).valueOf(),
                    creationDateTo: new Date(
                        vm.listYears.selected.name, 5, 30).valueOf(),
                    freeDate: false
                };
            }
            else if(vm.listQuarters.selected.name == "Третий квартал") {
                vm.command = {
                    creationDateFrom: new Date(
                        vm.listYears.selected.name, 6, 1).valueOf(),
                    creationDateTo: new Date(
                        vm.listYears.selected.name, 8, 30).valueOf(),
                    freeDate: false
                };
            }
            else if(vm.listQuarters.selected.name == "Четвертый квартал") {
                vm.command = {
                    creationDateFrom: new Date(
                        vm.listYears.selected.name, 9, 1).valueOf(),
                    creationDateTo: new Date(
                        vm.listYears.selected.name, 11, 31).valueOf(),
                    freeDate: false
                };
            }
        };

        vm.applyHalfYearFilter = function() {
            if (vm.listHalfYear.selected.name == "Первое полугодие") {
                vm.command = {
                    creationDateFrom: new Date(
                        vm.listYears.selected.name, 0, 1).valueOf(),
                    creationDateTo: new Date(
                        vm.listYears.selected.name, 5, 30).valueOf(),
                    freeDate: false,
                };
            }
            else if(vm.listHalfYear.selected.name == "Второе полугодие") {
                vm.command = {
                    creationDateFrom: new Date(
                        vm.listYears.selected.name, 6, 1).valueOf(),
                    creationDateTo: new Date(
                        vm.listYears.selected.name, 11, 31).valueOf(),
                    freeDate: false,
                };
            }
        };

        vm.applyYearFilter = function() {
                vm.command = {
                    creationDateFrom: new Date(
                        vm.listYears.selected.name, 0, 1).valueOf(),
                    creationDateTo: new Date(
                        vm.listYears.selected.name, 11, 31).valueOf(),
                    freeDate: false,
                };
        };

        vm.applyFreeDateFilter = function(){
            if (vm.datePicker.endDate != undefined) {
            let date = vm.datePicker.endDate.valueOf();
            vm.year.setTime(date);
            vm.saveCurrentYear = vm.year.getFullYear();
            vm.command = {
                creationDateFrom: vm.datePicker.startDate.valueOf(),
                creationDateTo: vm.datePicker.endDate.valueOf(),
                freeDate: true,
            };
            }
        };

        vm.mainFilter = function() {
            if (vm.listMonths.selected.name != null && vm.listYears.selected.name != null) {
                vm.applyMonthFilter();
            } else if (vm.listQuarters.selected.name != null && vm.listYears.selected.name != null) {
                vm.applyQuarterFilter();
            } else if (vm.listHalfYear.selected.name != null && vm.listYears.selected.name != null) {
                vm.applyHalfYearFilter();
            } else if (vm.listYears.selected.name != null) {
                vm.applyYearFilter();
            } else {
                vm.applyFreeDateFilter();
            }
            console.log(vm.command);
            ws.$emit('getDocsByTags', vm.command);
        };

        vm.datePickerOptions = {
            "showDropdowns": true,
            "timePicker": true,
            "timePicker24Hour": true,
            "separator": ':',
            "autoApply": true,
            "locale": {
                "format": "DD/MM/YYYY HH:mm",
                "separator": " - ",
                "applyLabel": "ОК",
                "cancelLabel": "Отмена",
                "fromLabel": "От",
                "toLabel": "До"
            }
        };

        vm.cancelDateFilter = function(){
            vm.datePicker = {
                startDate: undefined,
                endDate: undefined
            };
            vm.listMonths.selected = {};
            vm.listYears.selected = {};
            vm.listQuarters.selected = {};
            vm.listHalfYear.selected = {};
            vm.listStatus.selected = {};
            vm.command = {};
            vm.storage.dataOfStates.docs.typeDoc = null;
        };

        vm.doPrint = function(reportName){
            if(vm.storage.reports.hasOwnProperty(reportName) && !!vm.storage.reports[reportName].fields === true){
                if(!vm.storage.reports[reportName].fields.hasOwnProperty('MODAL')){
                    modalsService.reports(reportName);
                }
                else {
                    modalsService[vm.storage.reports[reportName].fields.MODAL](reportName);
                }
            }
        };
    }
})
();
