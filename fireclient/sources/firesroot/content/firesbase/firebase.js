(function(){

    'use strict';
    angular
        .module('app.firebase', [])
        .controller('FireBase', FireBase);

    FireBase.$inject = ['$log', '$scope', 'ws', 'storage', '$cookies', '$stateParams', '$state', '$rootScope', '$timeout', 'globalSelectFire', 'initListLockDoc', '$window', 'getWord'];
    function FireBase($log, $scope, ws, storage, $cookies, $stateParams, $state, $rootScope, $timeout, globalSelectFire, initListLockDoc, $window, getWord){


        var vm = this;
        vm.storage = storage;
        vm.getWord = getWord;
        vm.selectFire = globalSelectFire;
        vm.dblClickControl = {
            time: 0,
            id: null
        };


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


        vm.makeSelectFire = function(fire){


            if(!!fire === true){

                var rows = $window.document.body.querySelectorAll('.rowbkgselected');
                if(!!rows === true){
                    for(var i = 0, l = rows.length; i < l; i++){
                        if(rows[i].dataset.fireId !== fire.id){
                            rows[i].classList.remove('rowbkgselected');
                        }
                    }
                }


                vm.selectFire(fire);
                var control = new Date().getTime() - vm.dblClickControl.time;
                if(vm.dblClickControl.id === fire.id && control < 300 && control > 0){

                    $state.go(('fires.newFireCard'), {
                            calledFrom: 'newFireCard',
                            fireId: vm.storage.selectedFire? vm.storage.selectedFire.id : undefined
                        });

                }


                vm.dblClickControl = {
                    time: new Date().getTime(),
                    id: fire.id
                };


                // console.log('dblClickControl >', vm.dblClickControl, control);


                rows = null;
            }


        };


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
                    if(!!engine === true && !!engine.fireEngineState === true && !!engine.fireEngineState.name === true){
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


            /*
             if(activeFire.firePlace.address.code != 141){
             clName += ' other-region';
             }
             */
            // console.log('clName >', clName);
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


        vm.onStateEnter = function(){
            if(!!$stateParams.scrollTo === true){
                var viewWrapper = $window.document.querySelector('#active-fires-wrapper');
                if(viewWrapper instanceof Object && viewWrapper.nodeType === 1){
                    $timeout(function(){
                        viewWrapper.scrollTop = $stateParams.scrollTo;
                    }, 0);

                }
            }
        };


        var bodyView = null,
            node_messagebox = null;

        $scope.$on('$viewContentLoaded', function(event, toState, toParams, fromState, fromParams){


//TODO: сделано для имитации карточек от 112
            if(typeof _cards112 !== 'undefined'){
                storage.cards112 = JSON.parse(JSON.stringify(_cards112));
            }


            vm.onStateEnter();

            bodyView = $window.document.querySelector('body');
            node_messagebox = $window.document.body.querySelector('#messagebox');


            if(!!bodyView === true && bodyView.nodeType === 1){

                if($state.current.name === 'fires.firesbase'){

                    bodyView.addEventListener('click', function(event){
                        if(!!event === true && !!node_messagebox === true && node_messagebox.nodeType === 1 && event.target.nodeName !== 'INPUT' && !!vm.storage.controllers.fires.isCommandsInputFocus === false){
                            node_messagebox.focus();
                        };


                        /*
                         if(!!document.activeElement === true){

                         console.log('1 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>', document.activeElement.nodeName, $state.current.name);


                         if($state.current.name === 'fires.firesbase'){
                         vm.lastNode;
                         }
                         }
                         */

                    });

                }
            }


            /*
             var node = $window.document.body.querySelector('#messagebox');
             if(!!node === true && node.nodeType === 1){
             node.addEventListener('blur', function(event){

             if(event !== undefined && !!event === true){
             if($state.current.name === 'fires.firesbase'){
             console.log('1 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>', event);
             // event.srcElement.autofocus();
             node.focus();
             }
             }
             });


             }
             */


            // selectFireOnEnter($stateParams.fireId);
        });


        /*vm.activeFireComparator = function(v1, v2) {
         console.log('test');
         console.log(v1, v2)
         return -1
         }*/


        $scope.$on('$destroy', function(){
            node_messagebox = bodyView = null;

        });


    }

})();
