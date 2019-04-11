(function(){
    'use strict';
    angular
        .module('app.newFireOrder', [])
        .controller('NewFireOrder', NewFireOrder)
        .run(['ws', 'storage', '$rootScope', 'growl', '$log', '$state', '$timeout', function(ws, storage, $rootScope, growl, $log, $state, $timeout){
            ws.$on('findByCoords', function(message){
                // if(storage.dataOfStates.newFireOrder.canLeave){

                //storage.dataOfStates.newFireOrder.fireAct.orders=[];
                // storage.dataOfStates.newFireOrder.fireAct;

                storage.dataOfStates.newFireOrder.actFromMap = true;
                storage.dataOfStates.newFireOrder.fireAct.incidentType = angular.copy(message.incidentType);
                storage.dataOfStates.newFireOrder.fireAct.firePlace = angular.copy(message.place);
                storage.dataOfStates.newFireOrder.objectsByHouseArray = angular.copy(message.fireObjects || []);
                storage.dataOfStates.newFireOrder.crossesArray = angular.copy(message.crosses || []);
                storage.dataOfStates.newFireOrder.housesArray = angular.copy(message.houses || []);

                // console.log('message', JSON.stringify(storage.dataOfStates.newFireOrder));

                // temporaryMessage

                // $state.go('fires.newFireOrder', {deptId: undefined, fireId: undefined}, {reload: true});
                $state.go('fires.newFireOrder', {
                    deptId: undefined,
                    fireId: undefined,
                    fireType: (message.place.region.code == 1141) ? 3 : undefined
                }, {reload: true});
                $rootScope.$apply();
                /*
                 } else {
                 event.preventDefault();
                 growl.warning('Вы должны отменить бронь техники или создать заявку!');

                 }
                 */
            });
            ws.$on('listSubdistricts', function(message){
                if(message != undefined){
                    storage.subDistricts = message;
                    // console.log('storage.subDistricts >', storage.subDistricts);
                }
            });
        }])
        .filter('toTimeStringFromTimestamp', function(){
            return function(input){
                if(input){
                    return new Date(input).toLocaleString();
                } else {
                    return '';
                }
            };
        });


    NewFireOrder.$inject = ['$log', '$scope', 'ws', 'storage', '$location', '$stateParams', '$state', '$cookies', '$timeout', 'engineTypeSortingAlgorythm', 'houseSorting', 'getNumDept', 'growl', '$parse', 'modalsService', '$window', 'globalSelectFire', '$rootScope', 'ShowSentTicket', '$http', 'HTTPURLDesktop'];

    function NewFireOrder($log, $scope, ws, storage, $location, $stateParams, $state, $cookies, $timeout, engineTypeSortingAlgorythm, houseSorting, getNumDept, growl, $parse, modalsService, $window, globalSelectFire, $rootScope, ShowSentTicket, $http, HTTPURLDesktop){


        var vm = this;


        ws.$on('route', function(message){
            // console.log('vm.fireAct >', JSON.stringify(vm.fireAct))
            // console.log('message > ', JSON.stringify(message));
            storage.hideLoadingOverlay = true;
            storage.dataOfStates.newFireOrder.canLeave = false;
            //storage.dataOfStates.newFireOrder.fireAct = jQuery.extend({}, message, true);
            //angular.merge(storage.dataOfStates.newFireOrder.fireAct, message);

            // angular.copy(message.id, vm.fireAct.id);
            storage.dataOfStates.newFireOrder.fireAct = angular.copy(message);
            vm.fireAct = storage.dataOfStates.newFireOrder.fireAct;
            // console.log(' > ', storage);
            // storage.dataOfStates.newFireOrder.fireAct = message;

            storage.dataOfStates.newFireOrder.listOfAdditionalTech = _.map(message.potentialEngines, function(eng){
                var dept = _.find(storage.fireDepartments, function(dept){
                    return dept.id === eng.deptId;
                });
                var engine = _.find(dept.fireEngines, function(engine){
                    // console.log('engine > ', `engine.fireEngineState.name, engine.fireEngineState.onDuty);
                    return engine.idFireEngine === eng.idFireEngine;
                });
                return {fireDeptName: dept.fireDeptName, deptId: dept.id, engine: engine}
            });


            vm.fireAct.id = '' + message.id;


            // storage.selectedFire = storage.dataOfStates.newFireOrder.fireAct;
            storage.dataOfStates.newFireOrder.fireAct = angular.copy(message);
            ws.$emit('selectFire', {fireActId: vm.fireAct.id});
            // ws.$emit('selectFire', {fireActId: vm.fireAct.id, ticket: $cookies.get('ticket')});
            // $state.transitionTo($state.current, {fireId: vm.fireAct.id}, {notify: false});
            // console.log('fireType -----> ', JSON.stringify(vm.storage.dataOfStates.newFireOrder.mode));


            $state.go($state.current, {
                'fireId': vm.fireAct.id,
                'fireType': vm.storage.dataOfStates.newFireOrder.mode
            }, {notify: false});


            // console.log(JSON.stringify(vm.fireAct));

            // storage.selectedFire.id = null;
// console.log('storage.selectedFire >', storage.selectedFire);

            message = null;
            $timeout(function(){
                jQuery('#flow-create-fire').focus();
            }, 0);
            $scope.$apply();
        });


        storage.dataOfStates.newFireOrder.canLeave = true;
        var baseIncidentType = _.find(storage.incidentTypes, function(type){
            return type.code === 1
        });
        var baseIncidentSource = _.find(storage.incidentSources, function(source){
            return source.code == 1;
        });

        vm.playbackAudio = null;
        vm.popoverTemplareUrl = 'audioTemplate.html';

        var cleanAddress = {
            settName: null,
            settId: -1,
            district: null,
            geomX: 0,
            geomY: 0,
            street: null,
            naStreet: true,
            house: null,
            naHouse: true
        };
        var defaultRank = {
            "id": "54ace61c912c2836e697076d",
            "sidfirerank": "1",
            "namefirerank": "1",
            "code": 1,
            "fireEngineTypes": [
                {
                    "engineTypeId": "5679129b65901f9d5aa23956",
                    "count": 2
                }
            ],
            "icon": "",
            "iconColor": ""
        };
        var defaultRegion = _.find(storage.regions, function(region){
            return region.code === 141;
        });
        var LORegion = _.find(storage.regions, function(region){
            return region.code === 1141;
        });

        var cleanNewFireAct = {
            id: null,
            incidentType: baseIncidentType,
            incidentSource: baseIncidentSource,
            firePlace: {
                region: defaultRegion,
                address: cleanAddress,
                crossStreet: null,
                fireObject: null,
                geomX: 0,
                geomY: 0,
                pchName: null,
                pchId: null,
                triplet: null
            },
            rank: defaultRank,
            comment: '',
            floor: null,
            floors: null,
            flat: null,
            doorCode: null
        };

        vm.houseValue = '';

        storage.dataOfStates.newFireOrder.settings = {
            isHousesEmitSending: false
        };


        function cleanArrays(){
            delete storage.dataOfStates.newFireOrder.streetsArray;
            storage.dataOfStates.newFireOrder.streetsArray = [];

            delete storage.dataOfStates.newFireOrder.housesArray;
            storage.dataOfStates.newFireOrder.housesArray = [];

            delete storage.dataOfStates.newFireOrder.objectsArray;
            storage.dataOfStates.newFireOrder.objectsArray = [];

            delete storage.dataOfStates.newFireOrder.objectsByHouseArray;
            storage.dataOfStates.newFireOrder.objectsByHouseArray = [];

            delete storage.dataOfStates.newFireOrder.tripletsArray;
            storage.dataOfStates.newFireOrder.tripletsArray = [];

            delete storage.dataOfStates.newFireOrder.crossesArray;
            storage.dataOfStates.newFireOrder.crossesArray = [];

            delete storage.dataOfStates.newFireOrder.listOfAdditionalTech;
            storage.dataOfStates.newFireOrder.listOfAdditionalTech = [];
        }


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


        vm.makeCallBack = function(phone, id){
            if(!!phone === true && phone.trim().length > 0){
                ws.$emit('callToZil', {
                    phone: phone,
                    id: (!!id === true) ? id : null,
                    fireActId: vm.storage.selectedFire.id
                });
            }
        };


        function onStateEnter(){
            storage.selectedFire = undefined;
            storage.enginesAdvise = undefined;
            var tempAct = {};

            function migrateFields112ToFireAct(){

                // cleanNewFireAct.id = '' + tempAct.id;
                cleanNewFireAct.id = (!!tempAct.id === true) ? tempAct.id : null;
                cleanNewFireAct.firePlace = Object.assign({}, tempAct.firePlace);
                // cleanNewFireAct.firePlace = angular.copy(tempAct.firePlace);
                cleanNewFireAct.doorCode = '' + tempAct.doorCode;
                cleanNewFireAct.flat = '' + tempAct.flat;
                cleanNewFireAct.floor = '' + tempAct.floor;
                cleanNewFireAct.floors = '' + tempAct.floors;

            }


            if(storage.dataOfStates.newFireOrder.card112 === undefined){
                if(storage.dataOfStates.newFireOrder.actFromMap){

                    tempAct = jQuery.extend({}, storage.dataOfStates.newFireOrder.fireAct, true);
                    var tempfireObjects = jQuery.extend([], storage.dataOfStates.newFireOrder.objectsByHouseArray);
                    var tempCrosses = jQuery.extend([], storage.dataOfStates.newFireOrder.crossesArray);
                    // var tempHouses = jQuery.extend([], storage.dataOfStates.newFireOrder.housesArray);
                    var tempHouses = jQuery.extend([], storage.dataOfStates.newFireOrder.housesArray)

                    vm.enterAddressMode();

                    vm.fireAct = storage.dataOfStates.newFireOrder.fireAct = angular.copy(tempAct);
                    storage.dataOfStates.newFireOrder.objectsByHouseArray = angular.copy(tempfireObjects);
                    storage.dataOfStates.newFireOrder.crossesArray = angular.copy(tempCrosses);
                    storage.dataOfStates.newFireOrder.housesArray = angular.copy(tempHouses);

                    /*
                     ws.$emit('selectPlaceStreet', vm.fireAct.firePlace);
                     ws.$emit('selectPlaceHouse', vm.fireAct.firePlace);
                     vm.primaryStreetFieldChanged(vm.fireAct.firePlace.address.street, null);
                     vm.onSelectBuilding(vm.fireAct.firePlace.address, null);
                     */

                    /*
                     angular.merge(storage.dataOfStates.newFireOrder.fireAct, tempAct);
                     angular.merge(storage.dataOfStates.newFireOrder.objectsByHouseArray, tempfireObjects);
                     angular.merge(storage.dataOfStates.newFireOrder.crossesArray, tempCrosses);
                     angular.merge(storage.dataOfStates.newFireOrder.housesArray, tempHouses);
                     */

                    storage.dataOfStates.newFireOrder.actFromMap = false;

                } else {
                    var temp112 = storage.dataOfStates.newFireOrder.fireAct.card112WithBean;

                    cleanArrays();

                    resetFireAct(true);

                    vm.enterAddressMode();

                    if(temp112){
                        storage.dataOfStates.newFireOrder.fireAct.card112WithBean = temp112;
                    }
                    if(!!storage.action.strCallerContactPhone === true){
                        // vm.fireAct = Object.assign({}, storage.action.fireAct);
                        // vm.fireAct.card112WithBean.card112.strCallerContactPhone = storage.action.card112WithBean.card112.strCallerContactPhone;
                        vm.fireAct.card112WithBean = {
                            card112: {
                                strCallerContactPhone: vm.storage.action.strCallerContactPhone
                            }
                        };

                        storage.action = {};
                    }

                }
            } else {


                migrateFields112ToFireAct();
                cleanArrays();
                resetFireAct(true);

                vm.enterAddressMode();


                tempAct = angular.copy(storage.dataOfStates.newFireOrder.card112.fireActTemplate);
                // tempAct = jQuery.extend({}, storage.dataOfStates.newFireOrder.card112.fireActTemplate, true);
                var temp112 = Object.assign({}, storage.dataOfStates.newFireOrder.card112);


                if(storage.dataOfStates.newFireOrder.card112.fireActTemplate !== null && storage.dataOfStates.newFireOrder.card112.fireActTemplate !== undefined && storage.dataOfStates.newFireOrder.card112.fireActTemplate.hasOwnProperty('firePlace') && storage.dataOfStates.newFireOrder.card112.fireActTemplate.firePlace !== undefined){

                    var tempfireObjects = jQuery.extend([], storage.dataOfStates.newFireOrder.card112.fireActTemplate.firePlace.address.fireObjects);
                    storage.dataOfStates.newFireOrder.objectsByHouseArray = Object.assign({}, tempfireObjects);
                    // angular.merge(storage.dataOfStates.newFireOrder.objectsByHouseArray, tempfireObjects);
                }

                storage.dataOfStates.newFireOrder.mode = 4;
                vm.objectTab = true;


                storage.dataOfStates.newFireOrder.fireAct = Object.assign({}, tempAct);
                // angular.extend(storage.dataOfStates.newFireOrder.fireAct, tempAct);


                storage.dataOfStates.newFireOrder.fireAct.card112WithBean = temp112;
                storage.dataOfStates.newFireOrder.card112 = undefined;

                /*
                 if(tempAct !== undefined && tempAct.hasOwnProperty('firePlace') && tempAct.firePlace.hasOwnProperty('address') && !tempAct.firePlace.address.naStreet && !tempAct.firePlace.address){
                 */
                vm.fireAct = storage.dataOfStates.newFireOrder.fireAct;
                if(tempAct !== undefined && tempAct.hasOwnProperty('firePlace') && tempAct.firePlace.hasOwnProperty('address') && !tempAct.firePlace.address.naHouse){
                    // vm.onSelectBuilding(tempAct.firePlace.address, null);
                    $timeout(function(){
                        vm.onSelectBuilding(tempAct.firePlace.address, null);
                    }, 150);
                }


                /*
                 if(tempAct !== undefined && tempAct.hasOwnProperty('firePlace') && tempAct.firePlace.hasOwnProperty('address') && !tempAct.firePlace.address.naStreet){
                 ws.$emit('selectPlaceHouse', vm.fireAct.firePlace);
                 ws.$emit('selectPlaceStreet', vm.fireAct.firePlace);
                 vm.primaryStreetFieldChanged(vm.fireAct.firePlace.address.street, null);
                 vm.onSelectBuilding(vm.fireAct.firePlace.address, null);
                 vm.selectPrimaryStreet(vm.fireAct.address, null);
                 }
                 */

                if(storage.stateKeeper.newState === "fires.card112"){
                    if(storage.dataOfStates.newFireOrder.fireAct.hasOwnProperty('card112WithBean') && storage.dataOfStates.newFireOrder.fireAct.card112WithBean !== undefined && storage.dataOfStates.newFireOrder.fireAct.card112WithBean.hasOwnProperty('card112') && storage.dataOfStates.newFireOrder.fireAct.card112WithBean.card112 !== undefined){

                        if(storage.dataOfStates.newFireOrder.fireAct.card112WithBean.card112.hasOwnProperty('strAddressString') && !!storage.dataOfStates.newFireOrder.fireAct.card112WithBean.card112.strAddressString){


                            // ws.$emit('findPlaceStreets', storage.dataOfStates.newFireOrder.fireAct.card112WithBean.card112.strAddressString);

                            // ws.$emit('selectPlaceStreet', vm.fireAct.firePlace);


                            // console.log('vm.storage > ', storage.dataOfStates.newFireOrder);


                            // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>> 1');
                            ws.$emit('findPlaceStreets', storage.dataOfStates.newFireOrder.fireAct.card112WithBean.card112.strAddressString);

                            ws.$emit('selectPlaceStreet', storage.dataOfStates.newFireOrder.fireAct.firePlace);

                            ws.$emit('selectPlaceHouse', storage.dataOfStates.newFireOrder.fireAct.firePlace);
                            // vm.primaryStreetFieldChanged();
                        }

                    }
// console.log('tempAct >', tempAct);
                }

            }

            // console.log('vm.fireAct >>>', JSON.stringify(vm.fireAct));
        }


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


        vm.addEnginesToFire = function(){
            var command = [];
            vm.storage.dataOfStates.newFireOrder.fireAct.addOrders.map(function(order){
                command.push({
                    deptId: order.fireEngineDept,
                    idFireEngine: order.fireEngine.idFireEngine,
                });
            });
            if(command.length > 0){
                ws.$emit('addEngineToFire',
                    {
                        fireActId: vm.fireAct.id,
                        fireEngineList: command
                    }
                );
            }
        };


        function selectMode(mode){
            if(mode != storage.dataOfStates.newFireOrder.mode){
                if(storage.dataOfStates.newFireOrder.mode == 3){
                    // resetFireAct();
                    cleanArrays();
                    // console.log('storage.dataOfStates.newFireOrder.fireAct >>>', storage.dataOfStates.newFireOrder.fireAct);
                    storage.dataOfStates.newFireOrder.fireAct.firePlace.region = defaultRegion;
                }
                storage.dataOfStates.newFireOrder.mode = mode;
            }
        }


        function resetFireAct(resetIncTypeIncSrc){
            var oldCopy = {};

            if(storage.dataOfStates.newFireOrder.fireAct.id != undefined){

                // console.log('storage------------------->', storage.dataOfStates.newFireOrder.fireAct)


                oldCopy.id = (!!storage.dataOfStates.newFireOrder.fireAct.id === true) ? storage.dataOfStates.newFireOrder.fireAct.id : null;
                oldCopy.firePlace = jQuery.extend({}, storage.dataOfStates.newFireOrder.fireAct.firePlace);
                oldCopy.rank = jQuery.extend({}, storage.dataOfStates.newFireOrder.fireAct.rank);
                oldCopy.doorCode = '' + storage.dataOfStates.newFireOrder.fireAct.doorCode;
                oldCopy.flat = '' + storage.dataOfStates.newFireOrder.fireAct.flat;
                oldCopy.floor = '' + storage.dataOfStates.newFireOrder.fireAct.floor;
                oldCopy.floors = '' + storage.dataOfStates.newFireOrder.fireAct.floors;
                oldCopy.comment = '' + storage.dataOfStates.newFireOrder.fireAct.comment;
                oldCopy.card112WithBean = jQuery.extend({}, storage.dataOfStates.newFireOrder.fireAct.card112WithBean);
            }

            if(resetIncTypeIncSrc != true){
                oldCopy.incidentType = jQuery.extend({}, storage.dataOfStates.newFireOrder.fireAct.incidentType);
                oldCopy.incidentSource = jQuery.extend({}, storage.dataOfStates.newFireOrder.fireAct.incidentSource);
                oldCopy.comment = '' + storage.dataOfStates.newFireOrder.fireAct.comment;
            }
            if(!jQuery.isEmptyObject(storage.dataOfStates.newFireOrder.fireAct.card112WithBean)){
                oldCopy.card112WithBean = jQuery.extend({}, storage.dataOfStates.newFireOrder.fireAct.card112WithBean);
            }
            // storage.dataOfStates.newFireOrder.fireAct = JSON.parse(JSON.stringify(cleanNewFireAct));
            angular.copy(cleanNewFireAct, storage.dataOfStates.newFireOrder.fireAct);
            storage.dataOfStates.newFireOrder.fireAct.orders = undefined;
            if(!jQuery.isEmptyObject(oldCopy)){
                angular.merge(storage.dataOfStates.newFireOrder.fireAct, oldCopy);
            }
            storage.dataOfStates.newFireOrder.listOfAdditionalTech = [];
        }

        ////////////////////////////////////////////
        vm.engineTypeSortingAlgorythm = engineTypeSortingAlgorythm;
        vm.getNumDept = getNumDept;
        vm.fireAct = storage.dataOfStates.newFireOrder.fireAct;
        vm.objectTab = true;
        vm.contactsTab = false;
        vm.houseSorting = houseSorting;
        vm.storage = storage;
        vm.deptUISelectDeptField = {};
        vm.houseUISelect = {};
        vm.nEmergencyCardId = '';
        vm.switchCommentsState = false;
        vm.sortRanksUp = true;
        vm.expandedFields = {};
        vm.ShowSentTicket = ShowSentTicket;

        vm.selectedSubdistrictRaion = {};
        vm.subDistrictsRaions = [];
        vm.naSubDistrict = true;

        vm.modelOptions = {
            allowInvalid: true,
            debounce: 1,
            updateOn: 'default blur keyup',
            getterSetter: true
        };

        vm.temporarySubdistrict = null;
        vm.fireType = null;

        storage.controllers.newFireOrder = vm;

        ////////////////////////////////////////////


        vm.viewFullText = function(dest){
            if(!vm.expandedFields.hasOwnProperty(dest)){
                vm.expandedFields[dest] = true;
            } else {
                vm.expandedFields[dest] = !vm.expandedFields[dest];
            }
        };


        ws.$on('listSubdistrictsRaions', function(message){

                vm.subDistrictsRaions = message;
                // console.log(vm.subDistrictsRaions);
            }
        );


        vm.enterLOMode = function(){
            vm.contactsTab = true;
            //            $state.transitionTo($state.current, {fireId: $stateParams.fireId, fireType: 3}, {notify: false});
            if(!$stateParams.fireId && !!vm.fireAct.card112WithBean === false){
                if($stateParams.fireType == "new"){
                    resetFireAct();
                    storage.dataOfStates.newFireOrder.fireAct.firePlace.region = LORegion;
                }
                cleanArrays();

                selectMode(3);
            }
            if(!!vm.fireAct.card112WithBean === true && !!vm.fireAct.card112WithBean.card112.nEmergencyCardId === true){
                vm.storage.dataOfStates.newFireOrder.fireAct.firePlace.region = LORegion;
                // console.log('region >>>', storage.dataOfStates.newFireOrder.fireAct.firePlace.region);
                vm.storage.dataOfStates.newFireOrder.mode = 3;
            }
            /*
             ws.$emit('listSubdistricts');
             ws.$emit('listSubdistrictsRaions');
             */
            $timeout(function(){
                vm.selectedSubdistrictStreet();
                $window.document.body.querySelector('#newFireOrderFlow-01').focus();
                // $("#newFireOrderFlow-01").focus();
            }, 0);
        };


        vm.setNameFromRaion = function(raion){
            if(raion){
                vm.fireAct.firePlace.address.district = raion.name;
            }
            // console.log(vm.fireAct.firePlace.address.district);
        };

        vm.checkRaionBySubDistrict = function(check){

            return false;

            if(check !== undefined){

                if(vm.naSubDistrict){

                    return false;

                } else {

                    switch(check){
                        case 1:
                            return ((!vm.naSubDistrict && vm.fireAct.firePlace.address.settName !== null && vm.fireAct.firePlace.address.district == null) ? false : true);
                            break;

                        case 2:
                            return ((!vm.naSubDistrict && vm.fireAct.firePlace.address.settName !== null && vm.fireAct.firePlace.pchName == null) ? false : true);
                            break;

                    }
                }
            }


            // console.log(vm.fireAct.firePlace.address);

            // return !vm.naSubDistrict;
            /*
             if(check !== undefined){
             if(vm.fireAct.firePlace.address.settName !== null){
             switch(check){
             case 1:
             return ((vm.fireAct.firePlace.address.district !== null) ? true : false);
             break;
             case 2:
             return ((vm.fireAct.firePlace.pchName !== null) ? true : false);
             break;
             }
             } else {
             return true;
             }
             }
             */
        };

        vm.showRaionName = function(name){

            /*
             console.log('---------------> vm.subDistrictsRaions');
             console.log(vm.subDistrictsRaions);
             console.log(vm.selectedSubdistrictRaion);
             */


            if(name){
                // return (_.find(vm.subDistrictsRaions, function(raion){
                // var found = (vm.subDistrictsRaions.forEach(
                var found = (_.find(vm.subDistrictsRaions,
                        function(raion){
                            /*
                             console.log(name);
                             console.log(raion);
                             */
                            return raion.name.trim().toLowerCase() == name.trim().toLowerCase();
                        })
                );
                if(found !== undefined && found.hasOwnProperty('name')){
                    return found.name;
                }
            }

            return '';
        };


        vm.enterAddressMode = function(){
            vm.objectTab = true;
            vm.temporarySubdistrict = null;
            selectMode(0);
            $timeout(function(){
                $("#newFireOrderFlow-1").focus();
            }, 0);
        };
        vm.enterObjectMode = function(){
            vm.contactsTab = true;
            vm.temporarySubdistrict = null;
            selectMode(2);
            $timeout(function(){
                $("#newFireOrderFlow-0").focus();
            }, 0);
        };
        vm.cancelCrossingMode = function(){
            vm.objectTab = true;
            ws.$emit('selectPlaceStreet', vm.fireAct.firePlace);
            selectMode(0);
            storage.dataOfStates.newFireOrder.objectsByHouseArray = [];
        };
        vm.crossingsModeEmit = function(){
            vm.contactsTab = true;
            // vm.selectFireObject(vm.fireAct.firePlace.fireObject);
            // console.log('vm.fireAct.firePlace >', vm.fireAct.firePlace);
            ws.$emit('findPlaceCrossStreets', vm.fireAct.firePlace);
            selectMode(1);
        };
        ////////////////////////////////////////////
        vm.clearAddress = function(){
            resetFireAct();
            cleanArrays();
        };
        vm.clearObject = function(){
            resetFireAct();
            cleanArrays();
        };
        vm.onSelectTriplet = function(callback, fromField){
            $timeout(function(){
                callback(fromField);
            }, 0);
        };

        vm.selectFireObjectByKeys = function($event){
            //which 49 - цифра 1
            //which 50 - цифра 2
            if($event.which >= 49 && $event.which <= 57){
                vm.selectFireObject(storage.dataOfStates.newFireOrder.objectsByHouseArray[$event.which - 49]);
            }
        };
        ////////////////////////////////////////////

        ////////////////////////////////////////////
        vm.selectIncidentType = function(type, callback, arg){
            const trashString = 'МУСОР';
            if(type.name === trashString){
                if(!vm.fireAct.comment.includes(trashString)){
                    vm.fireAct.comment = type.name;
                }
            }
            if(callback) callback(arg);
        };


        /*
         $scope.$watch(function(){
         return vm.storage.dataOfStates.newFireOrder.streetsArray;
         },
         function(newValue, oldValue){
         console.log('$watch > newValue', newValue);
         $timeout(function(){}, 100);
         }
         );
         */


        vm.isAddressEqual = function(){


            if(vm.fireAct.hasOwnProperty('card112WithBean') && vm.fireAct.card112WithBean.hasOwnProperty('card112') && !!vm.fireAct.card112WithBean.card112.strAddressString === true && !!vm.fireAct.card112WithBean.card112.strBuilding === true && !(vm.fireAct.card112WithBean.card112.strAddressString + vm.fireAct.card112WithBean.card112.strBuilding).includes((vm.fireAct.firePlace.address.street + vm.fireAct.firePlace.address.house))){
                return 'red-highlight';
            }
            return '';
        };


        vm.subdistrictsChanged = function(search){
            if(!!search === true){
                if(search.length > 2){
                    ws.$emit('listSubdistricts',
                        {
                            criteria: search,
                            settId: 0
                        }
                    );
                } else {
                    vm.storage.subDistricts = [];
                }
            }
        };


        vm.primaryStreetFieldChanged = function(search){
            if(!vm.storage.dataOfStates.newFireOrder.settings.isHousesEmitSending){
                cleanArrays();
            }
            if(search !== undefined && search !== null){
                if(!storage.stateKeeper.newState === "fires.card112" && !storage.dataOfStates.newFireOrder.actFromMap){
                    vm.clearAddress();
                }

                if(vm.temporarySubdistrict === null && storage.dataOfStates.newFireOrder.mode !== 3){

                    if(search.length >= 3){
                        ws.$emit('findPlaceStreets', search);
                    }
                } else {
                    if(search.length >= 3){
                        ws.$emit('findSubdistrictsStreet', {
                            criteria: search,
                            // mapInfo: ((vm.temporarySubdistrict.mapInfo.hasOwnProperty(0)) ? vm.temporarySubdistrict.mapInfo[0] : null),
                            settId: ((!!vm.temporarySubdistrict === true && !!vm.temporarySubdistrict.nameid === true) ? vm.temporarySubdistrict.nameid : '')
                        });
                    }
                }
            }
        };

        vm.selectPrimaryStreet = function(item, callback, fromField){
            vm.storage.dataOfStates.newFireOrder.settings.isHousesEmitSending = true;

            cleanArrays();
            if(angular.isDefined(item)){

                // vm.fireAct.firePlace.address.street = item.street;
                // vm.fireAct.firePlace.address.naStreet = item.naStreet;

                delete item.house;
                delete item.settName;
                delete item.settId;
                // delete item.raionName;
                vm.fireAct.firePlace.fireObject = null;
                vm.fireAct.firePlace.address = Object.assign(vm.fireAct.firePlace.address, item);


                // var message = Object.assign({}, vm.fireAct.firePlace);

                // message.address.street = vm.fireAct.firePlace.address;
                /*
                 for(var i in item){
                 if(item.hasOwnProperty(i) && (message.address[i] === undefined || message.address[i] === null)){
                 message.address[i] = item[i];
                 console.log('>>>', i, new String(message.address[i]).toString(), new String(item[i]).toString(), vm.fireAct.firePlace, item);
                 }
                 } //Проблема с перетиранием существующих значений в дефолтные
                 */

                /*
                 if(!item.hasOwnProperty('streetname')){
                 message.address = item;
                 } else {
                 for(var i in item){
                 if(item.hasOwnProperty(i) && !!item[i] === true){
                 message.address[i] = item[i];
                 }
                 }
                 }
                 */

                if(callback){
                    $timeout(function(){
                        callback(fromField);
                    }, 0);
                }
                switch(storage.dataOfStates.newFireOrder.mode){
                    case 0:

                        ws.$emit('selectPlaceStreet', vm.fireAct.firePlace);
                        break;
                    case 1:
                        ws.$emit('findPlaceCrossStreets', vm.fireAct.firePlace);
                        break;
                    case 3:
                        break;
                    case 4:
                        ws.$emit('selectPlaceStreet', vm.fireAct.firePlace);
                        break;
                    default:
                        growl.warning('something went wrong in new order, select street')
                }
            }

        };

        vm.switchVisibleStatus = function(e, status){
            if(e !== undefined && status !== undefined){
                $timeout(function(){
                    e.target.setAttribute('data-visible', status);
                }, 777);
            }
        };

        vm.checkTypedSubDistrict = function(){
            /*
             var distr = _.find(vm.subDistrictsRaions, function(raion){
             return raion.id == item.raionId;
             });
             */

            /*
             console.log('checkTypedSubDistrict->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
             console.log(vm.fireAct.firePlace);
             */


            var distr = (_.find(vm.storage.subDistricts, function(raion){
                if(vm.fireAct.firePlace.address.settName !== null){

                    return vm.fireAct.firePlace.address.settName.trim().toLowerCase() == raion.name.trim().toLowerCase();
                } else {
                    return false;
                }
            }));

            if(distr === undefined){
                vm.naSubDistrict = true;
                /*
                 vm.fireAct.firePlace.address.district = null;
                 vm.fireAct.firePlace.pchName = null;
                 vm.fireAct.firePlace.pchId = null;
                 */
            } else {
                vm.naSubDistrict = false;
            }

        };

        vm.selectTypedSubDistrict = function(item, callback, fromField){

            // console.log('selectTypedSubDistrict >>>>', arguments);
            /*
             console.log('selectTypedSubDistrict>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
             console.log(vm.fireAct.firePlace.address.settName);
             */


            var dept = null;

            var dept = _.find(storage.fireDepartments, function(dept){
                return dept.id === item.deptId;
            });

            var distr = _.find(vm.subDistrictsRaions, function(raion){
                return raion.id == item.raionId;
            });

            vm.fireAct.firePlace.address.settName = item.name;
            vm.fireAct.firePlace.address.district = (distr != undefined) ? distr.name : null;


            // console.log('address >> ', vm.fireAct.firePlace);
            vm.temporarySubdistrict = null;
            if(dept != undefined){
                vm.onSelectDept({id: dept.id, fireDeptName: dept.fireDeptName}, callback, fromField);
                // vm.selectedSubdistrictStreet();
            } else {
                console.log('ERROR')
            }
            vm.selectedSubdistrictStreet();
            // vm.selectedSubdistrictStreet();
            // console.log(vm.fireAct.firePlace);
        };

        vm.selectedSubdistrictStreet = function(){


            if(vm.fireAct.firePlace.address.settName !== undefined && vm.fireAct.firePlace.address.settName !== null){

                vm.temporarySubdistrict = storage.subDistricts.find(function(subd){
                    if(subd.name.toLowerCase().trim() == vm.fireAct.firePlace.address.settName.toLowerCase().trim()){
                        if(subd.mapInfo instanceof Array && subd.mapInfo.length && subd.mapInfo.hasOwnProperty(0)){
                            vm.fireAct.firePlace.address.district = subd.mapInfo[0].district;
                        }
                        return subd;
                    }
                });

                /*
                 console.log('vm.temporarySubdistrict >', vm.temporarySubdistrict);
                 console.log('address >> ', vm.fireAct.firePlace);
                 */
            }
        };


        vm.manualHouseEnter = function(house){
            // console.log('1 >', house.originalEvent.target.value);
            if(vm.storage.dataOfStates.newFireOrder.housesArray instanceof Array && vm.storage.dataOfStates.newFireOrder.housesArray.length > 0){
                if(!!house.originalEvent.target.value === true){
                    // console.log('2 >', house.originalEvent.target.value);
                    vm.houseValue = house.originalEvent.target.value;
                    vm.storage.dataOfStates.newFireOrder.housesArray[0].house = house.originalEvent.target.value;
                } else {
                    // console.log('3 >', house.originalEvent.target.value);
                    vm.storage.dataOfStates.newFireOrder.housesArray[0].house = '';
                }

/*
                vm.storage.dataOfStates.newFireOrder.housesArray


                vm.storage.dataOfStates.newFireOrder.housesArray[vm.storage.dataOfStates.newFireOrder.housesArray.length - 1].house = house.originalEvent.target.value;
*/
            }
        };

        vm.onSelectBuilding = function(item, callback, from, select){
            if(vm.fireAct !== null && vm.fireAct !== undefined && vm.fireAct.hasOwnProperty('firePlace')){

                var message = Object.assign({}, vm.fireAct.firePlace);
                message.fireObject = null;
                vm.fireAct.rank = jQuery.extend({}, cleanNewFireAct.rank, true); // сброс ранга до дефолтного

                if(angular.isDefined(item)){


                    // console.log('message >', houseFound, message, item);

                    // message.address = item;
                    for(var i in item){
                        if(item.hasOwnProperty(i)){
                            message.address[i] = item[i];
                        }
                    }



                    /*
                     console.log(vm.storage.dataOfStates.newFireOrder.housesArray);
                     console.log(JSON.stringify(message));
                     */


                    var houseFound = {
                        origHouse: (!!message.address.house === true) ? message.address.house.trim() : '',
                        house: (!!message.address.house === true) ? parseInt(message.address.house.trim().match(/^(^\w[0-9]*)/ig), 10) : 0,
                        sortOut: null,
                        min: null,
                        max: null
                    };


                    if(!isNaN(houseFound.house) && message.address.naHouse){
                        vm.storage.dataOfStates.newFireOrder.housesArray.forEach(
                            function(elem, i){

                                houseFound.sortOut = parseInt(elem.house.trim().match(/^(^\w[0-9]*)/ig), 10);

                                if(!isNaN(houseFound.sortOut)){

                                    if(houseFound.sortOut < houseFound.house){

                                        if(houseFound.min !== null){
                                            if(parseInt(houseFound.min.house.trim().match(/^(^\w[0-9]*)/ig), 10) < houseFound.sortOut){
                                                houseFound.min = elem;
                                            }
                                        } else {
                                            houseFound.min = elem;
                                        }

                                    }

                                    if(houseFound.sortOut > houseFound.house){

                                        if(houseFound.max !== null){
                                            if(parseInt(houseFound.max.house.trim().match(/^(^\w[0-9]*)/ig), 10) > houseFound.sortOut){
                                                houseFound.max = elem;
                                            }
                                        } else {
                                            houseFound.max = elem;
                                        }

                                    }

                                }

                            }
                        );
                    }
                    // message.address.manualHouse = null;
                    if(!!houseFound.min === true){

                        // message.address = houseFound.min;
                        message.geomX = houseFound.min.geomX;
                        message.geomY = houseFound.min.geomY;
                        message.address.geomX = houseFound.min.geomX;
                        message.address.geomY = houseFound.min.geomY;
                        message.address.manualHouse = houseFound.origHouse;

                    } else if(!!houseFound.max === true){

                        // message.address = houseFound.max;
                        message.geomX = houseFound.max.geomX;
                        message.geomY = houseFound.max.geomY;
                        message.address.geomX = houseFound.max.geomX;
                        message.address.geomY = houseFound.max.geomY;
                        message.address.manualHouse = houseFound.origHouse;

                    }

                    /*
                     console.log('------------------------->>>');
                     console.log('2 >>>', JSON.stringify(houseFound));
                     console.log(houseFound);
                     console.log(message);
                     */

                    /*
                     console.log('1 >>>', houseFound);
                     console.log('2 >>>', message);
                     */

                    if(!!message.naHouse === true){
                        message.fireObjects = [];
                    }


/*
                    if(!!vm.houseValue === true){
                        vm.storage.dataOfStates.newFireOrder.housesArray.find(function(house){
                            if(vm.houseValue === house.house){



/!*
                                console.log('house.house >', house);
                                vm.fireAct.firePlace.address.house = house.house;
                                message.address = Object.assign({}, house);
*!/
                                return true;
                            }
                        });
                    }
*/


                    //vm.houseValue = house.originalEvent.target.value;
/*
                    console.log('vm.houseValue 1>', arguments);
                    console.log('vm.houseValue 2>', vm.fireAct.firePlace.address.house);
*/

                    ws.$emit('selectPlaceHouse', message);
                    storage.dataOfStates.newFireOrder.objectsByHouseArray = [];
                    if(callback){
                        $timeout(function(){
                            callback(from);
                        }, 0);
                    }

                    houseFound = null;

                } else {
                    message.address.house = null;
                    ws.$emit('selectPlaceStreet', message);
                    vm.houseUISelect = {};//иначе при заведении заявки с карты не отображается дом
                    //ws.$emit('selectPlaceHouse', message);
                }
            }

        };


        vm.houseFieldChanged = function(sel){
            console.log('sel >', sel);
        };
        vm.resetManualHouse = function(){
            vm.houseValue = '';
        };


        vm.onSelectCross = function(item, callback, fromField){
            if(angular.isDefined(item)){
                var message = vm.fireAct.firePlace;
                message.crossStreet = item;
                ws.$emit('selectPlaceCross', message);
                $timeout(function(){
                    callback(fromField);
                }, 0);
            }
        };
        vm.selectFireObject = function(object){
            // if (angular.isDefined(object) && storage.dataOfStates.newFireOrder.canLeave) {
            if(angular.isDefined(object)){
                if(object != vm.fireAct.firePlace.fireObject){
                    vm.fireAct.firePlace.fireObject = object;
                    vm.fireAct.rank = _.find(storage.rangs, function(firerank){
                        return firerank.sidfirerank === object.rank;
                    });
                    vm.fireAct.firePlace.geomX = object.x;
                    vm.fireAct.firePlace.geomY = object.y;
                } else {
                    vm.fireAct.firePlace.fireObject = null;
                    vm.fireAct.rank = jQuery.extend({}, cleanNewFireAct.rank, true);
                    vm.fireAct.firePlace.geomX = vm.fireAct.firePlace.address.geomX;
                    vm.fireAct.firePlace.geomY = vm.fireAct.firePlace.address.geomY;
                }

                var message = vm.fireAct.firePlace;
                message.address.fireObjects = [object];

                message.address.house = object.house;
                message.address.geomX = object.x;
                message.address.geomY = object.y;

                /*
                 console.log('object----------------------');
                 console.log(object);
                 console.log('message----------------------');
                 console.log(message);
                 */
                ws.$emit('selectPlaceHouse', message);
            }
        };
        vm.onActiveCross = function(item){
            if(item.geomX != null && item.geomY != null){
                var message = {
                    x: item.geomX,
                    y: item.geomY,
                    flag: 0
                };
                ws.$emit('putPointOnMap', message);
            }
        };
        vm.onActiveBuilding = function(item){
            if(item.geomX !== undefined){
                var message = {
                    x: item.geomX,
                    y: item.geomY,
                    flag: 0
                };
                ws.$emit('putPointOnMap', message);
            }
        };
        vm.onSelectDept = function(item, callback, fromField){
            if(angular.isDefined(item)){
                var message = vm.fireAct.firePlace;
                message.triplet = undefined;
                message.pchId = item.id;
                message.pchName = item.fireDeptName;

                ws.$emit('selectPlaceDepartment', message);
                $timeout(function(){
                    callback(fromField);
                }, 0);
            }
        };
        vm.objectNameFieldChanged = function(search){

            if(search){
                if(search.length > 2){
                    ws.$emit('findPlaceObjects', search);
                }
                else if(search.length === 0){
                    cleanArrays();
                    resetFireAct();
                }
            }
        };

        vm.selectTypedObject = function(item, callback, from){
            // console.log('vm.fireAct > ', vm.fireAct);
            if(angular.isDefined(item)){
                vm.fireAct.firePlace.fireObject = item;
                var message = vm.fireAct.firePlace;
                ws.$emit('selectPlaceObject', message);
                $timeout(function(){
                    callback(from);
                }, 0);
            }
            cleanArrays();
        };
        /////////////////////////
        vm.disableDeptSelect = function(){
            return false;
            /*
             if(vm.fireAct.hasOwnProperty('firePlace') && vm.fireAct.firePlace !== undefined && vm.fireAct.firePlace.address !== null){
             return storage.dataOfStates.newFireOrder.mode !== 1 &&
             vm.fireAct.firePlace.address !== null && !vm.fireAct.firePlace.address.naHouse && !vm.fireAct.firePlace.address.naStreet || storage.dataOfStates.newFireOrder.mode === 3;
             } else {
             return true;
             }
             */
        };
        vm.disableTripletSelect = function(){
            if(vm.fireAct.hasOwnProperty('firePlace') && vm.fireAct.firePlace !== undefined && vm.fireAct.firePlace.address !== null){
                var naAddr = vm.fireAct.firePlace.address.naHouse || vm.fireAct.firePlace.address.naStreet;
                var notEmptyArray = storage.dataOfStates.newFireOrder.tripletsArray !== undefined && storage.dataOfStates.newFireOrder.tripletsArray.length != 0;

                if(storage.dataOfStates.newFireOrder.mode === 3){
                    return true;
                }
                else if(!naAddr){
                    if(!notEmptyArray){
                        return true;
                    }
                }
                else return false;
            } else {
                return false;
            }
        };
        vm.districtDisabled = function(){
            if(vm.fireAct.hasOwnProperty('firePlace') && vm.fireAct.firePlace !== undefined && vm.fireAct.firePlace.address !== null){
                return !vm.fireAct.firePlace.address.naStreet;
                // return !vm.fireAct.firePlace.address.naHouse && !vm.fireAct.firePlace.address.naStreet || (storage.dataOfStates.newFireOrder.mode === 2 && vm.fireAct.firePlace.fireObject === null);
            }
            else return true;
        };
        vm.disableReserveButton = function(){
            if(angular.isDefined(vm.fireAct.firePlace)){
                var pchNotExist = vm.fireAct.firePlace.pchId == null && vm.fireAct.firePlace.pchName == null;
                var tripletNotExist = vm.fireAct.firePlace.triplet == undefined;
                var commentIsEmpty = vm.fireAct.comment == '';
                var tripletIdNotExist = true;
                if(!tripletNotExist){
                    tripletIdNotExist = vm.fireAct.firePlace.triplet.id == null;
                }
                if(vm.fireAct.firePlace.region !== undefined && vm.fireAct.firePlace.region.code === 1141){
                    return pchNotExist || commentIsEmpty
                } else {
                    return tripletIdNotExist || tripletNotExist || pchNotExist || commentIsEmpty;
                }
            } else {
                return commentIsEmpty;
            }


        };


        vm.checkAndCorrectValue = function(value){
            return (value === undefined || value === null) ? '' : value.toLowerCase().trim();
        };

        vm.checkActiveFireDuplicate = function(){
            var found = {
                    'adress': [
                        $parse('firePlace.address.street')(vm.fireAct),
                        $parse('firePlace.address.house')(vm.fireAct),
                        $parse('flat')(vm.fireAct),
                        $parse('firePlace.address.district')(vm.fireAct)
                    ],
                    'orders': []
                },
                match = 0,
                currFire = {
                    'street': vm.checkAndCorrectValue(found.adress[0]),
                    'house': vm.checkAndCorrectValue(found.adress[1]),
                    'flat': vm.checkAndCorrectValue(found.adress[2]),
                    'district': vm.checkAndCorrectValue(found.adress[3])
                };


            var foundCurrentFire = false;
            vm.storage.activeFires.forEach(
                function(aFire){

                    // if(!aFire.hasOwnProperty('id') || aFire.id === null || aFire.id === undefined){
                    var actFire = {
                        'street': vm.checkAndCorrectValue($parse('firePlace.address.street')(aFire)),
                        'house': vm.checkAndCorrectValue($parse('firePlace.address.house')(aFire)),
                        'flat': vm.checkAndCorrectValue($parse('flat')(aFire)),
                        'district': vm.checkAndCorrectValue($parse('firePlace.address.district')(aFire))
                    };


                    if(currFire.street === actFire.street){
                        ++match;
                    }

                    if(currFire.house === actFire.house){
                        ++match;
                    }

                    if(currFire.district === actFire.district){
                        ++match;
                    }


                    if(match === 3){
                        found.orders.push(aFire.numFireAct);
                        if(aFire.id === vm.fireAct.id){
                            foundCurrentFire = true;
                        }
                    }
                    match = 0;
                    // }
                });

            // vm.reserveCars();

            //TODO: Потом разкоментировать и отладить, необходимо для оповещения о повторном пожаре на одном адресе
            if(found.orders.length && !foundCurrentFire){
                // found.adress = currFire.street + '&nbsp;' + currFire.house + '&nbsp;' + currFire.flat;
                found.adress = found.adress.join(' ');
                modalsService.matchAdress('Найдено совпадения адреса', found)
                    .then(function(response){
                        vm.reserveCars();
                    })
                    .catch(function(response){
                        }
                    );
            } else {
                vm.reserveCars();
            }


        };


        ////////////////////////
        var deltaStart = 0;
        vm.agreePlace = function(){


            vm.checkActiveFireDuplicate();

            /*

             deltaStart = new Date;
             storage.hideLoadingOverlay = false;
             ws.$emit('route', vm.fireAct);

             */

        };
        ///////////////////////////

        vm.reserveCars = function(){
            deltaStart = new Date;
            storage.hideLoadingOverlay = false;
            // console.log('vm.fireAct >>>', vm.fireAct);
            ws.$emit('route', vm.fireAct);
            // ws.$emit('route', JSON.parse(JSON.stringify(vm.fireAct)) );
        };

        vm.getDislocationDept = function(fireEngine){

            if(fireEngine.fireEngineDept){
                var currentDept = _.find(storage.fireDepartments, function(dept){
                    return dept.id === fireEngine.fireEngineDept;
                });
                if(currentDept === undefined){
                    //console.log('order noDept');
                    return null;
                }
                else {
                    var engine = _.find(currentDept.fireEngines, function(engine){
                        return engine.idFireEngine === fireEngine.fireEngine.idFireEngine;
                    });
                    if(engine.locationDeptId != null){
                        return _.find(storage.fireDepartments, function(dept){
                            return dept.id === engine.locationDeptId;
                        });
                    } else {
                        return null;
                    }
                }
            } else {
                if(fireEngine.locationDeptId){
                    var relocationDept = _.find(storage.fireDepartments, function(dept){
                        return dept.id === fireEngine.locationDeptId;
                    });
                    if(relocationDept != null){
                        return relocationDept;
                    } else {
                        return null;
                    }
                }
            }

        };
        vm.getDislocation = function(fireEngine){
            var dept = vm.getDislocationDept(fireEngine);
            if(dept != null){
                return "(" + dept.fireDeptName + ")";
            }
            else {
                return '';
            }

        };
        vm.onAddPotentialEngine = function(element){
            var message = {
                deptId: element.deptId,
                idFireEngine: element.engine.idFireEngine,
                fireAct: vm.fireAct
            };
            ws.$emit('orderEngineManually', message)
        };
        //вызывается при удалении машины из текущей брони
        vm.onRemoveOrder = function(order){
            /*
             var enginesList = [{
             deptId: order.fireEngineDept,
             idFireEngine: order.fireEngine.idFireEngine
             }];
             */

            // ws.$emit('cancelBooking', {fireActId: vm.fireAct.id, enginesList: enginesList});
            ws.$emit('removeEngineFromFire', {
                fireActId: vm.fireAct.id,
                fireEngineId: order.fireEngine.idFireEngine,
                fireEngineType: null
            });

            var index = vm.fireAct.orders.indexOf(order);
            if(index != -1){
                vm.fireAct.orders.splice(index, 1);
            }
        };
        ///////////////////////////
        vm.cancelOrder = function(){
            storage.enginesAdvise = undefined;
            storage.dataOfStates.newFireOrder.canLeave = true;
            var enginesList = _.map(vm.fireAct.orders, function(order){
                return {
                    deptId: order.fireEngineDept,
                    idFireEngine: order.fireEngine.idFireEngine
                }
            });
            // ws.$emit('cancelBooking', {fireActId: vm.fireAct.id, enginesList: enginesList});
            ws.$emit('removeEngineFromFire', {
                fireActId: vm.fireAct.id,
                fireEngineList: enginesList,
                fireEngineType: null
            });

            resetFireAct();
        };
        vm.createFire = function(){

            vm.addEnginesToFire();

            var deltaEnd = new Date;
            var delta = deltaEnd - deltaStart;
            storage.enginesAdvise = undefined;
            storage.dataOfStates.newFireOrder.canLeave = true;


            var message = {fireAct: vm.fireAct, delta: delta};

            if(!!vm.nEmergencyCardId.trim().length){
                message.fireAct.card112WithBean.card112.nEmergencyCardId = vm.nEmergencyCardId;
            }

            ws.$emit('createFire', message);
            $state.go('fires.firesbase', {fireId: vm.fireAct.id}, {location: true, reload: true});
            storage.dataOfStates.newFireOrder.fireAct.id = undefined;
            resetFireAct();


        };
        /////////////КАРТА//////////////
        vm.showSpider = function(){
            ws.$emit('showSpider', {
                x: vm.fireAct.firePlace.geomX,
                y: vm.fireAct.firePlace.geomY
                // , ticket: $cookies.get('ticket')
            });
        };

        vm.showPathFromOrderToFire = function(order){
            var deptId = (order.fireEngineDept != undefined) ? order.fireEngineDept : order.deptId;
            var dept = _.find(storage.fireDepartments, function(dept){
                return dept.id === vm.fireAct.firePlace.pchId;
            });
            var command = {
                deptId: deptId
                // ,ticket: $cookies.get('ticket')
            };
            if(vm.fireAct.firePlace.geomX == 0 ||
                vm.fireAct.firePlace.geomY == 0
            ){
                command.geomX = dept.deptMapPoint.x;
                command.geomY = dept.deptMapPoint.y;
            } else {
                command.geomX = vm.fireAct.firePlace.geomX;
                command.geomY = vm.fireAct.firePlace.geomY;
            }

            ws.$emit('showPathFromOrderToFire', command);
        };
        ///////////////////////////


        /*
         $rootScope.$watch(function(){
         return vm.fireAct.firePlace.address.street;
         },
         function(newVal, oldVal){
         if(newVal && newVal.length > 2){
         vm.primaryStreetFieldChanged(newVal, null);
         }
         });
         */


        $scope.$on('$viewContentLoaded', function(event){
            if($stateParams.fireType == '3'){
                vm.fireType = $stateParams.fireType;
                storage.dataOfStates.newFireOrder.mode = 3;

                vm.enterLOMode();
                selectMode(3);

                if($stateParams.fireId){
                    vm.fireAct = vm.storage.activeFires.find(function(af){
                        if(af.id == $stateParams.fireId){
                            return af;
                        }
                    });
                    storage.dataOfStates.newFireOrder.fireAct = Object.assign({}, vm.fireAct);
                }
                /*
                 console.log('-----------------------------');
                 console.log('vm.fireAct >', vm.fireAct);
                 */

            } else {
                onStateEnter();
                // angular.copy(cleanNewFireAct, storage.dataOfStates.newFireOrder.fireAct);
            }


            /*
             ws.$emit('selectPlaceHouse', vm.fireAct.firePlace);
             */
            if(vm.fireAct !== undefined && vm.fireAct.hasOwnProperty('firePlace') && vm.fireAct.firePlace !== undefined){
                if(!vm.fireAct.hasOwnProperty('rank') || !!vm.fireAct.rank === false){
                    vm.fireAct.rank = jQuery.extend({}, cleanNewFireAct.rank, true);
                }
                ws.$emit('selectPlaceStreet', vm.fireAct.firePlace);
                vm.primaryStreetFieldChanged(vm.fireAct.firePlace.address.street, null);
            }

            /*

             var message = {
             "region": {
             "id": "5437bfdd1e135661dd2da71f",
             "table": 1,
             "code": 141,
             "num": 100141,
             "text": "Санкт-Петербург",
             "parent": 0
             },
             "address": {
             "regName": "Санкт-Петербург",
             "regId": 141,
             "settName": "Парголово",
             "settId": 57,
             "district": null,
             "geomX": 0,
             "geomY": 0,
             "street": "Заречная улица",
             "naStreet": false,
             "house": null,
             "naHouse": true,
             "manualHouse": null,
             "osm_id": 4454755,
             "fireObjects": [],
             "$$hashKey": "object:1394"
             },
             "crossStreet": null,
             "fireObject": {
             "id": 0,
             "nameobject": "",
             "typeobject": "",
             "rank": "",
             "prim": "",
             "rangmodifiers": "",
             "addteches": "",
             "isenabled": 0,
             "oldoid": 0,
             "x": 0,
             "y": 0,
             "address": null,
             "street": "",
             "house": "",
             "updater": "",
             "updwhen": null
             },
             "geomX": 0,
             "geomY": 0,
             "vertex": 0,
             "roadId": 0,
             "roadPatch": null,
             "pchName": null,
             "pchId": null
             };
             $timeout(function(){
             ws.$emit('selectPlaceStreet', message);
             }, 1000);
             */


            /*
             vm.onSelectBuilding(vm.fireAct.firePlace.address, null);
             vm.selectPrimaryStreet(vm.fireAct.address, null);
             */


            // console.log('vm.fireType >', vm.fireType);
            // console.log('vm.fireAct >', vm.fireAct);
        });


        // $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){

        // console.log(storage.stateKeeper);

        // });


        $scope.$on('$destroy', function(){

            if(vm.fireAct !== undefined){
                storage.activeFires.find(function(fire, idx){

                    if(fire.id === vm.fireAct.id){
                        storage.activeFires[idx] = null;
                        storage.activeFires[idx] = angular.copy(vm.fireAct);
                    }

                });
                storage.selectedFire = (vm.fireAct.id !== null) ? angular.copy(vm.fireAct) : null;
            }


            cleanArrays();

            if($state.$current.name !== 'fires.newFireOrder' || $location.search().fireType == 'new'){
                /*
                 console.log('storage.stateKeeper >>>>', $state.$current.name);
                 console.log('storage.selectedFire >>>>', storage.selectedFire);
                 */
                // vm.isDummyFire = false;
                // console.log('storage.stateKeeper >>>>', $state.$current.name);
                storage.dataOfStates.newFireOrder.fireAct = angular.copy(cleanNewFireAct);
                vm.fireAct = null;
                resetFireAct(true);
                angular.copy(vm.cleanNewFireAct, storage.dataOfStates.newFireOrder.fireAct);
                vm.fireType = null;
                storage.dataOfStates.newFireOrder.mode = 0;
                storage.controllers.newFireOrder = null;
                // $location.search('fireType', null);
            }


            // storage.dataOfStates.newFireOrder.fireAct.card112WithBean = null;
            /*
             if(vm.fireAct.id !== null){
             globalSelectFire(vm.fireAct);
             // console.log('vm.fireAct >', vm.fireAct);
             }
             */


        });
    }
})
();
