(function(){
    'use strict';
    angular
        .module('app.card112', [])
        .controller('Card112', Card112)
        .run(['ws', 'storage', '$rootScope', 'growl', '$state', function(ws, storage, $rootScope, growl, $state){
            //удаление новой карточки Внеш.Сист. при отклонении(emit reject) с указанием причины
            //или когда создали пожар из карточки
            ws.$on('deleteCard112', function(message){
                var card112Id = message.id;
                var indexOfElement = _.findIndex(storage.cards112, function(obj){
                    return obj.id === card112Id;
                });
                if(indexOfElement === -1){
                    console.error("не удалось удалить карточку112 с id:" + JSON.stringify(card112Id) + ", ибо элемент не найден");
                }
                else {
                    storage.cards112.splice(indexOfElement, 1);
                    if(storage.dataOfStates.card112.selectedCard112){
                        if(storage.dataOfStates.card112.selectedCard112.id === card112Id){
                            storage.dataOfStates.card112.selectedCard112 = null;
                            if(message.reason !== 'fire'){
                                $state.go('fires.firesbase', {
                                    deptId: undefined,
                                    fireId: undefined,
                                    fireType: undefined
                                });
                            }
                        }
                    }
                }
                $rootScope.$apply();
            });


            //приходит когда кто-то просмотрел какую-то карточку
            //и нужно пометить её в списке как просмотренную
            ws.$on('card112ViewedConfirm', function(message){
                var card112Id = message.card112Id;
                var isViewed = message.isViewed;
                var whoViewed = message.whoViewed;

                var element = _.find(storage.cards112, function(obj){
                    return obj.id === card112Id;
                });
                if(element === undefined){
                    console.log('не удалось найти карточку для изменения');
                }
                else {
                    element.isViewed = isViewed;
                    element.whoViewed = whoViewed;
                }
                $rootScope.$apply();
            });
            ws.$on('updateCard112', function(message){
                var card112Id = message.id;
                var card112WithBean = _.find(storage.cards112, function(obj){
                    return obj.id === card112Id;
                });
                if(card112WithBean === undefined){
                    console.log('не удалось найти карточку для изменения');
                }
                else {
                    angular.copy(message, card112WithBean);
                }
                $rootScope.$apply();
            });

            function playSound(el, soundfile){
                if(el.mp3){
                    if(el.mp3.paused) el.mp3.play();
                    else el.mp3.pause();
                } else {
                    el.mp3 = new Audio(soundfile);
                    el.mp3.play();
                }
            }

            var beep = {};
            //добавление любой карточки Внеш.Сист.
            ws.$on('addNew112Card', function(message){
                // console.log(message);
                var element = _.find(storage.cards112, function(obj){
                    return obj.id === message.id;
                });
                if(element === undefined){
                    storage.cards112.push(message);
                }
                else {
                    element = jQuery.extend(true, element, message);
                }
                growl.warning('Новая карточка из Внеш.Сист.!');
                playSound(beep, 'beep.mp3');
            });

            //В сценарии прихода карточки из Внеш.Сист.: принятие карточки-изменения. когда уже создан пожар
            //и пришло изменение его карточки Внеш.Сист.
            //заодно удаляем карточку из списка
            //-----------------------------------
            //В сценарии создания новой карточки: изменение карточки Внеш.Сист. недавно добавленного пожара
            ws.$on('card112ChangeViewed', function(message){
                var fireId = message.fireActId;

                var fireElement = _.find(storage.activeFires, function(obj){
                    return obj.id === fireId;
                });
                if(fireElement){
                    fireElement.card112ChangedRequest = message;
                }

                var card112Id = message.id;
                var indexOfElement = _.findIndex(storage.cards112, function(obj){
                    return obj.id === card112Id;
                });
                if(indexOfElement === -1){
                    //кейс если мы создаём новую карточку
                    //в списке её не будет, ибо мы сам отправляем её в Внеш.Сист.
                }
                else {
                    storage.cards112.splice(indexOfElement, 1);
                    if(storage.dataOfStates.card112.selectedCard112){
                        if(storage.dataOfStates.card112.selectedCard112.id === card112Id){
                            storage.dataOfStates.card112.selectedCard112 = null;
                            $state.go('fires.firesbase', {deptId: undefined, fireId: undefined, fireType: undefined});
                            growl.warning('Карточка из Внеш.Сист. была принята.');
                        }
                    }
                }
            });
        }]);

    Card112.$inject = ['$log', '$scope', 'ws', 'storage', '$location', '$stateParams', '$state', '$cookies', 'growl', '$interval', '$timeout'];
    function Card112($log, $scope, ws, storage, $location, $stateParams, $state, $cookies, growl, $interval, $timeout){
        var vm = this;
        vm.storage = storage;
        vm.storage.selectedFire = undefined;
        vm.cardFromFireToCompareWithNewCard = undefined;
        vm.selectedCard112 = Object.assign({}, storage.dataOfStates.card112.selectedCard112);

        vm.equivalenceTable = {
            decladdress: 'Адрес заявителя (по координатам)',
            regxaddress: 'Адрес 112',
            trueaddress: 'Адрес по координатам 112'
        };
        vm.selectedAddress = null;

        vm.selectAddress = function(key){

            if(key !== undefined && !!key === true && vm.selectedCard112.fireActTemplate.firePlace.addresses112.hasOwnProperty(key)){
                vm.selectedAddress = key;
                vm.selectedCard112.fireActTemplate.firePlace.address = Object.assign({}, vm.selectedCard112.fireActTemplate.firePlace.addresses112[key]);
            }

        };
        // console.log('message > ', JSON.stringify(message));


        if(vm.selectedCard112 && vm.selectedCard112.fireActId){
            var fireObj = _.find(storage.activeFires, function(obj){
                return obj.id = vm.selectedCard112.fireActId;
            });
            if(fireObj){
                vm.cardFromFireToCompareWithNewCard = fireObj.card112ChangedRequest;
            } else {
                growl.error("Не найдено происшествие, для которого пришло изменение карточки Внеш.Сист.");
                $state.go('fires.firesbase', {
                    deptId: undefined,
                    engineId: undefined,
                    fireId: undefined
                }, {location: true});
            }
        }
        ws.$emit('card112Viewed', vm.selectedCard112.id);

        // console.log('vm.selectedCard112 >', vm.selectedCard112);

        // console.log('vm.selectedCard112 > ', vm.selectedCard112);

        var relockCard112 = $interval(function(){
            // console.log('message.document > ', message.document);
            if(vm.storage.lockedCard112[vm.selectedCard112.id + ':card112'] != undefined){
                ws.$emit('relockDocument', vm.selectedCard112.id + ':card112');
                // ws.$emit('relockDocument', vm.storage.forma6.fireActId);
            }
        }, 10000);


        // console.log('vm.selectedCard112 >', vm.selectedCard112);

        if(vm.selectedCard112 !== undefined && vm.selectedCard112 !== null){
            ws.$emit('lockDocument', {'id': vm.selectedCard112.id + ':card112', 'typeDelivery': 'all'});
        }


        vm.createFireFromCard = function(selectedCard){


            // storage.dataOfStates.newFireOrder.card112 = Object.assign()({}, selectedCard);
            storage.dataOfStates.newFireCard.card112 = angular.merge({}, selectedCard);

            /*
             console.log(selectedCard);
             console.log(storage.dataOfStates.newFireOrder.card112);
             */

            // console.log('vm.selectedCard112 >>>', vm.selectedCard112);

            var rang = vm.storage.rangs.find(function(ran){
                if(ran.namefirerank == 1){
                    return ran;
                }
            });

            // var fp = vm.selectedCard112.fireActTemplate.firePlace;
            // var fp = angular.copy((vm.selectedCard112.fireActTemplate.firePlace) ? vm.selectedCard112.fireActTemplate : null);

            var fp = null;

            if(vm.selectedCard112 !== undefined & vm.selectedCard112 !== null && vm.selectedCard112.hasOwnProperty('fireActTemplate') && vm.selectedCard112.fireActTemplate !== undefined && vm.selectedCard112.fireActTemplate !== null && vm.selectedCard112.fireActTemplate.hasOwnProperty('firePlace') && !!vm.selectedCard112.fireActTemplate.firePlace === true){
                fp = Object.assign({}, vm.selectedCard112.fireActTemplate.firePlace);
                // fp = JSON.parse(JSON.stringify(vm.selectedCard112.fireActTemplate.firePlace));
            }


            var message;


            message = {
                fireActId: null,
                rank: (rang !== undefined? rang : null),
                firePlace: fp,
                incidentType: {
                    "id": "56a08ff06590a94bc3f4b1d4",
                    "code": 1,
                    "name": "ПОЖАР",
                    "helperId": "5437bfdd1e135661dd2da551",
                    "fireEngineTypes": []
                },
                floor: (vm.selectedCard112.fireActTemplate && vm.selectedCard112.fireActTemplate.floor)? vm.selectedCard112.fireActTemplate.floor : null,

                floors: (vm.selectedCard112.fireActTemplate && vm.selectedCard112.fireActTemplate.floors)? vm.selectedCard112.fireActTemplate.floors : null,

                doorCode: (vm.selectedCard112.fireActTemplate && vm.selectedCard112.fireActTemplate.doorCode)? vm.selectedCard112.fireActTemplate.doorCode : null,

                flat: (vm.selectedCard112.fireActTemplate && vm.selectedCard112.fireActTemplate.flat)? vm.selectedCard112.fireActTemplate.flat : null,

                comment: (vm.selectedCard112.fireActTemplate && vm.selectedCard112.fireActTemplate.comment)? vm.selectedCard112.fireActTemplate.comment : null,

                description: '',

                incidentSource: (vm.selectedCard112.fireActTemplate && vm.selectedCard112.fireActTemplate.incidentSource)? vm.selectedCard112.fireActTemplate.incidentSource : null,

                card112WithBean: (vm.selectedCard112.fireActTemplate && vm.selectedCard112)? vm.selectedCard112 : null
            };
            // console.log('>>>',  JSON.stringify(vm.selectedCard112.fireActTemplate));
            // console.log('>>>',  vm.selectedCard112);
            // console.log('message >>>', message);


// console.log('vm.selectedCard112 >>>', vm.selectedCard112);


            var getASR = vm.storage.incidentTypes.find(function(inc){
                if(inc.name.toUpperCase().includes('АСР')){
                    message.incidentType = Object.assign({}, inc);
                    return true;
                }

            });

            // console.log('message >>>>>>>>>>', message);

            ws.$emit('createFireCard112', message);

            $state.go('fires.newFireCard', {
                deptId: undefined,
                fireId: undefined,
                calledFrom: 'newFireCard'
            });
            /*
             $state.go('fires.newFireOrder', {
             deptId: undefined,
             fireId: undefined,
             fireType: (vm.selectedCard112 !== undefined & vm.selectedCard112 !== null && vm.selectedCard112.hasOwnProperty('fireActTemplate') && vm.selectedCard112.fireActTemplate !== undefined && vm.selectedCard112.fireActTemplate !== null && vm.selectedCard112.fireActTemplate.hasOwnProperty('firePlace') && vm.selectedCard112.fireActTemplate.firePlace.region.code == 1141) ? 3 : undefined
             // fireType: undefined
             });*/

            // $state.go('fires.orderEdit', {deptId: undefined, fireId: vm.selectedCard112.id, fireType: undefined});
            // $state.go('fires.orderEdit', {deptId: undefined, fireId: undefined, fireType: undefined});
        };

        vm.card112DtIncident = function(dt){
            return new Date(dt).toLocaleString();
        };

        vm.isValueChanged = function(propertyName){
            return !(vm.selectedCard112[propertyName] === vm.cardFromFireToCompareWithNewCard[propertyName]);
        };

        vm.rejectCard = function(selectedCard, reason){
            var eventName = "rejectCard112";
            var cardToSend = {
                id: selectedCard.id,
                reason: reason
            };
            ws.$emit(eventName, cardToSend);
        };

        vm.confirmNewCard = function(newCard){
            ws.$emit('card112ChangeViewed', newCard.fireActId);
        };

        $scope.$on('$viewContentLoaded', function(event){
            $timeout(function(){
                vm.selectAddress('regxaddress');
            });
        }, 0);


        $scope.$on('$destroy', function(){
            vm.storage.lockedCard112 = {};
            $interval.cancel(relockCard112);
            ws.$emit('unlockDocument', true);
        });


    }
})();
