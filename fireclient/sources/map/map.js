(function(){
    'use strict';
    angular
        .module("mapApp", ['ui.bootstrap', 'ngWebsocket', 'configfile', 'ui.select', 'angular-growl', 'ngCookies'])
        //.constant("WSURL", "ws://stend01.telda.ru/socket")
        //.constant('WSURL', 'ws://172.16.5.54:9000/socket')
        //.constant('LOGOUTURL', 'http://stend01.telda.ru/index.html')
        //.constant('LOGOUTURL', 'http://172.16.5.54:8000/fireclient/index.html')
        //.constant('WMSURL', 'http://stend01.telda.ru/geoserver/telda/wms')
        //.constant('GSLAYERS',
        //'telda:landuse-polygon3857,' +
        //'telda:poi-polygon3857,' +
        //'telda:water-line3857,' +
        //'telda:water-polygon3857,' +
        //'telda:vegetation-polygon3857,' +
        //'telda:building_spb_polygon,' +
        //'telda:allroads,telda:railway-line3857,' +
        //'telda:railway-station-point3857,' +
        //'telda:responsybilitypol,' +
        //'telda:firedivisionptn')
        .value("storage", {
            incidentTypes: [],
            bridges: [],
            activeFires: [],
            bridgeLayer: new ol.layer.Vector({
                source: new ol.source.Vector({
                    projection: 'EPSG:3857'
                })
            }),
            listOfMotorways: [],
            address: {
                streets: null,
                houses: null,
                objects: null,
                objectsSearch: null,
                firePlace: null
            },
            socketStatus: {
                remoteAddress: null,
                socketId: null,
                new: null,
                old: null,
                isReconnecting: false,
                crashTime: null,
                timer: null,
                description: [
                    '0 CONNECTING > The connection is not yet open.',
                    '1 OPEN > The connection is open and ready to communicate.',
                    '2 CLOSING > The connection is in the process of closing.',
                    '3 CLOSED > The connection is closed or couldn\'t be opened.'
                ],
                lastTicket: [],
                showTicketList: false,
                serversForConnection: []
            },
            lastBuildDate: {
                serverBuild: null
            }
        })
        .service('ws', ['$websocket', 'WSURL', 'storage', '$rootScope', 'gzip', 'WSURLCluster', function($websocket, WSURL, storage, $rootScope, gzip, WSURLCluster){
            /*
             return $websocket.$new({
             url: WSURL,
             lazy: true,
             reconnectInterval: 1
             });
             */


            var newWebSocket = $websocket.$new({
                url: WSURLCluster[0],
                // url: WSURL,
                lazy: true,
                reconnectInterval: 1
            });
            var oldEmit = newWebSocket.$emit;

            newWebSocket.$emit = function(name, message){
                // console.log('message >>>', message, new TextEncoder('utf-8').encode(JSON.stringify(message)).length);

                var lng = new TextEncoder('utf-8').encode(JSON.stringify(message)).length;
                var zipp = !!(lng >= 1024);

                console.log('%c%s', 'color: forestgreen;', ['┌──────────────────────────────────────────┤ ', name, ' ▲ ', lng, ' bytes'].join(''));
                console.log('%c%s', 'color: forestgreen;', zipp? '├─ Z ─•' : '├───•', message);
                console.log('%c%s', 'color: forestgreen;', '└───────────────────────────────────────────────────────────────────────┘');
                console.log('');


                if(zipp){
                    message = gzip.toGzip(message);
                }

                oldEmit(name, message);


                /*
                 if(message.hasOwnProperty('ticket')){
                 storage.socketStatus.lastTicket.push({
                 ticket: message.ticket,
                 time: new Date().toLocaleString(),
                 emit: name,
                 from: 'Карта'
                 });
                 $rootScope.$apply();
                 }
                 */


                message = null;
            };

            /*
             return $websocket.$new({
             url: WSURL,
             lazy: true,
             reconnectInterval: 1
             });
             */
            return newWebSocket;


        }])
        .service('switchSocketServer', ['$window', 'ws', 'WSURLCluster', 'storage', '$timeout', 'WSURLPrefix', function($window, ws, WSURLCluster, storage, $timeout, WSURLPrefix){
            this.init = function(message){


                var reconnect = false;
                if(message !== undefined && message instanceof Object){
                    if(message.alive.length > 0){
                        storage.socketStatus.serversForConnection = message.alive;
                        if(!ws.$$config.url.toLowerCase().includes(message.alive[0].toLowerCase())){
                            reconnect = true;
                        }
                    } else {
                        reconnect = false;
                    }
                } else {
                    reconnect = true;
                }

                if(storage.socketStatus.serversForConnection.length === 0){
                    storage.socketStatus.serversForConnection = WSURLCluster;
                }

                if(reconnect){
                    var srvIp = storage.socketStatus.serversForConnection.shift();
                    ws.$close();
                    ws.$$config.url = 'ws://' + srvIp + WSURLPrefix;
                    ws.$open();
                    storage.socketStatus.serversForConnection.push(srvIp);
                    console.log('Attempt to connect with: ', ws.$$config.url);
                }
            };
        }])
        .factory('WSURL', ['WSURLMobile', 'WSURLDesktop', function(WSURLMobile, WSURLDesktop){
            var isMobile = false; //initiate as false
// device detection
            if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
                || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;
            if(isMobile){
                return WSURLMobile;
            } else {
                return WSURLDesktop;
            }
        }])
        .factory('logoutUserFromSystem', ['$cookies', 'storage', 'ws', '$window', function($cookies, storage, ws, $window){
            function logoutUserFromSystem(){
                // storage.socketStatus.isReconnecting = false;
                storage.loginUser = true;
                if(angular.isDefined(ws)){
                    ws.$close();
                }
                $window.location.href = loginUrl;
                $window.close();

                return true;
            }

            return logoutUserFromSystem;
        }])
        .factory('engineTypeSortingAlgorythm', ['growl', 'storage', function(growl, storage){
            function sort(engine){
                function getRealType(smthg){
                    var typeName = '';
                    if(angular.isString(smthg)){ //для bytypes
                        typeName = smthg;
                    }
                    if(smthg.engineType !== undefined){
                        typeName = smthg.engineType.engineType;
                    }
                    //для order
                    if(smthg.fireEngineType !== undefined){
                        typeName = smthg.fireEngineType.engineType;
                    }
                    //potentialEngines
                    if(smthg.engine !== undefined){
                        typeName = smthg.engine.engineType.engineType;
                    }
                    var realType = _.find(storage.fireEngineTypes, function(engineType){
                        return engineType.engineType === typeName;
                    });
                    if(realType === undefined){
                        console.log('error in engineSortAlgorythm 128')
                    } else {
                        return realType;
                    }
                }

                function getIsFirstTank(smthg){
                    if(smthg.isFirstTank !== undefined){
                        return smthg.isFirstTank;
                    }
                    if(smthg.fireEngine !== undefined){
                        if(smthg.fireEngine.isFirstTank !== undefined){
                            return smthg.fireEngine.isFirstTank;
                        }
                    }
                    if(smthg.engine !== undefined){
                        return smthg.engine.isFirstTank;
                    }
                    if(angular.isString(smthg)){
                        return false;
                    }
                    console.log('error in engineSortAlgorythm 146');
                    return false;
                }

                function isEngine(smthg){
                    return (smthg.fireEngine !== undefined || smthg.isFirstTank !== undefined || smthg.engine !== undefined);
                }


                function answerPosition(positionByType, positionByState){
                    return positionByType + positionByState;
                }

                var realType = getRealType(engine);

                var positionByType = null;
                var positionByState = null;

                switch(realType.engineType){
                    case "АЦ" :
                        if(getIsFirstTank(engine)){
                            positionByType = 0;
                        } else {
                            positionByType = 1;
                        }
                        break;
                    case "АПП":
                        positionByType = 2;
                        break;
                    case "АГ":
                        positionByType = 3;
                        break;
                    case "АЛ-30":
                        positionByType = 4;
                        break;
                    case "АЛ-50":
                        positionByType = 5;
                        break;
                    case "АЛ-78":
                        positionByType = 6;
                        break;
                    case "АПК-30":
                        positionByType = 7;
                        break;
                    case "АПК-50":
                        positionByType = 8;
                        break;
                    default:
                        switch(realType.engineKind){
                            case"ОСНОВНАЯ":
                                positionByType = 9;
                                break;
                            case  "СПЕЦИАЛЬНАЯ":
                                positionByType = 10;
                                break;
                            default:
                                positionByType = realType.engineType;
                                break;
                        }
                }
                if(isEngine(engine)){
                    var state = null;
                    if(engine.fireEngineState !== undefined){
                        state = engine.fireEngineState;
                    }
                    if(engine.fireEngine !== undefined){
                        if(engine.fireEngine.fireEngineState !== undefined){
                            state = engine.fireEngine.fireEngineState;
                        }
                    }
                    if(engine.engine !== undefined){
                        state = engine.engine.fireEngineState;
                    }
                    if(state != undefined && state.name != undefined && state.onDuty){
                        if(state.name == 'В РАСЧЕТЕ'){
                            positionByState = 0
                        } else {
                            if(state.name == 'ВП'){
                                positionByState = 20
                            } else {
                                positionByState = 40
                            }
                        }
                    } else {
                        positionByState = 60
                    }
                }
                return answerPosition(positionByType, positionByState)
            }

            return sort;
        }])
        .filter('firePlaceFilter', function(){
            return function(firePlace){
                var output = '';
                if(firePlace.region.code === 1141){
                    output = firePlace.address.settName;
                } else {
                    output = firePlace.address.street + " " + firePlace.address.house;
                    if(firePlace.crossStreet != null){
                        output += '\n' + firePlace.crossStreet.street;
                    }
                }
                return output;
            };
        })
        .filter('wayfilter', function(){
            return function(way){
                var output = way.name + ' ' + way.direction;
                output = output.replace('внешнее', 'Внеш').replace('внутреннее', 'Внутр').replace('кольцо', '').replace('северное', 'Сев').replace('южное', 'Южн').replace('направление', '');
                return output;
            };
        })
        .controller('FireMap', FireMap)
    ;

    FireMap.$inject = ['$log', '$scope', 'ws', '$location', '$window', 'LOGOUTURL', 'WMSURL', 'GSLAYERS', '$rootScope', 'storage', 'engineTypeSortingAlgorythm', '$filter', '$cookies', '$timeout', '$interval', 'logoutUserFromSystem', 'ShowZippedEmitsInConsole', 'gzip', 'ShowSentTicket', 'WSURLCluster', 'switchSocketServer', 'GlobalExtend', 'InitialCenter', 'MapResolutions'];
    function FireMap($log, $scope, ws, $location, $window, LOGOUTURL, WMSURL, GSLAYERS, $rootScope, storage, engineTypeSortingAlgorythm, $filter, $cookies, $timeout, $interval, logoutUserFromSystem, ShowZippedEmitsInConsole, gzip, ShowSentTicket, WSURLCluster, switchSocketServer, GlobalExtend, InitialCenter, MapResolutions){

        console.clear();
        console.log('GlobalExtend', GlobalExtend);
        console.log('InitialCenter', InitialCenter);
        console.log('MapResolutions', MapResolutions);

        // var urlTicket = $location.search().ticket;
        var urlSocket = $location.search().socketId;
        var loginUrl = LOGOUTURL;


        $rootScope.$watch(function(){
                return ws.$status();
            },
            function(newVal, oldVal){
                // console.log(newVal);

                console.log('WebSocket state: ', storage.socketStatus.description[ws.$status()]);


                var element = $('#websocket-visual-box');


                storage.socketStatus.new = newVal;

                storage.socketStatus.old = oldVal;


                if(newVal === 0){
                    element.removeClass("websocket-state-1 websocket-state-2 websocket-state-3").addClass("websocket-state-0");
                }
                if(newVal === 1){
                    element.removeClass("websocket-state-0 websocket-state-2 websocket-state-3").addClass("websocket-state-1");
                }
                if(newVal === 2){
                    element.removeClass("websocket-state-1 websocket-state-0 websocket-state-3").addClass("websocket-state-2");
                }
                if(newVal === 3){
                    element.removeClass("websocket-state-1 websocket-state-2 websocket-state-0").addClass("websocket-state-3");
                }

            }
        );
        if(angular.isDefined(urlSocket)){
            // if(angular.isDefined(urlTicket)){
            var vm = this;
            storage.pointObjectInfo = null;
            /*
             storage.pointObjectInfo = {
             crosses: [],
             fireObjects: [],
             houses: [],
             place: {}
             }
             */

            vm.storage = storage;
// console.log('vm.storage >>>', vm.storage);

            vm.showSentTicket = ShowSentTicket;
            vm.switchViewTicketList = function(){
                vm.storage.socketStatus.showTicketList = !vm.storage.socketStatus.showTicketList;
            };


            /////Styles
            vm.colorRed = [255, 0, 0, 0.7];
            vm.colorBlue = [0, 0, 255, 0.7];
            vm.colorGreen = [0, 204, 0, 0.7];
            vm.colorOrange = [255, 129, 0, 0.8];
            vm.activeFireStyle = new ol.style.Style({
                text: new ol.style.Text({
                    text: '\uf0e7',
                    font: '38px' + ' ' + 'FontAwesome',
                    offsetY: -11.8,
                    fill: new ol.style.Fill({
                        color: 'orangered'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'lightgoldenrodyellow',
                        width: 4
                    })
                })
            });

            vm.tempoStyle = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 12,
                    fill: new ol.style.Fill({color: vm.colorRed}),
                    stroke: new ol.style.Stroke({color: vm.colorRed, width: 3})
                    /*
                     fill: new ol.style.Fill({color: vm.colorGreen}),
                     stroke: new ol.style.Stroke({color: vm.colorGreen, width: 3})
                     */

                }),
                fill: new ol.style.Fill({color: vm.colorGreen}),
                stroke: new ol.style.Stroke({color: vm.colorGreen, width: 3})
            });

            vm.selectedPointStyle = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 12,
                    fill: new ol.style.Fill({color: vm.colorOrange}),
                    stroke: new ol.style.Stroke({color: vm.colorOrange, width: 3})

                }),
                fill: new ol.style.Fill({color: vm.colorOrange}),
                stroke: new ol.style.Stroke({color: vm.colorOrange, width: 3})
            });
            vm.activeFireSelectedStyle = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 18,
                    fill: new ol.style.Fill({color: vm.colorBlue}),
                    stroke: new ol.style.Stroke({color: vm.colorBlue, width: 3})

                }),
                fill: new ol.style.Fill({color: vm.colorBlue}),
                stroke: new ol.style.Stroke({color: vm.colorBlue, width: 3})
            });
            ///////////Styles
            vm.fireUser = undefined;
            vm.geoserverWmsUrl = WMSURL;
            vm.geoserverWmsLAYERS = GSLAYERS;
            vm.fireTypeString1 = "МУСОР";
            vm.fireTypeString2 = "АСР";
            vm.fireTypeString3 = "ПОЖАР";
            vm.colorForType1 = 'rgba(112,112,112,0.8)';
            vm.colorForType2 = 'rgba(142,88,16,0.8)';
            vm.colorForType3 = 'rgba(255,0,60,0.8)';
            vm.colorForDefaultCase = 'rgba(0,0,0,0.8)';
            vm.globalExtend = GlobalExtend;
            // vm.globalExtend = [3200000.0, 8300000.0, 3450000.0, 8550000.0];
            vm.mapResolutions = MapResolutions;
            // vm.mapResolutions = [98.0, 56.0, 22.4, 11.2, 5.6, 2.8, 1.26, 0.56, 0.28];
            vm.initialCenter = InitialCenter;
            // vm.initialCenter = [30.306995, 59.944377];

            var pingSocket = $interval(
                function(){
                    ws.$emit('ping', new Date().getTime());
                }
                , 60000);


            ws.$on('showTestPath', function(GeoJSONmessage){
                var rawMessage = JSON.parse(GeoJSONmessage);
                vm.routingLayer.getSource().clear();
                for(var j = 0; j < rawMessage.length; j++){
                    var geom = new ol.geom.MultiLineString(rawMessage[j].coordinates);

                    var pathFeature = new ol.Feature({
                        geometry: geom
                    });
                    pathFeature.setStyle(
                        new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color: 'rgba(0, 255, 0,0.8)',
                                width: 5
                            })
                        })
                    );
                    vm.routingLayer.getSource().addFeature(pathFeature);
                }
            });


            var sendLogin = false;
            // var ticket = $cookies.get('ticket');

            ws.$on('$open', function(){
                console.log('WebSocket connected to: ', ws.$$config.url);
                /*
                 if(!!sendLogin === false){
                 sendLogin = true;
                 */
                // ticket = $cookies.get('ticket');
                // if(ticket){


                // ws.$emit('login', {ticket: urlTicket, from: 'openMap'});

                // console.log('storage ------>', storage);

                /*
                 ws.$emit('login', {
                 ticket: ticket,
                 locale: 'uzb',
                 socketId: storage.hasOwnProperty('socketId') ? storage.socketStatus.socketId : urlSocket,
                 // socketId: storage.socketStatus.socketId,
                 user: storage.hasOwnProperty('fireUser') ? storage.fireUser.uid : null,
                 password: storage.hasOwnProperty('fireUser') ? storage.fireUser.pwd : null,
                 from: 'map'
                 });
                 */


                /*
                 ws.$emit('initFireUser', urlTicket);
                 ws.$emit('initFires', urlTicket);
                 ws.$emit('initIncidentTypes', urlTicket);
                 ws.$emit('initFireEngineTypes', urlTicket);
                 ws.$emit('getBridges', urlTicket);
                 */
                /*
                 } else {
                 // $window.close();
                 $window.location.href = loginUrl;
                 }
                 } else {
                 sendLogin = false;
                 }
                 */
            });


            ws.$on('init', function(message){
                if(!!message === true){
                    storage.dictionary = message.dictionary;
                    storage.lastBuildDate.serverBuild = message.versions.cuks;
                    storage.lastBuildDate.clientBuild = $window._buildCreationDate.lastBuild;
                }

                /*
                 if(!!sendLogin === false){
                 sendLogin = true;
                 */
                // var ticket = $cookies.get('ticket');

                // if(angular.isDefined(ticket)){
                // ws.$emit('login', {ticket: urlTicket, from: 'initMap'});
                ws.$emit('login', {
                        // ticket: ticket,
                        locale: 'uzb',
                        socketId: storage.hasOwnProperty('socketId')? storage.socketStatus.socketId : urlSocket,
                        // socketId: storage.socketStatus.socketId,
                        user: storage.hasOwnProperty('fireUser')? storage.fireUser.uid : null,
                        password: storage.hasOwnProperty('fireUser')? storage.fireUser.pwd : null,
                        from: 'map',
                        lastBuildDate: storage.lastBuildDate.clientBuild
                    }
                );

                /*
                 } else {
                 $state.go('login');
                 }
                 } else {
                 sendLogin = false;
                 }
                 */


            });

            ws.$on('servers', function(message){
                if(!!message === true){
                    // storage.socketStatus.serversForConnection = message.alive;
                    switchSocketServer.init(message);
                }
            });


            ws.$on('$error', function(error){
                /* TODO разобраться */
                // storage.socketStatus.isReconnecting = false; // true

                switchSocketServer.init();

                /*

                 if(storage.socketStatus.crashTime == null){
                 storage.socketStatus.crashTime = new Date();

                 storage.socketStatus.timer = $timeout(function(){
                 console.log('>>> Timed out the connection to the server');
                 /!* TODO разобраться *!/
                 // logoutUserFromSystem();

                 }, 1000 * 60 * 5);

                 }
                 */
            });

            ws.$on('restart', function(){
                logoutUserFromSystem();
            });


            ws.$on('login', function(message){


                vm.fireUser = message.fireUser;
                storage.fireUser = message.fireUser;
                storage.socketStatus.isReconnecting = false;

                /*
                 var ticket = $cookies.get('ticket');
                 if(angular.isDefined(ticket)){

                 console.log('Login after socket crush');
                 console.log('Is reconnecting: ', storage.socketStatus.isReconnecting);

                 $timeout.cancel(storage.socketStatus.timer);

                 } else {
                 */

                console.log('Normal Login');

                if(message.hasOwnProperty('remoteAddress')){
                    storage.socketStatus.remoteAddress = message.remoteAddress;
                }
                if(message.hasOwnProperty('socketId')){
                    storage.socketStatus.socketId = message.socketId;
                }

                // }
                ws.$emit('initMapData', urlSocket);
                // ws.$emit('initMapData', urlTicket);
                $scope.$apply();
            });


            /*
             ws.$on('$message', function(evt){
             if(evt.hasOwnProperty('emitId')){
             ws.$emit('confirmEmit', evt.emitId);
             }
             });
             */
            ws.$on('initMapData', function(message){
                if(!!message === true){
                    for(var i in message){
                        if(i in message){
                            if(message.hasOwnProperty(i) && ws.$$eventMap.hasOwnProperty(i)){
                                for(var j = 0; j < ws.$$eventMap[i].length; j++){
                                    ws.$$eventMap[i][j](message[i]);

                                }
                            }
                        }
                    }
                }
            });

            ws.$on('$close', function(){
                console.log('WebSocket state: ', storage.socketStatus.description[ws.$status()]);
            });

            ws.$on('terra', function(message){
                console.log('terra=', message);
                vm.initialCenter = (!!message === true && message.hasOwnProperty('x'))?
                    [message.x, message.y] : vm.initialCenter;


                vm.globalExtend = (!!message === true && message.hasOwnProperty('x'))?
                    [message.minX, message.minY, message.maxX, message.maxY] : vm.globalExtend;


                console.log('initialCenter=' + vm.initialCenter + '; globalExtend=' + vm.globalExtend);
                vm.createMap(vm.initialCenter, vm.globalExtend, vm.mapResolutions);
            });


            ws.$on('fires', function(message){
                // ws.$on('initFires', function(message){
                // storage.activeFires = Object.assign({}, message);
                storage.activeFires = message;
                // angular.copy(message, storage.activeFires);

                vm.updateFireActs();
            });


            ws.$on('getPointInfo', function(message){
                storage.listOfMotorways = message.motorways;
                storage.pointObjectInfo = message.address;
                var sorted = _.sortBy(storage.listOfMotorways, function(way){
                    return way.distance;
                });
                if(sorted.length > 0 && sorted[0].distance < 50){
                    vm.choosePosPoint(sorted[0]);
                } else {
                    vm.choosePosPoint(null);
                }
                $rootScope.$apply();
            });


            /*
             ws.$on('initFireUser', function(message){
             // $log.log(message);
             vm.fireUser = message;
             $scope.$apply();
             });
             */


            ws.$on('fireEngineTypes', function(message){
                // ws.$on('initFireEngineTypes', function(message){
                storage.fireEngineTypes = message;
            });


            ws.$on('addNewFire', function(message){

                if(!!storage.activeFires === true){

                    var found = storage.activeFires.find(function(aF, idx){
                        if(aF.id === message.fireAct.id){
                            /*
                             storage.activeFires[idx] = null;
                             storage.activeFires[idx] = message.fireAct;
                             */
                            storage.activeFires[idx] = Object.assign({}, message.fireAct);
                            return true;
                        }
                        return false;
                    });
                }
                if(!found){
                    storage.activeFires.push(message.fireAct);
                }
                message = null;
                vm.updateFireActs();
            });
            ws.$on('deleteFire', function(message){


                /*
                 var currFire = _.find(storage.activeFires, function(fire){
                 return fire.id == message
                 });
                 var indexCurrFire = _.indexOf(storage.activeFires, currFire);
                 storage.activeFires.splice(indexCurrFire, 1);
                 */

                var fIdx = null;
                storage.activeFires.find(function(aF, idx){
                    if(aF.id === message){
                        fIdx = idx;
                        return true;
                    }
                });

                if(fIdx !== null){
                    storage.activeFires.splice(fIdx, 1);
                }


                vm.updateFireActs();
            });


            ws.$on('logout', function(message){
                // $window.location.href = loginUrl;
                $window.close();
            });
            ws.$on('selectFire', function(message){
                vm.tempLayer.getSource().clear();
                _.each(vm.pointLayer.getSource().getFeatures(), function(feature){
                    feature.setStyle(vm.activeFireStyle)
                });
                var feature = vm.pointLayer.getSource().getFeatureById(message);
                feature.setStyle(vm.activeFireSelectedStyle);
                vm.map.getView().setCenter(feature.getGeometry().getCoordinates());
                vm.map.getView().setZoom(9);
            });
            ws.$on('showPathFromPchToFire', function(message){
                var message = JSON.parse(message);

                var geom = new ol.geom.MultiLineString(message.coordinates);

                var pathFeature = new ol.Feature({
                    geometry: geom
                });
                pathFeature.setStyle(
                    new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'rgba(0, 50, 200,0.8)',
                            width: 5
                        })
                    })
                );
                vm.pathLayer.getSource().clear();
                vm.pathLayer.getSource().addFeature(pathFeature);
            });
            ws.$on('showSpider', function(message){
                if(angular.isArray(message)){
                    var arrayOfLines = _.map(message, function(line){
                        return JSON.parse(line)
                    })
                }
                //arrayOfLines = [arrayOfLines[15]];
                vm.pathLayer.getSource().clear();
                _.each(arrayOfLines, function(line){
                    var geom = new ol.geom.MultiLineString(line.coordinates);

                    var pathFeature = new ol.Feature({
                        geometry: geom
                    });
                    pathFeature.setStyle(
                        new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color: 'rgba(255, 0, 0,0.8)',
                                width: 5
                            })
                        })
                    );
                    vm.pathLayer.getSource().addFeature(pathFeature);
                });

            });
            ws.$on('putBuildingOnMap', function(message){
                vm.tempLayer.getSource().clear();
                var point = new ol.geom.Point(ol.proj.transform([message.geomX, message.geomY], 'EPSG:4326', 'EPSG:3857'));
                var feature = new ol.Feature({
                    geometry: point,
                    firePlace: message
                });
                feature.setStyle(vm.tempoStyle);
                vm.tempLayer.getSource().addFeature(feature);
                vm.map.getView().setCenter(feature.getGeometry().getCoordinates());
                vm.map.getView().setZoom(6);
            });
            ws.$on('putPointOnMap', function(message){
                vm.putPointOnMap(message);
                var coords = ol.proj.transform([message.x, message.y], 'EPSG:4326', 'EPSG:3857');
                vm.map.getView().setCenter(coords);
                vm.map.getView().setZoom(6);
            });
            vm.putPointOnMap = function(pointInfo){
                vm.tempLayer.getSource().clear();
                var point = new ol.geom.Point(ol.proj.transform([pointInfo.x, pointInfo.y], 'EPSG:4326', 'EPSG:3857'));
                var feature = new ol.Feature({
                    geometry: point
                });
                if(pointInfo.flag === 0){
                    feature.setStyle(vm.tempoStyle);
                } else {
                    feature.setStyle(vm.selectedPointStyle);
                }
                vm.tempLayer.getSource().addFeature(feature);
            };
            vm.updateBridges = function(message){
                angular.merge(storage.bridges, message);
                storage.bridgeLayer.getSource().clear();
                _.each(storage.bridges, function(bridge){
                    var times = [];
                    _.each(bridge.times, function(time){
                        if(time.isEnabled){
                            times.push(time)
                        }
                    });
                    var bri = new ol.Feature({
                        geometry: new ol.geom.Point(ol.proj.transform([bridge.x, bridge.y], "EPSG:4326", "EPSG:3857")),
                        name: bridge.bridgeName,
                        times: times,
                        state: bridge.isEnabled
                    });
                    var stroke = new ol.style.Stroke({});
                    var fill = new ol.style.Fill({});
                    var rotation = 0;
                    if(bri.get('state')){
                        stroke.setColor('#292');
                        fill.setColor('#4f4');
                        rotation = 10 * Math.PI / 9
                    }
                    else {
                        stroke.setColor('#922');
                        fill.setColor('#f44');
                        rotation = Math.PI / 9
                    }
                    var iconStyle = new ol.style.Style({
                        image: new ol.style.RegularShape({
                            fill: fill,
                            stroke: stroke,
                            points: 3,
                            radius: 10,
                            rotation: rotation,
                            angle: 30
                        })
                    });
                    bri.setStyle(iconStyle);
                    storage.bridgeLayer.getSource().addFeature(bri);
                    //vm.bridges.push(bri);
                });
            };
            // ws.$on('getBridges', function(message){
            ws.$on('bridges', function(message){
                vm.updateBridges(message);
                $rootScope.$apply();
            });
            ws.$on('updateBridges', function(message){
                vm.updateBridges(message);
                $rootScope.$apply();
            });
            // ws.$on('initIncidentTypes', function(message){
            ws.$on('incidentTypes', function(message){
                storage.incidentTypes = message;
                $rootScope.$apply();
            });
            ws.$on('adminChangeBridgeScheduler', function(message){
                var bridge = _.find(storage.bridges, function(bridge){
                    return bridge.id === message.bridge.id;
                });
                angular.merge(bridge, message.bridge);
                vm.updateBridges(storage.bridges)
            });
            ws.$on('changeOrders', function(zipShapes){
                var strData = atob(zipShapes);
                var charData = strData.split('').map(function(x){
                    return x.charCodeAt(0);
                });
                var binData = new Uint8Array(charData);
                var message = JSON.parse(pako.inflate(binData, {to: 'string'}));
                var fireAct = _.find(storage.activeFires, function(fire){
                    return fire.id == message.id
                });
                if(fireAct != undefined){
                    angular.copy(message, fireAct);
                    vm.updateFireActs();
                    $rootScope.$apply();
                }
            });
            ws.$on('updateFireAct', function(message){
                var fireAct = _.find(storage.activeFires, function(activeFire){
                    return activeFire.id == message.fireAct.id;
                });
                if(fireAct != undefined){
                    angular.copy(message.fireAct, fireAct);
                    vm.updateFireActs();
                    $rootScope.$apply();
                }
            });

            switchSocketServer.init();
            // ws.$open();

            /*
             var pingSocket = $interval(
             function(){
             ws.$emit('ping', true);
             }
             , 60000);
             // , 600000);
             */


            vm.updateFireActs = function(){
                vm.pointLayer.getSource().clear();
                _.each(storage.activeFires, function(fire){
                    vm.addFireAct(fire);
                });

            };
            vm.addFireAct = function(activeFire){

                if(!activeFire.isReadyForF6){
                    var point = new ol.geom.Point(ol.proj.transform([activeFire.firePlace.geomX, activeFire.firePlace.geomY], 'EPSG:4326', 'EPSG:3857'));
                    var feature = new ol.Feature({
                        geometry: point,
                        activeFire: activeFire
                    });
                    feature.setStyle(vm.activeFireStyle);
                    feature.setId(activeFire.id);
                    vm.pointLayer.getSource().addFeature(feature);
                }
            };
            //////////////LOGIC
            vm.showContextMenu = false;
            vm.position = {
                top: '500px',
                left: '500px'
            };
            vm.coords = [];
            vm.closeSolutions = function(){
                vm.showContextMenu = false;
                vm.choosePosPoint(null);
                vm.tempLayer.getSource().clear();
                vm.storage.pointObjectInfo = null;
            };
            vm.chooseSolution = function(incident){

                var incidentType = null;

                vm.storage.incidentTypes.find(function(inc){
                    if(incident.id === inc.id){
                        incidentType = inc;
                        return true;
                    }
                });

                /*
                 var command = {
                 typeFire: incident,
                 motorway: vm.chosenPointPosition,
                 x: vm.coords[0],
                 y: vm.coords[1]
                 };
                 ws.$emit('findByCoords', command);
                 */
                ws.$emit('createFireByXY', {
                    x: vm.coords[0],
                    y: vm.coords[1],
                    typeFire: incident
                });

                vm.closeSolutions();
            };
            //создание попап окошка на карте
            vm.createPopupOnMap = function(){
                $("<div/>", {
                    id: 'popup'
                }).appendTo("#map");
            };
            //удаление попап окошка
            vm.removePopup = function(){
                if(!($('#popup').length === 0)){
                    var popoverId = $('#popup').attr('aria-describedby');
                    $('#' + popoverId).remove();
                    $('#popup').remove();
                    console.log('in remove');
                }
                else {
                    // console.log('no popup in dom');
                }
            };
            vm.setBagde = function(num){
                return '<span class="badge">' + num + '</span>'
            };

            vm.createMap = function(initialCenter, globalExtend, mapResolutions){
                vm.tiled = new ol.layer.Tile({

                    title: 'Основная карта',
                    source: new ol.source.TileWMS(({
                        url: vm.geoserverWmsUrl,
                        //crossOrigin: 'anonymous',
                        params: {
                            LAYERS: vm.geoserverWmsLAYERS,
                            'TILED': true,
                            'FORMAT': 'image/png'
                        },
                        serverType: 'geoserver',
                        tileGrid: new ol.tilegrid.XYZ({

                            //resolutions: vm.mapResolutions
                        })
                    }))
                });
                vm.pointLayer = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        projection: 'EPSG:3857'
                    })
                });
                vm.pathLayer = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        projection: 'EPSG:3857'
                    })
                });
                vm.tempLayer = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        projection: 'EPSG:3857'
                    })
                });
                var respZonesSpbLabels = new ol.layer.Image({
                    name: 'Подписи зон ответственности',
                    source: new ol.source.ImageWMS({
                        url: vm.geoserverWmsUrl,
                        ratio: 1,
                        params: {
                            'LAYERS': 'telda:resp_zones_labels',
                            'TRANSPARENT': 'true'
                        }
                    })
                });
                var areasSpb = new ol.layer.Tile({
                    name: 'Границы районов',
                    source: new ol.source.TileWMS(({
                        /*url: CONFIG_CONSTANTS.GEOSERVER_WMS_URL,*/
                        url: vm.geoserverWmsUrl,
                        params: {
                            /*'LAYERS': 'EPSG_3857:spbAreaWithoutLabels',*/
                            'LAYERS': 'telda:boundary-polygon3857',
                            'VERSION': '1.1.1',
                            'FORMAT': 'image/png',
                            'TILED': false,
                            'cql_filter': 'admin_lvl=6'
                        },
                        serverType: 'geoserver'
                    }))
                });
                var areaSpbLabels = new ol.layer.Image({
                    name: 'Подписи районов',
                    source: new ol.source.ImageWMS({
                        url: vm.geoserverWmsUrl,
                        ratio: 1,
                        params: {
                            'LAYERS': 'telda:spb_area_labels',
                            'TRANSPARENT': 'true',
                            'cql_filter': 'admin_lvl=6'
                        }
                    })
                });
                // console.log(vm.globalExtend);
                var objectsLayer = new ol.layer.Tile({

                    title: 'Объекты',
                    visible: false,
                    source: new ol.source.TileWMS(({
                        url: vm.geoserverWmsUrl,
                        params: {
                            LAYERS: 'telda:firepoints',
                            'TILED': true,
                            'FORMAT': 'image/png'
                        },
                        serverType: 'geoserver',
                        tileGrid: new ol.tilegrid.XYZ({

                            //resolutions: vm.mapResolutions
                        })
                    })),
                    style: 'firepoints'
                });
                vm.toggleObjectsLayerVisible = function(){
                    objectsLayer.setVisible(!vm.isObjectsLayerVisible());
                };
                vm.isObjectsLayerVisible = function(){
                    return objectsLayer.getVisible();
                };
                vm.routingLayer = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        projection: 'EPSG:3857'
                    })
                });
                vm.storage.bridgeLayer.getSource().clear();
                _.each(vm.storage.bridges, function(bridge){
                    var times = [];
                    _.each(bridge.times, function(time){
                        if(time.isEnabled){
                            times.push(time)
                        }
                    });
                    var bri = new ol.Feature({
                        geometry: new ol.geom.Point(ol.proj.transform([bridge.x, bridge.y], "EPSG:4326", "EPSG:3857")),
                        name: bridge.bridgeName,
                        times: times,
                        state: bridge.isEnabled
                    });
                    var stroke = new ol.style.Stroke({});
                    var fill = new ol.style.Fill({});
                    var rotation = 0;
                    if(bri.get('state')){
                        stroke.setColor('#292');
                        fill.setColor('#4f4');
                        rotation = 10 * Math.PI / 9
                    }
                    else {
                        stroke.setColor('#922');
                        fill.setColor('#f44');
                        rotation = Math.PI / 9

                    }
                    var iconStyle = new ol.style.Style({
                        image: new ol.style.RegularShape({
                            fill: fill,
                            stroke: stroke,
                            points: 3,
                            radius: 10,
                            rotation: rotation,
                            angle: 30
                        })
                    });
                    bri.setStyle(iconStyle);
                    vm.storage.bridgeLayer.getSource().addFeature(bri);
                    //vm.bridges.push(bri);
                });


                function copyToClipBoard(data){


                    var tmp = document.createElement('INPUT'), // Создаём новый текстовой input
                        focus = document.activeElement; // Получаем ссылку на элемент в фокусе (чтобы не терять фокус)

                    tmp.value = data; // Временному input вставляем текст для копирования

                    document.body.appendChild(tmp); // Вставляем input в DOM
                    tmp.select(); // Выделяем весь текст в input
                    document.execCommand('copy'); // Магия! Копирует в буфер выделенный текст (см. команду выше)
                    document.body.removeChild(tmp); // Удаляем временный input
                    focus.focus(); // Возвращаем фокус туда, где был


                };


                vm.map = new ol.Map({
                    layers: [vm.tiled, respZonesSpbLabels, areasSpb, areaSpbLabels, objectsLayer, vm.pointLayer, vm.pathLayer, vm.tempLayer, vm.routingLayer, vm.storage.bridgeLayer],
                    target: 'map',
                    view: new ol.View({
                        extent: globalExtend,
                        projection: 'EPSG:3857',
                        center: ol.proj.transform(initialCenter, "EPSG:4326", "EPSG:3857"),
                        zoom: 0,
                        resolutions: mapResolutions
                    })
                });
                //обработчик левых кликов на карте
                vm.map.on('click', function(evt){


                    var coords = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');


                    if(!!coords === true){

                        copyToClipBoard(coords.join(', '));

                    }


                    /*

                     console.log('evt 0 >>>', evt);
                     var point = ol.proj.transform([evt.coordinate[0], evt.coordinate[1]], 'EPSG:3857', 'EPSG:4326');
                     console.log('evt 1 >>>', point);

                     */


                    vm.showContextMenu = false;
                    vm.storage.pointObjectInfo = null;
                    var feature = vm.map.forEachFeatureAtPixel(evt.pixel,
                        function(feature, layer){
                            return feature;
                        });
                    if(feature){
                        vm.removePopup();
                        vm.createPopupOnMap();
                        var element = $('#popup');
                        var popup = new ol.Overlay({
                            element: element,
                            positioning: 'bottom-center',
                            stopEvent: false
                        });
                        vm.map.addOverlay(popup);
                        var geometry = feature.getGeometry();
                        var coord = geometry.getCoordinates();
                        popup.setPosition(coord);
                        if(feature.get('name') != undefined){
                            var brName = feature.get('name');
                            var state = '';
                            var timesString = '';
                            var timesHead = '<table>';
                            var timesTail = '</table>';
                            var times = feature.get('times');
                            _.each(times, function(time){
                                timesString += '<tr><td>' + time.bridgeTimeCloseH + ':' + time.bridgeTimeCloseM + '</td><td><i class="glyphicon glyphicon-arrow-right"></td><td>' + time.bridgeTimeOpenH + ':' + time.bridgeTimeOpenM + '</td></tr>'
                            });
                            timesString = timesHead + timesString + timesTail;
                            if(feature.get('state')){
                                state = 'Сведен'
                            } else {
                                state = 'разведен'
                            }

                            $(element).popover({
                                'placement': 'top',
                                'html': true,
                                'title': brName + ' ' + state,
                                'content': timesString
                            });
                            $(element).popover('show');
                        }

                        if(feature.get('activeFire') != undefined){
                            var activeFire = feature.get('activeFire');
                            popup.set('id', activeFire.id);
                            var type = activeFire.incidentType.name;
                            var engineList = $filter('orderBy')(activeFire.orders, engineTypeSortingAlgorythm);
                            var rank = activeFire.rank.namefirerank;
                            var address = activeFire.firePlace.address.street + ' ' + activeFire.firePlace.address.house;
                            var num = activeFire.numFireAct;
                            var engineListObject = _.countBy(engineList, function(engine){
                                return engine.fireEngineType.engineType;
                            });
                            var engineListString = '';
                            var stringHead = '<ul class="list-group" style="margin-bottom: 0;">';
                            var stringTail = '</ul>';
                            if(engineList.length > 0){
                                _.each(engineListObject, function(index, value){
                                    engineListString += '<li class="list-group-item nopm">' + value + vm.setBagde(index) + '</li>';
                                });
                            }
                            else {
                                engineListString = '<li class="list-group-item nopm" style="padding: 0 5px"> Техника не была назначена </li>';
                            }
                            engineListString = stringHead + engineListString + stringTail;
                            $(element).popover({
                                'placement': 'auto',
                                'html': true,
                                'title': '<div style="width: 250px">' + address + '<br/>' + type + '<br/> Приказ: ' + num + '<br/> Ранг: ' + rank + '</div>',
                                'content': engineListString
                            });
                            $(element).popover('show');
                        }
                    }
                    else {
                        vm.removePopup();
                    }
                    $rootScope.$apply();
                });
                vm.map.getViewport().addEventListener('contextmenu', function(e){
                    e.preventDefault();
                    if(vm.showContextMenu){
                        e.preventDefault();
                        vm.closeSolutions();
                        $rootScope.$apply();
                    } else {
                        e.preventDefault();
                        vm.showContextMenu = true;
                        var pix = vm.map.getEventPixel(e);
                        vm.position.left = pix[0] - 103;
                        vm.position.top = pix[1] + 55;
                        vm.coords = ol.proj.transform(vm.map.getCoordinateFromPixel(pix), 'EPSG:3857', 'EPSG:4326');
                        var command = {
                            x: vm.coords[0],
                            y: vm.coords[1]
                        };
                        storage.listOfMotorways = [];
                        var pointInfo = {
                            x: vm.coords[0],
                            y: vm.coords[1],
                            flag: 0
                        };
                        vm.putPointOnMap(pointInfo);
                        ws.$emit('getPointInfo', command);
                        $rootScope.$apply();
                    }
                });
                //ПОИСК УЛИЦ
                vm.streetSearch = '';
                vm.houseSearch = '';
                vm.objSearch = '';
                //Событие для регистрации каждой буквы, которую ввел пользователь в поле улицы
                $rootScope.$watch(function(){
                        return vm.streetSearch;
                    },
                    function(newVal, oldVal){
                        if(newVal && newVal.length > 2){
                            ws.$emit("findStreet", newVal);
                        }
                    });
                ws.$on('findStreet', function(message){

                    var addresses = [],
                        similar = [],
                        raionNames = {};

                    for(var j = 0, l = message['addresses'].length; j < l; j++){
                        if(!raionNames.hasOwnProperty(message['addresses'][j].district)){
                            raionNames[message['addresses'][j].district] = {};
                        }
                        if(!!message['addresses'][j].raionName === true && !!message['addresses'][j].district === true){

                            if(!raionNames[message['addresses'][j].district].hasOwnProperty(message['addresses'][j].street)){

                                raionNames[message['addresses'][j].district][message['addresses'][j].street] = [];
                            }

                            if(!raionNames[message['addresses'][j].district][message['addresses'][j].street].includes(message['addresses'][j].raionName)){

                                raionNames[message['addresses'][j].district][message['addresses'][j].street].push(message['addresses'][j].raionName);
                            }
                        }

                        if(!similar.includes(message['addresses'][j].street + message['addresses'][j].district)){
                            similar.push(message['addresses'][j].street + message['addresses'][j].district);

                            if(raionNames.hasOwnProperty(message['addresses'][j].district) && raionNames[message['addresses'][j].district].hasOwnProperty(message['addresses'][j].street)){

                                message['addresses'][j].raionNames = raionNames[message['addresses'][j].district][message['addresses'][j].street];

                            }
                            addresses.push(message['addresses'][j]);
                        }
                    }
                    // storage.address.streets = message.addresses;
                    storage.address.streets = addresses;

                    addresses = similar = raionNames = null;


                    $rootScope.$apply();

                });
                //Событие для регистрации каждой буквы, которую ввел пользователь в поле объекта
                $rootScope.$watch(function(){
                        return vm.objSearch;
                    },
                    function(newVal){
                        if(newVal && newVal.length > 2){
                            ws.$emit("findTypedObject", newVal);
                            // console.log('newVal >', newVal);
                        }
                    });
                ws.$on('findTypedObject', function(message){
                    storage.address.objectsSearch = message;

                    $rootScope.$apply();
                });
                vm.onSelectStreet = function($item, $model, $label){
                    ws.$emit("findHouses", $item);
                };
                ws.$on('findHouses', function(message){
                    storage.address.houses = message;
                    $rootScope.$apply();
                });
                //Выбор дома из ui-list
                vm.onSelectHouse = function(firePlace, $model, $label){
                    vm.searchHouseOnMap(firePlace);
                };
                //Выбор объекта из ui-typehead
                vm.onSelectObject = function(firePlace, $model, $label){
                    vm.searchHouseOnMap(firePlace);
                };
                vm.searchHouseOnMap = function(firePlace){
                    vm.tempLayer.getSource().clear();
                    var point = new ol.geom.Point(ol.proj.transform([firePlace.geomX, firePlace.geomY], 'EPSG:4326', 'EPSG:3857'));
                    var feature = new ol.Feature({
                        geometry: point,
                        firePlace: firePlace
                    });
                    feature.setStyle(vm.tempoStyle);
                    vm.tempLayer.getSource().addFeature(feature);
                    vm.map.getView().setCenter(feature.getGeometry().getCoordinates());
                    vm.map.getView().setZoom(6);
                };
                vm.clearSearches = function(item){
                    vm.tempLayer.getSource().clear();
                    vm.streetSearch = '';
                    vm.houseSearch = '';
                    vm.objSearch = '';
                    storage.address = {
                        streets: null,
                        houses: null,
                        objects: null,
                        objectsSearch: null,
                        firePlace: null
                    }
                };
            };


            vm.formatObj = function(model){
                if(!!model === true){
                    return model.fireObject.nameobject + ' ' + model.street + ' ' + model.house;
                }
                return '';
            };


            vm.chosenPointPosition = null;
            vm.choosePosPoint = function(way){
                vm.chosenPointPosition = way;
            };

            ws.$on('zipped', function(zipMessage){

                // console.log('zipMessage', gzip.fromGzip(zipMessage));
                const message = gzip.fromGzip(zipMessage);
                // const message = zipMessage;
                // console.log('zipMessage', message);
                // console.log('spamToInvolved >', message);
                // console.log('ws >', ws);

                if(message !== undefined && ws !== undefined){
                    if(!!ShowZippedEmitsInConsole === true){
                        console.log('%c%s', 'color: indianred;', '┌──────────────────────────────┤ zipped ▼ ├─────────────────────────────┐');

                    }
                    for(var i in message){
                        if(message.hasOwnProperty(i) && ws.$$eventMap.hasOwnProperty(i)){
                            for(var j = 0; j < ws.$$eventMap[i].length; j++){
                                ws.$$eventMap[i][j](message[i]);

                            }
                        }
                        console.log('%c%s', 'color: indianred;', ((ws.$$eventMap.hasOwnProperty(i))? '├─ ƒ ─•' : '├─ ? ─•'), i, '', message[i]);
                    }
                    if(!!ShowZippedEmitsInConsole === true){
                        console.log('%c%s', 'color: indianred;', '└───────────────────────────────────────────────────────────────────────┘');
                        console.log('');
                    }
                }


            });


            ws.$on('$message', function(evt){
                /*
                 if(evt.hasOwnProperty('emitId')){
                 ws.$emit('confirmEmit', evt.emitId);
                 }
                 */

                // console.log('%c%s', 'color: indianred;', '◄ $emit: ', evt);
                /*
                 if(evt.event !== undefined){
                 console.log('< $emit: ', evt.event);
                 }
                 */
            });
            // console.log('Storage >>> ', storage);


        }
        else {
            $window.location.href = loginUrl;
        }

    }

})();


