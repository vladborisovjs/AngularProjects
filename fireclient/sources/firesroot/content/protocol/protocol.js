(function(){

    'use strict';
    angular
        .module('app.protocol', [])
        .controller('Protocol', Protocol)
        .run(['$rootScope', 'ws', '$location', '$log', '$cookies', '$state', '$stateParams', 'storage', 'growl', '$window', 'hotkeys', '$timeout', 'changeNewMessagesExistenceFlag', function($rootScope, ws, $location, $log, $cookies, $state, $stateParams, storage, growl, $window, hotkeys, $timeout, changeNewMessagesExistenceFlag){
            ws.$on('addProtocol', function(message){
                var fireAct = _.find(storage.activeFires, function(fire){
                    return fire.id == message.fireActId
                });
                _.each(message.protocolRow, function(row){
                    fireAct.messageBuffer.push(row);
                });
                changeNewMessagesExistenceFlag(fireAct);

                $rootScope.$apply();
            });
        }])
    ;

    Protocol.$inject = ['$log', '$scope', 'ws', 'storage', '$location', '$stateParams', '$state', '$filter', '$timeout', '$cookies', 'engineTypeSortingAlgorythm', 'modalsService'];
    function Protocol($log, $scope, ws, storage, $location, $stateParams, $state, $filter, $timeout, $cookies, engineTypeSortingAlgorythm, modalsService){
        var vm = this;


        ///////////////////////
        vm.storage = storage;
        vm.selectedFire = undefined;
        vm.fireNotificationsCopy = jQuery.extend([], storage.fireNotifications, true);
        vm.stateCalledFrom = $stateParams.calledFrom || null;
        storage.controllers.protocol = vm;
        ///////////////////////

        var columnDefs = [
            {
                name: 'Дата',
                field: "date",
                width: 130,
                //cellTemplate: '<span ng-bind="grid.getCellDisplayValue(row, col)"></span><button class="btn btn-primary btn-xs pull-right" ng-click="grid.appScope.changeProtocolDate(row)"><span class="glyphicon glyphicon-pencil"></span></button>',
                cellFilter: "date: 'dd-MM-yy HH:mm:ss'",
                filterCellFiltered: true,
                enableColumnMenu: false
            },
            {
                name: 'Тип', field: 'engine.engineType',
                cellFilter: "engineTypeDecorator: row.entity.engine.isFirstTank : row .entity.engine.asGD",
                filterCellFiltered: true,
                width: 70, enableColumnMenu: false
            },
            //{name: "Гос№", field: "engine.gosNo", width: 150, enableColumnMenu: false},
            {
                name: vm.storage.fireUser.ACCESS.words.pch + ".",
                field: 'engineDeptName',
                width: 65,
                enableColumnMenu: false
            }, {
                name: vm.storage.fireUser.ACCESS.words.pch,
                cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.getDept(grid,row)}}</div>',
                width: 60,
                enableColumnMenu: false
            },
            {
                name: "Сообщение",
                field: "message",
                enableColumnMenu: false,
                cellClass: 'toUpperCase',
                cellTemplate: '<div class="protocol-message-wrapper" ng-bind-html="grid.appScope.filterMessage(row.entity[col.field])"></div>'
                // cellTemplate: '<div class="protocol-message-wrapper" ng-bind-html="row.entity[colfield]"></div>'
                /*
                 cellTemplate: '<div class="popover-in-table-correction-class"' +
                 '>' +
                 '<div class="ui-grid-cell-contents" uib-popover="{{row.entity[col.field]}}" popover-placement="auto" popover-trigger="mouseenter">{{row.entity[col.field]}}</div></div>'
                 */
            },
            {name: "Фамилия", field: 'user.lastName', width: 110, enableColumnMenu: false},
            {
                name: 'Ред.',
                field: "edit",
                width: 40,
                enableSorting: false,
                cellTemplate: '<button class="btn btn-primary default-gray-button btn-xs" ng-click="grid.appScope.changeProtocolDate(row, \'date\')"><span class="glyphicon glyphicon-pencil"></span></button>',
                enableColumnMenu: false,
                filterCellFiltered: false
            }
        ];

        /*
         if(vm.stateCalledFrom == 'firesbase'){
         columnDefs.push(
         {
         name: 'Ред.',
         field: "edit",
         width: 40,
         enableSorting: false,
         cellTemplate: '<button class="btn btn-primary btn-xs" ng-click="grid.appScope.changeProtocolDate(row)"><span class="glyphicon glyphicon-pencil"></span></button>',
         enableColumnMenu: false,
         filterCellFiltered: false
         }
         );
         };
         */

        /*        if(vm.stateCalledFrom == 'archive'){
         columnDefs.push(
         {
         headerTemplate: '<div>111</div>',
         field: "",
         width: 40,
         enableSorting: false,
         enableColumnMenu: false,
         filterCellFiltered: false
         }
         );
         };*/


        ///////////////////////


        vm.engineTypeSortingAlgorythm = engineTypeSortingAlgorythm;

        function selectFireOnEnter(){


            if($stateParams.fireId != undefined){

                var messages = [];

                switch($stateParams.calledFrom){

                    case 'firesbase':

                        vm.selectedFire = _.find(storage.activeFires, function(fireAct){

                            if(fireAct.id === $stateParams.fireId){
                                // messages = vm.selectedFire.messageBuffer;
                                messages = fireAct.messageBuffer;
                                // console.log(messages);
                            }

                            return fireAct.id === $stateParams.fireId;
                        });


                        break;

                    case 'archive':

                        // console.log(storage);

                        vm.selectedFire = _.find(storage.archFireActs, function(fireAct){

                            if(fireAct.id === $stateParams.fireId){
                                messages = fireAct.fireAct.messageBuffer;
                                vm.selectedFire = fireAct;
                                // console.log(messages);
                            }

                            return fireAct.id === $stateParams.fireId;
                        });


                        break;

                }

                // data: vm.selectedFire.messageBuffer,
                vm.buildProtocolMessage(messages);


            } else {
                vm.selectedFire = undefined;
            }
            $scope.techTab = {};
            $scope.techTab.active = true;
            $scope.$watch(function(){
                    messages.length;
                    // return vm.selectedFire.messageBuffer.length;
                },
                function(newValue, oldValue){
                    $timeout(function(){
                        vm.protocolGridApi.core.scrollTo(vm.gridOptions.data[newValue - 1], vm.gridOptions.columnDefs[0]);
                    }, 10)
                }
            );
        }


        vm.buildProtocolMessage = function(messages){
            if(messages !== undefined){
                vm.gridOptions = {
                    //appScopeProvider: vm,
                    columnDefs: columnDefs,
                    data: messages,
                    enableSorting: true,
                    enableFiltering: true,
                    enableRowHashing: false
                };

                vm.gridOptions.onRegisterApi = function(gridApi){
                    vm.protocolGridApi = gridApi;
                    $timeout(function(){
                        vm.gridIsReady = true
                    }, 700);
                };
            }
        };

        $scope.filterMessage = function(message){

            var found = /(.*)(\(.*ВВОДА{1}.*?\))(.*)/ig.exec(message),
                mess = '';

            if(found){

                for(var j = 1; j < found.length; j++){
                    mess += '<span class="message-' + ( (/(\(.*ВВОДА{1}.*?\))/ig.test(found[j])) ? 'lower' : 'upper' ) + '">' + found[j] + '</span>';
                }

                return mess;

            } else {
                return message;
            }

        };


        vm.renewTableData = function(message){
            storage.controllers.protocol = null;


            // let storageField = null;


            /*            let messId = 'id';

             switch(message.where){

             case 'act':
             storageField = 'activeFires'
             messId = 'id';
             break;

             case 'arh':
             storageField = 'archFireActs'
             messId = 'id';
             break;
             }*/


            //          if(storageField && storage.hasOwnProperty(storageField)){

            // let l = storage[storageField].length;

            // var found = false;
            var i = 0;
            var l = 0;


            switch(message.where){

                case 'act':
                    l = storage.activeFires.length;
                    while(i < l){
                        if(storage.activeFires[i].id == message.id){
                            // found = true;
                            vm.gridOptions.data = message.messageBuffer;
                            storage.activeFires[i].messageBuffer = message.messageBuffer;
                            i = l;
                        }
                        i++;
                    }
                    break;

                case 'arh':
                    l = storage.archFireActs.length;
                    while(i < l){
                        /*
                         console.log(storage.archFireActs[i].fireAct.id);
                         console.log(message.id);
                         console.log('----------------------');
                         */
                        if(storage.archFireActs[i].fireAct.id == message.id){
                            // found = true;
                            vm.gridOptions.data = message.messageBuffer;
                            storage.archFireActs[i].fireAct.messageBuffer = message.messageBuffer;
                            i = l
                        }
                        i++;
                    }
                    break;
            }
            /*

             if(found){
             // vm.gridOptions.data = [];
             // vm.gridOptions.data.length = 0;
             vm.gridOptions.data = message.messageBuffer;
             // $scope.$apply();
             }
             */


            /*                while(i < l){

             console.log(i);
             console.log(storage[storageField][i].fireAct.id);
             console.log(message[messId]);


             if(storage[storageField][i].fireAct.id === message[messId]){

             storage[storageField][i].fireAct.messageBuffer = message.messageBuffer;

             vm.gridOptions.data = [];
             vm.gridOptions.data.length = 0;

             // $timeout(function(){
             vm.gridOptions.data = message.messageBuffer;
             // });


             $scope.$apply();

             /!*
             vm.gridOptions.data.length = 0;
             vm.gridOptions.data = message.messageBuffer;
             *!/

             i = l;
             }

             i++;
             }*/

            //}


        }


        $scope.changeProtocolDate = function(row, action){
            // modalsService.confirm('Подтверждение сохранения', 'Сохранить изменения?')
            // row.entity.protocolAction = 'edit';
            storage.controllers.protocol = vm;
            modalsService.protocol(row.entity, vm.stateCalledFrom, action);


        }


        vm.appendToProtocol = function(){

            // modalsService.confirm('Подтверждение сохранения', 'Сохранить изменения?')
            // row.entity.protocolAction = 'edit';
            storage.controllers.protocol = vm;

            modalsService.protocol(vm.selectedFire, vm.stateCalledFrom);


        }


        $scope.getDept = function(grid, row){
            var message = row.entity;
            var dept = message.userDeptName;
            if(dept == null){
                if(_.contains(message.user.roles, 'dispatchers')){
                    dept = "СОО"
                }
                if(_.contains(message.user.roles, 'dispatchersManager')){
                    dept = 'СОО'
                }
            }
            return dept;
        };
        vm.engineStatuse = function(currorder){
            //TODO переделать, когда будет emit о смене статуса от сервера
            var statusInDept = '';
            var engine = {};
            var department = {};
            if(currorder.fireEngineDept){
                department = _.find(storage.fireDepartments, function(dept){
                    return dept.id == currorder.fireEngineDept
                });
                engine = _.find(department.fireEngines, function(engine){
                    return engine.idFireEngine == currorder.fireEngine.idFireEngine
                });
                statusInDept = engine.fireEngineState.name;
            }
            if(statusInDept != currorder.fireEngine.fireEngineState.name){
                currorder.fireEngine.fireEngineState = engine.fireEngineState;
            }
            return statusInDept;
            //return currorder.fireEngine.fireEngineState.name; //так правильно

        };
        vm.onRemoveEngineFromFire = function(currorder){
            ws.$emit('removeEngineFromFire', {
                fireActId: vm.selectedFire.id,
                fireEngineId: currorder.fireEngine.idFireEngine,
                fireEngineType: currorder.fireEngineType
            });
        };
        vm.onArriveEngineToFire = function(currorder){
            ws.$emit('arriveEngineToFire', {
                fireActId: vm.selectedFire.id,
                fireAct: vm.selectedFire,
                fireEngineId: currorder.fireEngine.idFireEngine
            });
        };
        vm.goToDept = function(currorder){
            $state.go('fires.chooseTech.bydept', {
                deptId: currorder.fireEngineDept,
                fireId: vm.selectedFire.id
            }, {location: true});
        };
        vm.goToType = function(currorder){
            $state.go('fires.chooseTech.bytypes', {
                //deptId: currorder.fireEngineDept,
                fireType: currorder.fireEngineType.engineType,
                fireId: vm.selectedFire.id
            }, {location: true});
        };
        vm.goToByTypes = function(engineType){
            $state.go('fires.chooseTech.bytypes', {
                deptId: undefined,
                fireType: engineType,
                fireId: vm.selectedFire.id
            }, {location: true});
        };
        vm.showPathFromPchToFire = function(currorder){
            var command = {};
            var dislocation = vm.getDislocatinDept(currorder);
            if(dislocation === null){
                command.deptId = currorder.fireEngineDept;
                command.deptName = currorder.departmentName;
            } else {
                command.deptId = dislocation.id;
                command.deptName = dislocation.fireDeptName;
            }

            command.engineType = currorder.fireEngineType;
            command.fireActId = vm.selectedFire.id;
            command.ticket = $cookies.get('ticket');
            ws.$emit('showPathFromPchToFire', command);
        };
        vm.getDislocatinDept = function(order){
            var currentDept = _.find(storage.fireDepartments, function(dept){
                return dept.id === order.fireEngineDept;
            });
            if(currentDept === undefined){
                console.log('order noDept');
                return null;
            }
            else {
                var engine = _.find(currentDept.fireEngines, function(engine){
                    return engine.idFireEngine === order.fireEngine.idFireEngine;
                });
                if(engine.locationDeptId != null){
                    var dislocationDept = _.find(storage.fireDepartments, function(dept){
                        return dept.id === engine.locationDeptId;
                    });
                    return dislocationDept;
                } else {
                    return null;
                }
            }
        };
        vm.clearFireNotifications = function(){
            vm.fireNotificationsCopy = jQuery.extend(true, [], storage.fireNotifications);
            $scope.techTab.active = true;
        };
        vm.sendFireNotifications = function(){
            var arrayToSend = _.filter(vm.fireNotificationsCopy, function(obj){
                return obj.who && obj.checked;
            });
            ws.$emit('fireNotifications', {
                fireActId: vm.storage.selectedFire.id,
                fireNotifications: arrayToSend
            });
            vm.clearFireNotifications();
        };

        vm.addPersonToNotifications = function(){
            vm.fireNotificationsCopy.push({checked: false});
        };

        vm.deletePersonToNotifications = function(index){
            vm.fireNotificationsCopy.splice(index, 1);
        };
        vm.autoCheckbox = function(person){
            person.checked = true;
        };
        vm.removeMissedEngine = function(missedEngine){
            ws.$emit('deleteNotFoundOrder', {
                fireActId: vm.selectedFire.id,
                fireAct: vm.selectedFire,
                engineType: missedEngine.type
            })
        };
        selectFireOnEnter();


        vm.onRemoveOrder = function(order){
            ws.$emit('removeEngineFromFire', {
                fireActId: storage.selectedFire.id,
                fireEngineId: order.fireEngine.idFireEngine,
                fireEngineType: null
            });
        };


        vm.addEnginesToFire = function(){
            var command = [];
            vm.storage.selectedFire.addOrders.map(function(order){
                command.push({
                    deptId: order.fireEngineDept,
                    idFireEngine: order.fireEngine.idFireEngine,
                });
            });
            if(command.length > 0){
                ws.$emit('addEngineToFire',
                    {
                        fireActId: vm.storage.selectedFire.id,
                        fireEngineList: command
                    }
                );
            }

        };


        $scope.$on('$destroy', function(){
            delete vm.storage.dataOfStates.archiveCommand.activeFire;
            storage.controllers.protocol = null;
        });
    }
})();
