(function(){
    'use strict';
    angular
        .module('app', [
            'ui.bootstrap.datetimepicker',
            'ui.bootstrap',
            'ui.router',
            'ngSanitize',
            'ui.select',
            'angular-growl',
            'draganddrop',
            'ngWebsocket',
            'ngCookies',
            'ngTable',
            'app.archive',
            'app.LoginPageCtrl',
            'app.fires',
            'app.commands',
            'app.firebase',
            'app.ParkingCtrl',
            'app.footer',
            'app.chooseTech',
            'app.chooseTech.bydept',
            'app.chooseTech.byState',
            'app.chooseTech.bytypes',


            'app.newFireCard',


            // 'app.order',
            // 'app.newFireOrder',
            // 'app.orderEdit',
            'app.card112',
            'app.protocol',
            'app.docs',
            'app.forma',
            'app.formaedit',
            'cfp.hotkeys',
            'app.ChangePassPageCtrl',
            'app.DocCommand',
            'daterangepicker',
            'app.Bridges',
            'configfile',
            'app.FormaProtocolCtrl',


            'app.deptsNotes',
            'app.deptsNotes.bydept',





            /*

             'app.deptsNote',
             'app.deptsNote.bydept',
             'app.deptsNote.garrison',
             'app.deptsNote.asoGarrison',
             'app.deptsNote.protocol',
             'app.deptsNote.headCaraul',

             */




            'ui.grid',
            'ui.grid.pinning',
            'ui.grid.selection',
            'ui.grid.cellNav',
            'ui.grid.resizeColumns',
            'ui.grid.autoResize',

            'myTemplates',

            'app.ArchiveCommand',
            'app.FormsFilterCommand',
            'app.chooseTech.engineStatesHistory',
            'app.fireCards',
            'modals',
            'ngFileSaver',
            'ngFileUpload',
            'app.opo',
            'app.hydrants',
            'ui.tree',
            // 'LocalForageModule',

            'app.admin',
            'app.admin.base',
            'app.adminCommands',



            'app.reqc'



        ])
        .constant("clientVersion", "1")
        .value("storage", {
            loginUser: {
                user: '',
                password: ''
            },
            fireUser: {
                role: ''
            },
            isRoot: false,
            hideLoadingOverlay: true,
            selectedFire: undefined,
            activeFires: [],
            regions: [],
            listOfLocks: [],
            listLocksObj: {},
            lockedCard112: {},
            distanceToDeptsFromFires: [],
            cards112: [],
            fireDepartments: [],
            operationalMessages: [],
            fireNotifications: [],
            globalSettings: null,
            bridges: [],
            statuses: [],
            states: [],
            rangs: [],
            incidentTypes: [],
            firerankModificators: [],
            enginesByTypes: [],
            enginesAdvise: [],
            docs: [],
            forma6: undefined,
            forma6Solutions: undefined,
            dispForms6: undefined,
            archFireActs: [],
            fireEngineTypes: [],
            firerankTypes: [],
            incidentSources: [],
            notesProtocol: [],
            subDistricts: [],
            headCarauls: [],
            districts: [],
            opo: [],
            changeAdressFireGotMessage: false,
            showMessageBoxForSelectedFire: true,
            // parkingWithoutReconnect: false,
            controllers: {
                bytypes: null,
                bydept: null,
                byStatus: null,
                protocol: null,
                forma: null,
                fires: null
            },
            dataOfStates: {
                bydept: {
                    hideEngines: true,
                    deptSelectedByOneClick: new Date().getTime()
                },
                frontNotesArchive: {
                    date: null
                },
                archiveCommand: {
                    activeFire: null,
                    streetsArray: [],
                    housesArray: [],
                    objectsArray: []
                },
                newFireCard: {
                    fireAct: {},
                    settlementArray: [],
                    streetsArray: [],
                    housesArray: [],
                    housesNumbersArray: [],
                    crossesArray: [],
                    tripletsArray: [],
                    pchArray: [],
                    objectsByHouseArray: [],
                    objectsArray: [],
                    canLeave: true,
                    actFromMap: false,
                    mode: 0,
                    audioRecord: {
                        audio: null,
                        callerPhoneNum: null
                    },
                    chsData: {
                        empty: {},
                        filled: {}
                    }
                },
                /*
                 newFireOrder: {
                 fireAct: {},
                 streetsArray: [],
                 housesArray: [],
                 crossesArray: [],
                 tripletsArray: [],
                 objectsByHouseArray: [],
                 objectsArray: [],
                 canLeave: true,
                 actFromMap: false,
                 mode: 0
                 },
                 editFireOrder: {
                 canLeave: true,
                 mode: '',
                 rank: null,
                 place: null,
                 increase: false,
                 potentialEngines: [],
                 notFoundOrders: [],
                 totalOrders: [],
                 hasPredefinedListOfEngines: false
                 },
                 */
                selectedF6protocol: null,
                fires: {
                    showMessageBox: false
                },
                card112: {
                    selectedCard112: null
                },
                command: {
                    arriveCounter: 0,
                    onFireCounter: 0,
                    showRankInputs: false
                },
                order: {
                    orderMode: 'tech'
                },
                docs: {
                    listOfDocTypes: [],
                    typeDoc: {}
                },
                notesProtocol: {//перезаписываю на входе в протокол
                    activeDept: null,
                    datePicker: null,
                    activeUser: null,
                    userList: []
                },
                formaedit: {},
                fireCards: [],
                fireCardsGridControl: {
                    selectedRow: null,
                    scroll: {
                        x: 0,
                        y: 0
                    }
                },
                forma: {
                    formaViewOnly: false
                },
                f6EditsList: [],
                engineStatesHistory: {
                    log: []
                }
            },
            manualInputValue: '**РУЧНОЙ ВВОД**'/*,
             incomingCall: {
             callerPhoneNum: 88888
             }*/,
            form6Filters: {},
            stateKeeper: {
                oldState: null,
                newState: null
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
                initDispApp: false,
                mapWindow: null,
                dates: [],
                dropChecked: false,
                serversForConnection: [],
                currentConnection: null
            },
            lastBuildDate: {
                clientBuild: null,
                serverBuild: null,
                date: null,
                visible: false

            },
            reports: {
                'ArrivedF6Coded': {
                    name: 'Форма 6',
                    fields: 'Parameter1'
                },
                'FireLogArchive': {
                    name: 'Протокол',
                    fields: 'Parameter1'
                },
                'info_chs': {
                    name: 'Сведения о ЧС',
                    short_name: 'ЧС',
                    fields: {
                        DATE_START: 'За дату',
                        EXECUTOR: 'ФИО'
                    }
                },
                'info_dtp': {
                    name: 'Сведения о ДТП',
                    short_name: 'ДТП',
                    fields: {
                        DATE_START: 'За дату'
                    }
                },
                'burning_grass': {
                    name: 'Трава',
                    short_name: 'Трава',
                    fields: {
                        DATE_START: 'За дату'
                    }
                },
                'multiselect_ASR': {
                    name: 'АСР',
                    short_name: 'АСР',
                    fields: {
                        MODAL: 'ASRReports'
                    }
                },
                'dtp_list_people': {
                    name: 'Люди',
                    short_name: 'Люди',
                    fields: {
                        DATE_START: 'За дату'
                    }
                },
                'fir_10': {
                    name: 'Сведения о пожарах',
                    short_name: 'FIRE',
                    fields: {
                        DATE_START: 'За дату'
                    }
                },
                'GPS_10_10': {
                    name: 'GPS',
                    short_name: 'GPS',
                    fields: {
                        DATE_START: 'За дату',
                        USER_NAME: 'Исполнитель',
                        USER_PHONE: 'Телефон'
                    }
                },
                'signalTrips': {
                    name: 'Выезды по сигналам',
                    short_name: 'Сигналы',
                    fields: {
                        DATE_START: 'За дату'
                    }
                },
                'info_ignition': {
                    name: 'Загорания',
                    short_name: 'Загорания',
                    fields: {
                        DATE_START: 'За дату',
                        POST: 'Должность',
                        EXECUTOR: 'ФИО'
                    }
                },
                'info_tech_regul': {
                    name: 'Технический регламент',
                    short_name: 'Тех регламент',
                    fields: {
                        DATE_START: 'За дату'
                    }
                },
                'info_dtp_svod': {
                    name: 'Сводные по ДТП',
                    short_name: 'Сводные по ДТП',
                    fields: {
                        DATE_START: 'За дату',
                        POST: 'Должность',
                        EXECUTOR: 'ФИО'
                    }
                },
                'fire_chs': {
                    name: 'Пожар',
                    short_name: 'Печать отчета Пожар',
                    fields: {
                        DATE_START: 'За дату',
                        EXECUTOR: 'ФИО'
                    }
                },
                '1chs': {
                    name: 'Печать отчета 1/ЧС',
                    short_name: 'Печать отчета 1/ЧС',
                    fields: {
                        DATE_START: 'За дату',
                        EXECUTOR: 'ФИО'
                    }
                },
                '2chs': {
                    name: 'Печать отчета 2/ЧС',
                    short_name: 'Печать отчета 2/ЧС',
                    fields: {
                        DATE_START: 'За дату',
                        EXECUTOR: 'ФИО'
                    }
                },
                '3chs': {
                    name: 'Печать отчета 3/ЧС',
                    short_name: 'Печать отчета 3/ЧС',
                    fields: {
                        DATE_START: 'За дату',
                        EXECUTOR: 'ФИО'
                    }
                },
                '4chs': {
                    name: 'Печать отчета 4/ЧС',
                    short_name: 'Печать отчета 4/ЧС',
                    fields: {
                        DATE_START: 'За дату',
                        EXECUTOR: 'ФИО'
                    }
                },
                'analitics_reference': {
                    name: 'Аналитическая справка',
                    short_name: 'Аналитическая справка',
                    key_name: 'analitics_reference',
                    fields: {
                        MODAL: "period"
                    }
                },
                'emergency_district': {
                    name: 'ЧС по регионам',
                    short_name: 'ЧС по регионам',
                    key_name: 'emergency_district',
                    fields: {
                        MODAL: "period"
                    }
                },
                'emergency_type': {
                    name: 'ЧС по категориям',
                    short_name: 'ЧС по категориям',
                    key_name: 'emergency_type',
                    fields: {
                        MODAL: "period"
                    }
                },
                'emergency_monitor': {
                    name: 'Мониторинг ЧС',
                    short_name: 'Мониторинг ЧС',
                    key_name: 'emergency_monitor',
                    fields: {
                        MODAL: "period"
                    }
                },
                'compare_table': {
                    name: 'Сравнительная таблица',
                    short_name: 'Сравнительная таблица',
                    key_name: 'compare_table',
                    fields: {
                        MODAL: "period"
                    }
                },
                'compare_type': {
                    name: 'Сравнение по типам',
                    short_name: 'Сравнение тип',
                    key_name: 'compare_type',
                    fields: {
                        MODAL: "period"
                    }
                },
                'details_short': {
                    name: 'Краткий детализированный отчет',
                    short_name: 'Краткий детализированный отчет',
                    key_name: 'details_short',
                    fields: {
                        MODAL: "period"
                    }
                },
                'details_full': {
                    name: 'Подробный детализированный отчет',
                    short_name: 'Подробный детализированный отчет',
                    key_name: 'details_full',
                    fields: {
                        MODAL: "period"
                    }
                }


            },
            statReports: {
                'analitics_reference': {
                    name: 'Аналитическая справка',
                    short_name: 'Аналитическая справка',
                    fields: {
                        MODAL: "period"
                    }
                },
                'emergency_district': {
                    name: 'ЧС по регионам',
                    short_name: 'ЧС по регионам',
                    fields: {
                        MODAL: "period"
                    }
                },
                'emergency_type': {
                    name: 'ЧС по категориям',
                    short_name: 'ЧС по категориям',
                    fields: {
                        MODAL: "period"
                    }
                },
                'emergency_monitor': {
                    name: 'Мониторинг ЧС',
                    short_name: 'Мониторинг ЧС',
                    fields: {
                        MODAL: "period"
                    }
                },
                'compare_table': {
                    name: 'Сравнительная таблица',
                    short_name: 'Сравнительная таблица',
                    fields: {
                        MODAL: "period"
                    }
                },
                'compare_type': {
                    name: 'Сравнение по типам',
                    short_name: 'Сравнение тип',
                    fields: {
                        MODAL: "period"
                    }
                },
                'details_short': {
                    name: 'Краткий детализированный отчет',
                    short_name: 'Краткий детализированный отчет',
                    fields: {
                        MODAL: "period"
                    }
                },
                'details_full': {
                    name: 'Подробный детализированный отчет',
                    short_name: 'Подробный детализированный отчет',
                    fields: {
                        MODAL: "period"
                    }
                }
            },
            pages: {
                opo: {
                    activeModel: null,
                    icon: "",
                    iconColor: "#000000"
                }
            },
            clientSettings: {
                blackAndWhiteClient: false,
                oldSelectedDept: '',
                locale: {
                    rus: "Русский"
                },
                transitions: '',
                templateCache: {},
                isCUKS: false,

                periods: {
                    listMonths: [
                        {name: "Январь", indexMonth: 0},
                        {name: "Февраль", indexMonth: 1},
                        {name: "Март", indexMonth: 2},
                        {name: "Апрель", indexMonth: 3},
                        {name: "Май", indexMonth: 4},
                        {name: "Июнь", indexMonth: 5},
                        {name: "Июль", indexMonth: 6},
                        {name: "Август", indexMonth: 7},
                        {name: "Сентябрь", indexMonth: 8},
                        {name: "Октябрь", indexMonth: 9},
                        {name: "Ноябрь", indexMonth: 10},
                        {name: "Декабрь", indexMonth: 11}
                    ],
                    listQuarters: [
                        {name: 'Первый квартал'},
                        {name: 'Второй квартал'},
                        {name: 'Третий квартал'},
                        {name: 'Четвертый квартал'}
                    ],
                    listHalfYear: [
                        {name: 'Первое полугодие'},
                        {name: 'Второе полугодие'}
                    ],
                    listStatus: [
                        {name: 'Угроза ЧС'},
                        {name: 'Чс'}
                    ],
                    includeStatReports: [
                        'analitics_reference', 'emergency_district', 'emergency_type',
                        'emergency_monitor', 'compare_table',
                        'compare_type', 'details_short',
                        'details_full'
                    ],
                }



            },
            dictionary: {},
            action: {},
            triplets: [],
            terra: ''
        })
        .service('ws', ['$websocket', 'WSURL', 'gzip', 'ShowZippedEmitsInConsole', 'storage', '$rootScope', 'WSURLCluster', 'ShowZippedDebug', 'translateMessage', '$state', function($websocket, WSURL, gzip, ShowZippedEmitsInConsole, storage, $rootScope, WSURLCluster, ShowZippedDebug, translateMessage, $state){
            /*
             var webSocket = $websocket.$new({
             url: WSURL,
             lazy: true,
             reconnectInterval: 1
             });
             console.log(webSocket);
             return webSocket;
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
                if(!!ShowZippedEmitsInConsole === true){
                    console.log('%c%s', 'color: forestgreen;', ['┌──────────────────────────────────────────┤ ', name, ' ▲ ', lng, ' bytes'].join(''));
                    console.log('%c%s', 'color: forestgreen;', zipp? '├─ Z ─•' : '├───•', message);
                    console.log('%c%s', 'color: forestgreen;', '└───────────────────────────────────────────────────────────────────────┘');
                    console.log('');
                }


                if(name !== 'init' && name !== 'initDispApp' && name !== 'login'){
                    translateMessage(message, true);
                }

                if(typeof message === 'object' && !!message === true){
                    message.caller = {
                        state: $state.current.name,
                        function: (!!name === true)? name : null
                    }
                }

                // console.log('caller >>>', message);

                if(zipp){
                    message = {
                        data: gzip.toGzip(message),
                        debug: {
                            [name]: message
                        }
                    };
                    if(!!ShowZippedDebug === false){
                        delete(message.debug);
                    }
                }


                oldEmit(name, message);

                /*
                 if(!!message === true && message.hasOwnProperty('ticket')){
                 storage.socketStatus.lastTicket.push({
                 ticket: message.ticket,
                 time: new Date().toLocaleString(),
                 emit: name,
                 from: 'ЦУКС'
                 });
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

        .service('initListLockDoc', ['storage', 'ws', function(storage, ws){
            this.init = function(){
                var form6Doc = [];
                var card112Doc = [];
                var l = storage.activeFires.length;

                for(var i = 0; i < l; i++){
                    if(storage.activeFires[i].fireStatus.code === 8){
                        form6Doc.push(storage.activeFires[i].id + ':forma');
                    }
                }

                if(form6Doc.length){
                    ws.$emit('listLocksObj', form6Doc);
                }
            }

        }])
        .service('accentByEngineState', ['storage', 'ws', function(storage, ws){
            this.init = function(eng){
                var cls = '';
                var engStatusName = (!!eng.fireEngineStatus === true)? eng.fireEngineStatus.name.toLowerCase() : '';
                var engStateName = (!!eng.fireEngineState === true)? eng.fireEngineState.name.toLowerCase() : '';


                if(engStateName == 'вп' || engStateName == 'в расчете' || engStateName == 'пту' || engStateName == 'птп'){
                    cls = 'onDutyTech';
                }
                // } else {

                if(storage.dataOfStates.bydept.hideEngines === true && (engStatusName != 'вп' && engStatusName != 'в расчете' && engStatusName != 'пту' && engStatusName != 'птп') && !engStateName.includes('следует')){
                    cls += ' hide-engine';
                }
                // }
                if(!!eng.locationDeptId === true){
                    cls += ' dislocatedTech';
                }
                // console.log('eng >>>>', engStatusName);
                // console.log('eng >>>>', eng.gosNo, eng.fireEngineStatus.name, eng.fireEngineState.name, engStatusName, cls);

                return cls;
            };
            this.showHideEngines = function(){
                storage.dataOfStates.bydept.hideEngines = !storage.dataOfStates.bydept.hideEngines;
            };

        }])
        .service('showEngineHistory', ['storage', 'ws', '$state', function(storage, ws, $state){
            this.init = function(eng){
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
            }

        }])

        .service('printRequest', ['$window', 'PRINTURL', function($window, PRINTURL){
            this.init = function(req){

                function openNewWindow(){
                    newWin.document.querySelector('#report-frame').src = url;
                };


                if(req instanceof Object && req.hasOwnProperty('reportName')){

                    var url = PRINTURL + req.reportName + '.html?' + req.request + '&j_username=jasperadmin&j_password=jasperadmin';

                    // console.log('>>>', url);


                    /*
                     console.log(req);
                     console.log(url);
                     */

                    var newWin = $window.open(
                        './sources/print/print.html',
                        '_blank',
                        'menubar=no, ,height=' + $window.screen.availHeight + ',width=' + $window.screen.availWidth + ', location=no, status=no, left=0px, top=0px'
                    );

                    newWin.addEventListener("DOMContentLoaded", openNewWindow);

                }
            };
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
                    }
                } else {
                    reconnect = true;
                }

                if(storage.socketStatus.serversForConnection.length === 0){
                    storage.socketStatus.serversForConnection = WSURLCluster;
                }

                if(reconnect){
                    var srvIp = storage.socketStatus.serversForConnection.shift();
                    storage.socketStatus.currentConnection = srvIp;
                    ws.$close();
                    ws.$$config.url = 'ws://' + srvIp + WSURLPrefix;
                    ws.$open();
                    storage.socketStatus.serversForConnection.push(srvIp);
                    console.log('Attempt to connect with: ', ws.$$config.url);
                }
            };
        }])

        .service('invertLocale', ['storage', function(storage){
            this.invert = function(){

                //TODO: Функция для переворота словарей русского и текущей локали, для последующей отправки чего либо на сервер на русском

                if(!!storage.dictionary.dictData === true){
                    // console.log('------------------------------------------', storage.clientSettings.locale);
                    var l = storage.dictionary.dictData.length;
                    var selLoc = Object.keys(storage.clientSettings.locale)[0];


                    /*

                     // версия переворота словарей для dictClient

                     // storage.dictionary.localeDictData = Object.assign({}, storage.dictionary.dictClient);

                     storage.dictionary.localeDictData = {
                     rus: {},
                     [selLoc]: {}
                     };

                     for(var i in storage.dictionary.dictClient){
                     if(storage.dictionary.dictClient.hasOwnProperty(i)){


                     storage.dictionary.localeDictData.rus[storage.dictionary.dictClient[i].rus.toUpperCase()] = {
                     [selLoc]: storage.dictionary.dictClient[i][selLoc]
                     };
                     storage.dictionary.localeDictData[selLoc][storage.dictionary.dictClient[i][selLoc].toUpperCase()] = {
                     rus: storage.dictionary.dictClient[i].rus
                     }
                     }
                     }
                     */


                    // версия переворота словарей для dictData


                    storage.dictionary.localeDictData = {
                        rus: {},
                        [selLoc]: {}
                    };


                    for(var i = 0; i < l; i++){
                        storage.dictionary.localeDictData.rus[storage.dictionary.dictData[i].rus.toUpperCase()] = {
                            // rus: storage.dictionary.dictData[i].rus,
                            [selLoc]: storage.dictionary.dictData[i][selLoc]
                        };
                        storage.dictionary.localeDictData[selLoc][storage.dictionary.dictData[i][selLoc].toUpperCase()] = {
                            rus: storage.dictionary.dictData[i].rus
                            // ,[selLoc]: storage.dictionary.dictData[i][selLoc]
                        };
                    }


                    // console.log('storage.dictionary.localeDictData', storage.dictionary.localeDictData);
                }
            }
            ;
        }
        ])

        .run(['$rootScope', 'ws', '$location', '$log', '$cookies', '$state',
            '$stateParams', 'storage', 'growl', '$window',
            'hotkeys', '$timeout', 'changeNewMessagesExistenceFlag', 'globalSelectFire', 'initListLockDoc', '$interval', '$uibModal', '$http', 'logoutUserFromSystem', 'ReloadLoginPage', 'gzip', 'ShowZippedEmitsInConsole', 'ShowSentTicket', 'WSURLCluster', 'switchSocketServer', 'translateMessage', 'invertLocale', 'getWord', '$transitions', '$templateCache', 'getRole'
            , function($rootScope, ws, $location, $log, $cookies, $state, $stateParams, storage, growl, $window, hotkeys, $timeout, changeNewMessagesExistenceFlag, globalSelectFire, initListLockDoc, $interval, $uibModal, $http, logoutUserFromSystem, ReloadLoginPage, gzip, ShowZippedEmitsInConsole, ShowSentTicket, WSURLCluster, switchSocketServer, translateMessage, invertLocale, getWord, $transitions, $templateCache, getRole){

                storage.dispForms6 = [];
                // console.clear();

                if(!!chsData === true){
                    storage.dataOfStates.newFireCard.chsData.empty = Object.assign({}, chsData);
                    chsData = null;
                }


                var emitAllInit = function(){
                    // var emitAllInit = function(ticket){
                    storage.hideLoadingOverlay = false;
                    ws.$emit('initDispApp', {send: true});
                    // ws.$emit('initDispApp', {ticket: ticket});
                    // ws.$emit('initDispApp', ticket);
                    // ws.$emit('getBridges');
                };

                var pingSocket = $interval(
                    function(){
                        ws.$emit('ping', new Date().getTime());
                    }
                    , 60000);
                // , 600000);


                function focusOnCommandButton(){
                    var comButton = document.querySelector('#command-select-button');
                    if(!!comButton === true){
                        comButton
                        var uiSelect = angular.element(comButton).controller('uiSelect');
                        uiSelect.activate();
                        // console.log('comButton >>>', comButton);
                    } else {
                        // console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++');
                    }
                };

//----------------------------------------------------------------- < localStorage


                /*
                 var localStorage = $window.localStorage,
                 baseName = "CUKS",
                 LSData;
                 // if(!localStorage.getItem(baseName)){
                 localStorage.setItem(baseName, JSON.stringify([]));
                 // }
                 */
//-----------------------------------------------------------------


                ws.$on('servers', function(message){
                    if(!!message === true){
                        // storage.socketStatus.serversForConnection = message.alive;
                        switchSocketServer.init(message);
                    }
                });


                ws.$on('selectFire', function(message){

                    /*
                     if(!!$state.current.$$state('fires.newFireCard') === true){


                     storage.dataOfStates.newFireCard.fireAct = Object.assign({}, message.fireAct);
                     storage.controllers.newFireCard.renewFireAct(message.fireAct);
                     }
                     */


                    if(message !== undefined && !!message === true){

                        /*

                         console.log('storage.controllers.newFireCard >>>>>>>>>>>>>>>>>>>', storage.controllers.newFireCard.fireAct.id, message.fireAct.id);

                         if($state.is('fires.newFireCard')){
                         storage.dataOfStates.newFireCard.fireAct = Object.assign({}, message.fireAct);
                         storage.selectedFire = Object.assign({}, message.fireAct);
                         }
                         if(!!storage.controllers.newFireCard === true){
                         if(message.fireAct.id === storage.controllers.newFireCard.fireAct.id){
                         storage.controllers.newFireCard.renewFireAct(message.fireAct);
                         }
                         }

                         */
                        if(!!storage.controllers.command === true && storage.controllers.command.hasOwnProperty('tempModsList') && !!storage.selectedFire === true && storage.selectedFire.hasOwnProperty('manualyAssignedModificators')){

                            storage.controllers.command.tempModsList = storage.selectedFire.manualyAssignedModificators;

                        }

                        if(!!storage.controllers.newFireCard === true){
                            storage.activeFires.find(function(fire){

                                if(fire.id === message){
                                    storage.controllers.newFireCard.fireAct = Object.assign({}, fire);
                                    storage.controllers.newFireCard.renewFireAct(fire);
                                    storage.selectedFire = Object.assign({}, fire);
                                }

                            });
                        }
                    }
                    $scope.$apply();

                });


                ws.$on('$open', function(){

                    console.log('WebSocket connected to: ', ws.$$config.url);

                    // $log.debug("WS OPEN!");
                    // storage.socketStatus.isReconnecting = false;
                    // if(!!sendLogin === false){
                    //     sendLogin = true;
                    //     var ticket = $cookies.get('ticket');
                    // if(angular.isDefined(ticket)){
                    /*
                     ws.$emit('login', {
                     ticket: ticket,
                     locale: 'uzb',
                     socketId: storage.socketStatus.socketId,
                     user: storage.hasOwnProperty('fireUser') ? storage.fireUser.uid : null,
                     password: storage.hasOwnProperty('fireUser') ? storage.fireUser.pwd : null,
                     from: 'openCUKS'
                     });
                     */
                    /*
                     } else {
                     $state.go('login');
                     }
                     } else {
                     sendLogin = false;
                     }
                     */
                    // storage.parkingWithoutReconnect = false;

                    /*
                     var ticket = $cookies.get('ticket');
                     if(angular.isDefined(ticket)){
                     ws.$emit('initFireUser', ticket);
                     } else {
                     // $state.go('login');
                     }
                     */

                });


                ws.$on('$close', function(){
                    console.log('WebSocket state: ', storage.socketStatus.description[ws.$status()]);
                    // $log.debug("WS CLOSED!");
                    // storage.socketStatus.isReconnecting = true;
                    // ws.$close();
                    // ws.$open();

// TODO: Разкомментировать все строки для Билда. Отвечает за выход из АРМА

                    /*
                     $cookies.remove("ticket");
                     storage.loginUser = null;
                     if(storage.parkingWithoutReconnect){
                     $state.go("parking");
                     }
                     else {
                     $state.go("reconnect");
                     }
                     */

                });
                ws.$on('$error', function(error){
                    /* TODO разобраться */
                    // storage.socketStatus.isReconnecting = false; // true
                    switchSocketServer.init();
                    if(!!storage.socketStatus.dropChecked === false){
                        storage.socketStatus.dates.push(Date.now());
                        storage.socketStatus.dropChecked = true;
                    }

                    /*
                     if(storage.socketStatus.crashTime == null){
                     storage.socketStatus.crashTime = new Date();

                     storage.socketStatus.timer = $timeout(function(){
                     console.log('>>> Timed out the connection to the server');
                     /!*
                     storage.socketStatus.isReconnecting = false;
                     $cookies.remove("ticket");
                     storage.loginUser = true;
                     $state.go('login');
                     *!/
                     /!* TODO разобраться *!/
                     //logoutUserFromSystem();

                     }, 1000 * 60 * 5);

                     }
                     */
                    // console.error(error);

                    // growl.warning("ошибка вебсокета");
                });

                ws.$on('$message', function(evt){
                    // console.log('$message >', evt);
                    /*
                     if(evt.hasOwnProperty('emitId')){
                     ws.$emit('confirmEmit', evt.emitId);
                     }
                     */

                    /*
                     LSData = JSON.parse(localStorage.getItem(baseName));
                     LSData.push({
                     time: new Date(),
                     name: evt.event
                     });
                     localStorage.setItem(baseName, JSON.stringify(LSData));
                     */

                });


                ws.$on('login', function(message){
                    /*
                     var ticket = $cookies.get('ticket');


                     if(angular.isDefined(ticket)){

                     console.log('Login after socket crush');
                     console.log('Is reconnecting: ', storage.socketStatus.isReconnecting);

                     */

                    /*
                     if(!!storage.socketStatus.isReconnecting === false){
                     console.log('logoutUserFromSystem <<<');
                     logoutUserFromSystem();
                     ws.$open();
                     return false;
                     }
                     */

                    storage.socketStatus.isReconnecting = false;

                    storage.socketStatus.dropChecked = false;


                    /*
                     if(storage.socketStatus.crashTime != null){
                     var date = new Date();
                     var info = {
                     typeEvent: 'ошибка соединения с сервером',
                     message: ['Oшибка соединения с сервером. ', 'пользователь: ', storage.fireUser.firstName, ' ', storage.fireUser.lastName, ' (', storage.fireUser.uid, '),', ' ip: ', storage.socketStatus.remoteAddress, ', c: ', storage.socke1tStatus.crashTime.toLocaleTimeString(), ' - до: ', date.toLocaleTimeString(), ', продолжительность: ', Math.abs(date.getMilliseconds() - storage.socketStatus.crashTime.getMilliseconds()), 'мс'].join(''),
                     };
                     ws.$emit('userEvent', info);


                     }

                     storage.socketStatus.crashTime = null;
                     $timeout.cancel(storage.socketStatus.timer);
                     ws.$emit('initDispApp', {ticket: ticket});
                     // ws.$emit('initDispApp', ticket);

                     // emitAllInit(ticket);

                     } else {
                     */
                    console.log('Normal Login');

                    if(message.hasOwnProperty('remoteAddress')){
                        storage.socketStatus.remoteAddress = message.remoteAddress;
                    }
                    if(message.hasOwnProperty('socketId')){
                        storage.socketStatus.socketId = message.socketId;
                    }


                    // $cookies.put('ticket', message.ticket);
                    storage.fireUser = message.fireUser;

                    /*
                     if(angular.isDefined(ticket)){
                     ws.$emit('initFireUser', ticket);
                     }
                     */

                    emitAllInit();
                    // emitAllInit(message.ticket);
                    // growl.success("Успешная авторизация");
                    $('.growl-item').children('button.close').click();
                    // $state.go('fires.firesbase');
                    // }


                    // storage.fireUser.role = !!role === true ? role : 'pch';
                    // storage.fireUser.role = ACCESS.hasOwnProperty(message.fireUser.roles[0]) ? message.fireUser.roles[0] : 'pch';
                    var role = getRole(ACCESS, message.fireUser.roles[0].split('.'));





                    storage.fireUser.role = (!!role === true && !!role.isPCH === false)? message.fireUser.roles[0] : 'pch';
                    storage.fireUser.roles = (!!role === true)? message.fireUser.roles : [];
                    // storage.fireUser.roles = ACCESS.hasOwnProperty(storage.fireUser.role) ? message.fireUser.roles : [];
                    // storage.fireUser.role = ACCESS.hasOwnProperty(storage.fireUser.roles[0]) ? storage.fireUser.roles[0] : 'pch';

                    console.log('User role: ', storage.fireUser.role);

                    storage.fireUser.ACCESS = Object.assign(role);
                    role = null;
                    // storage.fireUser.ACCESS = ACCESS[storage.fireUser.role] || null;


                    storage.fireUser.ip = message.remoteAddress;

                    if(!storage.fireUser.ACCESS){

                        logoutUserFromSystem();
                    } else {

                        // console.log('$state > ', storage.fireUser.ACCESS.stateProvider);
                        /*
                         $scope.$on('$viewContentLoaded', function(){
                         $state.go(storage.fireUser.ACCESS.stateProvider);
                         });
                         */
                        // if(!angular.isDefined(ticket)){
                        if(!!storage.socketStatus.initDispApp === false){
                            $state.go(storage.fireUser.ACCESS.stateProvider);
                        }
                        // }
                    }

                    invertLocale.invert();
                    // console.log(getWord('ВП'));
                });

                ws.$on('initFireUser', function(message){
                    // $log.log(message);
                    storage.fireUser = message;
                    /*
                     var ticket = $cookies.get('ticket');
                     emitAllInit(ticket);
                     */
                    emitAllInit();
                    $state.go('fires.firesbase');

                });
                ws.$on('errorLogin', function(msg){
                    growl.error(msg, {
                        ttl: 4000,
                        disableCountDown: false
                    });
                    $rootScope.$apply();
                });
                ws.$on('logout', function(message){
                    // storage.parkingWithoutReconnect = true;
                    ws.$close();
                    storage.loginUser = null;
                    storage.fireUser = storage.socketStatus.socketId = null;
                    // $cookies.remove('ticket');
                    growl.warning("Был произведён выход", {
                        ttl: 4000,
                        disableCountDown: false
                    });
                    // $state.go("parking");
                    // $state.go("login");
                    logoutUserFromSystem();
                });
                ws.$on('changePassword', function(message){
                    if(message === 0){
                        growl.success('Пароль успешно изменён', {
                            ttl: 4000,
                            disableCountDown: false
                        });
                        $state.go('fires.firesbase');
                    }
                });
                /*
                 ws.$on('initInvestigatorApp', function(){
                 console.log('initInvestigatorApp > storage: ', storage);
                 storage.hideLoadingOverlay = true;

                 });
                 */


                ws.$on('init', function(message){

                    /*
                     var oldLocaleDictData = (!!storage === true && storage.hasOwnProperty('dictionary') && storage.dictionary.hasOwnProperty('localeDictData'))? Object.assign({}, storage.dictionary.localeDictData) : {};
                     */
                    if(!!message === true){
                        if(message.hasOwnProperty('dictData')){
                            if(!!storage === true){
                                for(var i in message){
                                    if(message.hasOwnProperty(i)){
                                        storage.dictionary[i] = (typeof message[i] === 'string' || message[i] instanceof Array)? message[i] : Object.assign({}, message[i]);
                                    }
                                }

                                /*
                                 storage.dictionary.localeDictData = Object.assign({}, storage.dictionary.oldLocaleDictData);
                                 oldLocaleDictData = null;
                                 */
                            }
                        } else {
                            storage.clientSettings.isCUKS = true;
                        }

                        /*
                         //TODO: Язык по умолчанию от сервера.
                         for(var i in message.langs){
                         if(message.langs.hasOwnProperty(i)){
                         if(i === message.locale){
                         storage.clientSettings.locale = {};
                         storage.clientSettings.locale[i] = message.langs[i];
                         }
                         }
                         };
                         */


                        // storage.clientSettings.locale = message.locale;
                        storage.lastBuildDate.serverBuild = message.versions.cuks;
                    }

                    console.log('dictionary >>>>', storage.dictionary);

                    // if(!!sendLogin === false){
                    //     sendLogin = true;
                    // var ticket = $cookies.get('ticket');
                    // if(angular.isDefined(ticket)){
                    if(storage.socketStatus.dates.length > 0){
                        storage.socketStatus.dates.push(Date.now());
                    }

                    if(!!storage.socketStatus.socketId === true){
                        var loginObj = {
                            // ticket: ticket,
                            // locale: storage.clientSettings.locale[Object.keys(storage.clientSettings.locale)[0]],
                            locale: Object.keys(storage.clientSettings.locale)[0],
                            socketId: storage.socketStatus.socketId,
                            user: storage.hasOwnProperty('fireUser')? storage.fireUser.uid : null,
                            password: storage.hasOwnProperty('fireUser')? storage.fireUser.pwd : null,
                            from: 'cuks',
                            dates: storage.socketStatus.dates,
                            lastBuildDate: storage.lastBuildDate.clientBuild
                        };

                        ws.$emit('login', loginObj);
                    }


                    /*    } else {
                     $state.go('login');
                     }

                     } else {
                     sendLogin = false;
                     }
                     */
                    message = null;
                });


                function setHotKeys(){







                    /*
                     hotkeys.add({
                     combo: 'ctrl+alt',
                     description: 'Новое сообщение',
                     allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                     callback: function(event){
                     if(!$state.is('login')){
                     event.preventDefault();
                     $timeout(function(){
                     //jQuery('#messagebox').focus();
                     $rootScope.$broadcast('cmd_ui_select_focus');
                     }, 30);
                     }
                     }
                     });
                     */
                    /*
                     hotkeys.add({
                     combo: 'ctrl+1',
                     description: 'Заявка',
                     allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                     callback: function(event){
                     if(!$state.is('login')){
                     event.preventDefault();
                     $timeout(function(){
                     if(storage.selectedFire != undefined){
                     $state.go('fires.order', {fireId: storage.selectedFire.id});
                     } else {
                     growl.warning('Нет выбранной заявки', {
                     ttl: 4000,
                     disableCountDown: false
                     });
                     }
                     }, 30);
                     }

                     }
                     });
                     hotkeys.add({
                     combo: 'ctrl+2',
                     description: 'Протокол',
                     allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                     callback: function(event){
                     if(!$state.is('login')){
                     event.preventDefault();
                     $timeout(function(){
                     if(storage.selectedFire != undefined){
                     $state.go('fires.protocol', {fireId: storage.selectedFire.id});
                     } else {
                     growl.warning('Нет выбранной заявки', {
                     ttl: 4000,
                     disableCountDown: false
                     });
                     }
                     }, 30);
                     }
                     }
                     });
                     hotkeys.add({
                     combo: 'ctrl+3',
                     description: 'Форма 6',
                     allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                     callback: function(event){
                     if(!$state.is('login')){
                     event.preventDefault();
                     $timeout(function(){
                     if(storage.selectedFire != undefined){
                     if(storage.selectedFire.isReadyForF6){
                     ws.$emit('getForma6', storage.selectedFire.id);
                     storage.dataOfStates.formaViewOnly = false;
                     } else {
                     growl.warning('Работы по заявке еще не окончены', {
                     ttl: 4000,
                     disableCountDown: false
                     });
                     }
                     } else {
                     growl.warning('Нет выбранной заявки', {
                     ttl: 4000,
                     disableCountDown: false
                     });
                     }
                     }, 30);
                     }
                     }
                     });
                     */


                    /*
                     hotkeys.add({
                     combo: 'esc',
                     description: 'Назад',
                     allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                     callback: function(event){
                     if(!$state.is('login')){
                     event.preventDefault();
                     window.history.back();
                     }
                     }
                     });
                     */
                    hotkeys.add({
                        combo: 'f1',
                        description: 'Пожары',
                        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                        callback: function(event){
                            if(!$state.is('login')){
                                event.preventDefault();
                                $state.go('fires.firesbase');
                            }
                        }
                    });


                    if(storage.fireUser.ACCESS.mainMenu.newApplication){
                        hotkeys.add({
                            combo: 'f2',
                            description: 'Новая заявка',
                            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                            callback: function(event){
                                // console.log('$stateParams >', $stateParams);
                                if(!$state.is('login')){
                                    event.preventDefault();
                                    $state.go('fires.newFireCard', {
                                        deptId: undefined,
                                        fireId: undefined,
                                        fireType: 'new',
                                        calledFrom: undefined
                                    });
                                }
                            }
                        });
                    }


                    if(storage.fireUser.ACCESS.mainMenu.technique){
                        hotkeys.add({
                            combo: 'f3',
                            description: 'Пожарные части',
                            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                            callback: function(event){
                                if(!$state.is('login')){
                                    event.preventDefault();
                                    $state.go('fires.chooseTech.bydept');
                                }
                            }
                        });
                    }


                    hotkeys.add({
                        combo: 'f4',
                        description: 'Документы',
                        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                        callback: function(event){

                            focusOnCommandButton();
                            /*
                             if(!$state.is('login')){
                             event.preventDefault();
                             $state.go('fires.docs');
                             }
                             */
                        }
                    });
                    hotkeys.add({
                        combo: 'f5',
                        description: 'Обновление страницы',
                        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                        callback: function(event){
                            event.preventDefault();
                            /*
                             storage.socketStatus.isReconnecting = false;
                             $cookies.remove("ticket");
                             storage.loginUser = true;
                             $state.go('login');
                             */
                        }
                    });
                    hotkeys.add({
                        combo: 'f6',
                        description: 'Форма 6',
                        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                        callback: function(event){
                            if(!$state.is('login') && !!storage.selectedFire === true){
                                event.preventDefault();
                                ws.$emit('getForma6', storage.selectedFire.id);
                                storage.dataOfStates.formaViewOnly = false;
                            }
                        }
                    });
                    /*
                     hotkeys.add({
                     combo: 'f6',
                     description: 'Архив',
                     allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                     callback: function(event){
                     if(!$state.is('login')){
                     event.preventDefault();
                     $state.go('fires.archive');
                     }
                     }
                     });
                     */
                    /*
                     hotkeys.add({
                     combo: 'f7',
                     description: 'Редактирование Ф6',
                     allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                     callback: function(event){
                     if(!$state.is('login')){
                     event.preventDefault();
                     $state.go('fires.formaedit');
                     }
                     }
                     });
                     */






                    /*
                     hotkeys.add({
                     combo: 'f8',
                     description: 'Строевые записки',
                     allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                     callback: function(event){
                     if(!$state.is('login')){
                     event.preventDefault();
                     $state.go('fires.deptsNote.bydept');
                     }
                     }
                     });
                     */

                    hotkeys.add({
                        combo: 'f8',
                        description: 'Строевые записки',
                        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                        callback: function(event){
                            if(!$state.is('login')){
                                event.preventDefault();
                                $state.go('fires.deptsNotes.bydept');
                            }
                        }
                    });





                    hotkeys.add({
                        combo: 'f9',
                        description: 'Заявка',
                        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                        callback: function(event){
                            if(!$state.is('login')){
                                event.preventDefault();
                                // console.log(' >>>', $state.params, storage.selectedFire);
                                if(storage.selectedFire){
                                    //if(!!$state.params.fireType === false &&
                                    // $state.go('fires.newFireCard');
                                    $state.go('fires.newFireCard', {
                                        deptId: undefined,
                                        calledFrom: 'newFireCard',
                                        fireId: storage.selectedFire.id
                                    }, {reload: true});
                                    /*
                                     if(storage.selectedFire.firePlace.region.code !== 1141){
                                     $state.go('fires.order', {calledFrom: 'firesbase'});
                                     } else if(storage.selectedFire.firePlace.region.code === 1141){
                                     $state.go('fires.newFireOrder', {calledFrom: 'firesbase', fireType: 3});
                                     }
                                     */
                                }
                            }
                        }
                    });
                    hotkeys.add({
                        combo: 'f10',
                        description: 'Протокол',
                        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                        callback: function(event){
                            if(!$state.is('login')){
                                event.preventDefault();
                                if(storage.selectedFire){
                                    $state.go('fires.newFireCard', {
                                        calledFrom: 'protocol',
                                        fireId: storage.selectedFire.id
                                    }, {reload: true});
                                    // $state.go('fires.protocol', {calledFrom: 'firesbase'});
                                }
                            }
                        }
                    });


                };


                ws.$on('initDispApp', function(message){
                        // ws.$on('initDispApp', function(zipMessage){
                        // const message = gzip.fromGzip(zipMessage);

                        // console.log('zipMessage for Storage >>> ', message);

                        // var wrapper = {};
                        // angular.copy(((!storage.socketStatus.isReconnecting) ? storage : {}), wrapper);

                        // angular.copy(wrapper, ((!storage.socketStatus.isReconnecting) ? storage : {}));


// TODO: сделано для вылавливания кривых пожаров
                        /*
                         console.log('array ' + message.fires.length +  '------------------------------->>>>', message.fires);
                         var badFires = message.fires.splice(0, 3);


                         badFires.forEach(function(fire){
                         fire.card112WithBean = null;
                         fire.startDate = null;
                         fire.isReadyForF6 = true; // <<<<<<<< Больное место, падает сортировка пажаров
                         });
                         console.log('badFires >>>', badFires);
                         message.fires = message.fires.concat(badFires);


                         console.log('array ' + message.fires.length +  '------------------------------->>>>', message.fires);
                         */

                        /*













                         */

                        //TODO: Вызов функции для перевода storage
                        translateMessage(message);

                        /*











                         */
                        storage.socketStatus.initDispApp = true;

                        storage.distanceToDeptsFromFires = message.buffDistances;
                        storage.activeFires = message.fires;
                        storage.cards112 = message.incoming112s;
                        storage.fireDepartments = message.depts;
                        storage.statuses = message.fireEngineStatuses;
                        storage.states = message.fireEngineStates;
                        storage.rangs = message.fireRanksStatuses;
                        storage.incidentTypes = message.incidentTypes;
                        storage.fireEngineTypes = message.fireEngineTypes;
                        storage.firerankModificators = message.firerankModificators;
                        storage.firerankTypes = message.firerankTypes;
                        storage.enginesByTypes = message.enginesByTypes;
                        storage.fireNotifications = message.fireNotifications;
                        storage.globalSettings = message.globalSettings;
                        storage.hideLoadingOverlay = true;
                        storage.incidentSources = message.incidentSources;
                        storage.regions = message.regions;
                        storage.headCarauls = message.headCarauls;
                        storage.districts = message.raions;
                        // storage.districts = message.districts;
                        storage.opo = message.opos;
                        storage.temporaryFireDepartmentsArchive = [];
                        storage.eqTypeDictItems = message.eqTypeDictItems;
                        storage.triplets = message.triplets;
                        storage.chsDict = {
                            chsScales: message.chsScales,
                            chsTypes: message.chsTypes,
                            chsStatuses: message.chsStatuses,
                            ranksList: message.ranksList,
                            occupList: message.occupList

                        };
                        storage.terra = message.terra;

                        /*
                         storage.ranksList = {
                         ranksList: message.ranksList,
                         occupList: message.occupList
                         };
                         */


                        angular.merge(storage.bridges, message.bridges);

                        // console.log('------------------------------->>>>', message);
                        // console.log('------------------------------>', translateMessage('ВП'));


                        /*
                         console.log('>>>> merge storage start');
                         // angular.merge(storage, wrapper);
                         storage = angular.extend(storage, wrapper);
                         console.log('<<<< merge storage end');
                         */

                        // if(!storage.socketStatus.isReconnecting){
                        // }
                        // wrapper = null;


                        /*
                         for(var i = 0, l = storage.fireDepartments.length; i < l; i++){

                         console.log(storage.fireDepartments[i].id);

                         }
                         */


                        // console.log(storage.cards112[0]);
                        // console.log(JSON.stringify(storage.cards112[0]));
                        /*
                         storage.cards112.forEach(function(card, idx){
                         console.log('----------------------------------------------------------', idx);
                         console.log('id >', card.id);
                         console.log('address >', card.fireActTemplate.firePlace.address.street, card.fireActTemplate.firePlace.address.house);
                         console.log('district >', card.fireActTemplate.firePlace.address.district);
                         console.log('raionName >', card.fireActTemplate.firePlace.address.raionName);
                         console.log('----------------------------------------------------------', idx);
                         });
                         */

                        console.log('message.fireUser.roles >', message.fireUser.roles);
                        var role = getRole(ACCESS, message.fireUser.roles[0].split('.'));


                        storage.fireUser.role = (!!role === true && !!role.isPCH === false)? message.fireUser.roles[0] : 'pch';
                        storage.fireUser.roles = (!!role === true)? message.fireUser.roles : [];

                        // storage.fireUser.role = ACCESS.hasOwnProperty(storage.fireUser.roles[0]) ? storage.fireUser.roles[0] : 'pch';

                        if(ACCESS !== undefined){
                            storage.fireUser.ACCESS = role;
                            // storage.fireUser.ACCESS = ACCESS[storage.fireUser.role];
                        }
                        initListLockDoc.init();


                        if(!!storage.controllers.fires === true){
                            $timeout(function(){
                                storage.controllers.fires.setFirstFire()
                            }, 100);
                        }


                        setHotKeys();


                        console.log('Storage >>> ', storage);

                        $rootScope.$apply();
                        /*
                         console.log('>--------');
                         console.log( /(?:\\W|^)(?:АЦ\()([12]{1})(?:\))(?:\\W|$)/i.exec('АЦ(1)'.trim()) );
                         console.log('--------<');
                         */

                        /*                    console.log('>--------');
                         console.log( /(?:\\W|^)([А-Яа-яЁё0-9-]{2,})(?:(?:\()([0-9]{1})(?:\))){0,1}(?:\\W|$)/i.exec('АПК-50(3)') );
                         console.log('--------<');*/


                        /*
                         console.log('>--------');
                         console.log(/(\d+)/ig.exec('13 5 4БИС'));
                         console.log('13 5 4БИС'.match(/(\d+)/ig));
                         console.log('--------<');
                         */

                        /*
                         console.log(     '135 к.2'.match(/^(\d+)./ig));

                         console.log(' ,   121/100'.match(/(?:\b)([0-9]+)(?:\b)/ig));

                         */


                        /*
                         console.log('>--------');
                         console.log(

                         (('     121/100      ').trim().match(/^(^\w[0-9]+)/ig))

                         );

                         console.log('--------<');
                         */


                        /*
                         console.log('  m    135 к.2'.match(/(?:\s)([0-9]+)(?:\b)/ig));

                         console.log(' m     135'.match(/(?:\b)([0-9]+)(?:\b)/ig));
                         */


                    }
                );


                ws.$on('getDepts', function(message){
                    if(!!message === true){
                        if(!!storage.dataOfStates.hasOwnProperty('frontNotesArchive')){
                            storage.dataOfStates.frontNotesArchive.date = null;
                        }
                        storage.fireDepartments = Array.from(message);
                        if($state.is('fires.chooseTech.bydept') && !!storage.controllers.bydept === true && !!storage.controllers.bydept.selectedDept === true){
                            storage.controllers.bydept.getEnginesState(storage.controllers.bydept.selectedDept);
                        }

                        // $state.go('fires.deptsNote.bydept', {deptId: null}, {reload: true});
                    }
                });

                ws.$on('getArchivedDepts', function(message){


                    if(message.hasOwnProperty('id')){

                        // storage.fireDepartmentsArchive = message.fireDepartmentsArchive;

                        if(!storage.dataOfStates.bydept.hasOwnProperty('fireDepartments')){
                            storage.dataOfStates.bydept.fireDepartments = {
                                dept: angular.copy(storage.fireDepartments),
                                date: message.date
                            };
                        }

                        storage.fireDepartments = angular.copy(message.fireDepartmentsArchive);
                        storage.dataOfStates.frontNotesArchive.date = message.date;
                        // storage.temporaryFireDepartmentsArchive = angular.copy(message.fireDepartmentsArchive);
                        // $state.go('fires.deptsNote.bydept', {deptId: null}, {reload: true});
                        $state.go('fires.deptsNotes.bydept', {deptId: null}, {reload: true});
                    } else {
                        growl.error('За указанную дату архив не найден', {
                            ttl: 4000,
                            disableCountDown: false
                        });
                    }


                });

                ws.$on('editFireAct', function(message){
                    // console.log(message);
                    for(var i = 0; i < storage.activeFires.length; i++){
                        if(storage.activeFires[i].id === message.fireActId){
                            /*
                             console.log('>-------------------');
                             console.log(storage.activeFires[i]);
                             */
                            storage.activeFires[i][message.props[0].audio] = message.props[0].value;
                            $rootScope.$apply();
                            /*
                             console.log(storage.activeFires[i][message.props[0].audio]);
                             console.log('-------------------<');
                             */
                        }
                    }
                });

                ws.$on('changeProtocol', function(message){
                    if(!!message === true){
                        if(!!storage.controllers.protocol === true){
                            storage.controllers.protocol.renewTableData(message);
                        }
                        if(!!storage.controllers.newFireCard === true){
                            storage.controllers.newFireCard.renewTableData(message);
                        }
                    }

                    /*
                     if(message && !!storage.controllers.newFireCard === true){
                     storage.controllers.newFireCard.renewTableData(message);
                     }
                     */
                    $rootScope.$apply();
                });

                /*                ws.$on('setFireEngineStatus', function(message){

                 if(message){
                 console.log('->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                 console.log(message);
                 console.log(storage);
                 // storage.controllers.protocol.renewTableData(message);
                 $rootScope.$apply();
                 }

                 });*/


                /*
                 removeEngineFromFire
                 ws.$on('changeStatus', function(message){
                 $rootScope.$apply();

                 });
                 */

                //Depts
                ws.$on('changeStatus', function(message){
                    if(Array.isArray(message)){
                        _.map(message, function(change){
                            var newStatus = change;
                            var dept = _.find(storage.fireDepartments, function(dept){
                                return dept.id == newStatus.deptId
                            });
                            var engine = _.find(dept.fireEngines, function(engine){
                                return engine.idFireEngine == newStatus.engineId
                            });
                            engine.fireEngineStatus = newStatus.newStatus;
                            engine.replacementFireEngineId = newStatus.relocationId;
                        });
                        $rootScope.$apply();
                    }
                });
                ws.$on('changeState', function(message){
                    function assignStateToEngine(messageFromServer){
                        var dept = storage.fireDepartments.find(function(dept){
                            return dept.id == messageFromServer.deptId
                        });
                        var engine = dept.fireEngines.find(function(engine){
                            return engine.idFireEngine == messageFromServer.engineId
                        });
                        engine.fireEngineState = messageFromServer.newState;
                        engine.replacementFireEngineId = messageFromServer.relocationId;
                        engine.lastUpdater = messageFromServer.user;
                        // engine.fireEngineState.userChangeState = messageFromServer.user;
                        // console.log(engine);
                        if(messageFromServer.comment !== null){
                            engine.comment = messageFromServer.comment;
                        }
                        if(messageFromServer.isFirstTank !== undefined && messageFromServer.isFirstTank !== null){
                            engine.isFirstTank = messageFromServer.isFirstTank;
                        }
                        /*
                         if(!!storage.controllers.bydept === true && !!storage.controllers.bydept.selectedDept === true){
                         storage.controllers.bydept.getEnginesState(storage.controllers.bydept.selectedDept);
                         }
                         */
                        /*
                         if($state.is('fires.deptsNote.bydepts')){
                         if(!!dept === true && dept.id === storage.controllers.bydepts.selectedDept.id){
                         // storage.controllers.bydept.initializeCurrentDeptAndCaraul(dept.id);
                         }
                         storage.controllers.bydepts.lostTechnique();
                         }
                         */

                    }


                    if(Array.isArray(message)){
                        _.each(message, function(change){
                            assignStateToEngine(change);
                        });
                    } else {
                        assignStateToEngine(message);

                    }
                    /*                    console.log('----');
                     console.log(storage);
                     console.log('----');*/
                    storage.dataOfStates.command.arriveCounter = 0;
                    storage.dataOfStates.command.onFireCounter = 0;


                    //TODO:  влияет на изменение состояния техники на пожаре
                    if(angular.isDefined(storage.selectedFire)){
                        _.map(storage.selectedFire.orders, function(order){
                            var dept = _.find(storage.fireDepartments, function(dept){
                                return dept.id == order.fireEngineDept;
                            });
                            var engine = _.find(dept.fireEngines, function(en){
                                return en.idFireEngine == order.fireEngine.idFireEngine;
                            });
                            switch(engine.fireEngineState.name){
                                case 'СЛЕДУЕТ':
                                    storage.dataOfStates.command.arriveCounter++;
                                    break;
                                case 'НА ПОЖАРЕ':
                                    storage.dataOfStates.command.onFireCounter++;
                                    break;
                            }
                        });
                    }

                    if($state.is('fires.chooseTech.bytypes') || $state.is('fires.chooseTech.bydept')){
                        // console.log('$state.current', $state.current);
                        /*
                         $state.go($state.current.name, $stateParams, {
                         reload: true, inherit: false, notify: true
                         });
                         */
                        if(!!storage.controllers.bydept === true && !!storage.controllers.bydept.selectedDept === true){
                            storage.controllers.bydept.getEnginesState(storage.controllers.bydept.selectedDept);
                        }

                        $state.transitionTo($state.current.name, $stateParams, {
                            reload: true, inherit: false, notify: true
                        });
                    }
                    $rootScope.$apply();
                });

                ws.$on('changeDislocationStart', function(newDislocation){


                    /*
                     var currDept = newDislocation;
                     var dept = _.find(storage.fireDepartments, function(dept){
                     return dept.id == newDislocation.deptId
                     });
                     */
                    var engine = storage.fireDepartments.find(function(dept){
                        return dept.fireEngines.find(function(eng){
                            if(eng.idFireEngine === newDislocation.engineId){
                                // console.log(eng.idFireEngine, newDislocation.engineId, dept, eng);
                                return eng;
                            }
                        });
                    });

                    /*
                     var engine = _.find(dept.fireEngines, function(engine){
                     return engine.idFireEngine == newDislocation.engineId
                     });
                     */

                    engine.locationDeptId = newDislocation.toDeptId;

                    engine.fireEngineState = newDislocation.engineState;

                    storage.dataOfStates.command.arriveCounter = 0;
                    storage.dataOfStates.command.onFireCounter = 0;

                    if(angular.isDefined(storage.selectedFire)){
                        _.map(storage.selectedFire.orders, function(order){
                            var dept = _.find(storage.fireDepartments, function(dept){
                                return dept.id == order.fireEngineDept;
                            });
                            var engine = _.find(dept.fireEngines, function(en){
                                return en.idFireEngine == order.fireEngine.idFireEngine;
                            });
                            switch(engine.fireEngineState.name){
                                case 'СЛЕДУЕТ':
                                    storage.dataOfStates.command.arriveCounter++;
                                    break;
                                case 'НА ПОЖАРЕ':
                                    storage.dataOfStates.command.onFireCounter++;
                                    break;
                            }
                        });
                    }

                    if(storage.controllers.bydept){
                        if(storage.controllers.bydept.selectedDept){
                            if(storage.controllers.bydept.currentCaraul){


                                if(storage.controllers.bydept.selectedDept.id === newDislocation.deptId){
                                    storage.controllers.bydept.initializeCurrentDeptAndCaraul(newDislocation.deptId, false);
                                }
                                if(storage.controllers.bydept.selectedDept.id === newDislocation.toDeptId){
                                    storage.controllers.bydept.initializeCurrentDeptAndCaraul(newDislocation.toDeptId, false);
                                }
                                if(storage.controllers.bydept.selectedDeptDislocatedList.length > 0){
                                    storage.controllers.bydept.initializeCurrentDeptAndCaraul(storage.controllers.bydept.selectedDept.id, false);
                                }

                                storage.controllers.bydept.lostTechnique();
                                $rootScope.$apply();
                            }
                        }
                    }

                    $rootScope.$apply();
                    //}
                });


                ws.$on('updateDepartments', function(depts){



                    if($state.is('fires.chooseTech.bytypes') && !!storage.controllers.bytypes === true && !!storage.controllers.bytypes.getFireEngineStatus === true && !!$stateParams.fireType === true){
                        storage.controllers.bytypes.getFireEngineStatus(depts);
                    }




                    depts.forEach(function(all, idx){

                        storage.fireDepartments.find(function(dept, idx){

                            if(dept.id === all.id){
                                // console.log('found', dept.id === all.id, '   ', dept.id);
                                // console.log('dept.fireEngines >', dept.fireEngines.length, ' <> all.fireEngines >', all.fireEngines.length);


                                /*
                                 all = null;
                                 all = dept;
                                 */


                                /*
                                 all.fireEngines.map(function(eng){

                                 console.log('gosNo :', eng.gosNo, ' fireEngineState :', eng.fireEngineState.name, 'idFireEngine :', eng.idFireEngine);

                                 });
                                 */

                                // angular.copy(all, dept);


                                storage.fireDepartments[idx] = Object.assign({}, all);


                                storage.fireDepartments[idx].caraulCrews.forEach(function(cCrew){

                                    cCrew.caraulEngines.forEach(function(cEng){
                                        cEng.caraulEngine.idFireEngine = cEng.idFireEngine;
                                    });

                                });


                                // console.log('engine >', storage.fireDepartments[idx]);


                                /*

                                 // Не нужная заморока, поиски ошибки с ПО

                                 if(storage.controllers.bydept){
                                 if(storage.controllers.bydept.selectedDept){
                                 if(storage.controllers.bydept.currentCaraul){
                                 console.log('4 >', storage.controllers.bydept.currentCaraul.caraulCrews);
                                 storage.controllers.bydept.currentCaraul = Object.assign({}, all);
                                 console.log('3 >', storage.controllers.bydept.currentCaraul.caraulCrews[3].leaveEngines["0"].caraulEngine.foamerCount);
                                 }
                                 }
                                 }

                                 console.log('1 >', JSON.stringify(storage.fireDepartments[idx].caraulCrews[3].leaveEngines["0"].caraulEngine.foamerCount));

                                 console.log('2 >', JSON.stringify(storage.controllers.bydept.currentCaraul.leaveEngines["0"].caraulEngine.foamerCount));
                                 */



                                if($state.is('fires.deptsNotes.bydept') && !!storage.controllers.bydepts === true && !!storage.controllers.bydepts.selectedDept === true && storage.controllers.bydepts.selectedDept.id === all.id){


                                    storage.controllers.bydepts.initializeCurrentDeptAndCaraul(storage.controllers.bydepts.selectedDept.id, false);

                                    storage.controllers.bydepts.cleanPeopleList();
                                    storage.controllers.bydepts.getPeoples();

                                    // storage.controllers.bydept.lostTechnique();

                                }

                                depts = null;




                                if($state.is('fires.chooseTech.bydept') && !!storage.controllers.bydept === true && !!storage.controllers.bydept.selectedDept === true && storage.controllers.bydept.selectedDept.id === all.id){
                                    storage.controllers.bydept.getEnginesState(storage.controllers.bydept.selectedDept);
                                }



                                return true;
                            }

                        });

                    });


                    // console.log('storage.fireDepartments >', storage.fireDepartments);

                    $rootScope.$apply();
                });


                ws.$on('changeDislocationComplete', function(newDislocation){

                    var dept = _.find(storage.fireDepartments, function(dept){
                        return dept.id == newDislocation.deptId
                    });
                    var engine = _.find(dept.fireEngines, function(engine){
                        return engine.idFireEngine == newDislocation.engineId
                    });
                    engine.locationDeptId = newDislocation.toDeptId;
                    engine.fireEngineState = newDislocation.engineState;
                    storage.dataOfStates.command.arriveCounter = 0;
                    storage.dataOfStates.command.onFireCounter = 0;
                    if(angular.isDefined(storage.selectedFire)){
                        _.map(storage.selectedFire.orders, function(order){
                            var dept = _.find(storage.fireDepartments, function(dept){
                                return dept.id == order.fireEngineDept;
                            });
                            var engine = _.find(dept.fireEngines, function(en){
                                return en.idFireEngine == order.fireEngine.idFireEngine;
                            });
                            switch(engine.fireEngineState.name){
                                case 'СЛЕДУЕТ':
                                    storage.dataOfStates.command.arriveCounter++;
                                    break;
                                case 'НА ПОЖАРЕ':
                                    storage.dataOfStates.command.onFireCounter++;
                                    break;
                            }
                        });
                    }
                    if(storage.controllers.bydept){
                        if(storage.controllers.bydept.selectedDept){
                            if(storage.controllers.bydept.currentCaraul){
                                if(storage.controllers.bydept.selectedDept.id === newDislocation.deptId){
                                    storage.controllers.bydept.initializeCurrentDeptAndCaraul(newDislocation.deptId, false);
                                }
                                if(storage.controllers.bydept.selectedDept.id === newDislocation.toDeptId){
                                    storage.controllers.bydept.initializeCurrentDeptAndCaraul(newDislocation.toDeptId, false);
                                }
                                if(storage.controllers.bydept.selectedDeptDislocatedList.length > 0){
                                    storage.controllers.bydept.initializeCurrentDeptAndCaraul(storage.controllers.bydept.selectedDept.id, false);
                                }
                                storage.controllers.bydept.lostTechnique();
                                $rootScope.$apply();
                            }
                        }
                    }
                    $rootScope.$apply();

                    //}
                });


                ws.$on('createFireByParams', function(message){

                    if(!!message === true){

                        storage.dataOfStates.newFireCard.audioRecord = Object.assign({}, message);


                        $state.go(('fires.newFireCard'), {
                                calledFrom: 'newFireCard',
                                fireId: undefined
                            }, {reload: true}
                        );


                    }

                });


                ws.$on('saveCaraul', function(message){


                    // console.log('bydept >', storage.controllers.bydept.selectedDeptDislocatedList);

                    if(!!message === true){
                        message.forEach(function(mess, idx){
                            /*
                             var dept = _.find(storage.fireDepartments, function(dept){
                             return dept.id == mess.id
                             });
                             */

                            storage.fireDepartments.find(function(dept, idxx){
                                if(dept.id === mess.id){
                                    storage.fireDepartments[idxx] = Object.assign({}, mess);
                                    // console.log('storage.fireDepartments[idxx]', storage.fireDepartments[idxx]);
                                    /*
                                     console.log('1 ----->', storage.controllers.bydept.currentCaraul);
                                     console.log('2 ----->', storage.fireDepartments[idxx]);
                                     console.log('3 ----->', mess.caraulCrews[3].leaveEngines["0"].caraulEngine.foamerCount);
                                     */

                                    return true;
                                }
                            });


                            // dept = angular.merge(dept, mess);
                            // dept = Object.assign(dept, mess);

                            /*
                             growl.success('Караул в ПЧ ' + dept.fireDeptName + ' был успешно сохранен', {
                             ttl: 4000,
                             disableCountDown: false
                             });
                             */


                            if(storage.controllers.bydept){
                                if(storage.controllers.bydept.selectedDept){
                                    if(storage.controllers.bydept.currentCaraul){
                                        // if(storage.controllers.bydept.selectedDept.id === message.deptId){
                                        if(storage.controllers.bydept.selectedDept.id === mess.id){
                                            // storage.controllers.bydept.initializeCurrentDeptAndCaraul(mess.id);
                                            storage.controllers.bydept.initializeCurrentDeptAndCaraul(((!!mess.deptId === true)? mess.deptId : mess.id));
                                            // storage.controllers.bydept.initializeCurrentDeptAndCaraul(mess.deptId);
                                            /*
                                             growl.warning('Открытый караул был изменён', {
                                             ttl: 4000,
                                             disableCountDown: false
                                             });
                                             */
                                        }
                                    }
                                }
                                /*
                                 $timeout(function(){
                                 storage.controllers.bydept.lostTechnique();
                                 }, 0);
                                 */
                                storage.controllers.bydept.lostTechnique();

                            }
                            if(storage.selectedFire){
                                ws.$emit('enginesAdvise', {
                                    fireActId: storage.selectedFire.id
                                    // ,ticket: $cookies.get('ticket')
                                });
                            }

                            // console.log('>>>>>>', JSON.stringify(mess.caraulCrews[3].leaveEngines["0"].caraulEngine.foamerCount), mess);


                        });
                    }

                    $rootScope.$apply();
                });

                ws.$on('addEquipToFireEngine', function(message){

                    var imitAnswerObj = {
                        idFireEquipment: message.equipId,
                        isRepair: true,
                        eqType: {}
                    };

                    var dept = _.find(storage.fireDepartments, function(dept){
                        return dept.id == message.deptId
                    });
                    var eq = _.find(storage.eqTypeDictItems, function(equip){
                        return equip.id == message.equipId
                    });
                    if(!!eq === true){
                        imitAnswerObj.eqType = JSON.parse(JSON.stringify(eq));
                    }
                    if(!!message.engineId === true){
                        var engine = _.find(dept.fireEngines, function(eng){
                            return eng.idFireEngine == message.engineId
                        });
                        /*
                         var eq = _.find(dept.fireEquipments, function(equip){
                         return equip.idFireEquipment == message.equipId
                         });
                         */
                        engine.equipmentsOnBoard.push(imitAnswerObj);
                        // engine.equipmentsOnBoard.push(eq);
                        // var index = dept.fireEquipments.indexOf(eq);
                        // dept.fireEquipments.splice(index, 1);
                    } else {
                        dept.fireEquipments.push(imitAnswerObj);
                        // dept.fireEquipments.push(eq);
                    }
                    $rootScope.$apply();
                });


                ws.$on('removeEquipFromFireEngine', function(message){

                    function deleteFrom(from, id){

                        var found = false;

                        from.find(function(eqt, idx){
                            // console.log(id, eqt.idFireEquipment, eqt.eqType.id);
                            if(id === eqt.idFireEquipment || id === eqt.eqType.id){
                                // if(what.id === ((id)? eqt.idFireEquipment : eqt.eqType.id)){
                                found = idx;
                                return true;
                            }
                        });

                        if(found !== false){
                            from.splice(found, 1);
                        }
                    }


                    /*
                     var imitAnswerObj = {
                     idFireEquipment: message.equipId,
                     isRepair: true,
                     eqType: {}
                     };
                     */

                    var dept = _.find(storage.fireDepartments, function(dept){
                        return dept.id == message.deptId
                    });

                    /*
                     var eq = _.find(storage.eqTypeDictItems, function(equip){
                     return (equip.id == message.equipId)
                     });
                     */
                    /*
                     if(!!eq === true){
                     imitAnswerObj.eqType = JSON.parse(JSON.stringify(eq));
                     }
                     */
                    if(!!message.engineId === true){
                        var engine = _.find(dept.fireEngines, function(eng){
                            return eng.idFireEngine == message.engineId
                        });
                        /*
                         var eq = _.find(engine.equipmentsOnBoard, function(equip){
                         return equip.idFireEquipment == message.equipId
                         });
                         */
                        // dept.fireEquipments.push(eq);

                        // var index = engine.equipmentsOnBoard.indexOf(eq);
                        // engine.equipmentsOnBoard.splice(index, 1);
                        deleteFrom(engine.equipmentsOnBoard, message.equipId);
                    } else {
                        // var index = dept.fireEquipments.indexOf(imitAnswerObj);
                        // var index = dept.fireEquipments.indexOf(eq);
                        deleteFrom(dept.fireEquipments, message.equipId);
                        // dept.fireEquipments.splice(index, 1);

                    }
                    $rootScope.$apply();
                });


                ws.$on('toggleEngineState', function(message){
                    storage.fireDepartments.find(function(dept, idx){
                        if(message.deptId === dept.id){
                            dept.fireEngines.find(function(eng, iidx){
                                if(eng.idFireEngine === message.engineId){
                                    // console.log('0>>>', storage.controllers.bydept);
                                    // console.log('1>>>', eng.fireEngineState.canUse, message.canUse);
                                    storage.fireDepartments[idx].fireEngines[iidx].fireEngineState.canUse = message.canUse;
                                    // eng.fireEngineState.canUse = message.canUse;
                                    // console.log('2>>>', eng.fireEngineState.canUse, message.canUse);

                                    return true;

                                }

                            });

                        }

                    });
                    // console.log(storage.controllers.bydept.selectedDept.id, message.deptId);
                    if(message.deptId === storage.controllers.bydept.selectedDept.id){
                        storage.controllers.bydept.selectedDept.fireEngines.find(function(eng){
                            if(eng.idFireEngine === message.engineId){
                                // console.log('3>>>', storage.controllers.bydept);
                                // console.log('4>>>', eng.fireEngineState.canUse, message.canUse);
                                eng.fireEngineState.canUse = message.canUse;
                                // console.log('5>>>', eng.fireEngineState.canUse, message.canUse);

                                return true;

                            }

                        });

                    }

                    $rootScope.$apply();
                });

                ws.$on('changeEngineAttribs', function(message){


                    var mode = message.mode;
                    var modelFromServer = message.engine;
                    var dept = _.find(storage.fireDepartments, function(dept){
                        return dept.id === message.deptId;
                    });
                    var engine = _.find(dept.fireEngines, function(engine){
                        return engine.idFireEngine === modelFromServer.idFireEngine;
                    });
                    var caraulEngine = message.caraulEngine;
                    var index = _.indexOf(dept.fireEngines, engine);
                    switch(mode){
                        case "addNew":
                            dept.fireEngines.push(modelFromServer);
                            _.each(dept.caraulCrews, function(caraul){
                                caraul.caraulEngines.push({
                                    idFireEngine: modelFromServer.idFireEngine,
                                    caraulEngine: caraulEngine
                                });
                            });
                            growl.success('Машина ' + modelFromServer.gosNo + ' Добавлена', {
                                ttl: 4000,
                                disableCountDown: false
                            });
                            $rootScope.$apply();
                            break;
                        case "save":
                            angular.merge(engine, modelFromServer);
                            growl.success('Машина ' + modelFromServer.gosNo + ' сохранена', {
                                ttl: 4000,
                                disableCountDown: false
                            });
                            $rootScope.$apply();
                            break;
                        case "transfer":
                            dept.fireEngines.splice(index, 1);
                            _.each(dept.caraulCrews, function(caraul){
                                var engineInCaraul = _.find(caraul.caraulEngines, function(ceng){
                                    return ceng.idFireEngine === modelFromServer.idFireEngine
                                });
                                var caraulIndex = _.indexOf(caraul.caraulEngines, engineInCaraul);
                                caraul.caraulEngines.splice(caraulIndex, 1);
                            });
                            var deptTo = _.find(storage.fireDepartments, function(dept){
                                return dept.id === message.to
                            });
                            deptTo.fireEngines.push(modelFromServer);
                            _.each(deptTo.caraulCrews, function(caraul){
                                caraul.caraulEngines.push({
                                    idFireEngine: modelFromServer.idFireEngine,
                                    caraulEngine: caraulEngine
                                });
                            });
                            /*
                             growl.success('Машина ' + modelFromServer.gosNo + 'перемещена из ПЧ ' + '', {
                             ttl: 4000,
                             disableCountDown: false
                             });
                             */
                            $rootScope.$apply();

                            break;
                        case "delete":
                            dept.fireEngines.splice(index, 1);
                            _.each(dept.caraulCrews, function(caraul){
                                var engineInCaraul = _.find(caraul.caraulEngines, function(ceng){
                                    return ceng.idFireEngine === modelFromServer.idFireEngine
                                });
                                var caraulIndex = _.indexOf(caraul.caraulEngines, engineInCaraul);
                                caraul.caraulEngines.splice(caraulIndex, 1);
                            });
                            growl.success('Машина ' + modelFromServer.gosNo + 'удалена', {
                                ttl: 4000,
                                disableCountDown: false
                            });
                            $rootScope.$apply();
                            break;
                        default :
                            console.error("UNDEFINED MSG FROM SERVER!!!");
                            growl.error("Неопознанное сообщение от сервера!", {
                                ttl: 4000,
                                disableCountDown: false
                            });
                            break;
                    }
                    $rootScope.$apply();

                });

                //Acts
                ws.$on('deleteFire', function(message){

                    var fire = null,
                        sibling = null;

                    if($state.current.name === 'fires.firesbase' && !!message === true){
                        if(!!storage.selectedFire === true && storage.selectedFire.id == message){
                            fire = $window.document.body.querySelector('[data-fire-id="' + message + '"]');

                            sibling = (!!fire.previousElementSibling === true)? fire.previousElementSibling : (fire.nextElementSibling)? fire.nextElementSibling : null;
                            if(!!fire === true && !!sibling === true && sibling.nodeName == 'TR'){
                                fire.classList.remove('rowbkgselected');
                                if(!!sibling.dataset.fireId){
                                    storage.activeFires.find(function(aFire){
                                        if(aFire.id == message && !!storage.controllers.fires === true){
                                            (function(id){
                                                setTimeout(function(){
                                                    storage.activeFires.find(function(burning){
                                                        if(burning.id == id){
                                                            storage.controllers.fires.selectFire(burning);
                                                            storage.controllers.fires.scrollToCursor();
                                                            return true;
                                                        }
                                                    });

                                                }, 100);

                                            })(sibling.dataset.fireId);


                                            return true;
                                        }

                                    });
                                    sibling.classList.add('rowbkgselected');

                                }

                            }

                            /*
                             storage.activeFires.find(function(fire){
                             rows = $window.document.body.querySelectorAll('.rowbkgselected');
                             if(!!rows === true){
                             // && !!row.dataset.fireId === true && row.dataset.fireId == message
                             for(var i = 0, l = rows.length; i < l; i++){
                             rows[i].classList.remove('rowbkgselected');
                             }
                             vm.selectFire(fire);
                             if(!!rows[0] === true){


                             }
                             }
                             });
                             */
                        }
                    }

                    storage.activeFires = _.without(storage.activeFires, _.findWhere(storage.activeFires, {id: message}));
                    if(storage.selectedFire){
                        if(storage.selectedFire.id === message){
                            storage.selectedFire = undefined;
                            storage.enginesAdvise = undefined;
                            $state.go('fires.firesbase', {fireId: undefined});
                            /*
                             if($state.is('fires.protocol') || $state.is('fires.order') || $state.is('fires.orderEdit')){
                             $state.go('fires.firesbase', {fireId: undefined});
                             } else {
                             $state.transitionTo($state.current, {fireId: undefined}, {notify: false});
                             }
                             */


                        }
                    }


                    fire = sibling = null;

                    $rootScope.$apply();
                });


                ws.$on('changeFireState', function(message){
                    var fireAct = _.find(storage.activeFires, function(fire){
                        return fire.id == message.fireActId
                    });
                    if(message.messageBuffer != undefined && message.messageBuffer.length > 0){



                        var difference = _.filter(message.messageBuffer, function(mess){
                            var actualMessage = _.find(fireAct.messageBuffer, function(messageInFire){
                                return messageInFire.id === mess.id;
                            });
                            return (actualMessage)? false : true;
                        });
                        _.each(difference, function(mess){
                            fireAct.messageBuffer.push(mess);
                        });
                    }
                    if(message.fireStatus != undefined){
                        fireAct.fireStatus = message.fireStatus;
                    }
                    changeNewMessagesExistenceFlag(fireAct);
                    if(Array.isArray(message.props)){
                        _.each(message.props, function(p){
                            fireAct[p.prop] = p.value;
                        });
                    }
                    // fireAct.state = message.newState;


                    if(!!storage.controllers.newFireCard === true){
                        storage.controllers.newFireCard.renewTableData(message);
                    }
                    $rootScope.$apply();
                });
                ws.$on('replaceFireAct', function(message){
                    //TODO !!!!!проверить логику работы всего обработчика сообщения
                    //TODO баг на сервере: в каких-то случаях message и есть объект fireAct, в каких-то объект это message.fireAct
                    var newFireAct = (message.fireAct)? message.fireAct : message;
                    var fireAct = _.find(storage.activeFires, function(fire){
                        return fire.id == newFireAct.id
                    });
                    angular.copy(newFireAct, fireAct);
                    changeNewMessagesExistenceFlag(fireAct);
                    if(storage.selectedFire != undefined){
                        if(storage.selectedFire.id === fireAct.id){
                            storage.selectedFire = undefined;
                            storage.enginesAdvise = undefined;
                            if($state.is('fires.protocol') || $state.is('fires.order') || $state.is('fires.orderEdit')){
                                $state.go('fires.firesbase', {fireId: fireAct.id});
                            } else if($state.is('fires.firesbase')){
                                $state.go('fires.firesbase', {fireId: fireAct.id}, {reload: true});
                            } else {
                                $state.transitionTo($state.current, {fireId: undefined}, {notify: false});
                            }
                        }
                    }
                    $rootScope.$apply();
                });
                ws.$on('reroute', function(){
                    if(storage.selectedFire){
                        ws.$emit('enginesAdvise', {
                            fireActId: storage.selectedFire.id
                            // ,ticket: $cookies.get('ticket')
                        });
                    }
                    $rootScope.$apply();
                });
                ws.$on('changeOrders', function(zipShapes){
                    /*
                     var strData = atob(zipShapes);
                     var charData = strData.split('').map(function(x){
                     return x.charCodeAt(0);
                     });
                     var binData = new Uint8Array(charData);
                     var message = JSON.parse(pako.inflate(binData, {to: 'string'}));
                     */
                    var message = zipShapes;
                    var fireAct = _.find(storage.activeFires, function(fire){
                        return fire.id == message.id
                    });
                    fireAct.orders = message.orders;
                    fireAct.notFoundOrders = message.notFoundOrders;
                    fireAct.state = message.state;
                    fireAct.fireStatus = message.fireStatus;
                    fireAct.firstCarDate = message.firstCarDate;
                    var difference = _.filter(message.messageBuffer, function(mess){
                        var actualMessage = _.find(fireAct.messageBuffer, function(messageInFire){
                            return messageInFire.id === mess.id;
                        });
                        return (actualMessage)? false : true;
                    });
                    _.each(difference, function(mess){
                        fireAct.messageBuffer.push(mess);
                    });
                    changeNewMessagesExistenceFlag(fireAct);

                    if(angular.isDefined(storage.selectedFire)){
                        storage.dataOfStates.command.arriveCounter = 0;
                        storage.dataOfStates.command.onFireCounter = 0;
                        if(angular.isDefined(storage.selectedFire)){
                            _.map(storage.selectedFire.orders, function(order){
                                var dept = _.find(storage.fireDepartments, function(dept){
                                    return dept.id == order.fireEngineDept;
                                });
                                var engine = _.find(dept.fireEngines, function(en){
                                    return en.idFireEngine == order.fireEngine.idFireEngine;
                                });
                                switch(engine.fireEngineState.name){
                                    case 'СЛЕДУЕТ':
                                        storage.dataOfStates.command.arriveCounter++;
                                        break;
                                    case 'НА ПОЖАРЕ':
                                        storage.dataOfStates.command.onFireCounter++;
                                        break;
                                }
                            });
                        }
                    }
                    $rootScope.$apply();
                });


                ws.$on('zipped', function(zipMessage){

                    var message = gzip.fromGzip(zipMessage);
                    // const message = zipMessage;

                    // console.log('spamToInvolved >', message);
                    // console.log('ws >', ws);

                    if(message !== undefined && ws !== undefined){

                        if(!!ShowZippedEmitsInConsole === true){
                            // console.log('▼ -------------------- zipped ---------------------- ▼');
                            console.log('%c%s', 'color: indianred;', '┌──────────────────────────────┤ zipped ▼ ├─────────────────────────────┐');

                            // console.log('|                         zipped                        |');
                        }
                        for(var i in message){
                            if(message.hasOwnProperty(i) && ws.$$eventMap.hasOwnProperty(i)){
                                for(var j = 0; j < ws.$$eventMap[i].length; j++){
                                    // console.log('ws.$$eventMap[i][j] >', ws.$$eventMap[i][j], message[i]);
                                    /*









                                     */
//TODO: Вызов функции для перевода любого входящего сообщения
                                    if(i !== 'init' && i !== 'initDispApp' && i !== 'login'){
                                        translateMessage(message[i]);
                                    }
                                    /*









                                     */
                                    ws.$$eventMap[i][j](message[i]);

                                }
                            }
                            if(!!ShowZippedEmitsInConsole === true){
                                console.log('%c%s', 'color: indianred;', ((ws.$$eventMap.hasOwnProperty(i))? '├─ ƒ ─•' : '├─ ? ─•'), i, '', message[i]);
                            }
                        }
                        if(!!ShowZippedEmitsInConsole === true){
                            console.log('%c%s', 'color: indianred;', '└───────────────────────────────────────────────────────────────────────┘');
                            console.log('');
                            // console.log('▲ -------------------------------------------------- ▲');
                        }
                    }


                });


                ws.$on('updateFireAct', function(message){


                    storage.activeFires.find(function(af, idx){

                        if(af.id == message.fireAct.id){
                            // storage.activeFires[idx] = null;
                            // storage.activeFires[idx] = message.fireAct;
                            storage.activeFires[idx] = Object.assign({}, message.fireAct);


                            /*
                             if(ws.$$eventMap.hasOwnProperty('addPotentialToTotalOrders') && ws.$$eventMap.addPotentialToTotalOrders[0] instanceof Function){
                             console.log('message >>>', message);
                             // ws.$$eventMap.addPotentialToTotalOrders[0](message.fireAct.potentialEngines);
                             }
                             */


                            if(storage.selectedFire !== undefined && message.fireAct.id === storage.selectedFire.id){

                                if(!!storage.dataOfStates.newFireCard === true){
                                    storage.dataOfStates.newFireCard.fireAct = Object.assign({}, message.fireAct);
                                    // storage.dataOfStates.newFireOrder.fireAct = message.fireAct;
                                }

                                if(!!storage.selectedFire === true){
                                    storage.selectedFire = Object.assign({}, message.fireAct);
                                }
                                /*
                                 if($state.is('fires.newFireOrder')){
                                 storage.dataOfStates.newFireOrder.fireAct = angular.copy(message.fireAct);
                                 // storage.dataOfStates.newFireOrder.fireAct = message.fireAct;
                                 }
                                 */

                                storage.selectedFire = null;
                                storage.selectedFire = Object.assign({}, message.fireAct);


                                // storage.dataOfStates.editFireOrder.fireAct = angular.copy(message.fireAct);

                                /*
                                 storage.dataOfStates.editFireOrder.listOfAdditionalTech = message.fireAct.potentialOrders.map(function(eng){
                                 return {
                                 fireDeptName: eng.departmentName,
                                 deptId: eng.fireEngineDept,
                                 engine: eng.fireEngine
                                 }

                                 });
                                 */

                                // storage.dataOfStates.editFireOrder.listOfAdditionalTech = (message.fireAct.potentialEngines instanceof Array && message.fireAct.potentialEngines.length > 0)? message.fireAct.potentialEngines : [];

                                /*
                                 storage.dataOfStates.editFireOrder.listOfAdditionalTech = _.map(message.potentialEngines, function(eng){
                                 // storage.dataOfStates.editFireOrder.listOfAdditionalTech = _.map(message.potentialEngines, function(eng){
                                 var dept = _.find(storage.fireDepartments, function(dept){
                                 return dept.id === eng.deptId;
                                 });
                                 // console.log('dept >', dept);

                                 var engine = _.find(dept.fireEngines, function(engine){
                                 return engine.idFireEngine === eng.idFireEngine;
                                 });

                                 return {fireDeptName: dept.fireDeptName, deptId: dept.id, engine: engine}

                                 });
                                 */


                            }

                            return true;
                        }
                    });
                    changeNewMessagesExistenceFlag(message.fireAct);
                    if(message.length > 0 && (isDefinedSelectedFire || isNewFireOrderHasId) && storage.selectedFire.id === message[0].fireActId){
                        storage.enginesAdvise = message;
                        $rootScope.$apply();
                    }


                    /*

                     if(!!storage.controllers.newFireCard === true){
                     if(message.fireAct.id === storage.controllers.newFireCard.fireAct.id){
                     storage.controllers.newFireCard.renewFireAct(message.fireAct);
                     }
                     }
                     */


                    // console.log('$state.$current.name >', $state.$current.name);

                    // if(storage.dataOfStates.editFireOrder.hasOwnProperty('fireAct') && storage.dataOfStates.editFireOrder.fireAct.hasOwnProperty('addOrders') && storage.dataOfStates.editFireOrder.fireAct.id === message.fireAct.id){

                    // if($state.$current.name !== 'fires.orderEdit' || $state.$current.name !== 'fires.newFireOrder'){


                    // }


                    if($state.is('fires.protocol') && storage.controllers.protocol !== null && storage.controllers.protocol.selectedFire.id === message.fireAct.id){

                        storage.controllers.protocol.selectedFire = angular.copy(message.fireAct);

                        storage.controllers.protocol.buildProtocolMessage(message.fireAct.messageBuffer);
                    }


                    if(!!storage.controllers.newFireCard === true){
                        if(message.fireAct.id === storage.controllers.newFireCard.fireAct.id){
                            storage.controllers.newFireCard.renewFireAct(message.fireAct);
                        }
                    }


                    $rootScope.$apply();
                    /*
                     var fireAct = _.find(storage.activeFires, function(activeFire){
                     return activeFire.id == message.fireAct.id;
                     });
                     if(fireAct != undefined){

                     // angular.merge(fireAct, message.fireAct);
                     fireAct = angular.copy(message.fireAct);
                     changeNewMessagesExistenceFlag(fireAct);
                     $rootScope.$apply();


                     }
                     */

                });
                ws.$on('changeRankOfFire', function(message){
                    // console.log('changeRankOfFire >', message);
                    // console.log('_.map(message.potentialEngines >', message.potentialEngines)


                    if(storage.selectedFire !== undefined && message.fireAct.id === storage.selectedFire.id && !!message.fireUser !== false && message.fireUser.uid === storage.fireUser.uid){
                        storage.dataOfStates.newFireCard.listOfAdditionalTech = _.map(message.potentialEngines, function(eng){
                            // storage.dataOfStates.editFireOrder.listOfAdditionalTech = _.map(message.potentialEngines, function(eng){
                            var dept = _.find(storage.fireDepartments, function(dept){
                                return dept.id === eng.deptId;
                            });
                            // console.log('dept >', dept);

                            var engine = _.find(dept.fireEngines, function(engine){
                                return engine.idFireEngine === eng.idFireEngine;
                            });

                            return {fireDeptName: dept.fireDeptName, deptId: dept.id, engine: engine}

                        });
                    }

                    storage.activeFires.find(function(af, idx){

                        if(af.id == message.fireAct.id){
                            storage.activeFires[idx] = null;
                            storage.activeFires[idx] = angular.copy(message.fireAct);

                            if(storage.selectedFire !== undefined && message.fireAct.id === storage.selectedFire.id){
                                storage.selectedFire = null;
                                storage.selectedFire = angular.copy(message.fireAct);
                            }
                            return true;
                        }
                    });

                    if(!!storage.controllers.newFireCard === true){
                        if(message.fireAct.id === storage.controllers.newFireCard.fireAct.id){
                            storage.controllers.newFireCard.renewFireAct(message.fireAct);
                        }
                    }

                    if(!$state.is('fires.newFireCard') && storage.selectedFire.id === message.fireAct.id){
                        $state.go('fires.newFireCard', {
                            fireId: (!!message.fireAct.id === true)? message.fireAct.id : null,
                            calledFrom: 'protocol'
                        });
                    }


                    /*
                     if(storage.selectedFire !== undefined && message.fireAct.id === storage.selectedFire.id && !!message.fireUser !== false && message.fireUser.uid === storage.fireUser.uid){

                     storage.dataOfStates.editFireOrder.notFoundOrders = message.notFoundOrders;
                     storage.dataOfStates.editFireOrder.totalOrders = message.totalOrders;
                     storage.dataOfStates.editFireOrder.hasPredefinedListOfEngines = true;
                     storage.dataOfStates.editFireOrder.canLeave = false;
                     storage.dataOfStates.editFireOrder.fireAct = angular.copy(message.fireAct);

                     if(!$state.is('fires.orderEdit')){
                     $state.go('fires.orderEdit');
                     }
                     }
                     */
                    $rootScope.$apply();
                });
                ws.$on('changeFireplaceOfFire', function(message){
                    if(message.GoToOrderState != undefined){
                        storage.hideLoadingOverlay = true;
                        // $state.go('fires.order');
                        // $state.go('fires.orderEdit');
                    } else {
                        if(storage.selectedFire !== undefined && message.fireAct.id === storage.selectedFire.id && !!message.fireUser !== false && message.fireUser.uid === storage.fireUser.uid){
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
                            storage.dataOfStates.editFireOrder.hasPredefinedListOfEngines = true;
                            storage.dataOfStates.editFireOrder.fireAct.addOrders = message.fireAct.addOrders;
                            storage.dataOfStates.editFireOrder.canLeave = false;

                            // $state.go('fires.orderEdit');
                        }
                        storage.hideLoadingOverlay = true;
                    }
                    if(storage.selectedFire !== undefined && message.fireAct.id === storage.selectedFire.id && !!message.fireUser !== false && message.fireUser.uid === storage.fireUser.uid){
                        if(!$state.is('fires.orderEdit')){
                            $state.go('fires.orderEdit');
                        }
                    }
                    $rootScope.$apply();
                });


                ws.$on('addFireRankModificators', function(message){
                    if(message.fireAct !== undefined && message.fireAct.id !== undefined){
                        storage.activeFires.find(function(fire, idx){

                            if(fire.id === message.fireAct.id){
                                storage.activeFires[idx] = null;
                                storage.activeFires[idx] = angular.copy(message.fireAct);
                                // storage.dataOfStates.editFireOrder.fireAct = angular.copy(message.fireAct);

                                if(storage.selectedFire.hasOwnProperty('id') && storage.selectedFire.id === message.fireAct.id){
                                    storage.dataOfStates.newFireCard.fireAct = angular.copy(message.fireAct);
                                    storage.selectedFire = angular.copy(message.fireAct)
                                }

                            }

                        });
                    }


                    if(message.GoToOrderState != undefined){
                        // storage.hideLoadingOverlay = true;
                        /*
                         if(!$state.is('fires.order')){
                         $state.go('fires.order');
                         }
                         */
                    } else {
                        if(storage.selectedFire !== undefined && message.fireAct.id === storage.selectedFire.id && !!message.fireUser !== false && message.fireUser.uid === storage.fireUser.uid){
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
                            storage.dataOfStates.editFireOrder.hasPredefinedListOfEngines = true;
                            storage.dataOfStates.editFireOrder.canLeave = false;
                            // storage.hideLoadingOverlay = true;
                            /*
                             if(!$state.is('fires.orderEdit')){
                             $state.go('fires.orderEdit');
                             }
                             */
                        }
                    }


                    if(!!storage.controllers.newFireCard === true){
                        if(message.fireAct.id === storage.controllers.newFireCard.fireAct.id){
                            storage.controllers.newFireCard.renewFireAct(message.fireAct);
                        }
                    }

                    if(!$state.is('fires.newFireCard') && message.fireAct.id === storage.selectedFire.id){
                        $state.go('fires.newFireCard', {
                            fireId: (!!message.fireAct.id === true)? message.fireAct.id : null,
                            calledFrom: 'protocol'
                        });
                    }


                    storage.hideLoadingOverlay = true;
                    $rootScope.$apply();
                });


                ws.$on('createFireByXY', function(message){
                    /*
                     console.log('createFireByXY >>>', message);
                     console.log('socket >>>', storage.socketStatus);
                     */

                    if(!!message === true && message.socketId === storage.socketStatus.socketId){

                        if(!!storage.dataOfStates.newFireCard === true){
                            storage.dataOfStates.newFireCard.fireAct = Object.assign({}, message.fireAct);
                        }


                        $state.go('fires.newFireCard',
                            {
                                deptId: undefined,
                                fireId: message.fireAct.id,
                                fireType: undefined,
                                calledFrom: 'newFireCard'
                            },
                            {reload: true}
                        );

                        // ws.$emit('selectFire', {fireActId: message.fireAct.id});
                        // globalSelectFire(message.fireAct);

                        /*
                         switch(message.fireAct.firePlace.region.code){

                         case 141:
                         $state.go('fires.newFireOrder',
                         {
                         deptId: undefined,
                         fireId: undefined,
                         fireType: undefined
                         },
                         {reload: true}
                         );
                         break;

                         case 1141:
                         $state.go('fires.newFireOrder',
                         {
                         deptId: undefined,
                         fireId: undefined,
                         fireType: 3
                         },
                         {reload: true}
                         );
                         break;

                         }
                         */
                    }


                });


                ws.$on('addNewFire', function(message){


                    var dept = {
                        fireActId: '' + message.fireAct.id
                    };

                    //dept.distances = angular.copy(message.DeptDistance);


                    if(!storage.hasOwnProperty('distanceToDeptsFromFires') || storage.distanceToDeptsFromFires === undefined){
                        storage.distanceToDeptsFromFires = [];
                    }
                    storage.distanceToDeptsFromFires.push(dept);

                    var found = false;
                    storage.activeFires.forEach(function(fire, idx){
                        if(fire.id === message.fireAct.id){
                            Object.assign({}, message.fireAct, storage.activeFires[idx]);
                            // storage.activeFires[idx] = message.fireAct;
                            found = true;
                        }
                    });
                    if(!found){
                        storage.activeFires.push(message.fireAct);
                    }
                    // storage.activeFires.push(message.fireAct);

                    /*
                     if(storage.selectedFire !== undefined && message.fireAct.id === storage.selectedFire.id){
                     $state.go('fires.newFireCard',
                     {
                     deptId: undefined,
                     fireId: undefined,
                     fireType: undefined,
                     calledFrom: undefined
                     },
                     {reload: true}
                     );
                     }
                     */


                    if(!!storage.controllers.newFireCard === true){
                        if(message.fireAct.id === storage.controllers.newFireCard.fireAct.id){
                            storage.dataOfStates.newFireCard.fireAct = message.fireAct;
                            storage.controllers.newFireCard.renewFireAct(message.fireAct);
                        }
                    }


                    if($state.is('fires.firesbase') && $stateParams.fireId === message.fireAct.id){
                        globalSelectFire(message.fireAct);
                    }

                    /*
                     if($state.is('fires.newFireOrder')){
                     storage.dataOfStates.newFireOrder.fireAct = message.fireAct;
                     }
                     */
                    $rootScope.$apply();
                });


                ws.$on('updateNotFoundOrders', function(message){
                    var fireAct = _.find(storage.activeFires, function(activeFire){
                        return activeFire.id == message.fireActId
                    });
                    fireAct.notFoundOrders = message.notFoundOrders;

                    $rootScope.$apply();
                });


                //Log Card 112


                /*
                 ws.$on('getProtocol112', function(message){
                 if(message !== undefined){
                 console.log(message);
                 }
                 });
                 */


                //Locks
                ws.$on('listLocks', function(message){
                    if(message !== undefined){
                        storage.listOfLocks = message;
                    }
                    $rootScope.$apply();
                });


                /*

                 ws.$on('lockDocument', function(message){

                 storage.listLocksObj[message.document] = message.fireUser;
                 $rootScope.$apply();

                 });

                 */


                ws.$on('lockDocument', function(message){
                    // console.log('lockDocument > ', message);
                    if(message != undefined){
                        if(message.success){

                            var answerId = message.document.split(':')[0];
                            var answerType = message.document.split(':')[1];

                            switch(answerType){

                                /*
                                 case 'forma6':
                                 storage.listLocksObj[answerId] = message.fireUser;
                                 $rootScope.$apply();
                                 break;
                                 */

                                case 'forma':
                                    // storage.listLocksObj[answerId] = message.fireUser;

                                    if(!!message.fireUser.uid === true){
                                        storage.listLocksObj[message.document] = message.fireUser;
                                    }

                                    if(!$state.is('fires.forma') && message.fireUser.uid === storage.fireUser.uid){
                                        ws.$emit('getForma6', answerId);
                                    }


                                    /*
                                     if(message.fireUser.uid === storage.fireUser.uid){
                                     ws.$emit('getForma6', answerId);
                                     }
                                     */
                                    // console.log('storage.listLocksObj >>>', storage.listLocksObj);
                                    /*
                                     else {
                                     $rootScope.$apply();
                                     }
                                     */
                                    break;

                                case 'dept':
                                    if(storage.controllers.bydept){
                                        if(storage.controllers.bydept.selectedDept){
                                            if(storage.controllers.bydept.currentCaraul){
                                                storage.controllers.bydept.canSaveCaraulDeptId = answerId;
                                                if(storage.fireDepartments.length > 0){
                                                    var currentListOfDeptsId = _.map(storage.fireDepartments, function(dept){
                                                        return dept.id + ':dept';
                                                    });
                                                    ws.$emit('listLocks', currentListOfDeptsId);
                                                    $rootScope.$apply();
                                                }
                                            }
                                        }
                                    }
                                    break;

                                case 'card112':

                                    // if(message.fireUser.uid === storage.fireUser.uid){
                                    storage.listLocksObj[message.document] = message;
                                    // storage.lockedCard112[message.document] = message;
                                    // console.log('storage.lockedCard112 >', storage.lockedCard112);
                                    // }

                                    $rootScope.$apply();
                                    break;

                                default:

                                    growl.warning('Заблокировано пользователем' + message.fireUser.lastName, {
                                        ttl: 4000,
                                        disableCountDown: false
                                    });
                            }
                            $rootScope.$apply();

                            /*
                             if(message.document.includes(':forma')){
                             var fireId = message.document.replace(':forma', '');
                             storage.listLocksObj[fireId] = message.fireUser;
                             ws.$emit('getForma6', fireId);
                             }

                             if(message.document.includes(':dept')){
                             if(storage.controllers.bydept){
                             if(storage.controllers.bydept.selectedDept){
                             if(storage.controllers.bydept.currentCaraul){
                             storage.controllers.bydept.canSaveCaraulDeptId = message.document.replace(':dept', '');
                             if(storage.fireDepartments.length > 0){
                             var currentListOfDeptsId = _.map(storage.fireDepartments, function(dept){
                             return dept.id + ':dept';
                             });
                             ws.$emit('listLocks', currentListOfDeptsId);
                             $rootScope.$apply();
                             }
                             }
                             }
                             }
                             }
                             } else {
                             growl.warning('Заблокировано пользователем' + message.fireUser.lastName);
                             }
                             */
                        } else {

                            growl.warning('Заблокировано пользователем ' + message.fireUser.lastName + ' ' + message.fireUser.firstName, {
                                ttl: 4000,
                                disableCountDown: false
                            });

                        }
                    }
                });


                //Footer
                ws.$on('initEnginesByTypes', function(message){
                    $rootScope.$apply(storage.enginesByTypes = message);
                });


                ws.$on('enginesAdvices', function(message){
                    storage.enginesByTypes = message.enginesByTypes;

                    /*
                     var isDefinedSelectedFire = storage.selectedFire != undefined;
                     var isNewFireOrderHasId = storage.dataOfStates.newFireOrder.fireAct != undefined && storage.dataOfStates.newFireOrder.fireAct.id != undefined;
                     */


                    // var faId = (!!storage.selectedFire === true) ? storage.selectedFire.id : (!!storage.dataOfStates.newFireOrder.fireAct === true) ? storage.dataOfStates.newFireOrder.fireAct.id : null;
                    var faId = (!!storage.selectedFire === true)? storage.selectedFire.id : (!!storage.dataOfStates.newFireCard.fireAct === true)? storage.dataOfStates.newFireCard.fireAct.id : null;

                    for(var advice in message.advices){
                        // if(advice.length > 0 && (isDefinedSelectedFire || isNewFireOrderHasId) && storage.selectedFire.id === advice){
                        if(advice.length > 0 && !!faId === true && faId === advice){
                            storage.enginesAdvise = message.advices[advice];
                        }
                    }
                    $rootScope.$apply();
                });


                ws.$on('refreshEnginesByTypes', function(message){
                    storage.enginesByTypes = message;
                    $rootScope.$apply();
                });


                ws.$on('enginesAdviseResp', function(zipShapes){
                    /*
                     if(zipShapes instanceof Object){

                     var message = zipShapes;

                     } else {

                     var strData = atob(zipShapes);
                     var charData = strData.split('').map(function(x){
                     return x.charCodeAt(0);
                     });
                     var binData = new Uint8Array(charData);
                     var message = JSON.parse(pako.inflate(binData, {to: 'string'}));

                     }
                     */

                    var message = zipShapes;
                    // console.log('message >', message);

                    var isDefinedSelectedFire = storage.selectedFire != undefined;

                    var isNewFireOrderHasId = storage.dataOfStates.newFireOrder.fireAct != undefined && storage.dataOfStates.newFireOrder.fireAct.id != undefined;

                    if(message.length > 0 && (isDefinedSelectedFire || isNewFireOrderHasId) && storage.selectedFire.id === message[0].fireActId){
                        storage.enginesAdvise = message;
                        $rootScope.$apply();
                    }
                });

                ////Forma6


                ws.$on('unlockHanging', function(message){

                    for(var i in message){

                        if(storage.listLocksObj.hasOwnProperty(i)){
                            delete storage.listLocksObj[i];
                        }
                    }
                    $rootScope.$apply();

                });


                ws.$on('unlockDocument', function(message){
                    // console.log('message >', message);
                    // console.log('storage.listLocksObj >', storage.listLocksObj);
                    if(storage.listLocksObj.hasOwnProperty(message.document)){
                        delete storage.listLocksObj[message.document];
                        // storage.listLocksObj = {};
                        $rootScope.$apply();
                    }

                });

                ws.$on('listLocksObj', function(form6Doc){


                    if(form6Doc !== undefined && !!form6Doc === true && form6Doc instanceof Array && form6Doc.length > 0){

                        storage.listLocksObj = form6Doc;

                        /*

                         console.log('>---------');
                         console.log(form6Doc);
                         console.log(storage);
                         console.log('---------<');
                         */

                        // var answerId = form6Doc.document.split(':')[0];
                        // var answerType = form6Doc.document.split(':')[1];


                        var storageId = storage.selectedFire.id + ':forma'


                        if(!form6Doc.hasOwnProperty(storageId) || (form6Doc.hasOwnProperty(storageId) && form6Doc[storageId].uid === storage.fireUser.uid)){


                            if(
                                (form6Doc.hasOwnProperty(storageId) && form6Doc[storageId].uid === storage.fireUser.uid)
                                && form6Doc.hasOwnProperty(storageId)
                            ){
                                ws.$emit('relockDocument', storageId);
                                ws.$emit('getForma6', storage.selectedFire.id);

                            } else if(!form6Doc.hasOwnProperty(storageId)){
                                ws.$emit('lockDocument', {'id': storageId, 'typeDelivery': 'all'});
                            }


                        } else {
                            growl.error('Документ заблокирован диспетчером ' + form6Doc[storageId].lastName + ' ' + form6Doc[storageId].firstName, {
                                ttl: 3000,
                                disableCountDown: false
                            });
                        }
                    }
                    $rootScope.$apply();

                });


                ws.$on('getForma6', function(message){
                    if(message.error == undefined && !message.hasOwnProperty('type')){
                        storage.forma6 = message;
                        storage.forma6.gdzTechInfoes86_89 = [];
                        // console.log('storage.forma6', storage.forma6);
                        /*

                         console.log('>------------')
                         console.log('storage.forma6', storage.forma6);
                         console.log('------------<')
                         */


                        $state.go('fires.forma');

                        if(!!storage.controllers.forma === true){

                            storage.controllers.forma.checkTableData();

                        }

                        $rootScope.$apply();
                    } else if(!message.hasOwnProperty('type')){
                        growl.error('Данная карточка заблокирована дознавателем. Редактирование из АРМ Диспетчера невозможно', {
                            ttl: 3000,
                            disableCountDown: false
                        });
                        ws.$emit('unlockDocument', message.error + ':forma');
                    } else if(message.hasOwnProperty('type')){

                        growl.error('Форма 6 не найдена', {
                            ttl: 3000,
                            disableCountDown: false
                        });
                        ws.$emit('unlockDocument', message.error + ':forma');
                    }

                });
                ws.$on('findForma6Solutions', function(message){
                    if(Array.isArray(message)){
                        storage.forma6Solutions = message;
                        $rootScope.$apply();
                    }
                });

                ws.$on('findAsrSubType', function(message){
                    if(Array.isArray(message)){
                        storage.forma6Solutions = message;
                        $rootScope.$apply();
                    }
                });

                ws.$on('getDocsByTagsspatchersForma6', function(message){
                    if(Array.isArray(message)) storage.dispForms6 = message;
                    $rootScope.$apply();
                });

                ws.$on('getDispatchersForma6', function(message){
                    if(Array.isArray(message)) storage.dispForms6 = message;
                    var currentListOfFormsId = _.map(storage.dispForms6, function(forma){
                        return forma.fireActId + ':forma';
                    });
                    ws.$emit('listLocks', currentListOfFormsId);
                    storage.hideLoadingOverlay = true;
                    $rootScope.$apply();
                });

                //Arch


                ws.$on('errorMessage', function(message){
                    var formattedMessageString = //"#" + message.num + "<br>" +
                        "<b>" + message.name + "</b>" + "<br>" +
                        message.descr;
                    switch(message.level){
                        case 0:
                            growl.error(formattedMessageString, {
                                ttl: 4000,
                                disableCountDown: false
                            });
                            break;
                        case 1:
                            growl.warning(formattedMessageString, {
                                ttl: 4000,
                                disableCountDown: false
                            });
                            break;
                        default :
                            growl.error("Неопознанная ошибка", {
                                ttl: 4000,
                                disableCountDown: false
                            });
                            break;
                    }
                    console.error('Ошибка: ', formattedMessageString);
                });

//TODO: Делалось для выхода пользователя из системы при разрыве сокета.
                /*
                 ws.$on('restart', function(){
                 logoutUserFromSystem();
                 });
                 */

                ws.$on('changeGlobalCaraul', function(message){
                    storage.globalSettings.currentCaraul = message;

                    if(storage.controllers.bydept){
                        if(storage.controllers.bydept.selectedDept){
                            if(storage.controllers.bydept.currentCaraul){
                                var temp = _.find(storage.controllers.bydept.selectedDept.caraulCrews, function(caraul){
                                    return caraul.caraulNum === storage.globalSettings.currentCaraul;
                                });
                                storage.controllers.bydept.currentCaraul = angular.merge({}, temp);

                                growl.warning('СМЕНА КАРАУЛОВ!', {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                        }
                    }
                    $rootScope.$apply();
                });
                ws.$on('changeRepairState', function(message){
                    var dept = _.find(storage.fireDepartments, function(dept){
                        return dept.id === message.deptId
                    });
                    var eq = _.find(dept.fireEquipments, function(eq){
                        return eq.id === message.eq.id
                    });
                    eq = message.eq;
                    $rootScope.$apply();
                });
                function updateBridges(message){
                    angular.merge(storage.bridges, message);
                }

                ws.$on('getBridges', function(message){
                    updateBridges(message);
                    $rootScope.$apply();
                });
                ws.$on('updateBridges', function(message){
                    updateBridges(message);
                    $rootScope.$apply();
                });
                ws.$on('adminChangeBridgeScheduler', function(message){
                    var bridge = _.find(storage.bridges, function(bridge){
                        return bridge.id === message.bridge.id;
                    });
                    switch(message.mode){
                        case "closeBridge":{
                            //bridge = message.bridge;
                            angular.merge(bridge, message.bridge);
                            growl.success(bridge.bridgeName + ' разведен', {
                                ttl: 4000,
                                disableCountDown: false
                            });
                            $rootScope.$apply();
                            break;
                        }
                        case "openBridge":{
                            //bridge = message.bridge;
                            angular.merge(bridge, message.bridge);
                            growl.success(bridge.bridgeName + ' сведен', {
                                ttl: 4000,
                                disableCountDown: false
                            });
                            $rootScope.$apply();
                            break;
                        }
                        case "saveBridge":{
                            angular.copy(message.bridge, bridge);
                            //growl.success(bridge.bridgeName + ' успешно сохранен');
                            $rootScope.$apply();
                        }
                    }
                });
                ws.$on('changeEngineComment', function(message){
                    var dept = _.find(storage.fireDepartments, function(dept){
                        return dept.id === message.deptId;
                    });
                    if(dept === undefined){
                        growl.warning('Некорректное сообщение от сервера, такой ПЧ нет', {
                            ttl: 4000,
                            disableCountDown: false
                        })
                    } else {
                        var engine = _.find(dept.fireEngines, function(engine){
                            return engine.idFireEngine === message.engineId;
                        });
                        if(engine === undefined){
                            growl.warning('Некорректное сообщение от сервера, такой машины в ПЧ нет', {
                                ttl: 4000,
                                disableCountDown: false
                            });
                        } else {
                            engine.comment = message.comment;
                        }
                    }
                    $rootScope.$apply();
                });
                ws.$on('changeStateComment', function(message){
                    var dept = _.find(storage.fireDepartments, function(dept){
                        return dept.id === message.deptId;
                    });
                    if(dept === undefined){
                        growl.warning('Некорректное сообщение от сервера, такой ПЧ нет', {
                            ttl: 4000,
                            disableCountDown: false
                        })
                    } else {
                        var engine = _.find(dept.fireEngines, function(engine){
                            return engine.idFireEngine === message.engineId;
                        });
                        if(engine === undefined){
                            growl.warning('Некорректное сообщение от сервера, такой машины в ПЧ нет', {
                                ttl: 4000,
                                disableCountDown: false
                            });
                        } else {
                            engine.commentSZ = message.commentSZ;
                        }
                    }
                    $rootScope.$apply();
                });
                ws.$on('toggleFirstAcOrNot', function(message){
                    //{"event":"toggleFirstAcOrNot","data":{"deptId":"54a1475a912c074479195f91","engineId":"567969696590077afd805dc1","isFirstTank":true}}
                    var dept = _.find(storage.fireDepartments, function(dept){
                        return dept.id === message.deptId;
                    });
                    if(dept === undefined){
                        growl.warning('Некорректное сообщение от сервера, такой ПЧ нет', {
                            ttl: 4000,
                            disableCountDown: false
                        });
                    } else {
                        var engine = _.find(dept.fireEngines, function(engine){
                            return engine.idFireEngine === message.engineId;
                        });
                        if(engine === undefined){
                            growl.warning('Некорректное сообщение от сервера, такой машины в ПЧ нет', {
                                ttl: 4000,
                                disableCountDown: false
                            });
                        } else {
                            engine.isFirstTank = message.isFirstTank;
                        }
                    }
                });
                ///////// ALL ABOUT PLACE SELECTORS IN NEW AND EDIT ORDER //////
                function cleanNewOrderArrays(mask){
                    if(mask[0] === '1'){
                        delete storage.dataOfStates.newFireOrder.streetsArray;
                        storage.dataOfStates.newFireOrder.streetsArray = [];
                    }
                    if(mask[1] === '1'){
                        delete storage.dataOfStates.newFireOrder.housesArray;
                        storage.dataOfStates.newFireOrder.housesArray = [];
                    }
                    if(mask[2] === '1'){
                        delete storage.dataOfStates.newFireOrder.objectsArray;
                        storage.dataOfStates.newFireOrder.objectsArray = [];
                    }
                    if(mask[3] === '1'){
                        delete storage.dataOfStates.newFireOrder.crossesArray;
                        storage.dataOfStates.newFireOrder.crossesArray = [];
                    }
                    if(mask[4] === '1'){
                        delete storage.dataOfStates.newFireOrder.tripletsArray;
                        // storage.dataOfStates.newFireOrder.tripletsArray = [];
                    }
                    if(mask[5] === '1'){
                        delete storage.dataOfStates.newFireOrder.objectsByHouseArray;
                        storage.dataOfStates.newFireOrder.objectsByHouseArray = [];
                    }
                }

                function cleanEditOrderArrays(mask){
                    if(mask[0] === '1'){
                        delete storage.dataOfStates.newFireOrder.streetsArray;
                        storage.dataOfStates.newFireOrder.streetsArray = [];
                    }
                    if(mask[1] === '1'){
                        delete storage.dataOfStates.newFireOrder.housesArray;
                        storage.dataOfStates.newFireOrder.housesArray = [];
                    }
                    if(mask[2] === '1'){
                        delete storage.dataOfStates.newFireOrder.objectsArray;
                        storage.dataOfStates.newFireOrder.objectsArray = [];
                    }
                    if(mask[3] === '1'){
                        delete storage.dataOfStates.newFireOrder.crossesArray;
                        storage.dataOfStates.newFireOrder.crossesArray = [];
                    }
                    if(mask[4] === '1'){
                        delete storage.dataOfStates.newFireOrder.tripletsArray;
                        storage.dataOfStates.newFireOrder.tripletsArray = [];
                    }
                    if(mask[5] === '1'){
                        delete storage.dataOfStates.newFireOrder.objectsByHouseArray;
                        storage.dataOfStates.newFireOrder.objectsByHouseArray = [];
                    }
                }


                function getEmitStreets(message){
                    if($state.is('fires.newFireOrder')){
                        cleanNewOrderArrays('111111');
                        currentPlaceArraysStorage = storage.dataOfStates.newFireOrder;
                    }

                    if($state.is('fires.orderEdit')){
                        cleanEditOrderArrays('111111');
                        currentPlaceArraysStorage = storage.dataOfStates.editFireOrder;
                    }
                    currentPlaceArraysStorage.streetsArray = [];
                    if(angular.isArray(message) && message.length > 0){
                        var excludeDublicates = {};

                        message.forEach(function(street){
                            if(!excludeDublicates.hasOwnProperty(street.street) || (excludeDublicates.hasOwnProperty(street.street) && excludeDublicates[street.street].raionName !== street.raionName)){
                                excludeDublicates[street.street] = street;
                                currentPlaceArraysStorage.streetsArray.push(street);
                            }
                        });
                        excludeDublicates = null;
                        // currentPlaceArraysStorage.streetsArray = message;
                        /*
                         _.each(currentPlaceArraysStorage.streetsArray, function(street){
                         if(street.naStreet === true){
                         street.settName = storage.manualInputValue;
                         }
                         });
                         */
                    }
                    // currentPlaceArraysStorage = null;
                    $rootScope.$apply();
                };


                var currentPlaceArraysStorage = null;
                storage.clientSettings.streetsTimestamp = 1;

                ws.$on('findPlaceStreets', function(message){

                    if(!!storage.clientSettings.streetsTimestamp === true &&
                        (!storage.clientSettings.streetsTimestamp ||
                        (parseInt(storage.clientSettings.streetsTimestamp, 10) < parseInt(message.timestamp, 10)))){
                        // console.log('streetsEmit', parseInt(message.timestamp, 10) , parseInt(storage.clientSettings.streetsTimestamp, 10));

                        storage.clientSettings.streetsTimestamp = message.timestamp;


                        var addresses = message.addresses.filter(function(addrr){

                            return addrr.code === (($state.current.name === 'fires.newFireOrder')? storage.dataOfStates.newFireOrder.fireAct.firePlace.region.code : storage.dataOfStates.editFireOrder.fireAct.firePlace.region.code);
                        });


                        getEmitStreets(addresses);

                    }
                });


                ws.$on('findSubdistrictsStreet', function(message){


                    getEmitStreets(message.addresses);
                });


                ws.$on('findPlaceObjects', function(message){
                    if($state.is('fires.newFireOrder')){
                        cleanNewOrderArrays('111111');
                        currentPlaceArraysStorage = storage.dataOfStates.newFireOrder;
                    }
                    if($state.is('fires.orderEdit')){
                        cleanEditOrderArrays('111111');
                        currentPlaceArraysStorage = storage.dataOfStates.editFireOrder;
                    }
                    if(angular.isArray(message)){
                        angular.copy(message, currentPlaceArraysStorage.objectsArray);
                        $rootScope.$applyAsync();
                    }
                });
                ws.$on('findPlaceCrossStreets', function(message){
                    if($state.is('fires.newFireOrder')){
                        cleanNewOrderArrays('101111');
                        // currentPlaceArraysStorage = storage.dataOfStates.newFireOrder;
                        storage.dataOfStates.newFireOrder.firePlace = (message.hasOwnProperty('firePlace'))? Object.assign({}, message.firePlace) : {};
                        storage.dataOfStates.newFireOrder.crossesArray = (message.hasOwnProperty('addresses'))? message.addresses : [];

                    }
                    if($state.is('fires.orderEdit')){
                        cleanEditOrderArrays('101111');
                        storage.dataOfStates.editFireOrder.firePlace = (message.hasOwnProperty('firePlace'))? Object.assign({}, message.firePlace) : {};
                        storage.dataOfStates.editFireOrder.crossesArray = (message.hasOwnProperty('addresses'))? message.addresses : [];

                        // currentPlaceArraysStorage = storage.dataOfStates.editFireOrder;
                    }


                    /*

                     var place = message.firePlace;
                     var crossesArray = message.addresses;
                     if(angular.isDefined(place)){
                     angular.copy(place, currentPlaceArraysStorage.fireAct.firePlace);
                     }
                     if(angular.isArray(crossesArray)){
                     angular.copy(crossesArray, currentPlaceArraysStorage.crossesArray);
                     }
                     */
                    $rootScope.$apply();
                });
                ws.$on('selectPlaceStreet', function(message){
                    // message.firePlace.address.district = String.normalize(message.firePlace.address.district);
                    // console.log('message >', message.firePlace.address.raionName);
                    if($state.is('fires.newFireOrder')){
                        cleanNewOrderArrays('111011');
                        currentPlaceArraysStorage = storage.dataOfStates.newFireOrder;
                    }
                    if($state.is('fires.orderEdit')){
                        cleanEditOrderArrays('111011');
                        currentPlaceArraysStorage = storage.dataOfStates.editFireOrder;
                    }
                    var place = Object.assign({}, message.firePlace);
                    var housesArray = message.addresses;
                    var trueAddress = _.find(housesArray, function(address){
                        return address.house == currentPlaceArraysStorage.fireAct.firePlace.address.house
                    });
                    if(trueAddress != undefined){
                        place.address = trueAddress;
                    } else {
                        // if(currentPlaceArraysStorage.fireAct.firePlace.address.house != ''){
                        if(!!currentPlaceArraysStorage.fireAct.firePlace.address.house === false){
                            place.address.house = currentPlaceArraysStorage.fireAct.firePlace.address.house;
                            place.address.manualHouse = null;

                        }
                    }


                    if(storage.selectedFire !== undefined && place !== undefined &&
                        storage.selectedFire.firePlace.address.street == place.address.street &&
                        storage.selectedFire.firePlace.address.house == place.address.house){
                        place.pchId = storage.selectedFire.firePlace.pchId;
                        place.pchName = storage.selectedFire.firePlace.pchName;
                        place.triplet = storage.selectedFire.firePlace.triplet;
                        place.address.district = storage.selectedFire.firePlace.address.district;
                    }

                    if(currentPlaceArraysStorage.mode != 3){
                        if(angular.isDefined(place)){
                            // angular.copy(place, currentPlaceArraysStorage.fireAct.firePlace);
                            currentPlaceArraysStorage.fireAct.firePlace = Object.assign({}, place);
                        }

                        if(angular.isArray(housesArray)){
                            // Array.prototype.push.apply(storage.dataOfStates.newFireOrder.housesArray, housesArray);
                            // currentPlaceArraysStorage.housesArray = Object.assign({}, housesArray);
                            angular.copy(housesArray, currentPlaceArraysStorage.housesArray);

                        }
                        if(place.address.naHouse){
                            if(angular.isDefined(place.pchId)){
                                var message2 = place;
                                ws.$emit('selectPlaceDepartment', message2);
                            }
                        }
                    }
                    // console.log('place >', place);
                    if($state.is('fires.newFireOrder')){
                        storage.dataOfStates.newFireOrder.objectsByHouseArray = [];
                    }
                    if($state.is('fires.orderEdit')){

                        if(!!place.pchId === true){
                            ws.$emit('selectPlaceDepartment', place);
                        }


                        storage.dataOfStates.editFireOrder.objectsByHouseArray = [];


                    }

                    message.addresses.forEach(
                        function(elem){

                            if(elem.hasOwnProperty('fireObjects')){

                                if($state.is('fires.newFireOrder')){
                                    Array.prototype.push.apply(storage.dataOfStates.newFireOrder.objectsByHouseArray, elem.fireObjects);
                                }
                                if($state.is('fires.orderEdit')){
                                    Array.prototype.push.apply(storage.dataOfStates.editFireOrder.objectsByHouseArray, elem.fireObjects);
                                }

                            }

                        }
                    );


                    // storage.dataOfStates.newFireOrder.housesArray.splice(1, 9);
                    /*                    storage.dataOfStates.newFireOrder.housesArray.forEach(function(elem, idx){

                     storage.dataOfStates.newFireOrder.housesArray[idx] = Object.assign({}, {
                     "regName": "Санкт-Петербург",
                     "regId": 141,
                     "settName": "Санкт-Петербург",
                     "settId": 36,
                     "district": "Приморский район",
                     "geomX": 30.32803245826385,
                     "geomY": 59.98480615020203,
                     "street": "Белоостровская улица",
                     "naStreet": false,
                     "house": "6",
                     "naHouse": false,
                     "manualHouse": null,
                     "osm_id": -2201314,
                     "fireObjects": []
                     });


                     /!*
                     elem.settName = "Санкт-Петербург";
                     elem.settId = 36;
                     elem.geomX = 30.32803245826385;
                     elem.geomY = 59.98480615020203;
                     elem.osm_id = 25883203;
                     elem.fireObjects = [];
                     *!/
                     });*/
                    storage.dataOfStates.newFireOrder.settings.isHousesEmitSending = false;
                    $rootScope.$apply();
                });
                ws.$on('selectPlaceObject', function(message){
                    if($state.is('fires.newFireOrder')){
                        cleanNewOrderArrays('111110');
                        currentPlaceArraysStorage = storage.dataOfStates.newFireOrder;
                    }
                    if($state.is('fires.orderEdit')){
                        cleanEditOrderArrays('111110');
                        currentPlaceArraysStorage = storage.dataOfStates.editFireOrder;
                    }
                    var place = message.firePlace;
                    if(angular.isDefined(place)){
                        angular.copy(place, currentPlaceArraysStorage.fireAct.firePlace);
                    }
                    currentPlaceArraysStorage.fireAct.rank = _.find(storage.rangs, function(rank){
                        return rank.sidfirerank === currentPlaceArraysStorage.fireAct.firePlace.fireObject.rank;
                    });
                    $rootScope.$apply();
                });
                ws.$on('selectPlaceHouse', function(message){
                    if($state.is('fires.newFireOrder')){
                        cleanNewOrderArrays('101111');
                        currentPlaceArraysStorage = storage.dataOfStates.newFireOrder;
                    }
                    if($state.is('fires.orderEdit')){
                        cleanEditOrderArrays('101111');
                        currentPlaceArraysStorage = storage.dataOfStates.editFireOrder;
                    }
                    // console.log(currentPlaceArraysStorage);
                    var place = message.firePlace;
                    var objectsArray = message.objects;
                    if(storage.selectedFire !== undefined && place !== undefined &&
                        storage.selectedFire.firePlace.address.street == place.address.street &&
                        storage.selectedFire.firePlace.address.house == place.address.house){
                        place.pchId = storage.selectedFire.firePlace.pchId;
                        place.pchName = storage.selectedFire.firePlace.pchName;
                        place.triplet = storage.selectedFire.firePlace.triplet;
                        place.address.district = storage.selectedFire.firePlace.address.district;
                    }


                    if(currentPlaceArraysStorage.mode != 3){
                        if(angular.isDefined(place)){
                            angular.copy(place, currentPlaceArraysStorage.fireAct.firePlace);
                        }
                        if(angular.isArray(objectsArray)){
                            angular.copy(objectsArray, currentPlaceArraysStorage.objectsByHouseArray);
                        }
                        if(place.address.naHouse){
                            if(angular.isDefined(place.pchId)){
                                var message2 = place;
                                message2.pchId = place.pchId;
                                message2.pchName = place.pchName;
                                ws.$emit('selectPlaceDepartment', message2);
                            }
                        }
                    }


                    /*
                     console.log('place >>>', place);
                     console.log('message >>>', message);
                     */
                    $rootScope.$apply();
                });

                ws.$on('action', function(message){

                    if(!!message === true){

                        // delete message.fireAct.card112WithBean.card112;

                        // console.log('message.fireAct', message.fireAct);
                        storage.action = Object.assign({}, message);

                        if(message.hasOwnProperty('mode')){

                            switch(message.mode){

                                case 0:
                                    $state.go('fires.newFireOrder', {
                                        deptId: undefined,
                                        fireId: undefined,
                                        fireType: 0
                                    });

                            }

                        }
                    }

                });

                ws.$on('selectPlaceCross', function(message){
                    if($state.is('fires.newFireOrder')){
                        cleanNewOrderArrays('111011');
                        currentPlaceArraysStorage = storage.dataOfStates.newFireOrder;
                    }
                    if($state.is('fires.orderEdit')){
                        cleanEditOrderArrays('111011');
                        currentPlaceArraysStorage = storage.dataOfStates.editFireOrder;
                    }
                    cleanNewOrderArrays('111011');
                    var place = message.firePlace;
                    if(angular.isDefined(place) && currentPlaceArraysStorage.mode != 3){
                        angular.copy(place, currentPlaceArraysStorage.fireAct.firePlace);
                    }
                    $rootScope.$apply();
                });
                ws.$on('selectPlaceDepartment', function(message){
                    // console.log('1---->', message);
                    switch($state.current.name){

                        case 'fires.newFireOrder':
                            cleanNewOrderArrays('101010');
                            // && message.firePlace instanceof Array
                            if(message.hasOwnProperty('firePlace')){
                                storage.dataOfStates.newFireOrder.fireAct.firePlace = Object.assign(message.firePlace);
                                // if(!!storage.dataOfStates.newFireOrder.deptUISelectDeptField === true){

                                /*
                                 storage.controllers.newFireOrder.deptUISelectDeptField = message.firePlace.pchName;
                                 storage.dataOfStates.newFireOrder.deptUISelectDeptField = message.firePlace.pchName;
                                 */
                                // }


                            }
                            if(message.hasOwnProperty('triplets') && message.triplets instanceof Array){
                                storage.dataOfStates.newFireOrder.tripletsArray = message.triplets;

                                if(storage.dataOfStates.newFireOrder.fireAct.firePlace.address.naStreet){
                                    storage.dataOfStates.newFireOrder.fireAct.firePlace.triplet = message.triplets[0];
                                }


                                /*
                                 storage.controllers.newFireOrder.fireAct.firePlace.triplet = message.triplets;
                                 storage.dataOfStates.newFireOrder.fireAct.firePlace.triplet = message.triplets;
                                 */


                            }


                            /*
                             console.log(storage.dataOfStates.newFireOrder.deptUISelectDeptField, storage.dataOfStates.newFireOrder.fireAct.firePlace.triplet);
                             console.log(' storage.controllers',  storage.controllers);
                             console.log('.newFireOrder.deptUISelectDeptField > ', JSON.stringify(storage.controllers.newFireOrder.deptUISelectDeptField));
                             */
                            // console.log('22---->',  storage.controllers.newFireOrder.fireAct);

                            break;

                        case 'fires.orderEdit':
                            cleanNewOrderArrays('101010');
                            if(message.hasOwnProperty('firePlace') && message.firePlace instanceof Array){
                                storage.dataOfStates.editFireOrder.fireAct.firePlace = message.firePlace;
                            }
                            if(message.hasOwnProperty('triplets') && message.triplets instanceof Array){
                                storage.dataOfStates.editFireOrder.tripletsArray = message.triplets;
                            }
                            break;

                    }
                    $rootScope.$apply();


                    /*
                     if($state.is('fires.newFireOrder')){
                     cleanNewOrderArrays('101110');
                     // cleanNewOrderArrays('101111');
                     currentPlaceArraysStorage = storage.dataOfStates.newFireOrder;
                     }
                     if($state.is('fires.orderEdit')){
                     cleanEditOrderArrays('101110');
                     // cleanEditOrderArrays('101111');
                     currentPlaceArraysStorage = storage.dataOfStates.editFireOrder;
                     }
                     var place = message.firePlace;
                     var tripletsArray = message.triplets;
                     if(angular.isDefined(place)){
                     angular.copy(place, currentPlaceArraysStorage.fireAct.firePlace);
                     }
                     if(angular.isArray(tripletsArray) && tripletsArray.length > 0){
                     angular.copy(tripletsArray, currentPlaceArraysStorage.tripletsArray);
                     }
                     */

                });


                //////////////////////////////ADMIN////////////////////////////////
                ws.$on('adminDepts', function(message){
                    // console.log(JSON.stringify(message));
                    var modelFromServer = message.dept;
                    switch(message.mode){
                        case "save":
                            var element = _.find(storage.fireDepartments, function(obj){
                                return obj.id === modelFromServer.id;
                            });
                            if(element === undefined){
                                storage.fireDepartments.push(modelFromServer);
                                growl.success("Добавлена новая ПЧ: \"" + modelFromServer.fireDeptName + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            else {
                                element = jQuery.extend(true, element, modelFromServer);
                                if(storage.pages.depts.activeModel){
                                    if(storage.pages.depts.activeModel.id === modelFromServer.id){
                                        storage.pages.depts.activeModel = jQuery.extend(true, {}, modelFromServer);
                                    }
                                }
                                growl.success("Изменёна пожарная часть: \"" + modelFromServer.fireDeptName + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            break;
                        case "delete":
                            var indexOfElement = _.findIndex(storage.fireDepartments, function(obj){
                                return obj.id === modelFromServer.id;
                            });
                            if(indexOfElement === -1){
                                console.error("не удалось удалить:" + JSON.stringify(modelFromServer) + ", ибо элемент не найден");
                                growl.error("Не удалось удалить ПЧ: \"" + modelFromServer.fireDeptName + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            else {
                                storage.fireDepartments.splice(indexOfElement, 1);
                                if(storage.pages.depts.activeModel){
                                    if(storage.pages.depts.activeModel.id === modelFromServer.id){
                                        storage.pages.depts.activeModel = null;
                                    }
                                }
                                growl.warning("Удалёна ПЧ: \"" + modelFromServer.fireDeptName + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            break;
                        case "getNew":
                            if(controllers.depts){
                                controllers.depts.point = null;
                                controllers.depts.page.activeModel = modelFromServer;
                                controllers.depts.isNewModel = true;
                                //controllers.depts.clearIcon();
                                //controllers.depts.clearIconColor();
                                controllers.depts.tempLayer.getSource().clear();
                                controllers.depts.pointWasChoosed = false;
                                controllers.depts.countedAsoArr = [];
                                controllers.depts.choosedCaraul = null;
                                //$state.transitionTo($state.current, {deptId: modelFromServer.id}, {notify: false});
                            }
                            break;
                        default :
                            console.error("UNDEFINED MSG FROM SERVER!!!");
                            growl.error("Неопознанное сообщение от сервера!", {
                                ttl: 4000,
                                disableCountDown: false
                            });
                            break;
                    }
                    $rootScope.$apply();
                });
                ws.$on('adminEqTypeDict', function(message){
                    // console.log(message);
                    var modelFromServer = message.eqTypeDictItem;
                    switch(message.mode){
                        case "save":
                            var element = _.find(storage.eqtypes, function(obj){
                                return obj.id === modelFromServer.id;
                            });
                            if(element === undefined){
                                storage.eqtypes.push(modelFromServer);
                                growl.success("Добавлен новый тип экипировки: \"" + modelFromServer.name + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            else {
                                //element = modelFromServer;
                                element.code = modelFromServer.code;
                                element.name = modelFromServer.name;
                                element.icon = modelFromServer.icon;
                                element.iconColor = modelFromServer.iconColor;
                                if(storage.pages.eqtypes.activeModel){
                                    if(storage.pages.eqtypes.activeModel.id === modelFromServer.id){
                                        storage.pages.eqtypes.activeModel = jQuery.extend(true, {}, modelFromServer);
                                    }
                                }
                                growl.success("Изменён тип экипировки: \"" + modelFromServer.name + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            break;
                        case "delete":
                            var indexOfElement = _.findIndex(storage.eqtypes, function(obj){
                                return obj.id === modelFromServer.id;
                            });
                            if(indexOfElement === -1){
                                console.error("не удалось удалить:" + JSON.stringify(modelFromServer) + ", ибо элемент не найден");
                                growl.error("Не удалось удалить тип экипировки: \"" + modelFromServer.name + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            else {
                                storage.eqtypes.splice(indexOfElement, 1);
                                if(storage.pages.eqtypes.activeModel){
                                    if(storage.pages.eqtypes.activeModel.id === modelFromServer.id){
                                        storage.pages.eqtypes.activeModel = null;
                                    }
                                }
                                growl.warning("Удалён тип экипировки: \"" + modelFromServer.name + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            break;
                        default :
                            console.error("UNDEFINED MSG FROM SERVER!!!");
                            growl.error("Неопознанное сообщение от сервера!", {
                                ttl: 4000,
                                disableCountDown: false
                            });
                            break;
                    }
                });
                ws.$on('adminF6FieldHelperSearch', function(message){
                    // console.log(message);
                    $state.params.tableId = 'search';
                    storage.pages.f6fieldHelper.activeTable = true;
                    storage.pages.f6fieldHelper.collection = message;
                    $rootScope.$apply();
                });
                ws.$on('adminF6FieldHelper', function(message){
                    //console.log("MESSAGE FROM SERVER");
                    // console.log(message);
                    var modelFromServer = message.f6Field;
                    var tableNo = modelFromServer.table;

                    var table = _.find(storage.f6fieldHelper, function(obj){
                        return obj.id == tableNo;
                    });

                    switch(message.mode){
                        case "save":
                            var element = _.find(table.array, function(obj){
                                return obj.id === modelFromServer.id;
                            });
                            if(element === undefined){
                                table.array.push(modelFromServer);
                                growl.success("Добавлен новый элемент в кодификатор:", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            else {
                                //element = modelFromServer;
                                element = angular.merge(element, modelFromServer);
                                if(storage.pages.fireStatuses.activeModel){
                                    if(storage.pages.fireStatuses.activeModel.id === modelFromServer.id){
                                        storage.pages.fireStatuses.activeModel = jQuery.extend(true, {}, modelFromServer);
                                    }
                                }
                                growl.success("Изменён элемент кодификатора", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            break;
                        case "delete":
                            var indexOfElement = _.findIndex(table.array, function(obj){
                                return obj.id === modelFromServer.id;
                            });
                            if(indexOfElement === -1){
                                console.error("не удалось удалить:" + JSON.stringify(modelFromServer) + ", ибо элемент не найден");
                                growl.error("Не удалось удалить элемент кодификатора", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            else {
                                table.array.splice(indexOfElement, 1);
                                if(storage.pages.f6fieldHelper.activeModel){
                                    if(storage.pages.f6fieldHelper.activeModel.id === modelFromServer.id){
                                        storage.pages.f6fieldHelper.activeModel = null;
                                    }
                                }
                                //$rootScope.$apply();
                                growl.warning("Удалён элемент кодификатора", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            break;
                        default :
                            console.error("UNDEFINED MSG FROM SERVER!!!");
                            growl.error("Неопознанное сообщение от сервера!", {
                                ttl: 4000,
                                disableCountDown: false
                            });
                            break;
                    }
                    //storage.rangs = message;
                    $rootScope.$apply();
                });
                ws.$on('adminFireNotifications', function(message){
                    // console.log(JSON.stringify(message));
                    var modelFromServer = message.fireNotification;
                    // console.log('message >', message);
                    switch(message.mode){
                        case "save":
                            var element = _.find(storage.fireNotifications, function(obj){
                                return obj.id === modelFromServer.id;
                            });
                            if(element === undefined){
                                storage.fireNotifications.push(modelFromServer);
                                growl.success("Добавлена новая должность: \"" + modelFromServer.who + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            else {
                                element = jQuery.extend(true, element, modelFromServer);
                                if(storage.pages.fireNotifications.activeModel){
                                    if(storage.pages.fireNotifications.activeModel.id === modelFromServer.id){
                                        storage.pages.fireNotifications.activeModel = jQuery.extend(true, {}, modelFromServer);
                                    }
                                }
                                growl.success("Изменена должность: \"" + modelFromServer.who + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            break;
                        case "delete":
                            var indexOfElement = _.findIndex(storage.fireNotifications, function(obj){
                                return obj.id === modelFromServer.id;
                            });
                            if(indexOfElement === -1){
                                console.error("не удалось удалить:" + JSON.stringify(modelFromServer) + ", ибо элемент не найден");
                                growl.error("Не удалось удалить статус: \"" + modelFromServer.who + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            else {
                                storage.fireNotifications.splice(indexOfElement, 1);
                                if(storage.pages.fireNotifications.activeModel){
                                    if(storage.pages.fireNotifications.activeModel.id === modelFromServer.id){
                                        storage.pages.fireNotifications.activeModel = null;
                                    }
                                }
                                growl.warning("Удалён статус: \"" + modelFromServer.who + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            break;
                        default :
                            console.error("UNDEFINED MSG FROM SERVER!!!");
                            growl.error("Неопознанное сообщение от сервера!", {
                                ttl: 4000,
                                disableCountDown: false
                            });
                            break;
                    }
                    $rootScope.$apply();
                });
                ws.$on('adminFireStatuses', function(message){
                    // console.log("MESSAGE FROM SERVER");
                    // console.log(message);
                    var modelFromServer = message.fireStatus;
                    switch(message.mode){
                        case "save":
                            var element = _.find(storage.fireStatuses, function(obj){
                                return obj.id === modelFromServer.id;
                            });
                            if(element === undefined){
                                storage.fireStatuses.push(modelFromServer);
                                growl.success("Добавлен новый статус пожаров: \"" + modelFromServer.status + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            else {
                                element = jQuery.extend(true, element, modelFromServer);
                                if(storage.pages.fireStatuses.activeModel){
                                    if(storage.pages.fireStatuses.activeModel.id === modelFromServer.id){
                                        storage.pages.fireStatuses.activeModel = jQuery.extend(true, {}, modelFromServer);
                                    }
                                }
                                growl.success("Изменён статус пожаров: \"" + modelFromServer.status + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            //$rootScope.$apply();
                            break;
                        case "delete":
                            var indexOfElement = _.findIndex(storage.fireStatuses, function(obj){
                                return obj.id === modelFromServer.id;
                            });
                            if(indexOfElement === -1){
                                console.error("не удалось удалить:" + JSON.stringify(modelFromServer) + ", ибо элемент не найден");
                                growl.error("Не удалось удалить статус: \"" + modelFromServer.status + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            else {
                                storage.fireStatuses.splice(indexOfElement, 1);
                                if(storage.pages.fireStatuses.activeModel){
                                    if(storage.pages.fireStatuses.activeModel.id === modelFromServer.id){
                                        storage.pages.fireStatuses.activeModel = null;
                                    }
                                }
                                growl.warning("Удалён статус: \"" + modelFromServer.status + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            break;
                        default :
                            console.error("UNDEFINED MSG FROM SERVER!!!");
                            growl.error("Неопознанное сообщение от сервера!", {
                                ttl: 4000,
                                disableCountDown: false
                            });
                            break;
                    }
                    //storage.rangs = message;
                    $rootScope.$apply();
                });
                ws.$on('adminAddDept', function(message){
                    var found = storage.fireDepartments.find(function(dept, idx){

                        if(dept.id === message.id){
                            storage.fireDepartments[idx] = null;
                            storage.fireDepartments[idx] = message;
                        }

                    });

                    if(!found){
                        storage.fireDepartments.push(message);
                        //storage.userEditTree.push(newGroup);

                    }

                    storage.pages.newDept = {
                        fireDeptName: "",
                        x: null,
                        y: null,
                        icon: "",
                        iconColor: "#000000"
                    };

                    $state.go('edit.depts', {deptId: message.id});

                });
                ws.$on('adminNewDept', function(message){
                    growl.success(message.dept.fireDeptName, ' успешно сохранена!', {
                        ttl: 4000,
                        disableCountDown: false
                    });
                    $state.go('edit.depts');
                    storage.pages.NewDept.activeModel = {
                        fireDeptName: "",
                        deptMapPoint: {
                            x: null,
                            y: null
                        },
                        icon: "",
                        iconColor: "#000000"
                    }
                });
                ws.$on('adminMapObject', function(message){
                    storage.organizationSettings = message;
                    growl.success('Операция успешно завершена', {
                        ttl: 4000,
                        disableCountDown: false
                    });
                });
                ws.$on('adminOpo', function(message){
                    // console.log(JSON.stringify(message));
                    var modelFromServer = message.opo;
                    switch(message.mode){
                        case "save":
                            var element = _.find(storage.opo, function(obj){
                                return obj.opoId === modelFromServer.opoId;
                            });
                            if(element === undefined){
                                storage.opo.push(modelFromServer);
                                growl.success("Добавлена новая ОПО: \"" + modelFromServer.opoName + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            else {
                                /*TODO seems like it is redundant (pages)*/
                                element = jQuery.extend(true, element, modelFromServer);
                                if(storage.pages.opo.activeModel){
                                    if(storage.pages.opo.activeModel.opoId === modelFromServer.opoId){
                                        storage.pages.opo.activeModel = jQuery.extend(true, {}, modelFromServer);
                                    }
                                }
                                growl.success("Изменена ОПО: \"" + modelFromServer.opoName + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            break;
                        case "delete":
                            var indexOfElement = _.findIndex(storage.opo, function(obj){
                                return obj.opoId === modelFromServer.opoId;
                            });
                            if(indexOfElement === -1){
                                console.error("не удалось удалить:" + JSON.stringify(modelFromServer) + ", ибо элемент не найден");
                                growl.error("Не удалось удалить ОПО: \"" + modelFromServer.opoName + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            else {
                                /*TODO seems like it is redundant (pages)*/
                                storage.opo.splice(indexOfElement, 1);
                                if(storage.pages.opo.activeModel){
                                    if(storage.pages.opo.activeModel.opoId === modelFromServer.opoId){
                                        storage.pages.opo.activeModel = null;
                                    }
                                }
                                growl.warning("Удалён ОПО: \"" + modelFromServer.opoName + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            break;
                        default :
                            console.error("UNDEFINED MSG FROM SERVER!!!");
                            growl.error("Неопознанное сообщение от сервера!", {
                                ttl: 4000,
                                disableCountDown: false
                            });
                            break;
                    }
                    $rootScope.$apply();
                });
                ws.$on('adminPso', function(message){
                    // console.log(JSON.stringify(message));
                    var modelFromServer = message.pso;
                    switch(message.mode){
                        case "save":
                            var element = _.find(storage.pso, function(obj){
                                return obj.id === modelFromServer.id;
                            });
                            if(element === undefined){
                                storage.pso.push(modelFromServer);
                                growl.success("Добавлена новая ПСО: \"" + modelFromServer.name + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            else {
                                element = jQuery.extend(true, element, modelFromServer);
                                if(storage.pages.pso.activeModel){
                                    if(storage.pages.pso.activeModel.id === modelFromServer.id){
                                        storage.pages.pso.activeModel = jQuery.extend(true, {}, modelFromServer);
                                    }
                                }
                                growl.success("Изменена ПСО: \"" + modelFromServer.name + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            break;
                        case "delete":
                            var indexOfElement = _.findIndex(storage.pso, function(obj){
                                return obj.id === modelFromServer.id;
                            });
                            if(indexOfElement === -1){
                                console.error("не удалось удалить:" + JSON.stringify(modelFromServer) + ", ибо элемент не найден");
                                growl.error("Не удалось удалить ПСО: \"" + modelFromServer.name + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            else {
                                storage.pso.splice(indexOfElement, 1);
                                if(storage.pages.pso.activeModel){
                                    if(storage.pages.pso.activeModel.id === modelFromServer.id){
                                        storage.pages.pso.activeModel = null;
                                    }
                                }
                                growl.warning("Удалён ПСО: \"" + modelFromServer.name + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            break;
                        default :
                            console.error("UNDEFINED MSG FROM SERVER!!!");
                            growl.error("Неопознанное сообщение от сервера!", {
                                ttl: 4000,
                                disableCountDown: false
                            });
                            break;
                    }
                    $rootScope.$apply();
                });
                ws.$on('adminDeptsFireEquipments', function(message){
                    var mode = message.mode;
                    var modelFromServer = message.fireEquipment;

                    var deptFromServerId = null;
                    if(message.from){
                        deptFromServerId = message.from;
                    }
                    if(message.dept){
                        deptFromServerId = message.dept;
                    }
                    var dept = _.find(storage.fireDepartments, function(dept){
                        return dept.id === deptFromServerId;
                    });
                    var model = _.find(dept.fireEquipments, function(aso){
                        return aso.idFireEquipment === modelFromServer.idFireEquipment;
                    });
                    switch(mode){
                        case 'addNew':
                            dept.fireEquipments.push(modelFromServer);
                            growl.success('Добавлено оборудование ' + modelFromServer.eqType.name + ' В ПЧ №' + dept.fireDeptName, {
                                ttl: 4000,
                                disableCountDown: false
                            });
                            if(storage.pages.aso.activeDeptModel.id === deptFromServerId){
                                storage.pages.aso.asoList.push(modelFromServer);
                            }
                            break;
                        case 'delete':
                            dept.fireEquipments.splice(_.indexOf(dept.fireEquipments, model), 1);
                            growl.success('Удалено оборудование ' + modelFromServer.eqType.name + ' В ПЧ №' + dept.fireDeptName, {
                                ttl: 4000,
                                disableCountDown: false
                            });
                            if(storage.pages.aso.activeDeptModel.id === deptFromServerId){
                                storage.pages.aso.asoList.splice(_.indexOf(storage.pages.aso.asoList, model), 1);
                            }
                            break;
                        case 'transfer':
                            var deptTo = _.find(storage.fireDepartments, function(dept){
                                return dept.id === message.to;
                            });
                            deptTo.fireEquipments.push(modelFromServer);
                            dept.fireEquipments.splice(_.indexOf(modelFromServer, dept.fireEquipments), 1);
                            if(storage.pages.aso.activeDeptModel.id === deptFromServerId){
                                storage.pages.aso.asoList.splice(_.indexOf(modelFromServer, storage.pages.aso.asoList), 1);
                            }
                            break;
                        default :
                            console.error("UNDEFINED MSG FROM SERVER!!!");
                            growl.error("Неопознанное сообщение от сервера!", {
                                ttl: 4000,
                                disableCountDown: false
                            });
                            break;
                    }
                    $rootScope.$apply();
                });

                ws.$on('-changeEngineAttribs', function(message){

                    storage.fireDepartments.find(function(dept){

                        return dept.fireEngines.find(function(engs){


                            if(engs.idFireEngine === message.state.id){

                                // var count = 0;

                                for(var i in message.state){
                                    if(message.state.hasOwnProperty(i) && i !== 'id'){

                                        /*
                                         count ++;
                                         console.log(count,'.1) i >', i, engs.fireEngineState[i], message.state[i]);
                                         */

                                        engs.fireEngineState[i] = message.state[i];

                                        /*
                                         console.log(count,'.2) i >', i, engs.fireEngineState[i], message.state[i]);
                                         */
                                    }
                                }

                                return true;
                            }


                        });

                    });

                    /*
                     var modelFromServer = message.state;
                     switch(message.mode){
                     case "save":
                     var element = _.find(storage.engineStates, function(obj){
                     return obj.id === modelFromServer.id;
                     });
                     if(element === undefined){
                     storage.engineStates.push(modelFromServer);
                     growl.success("Добавлен новый состояние: \"" + modelFromServer.name + "\"", {
                     ttl: 4000,
                     disableCountDown: false
                     });
                     }
                     else {
                     element = jQuery.extend(true, element, modelFromServer);
                     if(storage.pages.engineStates.activeModel){
                     if(storage.pages.engineStates.activeModel.id === modelFromServer.id){
                     storage.pages.engineStates.activeModel = jQuery.extend(true, {}, modelFromServer);
                     }
                     }
                     growl.success("Изменён состояние: \"" + modelFromServer.name + "\"", {
                     ttl: 4000,
                     disableCountDown: false
                     });
                     }
                     break;
                     case "delete":
                     var indexOfElement = _.findIndex(storage.engineStates, function(obj){
                     return obj.id === modelFromServer.id;
                     });
                     if(indexOfElement === -1){
                     console.error("не удалось удалить:" + JSON.stringify(modelFromServer) + ", ибо элемент не найден");
                     growl.error("Не удалось удалить состояние: \"" + modelFromServer.name + "\"", {
                     ttl: 4000,
                     disableCountDown: false
                     });
                     }
                     else {
                     storage.engineStates.splice(indexOfElement, 1);
                     if(storage.pages.engineStates.activeModel){
                     if(storage.pages.engineStates.activeModel.id === modelFromServer.id){
                     storage.pages.engineStates.activeModel = null;
                     }
                     }
                     growl.warning("Удалён состояние: \"" + modelFromServer.name + "\"", {
                     ttl: 4000,
                     disableCountDown: false
                     });
                     }
                     break;
                     default :
                     console.error("UNDEFINED MSG FROM SERVER!!!");
                     growl.error("Неопознанное сообщение от сервера!", {
                     ttl: 4000,
                     disableCountDown: false
                     });
                     break;
                     }
                     //$rootScope.$apply();
                     */
                });
                ws.$on('adminEngineStatuses', function(message){
                    var modelFromServer = message.status;
                    switch(message.mode){
                        case "save":
                            var element = _.find(storage.engineStatuses, function(obj){
                                return obj.id === modelFromServer.id;
                            });
                            if(element === undefined){
                                storage.engineStatuses.push(modelFromServer);
                                growl.success("Добавлен новый состояние: \"" + modelFromServer.name + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            else {
                                element = jQuery.extend(true, element, modelFromServer);
                                if(storage.pages.engineStatuses.activeModel){
                                    if(storage.pages.engineStatuses.activeModel.id === modelFromServer.id){
                                        storage.pages.engineStatuses.activeModel = jQuery.extend(true, {}, modelFromServer);
                                    }
                                }
                                growl.success("Изменён состояние: \"" + modelFromServer.name + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            break;
                        case "delete":
                            var indexOfElement = _.findIndex(storage.engineStatuses, function(obj){
                                return obj.id === modelFromServer.id;
                            });
                            if(indexOfElement === -1){
                                console.error("не удалось удалить:" + JSON.stringify(modelFromServer) + ", ибо элемент не найден");
                                growl.error("Не удалось удалить состояние: \"" + modelFromServer.name + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            else {
                                storage.engineStatuses.splice(indexOfElement, 1);
                                if(storage.pages.engineStatuses.activeModel){
                                    if(storage.pages.engineStatuses.activeModel.id === modelFromServer.id){
                                        storage.pages.engineStatuses.activeModel = null;
                                    }
                                }
                                growl.warning("Удалён состояние: \"" + modelFromServer.name + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            break;
                        default :
                            console.error("UNDEFINED MSG FROM SERVER!!!");
                            growl.error("Неопознанное сообщение от сервера!", {
                                ttl: 4000,
                                disableCountDown: false
                            });
                            break;
                    }
                    //$rootScope.$apply();
                });
                ws.$on('adminFirerankModificators', function(message){
                    var mode = message.mode;
                    var modFromServer = message.firerankModificator;
                    var firerankType = _.find(storage.firerankModificators, function(firerankType){
                        return firerankType.id === modFromServer.id;
                    });
                    switch(mode){
                        case 'save':
                            if(firerankType === undefined){
                                storage.firerankModificators.push(modFromServer);
                                growl.success("Добавлен новый модификатор:" + modFromServer.nameFirerankModificator, {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            } else {
                                angular.merge(firerankType, modFromServer);
                                growl.success("Изменен модификатор:" + modFromServer.nameFirerankModificator, {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            break;
                        case 'delete':
                            if(firerankType === undefined){
                                growl.error("удаляемого модификатора в справочнике нет!!!" + modFromServer.nameFirerankModificator, {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            } else {
                                var indexOfElement = _.findIndex(storage.firerankModificators, function(obj){
                                    return obj.id === firerankType.id;
                                });
                                storage.firerankModificators.splice(indexOfElement, 1);
                                growl.warning("удаляемого модификатора в справочнике нет!!!" + modFromServer.nameFirerankModificator, {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            break;
                        default :
                            console.error("UNDEFINED MSG FROM SERVER!!!");
                            growl.error("Неопознанное сообщение от сервера!", {
                                ttl: 4000,
                                disableCountDown: false
                            });
                            break;
                    }
                    $rootScope.$apply();

                });
                ws.$on('adminFirerankTypes', function(message){
                    var mode = message.mode;
                    var typeFromServer = message.firerankType;
                    var firerankType = _.find(storage.firerankTypes, function(firerankType){
                        return firerankType.id === typeFromServer.id;
                    });
                    switch(mode){
                        case 'save':
                            if(firerankType === undefined){
                                storage.firerankTypes.push(typeFromServer);
                                growl.success("Добавлен новый тип объекта:" +
                                    typeFromServer.typeName, {
                                    ttl: 4000,
                                    disableCountDown: false
                                })
                            } else {
                                angular.merge(firerankType, typeFromServer);
                                growl.success("Изменен тип объекта:" +
                                    typeFromServer.typeName, {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            break;
                        case 'delete':
                            if(firerankType === undefined){
                                growl.error("удаляемого типа объекта в справочнике нет!!!", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            } else {
                                var indexOfElement = _.findIndex(storage.firerankTypes, function(obj){
                                    return obj.id === firerankType.id;
                                });
                                storage.firerankTypes.splice(indexOfElement, 1);
                                growl.warning("удалено!" + typeFromServer.typeName, {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            break;
                        default :
                            console.error("UNDEFINED MSG FROM SERVER!!!");
                            growl.error("Неопознанное сообщение от сервера!", {
                                ttl: 4000,
                                disableCountDown: false
                            });
                            break;
                    }
                    $rootScope.$apply();

                });
                ws.$on('adminSortsOfDeparture', function(message){
                    var modelFromServer = message.sortOfDeparture;
                    switch(message.mode){
                        case "save":
                            var element = _.find(storage.incidentTypes, function(obj){
                                return obj.id === modelFromServer.id;
                            });
                            if(element === undefined){
                                storage.incidentTypes.push(modelFromServer);
                                growl.success("Добавлен новый ранг: \"" + modelFromServer.namefirerank + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            else {
                                angular.merge(element, modelFromServer);
                                element.fireEngineTypes = modelFromServer.fireEngineTypes;
                                if(storage.pages.incidentTypes.activeModel){
                                    if(storage.pages.incidentTypes.activeModel.id === modelFromServer.id){
                                        storage.pages.incidentTypes.activeModel = jQuery.extend(true, {}, modelFromServer);
                                    }
                                }
                                growl.success("Изменён ранг: \"" + modelFromServer.sidfirerank + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            break;
                        case "delete":
                            var indexOfElement = _.findIndex(storage.incidentTypes, function(obj){
                                return obj.id === modelFromServer.id;
                            });
                            if(indexOfElement === -1){
                                growl.error("Не удалось удалить ранг: \"" + modelFromServer.sidfirerank + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            else {
                                storage.incidentTypes.splice(indexOfElement, 1);
                                if(storage.pages.incidentTypes.activeModel){
                                    if(storage.pages.incidentTypes.activeModel.id === modelFromServer.id){
                                        storage.pages.incidentTypes.activeModel = null;
                                    }
                                }
                                growl.warning("Удалён ранг: \"" + modelFromServer.sidfirerank + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            break;
                        default :
                            console.error("UNDEFINED MSG FROM SERVER!!!");
                            growl.error("Неопознанное сообщение от сервера!", {
                                ttl: 4000,
                                disableCountDown: false
                            });
                            break;
                    }
                    //$rootScope.$apply();
                });
                ws.$on('adminRangs', function(message){
                    var modelFromServer = message.rank;
                    switch(message.mode){
                        case "save":
                            var element = _.find(storage.rangs, function(obj){
                                return obj.id === modelFromServer.id;
                            });
                            if(element === undefined){
                                storage.rangs.push(modelFromServer);
                                growl.success("Добавлен новый ранг: \"" + modelFromServer.namefirerank + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            else {
                                angular.merge(element, modelFromServer);
                                element.fireEngineTypes = modelFromServer.fireEngineTypes;
                                if(storage.pages.rangs.activeModel){
                                    if(storage.pages.rangs.activeModel.id === modelFromServer.id){
                                        storage.pages.rangs.activeModel = jQuery.extend(true, {}, modelFromServer);
                                    }
                                }
                                growl.success("Изменён ранг: \"" + modelFromServer.sidfirerank + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            break;
                        case "delete":
                            var indexOfElement = _.findIndex(storage.rangs, function(obj){
                                return obj.id === modelFromServer.id;
                            });
                            if(indexOfElement === -1){
                                growl.error("Не удалось удалить ранг: \"" + modelFromServer.sidfirerank + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            else {
                                storage.rangs.splice(indexOfElement, 1);
                                if(storage.pages.rangs.activeModel){
                                    if(storage.pages.rangs.activeModel.id === modelFromServer.id){
                                        storage.pages.rangs.activeModel = null;
                                    }
                                }
                                growl.warning("Удалён ранг: \"" + modelFromServer.sidfirerank + "\"", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            break;
                        default :
                            console.error("UNDEFINED MSG FROM SERVER!!!");
                            growl.error("Неопознанное сообщение от сервера!", {
                                ttl: 4000,
                                disableCountDown: false
                            });
                            break;
                    }
                    //$rootScope.$apply();
                });
                ws.$on('adminEngineTypes', function(message){
                    var mode = message.mode;
                    var engineFromServer = message.engineType;
                    var engine = _.find(storage.fireEngineTypes, function(engine){
                        return engine.id === engineFromServer.id;
                    });
                    switch(mode){
                        case 'save':
                            if(engine === undefined){
                                storage.fireEngineTypes.push(engineFromServer);
                                growl.success("Добавлена новая техника:" +
                                    engineFromServer.engineType, {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            } else {
                                angular.merge(engine, engineFromServer);
                                growl.success("Изменена техника:" +
                                    engineFromServer.engineType, {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                            break;
                        case 'delete':
                            if(engine === undefined){
                                console.error("удаляемой техники в справочнике нет!!!");
                                growl.error("удаляемой техники в справочнике нет!!!", {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            } else {
                                var indexOfElement = _.findIndex(storage.fireEngineTypes, function(obj){
                                    return obj.id === engine.id;
                                });
                                storage.fireEngineTypes.splice(indexOfElement, 1);
                                growl.success("Удалена техника:" +
                                    engineFromServer.engineType, {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                                if(storage.pages.technics.activeModel.id === engine.id){
                                    storage.pages.technics.activeModel = null;
                                }
                            }
                            break;
                        default :
                            console.error("UNDEFINED MSG FROM SERVER!!!");
                            growl.error("Неопознанное сообщение от сервера!", {
                                ttl: 4000,
                                disableCountDown: false
                            });
                            break;
                    }
                    $rootScope.$apply();
                });


                ws.$on('versions', function(message){

                    if(!!message === true){
                        storage.lastBuildDate.serverBuild = message.cuks;
                    }

                });


                /*
                 $rootScope.$watch(function(){
                 return storage.lastBuildDate.serverBuild;
                 },
                 function(newValue, oldValue){

                 var node = $window.document.querySelector('#marquee');
                 console.log('client build >', storage.lastBuildDate.clientBuild);
                 console.log('server build >', storage.lastBuildDate.clientBuild);

                 if(!!node === true && newValue != parseInt(storage.lastBuildDate.clientBuild, 10) && storage.hasOwnProperty('dictionary') && !!storage.dictionary.warn_version === true){
                 node.querySelector('span').innerHTML = storage.dictionary.warn_version;
                 node.style.display = 'block';
                 // node.style.display = 'none';
                 } else {
                 node.style.display = 'none';
                 node.querySelector('span').innerHTML = '';
                 }

                 }
                 );
                 */

                /*
                 ws.$on('orderAudioRecord', function(message){

                 console.log('>---------------- orderAudioRecord');
                 console.log(message);
                 console.log('>----------------<');

                 });
                 */


                ////////////////////////////////////////////////////////////////
                // ws.$open();
                $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
                    if(fromState.name == 'fires.newFireOrder'){
                        if(!storage.dataOfStates.newFireOrder.canLeave){
                            event.preventDefault();
                            growl.warning('Вы должны отменить бронь техники или создать заявку!', {
                                ttl: 4000,
                                disableCountDown: false
                            });
                        }
                    }
                    if(fromState.name == 'fires.orderEdit'){
                        if(!storage.dataOfStates.editFireOrder.canLeave){
                            event.preventDefault();
                            growl.warning('Вы должны отменить бронь техники или отправить ее!', {
                                ttl: 4000,
                                disableCountDown: false
                            });
                        }
                    }

                });
                $rootScope.$watch(function(){
                        return ws.$status();
                    },
                    function(newVal, oldVal){
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

                        if(storage.socketStatus.new == 0){

                            /*
                             console.log('Renew socket');
                             ws.$close();
                             ws.$open();
                             */
                        }
                        if(storage.socketStatus.new == 1){
                            /*
                             var ticket = $cookies.get('ticket');
                             if(angular.isDefined(ticket)){
                             storage.socketStatus.isReconnecting = true;
                             ws.$emit('login', {
                             ticket: ticket,
                             user: storage.hasOwnProperty('fireUser')? storage.fireUser.uid : null
                             });
                             }
                             */

                        }

                    }
                );


                // $transitions.onSuccess({}, function(transition){
                $rootScope.$on('$viewContentLoaded', function(event){

                    /*
                     console.log('------------->', $transitions);
                     console.log('------------->', $templateCache.info());
                     console.log('------------->',);
                     */
                    // console.log('------------->', $templateCache.put('sources/firesroot/fires.html', 'this is TEST'));
                    // console.log($state.current, $location);


                    /*



























                     //TODO: Функция для перевода всего контента

                     function enumChildNodes(node){
                     if(node && node.nodeType === 1){
                     var child = node.firstChild;
                     while(child){
                     switch(child.nodeType){
                     case 1:
                     enumChildNodes(child);
                     break;
                     case 3:
                     if(/[а-яА-Я]+/ig.test(child.nodeValue)){
                     var word = getWord(child.nodeValue.trim().replace(/\s{2,}/ig, ' ')),
                     value = child.nodeValue;
                     child.nodeValue = value.replace(value, getWord(word));
                     // console.log(value, getWord(word));
                     // console.log(node, child.nodeValue);
                     }
                     break;
                     }
                     child = child.nextSibling;
                     }
                     return node.innerHTML;
                     }
                     };
                     // console.log('---------------------------------', $state.current);
                     var views = $transitions.$view._viewConfigs;
                     for(var i = 0; i < views.length; i++){
                     // console.log('-------------------> 1');
                     // console.log('-------------------> 2');
                     if(!!views[i] === true && !storage.clientSettings.templateCache.hasOwnProperty(views[i].viewDecl.templateUrl)){
                     // console.log('-------------------> 3');
                     var content = $templateCache.get(views[i].viewDecl.templateUrl);
                     // console.log('-------------------> 4');
                     if(!!content === true){
                     storage.clientSettings.templateCache[views[i].viewDecl.templateUrl] = true;
                     console.log(storage.clientSettings.templateCache);
                     var node = document.querySelector('#nodeForTranslate');
                     if(!!node === false){
                     node = document.createElement('DIV');
                     node.id = 'nodeForTranslate'
                     node.style.position = 'absolute';
                     node.style.left = 0;
                     node.style.top = 0;
                     node.style.overflow = 'hidden';
                     }
                     node.innerHTML = content;
                     // console.log($state);
                     $templateCache.put(views[i].viewDecl.templateUrl, enumChildNodes(node));
                     node.innerHTML = '';
                     }
                     }
                     }






































                     */


                });
                /*
                 for(var i in $state.current.views){
                 // console.log('-------------------> 1');
                 if($state.current.views.hasOwnProperty(i)){
                 // console.log('-------------------> 2');
                 if(!!$state.current.views[i] === true && !storage.clientSettings.templateCache.hasOwnProperty($state.current.views[i].templateUrl)){
                 // console.log('-------------------> 3');
                 var content = $templateCache.get($state.current.views[i].templateUrl);
                 // console.log('-------------------> 4');
                 if(!!content === true){
                 storage.clientSettings.templateCache[$state.current.views[i].templateUrl] = true;
                 console.log(storage.clientSettings.templateCache);
                 var node = document.querySelector('#nodeForTranslate');
                 if(!!node === false){
                 node = document.createElement('DIV');
                 node.id = 'nodeForTranslate'
                 node.style.position = 'absolute';
                 node.style.left = 0;
                 node.style.top = 0;
                 node.style.overflow = 'hidden';
                 }
                 node.innerHTML = content;
                 // console.log($state);
                 $templateCache.put($state.current.views[i].templateUrl, enumChildNodes(node));
                 node.innerHTML = '';
                 }
                 }
                 }
                 }

                 });
                 */
                // enumChildNodes($window.document.body);


                /*

                 var states = $transitions._router.stateProvider.stateRegistry.states;
                 console.log('states > ', states);
                 if($state.current.name !== 'login'){
                 for(var i in states){
                 console.log('-------------------> 1', $state.current);
                 if(!!i === true && states.hasOwnProperty(i)){
                 // console.log('-------------------> 2');
                 for(var j in states[i].views){

                 if(states[i].views.hasOwnProperty(j)){

                 if(!!states[i].views[j] === true && !storage.clientSettings.templateCache.hasOwnProperty(states[i].views[j].templateUrl)){
                 // console.log('-------------------> 3');
                 var content = $templateCache.get(states[i].views[j].templateUrl);
                 // console.log('-------------------> 4');
                 if(!!content === true){
                 storage.clientSettings.templateCache[states[i].views[j].templateUrl] = true;
                 console.log(storage.clientSettings.templateCache);
                 var node = document.querySelector('#nodeForTranslate');
                 if(!!node === false){
                 node = document.createElement('DIV');
                 node.id = 'nodeForTranslate'
                 node.style.position = 'absolute';
                 node.style.left = 0;
                 node.style.top = 0;
                 node.style.overflow = 'hidden';
                 }
                 node.innerHTML = content;
                 // console.log($state);
                 $templateCache.put(states[i].views[j].templateUrl, enumChildNodes(node));
                 node.innerHTML = '';
                 states = null;
                 }
                 }
                 }
                 }
                 }
                 }
                 }


                 */


                /*                $transitions.onSuccess({}, function(transition){

                 console.log('$transitions >>>>>>>>>>>>>>>>>>>>>>>>>>', arguments);


                 function cutRu(template){
                 if(!!template === true){
                 var pattern = /(?:[\"|\>]+)([а-яА-Я0-9]\s*\№*\.*\(*\)*)+(?:[\"|\<]+)/ig,
                 found = template.match(pattern),
                 l = found.length,
                 word = '';
                 console.log(l);
                 for(var i = 0; i < l; i++){
                 if(found[i].length > 0){
                 word = found[i].trim().replace(/\"|\>|\<|\n|\r/ig, '').replace(/\s{2,}/ig, ' ');
                 if(!!word === true){
                 // console.log(new RegExp(word).test(toState.template));
                 template = template.replace(new RegExp(word), getWord(word));
                 // console.log(getWord(word));
                 }
                 }
                 }
                 // console.log(toState.template);
                 }
                 return template;
                 }


                 for(var i = 0; i < transition.router.viewService._viewConfigs.length; i++){
                 // for(var j = 0; j < transition.router.viewService._viewConfigs[i].length; j++){
                 // console.log(transition._treeChanges.entering[i].views[j].template);
                 transition.router.viewService._viewConfigs[i].template  = cutRu(transition.router.viewService._viewConfigs[i].template);
                 // console.log(transition.router.viewService._viewConfigs[i].template);
                 // }
                 };


                 });*/


                $rootScope.$watch(function(){
                    return $state.$current.name
                }, function(newState, oldState){
                    storage.stateKeeper.oldState = oldState;
                    storage.stateKeeper.newState = newState;
                });


                $transitions.onSuccess({}, function(){

                    // $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams, options){
                    $timeout(function(){
                        $('#messagebox').focus();
                    });
                    /*
                     fromState.params = fromParams;
                     toState.params = toState;
                     $state.current = toState;
                     $state.previous = fromState;
                     */
                    var currentListOfDeptsId = _.map(storage.fireDepartments, function(dept){
                        return dept.id + ':dept';
                    });
                    ws.$emit('listLocks', currentListOfDeptsId);
                    // $rootScope.$apply();

                });


                /*
                 $rootScope.$on('$stateChangeStart', function(){

                 console.log('Object.keys > ', Object.keys(vm));

                 });
                 */

                if(ReloadLoginPage === true){
                    //TODO: функция для перезагрузки страницы ( 1 )
                    $rootScope.$on('$locationChangeStart', function(e, to, from){

                        if(from === to & !!storage.stateKeeper.oldState === false && !!storage.stateKeeper.newState === false && !!$window.location.hash !== false){
                            // $cookies.remove('ticket');
                            $window.location.assign('#');
                            $window.location.reload();
                        }
                    });
                }
                ;

            }

        ]);
})
();
