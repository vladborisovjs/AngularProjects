(function(){

    'use strict';
    angular
        .module('app.firebase', [])
        .controller('FireBase', FireBase);

    FireBase.$inject = ['$log', '$scope', 'ws', 'storage', '$cookies', '$stateParams', '$state', '$rootScope', '$timeout', 'globalSelectFire', 'initListLockDoc', '$window'];
    function FireBase($log, $scope, ws, storage, $cookies, $stateParams, $state, $rootScope, $timeout, globalSelectFire, initListLockDoc, $window){


        var vm = this;
        vm.storage = storage;

        vm.isExpand = true;
        vm.btnStyle = 'fa fa-arrows-v';
        vm.collapse = function(){
            if(vm.isExpand){
                vm.btnStyle = 'fa fa-compress';
                vm.isExpand = false;
            } else {
                vm.btnStyle = 'fa fa-arrows-v';
                vm.isExpand = true;
            }
        };


        delete vm.storage.dataOfStates.archiveCommand.activeFire;
        // 54

        function selectFireOnEnter(fireId){
            if(angular.isDefined(fireId)){
                storage.selectedFire = _.find(storage.activeFires, function(fireAct){
                    return fireAct.id === fireId;
                });
                //if (storage.selectedFire !== undefined) {
                if(storage.selectedFire && !storage.selectedFire.isReadyForF6){
                    ws.$emit('selectFire', {fireActId: storage.selectedFire.id, ticket: $cookies.get('ticket')});
                } else {
                    // storage.enginesAdvise = undefined;
                }
                storage.dataOfStates.command.showRankInputs = false;

            } else {
                storage.enginesAdvise = undefined;
                storage.selectedFire = undefined;
            }
        }


        vm.selectFire = globalSelectFire;

        vm.selectFireStrict = function(fireAct){
            storage.selectedFire = undefined;
            vm.selectFire(fireAct);
            initListLockDoc.init();
            storage.dataOfStates.formaViewOnly = false;


        };

        vm.formatedTech = function(activeFire){
            var counterArrive = 0;
            var baseTech = 0;
            var otherTech = 0;
            var notFoundOrdersSymbol = '';
            _.each(activeFire.orders, function(order){
                var dept = _.find(storage.fireDepartments, function(dept){
                    return dept.id == order.fireEngineDept;
                });
                if(dept){
                    var engine = _.find(dept.fireEngines, function(en){
                        return en.idFireEngine == order.fireEngine.idFireEngine;
                    });
                    if(engine){
                        switch(engine.fireEngineState.name.toUpperCase()){
                            case 'СЛЕДУЕТ':
                                counterArrive = counterArrive + 1;
                                break;
                        }
                        switch(order.fireEngineType.engineType.toUpperCase()){
                            case 'АЦ':
                                baseTech = baseTech + 1;
                                break;
                            default:
                                otherTech = otherTech + 1;
                                break;
                        }
                    }
                }
            });
            if(activeFire.hasOwnProperty('notFoundOrders') && activeFire.notFoundOrders.length > 0){
                notFoundOrdersSymbol = '*'
            }
            return baseTech + '-' + otherTech + ' (' + counterArrive + ')' + notFoundOrdersSymbol;
        };
        vm.isOldFire = function(af){
            var yesterday = new Date();
            //yesterday.setDate(yesterday.getDate() - 1);
            yesterday.setHours(0, 0, 0, 0);
            return af.startDate < yesterday

        };
        vm.chooseBackgroundColor = function(activeFire){
            var clName = '';
            if(activeFire.hasOwnProperty('id') && storage.selectedFire && storage.selectedFire.hasOwnProperty('id') && !!activeFire.id !== false && !!activeFire.id !== false && activeFire.id == storage.selectedFire.id){
                clName = 'rowbkgselected'
            }
            /*else if(activeFire.newMessagesExist){
             /!*
             if(_.last(activeFire.messageBuffer).user.uid != vm.storage.fireUser.uid){
             clName = 'rowbkgwhite';
             }
             else {
             clName = 'rowbkgwhite';
             }
             *!/
             } else {
             switch(activeFire.fireStatus.status){
             case 'Техника не набрана':
             clName = 'rowbkgpinkNoTech';
             break;
             case 'ТЕХНИКА СЛЕДУЕТ':
             clName = 'rowbkgwhite';
             break;
             case 'Техника прибыла':
             clName = 'rowbkgwhite';
             break;
             case '1-ый ствол подан':
             clName = 'rowbkgwhite';
             break;
             case 'Л1':
             clName = 'rowbkgwhite';
             break;
             case 'ЛОГ':
             clName = 'rowbkgwhite';
             break;
             case 'ЛПП':
             clName = 'rowbkgwhite';
             break;
             case 'ЛСС':
             clName = 'rowbkggray';
             break;
             case 'ЛВ':
             clName = 'rowbkgwhite';
             break;
             default :
             clName = 'rowbkgwhite';
             break;
             }
             }*/

            if(activeFire.startDate == null){
                clName += ' temporary-fire';
            }

            return clName;
        };

        vm.formatModif = function(fireAct){
            var str = '';
            if(fireAct.hasOwnProperty('firerankModificators') && fireAct.firerankModificators instanceof Array){
                for(var i = 0; i < fireAct.firerankModificators.length; i++){
                    str = str + fireAct.firerankModificators[i] + ';';
                }
            }
            return str;
        };


        //vm.choseStateIcon = function (state) {
        //    switch (state) {
        //        case 'Техника следует':
        //            return 'fa fa-bicycle fa-2x redicon';
        //        case 'Техника прибыла':
        //            return 'fa fa-pause fa-2x redicon';
        //        case '1-ый ствол подан':
        //            return 'fa fa-fire-extinguisher fa-2x redicon';
        //        case 'Л1':
        //            return 'fa fa-flask fa-2x greenicon';
        //        case 'ЛОГ':
        //            return 'fa fa-bed fa-2x greenicon';
        //        case 'ЛПП':
        //            return 'fa fa-bullhorn  fa-2x blueicon';
        //        case 'Форма 6':
        //            return 'fa fa-file-text fa-2x ';
        //        case 'ЛВ':

        //            return 'fa fa-file-text fa-2x ';
        //        case 'ЛСС':
        //            return 'fa fa-file-text fa-2x ';
        //    }
        //};

        $scope.$on('$viewContentLoaded', function(event, toState, toParams, fromState, fromParams){
            selectFireOnEnter($stateParams.fireId);
        });


        /*vm.activeFireComparator = function(v1, v2) {
         console.log('test');
         console.log(v1, v2)
         return -1
         }*/

    }

})();
