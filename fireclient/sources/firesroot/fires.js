(function(){
    'use strict';
    angular
        .module('app.fires', [])
        .run(['ws', 'storage', '$rootScope', 'growl', '$log', '$state', '$timeout', '$anchorScroll', '$window', function(ws, storage, $rootScope, growl, $log, $state, $timeout, $anchorScroll, $window){
            function scrollToEnd(){
                $anchorScroll('message-row-' + (storage.operationalMessages.length - 1));
            }

            ws.$on('addOperationalMessages', function(message){
                var found = false;
                storage.operationalMessages.find(function(mess, idx){
                    if(mess.id === message.id){
                        storage.operationalMessages[idx] = message;
                        found = true;
                    }
                });
                if(!found){
                    // ++test;
                    storage.operationalMessages.push(message);
                }
                $timeout(scrollToEnd, 0);
                $rootScope.$apply();
            });

        }])
        .controller('Fires', Fires)
        .directive('messageBoxDraggable', function(){
            return {
                restrict: 'A',
                link: function(scope, elm, attrs){
                    var options = scope.$eval(attrs.messageBoxDraggable);
                    elm.draggable(options);
                }
            };
        })
        .directive('messageBoxResizable', function(){
            return {
                restrict: 'A',
                link: function(scope, elm, attrs){
                    var options = scope.$eval(attrs.messageBoxResizable);
                    elm.resizable(options);
                }
            };
        })
        .filter('toTimeStringFromTimestamp', function(){
            /*
             return function(input){
             return new Date(input).toLocaleString();
             };
             */
            return function(input){
                if(input){
                    return new Date(input).toLocaleString();
                } else {
                    return '';
                }
            };


        });

    Fires.$inject = ['$log', '$rootScope', '$scope', 'ws', 'growl', 'storage', '$location', '$stateParams', '$state', '$cookies', 'MAPURL', '$window', '$interval', '$anchorScroll', '$timeout', '$filter', 'hotkeys', 'initListLockDoc', 'modalsService', 'logoutUserFromSystem', 'Upload', 'HTTPURLDesktop', 'ShowSentTicket', 'switchSocketServer', 'ShowNewFireCard', '$transitions', 'getWord', '$templateCache', 'globalSelectFire'];
    function Fires($log, $rootScope, $scope, ws, growl, storage, $location, $stateParams, $state, $cookies, MAPURL, $window, $interval, $anchorScroll, $timeout, $filter, hotkeys, initListLockDoc, modalsService, logoutUserFromSystem, Upload, HTTPURLDesktop, ShowSentTicket, switchSocketServer, ShowNewFireCard, $transitions, getWord, $templateCache, globalSelectFire){
        var vm = this;
        vm.storage = storage;

        vm.storage.controllers.fires = vm;

        vm.getWord = getWord;

        vm.messageBox = '';
        vm.showCheckCommandBox = false;
        vm.stateCalledFrom = $state.current.name || null;
        //Меню карточек из Внеш.Сист.
        vm.templateUrl = 'myPopoverTemplate.html';
        vm.showSentTicket = ShowSentTicket;
        vm.showCurrentConnection = false;
        vm.commandList = {};
        vm.selectFire = globalSelectFire;
        vm.isCommandsInputFocus = false;


        vm.getSplitetRole = function(role){
            if(!!role === true){
                role = role.split('.');
                return role[role.length - 1];
            }
        };

        /*

         vm.killServer = function(){
         for(var i = 0; i <= vm.showSentTicket; i++){
         $timeout(function(){
         console.log('i> ', i);
         vm.storage.controllers.bydept['saveCaraul']();

         }, Math.random() * (100 - 1)) + 1;
         }

         };
         */


        vm.checkCommand = function(){
            // $('#checkCommand').blur();

            /*
             if(vm.messageBox.length > 150){
             $timeout(function(){
             vm.openCommandBox();
             }, 0);
             }
             else {
             vm.runCallback();
             }
             */

            vm.runCallback();

        };


        vm.getCrashedEngineTypes = function(){

            var types = {},
                lostTypes = {};


            for(var i = 0, l = storage.fireEngineTypes.length; i < l; i++){

                if(!types.hasOwnProperty(storage.fireEngineTypes[i].engineType)){
                    types[storage.fireEngineTypes[i].engineType] = {};
                }

            }


            for(var i = 0, l = storage.fireDepartments.length; i < l; i++){


                for(var j = 0, k = storage.fireDepartments[i].fireEngines.length; j < k; j++){


                    if(!types.hasOwnProperty(storage.fireDepartments[i].fireEngines[j].engineType.engineType)){
                        if(!!lostTypes[storage.fireDepartments[i].fireEngines[j].engineType.engineType] === false){
                            lostTypes[storage.fireDepartments[i].fireEngines[j].engineType.engineType] = {};
                        }
                        if(!lostTypes[storage.fireDepartments[i].fireEngines[j].engineType.engineType].hasOwnProperty(storage.fireDepartments[i].fireDeptName)){

                            lostTypes[storage.fireDepartments[i].fireEngines[j].engineType.engineType][storage.fireDepartments[i].fireDeptName] = [];
                        }


                        lostTypes[storage.fireDepartments[i].fireEngines[j].engineType.engineType][storage.fireDepartments[i].fireDeptName].push(storage.fireDepartments[i].fireEngines[j]);
                    }



                }


            }


            console.clear();
            var count = 0;
            console.log('');
            console.log('Список утраченных типов и автомобилей');
            console.log('%c%s', 'color: indianred;', '-------------------------------------------------------------------');
            console.log('');
            for(var i in lostTypes){

                if(lostTypes.hasOwnProperty(i)){

                    console.log('%c%s', 'color: indianred;', 'Тип автомобиля: ', i);

                    for(var j in lostTypes[i]){

                        if(lostTypes[i].hasOwnProperty(j)){
                            console.log('%c%s', 'color: forestgreen;', '   ПЧ: ', j);

                            for(k = 0; k < lostTypes[i][j].length; k++){
                                count++;
                                console.log('       ', count, '. автомобиль: ', lostTypes[i][j][k].gosNo, '      id:', lostTypes[i][j][k].idFireEngine);
                            }
                        }
                    }
                    console.log('');
                }

            }

            console.log('');
            console.log('%c%s', 'color: indianred;', '-------------------------------------------------------------------');
            console.log('Всего: ', count);
            console.log('');

            count = lostTypes = types = null;
            /*
             console.log('types >>>', types);
             console.log('lostTypes >>>', lostTypes);
             */

        };


// TODO: Можно удалить функцию и вызов, сделана для тестов отправки Web сокетов по нажатию на верхнюю, фиксированную строку, конкретно на нажатие заголовка "караул".
        vm.simulateEmit = function(){

            /*
             switchSocketServer.init(
             {
             alive: ['192.168.11.132', '172.16.6.124', '172.16.6.165']
             }
             );
             */

            if(typeof(EMIT) !== 'undefined'){
                ws.$emit(EMIT.name, EMIT.request);
            }
        };


        /*
         vm.check = function() {
         console.log('check');
         }
         */

        vm.archiveNotes = function(){
            modalsService.notes('Архив строевых записок');
        };

        vm.goCombatNotes = function(){

            // ws.$emit('getDepts', null);
            $state.go('fires.deptsNote.bydept', {deptId: null}, {reload: true});
        };
        vm.goDeptsNotes = function(){

            // ws.$emit('getDepts', null);
            $state.go('fires.deptsNotes.bydept', {deptId: null}, {reload: true});
        };

        vm.activeOrArchive = function(){

            var result = false;


            if(vm.storage.stateKeeper.newState == 'fires.firesbase' && vm.storage.selectedFire != undefined){
                result = true;
            }

            if(vm.storage.stateKeeper.newState == 'fires.archive' && vm.storage.dataOfStates.archiveCommand.activeFire != undefined){
                result = true;
            }

            if(vm.storage.stateKeeper.oldState == 'fires.archive' && vm.storage.stateKeeper.newState == 'fires.protocol'){
                result = false;
            }

            if(vm.storage.stateKeeper.oldState == 'fires.firesbase' && vm.storage.stateKeeper.newState == 'fires.protocol'){
                result = true;
            }

            if(vm.storage.stateKeeper.oldState == 'fires.order' && vm.storage.stateKeeper.newState == 'fires.protocol'){
                result = true;
            }

            if(vm.storage.stateKeeper.oldState == 'fires.firesbase' && vm.storage.stateKeeper.newState == 'fires.order'){
                result = true;
            }

            if(vm.storage.stateKeeper.oldState == 'fires.protocol' && vm.storage.stateKeeper.newState == 'fires.order'){
                result = true;
            }

            if(vm.storage.stateKeeper.oldState == 'fires.order' && vm.storage.stateKeeper.newState == 'fires.orderEdit'){
                result = true;
            }

            if(vm.storage.stateKeeper.oldState == 'fires.orderEdit' && vm.storage.stateKeeper.newState == 'fires.order'){
                result = true;
            }

            if(vm.storage.stateKeeper.oldState == 'fires.orderEdit' && vm.storage.stateKeeper.newState == 'fires.protocol'){
                result = true;
            }

            /*            if(vm.storage.stateKeeper.oldState == 'fires.archive' && vm.storage.stateKeeper.newState == 'fires.firesbase'){
             result = true;
             }*/
            // return result;
            return true;
        };


        vm.getDocumentBySource = function(goTo){

            // console.log($state.current.name);

            var params = {};

            if(goTo !== undefined){
                // console.log('selectedFire >', vm.storage.selectedFire);
                /*                if(vm.storage.selectedFire.firePlace.region.code === 141 || goTo === 'protocol'){
                 switch($state.current.name){

                 case 'fires.firesbase':
                 case 'fires.order':
                 case 'fires.newFireCard':

                 params = {
                 calledFrom: undefined,
                 fireId: storage.selectedFire? storage.selectedFire.id : undefined,
                 };
                 goTo = 'newFireCard';

                 break;
                 case 'fires.protocol':
                 params = {
                 calledFrom: 'protocol',
                 fireId: storage.selectedFire? storage.selectedFire.id : undefined
                 };
                 break;

                 case 'fires.archive':

                 params = {
                 calledFrom: 'archive',
                 fireId: storage.dataOfStates.archiveCommand.activeFire.id
                 }

                 break;

                 }
                 } else {
                 params = {
                 fireType: 3,
                 fireId: storage.selectedFire? storage.selectedFire.id : undefined
                 };
                 goTo = 'newFireCard';
                 }*/
// console.log(params);


                switch(goTo){

                    case 'protocol':
                        params = {
                            calledFrom: 'protocol',
                            fireId: storage.selectedFire? storage.selectedFire.id : undefined,
                        };
                        goTo = 'newFireCard';
                        break;
                    case 'newFireCard':
                        params = {
                            calledFrom: 'newFireCard',
                            fireId: storage.selectedFire? storage.selectedFire.id : undefined,
                        };
                        goTo = 'newFireCard';
                        break;
                }


                $state.go(('fires.' + goTo), params);

            }

        }

        /*

         vm.goProtocol = function(){
         console.log(storage.dataOfStates.archiveCommand.activeFire);
         if($state.is('fires.archive')){
         // console.log(storage.dataOfStates.archiveCommand.activeFire.id);
         $state.go('fires.protocol', {
         calledFrom: 'archive',
         fireId: storage.dataOfStates.archiveCommand.activeFire.id
         });
         // $state.go('fires.protocol', {calledFrom: 'archive'});
         }
         if($state.is('fires.firesbase') || $state.is('fires.order')){
         $state.go('fires.protocol', {calledFrom: 'firesbase', fireId: storage.selectedFire.id});
         // $state.go('fires.protocol', {calledFrom: 'firesbase'});
         }
         }


         vm.goOrder = function(){


         vm.storage.dataOfStates.order.orderMode = 'tech';

         if($state.is('fires.archive')){
         $state.go('fires.order', {calledFrom: 'archive'});
         // $state.go('fires.protocol', {calledFrom: 'archive'});
         }
         if($state.is('fires.firesbase') || $state.is('fires.protocol')){
         $state.go('fires.order', {calledFrom: 'firesbase'});
         // $state.go('fires.protocol', {calledFrom: 'firesbase'});
         }
         }
         */


        vm.showMarquee = function(){
            return !(parseInt(storage.lastBuildDate.clientBuild, 10) >= parseInt(storage.lastBuildDate.serverBuild, 10));
            // return parseInt(storage.lastBuildDate.serverBuild, 10) !== parseInt(storage.lastBuildDate.clientBuild, 10) && parseInt(storage.lastBuildDate.serverBuild, 10) > parseInt(storage.lastBuildDate.clientBuild, 10);
            $rootScope.$apply();
        };


        vm.openCommandBox = function(){
            vm.showCheckCommandBox = true;
            //$rootScope.$apply();
            $timeout(function(){
                $('#command-textarea').focus()
            }, 0);
        };
        vm.ctrlEnterMsgBox = function(event){
            if(event.ctrlKey && event.keyCode === 10){
                vm.runCallback();
            }
        };
        vm.pickUpThePhone = function(){
            var temp112 = {
                card112: {
                    strCallerContactPhone: storage.incomingCall.callerPhoneNum
                }
            };
            storage.incomingCall = null;
            storage.dataOfStates.newFireOrder.fireAct.card112WithBean = temp112;
            $state.go('fires.newFireCard', {deptId: undefined, fireId: undefined});
        };
        vm.isHasSelectedFire = function(){
            return storage.selectedFire !== undefined;
        };


//TODO: списки для удаления комманд развития пожара
        vm.contentClass = function(){
            // misha, wtf??
            if($state.is('fires.card112') || $state.is('fires.deptsNote.bydept') || $state.is('fires.deptsNote.garrison') || $state.is('fires.deptsNote.headCaraul') || $state.is('fires.deptsNote.protocol') || $state.is('fires.newFireOrder') || $state.is('fires.orderEdit') || $state.is('fires.bridges') || $state.is('fires.hydrants') || $state.includes('fires.opo') || $state.is('fires.deptsNotes.bydept')){
                return 'content-full-width'
            } else {
                return 'content'
            }
        };
        vm.commandClass = function(){
            // misha, wtf??
            if($state.is('fires.card112') || $state.is('fires.deptsNote.bydept') || $state.is('fires.deptsNote.garrison') || $state.is('fires.deptsNote.headCaraul') || $state.is('fires.deptsNote.protocol') || $state.is('fires.newFireOrder') || $state.is('fires.orderEdit') || $state.is('fires.newFireOrder') || $state.is('fires.hydrants') || $state.includes('fires.opo') || $state.is('fires.deptsNotes.bydept')){
                return 'command-clean'
            } else {
                return 'command'
            }
        };
        vm.goToCard112 = function(card){
            // console.log(JSON.stringify(card));


            <!--TODO: сделано для имитации карточек от 112-->
            <!-- Случайный ID для карточки 112-->

            if(typeof _cards112 !== 'undefined'){
                card.card112.nEmergencyCardId = Math.floor((Math.random() * 999999999) + 11111).toString();

                // card.id = btoa(Math.random()).substring(0,24).toLowerCase();
                // var nEmergencyCardId = Math.floor((Math.random() * 999999999) + 11111);
                // var nEmergencyCardId = Math.floor(Math.random() * (1 + 999999999 - 11111 )) + 11111;
                // var nEmergencyCardId = Math.floor(Math.random() * 899999999 + 10000);
                // console.log('card.id 2>>>>>>>>>>>>>', nEmergencyCardId, nEmergencyCardId.toString().length, card.card112.nEmergencyCardId, card.card112.nEmergencyCardId.length);
                // var id = Math.random().toString(36).substr(2, 9);
                // var id = btoa(Math.random()).substring(0,24).toLowerCase();
                // console.log('>>>>>>>>>>>>>', id, id.length, card.id.length);
            }


            vm.storage.dataOfStates.card112.selectedCard112 = card;
            $state.go('fires.card112', {deptId: undefined, fireId: undefined, fireType: undefined}, {reload: true});
        };


        var ticket = $cookies.get('ticket');
        vm.closeOneSession = function(){
            var eventName = "closeOneSession";
            // storage.activeFires = [];
            // storage.loginUser = true;
            // storage.parkingWithoutReconnect = true;
            logoutUserFromSystem();
            ws.$emit(eventName, ticket);
            ws.$emit('unlockDocument', true);
            // ws.$close();
            // $log.log(eventName);
            // $cookies.remove("ticket");
            // $state.go('login');
        };
        vm.closeAllSessions = function(){
            var eventName = "closeAllSessions";
            // storage.activeFires = [];
            // storage.loginUser = true;
            // storage.parkingWithoutReconnect = true;
            logoutUserFromSystem();
            ws.$emit(eventName, ticket);
            // ws.$close();
            // $cookies.remove("ticket");
            // $log.log('eventName');
            // $state.go('login');

        };


        vm.switchViewTicketList = function(){
            vm.storage.socketStatus.showTicketList = !vm.storage.socketStatus.showTicketList;
        };


        vm.goToChangePasswordState = function(){
            $state.go('changePassword');
        };

        vm.openMap = function(){
            storage.socketStatus.mapWindow = $window.open(MAPURL + '#/?socketId=' + storage.socketStatus.socketId, 'Карта', 'location=no');
            // storage.socketStatus.mapWindow = $window.open(MAPURL + '#/?ticket=' + ticket + '&socketId=' + storage.socketStatus.socketId , 'Карта', 'location=no');
            //window.open(MAPURL + '#/?ticket=' + ticket, 'Карта', 'location: false,menubar: false');
        };

        vm.openMessageBox = function(){
            if(ShowNewFireCard === true){
                $state.go('fires.newFireCard', {deptId: undefined, fireId: undefined});
                return true;
            }
            storage.dataOfStates.fires.showMessageBox = !storage.dataOfStates.fires.showMessageBox;
        };

        vm.closeMessageBox = function(){
            storage.dataOfStates.fires.showMessageBox = false;
        };

        vm.checkRole = function(){
            if(storage.fireUser){
                return (storage.fireUser.role.indexOf('dispatchersManager') !== -1)
            } else {
                return false;
            }
        };
        ///////////////////////////////////////////////////
        vm.calculateTopPropOfDropdown = function(string){
            var len = ($filter('filter')(vm.cmdLineElements, string)).length;
            var str = '-' + (len * 24.5 + 10) + 'px';
            return str;
        };
        vm.selectedCommand = null;
        vm.sortByShortCut = function(searchStr){
            return function(item){
                if(searchStr.length > 0){
                    if(angular.isArray(item.shortCut)){
                        var shortCutsLengths = _.map(item.shortCut, function(shortCut){
                            return (shortCut.replace(searchStr.toUpperCase(), '')).length;
                        });
                        return _.min(shortCutsLengths);
                    }
                    else {
                        return item.shortCut.replace(searchStr.toUpperCase(), '').length;
                    }
                }
                else return 0;
            }
        };
        vm.cmdLineElements = [
            {
                name: 'Сообщение',
                shortCut: 'СБ',
                desc: 'Введите сообщение о пожаре',
                callback: function(string){

                    if(storage.fireUser.ACCESS.fastCommands.messages){

                        var currentTime = new Date;
                        var offset = currentTime.getTimezoneOffset();
                        var delta = currentTime - timeSelectCommand;
                        if(storage.selectedFire){
                            ws.$emit('sendInfoMessage', {
                                fireActId: vm.storage.selectedFire.id,
                                message: string,
                                delta: delta,
                                offset: offset
                            });
                        } else {
                            growl.warning('НЕ ВЫБРАН ПОЖАР', {
                                ttl: 4000,
                                disableCountDown: false
                            });
                        }
                    }
                }
            }, {
                name: 'Карта',
                shortCut: 'КР',
                desc: 'Открывает карту',
                callback: function(string){
                    vm.openMap();

                }
            }, {
                name: 'Новая заявка',
                shortCut: 'НЗ',
                desc: 'Создать заявку',
                callback: function(string){
                    $state.go('fires.newFireCard', {fireId: undefined});
                }
            }, {
                name: 'Строевая записка',
                shortCut: 'СЗ',
                // shortCut: ['СЗ', 'СТРЗ'],
                desc: 'Открыть строевую записку. Параметры: №ПЧ / "Гарн"',
                callback: function(string){
                    if(storage.fireUser.ACCESS.fastCommands.SZ){
                        if(string != ''){
                            if(string.toUpperCase() === 'ГАРН'){
                                $state.go('fires.deptsNote.garrison');
                            } else {
                                var dept = _.find(storage.fireDepartments, function(dept){

                                    return dept.fireDeptName === string;
                                });
                                if(dept != undefined){
                                    $state.go('fires.deptsNote.bydept', {deptId: dept.id}, {reload: true});
                                    // $state.go('fires.deptsNote.bydept', {deptId: dept.id});
                                } else {
                                    growl.warning('ПЧ ' + string + ' не найдена', {
                                        ttl: 4000,
                                        disableCountDown: false
                                    });
                                }
                            }
                        } else {
                            $state.go('fires.deptsNote.bydept', {})
                        }
                    }
                }
            }, {
                name: 'Состояние техники',
                shortCut: 'СТ',
                desc: 'Просмотр состояния техники. При указании номера ПЧ - открывает технику в пч, при указании типа - технику по типу, без параметров - по состояниям',
                callback: function(string){
                    if(storage.fireUser.ACCESS.fastCommands.ST){
                        string = string.trim();

                        if(string != ''){


                            string = ( /(?:\\W|^)([А-Яа-яЁё0-9-]{1,})(?:(?:\()([0-9]{1})(?:\))){0,1}(?:\\W|$)/i.exec(string) );
                            var type = _.find(storage.fireEngineTypes, function(type){
                                return type.engineType.toUpperCase() === string[1].toUpperCase();
                            });
                            if(type !== undefined){
                                if(storage.selectedFire != undefined){
                                    $state.go('fires.chooseTech.bytypes', {
                                        additionalType: string[2],
                                        fireType: type.engineType,
                                        fireId: storage.selectedFire.id
                                    }, {location: true});
                                } else {
                                    $state.go('fires.chooseTech.bytypes', {
                                        additionalType: string[2],
                                        fireType: type.engineType
                                    }, {location: true});
                                }
                            } else {
                                var dept = _.find(storage.fireDepartments, function(dept){
                                    return dept.fireDeptName.toUpperCase() === string[1].toUpperCase();
                                });
                                if(dept != undefined){
                                    if(storage.selectedFire != undefined){
                                        $state.go('fires.chooseTech.bydept', {
                                            deptId: dept.id,
                                            fireId: storage.selectedFire.id
                                        }, {location: true});
                                    } else {
                                        $state.go('fires.chooseTech.bydept', {
                                            deptId: dept.id
                                        }, {location: true});
                                    }
                                } else {
                                    growl.warning('Не определенные параметры', {
                                        ttl: 4000,
                                        disableCountDown: false
                                    });
                                }
                            }
                        } else {
                            $state.go('fires.chooseTech.byStatus', {})
                        }
                    }
                }
            },
            {
                name: 'Набор техники',
                shortCut: 'НТ',
                desc: 'ВЫБЕРИТЕ ПОЖАР, затем введите НОМЕР ПЧ ТИП МАШИНЫ. НАПРИМЕР: 5 АГ, 10 АЦ',
                callback: function(string){
                    if(storage.fireUser.ACCESS.fastCommands.NT){
                        if(string != ''){
                            if(storage.selectedFire){
                                var stringParts = string.split(',');
                                _.each(stringParts, function(deptAndEng){
                                    var deptNum = deptAndEng.split(' ')[0];
                                    // var engTypeName = deptAndEng.split(' ')[1].toUpperCase();
                                    var engTypeName = ( /(?:\\W|^)([А-Яа-яЁё0-9-]{1,})(?:(?:\()([0-9]{1})(?:\))){0,1}(?:\\W|$)/i.exec(deptAndEng.split(' ')[1]) )[1];
                                    // var engTypeName = ( /(?:\\W|^)([А-Яа-яЁё0-9-]{1,})(?:(?:\()([0-9]{1})(?:\))){0,1}(?:\\W|$)/i.exec(deptAndEng.split(' ')[1]) )[1];
                                    var dept = _.find(storage.fireDepartments, function(dept){
                                        return dept.fireDeptName.toUpperCase() === deptNum.toUpperCase();
                                    });


                                    var enginesList = _.filter(dept.fireEngines, function(engine){

                                        switch(engTypeName[1]){

                                            case 'АЦ':

                                                switch(engTypeName[2]){
                                                    case '1':
                                                        return (engine.engineType.engineType.toUpperCase() === 'АЦ' && engine.isFirstTank)
                                                        break;

                                                    case '2':
                                                        return (engine.engineType.engineType.toUpperCase() === 'АЦ' && !engine.isFirstTank)
                                                        break;

                                                    default:
                                                        return (engine.engineType.engineType.toUpperCase() === 'АЦ')
                                                }

                                                break;

                                            default:
                                                return (engine.engineType.engineType.toUpperCase() === engTypeName.toUpperCase())

                                        }


                                        /*                                    if(engTypeName.indexOf('АЦ') == -1){
                                         return (engine.engineType.engineType.toUpperCase() === engTypeName.toUpperCase())
                                         } else {

                                         console.log('>--------------');
                                         console.log((engTypeName.indexOf('АЦ') == -1));
                                         console.log(engine.engineType.engineType.toUpperCase());
                                         console.log(engine.isFirstTank);

                                         console.log('--------------<');

                                         if(engTypeName.indexOf('1') != -1){
                                         return (engine.engineType.engineType.toUpperCase() === 'АЦ' && engine.isFirstTank)
                                         }
                                         else if(engTypeName.indexOf('2') != -1){
                                         return (engine.engineType.engineType.toUpperCase() === 'АЦ' && !engine.isFirstTank)
                                         } else {
                                         return (engine.engineType.engineType.toUpperCase() === 'АЦ')
                                         }
                                         }*/


                                    });


                                    var trueEnginesList = _.filter(enginesList, function(engine){

//TODO: после отработки вернуть условие на return engine.fireEngineState.canUseAutomaticMode && engine.fireEngineState.canUseManualMode; оставил как напоминание, условие вернул

                                        return engine.fireEngineState.canUseAutomaticMode && engine.fireEngineState.canUseManualMode;

                                        // return true;
                                        // return engine.fireEngineState.canUseAutomaticMode && engine.fireEngineState.canUseManualMode;
                                    });
                                    var engine = trueEnginesList[0];


                                    if(!!storage.controllers.newFireCard === true && !!storage.controllers.newFireCard.id === true){

                                        storage.selectedFire = Object.assign({}, storage.controllers.newFireCard.fireAct);

                                    }


                                    console.log('$state.current.name >', $state.current.name);

                                    if(engine !== undefined){
                                        var command = {
                                            deptId: dept.id,
                                            engineId: engine.idFireEngine,
                                            fireActId: (!!storage.selectedFire === true)? storage.selectedFire.id : undefined,
                                            fireId: (!!storage.selectedFire === true)? storage.selectedFire.id : undefined,
                                            // calledFrom: ($state.current.name === 'fires.newFireCard')? '' : 'protocol',
                                            fireType: undefined
                                        };

                                        if($state.current.name !== 'fires.newFireCard'){
                                            command.calledFrom = 'protocol';
                                        }

                                        $state.go('fires.newFireCard', command);
                                        ws.$emit('addEngineToFireManually', command);
                                        vm.messageBox = '';
                                    } else {
                                        growl.warning('Запрашиваемая техника недоступна.', {
                                            ttl: 4000,
                                            disableCountDown: false
                                        });
                                    }
                                });
                            } else {
                                growl.warning('НЕТ ПОЖАРА', {
                                    ttl: 4000,
                                    disableCountDown: false
                                });
                            }
                        } else {
                            growl.warning('НЕТ КОММАНДЫ', {
                                ttl: 4000,
                                disableCountDown: false
                            });
                        }
                    }
                }
            }
        ];
        var cmdOnNewFireOrder = {
            name: 'Ручной набор',
            desc: 'Номер ПЧ Тип техники',
            callback: function(string){
                var fireAct = storage.dataOfStates.newFireOrder.fireAct;
                if(fireAct.id != undefined){
                    //TODO: this on serverside
                    var deptNameSrting = (string.match(/(.*)\s/))[1];
                    var engineTypeString = (string.match(/\s(.*)/))[1];
                    var dept = _.find(storage.fireDepartments, function(dept){
                        return dept.fireDeptName.toUpperCase() === deptNameSrting.toUpperCase();
                    });
                    var enginesList = _.filter(dept.fireEngines, function(engine){
                        return (engine.engineType.engineType.toUpperCase() === engineTypeString.toUpperCase())
                    });
                    var trueEnginesList = _.filter(enginesList, function(engine){
                        return engine.fireEngineState.canUseAutomaticMode && engine.fireEngineState.canUseManualMode;
                    });
                    var engine = trueEnginesList[0];
                    if(engine !== undefined){
                        var idFireEngine = engine.idFireEngine;
                        ws.$emit('orderEngineManually', {
                            deptId: dept.id,
                            idFireEngine: idFireEngine,
                            fireAct: fireAct
                        });
                        vm.messageBox = '';
                    } else {
                        growl.warning('Запрашиваемая техника недоступна.', {
                            ttl: 4000,
                            disableCountDown: false
                        });
                    }
                } else {
                    growl.warning('Зарезервируйте технику.', {
                        ttl: 4000,
                        disableCountDown: false
                    });
                }

            }
        };
        var timeSelectCommand = new Date;
        vm.updateDelta = function(){
            if(vm.messageBox.length > 0){

            } else {
                timeSelectCommand = new Date;
            }
        };
        vm.onSelectCommand = function(item){
            // if($state.is('fires.newFireOrder')){
            if($state.is('fires.newFireCard')){
                vm.selectedCommand = cmdOnNewFireOrder;
            } else {
                if(!!vm.isCommandsInputFocus === false){
                    timeSelectCommand = new Date;
                    $timeout(function(){
                        jQuery('#messagebox').focus();
                    }, 30);
                }
            }
        };

        vm.switchCommndInputFocus = function(){
            vm.isCommandsInputFocus = !vm.isCommandsInputFocus;
        };

        vm.newFireCard = function(){

            vm.storage.selectedFire = null;
            $state.go('fires.newFireCard', {
                deptId: undefined,
                fireId: undefined,
                fireType: 'new',
                calledFrom: undefined
            });

        };


        // $scope.$on('$viewContentLoaded', function(event, toState, toParams, fromState, fromParams){


        $transitions.onSuccess({}, function(transition){



            // console.log('------------->', $templateCache.get('sources/firesroot/fires.html'));
            // console.log('------------->', $templateCache.put('sources/firesroot/fires.html', 'this is TEST'));
            // console.log(document.body.textContent);


            /*
             if(storage.clientSettings.transitions !== $transition.router.urlRouter.location){
             storage.clientSettings.transitions = $transition.router.urlRouter.location;
             */
            // console.log(storage.clientSettings.transitions);
            // enumChildNodes(document.body);
            // }


            // console.log('toState >>>>', toState);
            // if(!!toState === true && !!toState.template === true){
            /*
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


             // console.log($scope.$resolve.$transition$);
             $scope.$resolve.$transition$.router._disposables.find(function(elem){
             // console.log(elem);
             if(elem.hasOwnProperty('_transitionCount')){
             // console.log(elem);
             for(var i = 0; i < elem.$view._viewConfigs.length; i ++){
             // elem.$view._viewConfigs[i].template = cutRu(elem.$view._viewConfigs[i].template);
             }
             }
             });

             */

            /*            $transitions.onSuccess({}, function(transition){
             function cutRu(text){
             // text.replace(/\t/ig, '\n');
             var result = (text.replace(/\{\{+.+\}\}+/ig, '').replace(/\t/ig, '\n')).split(/\n/ig);
             var l = result.length,
             word = '',
             html = window.document.body.innerHTML;
             for(var i = 0; i < l; i++){
             word = result[i].trim();
             if(word.length > 0 && /[а-яА-я]+/ig.test(word)){

             html = html.replace(new RegExp(result[i]), getWord(word));

             // console.log(getWord(result[i]), ' <> ', word);
             }
             }
             // console.log(text);
             return html;
             }

             // console.log($window.document.activeElement.innerHTML);

             window.document.body.innerHTML = cutRu(window.document.body.innerText);

             console.log(window.document.body.innerHTML);
             // console.log($);
             });*/


            // console.log(document.activeElement.innerText);

        });


        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){

            /*
             if(toState.name == 'fires.newFireOrder'){
             vm.selectedCommand = cmdOnNewFireOrder;
             } else if(fromState.name == 'fires.newFireOrder'){
             vm.cancelCommand();
             }
             */
        });

        function runCommandByName(string){
            var comm = _.find(vm.cmdLineElements, function(command){
                return command.name == string;
            });
            if(comm != undefined){
                comm.callback(vm.messageBox);
            }
        }

        hotkeys.add({
            combo: 'f11',
            description: 'Команда "Строевая Записка"',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event){
                event.preventDefault();
                var comm = _.find(vm.cmdLineElements, function(command){
                    return command.name == 'Строевая записка';
                });
                if(comm != undefined){
                    vm.selectedCommand = comm;
                    vm.onSelectCommand(comm);
                }
            }
        });
        hotkeys.add({
            combo: 'f12',
            description: 'Команда "Состояние техники"',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(event){
                event.preventDefault();
                var comm = _.find(vm.cmdLineElements, function(command){
                    return command.name == 'Состояние техники';
                });
                if(comm != undefined){
                    vm.selectedCommand = comm;
                    vm.onSelectCommand(comm);
                }
            }
        });
        ///////////////////////////////////////////////////
        vm.runCallback = function(){
            /*
             if(vm.messageBox === 'IDDQD'){
             if(storage.isRoot != undefined){
             storage.isRoot = !storage.isRoot;
             growl.warning('GOD MODE' + !storage.isRoot, {
             ttl: 4000,
             disableCountDown: false
             });
             } else {
             storage.isRoot = true
             }
             } else {
             */


            // console.log('vm.messageBox >', vm.messageBox, new RegExp(/^[а-яА-Я]{2}\s{1}.+/igu).test(vm.messageBox), vm.cmdLineElements, vm.messageBox.split(' '));
            // console.log('vm.cmdLineElements > ', vm.cmdLineElements);

            var found = false;

            for(var i in vm.cmdLineElements){
                if(vm.cmdLineElements.hasOwnProperty(i)){
                    if(vm.cmdLineElements[i].shortCut == (vm.messageBox.split(' '))[0].toUpperCase()){
                        found = true;
                    }

                }

            }

            if(new RegExp(/^[а-яА-Я]{2}\s+/igu).test((vm.messageBox.trim() + ' ')) === true && found){

                var cmd = vm.messageBox.split(' '),
                    result = null;
                result = vm.cmdLineElements.find(function(cmdl){
                    if(cmdl.shortCut.includes(cmd[0].toUpperCase())){
                        return cmdl;
                    }
                });
                if(!!result === true && result.hasOwnProperty('callback')){

                    cmd.splice(0, 1);
                    // console.log('vm.messageBox 2>', cmd, cmd.join(' '));
                    result.callback(cmd.join(' '));
                    // console.log('vm.messageBox 1>', cmd);

                }

            } else {
                if(!!vm.messageBox.trim().length > 0){

                    vm.cmdLineElements.find(function(cmdl){
                        if(cmdl.shortCut.includes('СБ')){
                            cmdl.callback(vm.messageBox.trim());
                            return true;
                        }
                    });
                    // console.log(result);
                    // result.callback(vm.messageBox.trim());
                    // shortCut: 'СБ',
                }
            }


            /*
             if(vm.selectedCommand != null){
             vm.selectedCommand.callback(vm.messageBox)
             } else {
             runCommandByName('Сообщение');
             }
             */
            // }
            if(vm.selectedCommand != cmdOnNewFireOrder){
                vm.cancelCommand();
            }
        };
        vm.cancelCommand = function(){
            vm.messageBox = '';
            vm.selectedCommand = null;
            vm.showCheckCommandBox = false;
        };
        vm.card112BGColor = function(card){

            if(card.hasOwnProperty('receiver') && storage.hasOwnProperty('fireUser') && storage.fireUser.hasOwnProperty('ip') && storage.fireUser.ip == card.receiver){
                return 'personal-card112';
            }


            if(card.isViewed){
                return 'viewed-card112';
            }
            if(card.card112 != undefined && card.card112.nCardState != undefined){
                if(card.card112.nCardState == '2'){
                    return '';
                } else {
                    return 'lightgrey-bg';
                }
            }

            return '';

        };
        var allowEnter = false;
        vm.goToForma = function(fireActId){
            initListLockDoc.init();


            if(!!fireActId === true){
                ws.$emit('getForma6', fireActId);
                storage.dataOfStates.formaViewOnly = false;
            }
        };


        vm.uploadEvent = function(file){
            // var url = HTTPURLDesktop;
            var url = HTTPURLDesktop + '/rest/hqboard/event';
            Upload.upload({
                url: url,
                data: {file: file},
                headers: {
                    "TOKEN": vm.storage.socketStatus.socketId
                    // "TOKEN": $cookies.get('ticket')
                }
            }).then(function(resp){
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                growl.success('Файл ' + resp.config.data.file.name + ' успешно загружен', {
                    ttl: 4000,
                    disableCountDown: false
                });
            }, function(resp){
                console.log('Upload error, status: ' + resp.status);
                growl.error('Ошибка загрузки', {
                    ttl: 4000,
                    disableCountDown: false
                });
            }, function(evt){
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('Upload progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        }


        $("#messagebox")
            .keyup(function(event){
                if(event.keyCode == 13){
                    if(allowEnter){
                        vm.checkCommand();
                        allowEnter = false;
                        // $("#messagebox").blur();
                    }
                }
            })
            .keydown(function(event){
                if(event.keyCode == 13){
                    allowEnter = true
                }
            });


        function onResize(e){
            storage.layout.middle.style.height = ($window.innerHeight - storage.layout.height) + 'px';
        };

        angular.element($window).bind('resize', onResize);

        var _height = $window.document.body.querySelector('#aboutLayout').offsetHeight + $window.document.body.querySelector('#navbarLayout').offsetHeight + $window.document.body.querySelector('#messagesLayout').offsetHeight + $window.document.body.querySelector('#wrapperLayout').offsetHeight;
        storage.layout = {
            middle: $window.document.body.querySelector('#middleLayout'),
            height: _height
        };

        onResize();


        vm.keyboardControl = function(event){

            if(!!event === true){

                switch($state.$current.name){

                    case 'fires.firesbase':
                        vm.getSelectedFireRow(event.keyCode);
                        break;


                }

            }


        };


        /*
         $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams, options){
         console.log('$(1111) >>>');
         console.log('$(#messagebox) >>>', $('#messagebox'));
         $timeout(function(){
         $('#messagebox').focus();
         });
         });
         */


        vm.scrollToCursor = function(){
            var wrapper = $window.document.body.querySelector('#active-fires-wrapper'),
                row = (!!wrapper === true)? wrapper.querySelector('.rowbkgselected') : null;

            if(!!wrapper === true && !!row === true){

                if(row.offsetTop < wrapper.scrollTop){
                    wrapper.scrollTop = row.offsetTop;
                }

                if(row.offsetTop + row.offsetHeight + 30 > wrapper.scrollTop + wrapper.offsetHeight){
                    wrapper.scrollTop = row.offsetTop - (wrapper.offsetHeight - row.offsetHeight - 30);
                }


                /*
                 wrapper.scrollTop = (row.offsetTop - (row.parentNode.offsetHeight / 2)) + (row.offsetHeight / 2);
                 */
                // console.log(wrapper.scrollTop, row.offsetTop, row.parentNode.offsetHeight, row.offsetHeight);
            }
            wrapper = row = null;
        };

        var setSelect = null;
        vm.getSelectedFireRow = function(code){
            // wrapper = $window.document.body.querySelector('#active-fires-wrapper'),
            var row = $window.document.body.querySelector('.rowbkgselected'),
                sibling = null,
                mess = null;

            if(!!row === true && row.nodeType === 1 && !!code === true && (code == 38 || code == 40 || code == 13)){

                // console.log('--->', $window.document.body.getElementsByClassName('rowbkgselected'));
                if(code != 13){
                    sibling = (code == 38)? row.previousElementSibling : row.nextElementSibling;

                    if(!!sibling === true && sibling.nodeName === 'TR'){

                        row.classList.remove('rowbkgselected');
                        sibling.classList.add('rowbkgselected');

                        vm.scrollToCursor();

                        /*
                         if(!!wrapper === true && wrapper.nodeType === 1){
                         wrapper.scrollTop = (sibling.offsetTop - (sibling.parentNode.offsetHeight / 2)) + (sibling.offsetHeight / 2);
                         }
                         */

                        if(!!sibling.dataset.fireId === true){
                            clearTimeout(setSelect);
                            (function(id){
                                setSelect = setTimeout(function(){

                                    vm.storage.activeFires.find(function(fire){

                                        if(fire.id === id){
                                            vm.selectFire(fire);
                                            return true;
                                        }
                                    });

                                }, 300);

                            })(sibling.dataset.fireId);
                        }
                    }
                } else {

                    mess = $window.document.body.querySelector('#messagebox');
                    if(!!mess === true && mess.nodeName === 'INPUT' && !!mess.value === false){
                        vm.getDocumentBySource('newFireCard');
                    }

                }

            }
            row = sibling = mess = null;
        };


        vm.setFirstFire = function(){

            var row = $window.document.body.querySelector('#active-fires-list > tbody > tr:first-of-type');

            if(!!vm.storage.selectedFire === false && !!row === true && row.nodeType === 1 && !!row.dataset.fireId === true && vm.storage.activeFires.length > 0){
                vm.storage.activeFires.find(function(fire){
                    if(fire.id === row.dataset.fireId){
                        vm.selectFire(fire);
                        return true;
                    }
                });
            }
        };


        vm.toArch = function(){

            $state.go('fires.firesbase', {
                deptId: undefined,
                engineId: undefined,
                fireId: undefined
            }, {location: true, reload: true});


            ws.$emit('changeFireActStatus', {
                fireActId: vm.storage.selectedFire.id,
                fireAct: vm.storage.selectedFire,
                newStatuse: 'toArch'
            });

        };




        $scope.$on('$viewContentLoaded', function(event){

            $timeout(function(){
                vm.scrollToCursor();
            }, 100);

        });


        $scope.$on('$destroy', function(){
            storage.layout.middle = null;
            vm.storage.controllers.fires = null;
        });


    };

})();

