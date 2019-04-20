(function(){
    'use strict';
    angular
        .module('app.deptsNotes.bydept', [])
        .controller('Bydepts', Bydepts)
        .run(['ws', 'storage', '$log', '$rootScope', '$cookies', '$state', 'growl', '$filter', function(ws, storage, $log, $rootScope, $cookies, $state, growl, $filter){
            ws.$on('adminFilterDeptsEdits', function(message){

                storage.notesProtocol = message;
                /*
                 if(storage.notesProtocol.length === 0){
                 growl.error('<b>Cобытий нет</b>' + '</br>' + 'Выберите другие даты и фильтры', {
                 ttl: 4000,
                 disableCountDown: false
                 });
                 }
                 */
                var listOfUsers = _.map(storage.notesProtocol, function(event){
                    if(event.user){
                        return event.user;
                    }
                });
                listOfUsers = _.filter(listOfUsers, function(item){
                    return item != undefined;
                });
                if(listOfUsers.length > 0){
                    listOfUsers = _.uniq(listOfUsers, false, function(user){
                        return user.id;
                    });
                    storage.dataOfStates.notesProtocol.userList = listOfUsers;
                }

                storage.dataOfStates.notesProtocol.dataLoaded = true;
                $rootScope.$apply();
                // growl.success("Фильтры применены");

            });
        }]);



    Bydepts.$inject = ['$rootScope', '$log', '$scope', 'ws', 'storage', '$location', '$stateParams', '$state', '$anchorScroll', '$timeout', '$cookies', 'engineTypeSortingAlgorythm', 'getNumDept', '$interval', 'isDeptNeedToSaveCaraul', '$http', 'HTTPURLDesktop', 'findEngineInCaraulByDept', 'showEngineHistory', 'engineStatusSortingAlgorythm', 'growl', '$compile', '$filter'];
    function Bydepts($rootScope, $log, $scope, ws, storage, $location, $stateParams, $state, $anchorScroll, $timeout, $cookies, engineTypeSortingAlgorythm, getNumDept, $interval, isDeptNeedToSaveCaraul, $http, HTTPURLDesktop, findEngineInCaraulByDept, showEngineHistory, engineStatusSortingAlgorythm, growl, $compile, $filter){
        var vm = this;
        storage.controllers.bydepts = vm;
        vm.storage = storage;


        /*
         ws.$on('updateDepartments', function(depts){


         console.log('depts >', depts);


         depts.map(function(all){

         storage.fireDepartments.find(function(dept){

         if(dept.id === all.id){
         /!*
         console.log('found', dept.id === all.id, '   ', dept.id);
         console.log('dept.fireEngines >', dept.fireEngines.length, ' <> all.fireEngines >', all.fireEngines.length);
         *!/

         angular.copy(all, dept);

         /!*
         console.log('dept.fireEngines >', dept.fireEngines.length, ' <> all.fireEngines >', all.fireEngines.length);
         *!/
         }

         });

         });

         depts = null;
         vm.selectedDeptDislocatedList = vm.dislocationListForSelectedDept(vm.selectedDept);
         vm.lostTechnique();
         $scope.$apply();
         // vm.selectDept(vm.selectedDept);
         // vm.initializeOnLoad();
         // $timeout(function(){}, 200);
         });
         */


        /*
         vm.storage.fireDepartmentsArchive = (vm.storage.temporaryFireDepartmentsArchive) ? angular.copy(vm.storage.temporaryFireDepartmentsArchive) : undefined;
         */

        delete(vm.storage.temporaryFireDepartmentsArchive);

        vm.showStatusList = false;
        vm.showStatusesList = false;
        vm.showStatusesListForRelocated = false;
        vm.showReplacementList = false;
        vm.showDislocationList = false;
        vm.engineTypeSortingAlgorythm = engineTypeSortingAlgorythm;
        vm.engineStatusSortingAlgorythm = engineStatusSortingAlgorythm;
        vm.isDeptNeedToSaveCaraul = isDeptNeedToSaveCaraul;
        // $log.log('Bydept reloaded');
        vm.getNumDept = getNumDept;
        vm.position = {
            top: '500px',
            left: '500px'
        };
        vm.selectedFire = undefined;
        vm.possibleStatuses = undefined;
        vm.possibleRelocations = undefined;
        vm.possibleDislocations = undefined;
        vm.currEngine = undefined;
        vm.currRelocatedEngine = undefined;


        vm.foamerOnEngines = [];
        vm.selectedDeptDislocatedList = [];
        vm.codeInput = '';
        vm.commentObject = {
            engineId: null,
            comment: ''
        };
        vm.commentStateObject = {
            engineId: null,
            commentSZ: ''
        };
        // vm.stateComment = '';
        vm.receivedState = {
            deptId: $state.params.deptId,
            fireId: $state.params.fireId
        };
        vm.deptDislocatedEngineList = [];
        vm.dislocatedEngineParams = {
            br: 0,
            gdzs: 0,
            po: 0
        };
        vm.totalBaseCrewCount = {};
        vm.showHistory = showEngineHistory.init;


        /*
         console.log('-------------------------- storage.fireDepartmentsArchive');
         console.log(storage.fireDepartmentsArchive);
         console.log('-------------------------- storage.fireDepartments');
         console.log(storage.fireDepartments);
         console.log('-------------------------- <');
         */





        vm.currentRow = function(item){
            var nodes = item.currentTarget.parentNode.children;
            for(var i = 0, l = nodes.length; i < l; i++){
                // console.log('node', i, ' >', nodes[i]);
                nodes[i].classList.remove('wn-list-row');
            }
            item.currentTarget.classList.add('wn-list-row');
            console.log('item 1>', item.currentTarget.id);
            console.log('item 2>', item);
            /*
             console.log('vm.currentRow 1>', item.currentTarget.classList);
             item.currentTarget.classList.add('wn-list-row');
             console.log('vm.currentRow 2>', item.currentTarget.classList);
             */
            // item.currentTarget.classList.remove('wn-list-row');
            // console.log('vm.currentRow 3>', item.currentTarget.classList);

            // console.log('nodes >', nodes);
        };



        vm.selectDeptByDefault = function(){
            var role = storage.fireUser.roles[0];
            storage.fireDepartments.some(function(dept){
                // console.log('storage.fireUser >', dept.fireDeptName, role, role.includes(dept.fireDeptName));
                if(role.includes(dept.fireDeptName)){
                    // if(dept.fireDeptName === role){
                    vm.receivedState.deptId = dept.id;
                    vm.selectDept(dept);
                    return true;
                }
                return false;
            });
        };


        /*
         vm.getFireDeptsData = function(){
         return (vm.storage.fireDepartmentsArchive.fireDepartmentsArchive)? vm.storage.fireDepartmentsArchive.fireDepartmentsArchive : vm.storage.fireDepartments;
         };
         */

        vm.initializeOnLoad = function(){
            vm.selectDeptByDefault();
            refreshLocks();
            // console.log('deptId > ', vm.receivedState.deptId, '    fireId > ', vm.receivedState.fireId);
            if(angular.isDefined(vm.receivedState.deptId)){
                vm.initializeCurrentDeptAndCaraul(vm.receivedState.deptId);
                // vm.initializeCurrentDeptAndCaraul($state.params.deptId);
                $timeout(function(){
                    var old = $location.hash();
                    $location.hash(vm.receivedState.deptId);
                    // $location.hash(deptId);
                    $anchorScroll();
                    $location.hash(old);
                }, 500);
            } else {
                vm.selectedDept = undefined;
                vm.currentCaraul = undefined;
                vm.aso = undefined;
                vm.selectedDeptDislocatedList = [];
            }

            if(angular.isDefined(vm.receivedState.fireId)){
                vm.selectedFire = _.find(storage.activeFires, function(fireAct){
                    return fireAct.id === vm.receivedState.fireId;
                });
            } else {
                vm.selectedFire = undefined;
            }

            // vm.lostTechnique();
            // vm.getTotalBaseCrewCount();

            /*
             console.log('----< 1', vm.selectedDept);
             console.log('----< 2', vm.currentCaraul);
             */

        };


        vm.lostTechnique = function(){
            storage.fireDepartments.map(function(depts){
                if(depts.id !== vm.receivedState.deptId){
                    depts.fireEngines.map(function(eng){
                        if(eng.hasOwnProperty('locationDeptId') && eng.locationDeptId && eng.locationDeptId === vm.receivedState.deptId){
                            depts.caraulCrews.find(function(cCrew){
                                if(cCrew.caraulNum === vm.currentCaraul.caraulNum){


                                    return cCrew.caraulEngines.find(function(cCrewEng){
                                        if(cCrewEng.idFireEngine === eng.idFireEngine){
                                            /*
                                             console.log('=================>', cCrewEng.caraulEngine.foamerCount);
                                             console.log('eng >', eng);
                                             console.log('cCrewEng >', cCrewEng);
                                             */

                                            return vm.currentCaraul.leaveEngines.find(function(leaveEng, idx){
                                                if(leaveEng.idFireEngine === cCrewEng.idFireEngine){
                                                    /*
                                                     var temporaryEng = Object.assign({}, eng);
                                                     // delete leaveEng.caraulEngine.foamerCount;
                                                     temporaryEng.locationDeptName = depts.fireDeptName;
                                                     temporaryEng.locationToDeptId = depts.id;
                                                     */
                                                    // eng.foamerCount = cCrewEng.caraulEngine.foamerCount;
                                                    leaveEng.caraulEngine = Object.assign(eng, cCrewEng.caraulEngine);

                                                    eng.locationDeptName = depts.fireDeptName;
                                                    eng.locationToDeptId = depts.id;

                                                    /*
                                                     console.log('eng >', eng);
                                                     console.log('cCrewEng >', cCrewEng);
                                                     console.log('leaveEng >', leaveEng);
                                                     console.log('vm.currentCaraul.leaveEngines >', vm.currentCaraul.leaveEngines);
                                                     console.log('-----------------------------------');
                                                     */
                                                    // temporaryEng = null;
                                                    return true;
                                                }

                                            });
                                        }


                                    });


                                }

                            });


                            /*
                             vm.currentCaraul.leaveEngines.find(function(leaveEng, idx){
                             if(leaveEng.idFireEngine === eng.idFireEngine){
                             var temporaryEng = Object.assign({}, eng);
                             /!*
                             delete temporaryEng.locationDeptId;
                             delete temporaryEng.foamerCount;
                             *!/
                             // delete leaveEng.caraulEngine.foamerCount;
                             temporaryEng.locationDeptName = depts.fireDeptName;
                             temporaryEng.locationToDeptId = depts.id;
                             leaveEng.caraulEngine = Object.assign(leaveEng.caraulEngine, temporaryEng);
                             console.log('leaveEng >', leaveEng);
                             console.log('temporaryEng >', vm.currentCaraul.leaveEngines);
                             console.log('-----------------------------------');
                             temporaryEng = null;
                             return true;
                             }
                             });
                             */


                        }
                    });
                }
            });
            // console.log('vm.deptDislocatedEngineList >', vm.deptDislocatedEngineList);
        };
        /*
         vm.lostTechnique = function(){
         vm.deptDislocatedEngineList = [];
         storage.fireDepartments.map(function(depts){
         if(depts.id !== vm.receivedState.deptId){
         depts.fireEngines.map(function(eng){
         if(eng.hasOwnProperty('locationDeptId') && eng.locationDeptId && eng.locationDeptId === vm.receivedState.deptId){
         vm.deptDislocatedEngineList.push(
         {
         currentDislocation: {
         id: depts.id,
         name: depts.fireDeptName
         },
         engine: eng
         }
         );
         }
         });
         }
         });
         // console.log('vm.deptDislocatedEngineList >', vm.deptDislocatedEngineList);
         };
         */





        vm.dislocationListForSelectedDept = function(selectedDept){

            if(selectedDept != undefined){
                // var id = selectedDept.id;
                var listOfDislocatedEngines = [];

                selectedDept.fireEngines.forEach(function(engine, idx){

                    if(engine.hasOwnProperty('locationDeptId') && engine.locationDeptId !== undefined && engine.locationDeptId !== null && !!engine.locationDeptId === true){

                        /*
                         console.log(idx, vm.currentCaraul)
                         console.log(idx, engine.locationDeptId)

                         */

                        vm.storage.fireDepartments.find(function(dept){
                            if(dept.id === engine.locationDeptId){
                                var element = {
                                    // engine: engine,
                                    engine: null,
                                    stateId: engine.fireEngineState.id,
                                    dept: {
                                        id: dept.id,
                                        name: dept.fireDeptName
                                    }

                                };

                                element.engine = vm.currentCaraul.caraulEngines.find(function(eng){
                                    if(eng.idFireEngine === engine.idFireEngine){
                                        eng.caraulEngine.idFireEngine = eng.idFireEngine;
                                        eng.caraulEngine.foamerCount = eng.caraulEngine.foamerCount;

                                        return true;
                                    }
                                });

                                // engine.foamerCount = element.engine.foamerCount;

                                /*                                console.log('engine -------->', JSON.stringify(engine));
                                 console.log('element.engine >', JSON.stringify(element.engine.foamerCount));*/
// console.log('element.engine', element.engine);
                                if(!!element.engine === true){

                                    // var temporaryEng = Object.assign({}, element.engine.caraulEngine)
                                    // delete temporaryEng.foamerCount;


                                    // delete element.engine.caraulEngine.foamerCount;
                                    // element.engine.caraulEngine.foamerCount = engine.foamerCount;

                                    // delete element.engine.caraulEngine.smokeProtectionCrewCount;
                                    /*
                                     delete element.engine.caraulEngine.baseCrewCount;

                                     */

                                    // element.engine = Object.assign(engine, temporaryEng);
                                    element.engine = Object.assign(engine, element.engine.caraulEngine);


                                } else {
                                    element.engine = Object.assign({}, engine);
                                }

                                listOfDislocatedEngines.push(element);

                                /*
                                 console.log('>>>', vm.currentCaraul);
                                 console.log('selectedDept >>>', selectedDept);
                                 */

                                // temporaryEng = null;

                                return true;
                            }
                        });
                    }
                });


                /*
                 if(engine.locationDeptId === id){
                 var element = {
                 engine: engine,
                 stateId: engine.fireEngineState.id,
                 dept: {
                 id: dept.id,
                 name: dept.fireDeptName
                 }
                 };
                 listOfDislocatedEngines.push(element);
                 }
                 */
            }
            // console.log('listOfDislocatedEngines > ', listOfDislocatedEngines);
            return listOfDislocatedEngines;
        };




        /*        vm.initializeCurrentDeptAndCaraul = function(selectedDeptId, needRelock){




         if(selectedDeptId != vm.canSaveCaraulDeptId){
         vm.canSaveCaraulDeptId = null;
         }
         if(needRelock === undefined || needRelock !== false){
         ws.$emit('lockDocument', {'id': selectedDeptId + ':dept', 'typeDelivery': 'all'});
         }
         /!*
         vm.selectedDept = _.find(storage.fireDepartments, function(dept){
         console.log(dept.id, '===', selectedDeptId);
         return dept.id === selectedDeptId;
         });
         *!/
         storage.fireDepartments.find(function(dept){
         // storage.fireDepartments.some(function(dept){
         // console.log(dept.id, '===', selectedDeptId);
         // console.log(dept.id === selectedDeptId, dept.id, '<->', selectedDeptId);

         if(dept.id === selectedDeptId){
         vm.selectedDept = dept;
         return true;
         }
         });


         var tempCurrentCaraul = _.find(vm.selectedDept.caraulCrews, function(caraul){
         // return caraul.caraulNum === storage.globalSettings.currentCaraul;
         return (storage.fireDepartmentsArchive)? caraul.caraulNum === storage.fireDepartmentsArchive.crewNumber : caraul.caraulNum === storage.globalSettings.currentCaraul;
         });


         // vm.currentCaraul = JSON.parse(JSON.stringify(tempCurrentCaraul));
         // vm.currentCaraul = angular.merge({}, tempCurrentCaraul);

         vm.currentCaraul = Object.assign({}, tempCurrentCaraul);

         // console.log('tempCurrentCaraul > ', tempCurrentCaraul);
         // console.log('vm.selectedDept.caraulCrews > ', vm.selectedDept);

         //Массив в котором хранятся копии значений количества ПО в машинах
         /!*k
         vm.foamerOnEngines = _.map(vm.selectedDept.fireEngines, function(engine){
         return {idFireEngine: engine.idFireEngine, foamerCount: engine.foamerCount};
         });
         *!/


         vm.foamerOnEngines = [];

         vm.selectedDept.caraulCrews.find(function(cCrew){
         if(cCrew.idCaraul === vm.currentCaraul.idCaraul){
         cCrew.caraulEngines.forEach(function(engine){
         vm.foamerOnEngines.push(
         {idFireEngine: engine.idFireEngine, foamerCount: engine.caraulEngine.foamerCount}
         );
         });
         return true;
         }
         });

         // console.log('vm.foamerOnEngines 1 >>>> ', vm.foamerOnEngines);

         vm.selectedDeptDislocatedList = vm.dislocationListForSelectedDept(vm.selectedDept);

         /!*
         console.log('1 >', vm.currentCaraul);
         console.log('2 >', vm.foamerOnEngines);
         console.log('3 >', vm.selectedDept.fireEngines[5].foamerCount);
         console.log('4 >', storage.fireDepartments[6].fireEngines[5].foamerCount);
         *!/

         };*/







        vm.getFoamOnEngine = function(engine){


            if(!engine.hasOwnProperty('locationDeptId') || !!engine.locationDeptId === false){
                // console.log('eng >>>', engine);
                // return engine;

                return _.find(vm.foamerOnEngines, function(obj){
                    // console.log('obj >>>', obj.foamerCount);

                    /*
                     console.log('obj >>>', vm.foamerOnEngines);
                     console.log('eng >>>', engine);
                     */


                    return obj.idFireEngine === engine.idFireEngine;

                });

            } else {
                var car = null;
                storage.fireDepartments.find(function(dept){
                    return dept.fireEngines.find(function(eng){
                        if(eng.idFireEngine === engine.idFireEngine){
                            car = eng;
                            return true;
                        } else {
                            return false;
                        }
                    });

                });
                return car;
            }
        };

        vm.getDistanceToEngineFromFire = function(engine){
            if(vm.selectedFire && vm.selectedDept){
                if(!engine.locationDeptId){
                    var distancesObject = _.find(storage.distanceToDeptsFromFires, function(distObj){
                        return distObj.fireActId === vm.selectedFire.id;
                    });
                    if(distancesObject){
                        var distToDeptObject = _.find(distancesObject.distances, function(obj){
                            return obj.deptId === vm.selectedDept.id;
                        });
                        if(distToDeptObject){
                            return distToDeptObject.dist + ' км';
                        } else {
                            return "-";
                        }
                    } else {
                        return "-";
                    }
                } else {
                    var distancesObject = _.find(storage.distanceToDeptsFromFires, function(distObj){
                        return distObj.fireActId === vm.selectedFire.id;
                    });
                    if(distancesObject){
                        var distToDeptObject = _.find(distancesObject.distances, function(obj){
                            return obj.deptId === engine.locationDeptId;
                        });
                        if(distToDeptObject){
                            return distToDeptObject.dist + ' км';
                        } else {
                            return "-";
                        }
                    } else {
                        return "-";
                    }
                }
            } else {
                return '-';
            }
        };
        vm.getDistanceToPchFromSelectedFire = function(dept){
            if(vm.selectedFire){
                var distancesObject = _.find(storage.distanceToDeptsFromFires, function(distObj){
                    return distObj.fireActId === vm.selectedFire.id;
                });
                if(distancesObject){
                    var distToDeptObject = _.find(distancesObject.distances, function(obj){
                        return obj.deptId === dept.id;
                    });
                    if(distToDeptObject){
                        return distToDeptObject.dist + ' км';
                    } else {
                        return "";
                    }
                } else {
                    return "";
                }
            } else {
                return "";
            }
        };
        var refreshLocks = function(){
            if(storage.fireDepartments.length > 0){
                var currentListOfDeptsId = _.map(storage.fireDepartments, function(dept){
                    return dept.id + ':dept';
                });
                ws.$emit('listLocks', currentListOfDeptsId);
            }
        };


        if(vm.selectedDept != undefined){
            ws.$emit('unlockDocument', vm.selectedDept.id + ':dept');
        }


        vm.saveBeforeSelect = function(dept){
            if(!!vm.currentCaraul === true && vm.storage.clientSettings.oldSelectedDept !== dept.id){
                vm.saveCaraul(false, true);
            }
            vm.storage.clientSettings.oldSelectedDept = dept.id;
            vm.selectDept(dept);
        };


        vm.selectDept = function(dept, $event){


            if(new Date().getTime() - storage.dataOfStates.bydept.deptSelectedByOneClick > 1000){
                storage.dataOfStates.bydept.deptSelectedByOneClick = new Date().getTime();
                // storage.dataOfStates.bydept.deptSelectedByOneClick = $event.currentTarget.id;
                // storage.dataOfStates.bydept.deptSelectedByOneClick = true;
                // console.log('dept', dept);
                vm.deptDislocatedEngineList = [];
                var deptId = undefined;
                // if(vm.canSaveCaraulDeptId !== undefined){


                if(vm.selectedDept != undefined){
                    ws.$emit('unlockDocument', vm.canSaveCaraulDeptId + ':dept');
                    // ws.$emit('unlockDocument', vm.selectedDept.id + ':dept');
                }
                refreshLocks();

                var fireId = $state.params.fireId;
                if($state.params.deptId !== dept.id){
                    deptId = dept.id;
                    vm.initializeCurrentDeptAndCaraul(deptId);
                    $state.transitionTo($state.current, {
                        deptId: deptId,
                        fireId: fireId
                    }, {notify: false});
                }

                // console.log('vm.deptSelectedByOneClick >>>', storage.dataOfStates.bydept.deptSelectedByOneClick);

                /*
                 if(!!storage.dataOfStates.bydept.deptSelectedByOneClick === true){
                 $timeout(function(){
                 console.log('$event >', $event);
                 $event.preventDefault();
                 storage.dataOfStates.bydept.deptSelectedByOneClick = false;
                 console.log('vm.deptSelectedByOneClick >>>', storage.dataOfStates.bydept.deptSelectedByOneClick);
                 }, 500);
                 }
                 */
            }
        };


        vm.checkLockedDocument = function(){
            var result = false;
            if(vm.selectedDept !== undefined){
                vm.storage.listOfLocks.forEach(function(value){
                    if(value.document == vm.selectedDept.id + ':dept' && vm.storage.fireUser.uid !== value.fireUser.uid){
                        result = true;
                    }
                });
            }
            return result;
        };

        vm.getPossibleStatuses = function(engine){
            //var clonedStatuses = _.clone(storage.statuses);
            // console.log('storage > ', storage);
            // var clonedStatuses = jQuery.extend([], storage.states);
            var clonedStatuses = jQuery.extend([], storage.statuses);
            if(storage.isRoot){
                vm.possibleStatuses = clonedStatuses;
            } else {
                var removedCurrent = _(clonedStatuses).filter(function(status){
                    if(angular.isDefined(vm.possibleRelocations) && Array.isArray(vm.possibleRelocations) && vm.possibleRelocations.length > 0){
                        return status.id !== vm.findEngineInCaraul(vm.currentCaraul, engine).fireEngineStatus.id && status.name !== 'СЛЕДУЕТ' && status.name !== 'НА ПОЖАРЕ' && status.name !== 'БРОНЬ';
                    } else {
                        return status.id !== vm.findEngineInCaraul(vm.currentCaraul, engine).fireEngineStatus.id && status.name !== 'СЛЕДУЕТ' && status.name !== 'ПРИБЫЛА' && status.name !== 'БРОНЬ' && status.name !== 'ВП';
                    }

                });
                switch(vm.findEngineInCaraul(vm.currentCaraul, engine).fireEngineStatus.name){
                    case 'СЛЕДУЕТ':
                        vm.possibleStatuses = undefined;
                        break;
                    case 'ПРИБЫЛА':
                        vm.possibleStatuses = undefined;
                        break;
                    default :
                        vm.possibleStatuses = removedCurrent;
                }
            }
            _.each(vm.possibleStatuses, function(status){
                status.code = vm.codeFind(status);
            });
            /*
             console.log('1 > ', storage.statuses);
             console.log('2 > ', vm.possibleStatuses);
             */
        };
        vm.getPossibleDislocations = function(engine){
            var allDislocations = _.map(storage.fireDepartments, function(dept){
                return {id: dept.id, fireDeptName: dept.fireDeptName}
            });

            /*
             var indexToDelete = null;
             if(engine.locationDeptId){
             indexToDelete = _.findIndex(allDislocations, function(dept){
             return dept.id === engine.locationDeptId;
             });
             } else {
             var deptToDelete = _.find(storage.fireDepartments, function(dept){
             return _.find(dept.fireEngines, function(eng){
             return eng.idFireEngine === engine.idFireEngine;
             })
             });
             indexToDelete = _.findIndex(allDislocations, function(dept){
             return dept.id === deptToDelete.id;
             });
             }
             allDislocations.splice(indexToDelete, 1);
             */
            vm.possibleDislocations = allDislocations.sort(function(v1, v2){
                var list = {
                    v1: parseInt(v1.fireDeptName, 10),
                    v2: parseInt(v2.fireDeptName, 10)
                };
                if(!isNaN(list.v1) && !isNaN(list.v2)){
                    return (list.v1 - list.v2);
                }
                return v1.fireDeptName.localeCompare(v2.fireDeptName);

            });
        };


        vm.getStateFromStatus = function(status){
            return _.find(storage.states, function(state){


                // console.log('state > ', state.id, '  status > ', status.id, '  ===  ', state.id === status.stateId);


                return state.id === status.stateId
            });
        };


        vm.onChangeState = function(newState){
            if(angular.isDefined(vm.selectedDept) && angular.isDefined(vm.currEngine)){
                var command = {
                    deptId: vm.selectedDept.id,
                    engineId: vm.currEngine.idFireEngine,
                    toStateId: newState.id
                };
                ws.$emit('changeState', command);
            }
            vm.closeStatuseChangeDialogue();
        };


        /*
         vm.onChangeState = function(newState){
         if(angular.isDefined(vm.selectedDept) && angular.isDefined(vm.currEngine)){
         // if(newState.name != 'ВП'){
         var command = {
         deptId: vm.selectedDept.id,
         engineId: vm.currEngine.idFireEngine,
         isFirstTank: vm.currEngine.isFirstTank,
         toStateId: newState.id
         };
         ws.$emit('changeState', command);
         /!*
         } else {
         vm.currEngine.fireEngineState = newState;
         }
         *!/
         }
         vm.closeStatuseChangeDialogue();
         };
         */


        vm.stateChangeDialogue = function(event, engine){
            /*
             if(engine === vm.currEngine){

             vm.currEngine = undefined;
             vm.showStatusList = false;
             */
            // } else {


            vm.currEngine = engine;
            vm.position.top = event.clientY - 200;
            vm.position.left = event.clientX + 45;
            /*
             vm.possibleRelocations = _.filter(vm.selectedDept.fireEngines, function(eng){

             if(engine.replacementFireEngineId){

             return eng.idFireEngine != engine.idFireEngine && vm.getStateFromStatus(vm.findEngineInCaraul(vm.currentCaraul, eng).fireEngineStatus).name !== 'ВП' && eng.fireEngineId !== engine.replacementFireEngineId;
             } else {



             // console.log('getStateFromStatus > ', vm.getStateFromStatus(vm.findEngineInCaraul(vm.currentCaraul, eng).fireEngineStatus));


             return eng.idFireEngine != engine.idFireEngine && vm.findEngineInCaraul(vm.currentCaraul, eng).fireEngineStatus.name !== 'ВП';

             }
             });
             vm.showReplacementList = false
             */
            vm.getPossibleStates(engine);
            vm.showStateList = true;
            $timeout(function(){
                $('#codeInput').focus();
            }, 100);
            // }
        };

        /*

         vm.onChangeStatus = function(newStatus){
         if(!!newStatus === true){

         vm.selectedDept.caraulCrews.find(function(crew){
         if(crew.idCaraul === vm.currentCaraul.idCaraul){
         return crew.caraulEngines.find(function(eng){
         if(eng.idFireEngine === vm.currEngine.idFireEngine){
         eng.caraulEngine.fireEngineState = Object.assign({}, newStatus);
         return vm.selectedDept.fireEngines.find(function(sEng){
         if(sEng.idFireEngine === eng.idFireEngine){
         sEng.fireEngineState = Object.assign({}, newStatus);
         }
         /!*
         console.log('newStatus >>>', newStatus);
         console.log('eng >>>', eng);
         console.log('sEng >>>', sEng);
         *!/
         });
         }
         });
         }
         });
         }
         vm.showStatusList = false;
         };
         */


        vm.showStatuseChangeDialogue = function(event, engine){
            if(engine === vm.currEngine){
                vm.currEngine = undefined;
                vm.showStatusesList = false;
            } else {
                vm.currEngine = engine;
                vm.position.top = event.clientY - 200;
                vm.position.left = event.clientX + 45;


                vm.possibleRelocations = _.filter(vm.selectedDept.fireEngines, function(eng){

                    if(engine.replacementFireEngineId){

                        return eng.idFireEngine != engine.idFireEngine && vm.getStateFromStatus(vm.findEngineInCaraul(vm.currentCaraul, eng).fireEngineStatus).name !== 'ВП' && eng.fireEngineId !== engine.replacementFireEngineId;
                    } else {



                        // console.log('getStateFromStatus > ', vm.getStateFromStatus(vm.findEngineInCaraul(vm.currentCaraul, eng).fireEngineStatus));


                        return eng.idFireEngine != engine.idFireEngine && vm.findEngineInCaraul(vm.currentCaraul, eng).fireEngineStatus.name !== 'ВП';

                    }
                });
                vm.getPossibleStatuses(engine);
                vm.showStatusesList = true;
                vm.showReplacementList = false
                $timeout(function(){
                    $('#codeInput').focus();
                }, 100);
            }
        };


        vm.onChangeStatuseForRelocated = function(newStatus){
            // console.log(vm.selectedDeptDislocatedList);


            if(vm.currRelocatedEngine){


                var i = 0,
                    l = vm.selectedDeptDislocatedList.length;
                // console.log('vm.selectedDeptDislocatedList >', vm.selectedDeptDislocatedList);
                if(l > 0){


                    while(i < l){
                        if(vm.selectedDeptDislocatedList[i].engine.idFireEngine === vm.currRelocatedEngine.idFireEngine){

                            vm.selectedDeptDislocatedList[i].engine.fireEngineState.id = newStatus.stateId;
                            vm.selectedDeptDislocatedList[i].engine.fireEngineState.name = newStatus.name;
                            vm.selectedDeptDislocatedList[i].engine.fireEngineState.shortDescription = newStatus.shortDescription;
                            vm.selectedDeptDislocatedList[i].engine.fireEngineState.code = newStatus.code;

                            i = l;
                        }

                        i++;
                    }


                }
                // console.log(vm.selectedDeptDislocatedList);
                // console.log(newStatus);
                /*
                 console.log(vm.currRelocatedEngine);
                 */


            }

            /*
             if(angular.isDefined(vm.currRelocatedEngine)){
             var engineInCaraul = vm.findEngineInCaraul(vm.currentCaraul, vm.currEngine);
             engineInCaraul.fireEngineStatus = newStatus;
             engineInCaraul.replacementFireEngineId = '';
             if(newStatus.name === 'РЕЗЕРВ'){
             engineInCaraul.additionalSmokeProtectionCrewCount = 0;
             engineInCaraul.smokeProtectionCrewCount = 0;
             engineInCaraul.baseCrewCount = 0;
             //vm.currEngine.foamerCount = 0;
             }
             }
             */


            vm.closeStatuseChangeDialogue();
        };


        vm.showStatuseChangeDialogueForRelocated = function(event, engine){

            if(engine.engine === vm.currRelocatedEngine){
                vm.currRelocatedEngine = undefined;
                vm.showStatusesListForRelocated = false;
            } else {
                vm.position.top = event.clientY - 200;
                vm.position.left = event.clientX + 45;
                vm.currRelocatedEngine = engine.engine;
                vm.showStatusesList = false;
                vm.showStatusesListForRelocated = true;
                vm.showReplacementList = false;
                vm.possibleStatuses = jQuery.extend([], storage.statuses);
                _.each(vm.possibleStatuses, function(status){
                    status.code = vm.codeFind(status);
                });
                $timeout(function(){
                    $('#codeRelocatedInput').focus();
                }, 100);


            }

            /*            vm.possibleStatuses = jQuery.extend([], storage.statuses);
             vm.currEngine = [];
             engine.forEach(function(eng){
             vm.currEngine.push(eng.engine);
             });


             _.each(vm.possibleStatuses, function(status){
             status.code = vm.codeFind(status);
             });

             */

            /*
             var clonedStatuses = jQuery.extend([], storage.statuses);
             if(storage.isRoot){
             vm.possibleStatuses = clonedStatuses;
             } else {
             */


            /*
             console.log('-----------Before--------->');
             console.log(engine);
             console.log('---------------------');
             console.log(dept);
             console.log('--------------------<');

             dept.fireEngines = [];
             engine.forEach(function(eng){
             dept.fireEngines.push(eng.engine);
             });

             console.log('-----------After--------->');
             console.log(engine);
             console.log('---------------------');
             console.log(dept);
             console.log('--------------------<');
             */
        };


        /*
         vm.getDeptByEngine = function(engine){
         // console.log('engine > ', engine);

         return {
         id: engine.locationDeptId ? engine.locationDeptId : null,
         name: engine.locationDeptName ? engine.locationDeptName : null
         };

         };
         */


        vm.showDislocationChangeDialogue = function(event, engine, dislocatedEngineDept){

            if(engine === vm.currEngine){
                vm.currEngine = undefined;
                vm.dislocatedDept = undefined;
                vm.showDislocationList = false;
            } else {
                vm.currEngine = engine;
                vm.position.top = event.clientY - 200;
                vm.position.left = event.clientX + 45;
                vm.getPossibleDislocations(engine);
                vm.showDislocationList = true;
                vm.showStatusesList = false;
                vm.showReplacementList = false;
                vm.dislocatedDept = undefined;
                if(dislocatedEngineDept != undefined){
                    vm.dislocatedDept = dislocatedEngineDept;
                }
            }
        };
        vm.closeStatuseChangeDialogue = function(){
            vm.currEngine = undefined;
            vm.currRelocatedEngine = undefined;
            vm.showStatusesList = false;
            vm.showStatusList = false;
            vm.showStatesList = false;
            vm.showStateList = false;
            vm.showStatusesListForRelocated = false;
            vm.currentFireEngine = undefined;
            vm.codeInput = '';
        };
        vm.closeDislocationChangeDialogue = function(){
            vm.currEngine = undefined;
            vm.showDislocationList = false;
            vm.currentFireEngine = undefined;
            vm.dislocatedDept = undefined;
            vm.longRelocation = false;
        };
        vm.showReplacementDialogue = function($event, engine, state){
            /*
             if(engine === vm.currEngine){
             vm.currEngine = undefined;
             vm.showReplacementList = false;
             vm.currentFireEngine = undefined;
             } else {
             */


            vm.currEngine = engine;
            vm.possibleRelocations = _.filter(vm.selectedDept.fireEngines, function(eng){
                // return (vm.getStateFromStatus(vm.findEngineInCaraul(vm.currentCaraul, eng).fireEngineStatus).canUseManualMode || vm.getStateFromStatus(vm.findEngineInCaraul(vm.currentCaraul, eng).fireEngineStatus).canUseAutomaticMode) && eng.idFireEngine != engine.idFireEngine && vm.findEngineInCaraul(vm.currentCaraul, eng).fireEngineStatus.name !== 'ВП';
                return eng.idFireEngine != engine.idFireEngine && vm.findEngineInCaraul(vm.currentCaraul, eng).fireEngineStatus.name !== 'ВП';
            });
            vm.position.top = $event.clientY - 200;
            vm.position.left = $event.clientX + 45;
            vm.showReplacementList = true;
            vm.showStateRepList = !!state;
            vm.showStatusesList = false;
            // }
        };
        vm.onChangeStatuse = function(newStatus){
            if(angular.isDefined(vm.selectedDept) && angular.isDefined(vm.currEngine)){
                var engineInCaraul = vm.findEngineInCaraul(vm.currentCaraul, vm.currEngine);
                engineInCaraul.fireEngineStatus = newStatus;
                engineInCaraul.replacementFireEngineId = '';
                if(newStatus.name === 'РЕЗЕРВ'){
                    engineInCaraul.additionalSmokeProtectionCrewCount = 0;
                    engineInCaraul.smokeProtectionCrewCount = 0;
                    engineInCaraul.baseCrewCount = 0;
                    //vm.currEngine.foamerCount = 0;
                }
            }
            vm.closeStatuseChangeDialogue();
        };


        vm.longRelocation = false;

        vm.onChangeDislocation = function(newDislocation){

            /*
             return {
             id: engine.locationDeptId ? engine.locationDeptId : null,
             name: engine.locationDeptName ? engine.locationDeptName : null
             };
             */


            if(angular.isDefined(vm.selectedDept) && angular.isDefined(vm.currEngine)){
                var command = {};
                /*
                 if(vm.currEngine.locationDeptId !== null){
                 vm.dislocatedDept.id = vm.currEngine.locationDeptId;
                 }
                 */
                // console.log('relocEngine >', vm.currEngine);
                if(vm.dislocatedDept == undefined){
                    command = {
                        deptId: vm.selectedDept.id,
                        engineId: vm.currEngine.idFireEngine,
                        toDeptId: newDislocation.id,
                        timeRelocation: ((!!vm.longRelocation === true)? new Date().getTime() : 0)
                    };
                } else {
                    command = {
                        deptId: vm.dislocatedDept.id,
                        engineId: vm.currEngine.idFireEngine,
                        toDeptId: newDislocation.id,
                        timeRelocation: ((!!vm.longRelocation === true)? new Date().getTime() : 0)
                    };
                }
                /*
                 console.log('vm.currEngine >', vm.currEngine);
                 console.log('vm.dislocatedDept >', vm.dislocatedDept);
                 console.log('vm.selectedDept >', vm.selectedDept);
                 console.log('command >', command);
                 */

                vm.dislocatedDept = undefined;
                ws.$emit('changeDislocationStart', command);
            }
            vm.closeDislocationChangeDialogue();
        };
        vm.completeDislocation = function(engine, dept){
            if(angular.isDefined(engine) && angular.isDefined(dept)){
                var command = {
                    deptId: dept.id,
                    engineId: engine.idFireEngine
                };
                ws.$emit('changeDislocationComplete', command);
            }
        };
        vm.getDislocation = function(fireEngine){
            if(fireEngine.locationDeptId != null){
                var dislocationDept = _.find(storage.fireDepartments, function(dept){
                    return dept.id === fireEngine.locationDeptId;
                });
                if(dislocationDept === undefined){
                    return '??'
                } else {
                    return dislocationDept.fireDeptName;
                }
            } else {

                return '◄';
                // return '-'
            }
        };



        vm.findEngineInCaraul = function(currentCaraul, engine){
            // console.log('engine >>>', engine);
            var engineInCrew = null;
            if(!engine.locationDeptId){
                // console.log('1');
                engineInCrew = currentCaraul.caraulEngines.find(function(eng){
                    // console.log('Engine >', eng.idFireEngine, '< >', engine.idFireEngine, eng.idFireEngine === engine.idFireEngine, engine.gosNo);
                    return eng.idFireEngine === engine.idFireEngine;
                });
                // engineInCrew = engineInCrew.caraulEngine;

            } else {
                if(!!engine.locationDeptId === false){
                    // console.log('2');
                    storage.fireDepartments.find(function(dept){
                        return dept.caraulCrews.find(function(cc){
                            return cc.caraulEngines.find(function(eng){
                                if(eng.idFireEngine === engine.idFireEngine){
                                    engineInCrew = eng.caraulEngine;
                                    return true;
                                } else {
                                    return false;
                                }

                            });
                        });
                    });
                } else {
                    // console.log('3');
                    // console.log('3', engine.gosNo, engine);
                    engineInCrew = findEngineInCaraulByDept(engine);

                }
            }
            // console.log('engineInCrew.caraulEngine >', engineInCrew, engineInCrew);
            //engineInCrew.caraulEngine.baseCrewCount
            /*
             if(!!engineInCrew.caraulEngine.locationDeptId === false || vm.selectedDept.id === engineInCrew.caraulEngine.locationDeptId){
             vm.totalBaseCrewCount[engineInCrew.idFireEngine] = {};
             vm.totalBaseCrewCount[engineInCrew.idFireEngine] = {count: engineInCrew.caraulEngine.baseCrewCount};
             }
             */

            if(!!engineInCrew === true && (!!engineInCrew.locationDeptId === false || vm.selectedDept.id === engineInCrew.locationDeptId)){
                vm.totalBaseCrewCount[engineInCrew.idFireEngine] = {};
                vm.totalBaseCrewCount[engineInCrew.idFireEngine] = {count: (engineInCrew.hasOwnProperty('caraulEngine'))? engineInCrew.caraulEngine.baseCrewCount : engineInCrew.baseCrewCount};
            }

            // console.log('vm.totalBaseCrewCount >', engineInCrew);
            // engine.fireEngineStatus = engineInCrew.caraulEngine.fireEngineStatus;

            return engineInCrew.caraulEngine;
        };


        vm.getCaraulBaseCrew = function(engine){
            return _.find(vm.currentCaraul.baseCrewCount, function(crewCount){
                return crewCount.key === engine.idFireEngine;
            });
        };


        vm.changeStatusWithReloc = function(relocEngine){
            if(angular.isDefined(vm.currEngine) && angular.isDefined(vm.selectedDept)){
                var engineInCaraul = vm.findEngineInCaraul(vm.currentCaraul, vm.currEngine);
                engineInCaraul.replacementFireEngineId = relocEngine.idFireEngine;
            }
            vm.showReplacementList = false;
            vm.showStateRepList = false;

        };


        vm.changeStateWithReloc = function(relocEngine){
            if(angular.isDefined(vm.currEngine) && angular.isDefined(vm.selectedDept)){
                var command = {
                    deptId: vm.selectedDept.id,
                    engineId: vm.currEngine.idFireEngine,
                    //fromStatusId: vm.currEngine.fireEngineState.id,
                    toStateId: vm.currEngine.fireEngineState.id,
                    relocationId: relocEngine.idFireEngine
                };
                ws.$emit('changeState', command);
            }
            vm.showReplacementList = false;
            vm.showStateRepList = false;
        };


        vm.getRelocationEngineById = function(fireEngine){
            if(vm.selectedDept !== undefined){
                var eng = _.find(vm.selectedDept.fireEngines, function(engine){
                    return fireEngine.replacementFireEngineId && engine.idFireEngine === fireEngine.replacementFireEngineId
                });
                if(angular.isDefined(eng)){
                    return eng.engineType.engineType + ' ' + eng.gosNo
                } else {
                    return 'С какой машины?'
                }
            }
        };
        vm.showPathFromPchToFire = function(selectedDept){
            var command = {};
            command.deptId = selectedDept.id;
            command.deptName = selectedDept.departmentName;
            command.engineType = '';
            command.fireActId = vm.selectedFire.id;
            command.ticket = $cookies.get('ticket');
            ws.$emit('showPathFromPchToFire', command);
        };

        vm.toChangeEngineState = function(dept){
            if(!!dept === true){
                vm.saveCaraul(false);
                $state.go('fires.chooseTech.bydept', {deptId: vm.selectedDept.id});
            }
        };




        vm.closeReplacementDialogue = function(){
            vm.showReplacementList = false;
            vm.showStateRepList = false;
        };

        vm.renewDislocatedListInDept = function(){
            if(vm.selectedDeptDislocatedList !== undefined && vm.selectedDeptDislocatedList instanceof Array && vm.selectedDeptDislocatedList.length > 0){
                var foundEngine = null;

                vm.selectedDeptDislocatedList.forEach(function(disEng){
                    vm.currentCaraul.caraulEngines.forEach(function(ccEng, idx){

                        if(ccEng.idFireEngine === disEng.engine.idFireEngine){


                            foundEngine = vm.findEngineInCaraul(vm.currentCaraul, disEng.engine);
                            if(!!foundEngine !== false){
                                vm.currentCaraul.caraulEngines[idx].caraulEngine.baseCrewCount = foundEngine.baseCrewCount;
                                vm.currentCaraul.caraulEngines[idx].caraulEngine.smokeProtectionCrewCount = foundEngine.smokeProtectionCrewCount;
                                vm.currentCaraul.caraulEngines[idx].caraulEngine.additionalSmokeProtectionCrewCount = foundEngine.additionalSmokeProtectionCrewCount;
                                vm.foamerOnEngines.find(function(foEng, idx){

                                    if(foEng.idFireEngine === disEng.engine.idFireEngine){
                                        vm.foamerOnEngines[idx].foamerCount = vm.getFoamOnEngine(disEng.engine).foamerCount;
                                    }

                                });
                            }
                        }

                    });
                });
            }
        };


        vm.currEngine = undefined;
        vm.currentFireEngine = undefined;
        vm.showStatesList = false;
        vm.position = {
            top: 0,
            left: 0
        };
        vm.possibleRelocations = null;
        vm.possibleStates = undefined;
        vm.showReplacementListLostEng = false;
        vm.codeInputLostEng = '';

        vm.showStateChangeDialogue = function(event, engine){
            if(engine === vm.currEngine){
                vm.currEngine = undefined;
                vm.showStatesList = false;
            } else {
                vm.currEngine = engine;
                vm.position.top = event.clientY - 200;
                vm.position.left = event.clientX + 45;
                vm.possibleRelocations = _.filter(vm.selectedDept.fireEngines, function(eng){
                    if(engine.replacementFireEngineId){
                        return eng.idFireEngine != engine.idFireEngine && eng.fireEngineState.name !== 'ВП' && eng.fireEngineId !== engine.replacementFireEngineId;
                    } else {
                        return eng.idFireEngine != engine.idFireEngine && eng.fireEngineState.name !== 'ВП';
                    }
                });
                vm.getPossibleStates(engine);
                vm.showStatesList = true;
                vm.showReplacementList = false
                vm.showStateRepList = false;
                $timeout(function(){
                    $('#codeInput').focus();
                }, 100);
            }
        };

        vm.showLostEngReplacementDialogue = function($event, engine){
            if(engine === vm.currEngine){
                vm.currEngine = undefined;
                vm.showReplacementListLostEng = false;
                vm.currentFireEngine = undefined;
            } else {
                vm.currEngine = engine;
                vm.possibleRelocations = _.filter(vm.selectedDept.fireEngines, function(eng){
                    return eng.idFireEngine != engine.idFireEngine && eng.fireEngineState.name !== 'ВП' && eng.idFireEngine != engine.replacementFireEngineId;
                });
                vm.position.top = $event.clientY - 200;
                vm.position.left = $event.clientX + 45;
                vm.showReplacementListLostEng = true;
                vm.showStatesList = false;
            }
        };

        vm.closeLostEngReplacementDialogue = function(){
            vm.showReplacementListLostEng = false;
        };

        vm.closeLostEngStatuseChangeDialogue = function(){
            vm.currEngine = undefined;
            vm.showStatesList = false;
            vm.currentFireEngine = undefined;
            vm.codeInputLostEng = '';
        };


        vm.onChangeStatuseLostEngine = function(newState){
            if(angular.isDefined(vm.selectedDept) && angular.isDefined(vm.currEngine)){
                if(!!vm.currEngine.locationToDeptId === true){
                    var command = {
                        deptId: vm.currEngine.locationToDeptId,
                        engineId: vm.currEngine.idFireEngine,
                        isFirstTank: vm.currEngine.isFirstTank,
                        toStateId: newState.id,
                        engine: vm.currEngine
                    };
                    ws.$emit('changeState', command);
                }
            }
            vm.closeLostEngStatuseChangeDialogue();
        };


        vm.selectLostEngTypedCodeItem = function(event){
            if(event.which == 13){
                var element = $('.typedCodef6');
                if(element.length !== 0){
                    var solution = _.find(storage.states, function(solution){
                        return solution.code == vm.codeInputLostEng;
                    });
                    if(solution != undefined){
                        vm.onChangeStatuseLostEngine(solution);
                    }
                } else {
                    growl.warning('Нет элемента с таким КОДОМ')
                }
            }

        };

        vm.codeCorrectLostEngine = function(state){
            return state.code == parseInt(vm.codeInputLostEng);
        };


        vm.showEnteredCodeList = function(state){
            // return (!isNaN(parseInt(vm.codeInputLostEng, 10)) && state.code != parseInt(vm.codeInputLostEng, 10))
            return (vm.codeInputLostEng.length > 0 && !state.code.toString().includes(vm.codeInputLostEng));
        };


        vm.getPossibleStates = function(engine){
            var clonedStates = jQuery.extend([], storage.states);
            vm.possibleStates = clonedStates;
        };


        vm.codeFilterLostEng = function(item){
            if(vm.codeInput != ''){
                var str = item.code.toString();
                return str.includes(vm.codeInput);
            }
            else {
                return true;
            }
        };


        /*
         vm.codeCorrect = function(state){
         return state.code == parseInt(vm.codeInput);
         };
         */


        /*
         vm.getRelocationEngineById = function(fireEngine){
         var eng = _.find(vm.selectedDept.fireEngines, function(engine){
         return fireEngine.replacementFireEngineId && engine.idFireEngine === fireEngine.replacementFireEngineId
         });
         if(angular.isDefined(eng)){
         return eng.engineType.engineType + ' ' + eng.gosNo
         } else {
         return 'С какой машины?'
         }
         };
         */


        /*
         vm.replaceToOrder = function(engine){
         storage.selectedFire = _.find(storage.activeFires, function(fireAct){
         return fireAct.id === engine.fireEngineState.ob.id;
         });
         ws.$emit('selectFire', {fireActId: engine.fireEngineState.ob.id, ticket: $cookies.get('ticket')});
         $state.go('fires.order', {
         deptId: undefined,
         engineId: undefined,
         fireId: engine.fireEngineState.ob.id
         }, {location: true});
         };
         */

        /*
         vm.findActiveFire = function(engine){
         var ob = undefined;
         if((engine.fireEngineState.name === 'СЛЕДУЕТ' || engine.fireEngineState.name === 'НА ПОЖАРЕ') && angular.isDefined(vm.storage.activeFires)){
         _.each(vm.storage.activeFires, function(act){
         _.each(act.orders, function(o){
         if(o.fireEngine.idFireEngine === engine.idFireEngine){
         ob = {num: act.numFireAct, id: act.id};
         engine.fireEngineState.ob = ob;
         }
         });
         });
         }
         return ob;
         };
         */

        /*
         vm.completeDislocation = function(engine, dept){
         if(angular.isDefined(engine) && angular.isDefined(dept)){
         var command = {
         deptId: dept.id,
         engineId: engine.idFireEngine
         };
         ws.$emit('changeDislocationComplete', command);
         }
         };
         */


        vm.saveLostTechnique = function(){

            /*
             console.clear();

             console.log('deptDislocatedEngineList >', vm.deptDislocatedEngineList);
             console.log('vm.currentCaraul >', vm.currentCaraul);

             var inCaraul = null;


             vm.deptDislocatedEngineList.forEach(function(eng, idx){
             // console.log(idx, 'findEngineInCaraul >', vm.findEngineInCaraul(vm.currentCaraul, eng.engine));
             // console.log(idx, 'getFoamOnEngine >', vm.getFoamOnEngine(eng.engine));

             inCaraul = vm.findEngineInCaraul(vm.currentCaraul, eng.engine);


             /!*
             console.log(idx, '>', eng.engine.gosNo, eng.engine.foamerCount);
             console.log(idx, '>', eng.engine);
             console.log(idx, 'inCaraul >', inCaraul);
             *!/

             // engFoam = vm.getFoamOnEngine(eng.engine);

             if(!!inCaraul === true){

             vm.storage.fireDepartments.find(function(dept){
             if(dept.id === eng.currentDislocation.id){
             // console.log('dept >>>>>>>>>', dept);
             }
             });

             // inCaraul.smokeProtectionCrewCount = eng.engine.smokeProtectionCrewCount;
             // inCaraul.baseCrewCount = eng.engine.smokeProtectionCrewCount;
             }


             // console.log(idx, '>', vm.findEngineInCaraul(vm.currentCaraul, eng));
             });
             */
            /*
             console.clear();
             console.log('selDept >>>>>', vm.selectedDept);
             console.log('currentCaraul >>>>>', vm.currentCaraul);
             */
        };


        /*

         vm.saveCaraul = function(transition, update){

         if(!!vm.currentCaraul == true){

         vm.saveLostTechnique();

         vm.renewDislocatedListInDept();


         _.each(vm.currentCaraul.caraulEngines, function(engine){
         if(!engine.smokeProtectionCrewCount){
         engine.smokeProtectionCrewCount = 0;
         }
         if(!engine.baseCrewCount){
         engine.baseCrewCount = 0;
         }
         if(!engine.additionalSmokeProtectionCrewCount){
         engine.additionalSmokeProtectionCrewCount = 0;
         }
         });


         /!*
         _.each(vm.foamerOnEngines, function(foam){
         if(!angular.isNumber(foam.foamerCount)){
         foam.foamerCount = 0;
         }
         });
         *!/
         _.each(vm.foamerOnEngines, function(foam){
         if(isNaN(parseInt(foam.foamerCount, 10))){
         foam.foamerCount = 0;
         }
         });
         if(!angular.isNumber(vm.selectedDept.foamOnStock)){
         vm.selectedDept.foamOnStock = parseInt(vm.selectedDept.foamOnStock);
         if(isNaN(vm.selectedDept.foamOnStock)){
         vm.selectedDept.foamOnStock = 0;
         }
         }


         var nonClosedCarauls = vm.storage.fireDepartments.length;
         vm.storage.fireDepartments.forEach(
         function(dept){

         if(!vm.isDeptNeedToSaveCaraul(dept)){
         --nonClosedCarauls;
         }


         }
         );


         // bydept.selectedDept.fireEngines
         /!*
         vm.currentCaraul.caraulEngines.forEach(function(cEng){

         vm.selectedDeptDislocatedList.find(function(dEng){
         if(cEng.idFireEngine === dEng.engine.idFireEngine){
         cEng.caraulEngine.foamerCount = dEng.engine.foamerCount;
         return true;
         }

         });

         });
         *!/

         // vm.currentCaraul.leaveEngines = [];
         /!*
         vm.selectedDeptDislocatedList.forEach(function(eng){
         vm.currentCaraul.leaveEngines.foamerCount = eng.engine.foamerCount;
         });
         *!/


         /!*
         console.log('1 +>>>', vm.storage.fireDepartments);
         console.log('2 >>>', vm.currentCaraul);
         console.log('3 +>>>', vm.selectedDept);
         *!/


         /!*
         vm.foamerOnEngines.forEach(function(foam){
         foam.foamerCount = 555;
         });
         console.log('44 >>>', vm.foamerOnEngines);
         *!/


         /!*
         vm.foamerOnEngines.forEach(function(foamEng){
         vm.selectedDept.caraulCrews.find(function(cCrew){
         if(cCrew.caraulNum === vm.currentCaraul.caraulNum){
         return cCrew.caraulEngines.find(function(cEng){
         if(cEng.caraulEngine.idFireEngine === foamEng.idFireEngine){
         foamEng.foamerCount = cEng.caraulEngine.foamerCount;
         return true;
         }
         });
         }
         });

         });
         *!/


         vm.foamerOnEngines.forEach(function(fEng){
         return vm.currentCaraul.caraulEngines.find(function(cEng){
         if(cEng.idFireEngine === fEng.idFireEngine){
         cEng.caraulEngine.foamerCount = fEng.foamerCount;
         return true;
         }
         });

         });

         /!*
         console.log('1 ----->', storage.fireDepartments);
         console.log('2 ----->', vm.selectedDept);
         console.log('3 ----->', vm.currentCaraul);
         console.log('4 ----->', vm.foamerOnEngines);
         *!/

         /!*
         console.log('1 >>>', vm.selectedDeptDislocatedList);
         console.log('2 >>>', vm.currentCaraul);
         *!/


         /!*
         vm.selectedDeptDislocatedList.forEach(function(disEng){
         vm.currentCaraul.caraulEngines.find(function(eng, idx){
         if(eng.caraulEngine.idFireEngine === disEng.engine.idFireEngine){
         vm.currentCaraul.caraulEngines[idx].caraulEngine.fireEngineState = Object.assign({}, disEng.engine.fireEngineState);
         console.log('3 >>>', vm.currentCaraul.caraulEngines[idx]);
         }
         });
         //= Object.assign({}, disloc.engine.fireEngineState);
         });
         *!/
         var command = {
         depts: [
         vm.selectedDept
         ],
         nonClosedCarauls: nonClosedCarauls,
         target: (!!update === true)? 'update' : 'caraul'
         };


         var allDislocatedDepts = {};

         vm.currentCaraul.leaveEngines.forEach(function(eng){
         if(!!eng.caraulEngine.locationToDeptId === true){
         return storage.fireDepartments.find(function(dept){
         if(dept.id === eng.caraulEngine.locationToDeptId){
         allDislocatedDepts[dept.id] = Object.assign({}, dept);
         return allDislocatedDepts[dept.id].caraulCrews.forEach(function(cCrew, idxx){
         return cCrew.caraulEngines.find(function(cEng, idx){
         if(cEng.idFireEngine === eng.idFireEngine){
         allDislocatedDepts[dept.id].caraulCrews[idxx].caraulEngines[idx] = Object.assign({}, eng);
         // console.log('cEng ......>', cEng);
         return true;
         }
         });
         });
         }
         })
         }
         // console.log('vm.selectedDept', vm.selectedDept);
         });

         for(var i in allDislocatedDepts){
         if(allDislocatedDepts.hasOwnProperty(i)){
         command.depts.push(allDislocatedDepts[i]);
         }
         }


         // allDislocatedDepts = Object.values(allDislocatedDepts);
         // command.depts.concat(allDislocatedDepts);
         /!*
         console.log('command 2>', command);
         console.log('allDislocatedDepts 1>', allDislocatedDepts);
         console.log('allDislocatedDepts 2>', Object.values(allDislocatedDepts));
         *!/


         if(!!transition === true){
         command.mode = transition;
         }


         command.depts.find(function(dept){
         if(dept.deptId === vm.selectedDept.deptId){
         return dept.caraulCrews.find(function(crew, idx){
         if(crew.idCaraul === vm.currentCaraul.idCaraul){
         dept.caraulCrews[idx] = Object.assign({}, vm.currentCaraul);
         }
         });
         }
         });



         // for(var i = 0; i < 1000; i++){
         ws.$emit('updateDepartments', command);
         // }


         allDislocatedDepts = {};

         /!*-------------------------------------------- Нужное место
         var command = {
         deptId: vm.selectedDept.id,
         caraul: vm.currentCaraul,
         foamerOnEngines: vm.foamerOnEngines,
         foamOnStock: vm.selectedDept.foamOnStock,
         nonClosedCarauls: nonClosedCarauls
         };
         if(transition !== undefined && transition === false){
         command.mode = transition;
         }

         ws.$emit('saveCaraul', command);


         //-------------------------------------------- *!/


         /!*            vm.selectedDeptDislocatedList.forEach(
         function(element){

         if(element.stateId !== element.engine.fireEngineState.id){

         // console.log(vm.selectedDept);
         ws.$emit('changeState', {
         // deptId: element.dept.id,
         deptId: vm.selectedDept.id,
         engineId: element.engine.idFireEngine,
         isFirstTank: element.engine.isFirstTank,
         newStateName: element.engine.fireEngineState.name,
         toStateId: element.engine.fireEngineState.id
         }
         );


         element.stateId = element.engine.fireEngineState.id;

         }

         }
         );*!/


         //TODO: раскоментировать если не будет иного перехода после этой функции
         // vm.selectDept(vm.selectedDept);


         // vm.lostTechnique();
         }
         };





         //debug only function
         vm.saveAllCarauls = function(){
         _.each(storage.fireDepartments, function(dept){
         var currentCaraul = _.find(dept.caraulCrews, function(caraul){
         return caraul.caraulNum === storage.globalSettings.currentCaraul;
         });
         var command = {
         deptId: dept.id,
         caraul: currentCaraul,
         foamOnStock: dept.foamOnStock
         };
         ws.$emit('saveCaraul', command);
         })
         };
         //debug only function
         */




        vm.changeGlobalCaraul = function(){
            ws.$emit('tmpChangeCaraul', '');
        };

        vm.addToFire = function(engine){
            if(angular.isDefined(vm.selectedFire) && angular.isDefined(vm.selectedDept)){
                var command = {
                    deptId: vm.selectedDept.id,
                    engineId: engine.idFireEngine,
                    fireActId: vm.selectedFire.id
                };
                ws.$emit('addEngineToFireManually', command);
            }
        };

        $scope.onDrop = function(data, event, fireEngine){
            // console.log('vm.selectedDept >', vm.selectedDept);
            var fEng = (!!fireEngine === true && fireEngine.hasOwnProperty('idFireEngine'))? fireEngine.idFireEngine : null;
            if(angular.isDefined(vm.selectedDept)){
                var equip = data['json/custom-object'];
                var command = {
                    deptId: vm.selectedDept.id,
                    engineId: fEng,
                    equipId: equip.id
                    // equipId: equip.idFireEquipment
                };
                ws.$emit('addEquipToFireEngine', command);
            }
        };

        $scope.onDragOver = function(event){
        };

        vm.removeEqFromEngine = function(fireEngine, eq){
            var fEng = (!!fireEngine === true && fireEngine.hasOwnProperty('idFireEngine'))? fireEngine.idFireEngine : null;
            var command = {
                deptId: vm.selectedDept.id,
                engineId: fEng,
                equipId: (eq.eqType.id !== eq.idFireEquipment)? eq.idFireEquipment : eq.eqType.id
                // equipId: eq.idFireEquipment
            };
            ws.$emit('removeEquipFromFireEngine', command);
        };

        vm.changeToByTypes = function(engineType){
            if(angular.isDefined(vm.selectedFire)){
                $state.go('fires.chooseTech.bytypes', {
                    deptId: undefined,
                    fireType: engineType,
                    fireId: vm.selectedFire.id
                }, {location: true});
            } else {
                $state.go('fires.chooseTech.bytypes', {deptId: undefined, fireType: engineType}, {location: true});
            }

        };
        vm.replaceToOrder = function(engine){
            storage.selectedFire = _.find(storage.activeFires, function(fireAct){
                return fireAct.id === engine.fireEngineState.ob.id;
            });
            ws.$emit('selectFire', {fireActId: engine.fireEngineState.ob.id, ticket: $cookies.get('ticket')});
            $state.go('fires.order', {
                deptId: undefined,
                engineId: undefined,
                fireId: engine.fireEngineState.ob.id
            }, {location: true});
        };


        vm.findActiveFire = function(engine){
            var ob = undefined;
            if(!!engine.fireEngineState === true && !!engine.fireEngineState.name === true && (engine.fireEngineState.name === 'СЛЕДУЕТ' || engine.fireEngineState.name === 'ПРИБЫЛА') && angular.isDefined(vm.storage.activeFires)){
                _.each(vm.storage.activeFires, function(act){
                    _.each(act.orders, function(o){
                        if(o.fireEngine.idFireEngine === engine.idFireEngine){
                            ob = {num: act.numFireAct, id: act.id};
                            engine.fireEngineState.ob = ob;
                        }
                    });
                });
            }
            return ob;
        };

        vm.showPO = function(fireEngine){
            if(fireEngine.engineType){
                return fireEngine.engineType.isPO;
            }
        };
        vm.showGD = function(fireEngine){
            if(!!fireEngine === true && fireEngine.hasOwnProperty('engineType')){
                return fireEngine.engineType.isGD;
            }
        };
        vm.showGDZS = function(fireEngine){
            if(fireEngine.engineType){
                return fireEngine.engineType.isGDZS;
            }
        };
        vm.changeRepairState = function(eq){
            var message = {
                eq: eq,
                deptId: vm.selectedDept.id
            };
            message.eq.isRepair = !eq.isRepair;
            ws.$emit('byDeptChangeEqRepairState', message);
        };
        vm.moveToDeptFrom = function(id){
            var deptId = undefined;
            var fireId = $state.params.fireId;
            if($state.params.deptId !== id){
                deptId = id;
                vm.initializeCurrentDeptAndCaraul(deptId);
            } else {
                vm.selectedDept = undefined;
                vm.currentCaraul = undefined;
                vm.aso = undefined;
            }
            $state.transitionTo($state.current, {
                deptId: deptId,
                fireId: fireId
            }, {notify: false});
        };
        vm.showToggleIsFirstTankButton = function(engine){
            var caraulEngine = vm.findEngineInCaraul(vm.currentCaraul, engine);
            var isEngineAC = engine.engineType.isAC;
            var isACFirst = caraulEngine.isFirstTank;
            return isEngineAC && !isACFirst;
        };

        vm.toggleisFirstTank = function(caraul, engineInCaraul){
            var newStateOfFirst = !engineInCaraul.isFirstTank;
            if(newStateOfFirst){
                _.each(caraul.caraulEngines, function(eng){
                    eng.caraulEngine.isFirstTank = false;
                })
            }
            engineInCaraul.isFirstTank = newStateOfFirst;
        };
        vm.toggleGD = function(engineInCaraul){
            engineInCaraul.asGD = !engineInCaraul.asGD;
        };
        vm.clearZeroNum = function(event){
            var value = event.target.value;
            if(value == '0'){
                event.target.value = null;
            } else {
                event.target.value = event.target.value.replace(/D/g, '');
            }

        };
        vm.printDeptEditorName = function(dept){
            if(dept != undefined){
                var lastCaraul = _.find(dept.caraulCrews, function(caraul){
                    return caraul.caraulNum === storage.globalSettings.currentCaraul;
                });
                if(vm.isDeptInEdit(dept)){
                    return vm.isDeptInEdit(dept);
                } else {
                    if(lastCaraul !== undefined && lastCaraul.lastEditUser != undefined){
                        return lastCaraul.lastEditUser.lastName;
                    } else {
                        return ''
                    }
                }

            }
        };
        vm.isDeptInEdit = function(dept){
            if(dept != undefined){
                var deptInEdit = _.find(storage.listOfLocks, function(deptInEdit){
                    return deptInEdit.document == dept.id + ':dept';
                });
                if(deptInEdit != undefined){
                    return deptInEdit.fireUser.lastName;
                }
            }
        };
        vm.setIconColor = function(color){
            var trueColor = '';
            if(color != ''){
                trueColor = color
            } else {
                trueColor = 'black';
            }
            return {color: trueColor};
        };
        vm.codeFind = function(status){
            if(status != undefined){
                var state = _.find(storage.states, function(state){
                    return state.id == status.stateId;
                });
                if(state){
                    return state.code;
                } else {
                    return '';
                }
            }
        };
        vm.codeCorrect = function(status){
            return vm.codeFind(status) == parseInt(vm.codeInput);
        };
        vm.codeFilter = function(item){
            if(vm.codeInput != ''){
                var str = vm.codeFind(item).toString();
                return str.includes(vm.codeInput);
            }
            else {
                return true
            }
        };

        vm.selectTypedCodeItem = function(event){
            if(event.which == 13){
                var element = $('.typedCodeF6');
                if(element.length !== 0){
                    var solution = _.find(storage.statuses, function(status){
                        return vm.codeFind(status) == vm.codeInput;
                    });
                    if(solution != undefined){
                        vm.onChangeStatuse(solution);
                    }
                } else {
                    growl.warning('Нет элемента с таким КОДОМ')
                }
            }

        };
        /*
         var updateDeptsLockState = $interval(function () {
         refreshLocks()
         }, 10000);
         */

        var relockDept = $interval(function(){
            if(vm.selectedDept != undefined){
                ws.$emit('relockDocument', vm.selectedDept.id + ':dept');
            }
        }, 10000);


        vm.countSummOfLeaved = function(caraul){
            if(caraul != undefined){
                return caraul.illCrewCount + caraul.restCrewCount + caraul.detachedCrewCount + caraul.freeCrewCount;
            }
        };


        vm.downloadFireEngine = function(fireEngine){
            $http.defaults.withCredentials = true;

            // console.log(fireEngine);
            var url = HTTPURLDesktop + '/rest/hqboard/squad.zip';
            // var ticket = $cookies.get('ticket');
            var conf = {
                params: {
                    dept: vm.selectedDept.id,
                    eng: fireEngine.idFireEngine
                },
                headers: {
                    'TOKEN': vm.storage.socketStatus.socketId
                    // 'TOKEN': ticket
                },
                responseType: 'arraybuffer'
            };
            $http.get(url, conf)
                .then(
                    function(response){
                        console.log(response);
                        var data = new Blob([response.data], {type: 'application/zip'});
                        FileSaver.saveAs(data, 'squad.zip');
                    },
                    function(e){
                        console.log('Download error: ', e)
                    });
        };


        ws.$on('changeState', function(message){
            /*
             if(!$state.is('fires.deptsNote.bydept')){
             console.log('111>>>>>>>>>>>', $state, message);
             }
             */
            /*
             if(vm.storage.clientSettings.oldSelectedDept !== vm.selectedDept){
             console.log('>>>>>>>>>>>', $state.current);
             vm.saveCaraul(false, true);
             vm.storage.clientSettings.oldSelectedDept = vm.selectedDept;
             }
             */
        });


        /*$scope.$on('$destroy', function(){
         if(!$state.is('fires.deptsNote.bydept')){
         vm.saveCaraul(false, true);
         }


         if(vm.selectedDept != undefined){
         ws.$emit('unlockDocument', vm.selectedDept.id + ':dept');
         }
         storage.controllers.bydept = null;
         $interval.cancel(relockDept);
         relockDept = undefined;
         // $interval.cancel(updateDeptsLockState);
         // updateDeptsLockState = undefined;
         /!*
         if(vm.storage.hasOwnProperty('fireDepartmentsArchive')){
         delete(vm.storage.fireDepartmentsArchive);
         }
         *!/
         /!*
         if(vm.selectedDept != undefined){
         ws.$emit('unlockDocument', vm.selectedDept.id + ':dept');
         }
         *!/
         // vm.;storage.fireDepartmentsArchive = undefined;
         delete(vm.storage.fireDepartmentsArchive);
         vm.selectedDept = undefined;
         vm.currentCaraul = undefined;

         if(!$state.is('fires.deptsNote.bydept')){
         ws.$emit('getDepts', null);
         }

         });*/

        // vm.initializeOnLoad();










//TODO: ---------------------------    Новая версия строёвки    ---------------------------




        vm.selectedDept = undefined;
        vm.deptsTree = {};
        vm.currentCaraul = undefined;
        vm.applyFieldsStructure = {
            staff_list: {
                model: 'staff_list',
                dict: [
                    {
                        path: 'bydepts.storage.chsDict.occupList',
                        field: 'value'
                    },
                    {
                        path: 'bydepts.storage.chsDict.ranksList',
                        field: 'value'
                    },
                    {
                        path: 'bydepts.storage.chsDict.chsTypes',
                        field: 'value'
                    }
                ]
            },
            strength: {
                model: 'strength',
                dict: [
                    {
                        path: 'bydepts.storage.chsDict.occupList',
                        field: 'value'
                    },
                    {
                        path: 'bydepts.storage.chsDict.ranksList',
                        field: 'value'
                    },
                    {
                        path: 'bydepts.storage.chsDict.chsTypes',
                        field: 'value'
                    }
                ]
            }

        };
        vm.emptySummaryTable = {
            totalCrewCount: 0, //По штату
            atListCrewCount: 0, //По Списку
            byFaceCrewCount: 0, //На лицо
            countBR: 0, //В БР
            countGone: 0, //Отсутст
            illCrewCount: 0, //Больничн
            restCrewCount: 0, //Отпуск
            detachedCrewCount: 0, //Ком-ка
            freeCrewCount: 0, //Отгул
            strengthening: 0, //Усиление
            'АСМ-Л': 0, // АСМ-Л
            'АСМ-С': 0, // АСМ-С
            'АСМ-СВ': 0, // АСМ-СВ
            'АСМ-Т': 0, // АСМ-Т
            'АСМ-РХБЗ': 0 // АСМ-РХБЗ
            // lastName: 0 //Польз. caraul.lastEditUser.lastName
        };


        vm.peopleListEmpty = {
            staff_list: [],
            strength: [],
            upper: [],
            self: [],
            lower: []
        };



        // vm.currentCaraul.peopleList = null;









        vm.summaryTable = {};








        vm.showIt = function(){

            console.log('vm.selectedDept >>>', vm.selectedDept);
            console.log('vm.currentCaraul >>>', vm.currentCaraul);
            console.log('vm.summaryTable >>>', vm.summaryTable);
            console.log('vm.storage >>>', vm.storage);
            console.log('vm.selectedDept.peopleList >>>', vm.selectedDept.peopleList);
        };










//TODO: Копия протокола из старых строевых записок, НАЧАЛО








        var eventName = "adminFilterDeptsEdits";
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

        vm.toggleSingleDatePicker = function(){
            vm.singleDatePicker = !vm.singleDatePicker;
        };

        vm.getNumDept = getNumDept;

        vm.formatDate = function(model, index){
            if(index != 0){
                var shortDate = $filter('date')(model.date, 'dd-MM-yy');
                var shortDateBefore = $filter('date')(vm.storage.notesProtocol[index - 1].date, 'dd-MM-yy');
                if(shortDate === shortDateBefore) return $filter('date')(model.date, 'HH:mm');
                else return $filter('date')(model.date, 'dd-MM-yy HH:mm');

            } else {
                return $filter('date')(model.date, 'dd-MM-yy HH:mm');
            }
        };
        vm.emitFilters = function(){
            vm.page.activeDeptNote = null;
            // var deptId = (vm.page.activeDept !== undefined && vm.page.activeDept !== null)? vm.page.activeDept.id : null;
            var deptId = (!!vm.selectedDept === true)? vm.selectedDept.id : null;
            var userId = ((vm.page.activeUser !== undefined && vm.page.activeUser !== null))? vm.page.activeUser.id : null;
            var message = {
                deptId: deptId,
                userId: userId
            };
            if(vm.singleDatePicker){
                message.date = vm.page.singleDatePicker.valueOf();
            } else {
                message.dateFrom = vm.page.datePicker.startDate.valueOf();
                message.dateTo = vm.page.datePicker.endDate.valueOf();
            }
            ws.$emit(eventName, message);


        };



        /*
         vm.getDept = function(logModel){
         if(logModel.engine){
         return logModel.engineDeptName;
         }
         else {
         if(logModel.userDeptName !== null){
         return logModel.userDeptName;
         } else {
         return 'ССО'
         }
         }
         };
         */



        vm.resetFilters = function(){
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
        vm.emitDefaults = function(){
            vm.resetFilters();
            storage.notesProtocol = [];
            vm.emitFilters();
        };
        vm.selectNote = function(note){
            if(vm.page.activeDeptNote && vm.page.activeDeptNote.id === note.id){
                vm.page.activeDeptNote = null;
                vm.currentCaraul = null;
            } else {
                vm.page.activeDeptNote = jQuery.extend(true, {}, note);
                vm.currentCaraul = _.find(vm.page.activeDeptNote.fireDepartment.caraulCrews, function(caraul){
                    return caraul.caraulNum === vm.page.activeDeptNote.fireDepartment.totalCaraulNum;
                });
            }
        };
        vm.closeNote = function(){
            vm.selectNote(vm.page.activeDeptNote);

        };
        vm.findEngineInCaraul = function(currentCaraul, engine){
            var engineInCrew = _.find(currentCaraul.caraulEngines, function(eng){
                return eng.idFireEngine === engine.idFireEngine;
            });
            return engineInCrew.caraulEngine;
        };
        vm.getRelocationEngineById = function(fireEngine){
            if(vm.page.activeDeptNote){
                var eng = _.find(vm.page.activeDeptNote.fireDepartment.fireEngines, function(engine){
                    return fireEngine.replacementFireEngineId && engine.idFireEngine === fireEngine.replacementFireEngineId
                });
                if(angular.isDefined(eng)){
                    return eng.engineType.engineType + ' ' + eng.gosNo
                } else {
                    return 'С какой машины?'
                }
            }
        };
        vm.getDislocation = function(fireEngine){
            if(fireEngine.locationDeptId != null){
                var dislocationDept = _.find(storage.fireDepartments, function(dept){
                    return dept.id === fireEngine.locationDeptId;
                });
                if(dislocationDept === undefined){
                    return '??'
                } else {
                    return dislocationDept.fireDeptName;
                }
            } else {
                return '-'
            }
        };
        vm.showPO = function(fireEngine){
            if(fireEngine.engineType){
                return fireEngine.engineType.isPO;
            }
        };
        vm.showGD = function(fireEngine){
            if(fireEngine.engineType){
                return fireEngine.engineType.isGD;
            }
        };
        vm.showGDZS = function(fireEngine){
            if(fireEngine.engineType){
                return fireEngine.engineType.isGDZS;
            }
        };
        vm.calculateByFaceCrewCount = function(){
            if(vm.currentCaraul){
                vm.currentCaraul.byFaceCrewCount = vm.currentCaraul.atListCrewCount + vm.currentCaraul.attachedCrewCount - (vm.currentCaraul.illCrewCount + vm.currentCaraul.restCrewCount + vm.currentCaraul.detachedCrewCount + vm.currentCaraul.freeCrewCount);
            }
        };
        vm.setIconColor = function(color){
            var trueColor = '';
            if(color != ''){
                trueColor = color
            } else {
                trueColor = 'black';
            }
            return {color: trueColor};
        };
        vm.getTotalBaseCrewCount = function(){
            var totalCount = 0;
            if(vm.currentCaraul){
                _.each(vm.currentCaraul.caraulEngines, function(engine){
                    totalCount += engine.caraulEngine.baseCrewCount;
                    totalCount += engine.caraulEngine.additionalSmokeProtectionCrewCount;
                });
            }
            return totalCount;
        };
        vm.emitDefaults();










//TODO: Копия протокола из старых строевых записок, КОНЕЦ










        vm.showStuffPanel = function(list){
            if(!!list === true && !!vm.selectedDept === true && !!vm.selectedDept.peopleList === true){
                return !!vm.selectedDept.peopleList[list].length;
            }
            return false;
        };


        vm.removeSelfStuff = function(stuff, idx){
            vm.selectedDept.peopleList['self'].splice(idx, 1);
        };



        vm.addSelfStuff = function(){
            vm.selectedDept.peopleList['self'].push({fio: null});
        };


        vm.getOwn = function(own, branch){

            var peopFields = {
                occupId: 'occupList',
                rankId: 'ranksList'
            };


            if(!!own === true && !!branch === true){

                for(var d in peopFields){

                    if(peopFields.hasOwnProperty(d) && vm.storage.chsDict.hasOwnProperty(peopFields[d])){

                        vm.storage.chsDict[peopFields[d]].find(function(dict){

                            // if(typeof own !== 'string'){

                            if(dict.id === own[d]){
                                own[peopFields[d]] = Object.assign({}, dict);
                                /*
                                 }
                                 } else {
                                 console.log('-------------------->>>', own);
                                 if(dict.id === own){
                                 own[peopFields[d]] = Object.assign({}, dict);

                                 }
                                 */
                            }


                        });

                    }


                }


            }

            // vm.selectedDept.peopleList[branch].push(own);

        };


        vm.cleanPeopleList = function(){
            vm.selectedDept.peopleList = Object.assign({}, {
                staff_list: [],
                staffs: [],
                strength: [],
                strengths: [],
                upper: [],
                self: [],
                lower: []
            });
        };



        vm.getPeoples = function(){

            for(var i = 0, l = vm.selectedDept.staff_list.length; i < l; i++){

                vm.getOwn(vm.selectedDept.staff_list[i], 'staff_list');

            }



            for(var i in vm.currentCaraul.officials){



                if(vm.currentCaraul.officials.hasOwnProperty(i)){


                    for(var j = 0, l = vm.currentCaraul.officials[i].length; j < l; j++){


                        if(typeof vm.currentCaraul.officials[i][j] !== 'string'){

                            vm.selectedDept.peopleList[i].push(Object.assign({}, vm.currentCaraul.officials[i][j]));

                        } else {
                            vm.selectedDept.staff_list.find(function(staff){

                                if(vm.currentCaraul.officials[i][j] === staff.id){
                                    vm.selectedDept.peopleList[i].push(Object.assign({}, staff));
                                    return true;
                                }
                            });

                        }

                    }

                }
            }



        };




        vm.baseCrewCount = function(){

            var count = 0;

            if(!!vm.currentCaraul === true){

                for(var i = 0, l = vm.currentCaraul.caraulEngines.length; i < l; i++){

                    count += vm.currentCaraul.caraulEngines[i].caraulEngine.baseCrewCount + vm.currentCaraul.caraulEngines[i].caraulEngine.additionalSmokeProtectionCrewCount

                }

            }
            return count;
        }




        vm.initializeCurrentDeptAndCaraul = function(selectedDeptId, needRelock){







            // console.log('>>>', selectedDeptId != vm.canSaveCaraulDeptId, selectedDeptId, vm.canSaveCaraulDeptId);

            if(selectedDeptId != vm.canSaveCaraulDeptId){
                vm.canSaveCaraulDeptId = null;
            }
            if(needRelock === undefined || needRelock !== false){
                ws.$emit('lockDocument', {'id': selectedDeptId + ':dept', 'typeDelivery': 'all'});
            }
            /*
             vm.selectedDept = _.find(storage.fireDepartments, function(dept){
             console.log(dept.id, '===', selectedDeptId);
             return dept.id === selectedDeptId;
             });
             */
            storage.fireDepartments.find(function(dept){
                // storage.fireDepartments.some(function(dept){
                // console.log(dept.id, '===', selectedDeptId);
                // console.log(dept.id === selectedDeptId, dept.id, '<->', selectedDeptId);

                if(dept.id === selectedDeptId){
                    vm.selectedDept = dept;
                    return true;
                }
            });


            var tempCurrentCaraul = vm.selectedDept.caraulCrews.find(function(caraul){
                // return caraul.caraulNum === storage.globalSettings.currentCaraul;
                return (storage.fireDepartmentsArchive)? caraul.caraulNum === storage.fireDepartmentsArchive.crewNumber : caraul.caraulNum === storage.globalSettings.currentCaraul;
            });









            // vm.currentCaraul = JSON.parse(JSON.stringify(tempCurrentCaraul));
            // vm.currentCaraul = angular.merge({}, tempCurrentCaraul);

            vm.currentCaraul = Object.assign({}, tempCurrentCaraul);

            // console.log('tempCurrentCaraul > ', tempCurrentCaraul);
            // console.log('vm.selectedDept.caraulCrews > ', vm.selectedDept);

            //Массив в котором хранятся копии значений количества ПО в машинах
            /*k
             vm.foamerOnEngines = _.map(vm.selectedDept.fireEngines, function(engine){
             return {idFireEngine: engine.idFireEngine, foamerCount: engine.foamerCount};
             });
             */


            vm.foamerOnEngines = [];

            vm.selectedDept.caraulCrews.find(function(cCrew){
                if(cCrew.idCaraul === vm.currentCaraul.idCaraul){
                    cCrew.caraulEngines.forEach(function(engine){
                        vm.foamerOnEngines.push(
                            {idFireEngine: engine.idFireEngine, foamerCount: engine.caraulEngine.foamerCount}
                        );
                    });
                    return true;
                }
            });

            // console.log('vm.foamerOnEngines 1 >>>> ', vm.foamerOnEngines);

            vm.selectedDeptDislocatedList = vm.dislocationListForSelectedDept(vm.selectedDept);

            /*
             console.log('1 >', vm.currentCaraul);
             console.log('2 >', vm.foamerOnEngines);
             console.log('3 >', vm.selectedDept.fireEngines[5].foamerCount);
             console.log('4 >', storage.fireDepartments[6].fireEngines[5].foamerCount);
             */
        };










        vm.closeDept = function(){
            ws.$emit('unlockDocument', vm.canSaveCaraulDeptId + ':dept');
            vm.selectedDept = undefined;
            vm.currentCaraul = undefined;
            vm.aso = undefined;
            $state.transitionTo($state.current, null, {notify: false});
            refreshLocks();
        };




        vm.showStateCommentInput = function(state, event, index){
            vm.commentStateObject.engineId = state.idFireEngine;
            vm.commentStateObject.commentSZ = state.commentSZ;

            $timeout(function(){
                $("[id^=state-comment-" + index + "]").focus();
            }, 100);
            event.stopPropagation();
        };
        vm.onEnterStateComment = function(event){
            if(event.which == 13){
                vm.emitStateComment(event);
            }
        };
        vm.emitStateComment = function(event){
            var message = {
                deptId: vm.selectedDept.deptId,
                engineId: vm.commentStateObject.engineId,
                commentSZ: vm.commentStateObject.commentSZ
            };
            ws.$emit('changeStateComment', message);
            vm.closeStateCommentInput(event);
        };
        vm.closeStateCommentInput = function(event){
            vm.commentStateObject.engineId = null;
            vm.commentStateObject.commentSZ = '';
            event.stopPropagation();
        };




        vm.saveCaraul = function(transition, update){

            if(!!vm.currentCaraul === true){

                // vm.saveLostTechnique();

                // vm.renewDislocatedListInDept();
                // console.log('-------->>>', vm.currentCaraul);
                vm.currentCaraul.caraulEngines.forEach(function(engine){
                    if(!engine.smokeProtectionCrewCount){
                        engine.smokeProtectionCrewCount = 0;
                    }
                    if(!engine.baseCrewCount){
                        engine.baseCrewCount = 0;
                    }
                    if(!engine.additionalSmokeProtectionCrewCount){
                        engine.additionalSmokeProtectionCrewCount = 0;
                    }
                });

                /*
                 _.each(vm.foamerOnEngines, function(foam){
                 if(!angular.isNumber(foam.foamerCount)){
                 foam.foamerCount = 0;
                 }
                 });
                 */
                vm.foamerOnEngines.forEach(function(foam){
                    if(isNaN(parseInt(foam.foamerCount, 10))){
                        foam.foamerCount = 0;
                    }
                });



                if(!angular.isNumber(vm.selectedDept.foamOnStock)){
                    vm.selectedDept.foamOnStock = parseInt(vm.selectedDept.foamOnStock);
                    if(isNaN(vm.selectedDept.foamOnStock)){
                        vm.selectedDept.foamOnStock = 0;
                    }
                }


                var nonClosedCarauls = vm.storage.fireDepartments.length;
                vm.storage.fireDepartments.forEach(
                    function(dept){

                        if(!vm.isDeptNeedToSaveCaraul(dept)){
                            --nonClosedCarauls;
                        }


                    }
                );


                vm.foamerOnEngines.forEach(function(fEng){
                    return vm.currentCaraul.caraulEngines.find(function(cEng){
                        if(cEng.idFireEngine === fEng.idFireEngine){
                            cEng.caraulEngine.foamerCount = fEng.foamerCount;
                            return true;
                        }
                    });

                });


                var command = {
                    depts: [
                        vm.selectedDept
                    ],
                    nonClosedCarauls: nonClosedCarauls,
                    target: (!!update === true)? 'update' : 'caraul'
                };


                var allDislocatedDepts = {};

                vm.currentCaraul.leaveEngines.forEach(function(eng){
                    if(!!eng.caraulEngine.locationToDeptId === true){
                        return storage.fireDepartments.find(function(dept){
                            if(dept.id === eng.caraulEngine.locationToDeptId){
                                allDislocatedDepts[dept.id] = Object.assign({}, dept);
                                return allDislocatedDepts[dept.id].caraulCrews.forEach(function(cCrew, idxx){
                                    return cCrew.caraulEngines.find(function(cEng, idx){
                                        if(cEng.idFireEngine === eng.idFireEngine){
                                            allDislocatedDepts[dept.id].caraulCrews[idxx].caraulEngines[idx] = Object.assign({}, eng);
                                            // console.log('cEng ......>', cEng);
                                            return true;
                                        }
                                    });
                                });
                            }
                        })
                    }
                });

                for(var i in allDislocatedDepts){
                    if(allDislocatedDepts.hasOwnProperty(i)){
                        command.depts.push(allDislocatedDepts[i]);
                    }
                }

                if(!!transition === true){
                    command.mode = transition;
                }


                command.depts.find(function(dept){
                    if(dept.deptId === vm.selectedDept.deptId){
                        return dept.caraulCrews.find(function(crew, idx){
                            if(crew.idCaraul === vm.currentCaraul.idCaraul){
                                dept.caraulCrews[idx] = Object.assign({}, vm.currentCaraul);
                            }
                        });
                    }
                });



                // for(var i = 0; i < 1000; i++){
                ws.$emit('updateDepartments', command);
                // }


                allDislocatedDepts = {};

                /*-------------------------------------------- Нужное место
                 var command = {
                 deptId: vm.selectedDept.id,
                 caraul: vm.currentCaraul,
                 foamerOnEngines: vm.foamerOnEngines,
                 foamOnStock: vm.selectedDept.foamOnStock,
                 nonClosedCarauls: nonClosedCarauls
                 };
                 if(transition !== undefined && transition === false){
                 command.mode = transition;
                 }

                 ws.$emit('saveCaraul', command);


                 //-------------------------------------------- */


                /*            vm.selectedDeptDislocatedList.forEach(
                 function(element){

                 if(element.stateId !== element.engine.fireEngineState.id){

                 // console.log(vm.selectedDept);
                 ws.$emit('changeState', {
                 // deptId: element.dept.id,
                 deptId: vm.selectedDept.id,
                 engineId: element.engine.idFireEngine,
                 isFirstTank: element.engine.isFirstTank,
                 newStateName: element.engine.fireEngineState.name,
                 toStateId: element.engine.fireEngineState.id
                 }
                 );


                 element.stateId = element.engine.fireEngineState.id;

                 }

                 }
                 );*/


                //TODO: раскоментировать если не будет иного перехода после этой функции
                // vm.selectDept(vm.selectedDept);


                // vm.lostTechnique();
            }
        };










        vm.showCommentInput = function(engine, event, index){
            vm.commentObject.engineId = engine.idFireEngine;
            vm.commentObject.comment = engine.comment;
            $timeout(function(){
                $("[id^=engine-comment-" + index + "]").focus();
            }, 100);
            event.stopPropagation();
        };
        vm.closeCommentInput = function(event){
            vm.commentObject.engineId = null;
            vm.commentObject.comment = '';
            event.stopPropagation();
        };
        vm.onEnterEmitComment = function(event){
            if(event.which == 13){
                vm.emitComment(event);
            }
        };
        vm.emitComment = function(event){
            var message = {
                deptId: vm.selectedDept.deptId,
                engineId: vm.commentObject.engineId,
                comment: vm.commentObject.comment
            };
            ws.$emit('changeEngineComment', message);
            vm.closeCommentInput(event);
        };










        vm.addMultiplyFields = function(field, current){

            // console.log('filled >>>', storage.dataOfStates.newFireCard.chsData.filled);

            var wrapper = document.getElementById(field),
                tr,
                td,
                childCopy = null;



            if(!!wrapper === true && wrapper.nodeType === 1 && !!field === true){

                var data = vm.currentCaraul[vm.applyFieldsStructure[field].model];

                if(vm.applyFieldsStructure.hasOwnProperty(field)){

                    tr = wrapper.insertRow();

                    tr.id = field + current;


                    tr.innerHTML += '<td>{{bydepts.selectedDept.peopleList.' + field + '[' + current + '].occupList.value}}</td><td>{{bydepts.selectedDept.peopleList.' + field + '[' + current + '].ranksList.value}}</td><td><div><ui-select theme="bootstrap" data-ng-model="bydepts.selectedDept.peopleList.' + field + '[' + current + ']" reset-search-input="false"><ui-select-match class="ui-select-match">{{bydepts.selectedDept.peopleList.' + field + '[' + current + '].fio}}</ui-select-match><ui-select-choices class="ui-select-choices" repeat="x in bydepts.selectedDept.staff_list | filter: $select.search track by $index"> <span ng-bind-html="x.fio| highlight: $select.search"><span></ui-select-choices> </ui-select></div></td><td><button type="button" class="button btn-danger" ng-click="bydepts.removeStuff(' + current + ', \'' + field + '\')"> <span class="glyphicon glyphicon-minus"></span></button></td>';


// console.log('tr.innerHTML>>>', tr.innerHTML);

                    /*
                     tr.innerHTML += '<td>{{bydepts.selectedDept.peopleList.' + field + '[' + current + '].ranksList.value}}</td><td>{{bydepts.selectedDept.peopleList.' + field + '[' + current + '].occupList.value}}</td><td><div><ui-select theme="bootstrap" data-ng-model="bydepts.selectedDept.peopleList.' + field + '[' + current + ']" reset-search-input="false"><ui-select-match class="ui-select-match">{{bydepts.selectedDept.peopleList.' + field + '[' + current + '].fio}}</ui-select-match><ui-select-choices class="ui-select-choices" repeat="x in bydepts.selectedDept.peopleList.' + field + '| filter: $select.search track by $index"> <span ng-bind-html="x.fio| highlight: $select.search"><span></ui-select-choices> </ui-select></div></td><td><button type="button" class="button btn-danger" ng-click="bydepts.removeStuff(' + current + ', \'' + field + '\')"> <span class="glyphicon glyphicon-minus"></span></button></td>';

                     */

// console.log('tr.innerHTML>>>', tr.innerHTML);



                    /*

                     if(!!data === false){
                     data = {};
                     }


                     if(!!data[current] === false){
                     data[current] = {};
                     }

                     // for(var j = 0, l = vm.applyFieldsStructure[field].dict.length; j < l; j++){

                     // vm.currentCaraul[vm.applyFieldsStructure[field].model][current][i]

                     if(!!data[current][j] === false){
                     data[current][j] = angular.copy({});
                     }
                     */


                    // tr.innerHTML += '<td><div><ui-select theme="bootstrap" data-ng-model="bydepts.currentCaraul.' + vm.applyFieldsStructure[field].model + '[' + current + '][' + j + ']" reset-search-input="false"><ui-select-match class="ui-select-match">{{bydepts.currentCaraul.staff[0].value}}</ui-select-match><ui-select-choices class="ui-select-choices" repeat="x in ' + vm.applyFieldsStructure[field].dict[j].path + '| filter: $select.search track by $index"> <span ng-bind-html="x.value| highlight: $select.search"><span></ui-select-choices> </ui-select></div></td>'



//TODO: последняя рабочая версия

                    /*
                     tr.innerHTML += '<td><div><ui-select theme="bootstrap" data-ng-model="bydepts.currentCaraul.' + vm.applyFieldsStructure[field].model + '[' + current + '][' + j + ']" reset-search-input="false"><ui-select-match class="ui-select-match">{{bydepts.currentCaraul.' + vm.applyFieldsStructure[field].model + '[' + current + '][' + j + '].value}}</ui-select-match><ui-select-choices class="ui-select-choices" repeat="field in ' + vm.applyFieldsStructure[field].dict[j].path + ' | filter: $select.search track by $index"> <span ng-bind-html="field.value| highlight: $select.search"><span></ui-select-choices> </ui-select></div></td>'
                     vm.applyFieldsStructure[field].dict[j].field
                     */

                    /*
                     tr.innerHTML += '<td><div><select data-ng-model="bydepts.currentCaraul.' + vm.applyFieldsStructure[field].model + '[' + current + '][' + j + ']" class="table-dropdown" data-ng-options="x.' + vm.applyFieldsStructure[field].dict[j].field + ' for x in ' + vm.applyFieldsStructure[field].dict[j].path + '"></select></div></td>'
                     */


                    // tr.innerHTML += '<td><div><select data-ng-model="bydepts.currentCaraul.' + vm.applyFieldsStructure[field].model + '[' + current + '][' + j + ']" class="table-dropdown" data-ng-options="x.' + vm.applyFieldsStructure[field].dict[j].field + ' for x in ' + vm.applyFieldsStructure[field].dict[j].path + '"></select></div>'










                    /*

                     var inner = '<td><div><select data-ng-model="bydepts.currentCaraul.' + vm.applyFieldsStructure[field].model + '[' + current + '][' + j + ']" class="table-dropdown">';
                     console.log('>>>', vm.applyFieldsStructure[field].dict[j].path, vm.storage.chsDict[vm.applyFieldsStructure[field].dict[j].path].length);


                     for(var h = 0, k = vm.storage.chsDict[vm.applyFieldsStructure[field].dict[j].path].length; h < k; h++){

                     inner += '<option value="' + JSON.stringify(vm.storage.chsDict[vm.applyFieldsStructure[field].dict[j].path][h]) + '">' + vm.storage.chsDict[vm.applyFieldsStructure[field].dict[j].path][h].value + '</option>';
                     }
                     // tr.innerHTML += '<td><div><select data-ng-model="bydepts.currentCaraul.' + vm.applyFieldsStructure[field].model + '[' + current + '][' + j + ']" class="table-dropdown" data-ng-options="x.' + vm.applyFieldsStructure[field].dict[j].field + ' for x in ' + vm.applyFieldsStructure[field].dict[j].path + '"></select></div></td>';

                     inner += '</select></div></td>';

                     tr.innerHTML += inner;

                     */










                    /*
                     tr.innerHTML += '<td><div><select data-ng-model="bydepts.currentCaraul.' + vm.applyFieldsStructure[field].model + '[' + current + '][' + j + ']" class="table-dropdown"><option value="">---Please select---</option><option ng-repeat="item in ' + vm.applyFieldsStructure[field].dict[j].path + '" value="{{item.value}}">{{item.value}}</option></select></div>'
                     */

                    // }

                }



                /*
                 tr.innerHTML = '<td><div><select data-ng-model="bydepts.currentCaraul.staff[0]" class="table-dropdown" data-ng-options="x.id for x in bydepts.storage.chsDict.chsScales"></select></div>'
                 */




                /*
                 tr.innerHTML = '<td><div><ui-select theme="bootstrap" data-ng-model="bydepts.currentCaraul.staff[0]" reset-search-input="false"><ui-select-match>{{bydepts.currentCaraul.staff[0].value}}</ui-select-match><ui-select-choices repeat="field in bydepts.storage.chsDict.chsScales| filter: $select.search track by $index"> <span ng-bind-html="field.value| highlight: $select.search"><span></ui-select-choices> </ui-select></td></ui-select></div>'
                 */

                /*
                 tr.innerHTML += '<td></div><ui-select theme="bootstrap" class="full-width" data-ng-model="bydepts.currentCaraul.staff[1]" reset-search-input="false"><ui-select-match>{{bydepts.currentCaraul.staff[1].value}}</ui-select-match><ui-select-choices repeat="field in bydepts.storage.chsDict.chsScales| filter: $select.search track by $index"> <span ng-bind-html="field.value| highlight: $select.search"><span></ui-select-choices> </ui-select></td></ui-select></div>'

                 tr.innerHTML += '<td></div><ui-select theme="bootstrap" class="full-width" data-ng-model="bydepts.currentCaraul.staff[2]" reset-search-input="false"><ui-select-match>{{bydepts.currentCaraul.staff[2].value}}</ui-select-match><ui-select-choices repeat="field in bydepts.storage.chsDict.chsScales| filter: $select.search track by $index"> <span ng-bind-html="field.value| highlight: $select.search"><span></ui-select-choices> </ui-select></td></ui-select></div>'
                 */



                wrapper.appendChild(tr);
                // angular.element(wrapper).append(tr);



                // $compile(wrapper)($scope);
                // data = wrapper = tr =null;


                /*
                 for(var i = 0, l = obj.child.length; i < l; i++){


                 }
                 */


                /*
                 var obj = returnObjByFieldName(field, storage.dataOfStates.newFireCard.chsData.empty, null),
                 node = null;







                 if(!!obj === true && obj.hasOwnProperty('child')){

                 tr = wrapper.insertRow();


                 wrapper.dataset.child = '';
                 wrapper.dataset.parent = field;

                 for(var i = 0, l = obj.child.length; i < l; i++){

                 wrapper.dataset.child = wrapper.dataset.child + ((!!wrapper.dataset.child === true)? ',' : '') + obj.child[i].fieldname;

                 // console.log('2 --------->>>', obj.child, wrapper);


                 childCopy = Object.assign({}, obj.child[i]);

                 /!*
                 if(!root[childCopy.root].hasOwnProperty(childCopy.fieldname)){
                 root[childCopy.root][childCopy.fieldname] = {};
                 }
                 *!/

                 /!*
                 if(!!root[childCopy.root][childCopy.fieldname][wrapper.childNodes.length - 1] === true){
                 root[childCopy.root][childCopy.fieldname][wrapper.childNodes.length - 1] = null;
                 }
                 *!/
                 childCopy.model = childCopy.model + '[' + [wrapper.childNodes.length - 1] + ']';


                 /!*
                 console.log(i, 'model 0>>>', wrapper.childNodes.length);
                 console.log(i, 'model 1>>>', obj);
                 console.log(i, 'model 2>>>', obj.child);
                 *!/
                 // console.log(i, 'model 3>>>', childCopy);


                 node = getNodeByType(childCopy);
                 if(!!node === true && node.nodeType === 1){

                 td = tr.insertCell();
                 td.appendChild(node);


                 }
                 }

                 }*/

                // console.log('------------->', storage.dataOfStates.newFireCard.chsData.filled.chs1);

                // $compile(wrapper)($scope);

                // console.log('------->>>', result);

            }
            // $compile(wrapper)($scope);
            data = wrapper = tr = td = childCopy = null;

        };





        vm.removeStuff = function(num, field){


            if(num !== undefined && !!field === true && vm.selectedDept.peopleList.hasOwnProperty(field)){

                /*
                 var node = document.getElementById(field + num);



                 if(!!node === true && node.nodeType === 1){
                 node.parentNode.removeChild(node);
                 }
                 */
                var idx = null,
                    node = null;

                vm.selectedDept.peopleList[field].splice(num, 1);





                for(var k in vm.applyFieldsStructure){
                    if(vm.applyFieldsStructure.hasOwnProperty(k)){
                        vm.addStuff(k, true);
                    }
                }



                /*
                 for(var k in vm.applyFieldsStructure){
                 if(vm.applyFieldsStructure.hasOwnProperty(k)){
                 node = document.getElementById(field + num);
                 if(!!node === true && node.nodeType === 1){
                 node.parentNode.removeChild(node);
                 }
                 }
                 }
                 */



                /*

                 vm.currentCaraul.peopleList[field].find(function(off, index){

                 if((off.hasOwnProperty('id') && vm.selectedDept.peopleList[field][num].id === off.id) || vm.selectedDept.peopleList[field][num].id === off){
                 idx = index;
                 return true;
                 }

                 });

                 if(idx !== null){
                 vm.currentCaraul.officials[field].splice(idx, 1);
                 }

                 vm.selectedDept.peopleList[field].splice(num, 1);

                 vm.getPeoples();
                 */

            }
        };




        vm.addStuff = function(wrapper, append){


            /*
             if(vm.currentCaraul.hasOwnProperty(vm.applyFieldsStructure[wrapper].model) && !!vm.currentCaraul[vm.applyFieldsStructure[wrapper].model] === false){
             vm.currentCaraul[vm.applyFieldsStructure[wrapper].model] = {};
             }
             */

            var node = null;



            // var fieldCount = Math.max.apply(null, Object.keys(vm.currentCaraul[vm.applyFieldsStructure[wrapper].model]));



            var fieldCount = 0;

            if(!!vm.selectedDept.peopleList === true && vm.selectedDept.peopleList.hasOwnProperty(wrapper)){
                fieldCount = (Object.keys(vm.selectedDept.peopleList[wrapper]).length);
            }

            fieldCount = (!isNaN(parseInt(fieldCount, 10)))? fieldCount : 0;

            node = document.querySelector('#' + wrapper);

            // if(!isNaN(parseInt(fieldCount, 10)) && !!node.childNodes === true && node.childNodes.length < fieldCount){
            if(!isNaN(parseInt(fieldCount, 10))){

                node.innerHTML = '';

                for(var i = 0, l = fieldCount + (!!append === true? 0 : 1); i < l; i++){
                    vm.addMultiplyFields(wrapper, i);
                }

            }

            $compile(node)($scope);
            node = null;
        };

        vm.countSummOfLeaved = function(caraul){
            if(caraul != undefined){
                return caraul.illCrewCount + caraul.restCrewCount + caraul.detachedCrewCount + caraul.freeCrewCount;
            }
        };


        /*
         vm.calculateByFaceCrewCount = function(){
         vm.currentCaraul.byFaceCrewCount = vm.currentCaraul.atListCrewCount + vm.currentCaraul.attachedCrewCount - (vm.currentCaraul.illCrewCount + vm.currentCaraul.restCrewCount + vm.currentCaraul.detachedCrewCount + vm.currentCaraul.freeCrewCount);
         };
         */

        vm.totalBaseCrewCountSumm = function(){
            var summ = 0;
            for(var i in vm.totalBaseCrewCount){
                if(vm.totalBaseCrewCount.hasOwnProperty(i)){
                    summ += vm.totalBaseCrewCount[i].count;
                }
            }
            return summ;
        };


        vm.removeDeptSuff = function(dept){
            var name = '';

            if(!!dept === true){
                if(!!dept.fireDeptSuffOwn === true && dept.fireDeptName.indexOf(dept.fireDeptSuffOwn) !== -1){
                // console.log('1 name>>>', dept.fireDeptName);
                    name = (dept.fireDeptName.substring(dept.fireDeptName.indexOf(dept.fireDeptSuffOwn) + dept.fireDeptSuffOwn.length, dept.fireDeptName.length)).trim();
/*
                    console.log('2 suff>>', dept.fireDeptSuffOwn);
                    console.log('3 rest>>>', name);
                    console.log('------------------------------------------');
*/
                    // name = (dept.fireDeptName.replace(dept.fireDeptSuffOwn, '')).trim();
                } else {
                    name = dept.fireDeptName;
                }


            }
            return name;
        };

        vm.getFireDeptsDate = function(){

            var date;

            if(vm.storage.dataOfStates.frontNotesArchive.date !== null){
                date = new Date(vm.storage.dataOfStates.frontNotesArchive.date).toLocaleDateString();
            } else {
                date = (new Date()).toLocaleDateString();
            }

            return date;
        };







        /*vm.getTotalBaseCrewCount = function(){
         var totalCount = 0;
         var leaveCrewCount = 0;
         var incomingEngine;
         // console.log('selectedDeptDislocatedList >', vm.selectedDeptDislocatedList);
         if(vm.currentCaraul){


         vm.storage.fireDepartments.map(function(dept){

         dept.caraulCrews.map(function(caraul){

         if(caraul.idCaraul === vm.currentCaraul.idCaraul){

         caraul.caraulEngines.map(function(eng){
         if(eng.caraulEngine.hasOwnProperty('locationDeptId') && !!eng.caraulEngine.locationDeptId === false){
         totalCount += eng.caraulEngine.baseCrewCount;
         }
         });
         }
         });

         });
         // console.log('vm.currentCaraul >', vm.currentCaraul);
         totalCount += vm.currentCaraul.leaveCrewCount;


         /!*
         _.each(vm.currentCaraul.caraulEngines, function(engine){

         incomingEngine = vm.selectedDeptDislocatedList.find(function(eng){
         return eng.engine.idFireEngine === engine.idFireEngine;
         });


         if(!incomingEngine){
         totalCount += engine.caraulEngine.baseCrewCount;
         }


         // totalCount += engine.caraulEngine.additionalSmokeProtectionCrewCount;
         });
         *!/
         }
         /!*
         var count = 0;
         if(vm.deptDislocatedEngineList.length > 0){
         count = vm.deptDislocatedEngineList.map(function(eng){
         return vm.findEngineInCaraul(vm.currentCaraul, eng.engine).baseCrewCount
         });
         if(!isNaN(parseInt(count, 10))){
         totalCount += parseInt(count, 10);
         }
         }
         *!/
         // console.log('totalCount >', totalCount);
         // vm.totalBaseCrewCount = totalCount;
         return totalCount;
         };*/


        vm.getTotalBaseCrewCount = function(currentCaraul){
            var totalCount = 0;
            if(currentCaraul){
                currentCaraul.caraulEngines.forEach(function(engine){
                    totalCount += engine.caraulEngine.baseCrewCount;
                    totalCount += engine.caraulEngine.additionalSmokeProtectionCrewCount;
                });
            }

            return totalCount;
        };

        vm.countGonePeople = function(caraul){
            return caraul.illCrewCount + caraul.restCrewCount + caraul.detachedCrewCount + caraul.freeCrewCount;
        };




        vm.getSummaryDeptData = function(caraul, field){

            field.totalCrewCount += caraul.totalCrewCount;
            field.atListCrewCount += caraul.atListCrewCount;
            field.byFaceCrewCount += caraul.byFaceCrewCount;
            // field.countBR += vm.getTotalBaseCrewCount(caraul);
            field.countBR += vm.getTotalBaseCrewCount(caraul);
            field.countGone += vm.countGonePeople(caraul);
            field.illCrewCount += caraul.illCrewCount;
            field.restCrewCount += caraul.restCrewCount;
            field.detachedCrewCount += caraul.detachedCrewCount;
            field.freeCrewCount += caraul.freeCrewCount;
            field.strengthening += caraul.strengthening;

        };


        vm.calculateSummaryTable = function(branch, field){

            if(!!branch === true && !!vm.currentCaraul === true){

                if(branch.hasOwnProperty('dept')){


                    /*
                     if(!!vm.summaryTable.engineTypes === false){
                     vm.summaryTable.engineTypes = {};
                     }
                     */


                    for(var p = 0, l = branch.dept.fireEngines.length; p < l; p++){

                        if(field.hasOwnProperty(branch.dept.fireEngines[p].engineType.engineType)){
                            ++field[branch.dept.fireEngines[p].engineType.engineType];
                        }

                    }


                    branch.dept.caraulCrews.find(function(caraul){

                        if(caraul.caraulNum === vm.currentCaraul.caraulNum){
                            vm.getSummaryDeptData(caraul, field);
                            return true;
                        }

                    });

                }

                for(var i in branch){

                    if(branch.hasOwnProperty(i) && i !== 'dept' && typeof branch[i] === 'object'){

                        /*
                         if(!field.hasOwnProperty(i)){
                         field[i] = Object.assign({}, vm.emptySummaryTable);
                         }
                         */

                        vm.calculateSummaryTable(branch[i], field);
                    }

                }

            }
            // console.log('summaryTable >>>', vm.summaryTable);
        };










        vm.getDepartment = function(event, dept, branch){
            dept = storage.fireDepartments.find(function(dpt){
                return dept === dpt.id;
            });


            vm.summaryTable = {};

            function getAllRegions(branch, dept){

                var name = null;

                for(var i in branch){

                    if(branch.hasOwnProperty(i) && i !== 'dept' && typeof branch[i] === 'object'){

                        name = (branch[i].dept.fireDeptType === 0)? i : dept.fireDeptName;

                        if(!vm.summaryTable.hasOwnProperty(name)){
                            vm.summaryTable[name] = Object.assign({}, vm.emptySummaryTable);
                        }

                        vm.calculateSummaryTable(branch[i], vm.summaryTable[name]);

                    }

                }

            };




            vm.currentCaraul = vm.selectedDept = null;

            if(!!dept === true){


                var node = document.querySelector('.uSelectedItem');
                if(!!node === true && node.nodeType === 1){
                    node.classList.remove('uSelectedItem');
                }

                if(!!event === true){
                    event.target.classList.add('uSelectedItem');
                }


                vm.selectedDept = dept;
                vm.getCurrentCaraul();



                // vm.getPeoples();



                if(!!branch === true && dept.fireDeptType === 0){
                    /*
                     for (var i in vm.summaryTable){
                     if(vm.summaryTable.hasOwnProperty(i)){
                     vm.summaryTable[i] = 0;
                     }
                     }
                     */



                    getAllRegions(branch, dept);

                }

                // vm.getTotalBaseCrewCount();


                vm.cleanPeopleList();


                vm.getPeoples();

                for(var k in vm.applyFieldsStructure){
                    if(vm.applyFieldsStructure.hasOwnProperty(k)){
                        vm.addStuff(k, true);
                    }
                }

                vm.emitFilters();


                $scope.$apply();
            }

        };

        vm.getCurrentCaraul = function(){

            var tempCurrentCaraul = vm.selectedDept.caraulCrews.find(function(caraul){

                return caraul.caraulNum === storage.globalSettings.currentCaraul;
            });
            vm.currentCaraul = Object.assign({}, tempCurrentCaraul);




            /*
             console.log('111111111>>>', vm.getTotalBaseCrewCount(tempCurrentCaraul));
             vm.selectedDept.totalBaseCrewCount = vm.getTotalBaseCrewCount(tempCurrentCaraul);
             */


        };


        vm.parseDeptsObj = function(){

            var dn = null,
                depts = storage.fireDepartments,
                step = null;

            for(var i in depts){

                if(depts.hasOwnProperty(i)){

                    step = vm.deptsTree;

                    dn = (depts[i].dn.split(',')).reverse();

                    if(!!dn === true && dn instanceof Array){

                        for(var j = 0; j < dn.length; j++){

                            dn[j] = (dn[j].split('='))[1];

                            if(!!dn[j] === true){


                                if(j + 1 >= dn.length){

                                    var dName = depts[i].fireDeptName;


                                    dName = vm.removeDeptSuff(depts[i]);
                                    /*
                                     if(!!depts[i].fireDeptSuffOwn === true){
                                     dName = (depts[i].fireDeptName.replace(depts[i].fireDeptSuffOwn, '')).trim();
                                     }
                                     */


                                    if(!step.hasOwnProperty(dName)){
                                        step[dName] = {};
                                    }


                                    step[dName].dept = depts[i];

                                    /*
                                     step[dn[j]].dept = Object.assign({}, depts[i]);
                                     delete step[dn[j]].dept['$$hashKey'];
                                     */
                                } else {

                                    if(!step.hasOwnProperty(dn[j])){
                                        step[dn[j]] = {};
                                    }


                                }

                                step = step[dn[j]];
                            }



                        }

                    }

                }

            }

            // console.log('vm.deptsTree >>>', vm.deptsTree);
            depts = null;

        };






        vm.isObjectEmpty = function(obj){
            for(var key in obj){
                if(obj.hasOwnProperty(key)){
                    return false;
                }
            }
            return true;
        };






        function createTreeDom(obj){

            var childNode = null,
                ul = document.createElement('ul'),
                div = null,
                childDiv = null,
                ico = '<span class="glyphicon glyphicon-home"></span>';
            for(var key in obj){
                if(obj.hasOwnProperty(key)){
                    if(key !== 'dept'){

                        var li = document.createElement('li');
                        li.className = 'ulist-parent';

                        div = document.createElement('div');

                        if(!!obj[key].dept === true){
                            switch(obj[key].dept.fireDeptType){

                                case 0:
                                    ico = '<span class="glyphicon glyphicon-home"></span>';
                                    break;
                                case 1:
                                    ico = '<span class="glyphicon glyphicon-tag"></span>';
                                    break;
                                case 2:
                                    ico = '<i class="fa fa-truck" aria-hidden="true"></i>';
                                    break;
                                default:
                                    ico = '';
                                    break;

                            }
                        }

                        div.innerHTML = ico + '&nbsp;&nbsp;' + key;




                        div.dataset.dn = (!!obj[key].dept === true && !!obj[key].dept.dn === true)? obj[key].dept.dn : '';





                        /*
                         if(!!obj[key].info.isDept === true){
                         div.style.color = 'red';
                         }
                         */


// console.log('---->>>', key, obj, obj[key], obj[key]['dept']);

                        li.appendChild(div);

                        if(!!obj[key]['dept'] === true){

                            (function(dept, branch){

                                div.addEventListener('click', function(event){
                                    if(!!dept === true){
                                        $scope.bydepts.getDepartment(event, dept, branch);
                                    }

                                });

                            })(obj[key]['dept'].id, obj[key]);
                        }

                        if(!vm.isObjectEmpty(obj[key])){
                            var childrenUl = createTreeDom(obj[key]);
                            li.appendChild(childrenUl);
                        }
                        angular.element(ul).append(li);


                    }


                    /*

                     if(obj[key].hasOwnProperty('info') && obj[key]['info'].hasOwnProperty('ldapUsers') && obj[key]['info'].ldapUsers.length > 0){

                     var ulNode = document.createElement('ul');
                     for(var j = 0, l = obj[key]['info'].ldapUsers.length; j < l; j++){
                     childNode = document.createElement('li');
                     childNode.className = 'ulist-child';
                     // childNode.innerText = obj[key]['info'].ldapUsers[j].firstName + ' ' + obj[key]['info'].ldapUsers[j].lastName;
                     ulNode.appendChild(childNode);
                     childDiv = document.createElement('div');
                     childDiv.innerHTML = '<span class="glyphicon glyphicon-user"></span>' + ' ' + obj[key]['info'].ldapUsers[j].firstName + ' ' + obj[key]['info'].ldapUsers[j].lastName + ' (' + obj[key]['info'].ldapUsers[j].uid + ')';
                     childNode.appendChild(childDiv);

                     (function(info){
                     childDiv.addEventListener('click', function(event){
                     if(!!info === true){
                     $scope.userEdit.getInfo(info, event);
                     }


                     });

                     })(obj[key]['info'].ldapUsers[j]);

                     }
                     ul.appendChild(ulNode);
                     }

                     */

                }
            }

            return ul;
        };


        vm.createDeptsTree = function(){

            var container = document.querySelector('.depts-list-wrapper');
            if(!!container === true && container.nodeType === 1){
                container.append(createTreeDom(vm.deptsTree));
            }
        };





        vm.initOnLoad = function(){

            vm.parseDeptsObj();
            vm.createDeptsTree();

        };



        $scope.$on('$viewContentLoaded', function(event){

            vm.initOnLoad();


        });



        $scope.$on('$destroy', function(){

            if($state.$current.name !== 'fires.deptsNotes.bydept'){
                ws.$emit('getDepts', null);
/*
                storage.fireDepartments = angular.copy(storage.dataOfStates.bydept.fireDepartments.dept);
                storage.dataOfStates.frontNotesArchive.date = storage.dataOfStates.bydept.fireDepartments.date;
console.log('>>>', storage.dataOfStates.frontNotesArchive.date);



                    delete storage.dataOfStates.bydept.fireDepartments;
*/



/*
                ws.$emit(
                    'getArchivedDepts',
                    {
                        'date': new Date().getTime(),
                        transition: false
                    }
                );
*/


            }

            vm.deptsTree = vm.selectedDept = vm.currentCaraul = null;

        });


    }
})
();
