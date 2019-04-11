(function(){
    'use strict';
    angular
        .module('app')
        .factory('engineStatusSortingAlgorythm', ['growl', 'storage', 'findEngineInCaraulByDept', function(growl, storage, findEngineInCaraulByDept){


            function sort(engine){
                function getRealStatus(engine){
                    var caraulEng = findEngineInCaraulByDept(engine),
                        realType = engine.engineType.engineType,
                        positionByType = 12;

                    if(!!caraulEng === true){
                        // engine.fireEngineStatus = caraulEng.caraulEngine.fireEngineStatus;
                        engine.fireEngineStatus = Object.assign({}, caraulEng.caraulEngine.fireEngineStatus);
                    }


                    // console.log(engine.gosNo, engine.fireEngineStatus.name);
                    /*
                     if(!!engine.fireEngineStatus === true){
                     if(engine.fireEngineStatus.name.toLowerCase().includes('расчет')){
                     return 1;
                     }
                     if(engine.fireEngineStatus.name.toLowerCase().includes('вп')){
                     return 2;
                     }
                     }
                     return 100;
                     */

                    switch(realType){
                        case "АЦ" :
                            if(!!engine.isFirstTank === true){
                                positionByType = 1;
                            } else {
                                positionByType = 2;
                            }
                            break;
                        case "АПП":
                            positionByType = 3;
                            break;
                        case "АГ":
                            positionByType = 4;
                            break;
                        case "АЛ-30":
                            positionByType = 5;
                            break;
                        case "АЛ-50":
                            positionByType = 6;
                            break;
                        case "АЛ-78":
                            positionByType = 7;
                            break;
                        case "АПК-30":
                            positionByType = 8;
                            break;
                        case "АПК-50":
                            positionByType = 9;
                            break;
                        case "АПК-78":
                            positionByType = 10;
                            break;
                        case "ТПЛ-50":
                            positionByType = 11;
                            break;
                    }

                    // if(!engine.fireEngineStatus.name.toLowerCase().includes('расчет') && !engine.fireEngineStatus.name.toLowerCase().includes('вп')){
                    if(!engine.fireEngineState.name.toLowerCase().includes('расчет') && !engine.fireEngineState.name.toLowerCase().includes('вп') && !engine.fireEngineState.name.toLowerCase().includes('водоснабжение')){
                        positionByType *= 13;
                    }

                    // console.log(realType, positionByType, engine.fireEngineStatus.name, ' -->', engine);


                    return positionByType;
                }

                return getRealStatus(engine);
            }

            return sort;

        }])
        .factory('engineTypeSortingAlgorythm', ['growl', 'storage', function(growl, storage){
            function sort(engine){


                function getRealType(smthg){
                    var typeName = '';
                    // console.log('typeName 0> ', smthg);
                    if(getAsGD(smthg)){
                        typeName = 'АГ';

                    } else {
                        if(angular.isString(smthg)){ //для bytypes
                            typeName = smthg;

                        }
                        if(smthg.engineType !== undefined){

                            if(angular.isString(smthg.engineType)){ //для bytypes

                                typeName = smthg.engineType;
                            } else {

                                typeName = smthg.engineType.engineType;
                            }
                        }
                        //для order

                        if(smthg.fireEngineType !== undefined){

                            typeName = smthg.fireEngineType.engineType;
                        }
                        //potentialEngines
                        if(smthg.engine !== undefined){

                            typeName = smthg.engine.engineType.engineType;
                        }
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
                    return false;
                }

                function getAsGD(smthg){
                    if(smthg.asGD !== undefined){
                        return smthg.asGD;
                    }
                    if(smthg.fireEngine !== undefined){
                        if(smthg.fireEngine.asGD !== undefined){
                            return smthg.fireEngine.asGD;
                        }
                    }
                    if(smthg.engine !== undefined){
                        return smthg.engine.asGD;
                    }
                    if(angular.isString(smthg)){
                        return false;
                    }
                    return false;
                }

                function isEngine(smthg){
                    return (smthg.fireEngine !== undefined || smthg.isFirstTank !== undefined || smthg.engine !== undefined);
                }


                function answerPosition(positionByType, positionByState){
                    // console.log('pos ------>', positionByType + positionByState);
                    return positionByType + positionByState;
                }


                var realType = getRealType(engine);
                var positionByType = null;
                var positionByState = null;


                if(!!realType === true && !!realType.engineType === true){
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
                        case "АПК-78":
                            positionByType = 9;
                            break;
                        case "ТПЛ-50":
                            positionByType = 10;
                            break;
                        default:
                            switch(realType.engineKind){
                                case"ОСНОВНАЯ":
                                    positionByType = 10;
                                    break;
                                case  "СПЕЦИАЛЬНАЯ":
                                    positionByType = 11;
                                    break;
                                default:
                                    positionByType = realType.engineType;
                                    break;
                            }
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
                // console.log('answerPosition(positionByType, positionByState) >>>>>', answerPosition(positionByType, positionByState));
                return answerPosition(positionByType, positionByState)
            }

            return sort;
        }])
        .factory('houseSorting', function(){
            function sort(a, b){
                console.log(a, b);




                return a.house > b.house? 1 : (a.house < b.house)? -1 : 0;


                // return a.house > b.house ? 1 : (a.house < b.house) ? -1 : 0;

                // function sort(house){
                //     return parseInt(house.house);
                /*
                 a = parseInt(a, 10);
                 b = parseInt(b, 10);
                 return a > b ? 1 : (a < b) ? -1 : 0;
                 */

                /*
                 var num = parseInt(a, 10);
                 //console.log(dept.fireDeptName + ' - ' + num);
                 if(isNaN(num)){
                 return a;
                 } else {
                 return b;
                 }
                 */
                // return a -b;

            }

            return sort;
        })
        .factory('objectsSorting', function(){
            function sort(a, b){
                // console.log(a, b);
                function sort(house){
                    //     return parseInt(house.house);
                    return a > b? 1 : (a < b)? -1 : 0;
                }
            }

            return sort;
        })
        .factory('getNumDept', function(){
            function sort(dept){
                var num = parseInt(dept.fireDeptName);
                //console.log(dept.fireDeptName + ' - ' + num);
                if(isNaN(num)){
                    return dept.fireDeptName
                } else {
                    return num;
                }

            }

            return sort;
        })
        .factory('getWord', ['storage', function(storage){
            function translate(word){

//TODO: Функция для рекурсивного перевода любого слова

                var selLoc = Object.keys(storage.clientSettings.locale)[0];

                if(!!word === true){

                    if(storage.dictionary.hasOwnProperty('localeDictData') && storage.dictionary.localeDictData.rus.hasOwnProperty(word.toUpperCase())){
                        return storage.dictionary.localeDictData.rus[word.toUpperCase()][selLoc];
                    } else if(storage.dictionary.hasOwnProperty('dictClient') && storage.dictionary.dictClient.hasOwnProperty(word)){
                        return storage.dictionary.dictClient[word][selLoc];
                    }

                } else {
                    word = '';
                }

                return word;

                /*
                 if(storage.dictionary.hasOwnProperty('localeDictData')){
                 return (storage.dictionary.localeDictData.rus.hasOwnProperty(word.toUpperCase())) ? storage.dictionary.localeDictData.rus[word.toUpperCase()][selLoc] : word;
                 }
                 */
            }

            return translate;
        }])
        .factory('getRole', ['storage', function(storage){
            function getRole(obj, branch){
                if(!!obj === true && !!branch === true){
                    var i, fObj = null;
                    for(i = 0; i < branch.length; i++){
                        if(((!!fObj === true)? fObj : obj).hasOwnProperty(branch[i].trim())){

                            fObj = Object.assign({}, (!!fObj === true)? fObj[branch[i]] : obj[branch[i]]);
                        } else {
                            i = branch.length;
                            fObj = Object.assign(obj['pch']);
                        }
                    }
                    return fObj;
                }
            };

            return getRole;
        }])
        .factory('translateMessage', ['storage', function(storage){
            function translate(message, output){

//TODO: Функция для рекурсивного перевода любого сообщения


                //   console.log('>', storage.dictionary);
                // console.log('------------------------------------------------------------');
                // console.log('message >>>', message);
                var lang = Object.keys(storage.clientSettings.locale)[0];

                function traverse(o){

                    var i, l, j;
                    // console.log('1', o);
                    for(var k in o){
                        // console.log('2');
                        // console.log('k >>>', k, o);
                        i = o[k];
                        // console.log('3');
                        if(typeof i === 'string'){
                            // console.log('4.1', i.trim().length);
                            // console.log('4.2', !!output === false);
                            // console.log('4.3', storage.dictionary.localeDictData['rus'].hasOwnProperty(i));
                            if(i.trim().length > 0 && !!output === false && storage.dictionary.hasOwnProperty('localeDictData') && storage.dictionary.localeDictData['rus'].hasOwnProperty(i.toUpperCase())){
                                // console.log('5');
                                o[k] = storage.dictionary.localeDictData['rus'][i.toUpperCase()][lang];
                                // console.log('6>', o[k]);
                            }
                            // console.log('7');

                            if(i.trim().length > 0 && !!output === true && storage.dictionary.hasOwnProperty('localeDictData') && storage.dictionary.localeDictData[lang].hasOwnProperty(i.toUpperCase())){
                                // console.log(k);
                                o[k] = storage.dictionary.localeDictData[lang][i.toUpperCase()]['rus'];
                            }


                        } else {
                            // console.log('9');
                            if(typeof i === 'object'){
                                // console.log('10');
                                // console.log(getClass(i));
                                // console.log('------------------------------------');
                                traverse(i);
                                // console.log('11');
                            }
                        }

                    }
                }


                if(!!storage === true && storage.hasOwnProperty('dictionary') && storage.dictionary.hasOwnProperty('dictClient')){

                    traverse(message);
                }
                message = null;
            }

            return translate;
        }])
        .factory('changeNewMessagesExistenceFlag', ['storage', function(storage){
            function changeNewMessagesExistenceFlag(fireAct){
                if(storage.selectedFire != undefined){
                    if(fireAct.id !== storage.selectedFire.id){
                        fireAct.newMessagesExist = true;
                    }
                } else {
                    fireAct.newMessagesExist = true;
                }
            }

            return changeNewMessagesExistenceFlag;
        }])
        .factory('globalSelectFire', ['storage', '$state', 'ws', '$cookies', '$window', function(storage, $state, ws, $cookies, $window){
            function selectFire(fireAct){



                var viewWrapper = $window.document.querySelector('#active-fires-wrapper'),
                    scrollTo = 0;
                if(viewWrapper instanceof Object && viewWrapper.nodeType === 1){
                    scrollTo = viewWrapper.scrollTop;
                }

                if(storage.selectedFire !== fireAct){
                    storage.selectedFire = fireAct;
                    fireAct.newMessagesExist = false;
                    storage.showMessageBoxForSelectedFire = false;
                    /*
                     $state.transitionTo($state.current, {
                     fireId: fireAct.id,
                     scrollTo: scrollTo
                     }, {notify: false}
                     );
                     */
                    if(fireAct.isReadyForF6){
                        // storage.enginesAdvise = undefined;
                        ws.$emit('enginesAdvise', {fireActId: storage.selectedFire.id});
                    } else {
                        ws.$emit('selectFire', {
                            fireActId: storage.selectedFire.id
                            // ,ticket:; $cookies.get('ticket')

                        });
                        storage.dataOfStates.command.arriveCounter = 0;
                        storage.dataOfStates.command.onFireCounter = 0;
                        if(angular.isDefined(storage.selectedFire)){
                            _.each(storage.selectedFire.orders, function(order){
                                var dept = _.find(storage.fireDepartments, function(dept){
                                    return dept.id == order.fireEngineDept;
                                });
                                if(dept === undefined){
                                    console.log('Firebase noDept');
                                    return '';
                                }//ВАЖНОЕМЕСТО
                                else {
                                    var engine = _.find(dept.fireEngines, function(en){
                                        return en.idFireEngine == order.fireEngine.idFireEngine;
                                    });
                                    // console.log('engine >', engine.fireEngineState.name);
                                    switch(engine.fireEngineState.name){
                                        case 'СЛЕДУЕТ':
                                            storage.dataOfStates.command.arriveCounter++;
                                            break;
                                        case 'НА ПОЖАРЕ':
                                            storage.dataOfStates.command.onFireCounter++;
                                            break;
                                    }


                                    /*
                                     console.log('Counter1>',  storage.dataOfStates.command.arriveCounter++);
                                     console.log('Counter2>>',  storage.dataOfStates.command.onFireCounter++);
                                     */


                                }
                            });
                            // console.log('---------------------------------');
                        }

                        storage.dataOfStates.command.showRankInputs = false;
                    }

                }
                /*
                 else {
                 fireAct.newMessagesExist = false;
                 storage.selectedFire = undefined;
                 storage.enginesAdvise = undefined;
                 $state.transitionTo($state.current, {
                 fireId: undefined,
                 scrollTo: scrollTo
                 }, {notify: false});
                 }
                 */


                // console.log('storage.selectedFire >>>', storage.selectedFire);


            }


            return selectFire;
        }])
        .factory('isDeptNeedToSaveCaraul', ['storage', function(storage){
            function isDeptNeedToSaveCaraul(dept){
                if(dept != undefined){
                    var caraulMismatchedWithGlobal = dept.totalCaraulNum != storage.globalSettings.currentCaraul;
                    var dateOfCaraulLastChange = dept.totalCaraulChanged;

                    var startOfCurrentInterval = moment();
                    var endOfCurrentInterval = moment();
                    if(startOfCurrentInterval.hour() < 9){
                        startOfCurrentInterval.add(-1, 'days').hours(9).minutes(0).seconds(0);
                        endOfCurrentInterval.hours(9).minutes(0).seconds(0);
                    } else {
                        startOfCurrentInterval.hours(9).minutes(0).seconds(0);
                        endOfCurrentInterval.add(1, 'days').hours(9).minutes(0).seconds(0);
                    }
                    var caraulChangedToday = startOfCurrentInterval.valueOf() < dateOfCaraulLastChange && endOfCurrentInterval.valueOf() > dateOfCaraulLastChange;
                    return caraulMismatchedWithGlobal && !caraulChangedToday;
                }

            };
            return isDeptNeedToSaveCaraul;
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
        // Вычисление дат и конфига для DateRangePicker в архиве
        .factory('getDateRangePickerData', function(){
            function getDateRangePickerData(){
                var now = new Date();
                now.setMinutes(now.getMinutes() + 5);
                var yesterday = new Date().setDate(now.getDate() - 1);
                var monthAgo = new Date().setMonth(now.getMonth() - 1);
                var weekAgo = new Date().setDate(now.getDate() - 7);
                return {
                    now: now,
                    yesterday: yesterday,
                    weekAgo: weekAgo,
                    monthAgo: monthAgo,
                    config: {
                        "showDropdowns": true,
                        "timePicker": true,
                        "timePicker24Hour": true,
                        "separator": ':',
                        "autoApply": true,
                        "opens": 'left',
                        "ranges": {
                            "За сутки": [yesterday, now],
                            "За вчера": [new Date(yesterday).setHours(0, 0, 0, 0), new Date(now).setHours(0, 0, 0, 0)],
                            "За неделю": [weekAgo, now],
                            "За месяц": [monthAgo, now]
                        },
                        "locale": {
                            "format": "DD/MM/YYYY HH:mm",
                            "separator": " - ",
                            "applyLabel": "ОК",
                            "cancelLabel": "Отмена",
                            "fromLabel": "От",
                            "toLabel": "До",
                            "customRangeLabel": "Другой период"
                        }
                    }
                }
            }

            return getDateRangePickerData;
        })
        .factory('logoutUserFromSystem', ['$cookies', 'storage', '$state', 'ws', '$window', function($cookies, storage, $state, ws, $window){
            function logoutUserFromSystem(){
                if(!!storage.socketStatus.mapWindow === true){
                    storage.socketStatus.mapWindow.close();
                }

                storage.socketStatus.mapWindow = null;
                storage.socketStatus.dates = null;

                ws.$emit('logout', {'sessions': 'one'});
                storage.socketStatus.initDispApp = false;
                storage.activeFires = [];
                // storage.socketStatus.isReconnecting = false;
                // $cookies.remove("ticket");
                storage.loginUser = true;
                storage.fireUser = storage.socketStatus.socketId = null;
                if(angular.isDefined(ws)){
                    ws.$close();
                }
                ws.$open();
                $state.go('login', {reload: true});

                return true;
            }

            return logoutUserFromSystem;
        }])
        .factory('infoAboutSystem', function(){
            function sort(dept){
                var num = parseInt(dept.fireDeptName);
                //console.log(dept.fireDeptName + ' - ' + num);
                if(isNaN(num)){
                    return dept.fireDeptName
                } else {
                    return num;
                }

            }

            return sort;
        })
        .factory('findEngineInCaraulByDept', ['storage', function(storage){
            function findEngineInCaraulByDept(engine){
                var engineInCrew = null;
                var found = false;
                storage.fireDepartments.find(function(dept){

                    return dept.fireEngines.find(function(deptEng){
                        // console.log('3',deptEng.idFireEngine === engine.idFireEngine,  deptEng.idFireEngine, engine.idFireEngine);
                        // console.log('3-------->', deptEng.gosNo, deptEng, engine);
                        if(deptEng.idFireEngine === engine.idFireEngine){
                            found = true;
                        }
                        if(found){
                            dept.caraulCrews.find(function(cCrew){
                                // console.log('0-----', storage.globalSettings.currentCaraul, '< >', cCrew.caraulNum, storage.globalSettings.currentCaraul == cCrew.caraulNum);

                                if(storage.globalSettings.currentCaraul == cCrew.caraulNum){
                                    return cCrew.caraulEngines.find(function(cEng){
                                        if((cEng.idFireEngine) === engine.idFireEngine){
                                            // console.log('1-----', cEng.idFireEngine, '< >', engine, cEng.idFireEngine === engine.idFireEngine, cCrew.caraulEngines);
                                            engineInCrew = Object.assign({}, cEng);
                                            // engineInCrew = Object.assign({}, cEng);
                                            // console.log('2-------->', deptEng.gosNo);
                                            // console.log('4-----', engineInCrew);
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    });
                                }
                            });
                        }
                        return found;
                    });

                });
                // console.log('5--------------------------------------------------------', engineInCrew);
                return engineInCrew;
            }

            return findEngineInCaraulByDept;

        }]);

})
();
