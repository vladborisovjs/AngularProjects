(function(){
    'use strict';
    angular
        .module('app.order', [])
        .controller('Order', Order);

    Order.$inject = ['$log', '$scope', 'ws', 'storage', '$location', '$stateParams', '$state', '$cookies', 'growl', 'engineTypeSortingAlgorythm', '$timeout', 'modalsService', '$http', 'Blob', 'FileSaver', 'HTTPURLDesktop', '$window', 'ShowSentTicket'];
    function Order($log, $scope, ws, storage, $location, $stateParams, $state, $cookies, growl, engineTypeSortingAlgorythm, $timeout, modalsService, $http, Blob, FileSaver, HTTPURLDesktop, $window, ShowSentTicket){




        var vm = this;
        vm.storage = storage;
        // vm.selectedFire = undefined;
        // vm.selectedFire = storage.selectedFire;
        vm.isFormDisabled = true;
        vm.infoFromFire = '';
        vm.engineTypeSortingAlgorythm = engineTypeSortingAlgorythm;
        vm.popoverTemplareUrl = 'audioTemplate.html';
        vm.lastAudioFile = '';
        vm.playbackAudio = null;
        vm.audioFile = '';
        vm.stateCalledFrom = $stateParams.calledFrom || null;
        vm.ShowSentTicket = ShowSentTicket;
        $scope.techTab = {};
        $scope.techTab.active = true;


        /*


         if($stateParams.fireId != undefined){
         vm.storage.selectedFire = _.find(storage.activeFires, function(fireAct){
         return fireAct.id === $stateParams.fireId;
         });
         } else {
         vm.storage.selectedFire = undefined;
         }

         */


        /*
         if($stateParams.fireId != undefined){
         vm.storage.selectedFire = _.find(storage.activeFires, function(fireAct){
         return fireAct.id === $stateParams.fireId;
         });
         }
         */


        /*
         if($stateParams.fireId != undefined){
         switch($stateParams.calledFrom){
         case 'firesbase':

         vm.storage.selectedFire = _.find(storage.activeFires, function(fireAct){
         return fireAct.id === $stateParams.fireId;
         });

         break;

         case 'archive':

         vm.storage.selectedFire = _.find(storage.archFireActs, function(fireAct){
         return fireAct.id === $stateParams.fireId;
         });
         if(vm.storage.selectedFire && vm.storage.selectedFire.hasOwnProperty('fireAct')){
         vm.storage.selectedFire = vm.storage.selectedFire.fireAct;
         }
         break;

         }

         } else {
         vm.storage.selectedFire = undefined;
         }*/


        vm.checkRankDifference = function(){
            if(vm.storage.selectedFire !== undefined && vm.storage.selectedFire !== null && vm.storage.selectedFire.hasOwnProperty('rankold') && vm.storage.selectedFire.rankold !== null && (/(\d+)/ig.test(vm.storage.selectedFire.rankold.sidfirerank))){
                return (/(\d+)/ig.exec(vm.storage.selectedFire.rank.sidfirerank))[0] < (/(\d+)/ig.exec(vm.storage.selectedFire.rankold.sidfirerank))[0];
            } else {
                return false;
            }
        };


        vm.showCardLog = function(){

            if(vm.storage.selectedFire !== undefined && vm.storage.selectedFire.hasOwnProperty('card112WithBean') && vm.storage.selectedFire.card112WithBean.hasOwnProperty('protocols112log') && vm.storage.selectedFire.card112WithBean.protocols112log.length > 0){
                modalsService.order(('Этапы получения карточки № ' + vm.storage.selectedFire.card112WithBean.card112.nEmergencyCardId), vm.storage.selectedFire);
            }

        };

        vm.makeCallBack = function(phone, id){
            // ws.$emit('callToZil', {fireActId: vm.storage.selectedFire.id});
            if(!!phone === true && phone.trim().length > 0){
                ws.$emit('callToZil', {
                    phone: phone,
                    id:(!!id === true)? id : null,
                    fireActId: vm.storage.selectedFire.id
                });
            }
        };


        vm.getAudioRecord = function(source){

            function stopPlayingAudio(){
                vm.lastAudioFile = '';
                vm.playbackAudio = null;
            }

            if(vm.storage.selectedFire[source]){
                vm.playbackAudio = source;
                var audioFile = './' + vm.storage.selectedFire[source];

                var audioNode = document.querySelector('#_audioNode');
                if(audioNode instanceof Object && audioNode.nodeType && audioNode.nodeType === 1){
                    audioNode.pause();
                    audioNode.currentTime = 0;
                } else {
                    audioNode = document.createElement('audio');
                    audioNode.id = '_audioNode';
                    audioNode.volume = 1;
                    // audioNode.controls = true;
                    document.body.appendChild(audioNode);
                }
                if(audioFile === vm.lastAudioFile){
                    stopPlayingAudio();
                    audioNode.parentNode.removeChild(audioNode);

                } else {
                    vm.lastAudioFile = audioNode.src = audioFile;
                    audioNode.autoplay = 'autoplay';

                    audioNode.onerror = (function(){
                        return function(){
                            stopPlayingAudio();
                            growl.error('Не удалось загрузить аудио файл', {ttl: 3000, disableCountDown: false});
                            $scope.$apply();
                        }

                    })(vm);


                    audioNode.onended = audioNode.onpause =
                        (function(){
                            return function(){
                                stopPlayingAudio();
                                $scope.$apply();
                            }

                        })(vm);
                }

                audioNode = null;
                /*
                 ws.$emit('orderAudioRecord', {
                 recordFrom: source
                 });
                 */


            } else {
                vm.playbackAudio = null;
                growl.error('Нет аудио файла', {ttl: 2000});
            }
        };


        vm.switchEditMode = function(){
            $state.go('fires.orderEdit');
            //order('Данная функция в разработке');
        };

        vm.fireNotificationsCopy = jQuery.extend([], storage.fireNotifications, true);


        vm.cancelEditMode = function(){
            vm.isFormDisabled = true;
            vm.storage.selectedFire = _.find(storage.activeFires, function(fireAct){
                return fireAct.id === $stateParams.fireId;
            });
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





        /*        vm.engineStatuse = function(currorder){
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
         /!*
         console.log('department >', department);
         console.log('engine >', engine);
         console.log('currorder.fireEngine.fireEngineState >', currorder.fireEngine.fireEngineState);
         *!/

         return statusInDept;
         //return currorder.fireEngine.fireEngineState.name; //так правильно

         };*/
        vm.onRemoveEngineFromFire = function(currorder){
            ws.$emit('removeEngineFromFire', {
                fireActId: vm.storage.selectedFire.id,
                fireEngineId: currorder.fireEngine.idFireEngine,
                fireEngineType: currorder.fireEngineType
            });
        };
        vm.onArriveEngineToFire = function(currorder){
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
            // console.log('currorder >', currorder);
            var command = {};
            var dislocation = vm.getDislocatinDept(currorder);
/*
            if(dislocation === null){
                command.deptId = currorder.fireEngineDept;
                command.deptName = currorder.departmentName;
            } else {
                command.deptId = dislocation.id;
                command.deptName = dislocation.fireDeptName;
            }
*/
            command.deptId = currorder.fireEngineDept;
            command.deptName = currorder.departmentName;


            command.engineType = currorder.fireEngineType;
            command.fireActId = vm.storage.selectedFire.id;
            command.ticket = $cookies.get('ticket');
            ws.$emit('showPathFromPchToFire', command);
        };
        vm.cancelInfo = function(){
            storage.dataOfStates.order.orderMode = 'tech';
            vm.infoFromFire = '';
        };
        vm.sendInfoMessage = function(){
            storage.dataOfStates.order.orderMode = 'tech';
            ws.$emit('sendInfoMessage', {fireActId: vm.storage.selectedFire.id, message: vm.infoFromFire});
            vm.infoFromFire = '';
        };
        vm.removeMissedEngine = function(missedEngine){
            /*case "deleteNotFoundOrder" =>
             val fireActId = data.\("fireActId").as[String]
             val engineType = data.\("engineType").as[EngineType]
             new UICommand("deleteNotFoundOrder", new DeleteNotFoundOrder(new ObjectId(fireActId), engineType, findUser(sender), sender))*/
            ws.$emit('deleteNotFoundOrder', {
                fireActId: vm.storage.selectedFire.id,
                fireAct: vm.storage.selectedFire,
                engineType: missedEngine.type
            })
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
                if(engine.hasOwnProperty('locationDeptId') && engine.locationDeptId != null){
                    var dislocationDept = _.find(storage.fireDepartments, function(dept){
                        return dept.id === engine.locationDeptId;
                    });
                    return dislocationDept;
                } else {
                    return null;
                }
            }
        };
        vm.getDislocation = function(fireEngine){
            var dept = vm.getDislocatinDept(fireEngine);
            if(dept != null){
                return "(" + dept.fireDeptName + ")";
            }
            else {
                return '';
            }

        };


        vm.showNotifyForRole = function(person){
            return person.hasOwnProperty('selectedRoles') && !!person.selectedRoles === true && person.selectedRoles.includes(storage.fireUser.role);
        };


        vm.onRemoveOrder = function(order){
            ws.$emit('removeEngineFromFire', {
                fireActId: storage.selectedFire.id,
                fireEngineId: order.fireEngine.idFireEngine,
                fireEngineType: null
            });
        };




        vm.autoCheckbox = function(person){
            person.checked = true;
        };
        vm.getModificators = function(modifiersList){
            var modString = '';
            _.each(modifiersList, function(mod){
                if(mod != _.last(modifiersList)){
                    modString += mod + ', ';
                } else {
                    modString += mod
                }
            });
            return modString
        };


        vm.downloadEvent = function(fireEngine){
            $http.defaults.withCredentials = true;

            console.dir(fireEngine);
            var url = HTTPURLDesktop + '/rest/hqboard/fire.zip';// TODO config
            // var ticket = $cookies.get('ticket');
            var fireId = vm.storage.selectedFire.id;
            var conf = {
                params: {
                    fire: fireId
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
                        console.dir(response);
                        var data = new Blob([response.data], {type: 'application/zip'});
                        FileSaver.saveAs(data, 'fire.zip');
                    },
                    function(e){
                        console.log('error', e);
                    });
        };


        vm.selectFireObjectByKeys = function($event){
            //which 49 - цифра 1
            //which 50 - цифра 2
            if($event.which >= 49 && $event.which <= 57){
                vm.selectFireObject(storage.dataOfStates.editFireOrder.objectsByHouseArray[$event.which - 49]);
            }
        };

        vm.agreePlace = function(){
            // console.log('vm.storage.selectedFire >', vm.storage.selectedFire);
            storage.hideLoadingOverlay = false;
            var message = {
                fireAct: vm.storage.selectedFire
            };
            ws.$emit('changeFireplaceOfFire', message);
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

    }
})();
