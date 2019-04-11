(function () {
    'use strict';
    angular
        .module('app.deptsNote.protocol', [])
        .controller('NotesProtocol', NotesProtocol)
        .run(['ws', 'storage', '$log', '$rootScope', '$cookies', '$state', 'growl', '$filter', function (ws, storage, $log, $rootScope, $cookies, $state, growl, $filter) {
            ws.$on('adminFilterDeptsEdits', function (message) {
                console.log(message);
                storage.notesProtocol = message;
                if (storage.notesProtocol.length === 0) {
                    growl.error('<b>Cобытий нет</b>' + '</br>' + 'Выберите другие даты и фильтры', {
                        ttl: 4000,
                        disableCountDown: false
                    });
                }
                var listOfUsers = _.map(storage.notesProtocol, function (event) {
                    if (event.user) {
                        return event.user;
                    }
                });
                listOfUsers = _.filter(listOfUsers, function (item) {
                    return item != undefined;
                });
                if (listOfUsers.length > 0) {
                    listOfUsers = _.uniq(listOfUsers, false, function (user) {
                        return user.id;
                    });
                    storage.dataOfStates.notesProtocol.userList = listOfUsers;
                }

                storage.dataOfStates.notesProtocol.dataLoaded = true;
                $rootScope.$apply();
                growl.success("Фильтры применены");
                console.log("filters done");

            });
        }]);


    NotesProtocol.$inject = ['$log', '$scope', 'ws', 'storage', '$location', '$stateParams', '$state', '$filter', 'engineTypeSortingAlgorythm', 'growl', 'getNumDept'];
    function NotesProtocol($log, $scope, ws, storage, $location, $stateParams, $state, $filter, engineTypeSortingAlgorythm, growl, getNumDept) {
        var vm = this;
        var eventName = "adminFilterDeptsEdits";
        vm.storage = storage;
        vm.engineTypeSortingAlgorythm = engineTypeSortingAlgorythm;
        /*
         * ОПИСАНИЕ КЛАССА И ЧАСТЕЙ СООБЩЕНИЯ
         *
         adminFilterDeptsEdits

         date: Date,
         dateFrom: Date,
         dateTo: Date,
         userId: ObjectId,
         deptId: ObjectId,
         caraulNum: Int
         *
         * */
        vm.singleDatePicker = true;
        vm.datePickerOptions = {
            "showDropdowns": true,
            "timePicker": false,
            "timePicker24Hour": true,
            "separator": ':',
            singleDatePicker: false,
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
        vm.singleDatePickerOptions = {
            "showDropdowns": true,
            "timePicker": false,
            "timePicker24Hour": true,
            "separator": ':',
            singleDatePicker: true,
            "dateLimit": {
                "days": 3
            },
            "autoApply": true,
            "locale": {
                "format": "DD/MM/YYYY",
                "separator": " - ",
                "applyLabel": "ОК",
                "cancelLabel": "Отмена",
                "fromLabel": "От",
                "toLabel": "До"
            }
        };
        //установка storage.dataOfStates
        vm.today = new Date();
        var dayBefore = new Date();
        dayBefore.setDate(dayBefore.getDate() - 1);
        storage.dataOfStates.notesProtocol = {
            activeDept: null,
            activeUser: null,
            userList: [],
            activeDeptNote: null,
            singleDatePicker: {
                value: vm.today
            },
            datePicker: {
                endDate: vm.today,
                startDate: dayBefore
            }
        };
        vm.page = storage.dataOfStates.notesProtocol;
        vm.toggleSingleDatePicker = function () {
            vm.singleDatePicker = !vm.singleDatePicker;
        };
        //////////////////////////        //////////////////////////        //////////////////////////        //////////////////////////        //////////////////////////
        vm.getNumDept = getNumDept;

        //////////////////////////        //////////////////////////        //////////////////////////        //////////////////////////        //////////////////////////

        vm.formatDate = function (model, index) {
            if (index != 0) {
                var shortDate = $filter('date')(model.date, 'dd-MM-yy');
                var shortDateBefore = $filter('date')(vm.storage.notesProtocol[index - 1].date, 'dd-MM-yy');
                if (shortDate === shortDateBefore) return $filter('date')(model.date, 'HH:mm');
                else return $filter('date')(model.date, 'dd-MM-yy HH:mm');

            } else {
                return $filter('date')(model.date, 'dd-MM-yy HH:mm');
            }
        };
        vm.emitFilters = function () {
            vm.page.activeDeptNote = null;
            var deptId = (vm.page.activeDept !== undefined && vm.page.activeDept !== null) ? vm.page.activeDept.id : null;
            var userId = ((vm.page.activeUser !== undefined && vm.page.activeUser !== null)) ? vm.page.activeUser.id : null;
            var message = {
                deptId: deptId,
                userId: userId
            };
            if (vm.singleDatePicker) {
                message.date = vm.page.singleDatePicker.valueOf();
            } else {
                message.dateFrom = vm.page.datePicker.startDate.valueOf();
                message.dateTo = vm.page.datePicker.endDate.valueOf();
            }
            ws.$emit(eventName, message);


        };
        vm.getDept = function (logModel) {
            if (logModel.engine) {
                return logModel.engineDeptName;
            }
            else {
                if (logModel.userDeptName !== null) {
                    return logModel.userDeptName;
                } else {
                    return 'ССО'
                }
            }
        };
        vm.resetFilters = function () {
            vm.page.dataLoaded = false;
            vm.page.activeDept = null;
            vm.page.activeUser = null;
            vm.singleDatePicker = true;
            vm.page.activeDeptNote = null;
            vm.page.singleDatePicker = {
                value: vm.today
            };
            vm.page.datePicker = {
                endDate: vm.today,
                startDate: dayBefore
            };
        };
        vm.emitDefaults = function () {
            vm.resetFilters();
            storage.notesProtocol = [];
            vm.emitFilters();
        };
        vm.selectNote = function (note) {
            if (vm.page.activeDeptNote && vm.page.activeDeptNote.id === note.id) {
                vm.page.activeDeptNote = null;
                vm.currentCaraul = null;
            } else {
                vm.page.activeDeptNote = jQuery.extend(true, {}, note);
                vm.currentCaraul = _.find(vm.page.activeDeptNote.fireDepartment.caraulCrews, function (caraul) {
                    return caraul.caraulNum === vm.page.activeDeptNote.fireDepartment.totalCaraulNum;
                });
            }
        };
        vm.closeNote = function () {
            vm.selectNote(vm.page.activeDeptNote);

        };
        vm.findEngineInCaraul = function (currentCaraul, engine) {
            var engineInCrew = _.find(currentCaraul.caraulEngines, function (eng) {
                return eng.idFireEngine === engine.idFireEngine;
            });
            return engineInCrew.caraulEngine;
        };
        vm.getRelocationEngineById = function (fireEngine) {
            if (vm.page.activeDeptNote) {
                var eng = _.find(vm.page.activeDeptNote.fireDepartment.fireEngines, function (engine) {
                    return fireEngine.replacementFireEngineId && engine.idFireEngine === fireEngine.replacementFireEngineId
                });
                if (angular.isDefined(eng)) {
                    return eng.engineType.engineType + ' ' + eng.gosNo
                } else {
                    return 'С какой машины?'
                }
            }
        };
        vm.getDislocation = function (fireEngine) {
            if (fireEngine.locationDeptId != null) {
                var dislocationDept = _.find(storage.fireDepartments, function (dept) {
                    return dept.id === fireEngine.locationDeptId;
                });
                if (dislocationDept === undefined) {
                    return '??'
                } else {
                    return dislocationDept.fireDeptName;
                }
            } else {
                return '-'
            }
        };
        vm.showPO = function (fireEngine) {
            if (fireEngine.engineType) {
                return fireEngine.engineType.isPO;
            }
        };
        vm.showGD = function (fireEngine) {
            if (fireEngine.engineType) {
                return fireEngine.engineType.isGD;
            }
        };
        vm.showGDZS = function (fireEngine) {
            if (fireEngine.engineType) {
                return fireEngine.engineType.isGDZS;
            }
        };
        vm.calculateByFaceCrewCount = function () {
            if (vm.currentCaraul) {
                vm.currentCaraul.byFaceCrewCount = vm.currentCaraul.atListCrewCount + vm.currentCaraul.attachedCrewCount - (vm.currentCaraul.illCrewCount + vm.currentCaraul.restCrewCount + vm.currentCaraul.detachedCrewCount + vm.currentCaraul.freeCrewCount);
            }
        };
        vm.setIconColor = function (color) {
            var trueColor = '';
            if (color != '') {
                trueColor = color
            } else {
                trueColor = 'black';
            }
            return {color: trueColor};
        };
        vm.getTotalBaseCrewCount = function () {
            var totalCount = 0;
            if (vm.currentCaraul) {
                _.each(vm.currentCaraul.caraulEngines, function (engine) {
                    totalCount += engine.caraulEngine.baseCrewCount;
                    totalCount += engine.caraulEngine.additionalSmokeProtectionCrewCount;
                });
            }
            return totalCount;
        };
        vm.emitDefaults();

    }

})();

