(function(){

    'use strict';
    angular
        .module('app.FormsFilterCommand', ['ui.bootstrap'])
        .controller('FormsFilterCommand', FormsFilterCommand)
        .run(['$rootScope', 'ws', '$location', '$log', '$cookies', '$state',
            '$stateParams', 'storage', 'growl', '$window',
            'hotkeys', '$timeout', 'changeNewMessagesExistenceFlag', 'globalSelectFire'
            , function($rootScope, ws, $location, $log, $cookies, $state, $stateParams, storage, growl, $window, hotkeys, $timeout, changeNewMessagesExistenceFlag, globalSelectFire){

                ws.$on('findCriteriaStreets', function(message){
                    var currentPlaceArraysStorage = storage.dataOfStates.formsFilterCommand;
                    if(angular.isArray(message) && message.length > 0){
                        currentPlaceArraysStorage.streetsArray = message;
                        _.each(currentPlaceArraysStorage.streetsArray, function(street){
                            if(street.naStreet === true){
                                street.settName = '**РУЧНОЙ ВВОД**';
                            }
                        });
                    }
                    $rootScope.$apply();
                });
                ws.$on('findCriteriaObjects', function(message){
                    var currentPlaceArraysStorage = storage.dataOfStates.formsFilterCommand;
                    if(angular.isArray(message) && message.length > 0){
                        angular.copy(message, currentPlaceArraysStorage.objectsArray);
                    }
                });
                ws.$on('selectCriteriaStreet', function(message){
                    var housesArray = message.addresses;
                    if(angular.isArray(housesArray)){
                        angular.copy(housesArray, storage.dataOfStates.formsFilterCommand.housesArray);
                    }
                    $rootScope.$apply();
                });
            }]);

    FormsFilterCommand.$inject = ['$log', '$scope', 'ws', '$window', 'storage', '$cookies', 'MAPURL', '$state', '$stateParams', 'growl', 'houseSorting', 'getDateRangePickerData'];
    function FormsFilterCommand($log, $scope, ws, $window, storage, $cookies, MAPURL, $state, $stateParams, growl, houseSorting, getDateRangePickerData){
        var vm = this;
        vm.storage = storage;

        var dateRangePickerData = getDateRangePickerData();
        // vm.now = dateRangePickerData.now;
        var yesterday = dateRangePickerData.yesterday;
        vm.datePickerOptions = dateRangePickerData.config;

        var now = new Date();
        var perDay = new Date().setDate(now.getDate());
        var perShift = new Date().setDate(now.getDate() - 1);

        vm.now = new Date(perDay).setHours(23, 59, 0, 0);

        var timeCalculation = {
            currentHour: new Date().getHours(),
            currentMinute: new Date().getMinutes(),
            interval: {
                from: 9,
                to: 9
            }
        };



        if(timeCalculation.currentHour > 9 && parseInt(timeCalculation.currentHour.toString() + timeCalculation.currentMinute.toString(), 10) < 2359){
            timeCalculation.interval.from = now.setDate(now.getDate());
            timeCalculation.interval.from = now.setHours(9, 0, 0, 0);
            timeCalculation.interval.to = now.setDate(now.getDate() + 1);
            timeCalculation.interval.to = now.setHours(9, 0, 0, 0);
        }
        if(timeCalculation.currentHour < 9){
            timeCalculation.interval.to = now.setDate(now.getDate());
            timeCalculation.interval.to = now.setHours(9, 0, 0, 0);
            timeCalculation.interval.from = now.setDate(now.getDate() - 1);
            timeCalculation.interval.from = now.setHours(9, 0, 0, 0);
        }

        // console.log('timeCalculation >>> ', timeCalculation);

        vm.datePickerOptions.ranges = Object.assign({
            'За сутки 00:00 - 23:59': [new Date(perDay).setHours(0, 0, 0, 0), new Date(perDay).setHours(23, 59, 0, 0)],
            // 'Смена 09:00 - 09:00': [new Date(perShift).setHours(9, 0, 0, 0), new Date(perDay).setHours(9, 0, 0, 0)]
            'Смена': [timeCalculation.interval.from, timeCalculation.interval.to]
        }, vm.datePickerOptions.ranges);


        // console.log('vm.datePickerOptions >>>', vm.datePickerOptions);


        vm.storage.form6Filters.creationDateFrom = vm.storage.form6Filters.creationDateFrom || yesterday.valueOf();
        vm.storage.form6Filters.creationDateTo = vm.storage.form6Filters.creationDateTo || vm.now.valueOf();
        vm.datePicker = {
            startDate: vm.storage.form6Filters.creationDateFrom,
            endDate: vm.storage.form6Filters.creationDateTo
        };


        /*
         now.setMinutes(now.getMinutes() + 5);
         var yesterday = new Date().setDate(now.getDate() - 1);
         */

        /*
         vm.changePeriod = function(){
         var now = new Date();
         // console.log('dateRangePickerData.config 1>>>>', JSON.stringify(vm.datePicker));
         vm.datePicker.startDate = new Date().setDate(now.getDate() - 10);
         vm.datePicker.endDate = new Date().getTime();
         // console.log('dateRangePickerData.config 2>>>>', JSON.stringify(vm.datePicker));
         // console.log('datePickerOptions>>>>', vm.datePickerOptions);
         };
         */

        vm.houseUISelect = {};
        vm.houseSorting = houseSorting;

        vm.initialEmit = function(){
            ws.$emit('getDispatchersForma6', vm.storage.form6Filters);
        };
        vm.applyFilters = function(){
            vm.storage.form6Filters.creationDateFrom = vm.datePicker.startDate.valueOf();
            vm.storage.form6Filters.creationDateTo = vm.datePicker.endDate.valueOf();
            if($state.is('fires.formaedit')){
                ws.$emit('getDispatchersForma6', vm.storage.form6Filters);
            }
            else {
                ws.$emit('getInvestigatorsForma6', vm.storage.form6Filters);
            }
            storage.hideLoadingOverlay = false;
        };
        vm.cancelFilters = function(){
            vm.selectedF6 = undefined;
            vm.storage.form6Filters = {};
            vm.storage.form6Filters.creationDateFrom = yesterday.valueOf();
            vm.storage.form6Filters.creationDateTo = vm.now.valueOf();
            vm.datePicker = {
                startDate: vm.storage.form6Filters.creationDateFrom,
                endDate: vm.storage.form6Filters.creationDateTo
            };
            vm.initialEmit();
        };
        vm.clearDistrict = function(item){
            if(item.code === 1141){
                if(vm.storage.form6Filters.address != undefined){
                    vm.storage.form6Filters.address.district = null;
                }
            }
        };
        vm.selectRegion = function(item){
            angular.copy(item, vm.storage.form6Filters.region);
            vm.clearDistrict(item);
        };
        ////////////////////////////////////////////
        vm.initialEmit();

    }
})
();
