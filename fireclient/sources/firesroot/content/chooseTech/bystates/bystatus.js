(function(){
    'use strict';
    angular
        .module('app.chooseTech.byState', [])
        .controller('ByState', ByState);

    ByState.$inject = ['$rootScope', '$log', '$scope', 'ws', 'storage', '$location', '$stateParams', '$state', '$anchorScroll', '$timeout', '$cookies', 'engineTypeSortingAlgorythm', 'showEngineHistory'];
    function ByState($rootScope, $log, $scope, ws, storage, $location, $stateParams, $state, $anchorScroll, $timeout, $cookies, engineTypeSortingAlgorythm, showEngineHistory){
        var vm = this;
        storage.controllers.byState = this;
        vm.storage = storage;
        vm.engineTypeSortingAlgorythm = engineTypeSortingAlgorythm;
        vm.firstViewCollection = [];
        vm.activeState = {
            id: null,
            state: '',
            engines: []
        };
        vm.getStateEngines = function(state){
            _.each(vm.storage.fireDepartments, function(dept){
                _.each(dept.fireEngines, function(engine){
                    if(engine.fireEngineState.id === state.id){
                        var newEngine = jQuery.extend(true, {}, engine);
                        newEngine.deptId = dept.id;
                        newEngine.fireDeptName = dept.fireDeptName;
                        state.engines.push(newEngine);
                    }
                })
            });
        };
        function onStateEnter(){
            vm.storage.states.forEach(function(state){
                var newElement = {
                    id: state.id,
                    name: state.name,
                    engines: []
                };
                vm.getStateEngines(newElement);
                vm.firstViewCollection.push(newElement);
            });


            /*
             var newElement = {
             id: state.id,
             name: state.name,
             engines: []
             };
             */
            /*
             var newEngine = jQuery.extend(true, {}, engine);
             newEngine.deptId = dept.id;
             newEngine.fireDeptName = dept.fireDeptName;
             state.engines.push(newEngine);
             */


            var virtualStates = {};


            storage.fireDepartments.forEach(function(dept){

                dept.fireEngines.forEach(function(eng){

                    if(!!eng.fireEngineState.id === false && eng.fireEngineState.code >= 9000){

                        if(!virtualStates.hasOwnProperty(eng.fireEngineState.code)){
                            virtualStates[eng.fireEngineState.code] = {
                                id: eng.fireEngineState.code,
                                name: eng.fireEngineState.name,
                                code: eng.fireEngineState.code,
                                engines: []
                            };
                        }
                        eng.fireDeptName = dept.fireDeptName;
                        virtualStates[eng.fireEngineState.code].engines.push(eng);
                    }
                });
            });


            for(var i in virtualStates){
                if(virtualStates.hasOwnProperty(i)){
                    vm.firstViewCollection.push(virtualStates[i]);
                }
            }


            if($state.params.paramState != undefined){
                var state = vm.firstViewCollection.find(function(state){
                    return state.id == $state.params.paramState
                });
                if(state != undefined){
                    vm.chooseState(state);
                }
            }
            virtualStates = null;
        }


        vm.pchInfo = function(engs){
            var pchNames = [];
            engs.engines.forEach(function(eng){
                if(!pchNames.includes(eng.fireDeptName)){
                    pchNames.push(eng.fireDeptName);
                    // (!!eng.fireDeptName === true)? eng.fireDeptName : (!!eng.locationDeptName === true)? eng.locationDeptName : ''

                }
            });
            return 'CO ' + pchNames.join(', ');
        };


        vm.showHistory = showEngineHistory;

        /*
         vm.showHistory = function(eng){
         var req = {
         dateFrom: new Date().setDate((new Date).getDate() - 3),
         dateTo: (new Date).getTime(),
         deptId: null,
         engineId: eng.idFireEngine,
         engineTypeId: null,
         entityId: null,
         entityType: null,
         fireId: null,
         protocol: 'enginesLogs',
         typeEvent: null,
         userId: null
         };
         $state.go('fires.chooseTech.engineStatesHistory');
         ws.$emit('adminFilterProtocol', req);
         };
         */


        vm.chooseState = function(state){
            // console.log('state1 >>>>', state);
            var paramState = undefined;
            if((!!state.id === true && vm.activeState.id === state.id) || (!!state.id === false && !!state.code === false)){
                vm.activeState = {
                    id: null,
                    state: '',
                    engines: []
                };
            } else {
                vm.activeState = state;
                var tempGroups = _.groupBy(vm.activeState.engines, function(engine){
                    return engine.engineType.engineType
                });
                vm.activeState.typeGroups = _.map(_.keys(tempGroups), function(key){
                    return {engineType: key, engines: tempGroups[key]}
                });
                paramState = state.id;
            }
            var fireType = $state.params.fireType;
            var deptId = $state.params.deptId;
            var fireId = $state.params.fireId;
            $state.transitionTo($state.current, {
                deptId: deptId,
                fireId: fireId,
                fireType: fireType,
                paramState: paramState
            }, {notify: false});

        };
        $scope.$on('$destroy', function(){
            storage.controllers.byState = null;
        });
        vm.changeToByDept = function(de){
            $state.go('fires.chooseTech.bydept', {deptId: de.deptId, fireType: undefined}, {location: true});
        };
        vm.changeToByTypes = function(engine){
            var deptId = $state.params.deptId;
            var fireType = engine.engineType.engineType;
            var fireId = $state.params.fireId;
            var paramState = $state.params.paramState;
            $state.go('fires.chooseTech.bytypes', {
                deptId: deptId,
                fireType: fireType,
                fireId: fireId,
                paramState: paramState
            }, {location: true});
        };
        vm.setStyleActive = function(state){
            return state.id == vm.activeState.id;
        };

        onStateEnter();
    }
})
();
