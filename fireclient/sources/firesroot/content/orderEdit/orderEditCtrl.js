(function(){
    'use strict';
    angular
        .module('app.orderEdit', [])
        .controller('OrderEdit', OrderEdit)
        .run(['ws', 'storage', '$rootScope', 'growl', '$log', '$state', '$timeout', function(ws, storage, $rootScope, growl, $log, $state, $timeout){



            ws.$on('addPotentialToTotalOrders', function(message){
                if(storage.selectedFire !== undefined && message.fireAct.id === storage.selectedFire.id){

                    storage.dataOfStates.editFireOrder.listOfAdditionalTech = _.map(message.potentialEngines, function(eng){
                        var dept = _.find(storage.fireDepartments, function(dept){
                            return dept.id === eng.deptId;
                        });
                        var engine = _.find(dept.fireEngines, function(engine){
                            return engine.idFireEngine === eng.idFireEngine;
                        });
                        return {fireDeptName: dept.fireDeptName, deptId: dept.id, engine: engine}
                    });
                    storage.dataOfStates.editFireOrder.notFoundOrders = message.notFoundOrders;
                    storage.dataOfStates.editFireOrder.totalOrders = message.totalOrders;
                    $rootScope.$apply();
                }
            });


        }]);

    OrderEdit.$inject = ['$log', '$scope', 'ws', 'storage', '$location', '$stateParams', '$state', '$cookies', '$timeout', 'engineTypeSortingAlgorythm', 'houseSorting', 'getNumDept', 'ShowSentTicket'];
    function OrderEdit($log, $scope, ws, storage, $location, $stateParams, $state, $cookies, $timeout, engineTypeSortingAlgorythm, houseSorting, getNumDept, ShowSentTicket){



        ////////////////////////////////////////////
        var vm = this;
        vm.getNumDept = getNumDept;
        vm.mode = 0; //0 - адрес; 1-перекресток; 2-объект;
        vm.objectTab = true;
        vm.contactsTab = false;
        vm.engineTypeSortingAlgorythm = engineTypeSortingAlgorythm;
        vm.houseSorting = houseSorting;
        vm.storage = storage;
        vm.fireAct = {};
        vm.deptUISelectDeptField = {};
        vm.houseUISelect = {};
        vm.switchCommentsState = false;
        vm.ShowSentTicket = ShowSentTicket;

        vm.storage.dataOfStates.editFireOrder.settings = {
            isHousesEmitSending: false
        };



        if(storage.stateKeeper.oldState !== 'fires.card112'){
            vm.fireAct = storage.dataOfStates.editFireOrder.fireAct;
        } else {
            storage.selectedFire = angular.copy(storage.dataOfStates.card112.selectedCard112.fireActTemplate);
            storage.selectedFire.card112WithBean = angular.copy(storage.dataOfStates.card112.selectedCard112.card112);
            storage.selectedFire.protocols112 = angular.copy(storage.dataOfStates.card112.selectedCard112.protocols112);
            storage.selectedFire.protocols112log = angular.copy(storage.dataOfStates.card112.selectedCard112.protocols112log);
            storage.selectedFire.whoViewed = angular.copy(storage.dataOfStates.card112.selectedCard112.whoViewed);
            storage.selectedFire.incidentType = _.find(storage.incidentTypes, function(type){
                return type.code === 1
            });
            delete storage.selectedFire.card112;
        }
        ////////////////////////////////////////////


        /*
         vm.storage = storage;
         vm.selectedFire = undefined;
         if($stateParams.fireId != undefined){
         vm.selectedFire = _.find(storage.activeFires, function(fireAct){
         return fireAct.id === $stateParams.fireId;
         });
         }
         */


        ///////////////////////////


        ///////////COPY FROM newFireOrder////////////////
        var baseIncidentType = _.find(storage.incidentTypes, function(type){
            return type.code === 1
        });
        var baseIncidentSource = _.find(storage.incidentSources, function(source){
            return source.code == 1;
        });
        var cleanAddress = {
            settName: null,
            settId: -1,
            district: null,
            geomX: 0,
            geomY: 0,
            street: null,
            naStreet: false,
            house: null,
            naHouse: false
        };
        var defaultRegion = _.find(storage.regions, function(region){
            return region.code === 141;
        });

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
        ///////////////////////////////////////////////////
        function goAwayFromState(){
            cleanArrays();
            storage.dataOfStates.editFireOrder.hasPredefinedListOfEngines = false;
            cleanEnginesArray();
            storage.dataOfStates.editFireOrder.canLeave = true;
            $state.go('fires.order');
        }

        function cleanArrays(){

            delete storage.dataOfStates.editFireOrder.streetsArray;
            storage.dataOfStates.editFireOrder.streetsArray = [];

            delete storage.dataOfStates.editFireOrder.housesArray;
            storage.dataOfStates.editFireOrder.housesArray = [];

            delete storage.dataOfStates.editFireOrder.objectsArray;
            storage.dataOfStates.editFireOrder.objectsArray = [];

            delete storage.dataOfStates.editFireOrder.objectsByHouseArray;
            storage.dataOfStates.editFireOrder.objectsByHouseArray = [];

            delete storage.dataOfStates.editFireOrder.tripletsArray;
            storage.dataOfStates.editFireOrder.tripletsArray = [];

            delete storage.dataOfStates.editFireOrder.crossesArray;
            storage.dataOfStates.editFireOrder.crossesArray = [];

            delete storage.dataOfStates.editFireOrder.listOfAdditionalTech;
            storage.dataOfStates.editFireOrder.listOfAdditionalTech = [];


/*
            storage.dataOfStates.editFireOrder.streetsArray = [];
            storage.dataOfStates.editFireOrder.housesArray = [];
            storage.dataOfStates.editFireOrder.objectsArray = [];
            storage.dataOfStates.editFireOrder.objectsByHouseArray = [];
            storage.dataOfStates.editFireOrder.tripletsArray = [];
            storage.dataOfStates.editFireOrder.crossesArray = [];
*/
        }

        function cleanEnginesArray(){
            if(!storage.dataOfStates.editFireOrder.hasPredefinedListOfEngines){
                storage.dataOfStates.editFireOrder.totalOrders = [];
                storage.dataOfStates.editFireOrder.listOfAdditionalTech = [];
                storage.dataOfStates.editFireOrder.notFoundOrders = [];
                storage.dataOfStates.editFireOrder.addOrders = [];
            }
            storage.dataOfStates.editFireOrder.hasPredefinedListOfEngines = false;
        }

        function onStateEnter(){
            // storage.enginesAdvise = undefined;
            if(!angular.isDefined(storage.dataOfStates.editFireOrder.canLeave)){
                storage.dataOfStates.editFireOrder.canLeave = true;
            } else {
                if(!storage.dataOfStates.editFireOrder.canLeave && !storage.dataOfStates.editFireOrder.hasPredefinedListOfEngines){
                    storage.dataOfStates.editFireOrder.canLeave = true;
                }
            }
            storage.dataOfStates.editFireOrder.fireAct = storage.selectedFire;
            vm.fireAct = storage.dataOfStates.editFireOrder.fireAct;
            // ws.$emit('selectPlaceStreet', vm.fireAct.firePlace);


            // cleanArrays();
            cleanEnginesArray();
            /*
             console.log('------------------------------------------------------------------');
             console.log('editFireOrder >', JSON.stringify(storage.dataOfStates.editFireOrder.fireAct));
             console.log('------------------------------------------------------------------');
             console.log('vm.fireAct >', JSON.stringify(vm.fireAct));
             console.log('------------------------------------------------------------------');
             */
        }

        function onStateEnterShowObjectsAndHouses(){
            if(vm.fireAct.hasOwnProperty('firePlace') && (vm.fireAct.firePlace.address.naHouse || !!vm.fireAct.firePlace.address.house === false)){
                vm.selectPrimaryStreet(vm.fireAct.firePlace.address, true);
            } else {
                vm.onSelectBuilding(vm.fireAct.firePlace.address, true);
            }
        }

        function selectMode(mode){
            if(mode != vm.mode){
                vm.mode = mode;
            }
        }

        vm.enterAddressMode = function(){
            vm.objectTab = true;
            onStateEnter();
            cleanArrays();
            selectMode(0);
            $timeout(function(){
                jQuery('#orderEditFlow-1').focus();
            }, 0);
        };
        vm.enterObjectMode = function(){
            vm.contactsTab = true;
            onStateEnter();
            cleanArrays();
            selectMode(2);
            $timeout(function(){
                jQuery('#orderEditFlow-0').focus();
            }, 50);
        };
        vm.cancelCrossingMode = function(){
            vm.objectTab = true;
            ws.$emit('selectPlaceStreet', vm.fireAct.firePlace);
            selectMode(0);
            $timeout(function(){
                $('#orderEditFlow-3 input').focus();
            }, 6);
            storage.dataOfStates.editFireOrder.objectsByHouseArray = [];
        };
        vm.crossingsModeEmit = function(){
            vm.contactsTab = true;
            vm.selectFireObject(vm.fireAct.firePlace.fireObject);
            ws.$emit('findPlaceCrossStreets', vm.fireAct.firePlace);
            selectMode(1);
            $timeout(function(){
                $('#orderEditFlow-2 input').focus();
            }, 6);
        };
        ////////////////////////////////////////////
        vm.clearAddress = function(){
            onStateEnter();
            cleanArrays();
        };
        vm.clearObject = function(){
            onStateEnter();
            cleanArrays();
        };
        ///////////////////////////////////////////
        vm.selectFireObjectByKeys = function($event){
            //which 49 - цифра 1
            //which 50 - цифра 2
            if($event.which >= 49 && $event.which <= 57){
                vm.selectFireObject(storage.dataOfStates.editFireOrder.objectsByHouseArray[$event.which - 49]);
            }
        };
        ////////////////////////////////////////////
        ////////////////////////////////////////////
        vm.selectIncidentType = function(type){
            vm.fireAct.incidentType = type;
        };
        vm.selectIncidentSource = function(source){
            vm.fireAct.incidentSource = source;
        };

        vm.primaryStreetFieldChanged = function(data){
            if(vm.storage.dataOfStates.editFireOrder.settings.isHousesEmitSending == false){
                cleanArrays();
            }
            if(data.length > 2){
                var message = data;
                // var oldAddress = Object.assign({}, vm.fireAct.firePlace.address);
                ws.$emit('findPlaceStreets', message);
                if(!vm.fireAct.firePlace.address.naStreet){
                    var temp = '' + message;
                    vm.clearAddress();
                    vm.fireAct.firePlace.address.street = '' + temp
                    // vm.fireAct.firePlace.address.geomX = oldAddress.geomX;
                    // vm.fireAct.firePlace.address.geomY = oldAddress.geomY;
                }

            }
        };


        vm.selectPrimaryStreet = function(item, dontNeedSelect, callback, from){
            vm.storage.dataOfStates.editFireOrder.settings.isHousesEmitSending = true;
            cleanArrays();
            if(angular.isDefined(item)){


                // vm.fireAct.firePlace.fireObject = null;

                if(!!vm.fireAct.firePlace.fireObject === true && item.house != vm.fireAct.firePlace.address.house){
                    storage.dataOfStates.editFireOrder.fireAct.firePlace.fireObject = null;
                    vm.fireAct.firePlace.fireObject = null;
                }


                var message = Object.assign({}, vm.fireAct.firePlace);
                if(message.address.naStreet){
                    item.house = message.address.house;
                }
                // message.address = item;
                for(var i in item){
                    if(item.hasOwnProperty(i)){
                        message.address[i] = item[i];
                    }
                }

                switch(vm.mode){
                    case 0:
                        ws.$emit('selectPlaceStreet', message);
                        break;
                    case 1:
                        ws.$emit('findPlaceCrossStreets', vm.fireAct.firePlace);
                        break;
                    default:
                        growl.warning('something went wrong in new order, select street')
                }
            }
            if(!dontNeedSelect || dontNeedSelect == undefined){
                $timeout(function(){
                    callback(from);
                }, 20);
            }
        };


        vm.onSelectBuilding = function(item, dontNeedSelect, callback, from){
            if(!!item === false){
                storage.dataOfStates.editFireOrder.fireAct.firePlace.address.fireObjects = [];
                vm.fireAct.firePlace.address.fireObjects = [];


                storage.dataOfStates.editFireOrder.fireAct.firePlace.fireObject = null;
                vm.fireAct.firePlace.fireObject = null;

                // console.log('vm.fireAct >>>', vm.mode, vm.fireAct);
                // vm.selectPrimaryStreet(JSON.parse(JSON.stringify(vm.fireAct.firePlace.address)), true);
                // vm.selectPrimaryStreet(JSON.parse(JSON.stringify(vm.fireAct.firePlace.address)), true);
            }
            if(angular.isDefined(item)){




                if(!!vm.fireAct.firePlace.fireObject === true && item.house != vm.fireAct.firePlace.address.house){
                    storage.dataOfStates.editFireOrder.fireAct.firePlace.fireObject = null;
                    vm.fireAct.firePlace.fireObject = null;
                }



                var message = Object.assign({}, vm.fireAct.firePlace);
                // message.address = item;
                for(var i in item){
                    if(item.hasOwnProperty(i)){
                        message.address[i] = item[i];
                    }
                }

                if(!message.hasOwnProperty('fireObject') || message.fireObject === undefined){
                    message.fireObject = null;
                }





                var houseFound = {
                    origHouse: (!!message.address.house === true) ? message.address.house.trim() : '',
                    house: (!!message.address.house === true) ? parseInt(message.address.house.trim().match(/^(^\w[0-9]*)/ig), 10) : 0,
                    sortOut: null,
                    min: null,
                    max: null
                };


                if(!isNaN(houseFound.house) && message.address.naHouse){
                    vm.storage.dataOfStates.editFireOrder.housesArray.forEach(
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


                if(message.address.naHouse === true){
                    message.address.manualHouse = message.address.house;
                }



                if(!!message.naHouse === true){
                    message.fireObjects = [];
                }

                if(!!vm.houseValue === true){
                    vm.storage.dataOfStates.newFireOrder.housesArray.find(function(house){
                        if(vm.houseValue === house.house){
                            message.address = Object.assign({}, house);
                            return true;
                        }
                    });
                }




                ws.$emit('selectPlaceHouse', message);
                storage.dataOfStates.editFireOrder.objectsByHouseArray = [];
                if(!dontNeedSelect || dontNeedSelect == undefined){
                    $timeout(function(){
                        callback(from);
                    }, 0);
                }
            } else {
                var message = vm.fireAct.firePlace;
                message.address.house = null;
                message.fireObject = null;
                ws.$emit('selectPlaceStreet', message);
                vm.houseUISelect = {};//иначе при заведении заявки с карты не отображается дом
                //ws.$emit('selectPlaceHouse', message);
            }
        };
        vm.onSelectCross = function(item, callback, from){
            if(angular.isDefined(item)){
                var message = vm.fireAct.firePlace;
                message.crossStreet = item;
                ws.$emit('selectPlaceCross', message);
                $timeout(function(){
                    callback(from);
                }, 0);
            }
        };
        vm.selectFireObject = function(object){

            if(angular.isDefined(object) && storage.dataOfStates.editFireOrder.canLeave){
                if(object != vm.fireAct.firePlace.fireObject){
                    vm.fireAct.firePlace.fireObject = object;
                    vm.fireAct.rank = _.find(storage.rangs, function(firerank){
                        return firerank.sidfirerank === object.rank;
                    });
                    vm.fireAct.firePlace.geomX = object.x;
                    vm.fireAct.firePlace.geomY = object.y;
                } else {
                    vm.fireAct.firePlace.fireObject = null;
                    vm.fireAct.rank = jQuery.extend({}, defaultRank, true);
                    vm.fireAct.firePlace.geomX = vm.fireAct.firePlace.address.geomX;
                    vm.fireAct.firePlace.geomY = vm.fireAct.firePlace.address.geomY;
                }
            }
            var message = vm.fireAct.firePlace;
            message.address.fireObjects = [object];


            message.address.manualHouse = message.address.house = object.house;
            message.address.geomX = object.x;
            message.address.geomY = object.y;

            ws.$emit('selectPlaceHouse', message);

        };

        vm.manualHouseEnter = function(house){
            if(!!house.originalEvent.target.value === true){
                vm.storage.dataOfStates.editFireOrder.housesArray[vm.storage.dataOfStates.editFireOrder.housesArray.length - 1].house = house.originalEvent.target.value;
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
        vm.onSelectDept = function(item, callback, from){
            if(angular.isDefined(item)){
                var message = vm.fireAct.firePlace;
                message.pchId = item.id;
                message.pchName = item.fireDeptName;
            }
            ws.$emit('selectPlaceDepartment', message);
            $timeout(function(){
                callback(from);
            }, 0);
        };
        vm.onSelectTriplet = function(callback, from){
            $timeout(function(){
                callback(from);
            }, 0);
        };
        vm.objectNameFieldChanged = function(nameObject){
            var message = (_.map(nameObject.split(","), function(str){
                return str.trim();
            })).join(",").toLowerCase();
            if(nameObject.length > 2){
                ws.$emit('findPlaceObjects', message);
            }
            else if(nameObject.length == 0){
                cleanArrays();
            }
            vm.clearObject();
        };
        vm.selectTypedObject = function(item, callback, from){
            cleanArrays();
            if(angular.isDefined(item)){
                var message = vm.fireAct.firePlace;
                message.fireObject = item;
                ws.$emit('selectPlaceObject', message);
                $timeout(function(){
                    callback(from);
                }, 0);
            }
        };
        /////////////////////////
        vm.disableDeptSelect = function(){
            // return vm.mode !== 1 && vm.fireAct.firePlace.address !== null && !vm.fireAct.firePlace.address.naHouse && !vm.fireAct.firePlace.address.naStreet;
            return false;
        };
        vm.disableTripletSelect = function(){
/*
            if(vm.fireAct.firePlace.address !== null){
                var naAddr = vm.fireAct.firePlace.address.naHouse || vm.fireAct.firePlace.address.naStreet;
                //var notEmptyArray = storage.dataOfStates.editFireOrder.tripletsArray !== undefined && storage.dataOfStates.editFireOrder.tripletsArray.length != 0;
                return !naAddr;
            } else {
                return false;
            }
*/
            return false;
        };
        vm.districtDisabled = function(){
            if(vm.fireAct.firePlace.address !== null){
                return !vm.fireAct.firePlace.address.naStreet;
                // return !vm.fireAct.firePlace.address.naHouse && !vm.fireAct.firePlace.address.naStreet;
            } else return true;
        };
        ////////////////////////
        vm.agreePlace = function(){
            storage.hideLoadingOverlay = false;
            /*
             for(var i = 0; i < vm.storage.dataOfStates.editFireOrder.fireAct.addOrders.length; i++){
             vm.storage.dataOfStates.editFireOrder.fireAct.orders.push(vm.storage.dataOfStates.editFireOrder.fireAct.addOrders[i]);
             }

             vm.storage.dataOfStates.editFireOrder.fireAct.addOrders = [];

             */

            /*
             console.log('o', vm.storage.dataOfStates.editFireOrder.fireAct.orders);
             console.log('a', vm.storage.dataOfStates.editFireOrder.fireAct.addOrders);
             */

            // var act = JSON.parse(JSON.stringify(vm.storage.dataOfStates.editFireOrder.fireAct));
            var act = JSON.parse(JSON.stringify(vm.fireAct));
            var message = {
                fireAct: act
            };
            act = null;
            // console.clear();
            // console.log('namefirerank >>>', message.fireAct.rank.namefirerank);

            ws.$emit('changeFireplaceOfFire', JSON.parse(JSON.stringify(message)));
        };
        ///////////////////////////

        vm.getDislocationDept = function(fireEngine){

            if(fireEngine !== undefined && fireEngine.hasOwnProperty('fireEngineDept') && fireEngine.fireEngineDept){
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
                    if(engine.hasOwnProperty('locationDeptId') && engine.locationDeptId != null){
                        var dislocationDept = _.find(storage.fireDepartments, function(dept){
                            return dept.id === engine.locationDeptId;
                        });
                        return dislocationDept;
                    } else {
                        return null;
                    }
                }
            } else {
                if(fireEngine !== undefined && fireEngine.locationDeptId){
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
            if(fireEngine !== undefined){
                var dept = vm.getDislocationDept(fireEngine);
                if(dept != null){
                    return "(" + dept.fireDeptName + ")";
                }
                else {
                    return '';
                }
            }
        };
        vm.onAddPotentialEngine = function(element){
            //var fireAct = vm.fireAct;
            var message = {
                fireActId: vm.fireAct.id,
                fireAct: vm.fireAct,
                deptId: element.deptId,
                idFireEngine: element.engine.idFireEngine
            };
/*

 potentialEngines: _.map(storage.dataOfStates.editFireOrder.listOfAdditionalTech, function(eng){
 return {deptId: eng.deptId, idFireEngine: eng.engine.idFireEngine}
 }),
 notFoundOrders: storage.dataOfStates.editFireOrder.notFoundOrders,
 totalOrders: storage.dataOfStates.editFireOrder.totalOrders


             */
// console.log('message >', message);

            ws.$emit('addPotentialToTotalOrders', message);
        };
        ///////////////////////////
        vm.showSpider = function(){
            ws.$emit('showSpider', {
                x: vm.fireAct.firePlace.geomX,
                y: vm.fireAct.firePlace.geomY,
                ticket: $cookies.get('ticket')
            });
        };
        ///////////////////////////
        onStateEnter();
        onStateEnterShowObjectsAndHouses();
        ///////////////////////////
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

            var index = vm.storage.dataOfStates.editFireOrder.totalOrders.indexOf(order);
            if(index != -1){
                vm.storage.dataOfStates.editFireOrder.totalOrders.splice(index, 1);
            }

        };
        ///////////////////////////
        vm.leaveState = function(){
            ws.$emit('selectFire', {
                fireActId: storage.selectedFire.id,
                ticket: $cookies.get('ticket')
            });
            storage.dataOfStates.editFireOrder.canLeave = true;
            goAwayFromState();
        };
        vm.cancelOrder = function(){
            storage.dataOfStates.editFireOrder.canLeave = true;
            var enginesList = _.map(vm.storage.dataOfStates.editFireOrder.totalOrders, function(order){
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

            goAwayFromState();
        };
        vm.addEnginesToFire = function(){
            // _.each(vm.storage.dataOfStates.editFireOrder.addOrders, function(order){
            // vm.storage.dataOfStates.editFireOrder.addOrders.map(function(order){
            // _.each(vm.fireAct, function(order){


            var command = [];
            // console.log('vm.fireAct.addOrders >', vm.storage.dataOfStates.editFireOrder.fireAct.addOrders);
            vm.storage.dataOfStates.editFireOrder.fireAct.addOrders.map(function(order){
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
            /*
             vm.fireAct.addOrders.map(function(order){
             var command = {
             deptId: order.fireEngineDept,
             engineId: order.fireEngine.idFireEngine,
             fireActId: vm.fireAct.id,
             orderAs: order.orderAs
             };
             ws.$emit('addEngineToFireManually', command);
             });
             */
            goAwayFromState();

        };
        ///////////////////////////

        vm.showPathFromPchToFire = function(order){
            var deptId = (order.fireEngineDept != undefined) ? order.fireEngineDept : order.deptId;
            var dept = _.find(storage.fireDepartments, function(dept){
                return dept.id === deptId;
            });

            var command = {};
            command.deptId = dept.id;
            command.deptName = dept.fireDeptName;
            command.engineType = '';
            command.fireActId = vm.fireAct.id;
            command.ticket = $cookies.get('ticket');
            ws.$emit('showPathFromPchToFire', command);
        };
        ///////////////////////////
        // vm.houseNumber = (vm.fireAct.address.manualHouse !== null)? vm.fireAct.address.manualHouse : vm.fireAct.address.house;

// console.log('addOrders >', vm.storage.dataOfStates.editFireOrder.fireAct.addOrders);

    }
})
();
