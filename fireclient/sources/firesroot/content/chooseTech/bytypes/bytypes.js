(function(){

    'use strict';
    angular
        .module('app.chooseTech.bytypes', [])
        .controller('Bytypes', Bytypes);

    Bytypes.$inject = ['$log', '$scope', 'ws', 'storage', '$location', '$stateParams', '$state', '$rootScope', '$timeout', '$anchorScroll', '$cookies', 'showEngineHistory', 'engineTypeSortingAlgorythm', 'accentByEngineState', 'ngTableParams', '$filter'];

    function Bytypes($log, $scope, ws, storage, $location, $stateParams, $state, $rootScope, $timeout, $anchorScroll, $cookies, showEngineHistory, engineTypeSortingAlgorythm, accentByEngineState, ngTableParams, $filter){


        ws.$on('addEngineToFireManually', function(mess){
            vm.lastEmit = mess.emitId;
            vm.selectedEngines = undefined;
            vm.prepareDeptEngines();
            if(mess.hasOwnProperty('fireAct') && vm.selectedFire.id === mess.fireAct.id){
                vm.selectedFire = Object.assign({}, mess.fireAct);
            }
            // $scope.$apply();
        });


        var vm = this;
        storage.controllers.bytypes = vm;
        vm.selectedEngines = undefined;
        vm.currDeptEngine = undefined;
        vm.showStatesList = false;
        vm.codeInput = '';
        vm.possibleStates = undefined;
        vm.storage = storage;
        vm.engineTypeSortingAlgorythm = engineTypeSortingAlgorythm;
        vm.position = {
            top: '500px',
            left: '500px'
        };
        vm.commentObject = {
            engineId: null,
            comment: '',
            deptId: null
        };
        vm.isHasSelectedType = function(){
            return angular.isDefined(vm.selectedType);
        };

        vm.showHistory = showEngineHistory.init;
        vm.accentByEngineState = accentByEngineState.init;
        vm.showHideEngines = accentByEngineState.showHideEngines;

        vm.selectedFire = (!!vm.storage.selectedFire === true)? vm.storage.selectedFire : undefined;


        var depts = storage.fireDepartments;
        var engines = [];
        var deptEngines = [];


        vm.sortField = function(sorting){
            if(!!sorting === true && !!vm.selectedEngines === true){
                vm.selectedEngines.sort(function(obj1, obj2){
                    return obj1.d[sorting] - obj2.d[sorting];
                });
            }


        };


        vm.sortDirection = false;
        vm.changeSortDirection = function(){
            // console.log('vm.tableParams', vm.tableParams);
            return vm.sortDirection = (vm.sortDirection)? false : true;
        };
        vm.pchSorting = function(v1){
            if(!isNaN(parseInt(v1.d.fireDeptName, 10))){
                return parseInt(v1.d.fireDeptName, 10);
            }
            else return v1.d.fireDeptName.toLowerCase();
        };


        /*
         vm.pchSorting = function(engines){
         if(!!engines === true){
         var sortedEng;
         sortedEng = engines.sort(function(v1, v2){
         var list = {
         v1: parseInt(v1.d.fireDeptName, 10),
         v2: parseInt(v2.d.fireDeptName, 10)
         };
         if(!isNaN(list.v1) && !isNaN(list.v2)){
         return (list.v1 - list.v2);
         }
         return v1.d.fireDeptName.localeCompare(v2.d.fireDeptName);

         });
         return sortedEng;
         }
         return false;
         };
         */


        vm.prepareDeptEngines = function(){


            depts = storage.fireDepartments;
            engines = [];
            deptEngines = [];


            _.each(depts, function(dept){
                _.each(dept.fireEngines, function(eng){
                    deptEngines.push({d: dept, e: eng});
                    engines.push(eng);
                })
            });


            function getEngineDescription(desc){
                if(!!desc === true){
                    var str = desc.indexOf("(");
                    if(str !== -1){
                        desc = desc.substring(0, str);
                    }
                    return desc.toUpperCase();
                }
            };
            vm.engineTypesDetailed = {};
            vm.engineTypes = _.keys(_.groupBy(engines, function(engine){
                vm.engineTypesDetailed[engine.engineType.engineType] = getEngineDescription(engine.engineType.engineTypeName);
                return engine.engineType.engineType;
            })).sort();

            vm.selectedType = null;
            vm.additionalType = $stateParams.additionalType;

            if(angular.isDefined($stateParams.fireType)){


                vm.selectedType = decodeURI($stateParams.fireType);

                vm.selectedEngines = _.filter(deptEngines, function(de){

                    switch(vm.selectedType){

                        case 'АЦ':

                            switch(vm.additionalType){
                                case '1':
                                    return de.e.engineType.engineType === vm.selectedType && de.e.isFirstTank;
                                    break;

                                case '2':
                                    return de.e.engineType.engineType === vm.selectedType && !de.e.isFirstTank;
                                    break;

                                default:
                                    return de.e.engineType.engineType === vm.selectedType;
                            }

                            break;

                        default:

                            return de.e.engineType.engineType === vm.selectedType;

                    }
                });

                orderEngines(vm.selectedEngines);

                $timeout(function(){
                    var old = $location.hash();
                    $location.hash(vm.selectedType);
                    $anchorScroll();
                    $location.hash(old);

                }, 500);
            } else {
                vm.selectedType = undefined;
            }

        };

        function orderEngines(engines){
            // var sortedEng = engines.slice();
            let compareIdx = (idx1, idx2) =>{
                if(idx1 === -1 && idx2 === -1 || idx1 === idx2){
                    return 0
                }
                if(idx1 === -1){
                    return 1;
                }
                if(idx2 === -1){
                    return -1;
                }
                return idx1 - idx2 < 0? -1 : 1;
            };

            let compareStrings = (a, b) =>{
                if(a > b){
                    return 1;
                }
                else if(a < b){
                    return -1;
                }
                else {
                    return 0
                }
            };

            engines.sort((a, b) =>{

                const statuses = ['В РАСЧЕТЕ', 'ВП', 'ПТУ', 'ПТП'];
                let res;
                let idxA;
                let idxB;
                let statusIdxA = statuses.indexOf(a.e.fireEngineState.name);
                let statusIdxB = statuses.indexOf(b.e.fireEngineState.name);

                if(vm.selectedFire !== undefined){

                    idxA = vm.selectedFire.departmentsByDistance.indexOf(a.d.id);
                    idxB = vm.selectedFire.departmentsByDistance.indexOf(b.d.id);

                    res = compareIdx(statusIdxA, statusIdxB);
                } else {
                    res = 0;
                }
                if(res !== 0){
                    return res;
                }

                else {
                    res = compareStrings(a.e.fireEngineState.name, b.e.fireEngineState.name);

                    if(res !== 0){
                        return res;
                    }
                    else {
                        if(vm.selectedFire !== undefined){
                            res = compareIdx(idxA, idxB);
                        }
                        if(res !== 0){
                            return res;
                        }
                        else {
                            return compareStrings(a.d.fireDeptName, b.d.fireDeptName);
                        }
                    }
                }
            });
        }


        if(!!vm.selectedFire === false){
            if(angular.isDefined($stateParams.fireId)){
                vm.selectedFire = _.find(storage.activeFires, function(fireAct){
                    return fireAct.id === $stateParams.fireId;
                });
            } else {

                vm.selectedFire = undefined;
            }
        }

        vm.prepareDeptEngines();

        vm.getIndex = (dId) =>{
            return vm.selectedFire.departmentsByDistance.indexOf(dId);
        };

        vm.getAcByType = function(type){
            $state.go('fires.chooseTech.bytypes', {
                additionalType: type,
                fireType: 'АЦ',
                fireId: ((vm.selectedFire !== undefined)? vm.selectedFire.id : undefined)
            }, {location: true});

        };


        vm.getDislocation = function(departmentAndEngine){
            if(departmentAndEngine.e.locationDeptId != null){
                var dislocationDept = _.find(storage.fireDepartments, function(dept){
                    return dept.id === departmentAndEngine.e.locationDeptId;
                });
                if(dislocationDept != undefined){
                    return dislocationDept.fireDeptName;
                }
                else {
                    return '??'
                }
            } else {
                return '-'
            }
        };

        vm.getDistanceToEngineFromFire = function(de){
            var engine = de.e;
            var departmentFromArguments = de.d;
            if(vm.selectedFire){
                if(!engine.locationDeptId){
                    var distancesObject = _.find(storage.distanceToDeptsFromFires, function(distObj){
                        return distObj.fireActId === vm.selectedFire.id;
                    });
                    if(distancesObject){
                        var distToDeptObject = _.find(distancesObject.distances, function(obj){
                            return obj.deptId === departmentFromArguments.id;
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


        vm.getFireEngineStatus = function(depts){


            if(!!depts === true){

                depts.forEach(function(de){

                    de.fireEngines.forEach(function(eng){

                        return de.caraulCrews.find(function(crew){

                            crew.caraulEngines.find(function(cEng){
                                if(cEng.caraulEngine.idFireEngine === eng.idFireEngine){
                                    eng.fireEngineStatus = Object.assign({}, cEng.caraulEngine.fireEngineStatus);
                                    return true;

                                }

                            });

                        });

                    });

                });

            }

            vm.tableParams.reload();
            $scope.$apply();

        };


        vm.selectType = function(type){

            var fireType = undefined;
            var fireId = $stateParams.fireId;
            if($stateParams.fireType !== type){
                fireType = type;
            }

            vm.selectedType = type;
            vm.selectedEngines = _.filter(deptEngines, function(de){

                de.d.caraulCrews.find(function(cCrew){
                    return cCrew.caraulEngines.find(function(eng){
                        if(de.e.idFireEngine === eng.idFireEngine){
                            de.e.fireEngineStatus = Object.assign({}, eng.caraulEngine.fireEngineStatus);
                            return true;
                        }
                    })


                });

                return de.e.engineType.engineType === vm.selectedType;
            });

            // vm.selectedEngines = vm.pchSorting(vm.selectedEngines);


            $state.transitionTo($state.current, {fireType: fireType, fireId: fireId}, {notify: false});
        };


        vm.showAddToFireButton = function(de){


            if(de !== undefined){

                var name = de.e.fireEngineState.name;

                if((name == 'В РАСЧЕТЕ' || name == 'ВП' || name == 'ПТП' || name == 'ПТУ') && de.e.fireEngineState.canUse === true){
                    return true
                } else {
                    return false;
                }
            }


            /*
             if(de.e.fireEngineState.name !== 'ВП'){
             return de.e.fireEngineState.canUseManualMode || de.e.fireEngineState.canUseAutomaticMode
             } else {
             if(de.e.replacementFireEngineId){
             var replEngine = _.find(de.d.fireEngines, function(engine){
             return engine.idFireEngine === de.e.replacementFireEngineId
             });
             return replEngine.fireEngineState.canUseManualMode || replEngine.fireEngineState.canUseAutomaticMode
             }
             }
             */

        };
        vm.showStateChangeDialogue = function(event, de){
            if(de === vm.currDeptEngine){
                vm.currDeptEngine = undefined;
                vm.showStatesList = false;
            } else {
                vm.currDeptEngine = de;
                vm.position.top = event.clientY - 200;
                vm.position.left = event.clientX + 45;
                vm.getPossibleStates(de);
                vm.showStatesList = true;
                $timeout(function(){
                    $('#codeInput').focus();
                }, 100);
            }
        };


        vm.getPossibleStates = function(de){

            vm.possibleStates = _.clone(storage.states);

            /*
             var clonedStates = _.clone(storage.states);

             var removedCurrent = _(clonedStates).filter(function(state){
             return state.id !== de.e.fireEngineState.id && state.name !== 'СЛЕДУЕТ' && state.name !== 'НА ПОЖАРЕ' && state.name !== 'БРОНЬ' && state.name !== 'ВП';
             });


             switch(de.e.fireEngineState.name){
             case 'СЛЕДУЕТ':
             vm.possibleStates = undefined;
             break;
             case 'НА ПОЖАРЕ':
             vm.possibleStates = undefined;
             break;
             case 'ВП':
             vm.possibleStates = undefined;
             break;
             default :
             vm.possibleStates = removedCurrent;
             break;
             }
             */
        };


        vm.closeStateChangeDialogue = function(){
            vm.showStatesList = false;
            vm.currDeptEngine = undefined;
            vm.codeInput = '';
        };
        vm.onChangeState = function(newState){
            if(angular.isDefined(vm.currDeptEngine)){
                var command = {
                    deptId: vm.currDeptEngine.d.id,
                    engineId: vm.currDeptEngine.e.idFireEngine,
                    isFirstTank: vm.currDeptEngine.e.isFirstTank,
                    toStateId: newState.id
                };
                ws.$emit('changeState', command);
            }
            vm.closeStateChangeDialogue();
            // $scope.$apply();
        };
        vm.checkAddInfo = function(de){
            switch(de.e.fireEngineState.name){
                case 'СЛЕДУЕТ':
                    return '';
                case 'НА ПОЖАРЕ':
                    return '';
                case 'ВП':
                    var eng = _.find(de.d.fireEngines, function(engine){
                        return engine.idFireEngine === de.e.replacementFireEngineId
                    });
                    if(angular.isDefined(eng)){
                        return eng.engineType.engineType + ' ' + eng.gosNo
                    } else {
                        return 'С какой машины?'
                    }
                default :
                    return '';
            }
        };
        vm.addToFire = function(de){
            if(angular.isDefined(vm.selectedFire)){
                var command = {
                    deptId: de.d.id,
                    engineId: de.e.idFireEngine,
                    fireActId: vm.selectedFire.id,
                    fireAct: vm.selectedFire
                };
                ws.$emit('addEngineToFireManually', command);
            }
        };

        vm.changeToByDept = function(de){
            $state.go('fires.chooseTech.bydept', {deptId: de.d.id, fireType: undefined}, {location: true});
        };

        vm.findActiveFire = function(de){
            var ob = undefined;
            if((de.e.fireEngineState.name === 'СЛЕДУЕТ' || de.e.fireEngineState.name === 'НА ПОЖАРЕ') && angular.isDefined(vm.storage.activeFires)){
                _.each(vm.storage.activeFires, function(act){
                    _.each(act.orders, function(o){
                        if(o.fireEngine.idFireEngine === de.e.idFireEngine){
                            ob = {num: act.numFireAct, id: act.id};
                            de.e.fireEngineState.ob = ob;
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

        vm.showPathFromPchToFire = function(de){
            var command = {};
            var dislocation = _.find(storage.fireDepartments, function(dept){
                return dept.id === de.e.locationDeptId;
            });
            if(dislocation === undefined){
                command.deptId = de.d.id;
                command.deptName = de.d.departmentName;
            } else {
                command.deptId = dislocation.id;
                command.deptName = dislocation.fireDeptName;
            }
            command.engineType = de.e.engineType;
            command.fireActId = vm.selectedFire.id;
            command.ticket = $cookies.get('ticket');
            ws.$emit('showPathFromPchToFire', command);
        };
        vm.onEnterEmitComment = function(event){
            if(event.which == 13){
                vm.emitComment(event);
            }
        };
        vm.showCommentInput = function(dept, engine, event, index){
            event.stopPropagation();
            vm.commentObject.engineId = engine.idFireEngine;
            vm.commentObject.comment = engine.comment;
            vm.commentObject.deptId = dept.id;
            $timeout(function(){
                $("[id^=engine-comment-" + index + "]").focus();
            }, 100);
        };
        vm.closeCommentInput = function(event){
            vm.commentObject.engineId = null;
            vm.commentObject.comment = '';
            vm.commentObject.deptId = null;
            event.stopPropagation();
        };
        vm.emitComment = function(event){
            var message = {
                deptId: vm.commentObject.deptId,
                engineId: vm.commentObject.engineId,
                comment: vm.commentObject.comment
            };
            ws.$emit('changeEngineComment', message);
            vm.closeCommentInput(event);
        };
        vm.getEngineStatus = function(de){
            if(de){
                var currentCaraul = _.find(de.d.caraulCrews, function(crew){
                    return crew.caraulNum === de.d.totalCaraulNum;
                });
                var engineInCaraul = _.find(currentCaraul.caraulEngines, function(eng){
                    return eng.idFireEngine === de.e.idFireEngine;
                });

                return engineInCaraul.caraulEngine.fireEngineStatus;
            }
        };
        vm.getEngineReplacementEngineFromCaraul = function(dept, engine){
            if(dept){
                var currentCaraul = _.find(dept.caraulCrews, function(crew){
                    return crew.caraulNum === dept.totalCaraulNum;
                });
                var engineInCaraul = _.find(currentCaraul.caraulEngines, function(eng){
                    return eng.idFireEngine === engine.idFireEngine;
                });
                var eng = _.find(dept.fireEngines, function(eng){
                    return engineInCaraul.caraulEngine.replacementFireEngineId && eng.idFireEngine === engineInCaraul.caraulEngine.replacementFireEngineId
                });
                if(angular.isDefined(eng)){
                    return eng.engineType.engineType + ' ' + eng.gosNo
                } else {
                    return 'С какой машины?'
                }
            }
        };
        vm.getRelocationEngineById = function(dept, fireEngine){
            if(dept){
                var eng = _.find(dept.fireEngines, function(engine){
                    return fireEngine.replacementFireEngineId && engine.idFireEngine === fireEngine.replacementFireEngineId
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
                return true;
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
                        vm.onChangeState(solution);
                    }
                } else {
                    growl.warning('Нет элемента с таким КОДОМ');
                }
            }
        };


        vm.tableParams = new ngTableParams({}, {dataset: vm.selectedEngines});
        vm.tableParams = new ngTableParams(
            {
                noPager: true
            },
            {
                sorting: vm.sortField('fireDeptName')
                /*
                 {
                 // fireDeptName: 'desc'

                 }
                 */
            }, {
                getData: function($defer, params){
                    vm.selectedEngines = $filter('orderBy')(vm.selectedEngines, params.orderBy());
                    $defer.resolve(vm.selectedEngines);

                }
            });


        /*
         vm.lastEmit = null;
         ws.$on('$message', function(mess){
         if(mess.event == 'updateDepartments' && vm.lastEmit !== mess.emitId){
         vm.lastEmit = mess.emitId;
         vm.selectedEngines = undefined;
         vm.prepareDeptEngines();
         }
         });
         */

// console.log('vm.selectedFire >', vm.selectedFire);

        vm.lastEmit = null;
        ws.$on('$message', function(mess){
            if(mess.event == 'changeState' && vm.lastEmit !== mess.emitId){
                vm.lastEmit = mess.emitId;
                vm.prepareDeptEngines();
                // console.log('mess >', mess);
            }
        });


        $scope.$on('$viewContentLoaded', function(event, toState, toParams, fromState, fromParams){

            $timeout(function(){
                vm.getFireEngineStatus(vm.storage.fireDepartments);
            }, 10);

        });

        $scope.$on('$destroy', function(){
            vm.storage.controllers.bytypes = null;
        });


    }
})();
