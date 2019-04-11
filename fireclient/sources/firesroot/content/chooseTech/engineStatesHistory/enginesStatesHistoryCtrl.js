(function () {

    'use strict';
    angular
        .module('app.chooseTech.engineStatesHistory', [])
        .controller('EngineHistory', EngineHistory)
        .run(['$rootScope', 'ws', '$location', '$log', '$cookies', '$state', '$stateParams', 'storage', 'growl', '$window', 'hotkeys', '$timeout', 'changeNewMessagesExistenceFlag', function ($rootScope, ws, $location, $log, $cookies, $state, $stateParams, storage, growl, $window, hotkeys, $timeout, changeNewMessagesExistenceFlag) {
            ws.$on('adminFilterProtocol', function (message) {
                storage.dataOfStates.engineStatesHistory.log = message;
                if (storage.dataOfStates.engineStatesHistory.log.length === 0) {
                    growl.error('<b>Cобытий нет</b>' + '</br>' + 'Выберите другие даты и фильтры', {
                        ttl: 4000,
                        disableCountDown: false
                    });


                    // growl.error('<b>Cобытий нет</b>' + '</br>' + 'Выберите другие даты и фильтры');
                }
                storage.hideLoadingOverlay = true;
                $rootScope.$apply();
                growl.success("Фильтры применены");
            })
        }])
    ;

    EngineHistory.$inject = ['$log', '$scope', 'ws', 'storage', '$location', '$stateParams', '$state', '$filter', '$timeout', '$cookies', 'engineTypeSortingAlgorythm', 'getNumDept'];
    function EngineHistory($log, $scope, ws, storage, $location, $stateParams, $state, $filter, $timeout, $cookies, engineTypeSortingAlgorythm, getNumDept) {
        var vm = this;
        vm.storage = storage;
        vm.getNumDept = getNumDept;
        vm.engineTypeSortingAlgorythm = engineTypeSortingAlgorythm;
        storage.dataOfStates.engineStatesHistory.log = [];
        //даты
        vm.today = new Date();
        var dayBefore = new Date();
        dayBefore.setDate(dayBefore.getDate() - 1);
        vm.datePicker = {
            endDate: vm.today,
            startDate: dayBefore
        };
        vm.showCard = function (fireActId) {
            if (fireActId !== undefined) {
                if (_.find(storage.activeFires, function (fire) {
                        return fire.id == fireActId
                     })) {
                    $state.go('fires.order', {fireId: fireActId});
                }
                else {
                    ws.$emit('getForma6', fireActId);
                    storage.dataOfStates.formaViewOnly = true;
                }
            }
        };
        vm.datePickerOptions = {
            showDropdowns: true,
            timePicker: false,
            timePicker24Hour: true,
            separator: ':',
            singleDatePicker: false,
            autoApply: true,
            locale: {
                "format": "DD/MM/YYYY HH:mm",
                "separator": " - ",
                "applyLabel": "ОК",
                "cancelLabel": "Отмена",
                "fromLabel": "От",
                "toLabel": "До"
            }/*,
             ranges: {
             "Сегодня": [
             (new Date()).getDate(), new Date()
             ],
             "Вчера": [
             dayBefore.getDate(),
             (new Date()).getDate()
             ],
             "Last 7 Days": [
             "2016-04-15T07:29:16.754Z",
             "2016-04-21T07:29:16.754Z"
             ],
             "Last 30 Days": [
             "2016-03-23T07:29:16.754Z",
             "2016-04-21T07:29:16.754Z"
             ],
             "This Month": [
             "2016-03-31T21:00:00.000Z",
             "2016-04-30T20:59:59.999Z"
             ],
             "Last Month": [
             "2016-02-29T21:00:00.000Z",
             "2016-03-31T20:59:59.999Z"
             ]
             }*/
        };
        vm.activeDept = null;
        vm.engineSelected = null;
        vm.deptSelected = function (deptItem) {
            vm.activeDept = deptItem;
            vm.engineSelected = null;
        };
        vm.emitFilters = function () {
            var message = {
                protocol: 'enginesLogs',
                dateFrom: vm.datePicker.startDate.valueOf(),
                dateTo: vm.datePicker.endDate.valueOf(),
                deptId: null,
                engineId: vm.engineSelected.idFireEngine,
                engineTypeId: null,
                userId: null,
                fireId: null,
                entityId: null,
                typeEvent: null,
                entityType: null
            };
            storage.hideLoadingOverlay = false;
            ws.$emit("adminFilterProtocol", message);
        };
        vm.clearFilters = function () {
            vm.activeDept = null;
            vm.engineSelected = null;
            storage.dataOfStates.engineStatesHistory.log = [];
            vm.datePicker = {
                endDate: vm.today,
                startDate: dayBefore
            };
        };
        vm.formatDate = function (model, index) {
            if (index != 0) {
                var shortDate = $filter('date')(model.date, 'dd-MM-yy');
                var shortDateBefore = $filter('date')(vm.storage.dataOfStates.engineStatesHistory.log[index - 1].date, 'dd-MM-yy');
                if (shortDate === shortDateBefore) return $filter('date')(model.date, 'HH:mm');
                else return $filter('date')(model.date, 'dd-MM-yy HH:mm');

            } else {
                return $filter('date')(model.date, 'dd-MM-yy HH:mm');
            }
        };
        vm.emitButtonDisabled = function () {
            return !(vm.engineSelected != null && vm.engineSelected.idFireEngine != undefined)
        }
    }
})();
