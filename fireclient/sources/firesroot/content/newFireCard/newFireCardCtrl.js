(function(){
    'use strict';
    angular
        .module('app.newFireCard', [])
        .controller('NewFireCard', NewFireCard)
        .run(['ws', 'storage', '$rootScope', 'growl', '$log', '$state', '$timeout', function(ws, storage, $rootScope, growl, $log, $state, $timeout){

        }]);


    NewFireCard.$inject = ['$log', '$scope', 'ws', 'storage', '$location', '$stateParams', '$state', '$cookies', '$timeout', 'getNumDept', 'houseSorting', 'objectsSorting', 'modalsService', '$http', 'HTTPURLDesktop', '$rootScope', '$window', 'growl', '$parse', '$compile', 'printRequest'];

    function NewFireCard($log, $scope, ws, storage, $location, $stateParams, $state, $cookies, $timeout, getNumDept, houseSorting, objectsSorting, modalsService, $http, HTTPURLDesktop, $rootScope, $window, growl, $parse, $compile, printRequest){
        ws.$on('findAnything', function(message){

            // console.log('message >', message);
            var a = {}

            if(!!message === true){

                for(var i in message){
                    if(message.hasOwnProperty(i)){

                        // console.log('-1 >', message);

                        switch(i){

                            case 'settlements':
                                vm.storage.dataOfStates.newFireCard.settlementArray = message[i];
                                break;

                            case 'address':


                                // clearAddress();

                                // console.log('0 >', message[i]);

                                vm.storage.dataOfStates.newFireCard.fireAct = Object.assign({}, cleanNewFireAct);

                                // console.log('1 >', vm.storage.dataOfStates.newFireCard.fireAct);

                                vm.storage.dataOfStates.newFireCard.fireAct.firePlace.address = Object.assign({}, message[i]);
                                // console.log('2 >', message[i]);

                                /*
                                 var streetNode = $window.document.body.querySelector('#select-street > input:first-of-type');
                                 console.log('3 >', message[i]);

                                 if(!!streetNode === true && streetNode.nodeType === 1){
                                 console.log('4 >', message[i]);
                                 streetNode.value = message[i].street;
                                 console.log('5 >', message[i]);
                                 }
                                 */


                                /*
                                 console.log('1 >', message[i]);
                                 console.log('2 >', vm.storage.dataOfStates.newFireCard.fireAct);
                                 */

                                /*
                                 vm.storage.dataOfStates.newFireCard.fireAct.firePlace.address = Object.assign({}, message[i]);
                                 */


                                /*
                                 (function(mess){
                                 $timeout(function(){
                                 vm.fireAct.firePlace.address = Object.assign({}, mess);
                                 }, 0);
                                 })(message[i]);
                                 */

                                break;

                            case 'addresses':
                                var addresses = [],
                                    similar = [],
                                    raionNames = {};

                                // console.log('message[i] >', message[i]);

                                for(var j = 0, l = message[i].length; j < l; j++){
                                    if(!raionNames.hasOwnProperty(message[i][j].district)){
                                        raionNames[message[i][j].district] = {};
                                    }
                                    if(!!message[i][j].raionName === true && !!message[i][j].district === true){

                                        if(!raionNames[message[i][j].district].hasOwnProperty(message[i][j].street)){

                                            // console.log('--- >', message[i][j].district, message[i][j].street, message[i][j].raionName);


                                            raionNames[message[i][j].district][message[i][j].street] = [];

                                        }

                                        if(!raionNames[message[i][j].district][message[i][j].street].includes(message[i][j].raionName)){

                                            raionNames[message[i][j].district][message[i][j].street].push(message[i][j].raionName);
                                            // console.log('------message[i][j].raionName >', message[i][j].raionName);

                                        }


                                        // raionNames[message[i][j].street].push(message[i][j].raionName);

                                    }

                                    if(!similar.includes(message[i][j].street + message[i][j].district)){
                                        similar.push(message[i][j].street + message[i][j].district);


                                        if(raionNames.hasOwnProperty(message[i][j].district) && raionNames[message[i][j].district].hasOwnProperty(message[i][j].street)){

                                            message[i][j].raionNames = raionNames[message[i][j].district][message[i][j].street];

                                        }

                                        /*
                                         if(raionNames.hasOwnProperty(message[i][j].street)){

                                         message[i][j].raionNames = raionNames[message[i][j].street];

                                         }
                                         */


                                        addresses.push(message[i][j]);
                                    }
                                    /*
                                     if(!similar.includes(message[i][j].street + message[i][j].raionName + message[i][j].district)){
                                     similar.push(message[i][j].street + message[i][j].raionName + message[i][j].district);
                                     addresses.push(message[i][j]);

                                     }
                                     */
                                }
                                /*
                                 console.log('addresses >', addresses);
                                 console.log('raionNames >', raionNames);
                                 */

                                storage.dataOfStates.newFireCard.streetsArray = addresses;
                                addresses = similar = raionNames = null;

                                // storage.dataOfStates.newFireCard.streetsArray = message[i];
                                break;

                            case 'crosses':
                                var cross = [],
                                    similar = [];
                                for(var j = 0, l = message[i].length; j < l; j++){
                                    if(!similar.includes(message[i][j].cross + message[i][j].pch)){
                                        similar.push(message[i][j].cross + message[i][j].pch);
                                        cross.push(message[i][j]);

                                    }
                                }
                                // storage.dataOfStates.newFireCard.crossesArray = message[i];
                                storage.dataOfStates.newFireCard.crossesArray = cross;
                                cross = similar = null;

                                break;

                            case 'houses':
                                var numbers = [];

                                for(var j = 0, l = message[i].length; j < l; j++){
                                    numbers.push(message[i][j].house.toUpperCase());
                                }
                                storage.dataOfStates.newFireCard.housesArray = message[i];

                                /*
                                 console.log('------------------- 1> ', storage.dataOfStates.newFireCard.housesArray);

                                 storage.dataOfStates.newFireCard.housesArray.sort(function(a, b){
                                 a.house > b.house ? 1 : a.house < b.house ? -1 : 0;
                                 });


                                 console.log('------------------- 2> ', storage.dataOfStates.newFireCard.housesArray);
                                 */


                                storage.dataOfStates.newFireCard.housesNumbersArray = numbers;
                                break;

                            case 'pchs':
                                if(message[i] instanceof Array && !!message[i].length === true){
                                    storage.dataOfStates.newFireCard.pchArray = message[i];
                                } else {
                                    storage.dataOfStates.newFireCard.pchArray = [];
                                    for(var i = 0, l = storage.fireDepartments.length; i < l; i++){
                                        storage.dataOfStates.newFireCard.pchArray.push(
                                            {pch: storage.fireDepartments[i].fireDeptName}
                                        );
                                    }
                                }
                                break;

                            case 'objects':
                                // storage.dataOfStates.newFireCard.objectsArray = message[i];
                                // console.log('storage.dataOfStates.newFireCard.objectsArray >', storage.dataOfStates.newFireCard.objectsArray);
                                storage.dataOfStates.newFireCard.objectsArray = [];
                                // vm.clearData([0,0,1,0,0,0]);
                                message[i].forEach(function(elem){

                                        if(elem.hasOwnProperty('fireObjects')){

                                            for(var k = 0, l = elem.fireObjects.length; k < l; k++){
                                                elem.fireObjects[k].address = {};
                                                for(var j in elem){
                                                    if(elem.hasOwnProperty(j)){

                                                        elem.fireObjects[k].address[j] = elem[j]
                                                    }

                                                }
                                                if(elem.fireObjects[k].address.hasOwnProperty('fireObjects')){
                                                    delete(elem.fireObjects[k].address.fireObjects);
                                                }
                                            }

                                        }

                                        Array.prototype.push.apply(storage.dataOfStates.newFireCard.objectsArray, elem.fireObjects);


                                    }
                                );
                                // console.log('storage.dataOfStates.newFireCard.objectsArray >', storage.dataOfStates.newFireCard.objectsArray);
                                storage.controllers.newFireCard.showObjectInList();
                                // fillTriplets(message[i]);
                                break;

                        }

                        /*                        console.log('dataOfStates.newFireCard >', JSON.stringify(storage.dataOfStates.newFireCard.objectsArray[15]));*/

                    }
                }

                /*
                 storage.controllers.newFireCard.fireAct.firePlace.fireObject =
                 {"id":144047,"nameobject":"АПАРТ-ОТЕЛЬ \"ВЕРТИКАЛЬ\"","typeobject":"","rank":"1-1БИС","prim":"=МИН-ВО 118 =ГЛАВК 07 *ВНИМАНИЕ! ТРЕБУЕТСЯ АЛ-50!!! **ПР.№85 ОТ 27.02.17","rangmodifiers":"","addteches":"АЛ-30=1;АЛ-50=1;АВЗ=1;АГ=1;АЦ=2;","isenabled":0,"oldoid":0,"x":30.3178683052957,"y":59.90499661663991,"address":{"lucene":true,"gid":144047,"street":"Московский проспект","naStreet":false,"house":"73","naHouse":false,"manualHouse":null,"district":"округ Измайловское","raionName":"Адмиралтейский район","settName":null,"regName":"Санкт-Петербург","geomX":30.3178683052957,"geomY":59.90499661663991,"code":141,"regId":337422,"settId":0,"raionId":1114193,"districtId":1123298,"osm_id":0,"cross":"","pch":"14","pch_id":13,"triplets":{"id":66,"dept1":"14","dept2":"4","dept3":"5"},"unique":""},"street":"Московский проспект","house":"73","updater":"","updwhen":null};
                 */

                $scope.$apply();
            }

        });


        ws.$on('route666', function(message){

            storage.hideLoadingOverlay = true;
            vm.preload = false;
            // console.log('route666 >>>', storage.controllers.newFireCard.fireAct);

            if(message !== undefined && !!message === true){

                storage.controllers.newFireCard.fireAct = Object.assign({}, message);


                if(message.hasOwnProperty('createDate') && !!message.createDate === true && message.hasOwnProperty('startDate') && !!message.startDate === true && message.hasOwnProperty('id') && !!message.id === true){
                    ws.$emit('selectFire', {fireActId: message.id});
                }

                storage.dataOfStates.newFireCard.listOfAdditionalTech = _.map(message.potentialEngines, function(eng){
                    var dept = _.find(storage.fireDepartments, function(dept){
                        return dept.id === eng.deptId;
                    });
                    var engine = _.find(dept.fireEngines, function(engine){
                        // console.log('engine > ', `engine.fireEngineState.name, engine.fireEngineState.onDuty);
                        return engine.idFireEngine === eng.idFireEngine;
                    });
                    return {fireDeptName: dept.fireDeptName, deptId: dept.id, engine: engine}
                });

                // storage.dataOfStates.newFireCard.

            }
            $scope.$apply();

        });


        var vm = this;

        vm.storage = storage;
        storage.controllers.newFireCard = vm;


        vm.houseValue = '';
        vm.oldHouseNumber = '';
        vm.expandedFields = {};
        vm.fireNotificationsCopy = [];
        vm.gridOptions = {};
        vm.protocolGridApi = {};
        vm.stateCalledFrom = $stateParams.calledFrom || null;
        vm.gridIsReady = false;
        vm.playbackAudio = null;
        vm.popoverTemplareUrl = 'audioTemplate.html';
        vm.fieldsForControl = {};
        vm.houseSorting = houseSorting;
        vm.objectsSorting = objectsSorting;
        vm.foundedObjects = [];
        vm.preload = false;
        vm.streetValueControl = '';
        vm.incidentTypeCode = null;

        /*
         vm.sortedRanks = [];

         vm.storage.rangs.forEach(function(rang){

         if(!rang.sidfirerank.includes('-')){
         vm.sortedRanks.push(rang);
         }

         });
         */


        vm.currentTab = (function(){
            switch($stateParams.calledFrom){
                case 'protocol':
                    return 3;
                    break;
                case 'newFireCard':
                    return 0;
                    break;
                default:
                    return 0;
                    break
            }
        })();

        if(!!$stateParams.fireId === false){
            storage.selectedFire = null;
        }


        // console.log('$stateParams >>>>', vm.currentTab);

        var baseIncidentType = storage.incidentTypes.find(function(type){
            vm.incidentTypeCode = 2;
            return type.code === 2
        });
        var baseIncidentSource = storage.incidentSources.find(function(source){
            return source.code == 1;
        });
        var defaultRegion = storage.regions.find(function(region){
            return region.code === 141;
        });
        var cleanAddress = {
            settName: null,
            settId: null,
            district: null,
            districtId: null,
            geomX: 0,
            geomY: 0,
            street: null,
            naStreet: true,
            house: null,
            naHouse: true,
            regName: vm.storage.terra.name
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
        var LORegion = storage.regions.find(function(region){
            return region.code === 1141;
        });
        var defaultChsStatuse = storage.chsDict.chsStatuses.find(function(status){
            return status.sort == 1;
        });


        var cleanNewFireAct = {
            id: null,
            firePlace: {
                region: defaultRegion,
                address: cleanAddress,
                crossStreet: null,
                fireObject: null,
                geomX: 0,
                geomY: 0,
                pchName: '',
                pchId: 0,
                triplet: null
            },
            triplet: null,
            incidentType: baseIncidentType,
            incidentSource: baseIncidentSource,
            rank: defaultRank,
            comment: '',
            floor: null,
            floors: null,
            flat: null,
            doorCode: null,
            callerContactPhone: '',
            chs: {},
            chsStatuse: defaultChsStatuse
        };


        vm.getNumDept = getNumDept;


        vm.criticalFields = [
            'firePlace.address.pch',
            // 'firePlace.address.triplets',
            'incidentSource',
            'incidentType',
            'rank',
            'comment'
        ];


        vm.showFireAct = function(){

            console.log('vm.fireAct >>>>', vm.fireAct)

        };


        vm.likeRangEngine = function(rang){

            if(rang !== undefined && !!rang === true){

                vm.preload = true;
                vm.fireAct.manualrank = rang
                ws.$emit('route666', vm.fireAct);
                delete vm.fireAct.manualrank;

                /*
                 var message = {
                 fireActId: vm.fireAct.id,
                 manualrank: rang
                 };
                 ws.$emit('changeRankOfFire', message);
                 */
            }


        };


        function clearAddress(){
            // console.log('6 >');
            vm.fireAct.firePlace.address = Object.assign({}, cleanAddress);
            // console.log('7 >');
        };

        function clearFireObject(){
            vm.fireAct.firePlace.fireObject = {};
            // console.log('-------------------------------------------');
        };

        vm.clearData = function(dest){
            if(dest !== undefined && !!dest === true && dest instanceof Array){
                for(var i = 0, l = dest.length; i < l; i++){
                    switch(i){
                        case 0:
                            if(!!dest[i] === true){
                                storage.dataOfStates.newFireCard.settlementArray = [];
                            }
                            break;
                        case 1:
                            if(!!dest[i] === true){
                                storage.dataOfStates.newFireCard.streetsArray = [];
                            }
                            break;
                        case 2:
                            if(!!dest[i] === true){
                                storage.dataOfStates.newFireCard.objectsArray = [];
                            }
                            break;
                        case 3:
                            if(!!dest[i] === true){
                                storage.dataOfStates.newFireCard.housesArray = [];
                                storage.dataOfStates.newFireCard.housesNumbersArray = [];
                                vm.houseValue = '';
                            }
                            break;
                        case 4:
                            if(!!dest[i] === true){
                                storage.dataOfStates.newFireCard.pchArray = [];
                            }
                            break;
                        case 5:
                            if(!!dest[i] === true){
                                storage.dataOfStates.newFireCard.tripletsArray = [];
                            }
                            break;
                        case 6:
                            if(!!dest[i] === true){
                                storage.dataOfStates.newFireCard.crossesArray = [];
                                vm.fireAct.firePlace.crossStreet = null;
                            }
                            break;

                        case 7:
                            vm.foundedObjects = [];
                            break;

                    }
                }
            }
        };


        vm.disableEngineReserv = function(){


            function hasOwnDeepProperty(obj, path){
                for(var i = 0, path = path.split('.'), len = path.length; i < len; i++){
                    obj = obj[path[i]];
                    if(!obj){
                        return obj;
                    }
                }
                ;
                return true;
            }


            var correct = 0;

            for(var i = 0, l = vm.criticalFields.length; i < l; i++){

                correct = (!!hasOwnDeepProperty(vm.fireAct, vm.criticalFields[i]) === true)? correct + 1 : correct;
            }

            return correct !== vm.criticalFields.length;

        };

        vm.checkStreetValue = function(event){
            console.log('event >', event);
        };


        vm.inputControl = function(event){

            clearFireObject();
            // clearAddress();
            if(event !== undefined && !!event === true){


                var value = event.originalEvent.target.value;
                if(new RegExp(/^\d{2}\.{1}/igu).test(value)){
                    value = value.replace(/[^0-9\.,]/gim, '');
                    /*
                     if(new RegExp(/^\d{2}\.{1}\d+/igu).test(value) && new RegExp(/,{1}/igu).test(value)){
                     value += ',';
                     }
                     */
                }
                event.originalEvent.target.value = value;
            }
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

            var deptId = (order.fireEngineDept != undefined)? order.fireEngineDept : order.deptId;
            var dept = _.find(storage.fireDepartments, function(dept){
                // console.log('deptdeptdeptdeptdept', dept.deptId, vm.fireAct.firePlace.pchId, dept.deptId === vm.fireAct.firePlace.pchId, dept);
                return dept.deptId === vm.fireAct.firePlace.pchId;
            });

            var command = {
                deptId: deptId
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
            if(fireEngine !== undefined && !!fireEngine === true){
                var dept = vm.getDislocationDept(fireEngine);
                if(dept != null){
                    return "(" + dept.fireDeptName + ")";
                }
                else {
                    return '';
                }
            }
            return '';
        };

        vm.onAddPotentialEngine = function(element){
            var message = {
                deptId: element.deptId,
                idFireEngine: element.fireEngine.idFireEngine,
                fireAct: vm.fireAct
            };
            ws.$emit('orderEngineManually', message)
        };


        vm.pointOnMap = function(){
            if(!!vm.fireAct.firePlace.address.geomX === true && !!vm.fireAct.firePlace.address.geomY === true){
                var message = {
                    x: vm.fireAct.firePlace.address.geomX,
                    y: vm.fireAct.firePlace.address.geomY,
                    flag: 0
                };
                ws.$emit('putPointOnMap', message);
            }
        };


        vm.getTriplet = function(pch){
            if(pch !== undefined){
                var triplet, trip;
                for(var i = 0, l = vm.storage.triplets.length; i < l; i++){
                    triplet = vm.storage.triplets[i];
                    trip = Object.assign({}, triplet)
                    if(trip.hasOwnProperty('$$hashKey')){
                        delete(trip['$$hashKey']);
                    }
                    delete(trip.id);
                    trip = Object.values(trip);
                    if(!!trip === true && trip instanceof Array){
                        if(trip.indexOf(pch) !== -1){
                            trip.splice(trip.indexOf(pch), 1);
                            trip = [pch].concat(trip);
                            if(!!trip === true && trip instanceof Array && trip.length === 3){
                                for(var j = 0; j < 3; j++){
                                    triplet['dept' + (j + 1)] = trip[j];
                                }
                                vm.storage.dataOfStates.newFireCard.tripletsArray.push(triplet);
                            }
                        }
                    }
                }
                if(vm.storage.dataOfStates.newFireCard.tripletsArray.length > 0){
                    vm.fireAct.firePlace.address.triplets = Object.assign({}, vm.storage.dataOfStates.newFireCard.tripletsArray[0]);
                }
            }
            return false;
        };


        /*
         vm.getTriplet = function(triplet){
         console.log('1 --->');
         if(triplet !== undefined && !!triplet === true){
         console.log('2 --->');
         if(!!vm.fireAct.firePlace.address.pch === true){
         console.log('3 --->');
         var trip = Object.assign({}, triplet),
         pch = vm.fireAct.firePlace.address.pch;
         console.log('4 --->');
         if(!!trip === true){
         console.log('5 --->');
         delete(trip.id);
         if(trip.hasOwnProperty('$$hashKey')){
         console.log('6 --->');
         delete(trip['$$hashKey']);
         }
         console.log('7 --->');
         trip = Object.values(trip);
         if(!!trip === true && trip instanceof Array){
         console.log('8 --->');
         if(trip.indexOf(pch) !== -1){
         trip.splice(trip.indexOf(pch), 1);
         trip = [pch].concat(trip);
         console.log('trip trip trip --->', trip);
         if(!!trip === true && trip instanceof Array && trip.length === 3){
         for(var i = 0; i < 3; i++){
         triplet['dept' + (i + 1)] = trip[i];
         }
         return triplet;
         }
         }
         }
         }
         }
         }
         return false;
         };
         */


        vm.setAddress = function(data){
            if(data !== undefined && !!data === true){
                // console.log('vm.selectPch(data.pch); >>>', data);
                vm.fireAct.firePlace.address = Object.assign(data);


                vm.houseValue = data.house;
                vm.selectPch(data.pch);
            }
        };

        /*

         vm.exampleOptions = {
         displayKey: 'title'
         };

         */


        vm.selectBuilding = function(item){


            /*
             if(item !== undefined && !!item === true){
             vm.fireAct.firePlace.pchId = item.fireDeptId;
             vm.fireAct.firePlace.pchName = item.fireDeptName;
             }
             */


            if(item !== undefined && !!item === true){
                vm.setAddress(item);
                vm.createTripletList();
                // console.log('item 111>>>', item, vm.fireAct.firePlace);
            }


            vm.pointOnMap();
            if(!!vm.fireAct.firePlace.address.pch_id === true){
                vm.selectPch(vm.fireAct.firePlace.address.pch);
            }


            /*            var message = Object.assign({}, vm.fireAct.firePlace);
             message.fireObject = null;


             var houseFound = {
             origHouse: (!!message.address.house === true)? message.address.house.trim() : '',
             house: (!!message.address.house === true)? parseInt(message.address.house.trim().match(/^(^\w[0-9]*)/ig), 10) : 0,
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

             if(!!message.naHouse === true){
             message.fireObjects = [];
             }
             */

        };


        vm.test = function(event){
            console.log('!----->>>>>>>', vm.fireAct);
        }

        /*
         vm.numbersDataset = {
         displayKey: 'num',
         source: numbers.ttAdapter(),
         templates: {
         empty: [
         '<div class="tt-suggestion tt-empty-message">',
         'No results were found ...',
         '</div>'
         ].join('\n'),
         }
         };

         */


        vm.viewFullText = function(dest){
            if(!vm.expandedFields.hasOwnProperty(dest)){
                vm.expandedFields[dest] = true;
            } else {
                vm.expandedFields[dest] = !vm.expandedFields[dest];
            }
        };


        vm.reserveCars = function(){
            storage.hideLoadingOverlay = false;


            console.log('+++++++++++>>>', vm.fireAct.chs);

            ws.$emit('route666', vm.fireAct);
        };


        vm.checkAndCorrectValue = function(value){
            return (value === undefined || value === null)? '' : value.toLowerCase().trim();
        };

        vm.checkActiveFireDuplicate = function(){
            var found = {
                    'adress': [
                        $parse('firePlace.address.street')(vm.fireAct),
                        $parse('firePlace.address.house')(vm.fireAct),
                        $parse('firePlace.flat')(vm.fireAct),
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

                    if(!!currFire.street === true && !!aFire.firePlace.address.street === true && currFire.street.toLowerCase() == aFire.firePlace.address.street.toLowerCase()){
                        ++match;
                    }

                    if(currFire.house == aFire.firePlace.address.house){
                        ++match;
                    }

                    if(!!currFire.district === true && !!aFire.firePlace.address.district === true && currFire.district.toLowerCase() == aFire.firePlace.address.district.toLowerCase()){
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


            // vm.reserveCars();


        };


        vm.agreePlace = function(){
            vm.checkActiveFireDuplicate();
        };


        vm.selectRank = function(item){
            if(item !== undefined && !!item === true){
                vm.storage.rangs.find(function(rank){
                    if(rank.namefirerank === item){
                        vm.fireAct.rank = Object.assign({}, rank);
                        return true;
                    }
                });

            }

        };


        vm.highlightObject = function(object){


            var objClass = '';

            if(object !== undefined && !!object === true){

                if(!!vm.fireAct.firePlace.fireObject === true && vm.fireAct.firePlace.fireObject.hasOwnProperty('id') && object.id == vm.fireAct.firePlace.fireObject.id){
                    objClass = 'active';
                } else {

                    if(!!object.house === true && !!vm.fireAct.firePlace.address.house === true && object.house == vm.fireAct.firePlace.address.house && object.street == vm.fireAct.firePlace.address.street){
                        objClass = 'orderFoundObject';
                    }

                }


            }

            return objClass;
            /*{'orderFoundObject':fireObject.house == newFireCard.fireAct.firePlace.address.house && fireObject.street == newFireCard.fireAct.firePlace.address.street, 'active':fireObject.id==newFireCard.fireAct.firePlace.fireObject.id}
             */
        };


        vm.selectObject = function(object){
            if(object !== undefined && !!object === true){
                vm.fireAct.firePlace.address = Object.assign({}, object.address);
                vm.fireAct.firePlace.fireObject = Object.assign({}, object);
                vm.houseUISelect = Object.assign({}, object.address);
                if(!!object.address.pch === true){
                    vm.selectPch(object.address.pch);
                }

                // console.log('object 1>', object);


                vm.selectBuilding(object.address);

                if(!!object.rank === true){
                    vm.selectRank(object.rank)
                    // vm.fireact.rank = Object.assign({}, vm.selectRank(object.rank));
                }

            }
            vm.createTripletList();
            vm.pointOnMap();


            /*
             console.log(object);
             console.log(vm.fireAct.firePlace.fireObject);
             */


            /*
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

             /!*
             console.log('object----------------------');
             console.log(object);
             console.log('message----------------------');
             console.log(message);
             *!/
             ws.$emit('selectPlaceHouse', message);
             }
             */
        };


        vm.selectPch = function(name){

            // console.log(' namenamenamenamenamename >>>>>', name, vm.fireAct.firePlace.pchName, vm.fireAct.firePlace.triplet);
            /*
             vm.fireAct.firePlace.address.pch = vm.fireAct.firePlace.address.pchName = item.pch;
             vm.fireAct.firePlace.address.pchId = item.id;
             */

            if(!!name === true){

                // vm.getTriplet();

                // vm.fireAct.firePlace.pchId = name.id;

                // if(!!vm.fireAct.firePlace.address.triplets === true){


                /*
                 if(!!vm.fireAct.firePlace.triplet === false && !!vm.fireAct.firePlace.address.triplets === true ){
                 vm.fireAct.firePlace.triplet = Object.assign({}, vm.fireAct.firePlace.address.triplets);
                 // vm.fireAct.firePlace.address.triplets = null;
                 }
                 */


                /*
                 if(name != vm.fireAct.firePlace.pchName){
                 vm.fireAct.firePlace.triplet = null;
                 }
                 */

                if(name != vm.fireAct.firePlace.address.pch){
                    vm.fireAct.firePlace.address.triplets = null;
                }


                // vm.fireAct.firePlace.pchName = name;
                vm.fireAct.firePlace.address.pch = name;


                if(vm.fireAct.firePlace.address.hasOwnProperty('pch') && !!vm.fireAct.firePlace.address.pch === true){
                    vm.storage.fireDepartments.find(function(dept){
                        if(vm.fireAct.firePlace.address.pch === dept.fireDeptName){
                            vm.fireAct.firePlace.address.pch_id = dept.deptId;
                            return true;
                        }

                    });
                }
                /*
                 if(vm.fireAct.firePlace.hasOwnProperty('pchName') && !!vm.fireAct.firePlace.pchName === true){
                 vm.storage.fireDepartments.find(function(dept){
                 if(vm.fireAct.firePlace.pchName === dept.fireDeptName){
                 vm.fireAct.firePlace.pchId = dept.deptId;
                 return true;
                 }

                 });
                 }
                 */


                /*
                 vm.storage.fireDepartments.find(function(pch){
                 if(pch.fireDeptName === name){
                 console.log('selectPch 1>', name);
                 vm.fireAct.firePlace.address.pch = pch.fireDeptName;
                 return true;
                 }
                 });
                 */
            }


            vm.createTripletList();
        };

        vm.searchFieldChanged = function(string, type){
            //newFireCard.storage.dataOfStates.newFireCard.streetsArray
            // console.log('1 >', arguments);
            if(!!vm.fireAct === true && !!vm.fireAct.firePlace === true){
                var sendEmit = true;

                // var request = {};

                switch(type){
                    case 'street':
                    case 'settlement':
                        if(!!string === true && string.length >= 3){

                            var input;
                            /*
                             request = {
                             address: Object.assign({}, vm.fireAct.firePlace.address)
                             };
                             */
                            switch(type){
                                case 'street':
                                    vm.fireAct.firePlace.address.street = string;
                                    vm.fireAct.firePlace.address.district = '';
                                    vm.fireAct.firePlace.address.districtId = 0;
                                    vm.fireAct.firePlace.address.regId = 0;
                                    vm.fireAct.firePlace.address.raionId = 0;
                                    vm.fireAct.firePlace.address.geomX = 0;
                                    vm.fireAct.firePlace.address.geomY = 0;
                                    /*
                                     request.address.street = string;
                                     request.address.district = '';
                                     request.address.districtId = null;
                                     */
                                    break
                                case 'settlement':
                                    vm.fireAct.firePlace.address.settName = string;
                                    // request.address.settName = string;
                                    break
                            }

                            input = true;
                            // request.input = true;
                        } else {
                            /*
                             vm.storage.dataOfStates.newFireCard.settlementArray = [];
                             vm.storage.dataOfStates.newFireCard.streetsArray = [];
                             vm.storage.dataOfStates.newFireCard.objectsArray = [];
                             */


                            if(!!vm.fireAct === true && !!vm.fireAct.firePlace === true && !!vm.fireAct.firePlace.address.house === true){
                                vm.oldHouseNumber = vm.fireAct.firePlace.address.house;
                            }

                            // console.log('searchFieldChanged >>>>', arguments);

                            if(!!string === true && string.length > 0 && string.length < 3){
                                vm.clearData([1, 1, 1, 0, 0, 0, 1, 1]);
                                clearAddress();
                            }
                            sendEmit = false;
                        }
                        break;
                    case 'crossRoad':
                        input = false;
                        break;
                    default:
                        input = false;
                        sendEmit = false;
                        // request.input = false;
                        break;
                }

                /*
                 console.log('');
                 console.log('!!!!!!!!!!!! findAnything !!!!!!!!!!! request >', vm.fireAct.firePlace);
                 console.log('');
                 */


                if(sendEmit === true){
                    ws.$emit('findAnything', {
                        address: vm.fireAct.firePlace.address,
                        input: input
                    });
                }
                // ws.$emit('findAnything', request);
            }
        };


        vm.getObjectByAddress = function(){
            var objects = [];
            vm.foundedObjects = [];
            if(!!vm.storage.dataOfStates.newFireCard.objectsArray === true){
                objects = vm.storage.dataOfStates.newFireCard.objectsArray;

                for(var i = 0, l = objects.length; i < l; i++){

                    /*
                     console.log('Object >', objects[i], vm.fireAct.firePlace.address.street, objects[i].address.street,  vm.fireAct.firePlace.address.house, objects[i].address.house);
                     */

                    if(vm.fireAct.firePlace.address.street === objects[i].street && vm.fireAct.firePlace.address.house === objects[i].house){
                        vm.foundedObjects.push(objects[i]);
                    }


                }
                // console.log('Object 2>', vm.foundedObjects);

            }

        };


        vm.disableRankByIncSource = function(){



            // incidentType.code === 1 это в справочнике ПОЖАР

            if(!!vm.fireAct.incidentType === true && vm.fireAct.incidentType.code === 1 && !!vm.fireAct.startDate !== true){
                return false;
            } else {
                if(!!vm.fireAct.incidentType === true && vm.fireAct.incidentType.code != 1 && vm.fireAct.rank.namefirerank != '1'){
                    vm.storage.rangs.find(function(rang){
                        if(rang.namefirerank === '1'){
                            vm.fireAct.rank = Object.assign({}, rang);
                            return true;
                        }
                    });
                }
            }
            return true;
        };

        vm.selectStreet = function(obj){

            if(obj !== undefined && !!obj === true){

                var street = obj.street;

                vm.clearData([1, 1, 1, 1, 1, 1, 1, 1]);
                vm.setAddress(obj);

                if(new RegExp(/^\d{2}\.{1}/igu).test(obj.street)){
                    var coord = obj.street;
                    coord = coord.split(',');
                    if(coord.length === 2){
                        obj.street = '';
                        obj.geomX = coord[0];
                        obj.geomY = coord[1];
                    }

                }
                ws.$emit('findAnything', {
                    address: obj,
                    input: false
                });

                obj.street = street;

                vm.createTripletList();
                vm.pointOnMap();
            }
        };


        vm.selectCrossRoad = function(obj){
            if(obj !== undefined && !!obj === true){
                ws.$emit('findAnything', {
                    address: obj,
                    input: false
                });
                if(!!vm.fireAct.firePlace.address.house === false){
                    vm.selectPch(obj.pch);
                }
                // vm.selectPch(item.pch);
            }
        };


        vm.selectSettlement = function(sett){
            if(sett !== undefined && !!sett === true){

                console.log('sett ------------>', sett);

            }
        };


        /*
         vm.manualHouseEnter = function(house){
         if(vm.storage.dataOfStates.newFireCard.housesArray instanceof Array && vm.storage.dataOfStates.newFireCard.housesArray.length > 0){
         if(!!house.originalEvent.target.value === true){
         vm.houseValue = house.originalEvent.target.value;
         vm.storage.dataOfStates.newFireCard.housesArray[0].house = house.originalEvent.target.value;
         } else {
         vm.storage.dataOfStates.newFireCard.housesArray[0].house = '';
         }
         }
         };
         */


        vm.downloadEvent = function(fireEngine){

            if(!!vm.storage.selectedFire === true){

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

            }
        };

        vm.fireNotificationsCopy = jQuery.extend([], storage.fireNotifications, true);

        vm.autoCheckbox = function(person){
            person.checked = true;
        };

        vm.makeCallBack = function(phone, id){
            // ws.$emit('callToZil', {fireActId: vm.storage.selectedFire.id});
            if(!!phone === true && phone.trim().length > 0){
                ws.$emit('callToZil', {
                    phone: phone,
                    id: (!!id === true)? id : null,
                    fireActId: vm.fireAct.id
                });
            }
        };


        vm.showNotifyForRole = function(person){
            return person.hasOwnProperty('selectedRoles') && !!person.selectedRoles === true && person.selectedRoles.includes(storage.fireUser.role);
        };

        vm.addPersonToNotifications = function(){
            vm.fireNotificationsCopy.push({checked: false});
        };

        vm.deletePersonToNotifications = function(index){
            vm.fireNotificationsCopy.splice(index, 1);
        };

        vm.sendFireNotifications = function(){
            var arrayToSend = _.filter(vm.fireNotificationsCopy, function(obj){
                return obj.who && obj.checked;
            });
            ws.$emit('fireNotifications', {
                fireActId: vm.fireAct.id,
                fireNotifications: arrayToSend
            });
            vm.clearFireNotifications();
        };

        vm.clearFireNotifications = function(){
            vm.fireNotificationsCopy = jQuery.extend(true, [], storage.fireNotifications);
            $scope.techTab.active = true;

        };


        vm.selectTriplet = function(trip){

            // console.log('triptriptriptrip >', trip);

        };


        vm.createTripletList = function(){

            // vm.storage.dataOfStates.newFireCard.tripletsArray = [];

            // vm.fireAct.firePlace.triplet = null;

            vm.clearData([0, 0, 0, 0, 0, 1, 0, 0]);

            // vm.fireAct.firePlace.triplet = vm.fireAct.firePlace.address.triplets;


            // if(!!vm.fireAct.firePlace.address.triplets === true && vm.fireAct.firePlace.address.pch !== vm.fireAct.firePlace.pchName){

            if(!!vm.fireAct.firePlace.address.triplets === false){
                // vm.fireAct.firePlace.triplet = null;
                vm.getTriplet(vm.fireAct.firePlace.address.pch);

            }


            /*
             if(!!vm.fireAct.firePlace.address.naStreet === false){


             if(!!vm.fireAct.firePlace.triplet === true){
             console.log('------------------------------------- 1 >');

             vm.getTriplet(vm.fireAct.firePlace.pchName);
             /!*
             vm.storage.dataOfStates.newFireCard.tripletsArray.unshift(vm.fireAct.firePlace.triplet);
             *!/
             vm.fireAct.firePlace.triplet = vm.fireAct.firePlace.address.triplets;

             // vm.storage.dataOfStates.newFireCard.tripletsArray.push(vm.fireAct.firePlace.triplet);

             } else {
             if(!!vm.fireAct.firePlace.pchName === true){
             console.log('------------------------------------- 2 >');
             vm.getTriplet(vm.fireAct.firePlace.pchName);






             /!*
             vm.getTriplet(vm.fireAct.firePlace.address.pch);

             console.log('vm.storage.triplets >', vm.storage.triplets);
             vm.storage.triplets.forEach(function(triplet){
             if(triplet.dept1 == vm.fireAct.firePlace.address.pch){
             vm.storage.dataOfStates.newFireCard.tripletsArray.push(triplet);
             }
             });
             *!/
             }
             }
             } else {
             console.log('------------------------------------- 3 >');
             vm.getTriplet(vm.fireAct.firePlace.pchName);
             }
             */
            // console.log('createTripletList >>>>', vm.storage.dataOfStates.newFireCard.tripletsArray);
        };


        vm.createFire = function(){
            if(!!vm.fireAct === true){


                ws.$emit('createFire', {
                    fireAct: vm.fireAct
                });
                //TODO: вернуть для билда
                $state.go('fires.firesbase', {fireId: vm.fireAct.id}, {location: true, reload: true});
            }

        };

        vm.cancelOrder = function(){
            storage.enginesAdvise = undefined;
            // storage.dataOfStates.newFireOrder.canLeave = true;
            var enginesList = _.map(vm.fireAct.addOrders, function(order){
                return {
                    deptId: order.fireEngineDept,
                    idFireEngine: order.fireEngine.idFireEngine
                }
            });

            /*
             if(!!vm.fireAct.addOrders === true){
             vm.fireAct.addOrders = [];
             }

             ws.$emit('save666', vm.fireAct);
             */

            ws.$emit('removeEngineFromFire', {
                fireActId: vm.fireAct.id,
                fireAct: vm.fireAct,
                fireEngineList: enginesList,
                fireEngineType: null,
                isClearAll: true
            });
        };


        vm.onRemoveOrder = function(order){


            /*

             console.log('vm.fireAct.addOrders 1>', vm.fireAct.addOrders);

             if(!!vm.fireAct.addOrders === true){
             var index = null;
             vm.fireAct.addOrders.find(function(eng, idx){
             if(order.fireEngine.idFireEngine === eng.fireEngine.idFireEngine){
             index = idx;
             return true;
             }
             });
             if(index !== null){
             vm.fireAct.addOrders.splice(index, 1);
             }
             }
             console.log('vm.fireAct.addOrders 2>', vm.fireAct.addOrders);
             ws.$emit('save666', vm.fireAct);
             */


            // console.log('order >>>>', order);
            ws.$emit('removeEngineFromFire', {
                fireActId: vm.fireAct.id,
                fireAct: vm.fireAct,
                fireEngineId: order.fireEngine.idFireEngine,
                fireEngineType: null,
                isClearAll: false
            });
            var index = vm.fireAct.orders.indexOf(order);
            if(index != -1){
                vm.fireAct.orders.splice(index, 1);
            }
        };

        vm.selectIncidentType = function(type){

            /*
             var trashString = 'МУСОР';
             if(type.name === trashString){
             if(!vm.fireAct.comment.includes(trashString)){
             vm.fireAct.comment = type.name;
             }
             }
             */

            if(!!type === true){
                vm.incidentTypeCode = type.code;
            }


            if(!!vm.fireAct.id === true){
                ws.$emit('changeFire', {
                    fireAct: vm.fireAct
                });

            }

        };


        vm.houseModelManual = function(event){

            /*
             $timeout(function(){
             if(!!vm.storage.dataOfStates.newFireCard.housesArray === true && vm.storage.dataOfStates.newFireCard.housesArray instanceof Array && vm.storage.dataOfStates.newFireCard.housesArray.length > 0){
             vm.storage.dataOfStates.newFireCard.housesArray[0].address.pch = vm.fireAct.firePlace.address.pch;
             vm.storage.dataOfStates.newFireCard.housesArray[0].address.pch_id = vm.fireAct.firePlace.address.pch_id;
             console.log('2 >', vm.storage.dataOfStates.newFireCard.housesArray[0].address);
             }
             }, 10);
             */


            clearFireObject();

            if(event !== undefined && !!event === true && event.originalEvent.keyCode !== 13){


                if(!!vm.fireAct.firePlace.address.pch === true){
                    vm.storage.dataOfStates.newFireCard.housesArray[0].pch = vm.fireAct.firePlace.address.pch;
                    vm.storage.dataOfStates.newFireCard.housesArray[0].pch_id = vm.fireAct.firePlace.address.pch_id;
                }


                vm.storage.dataOfStates.newFireCard.housesArray[0].naHouse = true;
                vm.storage.dataOfStates.newFireCard.housesArray[0].house = event.originalEvent.target.value;

            }
        };


        vm.showObjectInList = function(){

            if(!!vm.fireAct.firePlace.address.street === true && !!vm.fireAct.firePlace.address.house === true){
                var node = $window.document.body.querySelector('#object-list-wrapper'),
                    height = node.offsetParent.offsetHeight;
                if(!!node === true && node.nodeType === 1){
                    node = node.querySelectorAll('a');
                    if(!!node === true){
                        for(var i = 0, l = node.length; i < l; i++){
                            if(!!node[i].dataset.house === true && node[i].dataset.house === vm.fireAct.firePlace.address.house){
                                node[i].parentNode.scrollTop = (node[i].offsetTop - (height / 2)) + (node[i].offsetHeight / 2);
                            }
                        }
                    }
                }
            }

        };


        vm.houseNumber = {};


        vm.houseModel = function(item){

            // console.log('item >>>', item, vm.storage.dataOfStates.newFireCard.housesNumbersArray, storage.dataOfStates.newFireCard.housesArray);

            clearFireObject();


            if(item !== undefined && !!item === true){


                /*
                 console.log('event >', vm.storage.dataOfStates.newFireCard.housesArray);

                 if(!!vm.fireAct.firePlace.address.house === true && !!vm.storage.dataOfStates.newFireCard.housesArray === true && vm.storage.dataOfStates.newFireCard.housesArray instanceof Array){

                 vm.storage.dataOfStates.newFireCard.housesArray.find(function(house){

                 console.log('house >>>>', house);

                 });

                 }
                 */


                if(vm.storage.dataOfStates.newFireCard.housesNumbersArray.includes(item.house.toUpperCase())){
                    vm.fireAct.firePlace.address.naHouse = false;
                    storage.dataOfStates.newFireCard.housesArray.find(function(house, idx){
                        if(idx !== 0 && house.house.toUpperCase() === item.house.toUpperCase()){
                            vm.fireAct.firePlace.address = Object.assign({}, house);
                            vm.fireAct.firePlace.address.house = house.house.toUpperCase();
                            item = Object.assign({}, house);
                            item.house = item.house.toUpperCase();
                            return true;
                        }
                    });

                } else {

                    vm.fireAct.firePlace.address.naHouse = true;


                }
                // vm.fireAct.firePlace.address.house = item.house;
                // vm.storage.dataOfStates.newFireCard.housesArray[0] = Object.assign({}, vm.fireAct.firePlace.address);


                vm.selectPch(item.pch);
                vm.createTripletList();
                vm.getObjectByAddress();
                vm.showObjectInList();
                vm.pointOnMap();
                /*                console.log('2---------->', vm.storage.dataOfStates.newFireCard.housesArray[0].house);
                 console.log('3---------->', vm.fireAct.firePlace.address.house);
                 console.log('4---------->', vm.houseValue.house);*/

            }


            /*                var houses = vm.storage.dataOfStates.newFireCard.housesArray[0];

             if(vm.storage.dataOfStates.newFireCard.housesNumbersArray.includes(event.originalEvent.target.value) || vm.storage.dataOfStates.newFireCard.housesNumbersArray.includes(event.originalEvent.target.value)){

             vm.houseValue.house = houses.house = vm.fireAct.firePlace.address.house = event.originalEvent.target.value;
             vm.houseValue.manualHouse = houses.manualHouse = vm.fireAct.firePlace.address.manualHouse = null;
             vm.houseValue.naHouse = houses.naHouse = vm.fireAct.firePlace.address.naHouse = false;
             console.log('1------------------------------------------1', vm.fireAct.firePlace.address.house);

             } else {
             vm.houseValue.house = houses.house = vm.fireAct.firePlace.address.house = null;
             vm.houseValue.manualHouse = houses.manualHouse = vm.fireAct.firePlace.address.manualHouse = event.originalEvent.target.value;
             vm.houseValue.naHouse = houses.naHouse = vm.fireAct.firePlace.address.naHouse = true;
             console.log('2------------------------------------------2', houses, vm.fireAct.firePlace.address.manualHouse);

             }*/


            /*
             if(vm.storage.dataOfStates.newFireCard.housesNumbersArray.includes(vm.houseValue.house) || vm.storage.dataOfStates.newFireCard.housesNumbersArray.includes(vm.houseValue.manualHouse)){
             vm.houseValue.naHouse = false;
             vm.houseValue.manualHouse = null;
             // vm.fireAct.firePlace.address.house = vm.houseValue.house;
             console.log('1------------------------------------------1', vm.houseValue.house, vm.houseValue.manualHouse);
             } else {
             /!*
             vm.fireAct.firePlace.address.naHouse = true;
             // vm.fireAct.firePlace.address.manualHouse = vm.houseValue.manualHouse;
             vm.fireAct.firePlace.address.house = null;
             *!/

             if(event !== undefined && !!event === true){
             if(!!event.originalEvent.target.value === true){
             vm.houseValue = event.originalEvent.target.value;
             vm.storage.dataOfStates.newFireCard.housesArray[0].naHouse = true;
             vm.storage.dataOfStates.newFireCard.housesArray[0].manualHouse = event.originalEvent.target.value;
             }
             vm.storage.dataOfStates.newFireCard.housesArray[0].house = '';
             }

             console.log('2------------------------------------------2', vm.houseValue.house, vm.houseValue.manualHouse);
             }
             console.log('------------------------------------------', vm.houseValue);
             */
        };


        /*        vm.newFireCard = function(request){

         function getRandomInt(min, max) {
         console.log(Math.floor(Math.random() * (max - min)) + min);
         return Math.floor(Math.random() * (max - min)) + min;
         };





         /!*
         ws.$emit('findSomething',
         {
         criteria: req[getRandomInt(0, req.length - 1)]
         }
         );
         *!/


         };*/


        vm.addEnginesToFire = function(){
            var command = [];
            vm.fireAct.addOrders.map(function(order){
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


        var columnDefs = [
            {
                name: 'Дата',
                field: "date",
                width: 110,
                //cellTemplate: '<span ng-bind="grid.getCellDisplayValue(row, col)"></span><button class="btn btn-primary btn-xs pull-right" ng-click="grid.appScope.changeProtocolDate(row)"><span class="glyphicon glyphicon-pencil"></span></button>',
                cellFilter: "date: 'dd-MM-yy HH:mm:ss'",
                filterCellFiltered: true,
                enableColumnMenu: false
            },
            {
                name: 'Тип', field: 'engine.engineType',
                cellFilter: "engineTypeDecorator: row.entity.engine.isFirstTank : row .entity.engine.asGD",
                filterCellFiltered: true,
                width: 60, enableColumnMenu: false
            },
            //{name: "Гос№", field: "engine.gosNo", width: 150, enableColumnMenu: false},
            {
                name: vm.storage.fireUser.ACCESS.words.pch + ".",
                field: 'engineDeptName',
                width: 55,
                enableColumnMenu: false
            }, {
                name: vm.storage.fireUser.ACCESS.words.pch,
                cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.getDept(grid,row)}}</div>',
                width: 55,
                enableColumnMenu: false
            },
            {
                name: "Сообщение",
                field: "message",
                enableColumnMenu: false,
                cellClass: 'toUpperCase',
                width: 500,
                cellTemplate: '<div class="protocol-message-wrapper" ng-bind-html="grid.appScope.filterMessage(row.entity[col.field])"></div>'
                // cellTemplate: '<div class="protocol-message-wrapper" ng-bind-html="row.entity[colfield]"></div>'
                /*
                 cellTemplate: '<div class="popover-in-table-correction-class"' +
                 '>' +
                 '<div class="ui-grid-cell-contents" uib-popover="{{row.entity[col.field]}}" popover-placement="auto" popover-trigger="mouseenter">{{row.entity[col.field]}}</div></div>'
                 */
            },
            {name: "Фамилия", field: 'user.lastName', width: 110, enableColumnMenu: false},
            {
                name: 'Ред.',
                field: "edit",
                width: 40,
                enableSorting: false,
                cellTemplate: '<button class="btn btn-primary default-gray-button btn-xs" ng-click="grid.appScope.changeProtocolDate(row, \'date\')" ng-show="grid.appScope.uACESS.states.protocol.buttons.editTime"><span class="glyphicon glyphicon-pencil"></span></button>',
                enableColumnMenu: false,
                filterCellFiltered: false
            }
        ];


        $scope.$watch(function(){
                if(!!storage.selectedFire === true){
                    return storage.selectedFire.messageBuffer;
                }
            },
            function(newValue, oldValue){
                if(!!storage.selectedFire === true){
                    vm.gridOptions.data = storage.selectedFire.messageBuffer;
                }
            }
        );


        vm.renewTableData = function(message){
            storage.controllers.protocol = null;
            var i = 0;
            var l = 0;


            l = storage.activeFires.length;
            while(i < l){
                if(storage.activeFires[i].id == message.id){
                    vm.gridOptions.data = message.messageBuffer;
                    storage.activeFires[i].messageBuffer = message.messageBuffer;
                    i = l;
                }
                i++;
            }
            vm.fireAct.messageBuffer = message.messageBuffer;
        };


        vm.buildProtocolMessage = function(messages){
            if(messages !== undefined){
                vm.gridOptions = {
                    columnDefs: columnDefs,
                    data: messages,
                    enableSorting: true,
                    enableFiltering: true,
                    enableRowHashing: false
                };

                vm.gridOptions.onRegisterApi = function(gridApi){
                    vm.protocolGridApi = gridApi;
                    $timeout(function(){
                        vm.gridIsReady = true;
                    }, 700);


                    $scope.$watch(function(){
                            return vm.gridOptions.data;
                        },
                        function(newValue, oldValue){
                            if(!!newValue === true){
                                $timeout(function(){
                                    var node = $window.document.body.querySelector('.ui-grid-viewport');
                                    if(!!node === true && node.nodeType === 1){

                                        $timeout(function(){
                                            node.scrollTop = node.scrollHeight;
                                        }, 10);
                                    }
                                }, 0);
                            }

                            // vm.gridOptions.data = storage.selectedFire.messageBuffer;
                            // vm.protocolGridApi.grid.modifyRows(vm.gridOptions.data);
                        }
                    );


                };
            }
            /*
             vm.protocolGridApi.core.on.renderingComplete = function(){

             alert('wdgwergwegr');

             }
             */
            // console.log('vm.gridOptions >>>>', vm.gridOptions);
        };


        vm.appendToProtocol = function(){
            modalsService.protocol(vm.selectedFire, vm.stateCalledFrom);
        };

        $scope.changeProtocolDate = function(row, action){
            modalsService.protocol(row.entity, vm.stateCalledFrom, action);
        };


        $scope.uACESS = vm.storage.fireUser.ACCESS;

        $scope.filterMessage = function(message){

            var found = /(.*)(\(.*ВВОДА{1}.*?\))(.*)/ig.exec(message),
                mess = '';

            if(found){

                for(var j = 1; j < found.length; j++){
                    mess += '<span class="message-' + ( (/(\(.*ВВОДА{1}.*?\))/ig.test(found[j]))? 'lower' : 'upper' ) + '">' + found[j] + '</span>';
                }

                return mess;

            } else {
                return message;
            }

        };

        vm.editFire = function(){
            vm.buildProtocolMessage(vm.fireAct.messageBuffer);
            vm.selectBuilding(vm.fireAct.firePlace.address);
            vm.pointOnMap();


            ws.$emit('findAnything', {
                address: vm.fireAct.firePlace.address,
                input: 'input'
            });
        };

        vm.lastAudioFile = '';

        vm.getAudioRecord = function(source){



            /*
             var link = document.createElement('a');
             link.setAttribute('href','ftp://192.168.100.137/monitor/190128-142626_1011_2233.wav');
             link.setAttribute('download','download');
             link.click();
             // link.onload=link.click();
             link.onload = console.log(event);
             */


            // $window.open("ftp://192.168.100.137/monitor/190128-142626_1011_2233.wav");

            function stopPlayingAudio(){
                vm.lastAudioFile = '';
                vm.playbackAudio = null;
            }

            if(vm.storage.selectedFire[source]){
                vm.playbackAudio = source;
                // var audioFile = './' + vm.storage.selectedFire[source];
                var audioFile = vm.storage.selectedFire[source];
                // var audioFile = 'ftp://192.168.100.137/monitor/190128-142626_1011_2233.wav';

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
                    id: (!!id === true)? id : null,
                    fireActId: vm.storage.selectedFire.id
                });
            }
        };


        vm.renewFireAct = function(act, from){
            if(act !== undefined && !!act === true && (act.id === vm.fireAct.id || (from !== undefined && !!from === true && from === '112'))){
                vm.fireAct = Object.assign({}, act);
                vm.storage.controllers.newFireCard.fireAct = Object.assign({}, act);
                vm.storage.selectedFire = Object.assign({}, act);
                vm.storage.dataOfStates.newFireCard.fireAct = Object.assign({}, act);
                vm.createTripletList();
                vm.renewTableData(act);
                vm.buildProtocolMessage(act.messageBuffer);
                // $scope.$apply();
            }
        };


        vm.card112DtIncident = function(dt){
            if(dt !== undefined && !!dt === true){
                return new Date(dt).toLocaleString();
            }
            return '';
        };


        vm.fieldsStepControl = function(){

            function getControl(fields){
                if(fields !== undefined && !!fields === true){
                    // console.log('fields >>>>>>>>>>', fields);
                    var node = null,
                        list = [];
                    for(var i in fields){
                        if(fields.hasOwnProperty(i) && fields[i].nodeType === 1){
                            // console.log('>>>>>>>>>>>>>>>>>>>>>>', fields[i].dataset.stepControl);
                            switch(fields[i].tagName){
                                case 'DIV':
                                    vm.fieldsForControl[fields[i].dataset.stepControl] = {
                                        node: fields[i],
                                        keydown: fields[i].querySelector('.ui-select-search'),
                                        focus: fields[i].querySelector('.ui-select-focusser'),
                                        next: parseInt(fields[i].dataset.stepControl, 10) + 1
                                    };
                                    break;
                                case 'INPUT':
                                    vm.fieldsForControl[fields[i].dataset.stepControl] = {
                                        node: fields[i],
                                        keydown: fields[i],
                                        focus: fields[i],
                                        next: parseInt(fields[i].dataset.stepControl, 10) + 1
                                    };
                                    break;
                                case 'BUTTON':
                                    vm.fieldsForControl[fields[i].dataset.stepControl] = {
                                        node: fields[i],
                                        keydown: fields[i],
                                        focus: fields[i],
                                        next: parseInt(fields[i].dataset.stepControl, 10) + 1
                                    };
                                    break;
                            }

                            // console.log('vm.fieldsForControl ---->', vm.fieldsForControl);

                            for(var i in vm.fieldsForControl){

                                if(i in vm.fieldsForControl){


                                    (function(i){
                                        vm.fieldsForControl[i].keydown.onkeydown = function(event){


                                            if(event.keyCode === 13){

                                                if(vm.fieldsForControl.hasOwnProperty(vm.fieldsForControl[i].next)){

                                                    // console.log('+++++ >', i, vm.fieldsForControl[i].next, vm.fieldsForControl[i]);

                                                    $timeout(function(){
                                                        vm.fieldsForControl[i].focus.blur();
                                                        vm.fieldsForControl[vm.fieldsForControl[i].next].focus.focus();
                                                    }, 0);
                                                }


                                            }
                                        }
                                    })(i);


                                }

                            }


                            // vm.fieldsStepControl =


                            /*                            switch(fields[i].tagName){

                             case 'DIV':
                             // console.log('fields[i] >>>>', i, fields[i]);
                             node = fields[i].querySelector('.ui-select-focusser');
                             console.log('node ---->', node);

                             /!*
                             list = Array.from(fields[i].childNodes);
                             node = list.find(function(inp){
                             return inp.tagName === 'INPUT';
                             });
                             *!/
                             // node = fields[i].querySelector('.ui-select-focusser');
                             break;
                             case 'INPUT':
                             node = fields[i];
                             break;

                             }

                             if(!!node === true){
                             node.dataset.step = fields[i].dataset.stepControl;


                             node.onkeydown = function(event){
                             console.log('onkeydown ---->', this.dataset.step);
                             var nextFocus = null;
                             if(event.keyCode === 13){

                             nextFocus = document.body.querySelector('[data-step="' + (parseInt(this.dataset.step, 10) + 1) + '"]');

                             console.log('nextFocus >>>>>', nextFocus.parentNode, '[data-step="' + (parseInt(this.dataset.step, 10) + 1) + '"]');

                             if(!!nextFocus === true && nextFocus.nodeType === 1){
                             this.blur();

                             // $timeout(function(){
                             nextFocus.focus();
                             $scope.$apply();
                             // }, 0);

                             }
                             }
                             nextFocus = null;
                             $scope.$apply();
                             }
                             }*/


                            /*                            console.log('fields[i] ---->', fields[i]);
                             fields[i].onkeydown = function(event){
                             console.log('event ---->', event.target);
                             }*/


                        }
                    }
                    node = null;
                    list = null;
                }
            }


            $timeout(function(){

                getControl(document.body.querySelectorAll('[data-step-control]'));

            }, 10);
            // data-current-field
        };

        /*
         vm.eeee = function(e){
         // console.log(e);
         };
         */

        vm.onArriveEngineToFire = function(currorder){
            ws.$emit('arriveEngineToFire', {
                fireActId: vm.storage.selectedFire.id,
                fireAct: vm.storage.selectedFire,
                fireEngineId: currorder.fireEngine.idFireEngine
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


//TODO: ******************************************* Генерация форм ЧС ********************************/


        vm.showIt = function(){

            console.log('----->', vm.fireAct.chs);

        };

        /*vm.emulateRequest = function(){
            console.log('emulateRequest>>>');
            var req = {
                "chs1": {
                    "chs1_1": {
                        "id": "5c866fa756abda8d694a0eab",
                        "table": 2,
                        "sort": 4,
                        "value": "Трансграничный",
                        "$$hashKey": "object:807"
                    },
                    "chs1_2": null,
                    "chs1_3": 4,
                    "undefined": null,
                    "chs1_4": "2019-02-25T21:00:00.000Z",
                    "chs1_5": {
                        "id": "5c866f6a56abda8d694a0eaa",
                        "table": 2,
                        "sort": 3,
                        "value": "Республиканский",
                        "$$hashKey": "object:809"
                    },
                    "chs1_6": "ываывап",
                    "chs1_7": null,
                    "chs1_8": null
                },
                "chs2": {
                    "chs2_1": "чсмичсми",
                    "chs2_2": {
                        "id": "5c866f3756abda8d694a0ea8",
                        "table": 2,
                        "sort": 1,
                        "value": "Локальный",
                        "$$hashKey": "object:810"
                    },
                    "chs2_3": "2019-03-06T21:33:00.000Z",
                    "chs2_4": null,
                    "chs2_5": null,
                    "chs2_6": null,
                    "chs2_7": "чсмичсмичс",
                    "chs2_8": "чсмичс",
                    "chs2_9": null,
                    "chs2_10": null,
                    "chs2_11": "чсмичсми",
                    "chs2_12": null,
                    "chs2_13": null,
                    "chs2_14": null,
                    "chs2_15": null,
                    "chs2_16": null,
                    "chs2_17": null,
                    "chs2_18": null,
                    "chs2_19": null,
                    "chs2_20": null,
                    "chs2_21": null,
                    "undefined": null,
                    "chs2_22": null,
                    "chs2_23": null,
                    "chs2_24": null,
                    "chs2_25": null,
                    "chs2_26": null,
                    "chs2_27": null,
                    "chs2_28": null,
                    "chs2_29": null,
                    "chs2_32": null,
                    "chs2_33": null,
                    "chs2_34": null,
                    "chs2_35": null,
                    "chs2_36": null,
                    "chs2_37": null,
                    "chs2_38": null,
                    "chs2_39": null,
                    "chs2_40": null,
                    "chs2_41": null,
                    "chs2_42": null,
                    "chs2_43": null,
                    "chs2_44": null,
                    "chs2_45": null,
                    "chs2_46": null,
                    "chs2_47": null,
                    "chs2_48": null,
                    "chs2_49": null,
                    "chs2_50": null,
                    "chs2_51": null,
                    "chs2_52": null,
                    "chs2_53": null,
                    "chs2_54": null,
                    "chs2_55": null,
                    "chs2_56": null,
                    "chs2_57": null,
                    "chs2_58": null,
                    "chs2_59": null,
                    "chs2_60": null,
                    "chs2_61": null,
                    "chs2_62": null,
                    "chs2_63": null,
                    "chs2_64": null,
                    "chs2_65": null,
                    "chs2_66": null,
                    "chs2_67": null,
                    "chs2_68": null,
                    "chs2_69": null,
                    "chs2_70": null,
                    "chs2_71": null,
                    "chs2_72": null,
                    "chs2_73": null,
                    "chs2_74": null,
                    "chs2_75": null,
                    "chs2_76": null,
                    "chs2_77": null,
                    "chs2_78": null,
                    "chs2_79": null,
                    "chs2_80": null,
                    "chs2_81": null,
                    "chs2_82": null,
                    "chs2_83": null,
                    "chs2_84": null,
                    "chs2_85": null,
                    "chs2_86": null,
                    "chs2_87": null,
                    "chs2_88": null,
                    "chs2_89": null,
                    "chs2_90": null,
                    "chs2_91": null,
                    "chs2_92": null,
                    "chs2_93": null,
                    "chs2_94": null,
                    "chs2_95": null,
                    "chs2_96": null,
                    "chs2_97": null,
                    "chs2_98": null,
                    "chs2_99": null,
                    "chs2_100": null,
                    "chs2_101": null,
                    "chs2_102": null,
                    "chs2_105": null,
                    "chs2_106": null,
                    "chs2_107": null,
                    "chs2_110": null,
                    "chs2_113": null,
                    "chs2_114": null,
                    "chs2_115": null,
                    "chs2_116": null,
                    "chs2_117": null,
                    "chs2_118": null,
                    "chs2_119": null,
                    "chs2_120": null,
                    "chs2_121": null,
                    "chs2_122": null,
                    "chs2_123": null
                },
                "chs3": {
                    "chs3_1": null,
                    "chs3_2": null,
                    "chs3_3": null,
                    "undefined": null,
                    "chs3_4": null,
                    "chs3_5": null,
                    "chs3_6": null,
                    "chs3_7": null,
                    "chs3_8": null,
                    "chs3_9": null,
                    "chs3_10": null,
                    "chs3_11": null,
                    "chs3_12": null,
                    "chs3_13": null,
                    "chs3_14": null,
                    "chs3_15": null,
                    "chs3_16": null,
                    "chs3_17": null,
                    "chs3_18": null,
                    "chs3_19": null,
                    "chs3_20": null,
                    "chs3_23": null,
                    "chs3_26": null,
                    "chs3_29": null,
                    "chs3_30": null,
                    "chs3_31": null,
                    "chs3_32": null,
                    "chs3_33": null,
                    "chs3_34": "2019-03-13T21:00:00.000Z",
                    "chs3_35": null,
                    "chs3_36": null,
                    "chs3_37": null,
                    "chs3_38": null,
                    "chs3_39": null,
                    "chs3_40": null,
                    "chs3_41": null,
                    "chs3_43": null,
                    "chs3_44": null,
                    "chs3_45": null,
                    "chs3_46": null,
                    "chs3_47": null,
                    "chs3_48": null,
                    "chs3_49": null,
                    "chs3_50": null,
                    "chs3_51": null,
                    "chs3_52": null,
                    "chs3_53": null,
                    "chs3_54": null,
                    "chs3_55": null,
                    "chs3_56": null,
                    "chs3_60": null,
                    "chs3_61": null,
                    "chs3_62": null,
                    "chs3_63": null,
                    "chs3_64": null,
                    "chs3_67": null,
                    "chs3_69": null,
                    "chs3_73": null,
                    "chs3_76": null,
                    "chs3_79": null,
                    "chs3_82": null,
                    "chs3_86": null,
                    "chs3_87": null,
                    "chs3_91": null,
                    "chs3_94": null,
                    "chs3_95": null,
                    "chs3_96": null,
                    "chs3_97": null,
                    "chs3_98": null,
                    "chs3_99": null,
                    "chs3_27": {"0": "34кйцук", "1": null, "2": "ывапывап"},
                    "chs3_28": {"0": null, "1": null, "2": 345235234},
                    "chs3_42": {"0": "ывапыапрваыпр"},
                    "chs3_70": {"0": "цвуапыв", "1": null, "2": "у346345"},
                    "chs3_71": {"0": "ывапыв", "1": null, "2": "паропаро"},
                    "chs3_72": {"0": 6, "1": null, "2": 346345}
                },
                "chs4": {
                    "chs4_1": 5,
                    "undefined": null,
                    "chs4_2": null,
                    "chs4_6": null,
                    "chs4_10": null,
                    "chs4_11": null,
                    "chs4_12": null,
                    "chs4_13": null,
                    "chs4_14": null,
                    "chs4_15": null,
                    "chs4_18": null,
                    "chs4_21": null,
                    "chs4_24": null,
                    "chs4_25": null,
                    "chs4_26": null,
                    "chs4_29": null,
                    "chs4_32": null,
                    "chs4_35": null,
                    "chs4_38": null,
                    "chs4_39": null,
                    "chs4_42": null,
                    "chs4_45": null,
                    "chs4_48": null,
                    "chs4_51": null,
                    "chs4_52": null,
                    "chs4_55": null,
                    "chs4_58": null,
                    "chs4_61": null,
                    "chs4_64": null,
                    "chs4_65": null,
                    "chs4_66": null,
                    "chs4_67": null,
                    "chs4_68": null,
                    "chs4_71": null,
                    "chs4_74": null,
                    "chs4_33": {"0": "3645346"},
                    "chs4_34": {"0": 345634634}
                }
            };


            vm.fireAct.chs = req;

            vm.reserveCars();

        };*/


        vm.parseAnswer = function(){



            // vm.addMultiplyFields('chs3_26');

            var node = null,
                parent = null;

            // var answer = vm.fireAct.chs;
            var answer = vm.fireAct.chs;

            if(!!answer === true){
                for(var i in answer){
                    if(answer.hasOwnProperty(i)){

                        // console.log('i >>>', i);

                        for(var j in answer[i]){
                            if(answer[i].hasOwnProperty(j) && !!answer[i][j] === true){

                                // console.log('j >>>', i, j ,answer[i][j]);

                                node = document.querySelector('[data-child*="' + j + '"]');


                                // console.log('66666666666>>>', node);

                                if(!!node === true && node.nodeType === 1 && !!node.dataset.parent === true){

                                    /*
                                     console.log('1--------->>>', node.dataset.parent);
                                     console.log('2--------->>>', answer[i][j]);
                                     console.log('3+++++++++>>>', Object.keys(answer[i][j]));
                                     */

                                    var fieldCount =  Math.max.apply(null, Object.keys(answer[i][j]));


                                    // if(!!fieldCount === true && !!node.childNodes === true && node.childNodes.length !== Object.keys(answer[i][j]).length){

                                    // if(!!fieldCount === true && !!node.childNodes === true){
                                    if(!isNaN(parseInt(fieldCount, 10)) && !!node.childNodes === true && node.childNodes.length < fieldCount){

                                        node.innerHTML = '';

                                        // vm.addMultiplyFields('chs3_26');

                                        // for(var k = 0, l = Object.keys(answer[i][j]).length; k < l; k++){
                                        for(var k = 0, l = fieldCount + 1; k < l; k++){
                                            vm.addMultiplyFields(node.dataset.parent);

                                        }


                                    }


                                }


                            }

                        }

                    }
                }


                // vm.fireAct.chs = Object.assign({}, answer);

            }


            /*if(!!answer === true){

             for(var i in answer){
             if(answer.hasOwnProperty(i)){

             for(var j in answer[i]){
             if(answer[i].hasOwnProperty(j)){

             node = document.querySelector('[data-child*="' + j + '"]');
             console.log('66666666666>>>', node);

             if(!!node === true && node.nodeType === 1 && !!node.dataset.parent === true){

             console.log('777777777777>>>', node.dataset.parent, answer[i][j]);


             if(!!Object.keys(answer[i][j]) === true && !!node.childNodes === true && node.childNodes.length !== Object.keys(answer[i][j]).length){

             node.innnerHTML = '';

             vm.addMultiplyFields('chs3_26');
             /!*
             for(var k = 0, l = Object.keys(answer[i][j]); k < l; k++){

             vm.addMultiplyFields(node.dataset.parent);

             }
             *!/

             }



             }


             }

             }

             }
             }

             node = parent = null;

             }*/
            node = parent = answer = null;

        };


        function getNodeByType(field){

            var nodes = {
                table: null,
                tr: null,
                td: null,
                eTable: null,
                eTr: null,
                eTd: null,
                node: null,
                option: null,
                field: null
            };


            nodes.node = null;


            switch(field.type){

                case 'text':
                case 'number':
                    nodes.node = document.createElement('input');
                    nodes.node.setAttribute('data-ng-model', field.model);
                    nodes.node.setAttribute('type', field.type);

                    break;

                case 'datetime':

                    /*
                     <forma-date-time-picker
                     date="forma.storage.forma6.fireBeginingDate5"
                     validate="forma.validate('5',forma.storage.forma6.fireBeginingDate5)">
                     </forma-date-time-picker>
                     */

                    nodes.node = document.createElement('forma-date-time-picker');
                    nodes.node.setAttribute('date', field.model);

                    break;

                case 'textarea':
                    nodes.node = document.createElement('textarea');
                    nodes.node.setAttribute('data-ng-model', field.model);
                    nodes.node.setAttribute('class', 'table-textarea');

                    break;

                case 'reference':

                    nodes.node = document.createElement('ui-select');
                    nodes.node.setAttribute('theme', 'bootstrap');
                    nodes.node.setAttribute('class', 'full-width');
                    nodes.node.setAttribute('data-ng-model', field.model);
                    nodes.node.setAttribute('reset-search-input', false);


                    var repeat = 'field in newFireCard.' + field.repeat;

                    // var getFrom = (!!field.value === false)? 'name' : 'value';


                    nodes.node.innerHTML = '<ui-select-match>{{' + field.model + '.value}}</ui-select-match><ui-select-choices repeat="' + repeat + '| filter: $select.search"> <span ng-bind-html="field.value| highlight: $select.search"><span></ui-select-choices> </ui-select>';

/*
                    nodes.field = document.createElement('ui-select-match');
                    nodes.node.appendChild(nodes.field);
*/





/*
                    nodes.field = document.createElement('ui-select-choices');
                    nodes.node.setAttribute('repeat', 'full-width');

                    nodes.node.appendChild(nodes.field);
*/
/*
                    nodes.node = document.createElement('select');
                    nodes.node.setAttribute('data-ng-model', field.model);
                    nodes.node.setAttribute('class', 'table-dropdown');
                    nodes.node.setAttribute('data-ng-options', 'x.id as x.value for x in newFireCard.' + field.repeat);
*/




/*
                    var repeat = 'field in newFireCard.' + field.repeat;
                    nodes.node.innerHTML = '<option style="display:none" value class></option><option ng-repeat="' + repeat + '" value="{{field}}">{{field.value}}</option>';
*/



/*
                    nodes.node.setAttribute('data-ng-model', field.model);
                    nodes.node.setAttribute('data-ng-options', 'o.value for o in newFireCard.' + field.repeat);
                    nodes.node.setAttribute('data-ng-value', 'o.value');
                    nodes.node.setAttribute('class', 'table-dropdown');
*/


                    break;

                case 'extgroup':
                    nodes.node = document.createElement('div');
                    nodes.node.setAttribute('class', 'extgroup-wrapper');

                    nodes.eTable = document.createElement('table');
                    nodes.eTable.setAttribute('class', 'chs-data-table');
                    nodes.eTable.setAttribute('id', field.fieldname);
                    nodes.node.appendChild(nodes.eTable);


                    nodes.field = document.createElement('tbody');
                    nodes.field.dataset.parent = field.fieldname;
                    if(field.hasOwnProperty('child')){

                        for(var h in field.child){
                            if(field.child.hasOwnProperty(h))


                                nodes.field.dataset.child;
                            nodes.field.dataset.child = nodes.field.dataset.child + ((!nodes.field.dataset.child === true)? ',' : '') + field.child[h].fieldname;


                        }

                    }


                    nodes.eTable.appendChild(nodes.field);


                    nodes.field = nodes.eTable.createCaption()
                    nodes.field.innerHTML = '<div class="clearfix"><span class="pull-left">' + field.code + ' ' + field.name + '</span>' + '<span class="pull-right"><button type="button" class="button btn-success" ng-click="newFireCard.addMultiplyFields(' + "'" + field.fieldname + "'" + ')"><span class="glyphicon glyphicon-plus"></span></button>' + '</span><div>';

                    nodes.field = nodes.eTable.createTHead();
                    nodes.eTr = nodes.field.insertRow();

                    for(var i = 0, l = field.child.length; i < l; i++){

                        field.child[i].parent = field.fieldname;
                        field.child[i].root = field.root;
                        // console.log('>>>', field.child[i]);

                        nodes.eTd = nodes.eTr.insertCell();
                        nodes.eTd.innerHTML = field.child[i].name;
                        nodes.eTd.setAttribute('width', 100 / l + '%');


                    }


                    // nodes.td = nodes.tr.insertCell();


                    /*
                     nodes.node = document.createElement('select');
                     nodes.node.setAttribute('data-ng-model', field.model);
                     nodes.node.setAttribute('data-ng-options', 'o.value for o in newFireCard.' + field.repeat);
                     nodes.node.setAttribute('class', 'table-dropdown');

                     nodes.td = nodes.tr.insertCell();
                     nodes.td.appendChild(nodes.node);
                     */

                    break;
            }
            return (!!nodes.node === true)? nodes.node : null;


        };


        vm.generateFieldsForCHS = function(){


            // console.log('>>>', storage.dataOfStates.newFireCard.chsData);


            var data = Object.assign({}, storage.dataOfStates.newFireCard.chsData.empty),
                // filled = {},
                filled = vm.fireAct.chs,
                nodeWrapper = null,
                nodes = {
                    table: null,
                    tr: null,
                    td: null,
                    eTable: null,
                    eTr: null,
                    eTd: null,
                    node: null,
                    option: null,
                    field: null
                };


            function createFieldByType(field){

                // console.log('1>>>', field);


                nodes.tr = nodes.table.insertRow();


                if(field.type != 'separator'){
                    nodes.td = nodes.tr.insertCell();
                    nodes.td.innerHTML = field.code;
                    nodes.td = nodes.tr.insertCell();
                    nodes.td.innerHTML = field.name;
// console.log('>>>', field);
                    nodes.node = getNodeByType(field, nodes);

                    if(!!nodes.node === true){
                        nodes.td = nodes.tr.insertCell();
                        nodes.td.appendChild(nodes.node);
                    }
                } else {



                    nodes.td = nodes.tr.insertCell();
                    nodes.td.setAttribute('colspan', 3);
                    nodes.td.setAttribute('class', 'table-separator');
                    nodes.td.innerHTML = field.code + ' ' + field.name;

                }

            };


            if(!!data === true){

                for(var i in data){

                    if(data.hasOwnProperty(i)){

                        nodeWrapper = document.getElementById(i);

                        if(!!nodeWrapper === true && nodeWrapper.nodeType === 1){

                            nodeWrapper.innerHTML = '';

                            for(var j in data[i]){
                                if(!filled.hasOwnProperty(i)){
                                    filled[i] = {};
                                }

                                if(data[i].hasOwnProperty(j)){
                                    nodes.table = document.createElement('table');
                                    nodes.table.className = "chs-data-table";


                                    if(data[i][j].hasOwnProperty('child')){
                                        for(var k in data[i][j].child){

                                            if(data[i][j].child.hasOwnProperty(k) && data[i][j].child[k].fieldname !== undefined){

                                                // if(!filled[i].hasOwnProperty([data[i][j].child[k].fieldname]) && !!data[i][j].child[k].fieldname === true){
                                                // console.log('>>>', data[i][j].child[k].fieldname, k);
                                                if(!!data[i][j].child[k].fieldname === true){
                                                    // if(!!data[i][j].child[k].fieldname === true){


                                                    if(!filled[i].hasOwnProperty([data[i][j].child[k].fieldname])){
                                                        filled[i][data[i][j].child[k].fieldname] = null;
                                                    }


                                                    data[i][j].child[k].model = 'newFireCard.fireAct.chs.' + i + '.' + data[i][j].child[k].fieldname;

                                                    // console.log('>>>', data[i][j].child[k].model);


                                                    data[i][j].child[k].root = i;


                                                    if(data[i][j].child[k].hasOwnProperty('child')){

                                                        for(var f = 0, l = data[i][j].child[k].child.length; f < l; f++){
// console.log('++++++>>>',  'newFireCard.fireAct.chs.' + i + '.' + data[i][j].child[k].child[f].fieldname);
                                                            data[i][j].child[k].child[f].model = 'newFireCard.fireAct.chs.' + i + '.' + data[i][j].child[k].child[f].fieldname;

                                                        }

                                                    }


                                                }


                                                createFieldByType(data[i][j].child[k]);


                                            }
                                        }


                                        nodes.node = nodes.table.createCaption()
                                        nodes.node.innerHTML = data[i][j].code + ((!!data[i][j].code === true)? '. ' : '') + j;
                                        nodes.node = nodes.table.createTHead();
                                        nodes.tr = nodes.node.insertRow();

                                        nodes.td = nodes.tr.insertCell();
                                        nodes.td.innerHTML = '№';
                                        nodes.td = nodes.tr.insertCell();
                                        nodes.td.innerHTML = 'Наименование';
                                        nodes.td = nodes.tr.insertCell();
                                        nodes.td.innerHTML = 'Значение';


                                        nodeWrapper.appendChild(nodes.table);

                                        // console.log('>>>', filled);
                                    }

                                }


                            }
                            $compile(nodeWrapper)($scope);
                        } else {

                            nodeWrapper = null;

                        }

                    }

                }


            }
            nodeWrapper = data = nodes = null;
            // console.log('>>>', storage.dataOfStates.newFireCard.chsData);
            $scope.$apply();
        };


        function returnObjByFieldName(field, obj, result){
            var data = obj;

            if(!!data === true){
                for(var i in data){
                    if(data.hasOwnProperty(i)){

                        if(typeof data[i] === 'object'){

                            result = returnObjByFieldName(field, data[i], result);
                        } else {

                            if(data[i] == field){
                                return obj;
                            }
                        }
                    }
                    if(!!result === true){
                        return result;
                    }
                }
            }
            return null;
        };


        vm.addMultiplyFields = function(field){

            // console.log('filled >>>', storage.dataOfStates.newFireCard.chsData.filled);


            // console.log('1 --------->>>', field);
            var wrapper = document.getElementById(field).querySelector('tbody'),
                tr,
                td,
                root = vm.fireAct.chs,
                childCopy = null;

            if(!!wrapper === true && wrapper.nodeType === 1 && !!field === true){

                var obj = returnObjByFieldName(field, storage.dataOfStates.newFireCard.chsData.empty, null),
                    node = null;

                if(!!obj === true && obj.hasOwnProperty('child')){

                    tr = wrapper.insertRow();


                    wrapper.dataset.child = '';
                    wrapper.dataset.parent = field;

                    for(var i = 0, l = obj.child.length; i < l; i++){

                        wrapper.dataset.child = wrapper.dataset.child + ((!!wrapper.dataset.child === true)? ',' : '') + obj.child[i].fieldname;

                        // console.log('2 --------->>>', obj.child, wrapper);


                        childCopy = Object.assign({}, obj.child[i]);

                        if(!root[childCopy.root].hasOwnProperty(childCopy.fieldname)){
                            root[childCopy.root][childCopy.fieldname] = {};
                        }

/*
                        if(!!root[childCopy.root][childCopy.fieldname][wrapper.childNodes.length - 1] === true){
                            root[childCopy.root][childCopy.fieldname][wrapper.childNodes.length - 1] = null;
                        }
*/
                        childCopy.model = childCopy.model + '[' + [wrapper.childNodes.length - 1] + ']';


                        /*
                         console.log(i, 'model 0>>>', wrapper.childNodes.length);
                         console.log(i, 'model 1>>>', obj);
                         console.log(i, 'model 2>>>', obj.child);
                         */
                        // console.log(i, 'model 3>>>', childCopy);


                        node = getNodeByType(childCopy);
                        if(!!node === true && node.nodeType === 1){

                            td = tr.insertCell();
                            td.appendChild(node);


                        }
                    }

                }

                // console.log('------------->', storage.dataOfStates.newFireCard.chsData.filled.chs1);

                $compile(wrapper)($scope);

                // console.log('------->>>', result);
            }
            wrapper = tr = td = root = childCopy = null;

        };


//TODO: ******************************************* Генерация форм ЧС ********************************/



        vm.doPrint = function(reportName){
            printRequest.init(
                {
                    'reportName': reportName,
                    'request': 'fireId=' + vm.fireAct.id
                }
            );
        };




/*
        vm.doPrint = function(reportName){


            if(vm.storage.reports.hasOwnProperty(reportName) && !!vm.storage.reports[reportName].fields === true){
                if(!vm.storage.reports[reportName].fields.hasOwnProperty('MODAL')){
                    modalsService.reports(reportName);
                } else {
                    modalsService[vm.storage.reports[reportName].fields.MODAL](reportName);
                }
            }

            /!*
             printRequest.init(
             {
             'reportName': reportName,
             'fireActId': storage.forma6.fireActId
             }
             );
             *!/


        };
*/






        $scope.$on('$viewContentLoaded', function(event){

            vm.fireAct = Object.assign({}, cleanNewFireAct);
            clearAddress();


            if(!!$stateParams.fireId === true){

                vm.storage.activeFires.find(function(fire){
                    if(fire.id === $stateParams.fireId){
                        vm.fireAct = Object.assign({}, fire);
                        vm.renewFireAct(fire);
                        vm.storage.selectedFire = Object.assign({}, fire);

                        vm.incidentTypeCode = fire.incidentType.code;



                        return true;
                    }
                });

            } else {
                vm.fireAct.registerDate = new Date().getTime();

            }


            if(!!vm.storage.selectedFire === true){

                vm.fireAct = Object.assign({}, vm.storage.selectedFire);
                vm.editFire();
            }

            vm.fieldsStepControl();

            $timeout(function(){

                if(!!vm.storage.dataOfStates.newFireCard.audioRecord.callerPhoneNum === true){

                    vm.fireAct.callerPhoneNum = vm.storage.dataOfStates.newFireCard.audioRecord.callerPhoneNum;
                    vm.fireAct.audio01 = vm.storage.dataOfStates.newFireCard.audioRecord.audio;

                    vm.storage.dataOfStates.newFireCard.audioRecord.callerPhoneNum = vm.storage.dataOfStates.newFireCard.audioRecord.audio = null;
                }
            }, 10);

            $timeout(function(){
                var node = $window.document.body.querySelector('#select-street');

                if(!!node === true && node.nodeType === 1){

                    var getFocus = node.querySelector('.ui-select-focusser');

                    if(!!getFocus === true && getFocus.nodeType === 1){

                        if(!!vm.fireAct.createDate === false && !!vm.fireAct.startDate === false){
                            $timeout(function(){
                                getFocus.focus();

                            }, 0);
                        }
                    }
                }
            }, 0);

            $timeout(function(){
                vm.generateFieldsForCHS();
                vm.parseAnswer();
            }, 10);


        });


        $scope.$on('$destroy', function(){
            vm.clearData([1, 1, 1, 1, 1, 1, 1, 1]);
            // clearAddress();
            storage.controllers.newFireCard = null;
            vm.fieldsForControl = {};
            vm.fireAct = null;
        });

    };

})();
