(function(){

    'use strict';
    angular
        .module('app.commands', ['ui.bootstrap'])
        .controller('Commands', Commands);

    Commands.$inject = ['$log', '$scope', 'ws', '$window', 'storage', '$cookies', 'MAPURL', '$state', '$timeout', 'getWord'];
    function Commands($log, $scope, ws, $window, storage, $cookies, MAPURL, $state, $timeout, getWord){
        var vm = this;

        storage.controllers.command = vm;

        vm.storage = storage;
        function setFocusOnEnginesButton(){
            jQuery('#enginesArrivingButton').focus();
        }

        vm.getWord = getWord;


        vm.getWordByStatuse = function(currorder){
            if(!!currorder === true){
                var statuse = vm.engineStatuse(currorder);
                if(!!statuse === true){
                    statuse = vm.storage.fireUser.ACCESS.words.hasOwnProperty(statuse.toLowerCase())? vm.storage.fireUser.ACCESS.words[statuse.toLowerCase()] : statuse;
                }
                return vm.getWord(statuse).toUpperCase();
            }
        };


        vm.isCommandDefined = function(){
            return angular.isDefined(storage.selectedFire);
            // return angular.isDefined(storage.selectedFire) && !storage.selectedFire.isReadyForF6;
        };
        /////////POPOVER//////////////
        vm.templateUrl = 'enginesOnFirePopoverTemplate.html';
        ////////////////////////////////
        storage.dataOfStates.command.showRankInputs = false;
        vm.newFireRank = null;
        vm.rankMan = null;
        vm.callRequestMan = null;
        vm.sortRanksUp = true;
        var allowGo = false;
        var allowRequestGo = false;


        vm.engineArrived = function(){
            var result = false;
            if(!!storage.selectedFire === true && !!vm.storage.selectedFire.orders === true){
                storage.selectedFire.orders.find(
                    function(eng){
                        if(eng.fireEngine.fireEngineState.name.toUpperCase() !== "СЛЕДУЕТ"){
                            result = true;
                        }

                    });
            }
            return !result;
        };


        vm.openChangeRang = function(up){
            vm.newFireRank = null;
            vm.rankMan = null;
            vm.sortRanksUp = up;
            storage.dataOfStates.command.showRankInputs = true;
            $scope.$broadcast('command_rangUISelect_focus');
        };
        vm.closeChangeRang = function(){
            storage.dataOfStates.command.showRankInputs = false;
            vm.rankMan = null;
            vm.newFireRank = null;
        };
        vm.goToInputField = function(){
            $timeout(function(){
                $('#rangTextInput').focus();
            }, 0);

        };

        vm.allowApproveButton = function(event){
            if(event.which == 13){
                allowGo = true;
            }
        };
        vm.allowApproveRequestButton = function(event){
            if(event.which == 13){
                allowRequestGo = true;
            }
        };
        vm.goToApproveButton = function(event){
            if(event.which == 13 && allowGo){
                allowGo = false;
                $timeout(function(){
                    $('#aproveRankButton').focus();
                }, 0);
            }
        };
        vm.goToApproveRequestButton = function(event){
            if(event.which == 13 && allowGo){
                allowGo = false;
                $timeout(function(){
                    $('#aproveRequestButton').focus();
                }, 0);
            }
        };
        vm.approveButtonDisabled = function(){
            if(vm.newFireRank != null && vm.newFireRank.id != undefined)
                if(vm.rankMan == null){
                    return true;
                } else {
                    return vm.rankMan.length == 0;
                }
            else return true;
        };


        vm.approveChangeRang = function(){


            /*
             function getPreviousRank(aFires) {
             if(aFires.id == storage.selectedFire.id){
             console.log(aFires);
             return true;
             }
             }

             console.log(storage.activeFires.findIndex(getPreviousRank));
             console.log('>------------------------------------');
             console.log(vm.newFireRank);
             console.log(storage.activeFires);
             console.log('------------------------------------<');

             */


            var message = {
                fireActId: storage.selectedFire.id,
                rank: vm.newFireRank,
                increase: vm.sortRanksUp,
                man: vm.rankMan
            };
            ws.$emit('changeRankOfFire', message);
            vm.closeChangeRang();
        };
        ////////////////////////////////
        vm.getDislocation = function(order){
            if(order.fireEngine.locationDeptId != null){
                var dislocationDept = _.find(storage.fireDepartments, function(dept){
                    return dept.id === order.fireEngine.locationDeptId;
                });
                if(dislocationDept === undefined){
                    return '(?)'
                } else {
                    return '(' + dislocationDept.fireDeptName + ')';
                }
            } else {
                return ''
            }
        };
        ////////////////////////////////


        vm.arriveAllEnginesToFire = function(){
            ws.$emit('arriveAllEnginesToFire', {
                fireActId: vm.storage.selectedFire.id,
                fireAct: vm.storage.selectedFire
            });
        };

        vm.onFirstStvol = function(){
            ws.$emit('changeFireActStatus', {
                fireActId: vm.storage.selectedFire.id,
                fireAct: vm.storage.selectedFire,
                newStatuse: 'firstStvol'
            });
        };
        vm.onL1 = function(){
            ws.$emit('changeFireActStatus', {
                fireActId: vm.storage.selectedFire.id,
                fireAct: vm.storage.selectedFire,
                newStatuse: 'L1'
            });
        };
        vm.onLOG = function(){
            ws.$emit('changeFireActStatus', {
                fireActId: vm.storage.selectedFire.id,
                fireAct: vm.storage.selectedFire,
                newStatuse: 'LOG'
            });
        };
        vm.onLPP = function(){
            ws.$emit('changeFireActStatus', {
                fireActId: vm.storage.selectedFire.id,
                fireAct: vm.storage.selectedFire,
                newStatuse: 'LPP'
            });
        };
        vm.onRO = function(){
            ws.$emit('changeFireActStatus', {
                fireActId: vm.storage.selectedFire.id,
                fireAct: vm.storage.selectedFire,
                newStatuse: 'RO'
            });
        };
        vm.onCancel = function(){
            ws.$emit('deleteFire', vm.storage.selectedFire.id);
        };
        vm.onLV = function(){
            ws.$emit('changeFireActStatus', {
                fireActId: vm.storage.selectedFire.id,
                fireAct: vm.storage.selectedFire,
                newStatuse: 'LV'
            });
        };
        vm.onLSS = function(){
            ws.$emit('changeFireActStatus', {
                fireActId: vm.storage.selectedFire.id,
                fireAct: vm.storage.selectedFire,
                newStatuse: 'LSS'
            });
        };

        vm.infoMode = function(){
            storage.dataOfStates.order.orderMode = 'info';
            $state.go('fires.order', {
                deptId: undefined,
                engineId: undefined,
                fireId: storage.selectedFire.id
            }, {location: true});
            $timeout(function(){
                jQuery('#orderMessageBox').focus();
            }, 30);
        };
        vm.emitSpecialTechnique = function(techniqueType){
            ws.$emit('придумать название', {fireActId: storage.selectedFire.id, tech: techniqueType});
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
                fireActId: vm.storage.selectedFire.id,
                fireEngineId: currorder.fireEngine.idFireEngine,
                fireEngineType: currorder.fireEngineType
            });
        };
        vm.onArriveEngineToFire = function(currorder){
            //setFocusOnEnginesButton();
            /*
             if(storage.dataOfStates.command.arriveCounter > 0){
             --storage.dataOfStates.command.arriveCounter;
             }
             */
            ws.$emit('arriveEngineToFire', {
                fireActId: vm.storage.selectedFire.id,
                fireAct: vm.storage.selectedFire,
                fireEngineId: currorder.fireEngine.idFireEngine
            });
        };
        vm.goToDept = function(currorder){
            $state.go('fires.chooseTech.bydept', {
                deptId: currorder.fireEngineDept,
                fireId: vm.storage.selectedFire.id
            }, {location: true});
        };
        vm.goToType = function(currorder){
            $state.go('fires.chooseTech.bytypes', {
                //deptId: currorder.fireEngineDept,
                fireType: currorder.fireEngineType.engineType,
                fireId: vm.storage.selectedFire.id
            }, {location: true});
        };
        vm.goToByTypes = function(engineType){
            $state.go('fires.chooseTech.bytypes', {
                deptId: undefined,
                fireType: engineType,
                fireId: vm.storage.selectedFire.id
            }, {location: true});
        };
        vm.showPathFromPchToFire = function(currorder){
            //setFocusOnEnginesButton();
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
            command.fireActId = vm.storage.selectedFire.id;
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
        vm.showRankButtons = function(){
            if(storage.selectedFire != undefined){
                // var selectedFireHasCarArrived = storage.selectedFire.firstCarDate != null;
                var selectedFireTypeIsFire = storage.selectedFire.incidentType.code === 1;
                // return selectedFireHasCarArrived && selectedFireTypeIsFire;
                return selectedFireTypeIsFire;
            }
        };
        vm.disableTechButton = function(){

            if(!!vm.storage.selectedFire === true){
                return !vm.storage.selectedFire.orders.find(function(eng){
                    return eng.fireEngine.fireEngineState.name === "СЛЕДУЕТ";
                });
            }

            // return storage.dataOfStates.command.arriveCounter == 0
        };
        vm.is112ButtonDisabled = function(sideServiceName){
            if(storage.selectedFire != undefined && storage.selectedFire.card112WithBean != undefined && storage.selectedFire.card112WithBean.card112 != undefined){
                switch(sideServiceName){
                    case '02':
                        return storage.selectedFire.card112WithBean.card112.lHasCard02;
                        break;
                    case '03':
                        return storage.selectedFire.card112WithBean.card112.lHasCard03;
                        break;
                    case '04':
                        return storage.selectedFire.card112WithBean.card112.lHasCard04;
                        break;
                    case 'АТ':
                        return storage.selectedFire.card112WithBean.card112.lHasCardAT;
                        break;
                    case 'ЖКХ':
                        return storage.selectedFire.card112WithBean.card112.lHasCardCommServ;
                        break;
                    default:
                        return true;
                }
            }
        };
        vm.show112ApproveButtonBlock = function(sideServiceName){
            vm.currentSideServiceName = sideServiceName;
            vm.show112ApproveButtons = true;
        };
        vm.hide112ApproveButtonBlock = function(){
            vm.currentSideServiceName = '';
            vm.show112ApproveButtons = false;
            var appButton = $window.document.querySelector('#requestUserName');
            if(!!appButton === true && appButton.nodeType === 1){
                appButton.value = '';
            }
        };
        vm.send112SideServiceAdd = function(){
            var message = {
                fireActId: storage.selectedFire.id,
                sideServiceName: vm.currentSideServiceName,
                callRequestMan: vm.callRequestMan
            };
            ws.$emit('add112SideService', message);
            vm.hide112ApproveButtonBlock();
        };
        vm.currentButtonText = '';
        vm.showApproveButtons = false;
        vm.currentButtonCallback = null;
        vm.buttonApproveShow = function(text, callback){
            vm.showApproveButtons = true;
            vm.currentButtonText = text;
            vm.currentButtonCallback = callback;
        };
        vm.buttonApprove = function(){
            vm.currentButtonCallback();
            vm.cancelButton();
        };
        vm.cancelButton = function(){
            vm.currentButtonCallback = null;
            vm.showApproveButtons = false;
            vm.currentButtonText = '';
        };
        vm.openAddMod = function(){
            vm.showModInputs = true;
            vm.modMan = '';


            if(storage.selectedFire != undefined){
                vm.tempModsList = storage.selectedFire.manualyAssignedModificators;
            } else {
                vm.tempModsList = [];
            }

        };
        vm.closeAddMod = function(){
            vm.showModInputs = false;
            vm.tempModsList = [];
            vm.modMan = '';
        };
        /*
         vm.isModActive = function(mod){
         if(storage.selectedFire != undefined && mod != undefined){
         if(storage.selectedFire.firerankModificators != undefined){
         var modInFire = _.find(storage.selectedFire.firerankModificators, function(modInFire){
         console.log('modInFire ----------->', modInFire, modInFire === mod.sidFirerankModificator, mod.sidFirerankModificator);
         return modInFire === mod.sidFirerankModificator;
         });
         if(modInFire != undefined){
         return true;
         }
         }
         }
         return false;
         };
         */


        vm.isModInTempList = function(mod){
            // console.log('---->');
            if(vm.tempModsList){
                // console.log('---->', vm.tempModsList, mod);
                /*
                 console.log('--<>', vm.tempModsList.find(function(elem){
                 return elem === mod;
                 }));
                 */

                return vm.tempModsList.find(function(elem){
                    return (elem === mod);
                });
                // return _.contains(vm.tempModsList, mod);
            }
        };


        vm.toggleModToTempList = function(mod){



            /*
             if(storage.selctedFire != undefined){
             // console.log('storage.selectedFire > ', storage.selectedFire);
             if(vm.isModInTempList(mod)){
             vm.tempModsList = _.reject(vm.tempModsList, function(modInList){
             return modInList.id === mod.id;
             })
             /!*
             vm.tempModsList = _.reject(vm.tempModsList, function(modInList){
             return modInList.id === mod.id;
             })
             *!/
             }
             } else {
             vm.tempModsList.push(mod);
             }
             */


            // vm.tempModsList.find(function(mod, key){


            if(storage.selectedFire != undefined){
                // vm.tempModsList = angular.copy(storage.selectedFire.manualyAssignedModificators);
                vm.tempModsList = storage.selectedFire.manualyAssignedModificators;

                if(vm.isModInTempList(mod.sidFirerankModificator)){
                    vm.tempModsList.map(function(modInList, key){

                        if(modInList == mod.sidFirerankModificator){

                            vm.tempModsList.splice(key, 1);
                            // delete vm.tempModsList[key];
                        }

                    });

                } else {
                    vm.tempModsList.push(mod.sidFirerankModificator);
                }
            }

            // console.log('vm.tempModsList > ', vm.tempModsList);
        };

        vm.addModsToFire = function(){
            if(storage.selectedFire != undefined){
                var message = {
                    fireActId: storage.selectedFire.id,
                    man: vm.modMan,
                    modificators: vm.tempModsList
                };
                ws.$emit('changeRankOfFire', message);
            }
            vm.closeAddMod();
        };
        vm.allowApproveModButton = function(event){
            if(event.which == 13){
                allowGo = true;
            }
        };
        vm.goToApproveModButton = function(event){
            if(event.which == 13 && allowGo){
                allowGo = false;
                $timeout(function(){
                    $('#aproveModButton').focus();
                }, 0);
            }
        };
        vm.approveModButtonDisabled = function(){
            /*
             if(vm.tempModsList.length > 0)
             if(vm.modMan == null){
             return true;
             } else {
             return vm.modMan.length == 0;
             }
             else return true;
             */


            // if(vm.modMan == null){
            // console.log('vm.modMan >', vm.modMan);
            if(vm.modMan.trim().length > 0){
                return false;
            } else {
                return true;
            }
        };


        vm.getIncidentTime = function(inc){
            function returnDate(date){
                if(!!date === true){
                    return new Date(date).toLocaleString();
                }
            };
            var dt = '[__.__.__ __:__]';

            if(!!inc === true && !!vm.storage.selectedFire === true && vm.storage.selectedFire[inc]){
                dt = returnDate(vm.storage.selectedFire[inc]);
            }
            return dt;
        };


        vm.closeAddMod();
    }
})
();
