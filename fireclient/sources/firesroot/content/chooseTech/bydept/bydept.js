(function(){
    'use strict';
    angular
        .module('app.chooseTech.bydept', [])
        .controller('BydeptTech', BydeptTech);

    BydeptTech.$inject = ['$rootScope', '$log', '$scope', 'ws', 'storage', '$location', '$stateParams', '$state', '$anchorScroll', '$timeout', '$cookies', 'engineTypeSortingAlgorythm', 'getNumDept', 'showEngineHistory', 'accentByEngineState', 'engineStatusSortingAlgorythm', 'findEngineInCaraulByDept'];
    function BydeptTech($rootScope, $log, $scope, ws, storage, $location, $stateParams, $state, $anchorScroll, $timeout, $cookies, engineTypeSortingAlgorythm, getNumDept, showEngineHistory, accentByEngineState, engineStatusSortingAlgorythm, findEngineInCaraulByDept){
        var vm = this;
        storage.controllers.bydept = this;
        vm.storage = storage;
        vm.codeInput = '';
        vm.showStatesList = false;
        vm.showReplacementList = false;
        vm.showDislocationList = false;
        // $log.log('Bydept reloaded');
        vm.engineTypeSortingAlgorythm = engineTypeSortingAlgorythm;
        vm.engineStatusSortingAlgorythm = engineStatusSortingAlgorythm;
        vm.position = {
            top: '500px',
            left: '500px'
        };
        vm.selectedFire = undefined;
        vm.possibleStates = undefined;
        vm.possibleRelocations = undefined;
        vm.possibleDislocations = undefined;
        vm.currEngine = undefined;
        vm.selectedDept = undefined;
        vm.currentCaraul = undefined;
        vm.foamerOnEngines = [];
        vm.commentObject = {
            engineId: null,
            comment: ''
        };
        vm.getNumDept = getNumDept;
        vm.showHistory = showEngineHistory.init;
        vm.accentByEngineState = accentByEngineState.init;
        vm.showHideEngines = accentByEngineState.showHideEngines;


        vm.showCommentInput = function(engine, event, index){
            event.stopPropagation();
            vm.commentObject.engineId = engine.idFireEngine;
            vm.commentObject.comment = engine.comment;
            $timeout(function(){
                $("[id^=engine-comment-" + index + "]").focus();
            }, 100);
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
                deptId: $state.params.deptId,
                engineId: vm.commentObject.engineId,
                comment: vm.commentObject.comment
            };
            ws.$emit('changeEngineComment', message);
            vm.closeCommentInput(event);
        };

        vm.setEngineStatus = function(fireEngine, event){
            var message = {
                mode: 'save',
                state: fireEngine.fireEngineState,
            };
            message.state.id = fireEngine.idFireEngine;


            var message = {
                mode: 'save',
                engineId: fireEngine.idFireEngine,
                fireActId: (vm.storage.selectedFire !== undefined) ? vm.storage.selectedFire.id : null,
                fireEngineState: fireEngine.fireEngineState
            };


            ws.$emit('changeEngineAttribs', message);
        };


        vm.toggleEngineState = function(state, fireEngine){

            ws.$emit('toggleEngineState',
                {
                    deptId: $state.params.deptId,
                    engineId: fireEngine.idFireEngine,
                    canUse: state
                }
            );
        };


        vm.initializeCurrentDeptAndCaraul = function(selectedDeptId){
            vm.selectedDept = _.find(storage.fireDepartments, function(dept){
                return dept.id === selectedDeptId;
            });
            var tempCurrentCaraul = _.find(vm.selectedDept.caraulCrews, function(caraul){
                return caraul.caraulNum === storage.globalSettings.currentCaraul;
            });
            // vm.currentCaraul = angular.merge({}, tempCurrentCaraul);
            vm.currentCaraul = Object.assign({}, tempCurrentCaraul);
            //Массив в котором хранятся копии значений количества ПО в машинах
            vm.foamerOnEngines = _.map(vm.selectedDept.fireEngines, function(engine){
                return {idFireEngine: engine.idFireEngine, foamerCount: engine.foamerCount};
            })
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


        vm.getEnginesState = function(dept){
            dept.fireEngines.forEach(function(eng){
                var caraulEng = findEngineInCaraulByDept(eng);
                if(!!caraulEng === true){
                    eng.fireEngineStatus = Object.assign({}, caraulEng.caraulEngine.fireEngineStatus);
                }
/*
                dept.caraulCrews.find(function(cCrew){
                    return cCrew.caraulEngines.find(function(aEng){
                        if(aEng.idFireEngine === eng.idFireEngine){
                            eng.fireEngineStatus = Object.assign({}, aEng.caraulEngine.fireEngineStatus);
                            // console.log('eng.fireEngineStatus', eng);
                            return true;
                        }
                    });

                });
*/
            });
        };


        if(angular.isDefined($state.params.deptId)){
            vm.initializeCurrentDeptAndCaraul($state.params.deptId);

            $timeout(function(){
                var old = $location.hash();
                $location.hash(vm.selectedDept.id);
                $anchorScroll();
                $location.hash(old);

/*
                console.log('------------------------------------------------------------------');
                vm.getEnginesState(vm.selectedDept);
*/
            }, 500);
        } else {
            vm.selectedDept = undefined;
            vm.currentCaraul = undefined;
            vm.aso = undefined;
        }

        if(angular.isDefined($state.params.fireId)){
            vm.selectedFire = _.find(storage.activeFires, function(fireAct){
                return fireAct.id === $state.params.fireId;
            });
        } else {
            vm.selectedFire = undefined;
        }


        vm.selectDept = function(dept){


            var deptId = undefined;
            var fireId = $state.params.fireId;
            if($state.params.deptId !== dept.id){
                deptId = dept.id;
                // vm.getEnginesState(dept);
                vm.initializeCurrentDeptAndCaraul(deptId);

            } else {
                vm.selectedDept = undefined;
                vm.currentCaraul = undefined;
                vm.aso = undefined;
            }
            $state.transitionTo($state.current, {deptId: deptId, fireId: fireId}, {notify: false});
        };

        vm.getPossibleStates = function(engine){
            //var clonedStates = _.clone(storage.States);
            var clonedStates = jQuery.extend([], storage.states);


            vm.possibleStates = clonedStates;
            /*
             if (storage.isRoot) {
             vm.possibleStates = clonedStates;
             } else {
             var removedCurrent = _.filter(clonedStates, function (state) {
             if (angular.isDefined(vm.possibleRelocations) && Array.isArray(vm.possibleRelocations) && vm.possibleRelocations.length > 0) {
             return state.id !== engine.fireEngineState.id && state.name !== 'СЛЕДУЕТ' && state.name !== 'НА ПОЖАРЕ' && state.name !== 'БРОНЬ' && state.name !== 'ПЕРЕДИСЛОКАЦИЯ';
             } else {
             return state.id !== engine.fireEngineState.id && state.name !== 'СЛЕДУЕТ' && state.name !== 'НА ПОЖАРЕ' && state.name !== 'БРОНЬ' && state.name !== 'ПЕРЕДИСЛОКАЦИЯ' && state.name !== 'ВП';
             }

             });
             switch (engine.fireEngineState.name) {
             case 'СЛЕДУЕТ':
             vm.possibleStates = undefined;
             break;
             case 'НА ПОЖАРЕ':
             vm.possibleStates = undefined;
             break;
             default :
             vm.possibleStates = removedCurrent;
             }
             }
             */


        };


        vm.getPossibleDislocations = function(engine){
            var allDislocations = _.map(storage.fireDepartments, function(dept){
                return {id: dept.id, fireDeptName: dept.fireDeptName}
            });
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
            // allDislocations.splice(indexToDelete, 1);
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
                        // return (eng.fireEngineState.canUseManualMode || eng.fireEngineState.canUseAutomaticMode)
                        //     && eng.idFireEngine != engine.idFireEngine && eng.fireEngineState.name !== 'ВП' && eng.fireEngineId !== engine.replacementFireEngineId;
                    } else {
                        return eng.idFireEngine != engine.idFireEngine && eng.fireEngineState.name !== 'ВП';
                        /*
                         return (eng.fireEngineState.canUseManualMode || eng.fireEngineState.canUseAutomaticMode)
                         && eng.idFireEngine != engine.idFireEngine && eng.fireEngineState.name !== 'ВП';
                         */
                    }
                    /*
                     if(engine.replacementFireEngineId){
                     return (eng.fireEngineState.canUseManualMode || eng.fireEngineState.canUseAutomaticMode)
                     && eng.idFireEngine != engine.idFireEngine && eng.fireEngineState.name !== 'ВП' && eng.fireEngineId !== engine.replacementFireEngineId;
                     } else {
                     return (eng.fireEngineState.canUseManualMode || eng.fireEngineState.canUseAutomaticMode)
                     && eng.idFireEngine != engine.idFireEngine && eng.fireEngineState.name !== 'ВП';
                     }
                     */
                });
                vm.getPossibleStates(engine);
                vm.showStatesList = true;
                vm.showReplacementList = false
                $timeout(function(){
                    $('#codeInput').focus();
                }, 100);
            }
        };

        vm.showDislocationChangeDialogue = function(event, engine){
            if(engine === vm.currEngine){
                vm.currEngine = undefined;
                vm.showDislocationList = false;
            } else {
                vm.currEngine = engine;
                vm.position.top = event.clientY - 200;
                vm.position.left = event.clientX + 45;
                vm.getPossibleDislocations(engine);
                vm.showDislocationList = true;
                vm.showStatesList = false;
                vm.showReplacementList = false;
            }

        };

        vm.closeStatuseChangeDialogue = function(){
            vm.currEngine = undefined;
            vm.showStatesList = false;
            vm.currentFireEngine = undefined;
            vm.codeInput = '';
        };

        vm.closeDislocationChangeDialogue = function(){
            vm.currEngine = undefined;
            vm.showDislocationList = false;
            vm.currentFireEngine = undefined;
            vm.longRelocation = false;
        };

        vm.showReplacementDialogue = function($event, engine){
            if(engine === vm.currEngine){
                vm.currEngine = undefined;
                vm.showReplacementList = false;
                vm.currentFireEngine = undefined;
            } else {
                vm.currEngine = engine;
                vm.possibleRelocations = _.filter(vm.selectedDept.fireEngines, function(eng){
                    return eng.idFireEngine != engine.idFireEngine && eng.fireEngineState.name !== 'ВП' && eng.idFireEngine != engine.replacementFireEngineId;
                    /*                    return (eng.fireEngineState.canUseManualMode || eng.fireEngineState.canUseAutomaticMode)
                     && eng.idFireEngine != engine.idFireEngine && eng.fireEngineState.name !== 'ВП' && eng.idFireEngine != engine.replacementFireEngineId;*/
                });
                vm.position.top = $event.clientY - 200;
                vm.position.left = $event.clientX + 45;
                vm.showReplacementList = true;
                vm.showStatesList = false;
            }
        };

        vm.onChangeStatuse = function(newState){
            if(angular.isDefined(vm.selectedDept) && angular.isDefined(vm.currEngine)){
                // if(newState.name != 'ВП'){
                var command = {
                    deptId: vm.selectedDept.id,
                    engineId: vm.currEngine.idFireEngine,
                    isFirstTank: vm.currEngine.isFirstTank,
                    toStateId: newState.id
                };
                ws.$emit('changeState', command);
                /*
                 } else {
                 vm.currEngine.fireEngineState = newState;
                 }
                 */
            }
            vm.closeStatuseChangeDialogue();
        };

        vm.onChangeState = function(newState){
            if(angular.isDefined(vm.currEngine)){
                var command = {
                    deptId: vm.selectedDept.id,
                    engineId: vm.currEngine.idFireEngine,
                    isFirstTank: vm.currEngine.isFirstTank,
                    toStateId: newState.id
                };
                ws.$emit('changeState', command);
            }
            vm.closeStateChangeDialogue();
            // $scope.$apply();
        };


        vm.closeStateChangeDialogue = function(){
            vm.showStatesList = false;
            vm.currDeptEngine = undefined;
            vm.codeInput = '';
        };

        vm.longRelocation = false;

        vm.onChangeDislocation = function(newDislocation){
            if(angular.isDefined(vm.selectedDept) && angular.isDefined(vm.currEngine)){
                var command = {
                    deptId: vm.selectedDept.id,
                    engineId: vm.currEngine.idFireEngine,
                    toDeptId: newDislocation.id,
                    timeRelocation: ((!!vm.longRelocation === true)? new Date().getTime() : 0)
                };
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

        //Поле ГДЗС
        vm.getCaraulSmokeProtection = function(engine){
            return _.find(vm.currentCaraul.smokeProtectionCrewCount, function(crewCount){
                return crewCount.key === engine.idFireEngine;
            });
        };

        //Поле ГД
        vm.getAdditionalCaraulSmokeProtection = function(engine){
            return _.find(vm.currentCaraul.additionalSmokeProtectionCrewCount, function(crewCount){
                return crewCount.key === engine.idFireEngine;
            });
        };

        vm.getFoamOnEngine = function(engineId){
            return _.find(vm.foamerOnEngines, function(obj){
                return obj.idFireEngine === engineId;
            })
        };

        vm.getCaraulBaseCrew = function(engine){
            return _.find(vm.currentCaraul.baseCrewCount, function(crewCount){
                return crewCount.key === engine.idFireEngine;
            });
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

        };

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
        vm.calculateByFaceCrewCount = function(){
            vm.currentCaraul.byFaceCrewCount = vm.currentCaraul.atListCrewCount + vm.currentCaraul.attachedCrewCount - (vm.currentCaraul.illCrewCount + vm.currentCaraul.restCrewCount + vm.currentCaraul.detachedCrewCount + vm.currentCaraul.freeCrewCount);
        };

        vm.closeReplacementDialogue = function(){
            vm.showReplacementList = false;
        };




        vm.showAddToFireButton = function(fireEngine){
           // console.log(fireEngine, ' < >', fireEngine.fireEngineState.name, ' -- 2 -- ', fireEngine.fireEngineState.canUse);

            if(fireEngine !== undefined){
                var name = fireEngine.fireEngineState.name;

                if((name === 'В РАСЧЕТЕ' || name === 'ВП' || name === 'ПТП' || name === 'ПТУ') && fireEngine.fireEngineState.canUse === true){
                    return true
                } else {
                    return false;
                }


            }

            /*
             if(angular.isDefined(fireEngine)){
             if(fireEngine.fireEngineState.name !== 'ВП'){
             return fireEngine.fireEngineState.canUseManualMode || fireEngine.fireEngineState.canUseAutomaticMode
             } else {
             var replEngine = _.find(vm.selectedDept.fireEngines, function(engine){
             return engine.idFireEngine === fireEngine.replacementFireEngineId
             });

             if(replEngine != null){
             return replEngine.fireEngineState.canUseManualMode || replEngine.fireEngineState.canUseAutomaticMode
             } else return false;

             }
             }
             */
        };

        vm.saveCaraul = function(){
            _.each(vm.currentCaraul.smokeProtectionCrewCount, function(elem){
                if(elem.value === null){
                    elem.value = 0;
                }
            });
            _.each(vm.currentCaraul.baseCrewCount, function(elem){
                if(elem.value === null){
                    elem.value = 0;
                }
            });
            _.each(vm.currentCaraul.additionalSmokeProtectionCrewCount, function(elem){
                if(elem.value === null){
                    elem.value = 0;
                }
            });

            _.each(vm.foamerOnEngines, function(foam){
                if(foam.foamerCount === null){
                    foam.foamerCount = 0;
                }
            });
            if(vm.selectedDept.foamOnStock === null){
                vm.selectedDept.foamOnStock = 0
            }

            var command = {
                deptId: vm.selectedDept.id,
                caraul: vm.currentCaraul,
                foamerOnEngines: vm.foamerOnEngines,
                //TODO добавить поле резерва ПО в ПЧ
                foamOnStock: vm.selectedDept.foamOnStock
            };
            ws.$emit('saveCaraul', command);
            vm.selectedDept = undefined;
            vm.currentCaraul = undefined;
            vm.aso = undefined;
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
        vm.changeGlobalCaraul = function(){
            ws.$emit('tmpChangeCaraul', '');
        };

        vm.addToFire = function(engine){
            if(angular.isDefined(vm.storage.selectedFire) && angular.isDefined(vm.selectedDept)){
                var command = {
                    deptId: vm.selectedDept.id,
                    engineId: engine.idFireEngine,
                    fireActId: vm.storage.selectedFire.id,
                    fireAct: vm.storage.selectedFire
                };
                ws.$emit('addEngineToFireManually', command);
            }
        };

        $scope.onDrop = function(data, event, fireEngine){
            if(angular.isDefined(vm.selectedDept)){
                var equip = data['json/custom-object'];
                var command = {
                    deptId: vm.selectedDept.id,
                    engineId: fireEngine.idFireEngine,
                    equipId: equip.idFireEquipment
                };
                ws.$emit('addEquipToFireEngine', command);
            }
        };
        $scope.onDragOver = function(event){
        };

        vm.removeEqFromEngine = function(fireEngine, eq){
            var command = {
                deptId: vm.selectedDept.id,
                engineId: fireEngine.idFireEngine,
                equipId: eq.idFireEquipment
            };
            ws.$emit('removeEquipFromFireEngine', command);
        };

        vm.getEqIcon = function(eq){
            switch(eq.code){
                case '1':
                    return 'glyphicon-scissors';
                case '2':
                    return 'glyphicon-blackboard';
                case '3':
                    return 'glyphicon-equalizer';
                case '4':
                    return 'glyphicon-piggy-bank';
                case '5':
                    return 'glyphicon-knight';
            }
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


        vm.showPathFromPchToFire = function(selectedDept){
            var command = {};
            command.deptId = selectedDept.id;
            command.deptName = selectedDept.departmentName;
            command.engineType = '';
            command.fireActId = vm.selectedFire.id;
            command.ticket = $cookies.get('ticket');
            ws.$emit('showPathFromPchToFire', command);
        };


        vm.showCombatNotesButton = function(){
            return !!$stateParams.deptId && storage.stateKeeper.oldState == 'fires.deptsNote.bydept';
        };

        vm.toCombatNotes = function(dept){
            if(!!dept === true){
                $state.go('fires.deptsNote.bydept');
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
        vm.changeRepairState = function(eq){
            var message = {
                eq: eq,
                deptId: vm.selectedDept.id
            };
            ws.$emit('byDeptChangeEqRepairState', message);
        };
        vm.getEngineStatus = function(engine){
            if(vm.selectedDept){
                var currentCaraul = _.find(vm.selectedDept.caraulCrews, function(crew){
                    return crew.caraulNum === vm.selectedDept.totalCaraulNum;
                });
                var engineInCaraul = _.find(currentCaraul.caraulEngines, function(eng){
                    return eng.idFireEngine === engine.idFireEngine;
                });
                return engineInCaraul.caraulEngine.fireEngineStatus;
            }
        };
        vm.getEngineReplacementEngineFromCaraul = function(engine){
            if(vm.selectedDept){
                var currentCaraul = _.find(vm.selectedDept.caraulCrews, function(crew){
                    return crew.caraulNum === vm.selectedDept.totalCaraulNum;
                });
                var engineInCaraul = _.find(currentCaraul.caraulEngines, function(eng){
                    return eng.idFireEngine === engine.idFireEngine;
                });
                var eng = _.find(vm.selectedDept.fireEngines, function(eng){
                    return engineInCaraul.caraulEngine.replacementFireEngineId && eng.idFireEngine === engineInCaraul.caraulEngine.replacementFireEngineId
                });
                if(angular.isDefined(eng)){
                    return eng.engineType.engineType + ' ' + eng.gosNo
                } else {
                    return 'С какой машины?'
                }
            }
        };
        vm.codeCorrect = function(state){
            return state.code == parseInt(vm.codeInput);
        };
        vm.codeFilter = function(item){
            if(vm.codeInput != ''){
                var str = item.code.toString();
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
                    var solution = _.find(storage.states, function(solution){
                        return solution.code == vm.codeInput;
                    });
                    if(solution != undefined){
                        vm.onChangeStatuse(solution);
                    }
                } else {
                    growl.warning('Нет элемента с таким КОДОМ')
                }
            }

        };

        $scope.$on('$viewContentLoaded', function(event, toState, toParams, fromState, fromParams){
            if(vm.selectedDept){
                // console.log('vm.selectedDept >>>', vm.selectedDept);
                vm.getEnginesState(vm.selectedDept);
            }
        });


        $scope.$on('$destroy', function(){
            storage.controllers.bydept = null;
        });
    }
})();
