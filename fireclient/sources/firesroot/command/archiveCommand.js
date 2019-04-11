(function () {

    'use strict';
    angular
        .module('app.ArchiveCommand', ['ui.bootstrap'])
        .controller('ArchiveCommand', ArchiveCommand)
        .run(['$rootScope', 'ws', '$location', '$log', '$cookies', '$state',
            '$stateParams', 'storage', 'growl', '$window',
            'hotkeys', '$timeout', 'changeNewMessagesExistenceFlag', 'globalSelectFire'
            , function ($rootScope, ws, $location, $log, $cookies, $state, $stateParams, storage, growl, $window, hotkeys, $timeout, changeNewMessagesExistenceFlag, globalSelectFire) {

                ws.$on('findCriteriaStreets', function (message) {
                    var currentPlaceArraysStorage = storage.dataOfStates.archiveCommand;
                    if (angular.isArray(message) && message.length > 0) {
                        currentPlaceArraysStorage.streetsArray = message;
                        _.each(currentPlaceArraysStorage.streetsArray, function (street) {
                            if (street.naStreet === true) {
                                street.settName = '**РУЧНОЙ ВВОД**';
                            }
                        });
                    }
                    $rootScope.$apply();
                });
                ws.$on('findCriteriaObjects', function (message) {
                    var currentPlaceArraysStorage = storage.dataOfStates.archiveCommand;
                    if (angular.isArray(message) && message.length > 0) {
                        angular.copy(message, currentPlaceArraysStorage.objectsArray);
                    }
                });
                ws.$on('selectCriteriaStreet', function (message) {
                    var housesArray = message.addresses;
                    if (angular.isArray(housesArray)) {
                        angular.copy(housesArray, storage.dataOfStates.archiveCommand.housesArray);
                    }
                    $rootScope.$apply();
                });
            }]);

    ArchiveCommand.$inject = ['$log', '$scope', 'ws', '$window', 'storage', '$cookies', 'MAPURL', '$state', '$stateParams', 'growl', 'houseSorting', 'getDateRangePickerData'];
    function ArchiveCommand($log, $scope, ws, $window, storage, $cookies, MAPURL, $state, $stateParams, growl, houseSorting, getDateRangePickerData) {
        var vm = this;
        var dateRangePickerData = getDateRangePickerData();

        var now = dateRangePickerData.now;
        var yesterday = dateRangePickerData.yesterday;

        vm.storage = storage;
        vm.filters = {};
        vm.today = now;
        vm.houseUISelect = {};
        vm.datePicker = {
            startDate: yesterday,
            endDate: now
        };
        vm.houseSorting = houseSorting;
        vm.datePickerOptions = dateRangePickerData.config;




        vm.selectIncidentSource = function(source){
            vm.filters.incidentSource = source;
        };

        vm.initialEmit = function () {
            var command = {
                creationDateFrom: yesterday.valueOf(),
                creationDateTo: now.valueOf()
            };
            storage.hideLoadingOverlay = false;
            ws.$emit('getArchivedFires', command);
        };
        vm.applyFilters = function () {
            storage.dataOfStates.archiveCommand.activeFire = undefined;
            vm.storage.docs = [];
            var command = {
                creationDateFrom: vm.datePicker.startDate.valueOf(),
                creationDateTo: vm.datePicker.endDate.valueOf(),
                address: vm.filters.address,
                fireObject: vm.filters.fireObject,
                orderNum: vm.filters.orderNum,
                deptName: vm.filters.deptName,
                region: vm.filters.region,
                operator: vm.filters.operator,
                incidentType: vm.filters.incidentType,
                incidentSource: vm.filters.incidentSource
            };
            if (command.address != undefined) {
                if (command.address.naStreet == undefined) {
                    command.address.naStreet = true;
                }
            }
            ws.$emit('getArchivedFires', command);
            storage.hideLoadingOverlay = false;
        };
        vm.cancelFilters = function () {
            vm.filters = {};
            storage.dataOfStates.archiveCommand.activeFire = undefined;
            vm.storage.docs = [];
            vm.datePicker = {
                startDate: now,
                endDate: yesterday
            };
            vm.initialEmit();
        };
        vm.getDept = function (message) {
            return (message.engine) ? message.engineDeptName : message.userDeptName;
        };

        function cleanArrays() {
            storage.dataOfStates.archiveCommand.streetsArray = [];
            storage.dataOfStates.archiveCommand.housesArray = [];
            storage.dataOfStates.archiveCommand.objectsArray = [];
            storage.dataOfStates.archiveCommand.objectsByHouseArray = [];
            storage.dataOfStates.archiveCommand.tripletsArray = [];
            storage.dataOfStates.archiveCommand.crossesArray = [];
            storage.dataOfStates.archiveCommand.listOfAdditionalTech = [];
        }

        vm.selectPrimaryStreet = function (item) {
            cleanArrays();
            if (angular.isDefined(item)) {
                var message = item;
                vm.filters.address = item;
                ws.$emit('selectCriteriaStreet', message);
            }
        };
        vm.primaryStreetFieldChanged = function () {
            cleanArrays();
            if (vm.filters.address.street.length > 2) {
                var message = vm.filters.address.street;
                ws.$emit('findCriteriaStreets', message);
                var temp = '' + message;
                vm.clearAddressAndObject();
                vm.filters.address.street = '' + temp
            }
        };
        vm.objectNameFieldChanged = function () {
            if (vm.filters.fireObject.nameobject.length > 2) {
                var message = '' + vm.filters.fireObject.nameobject;
                ws.$emit('findCriteriaObjects', message);
                vm.clearAddressAndObject();
                vm.filters.fireObject.nameobject = '' + message

            }
        };
        vm.selectIncidentType = function (type) {
            vm.filters.incidentType = type;
        };
        vm.clearDistrict = function (item) {
            if (item.code === 1141) {
                if (vm.filters.address != undefined) {
                    vm.filters.address.district = null;
                }
            }
        };
        vm.selectRegion = function (item) {
            angular.copy(item, vm.filters.region);
            vm.clearDistrict(item);
        };
        vm.selectObject = function (item) {
            vm.clearAddressAndObject();
            angular.copy(item, vm.filters.fireObject);
        };
        vm.onSelectBuilding = function (item) {
            if (angular.isDefined(item)) {
                vm.filters.address = item;
                vm.filters.fireObject = null;
            } else {
                vm.filters.address.house = null;
                vm.filters.address.fireObject = null;
                vm.houseUISelect = {};
            }
        };
        ////////////////////////////////////////////
        vm.clearAddressAndObject = function () {
            vm.filters.address = {};
            vm.filters.fireObject = {};
            cleanArrays();
        };
        ///////////////////////////////////////////
        vm.initialEmit();

    }
})
();
