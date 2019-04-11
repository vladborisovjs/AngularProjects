(function(){
    'use strict';
    angular
        .module('app.footer', ['ui.bootstrap'])
        .controller('Footer', Footer);

    Footer.$inject = ['$log', '$scope', 'ws', 'storage', '$stateParams', '$state', '$cookies', 'engineTypeSortingAlgorythm', '$window'];
    function Footer($log, $scope, ws, storage, $stateParams, $state, $cookies, engineTypeSortingAlgorythm, $window){
        var vm = this;
        vm.storage = storage;

        vm.engineTypeSortingAlgorythm = engineTypeSortingAlgorythm;


        vm.filerForGroup = function(type){
            return !!type.group;
        };

        /*
         //TODO: Рабочая версия строки быстрого набора техники 2

        $scope.$watch(function(){
                return storage.enginesByTypes;
            },
            function(newValue, oldValue){
                vm.groupEngineTypes();
            }
        );
        vm.groupEngineTypes = function(){
            var groups = [];
            if(!!storage.fireEngineTypes === true){
                var types = storage.fireEngineTypes.filter(function(engType){
                    return !!engType.group;
                });

                types.forEach(function(type){

                    if(!!storage.enginesByTypes === true){
                        storage.enginesByTypes.find(function(engByTypes){
                            if(engByTypes.engineType === type.engineType){
                                type.countCanUse = engByTypes.countCanUse;
                                type.engineCount = engByTypes.engineCount;
                            }
                        });
                    }
                    if(!!storage.enginesAdvise === true){
                        storage.enginesAdvise.find(function(engAdvise){
                            if(engAdvise.engineType === type.engineType){
                                type.deptId = engAdvise.deptId;
                                type.deptName = engAdvise.deptName;
                                type.deptDist = engAdvise.deptDist;
                                type.fireActId = engAdvise.fireActId;
                            }
                        });
                    }

                    if(!!groups[type.group] === false){
                        groups[type.group] = [];
                    }
                    groups[type.group].push(type);

                });

            }
            groups.shift();
            // console.log('type >>>', groups);
            storage.engineTypesQuickSet = groups;
            groups = null;

        };*/

        /*
         function getDataByTypes(item){
         return
         };
         */


        /*
         vm.countCanUse = function(item){
         var count = vm.storage.enginesByTypes.find(function(eng){
         return item.engineType === eng.engineType
         });
         if(!!count === true){
         return count.engineCount + '(' + count.countCanUse + ')';
         } else {
         return '0(0)';
         }
         };
         */


        /*
         vm.defineBackgroundColor = function(item){
         // console.log('item >>>', vm.storage.fireEngineTypes);
         //ng-style="footer.defineBackgroundColor(engineTypeObj)"

         var color = vm.storage.fireEngineTypes.find(function(eng){
         return item.engineType === eng.engineType
         });

         if(!!color === true){
         color = color.color;
         } else {
         color = '#ffffff'
         }

         return {
         'background-color': color
         }
         };
         */





        vm.defineColor = function(item){
            if(item.engineKind.toUpperCase() === "СПЕЦИАЛЬНАЯ"){
                return "btn-footer-special";
            } else if(item.engineKind.toUpperCase() === "ВЫСОТНАЯ"){
                return "btn-footer-high"
            } else if(item.engineKind.toUpperCase() === "ОСНОВНАЯ"){
                return "btn-footer-primary"
            } else if(item.engineKind.toUpperCase() === "ВСПОМОГАТЕЛЬНАЯ"){
                return "btn-footer-additional"
            } else {
                return "";
            }
        };
        vm.disableAdviseBtn = function(adviseObj){
            return adviseObj.deptName === "-";
        };
        vm.showAdvise = function(){
            if(!!vm.storage.enginesAdvise === true && vm.storage.enginesAdvise instanceof Array && vm.storage.enginesAdvise.length > 0){
                return true;
            }
            return false;
            //            return angular.isDefined(vm.storage.enginesAdvise);
        };
        // console.log('enginesAdvise > ', vm.storage.enginesAdvise);
        vm.onAddEngineToFire = function(adviseObj){
            /*
             console.log('Click >>>>>>>>',  $state.is('fires.orderEdit'));
             if($state.is('fires.newFireOrder') || $state.is('fires.orderEdit')){

             console.log('1 >');

             var fireAct = {};
             if($state.is('fires.newFireOrder')){
             fireAct = storage.dataOfStates.newFireOrder.fireAct;
             }
             if($state.is('fires.orderEdit')){
             fireAct = storage.dataOfStates.editFireOrder.fireAct;
             }
             console.log('2 >', fireAct.id);
             // console.log('storage.dataOfStates.newFireOrder >', storage.dataOfStates.newFireOrder);
             //TODO: this on serverside

             var dept = _.find(storage.fireDepartments, function(dept){
             return dept.id === adviseObj.deptId;
             });

             console.log('3 >');

             var enginesList = _.filter(dept.fireEngines, function(engine){
             return (engine.engineType.engineType === adviseObj.engineType)
             });

             console.log('4 >', enginesList);

             /!*
             var trueEnginesList = _.filter(enginesList, function(engine){
             return engine.fireEngineState.canUseAutomaticMode && engine.fireEngineState.canUseManualMode;
             });
             *!/

             var engine = null;

             if(!!enginesList[0] !== false){
             engine = enginesList[0];
             }

             console.log('5 >', engine);

             if(!!engine !== false){

             console.log('6 >');

             var idFireEngine = engine.idFireEngine;
             if($state.is('fires.newFireOrder') || $state.is('fires.orderEdit')){
             ws.$emit('orderEngineManually', {
             deptId: adviseObj.deptId,
             idFireEngine: idFireEngine,
             fireAct: fireAct
             })
             } else {
             if(storage.dataOfStates.editFireOrder.canLeave){
             ws.$emit('addEngineToFireByType', {
             fireActId: adviseObj.fireActId,
             deptId: adviseObj.deptId,
             engineType: adviseObj.engineType
             });
             } else {
             ws.$emit('addPotentialToTotalOrders', {
             fireActId: adviseObj.fireActId,
             deptId: adviseObj.deptId,
             idFireEngine: idFireEngine,
             potentialEngines: _.map(storage.dataOfStates.editFireOrder.listOfAdditionalTech, function(eng){
             return {deptId: eng.deptId, idFireEngine: eng.engine.idFireEngine}
             }),
             notFoundOrders: storage.dataOfStates.editFireOrder.notFoundOrders,
             totalOrders: storage.dataOfStates.editFireOrder.totalOrders
             });

             }
             }
             }

             } else {
             */

            ws.$emit('addEngineToFireByType', {
                fireActId: adviseObj.fireActId,
                fireAct: vm.storage.selectedFire,
                deptId: adviseObj.deptId,
                engineType: adviseObj.engineType
            });
//            }
        };
        vm.selectType = function(engineTypeObj){
            $stateParams.fireType = encodeURI(engineTypeObj.engineType);
            $state.go('fires.chooseTech.bytypes', $stateParams);
        };

        vm.showPathFromPchToFire = function(adviseObj){
            var command = {};
            command.deptId = adviseObj.deptId;
            command.deptName = adviseObj.deptName;
            command.engineType = adviseObj.engineType;
            command.fireActId = adviseObj.fireActId;
            command.ticket = $cookies.get('ticket');
            ws.$emit('showPathFromPchToFire', command);
        };

        vm.getEngineDescription = function(desc){
            if(!!desc === true){
                var str = desc.indexOf("(");
                if(str !== -1){
                    desc = desc.substring(0, str);
                }
                return desc.toLowerCase();
            }
        };



        $scope.$on('$viewContentLoaded', function(event){


        });


        $scope.$on('$destroy', function(){


        });


    }

})();
