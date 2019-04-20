(function(){
    'use strict';
    angular
        .module('app.LoginPageCtrl', ['ui.router'])
        .controller('LoginPageCtrl', LoginPageCtrl);
    LoginPageCtrl.$inject = ['ws', 'storage', '$scope', '$timeout', 'cuksUser', "clientVersion", '$http', '$window', '$location', '$state', 'ReloadLoginPage', 'switchSocketServer', 'invertLocale'];
    function LoginPageCtrl(ws, storage, $scope, $timeout, cuksUser, clientVersion, $http, $window, $location, $state, ReloadLoginPage, switchSocketServer, invertLocale){


        if(ReloadLoginPage === true){
            //TODO: функция для перезагрузки страницы ( 2 )
            if(storage.loginUser === true){
                storage.loginUser = null;
                $window.location.assign('#');
                $window.location.reload();
                // console.log($state);
                // console.log($window.location.href);
                // $window.location.reload($window.location.href);
                // $route.reload();

            }
        }
        // console.log('storage > ', storage);


        var vm = this;
        // var eventName = "login";

        vm.storage = storage;
        vm.clientVersion = clientVersion;
        vm.ws = ws;
        vm.inputFlags = {};
        // storage.socketStatus.dates.push(Date.now());

        // storage.socketStatus.dates = [];

        if(cuksUser != null || cuksUser != {}){
            vm.loginUser = jQuery.extend({}, cuksUser);
            vm.loginUser.locale = Object.keys(vm.storage.clientSettings.locale)[0];
            vm.loginUser.from = 'cuks';

        } else {
            vm.loginUser = {};
        }

        // ws.$open();
        switchSocketServer.init();


        vm.showLocale = function(){
            return vm.storage.clientSettings.locale[Object.keys(vm.storage.clientSettings.locale)[0]];
        };

        vm.selectLocale = function(key, value){
            // console.log('selectLocale >', arguments);
            vm.storage.clientSettings.locale = {};
            vm.storage.clientSettings.locale[key] = value;
            vm.loginUser.locale = '';
            vm.loginUser.locale = key;
        };
        vm.auth = function(){
            storage.socketStatus.dates = [Date.now()];
            vm.loginUser.dates = storage.socketStatus.dates;
            var message = Object.assign(vm.loginUser, {lastBuildDate: vm.storage.lastBuildDate.clientBuild});
            ws.$emit('login', message);

            // invertLocale.invert();

/*
            var l = storage.dictionary.dictData.length;
            var selLoc = Object.keys(vm.storage.clientSettings.locale)[0];
            storage.dictionary.localeDictData = {
                rus: {},
                [selLoc]: {}
            };

            for(var i = 0; i < l; i++){
                storage.dictionary.localeDictData.rus[storage.dictionary.dictData[i].rus] = {
                    // rus: storage.dictionary.dictData[i].rus,
                    [selLoc]: storage.dictionary.dictData[i][selLoc]
                };
                storage.dictionary.localeDictData[selLoc][storage.dictionary.dictData[i][selLoc]] = {
                    rus: storage.dictionary.dictData[i].rus
                    // ,[selLoc]: storage.dictionary.dictData[i][selLoc]
                };
            }
                console.log('storage.dictionary.localeDictData', storage.dictionary.localeDictData);
*/
        };


// ws.$emit(eventName, vm.loginUser);

//             storage.loginUser = vm.loginUser;


        vm.allowGoToNextField = function($event){
            if($event.which == 13){
                vm.auth();
                var targetId = $event.target.id;
                vm.inputFlags[targetId] = true;
            }
        };
        vm.goToNextField = function($event, nextId){
            //Оставь надежду всяк сюда входящий
            //P.S. прости, чувак
//16 или 13??
            if($event.which == 13){
                var targetId = $event.target.id;
                if(vm.inputFlags[targetId]){
                    var nextIdString = '';
                    if(targetId == 'login'){
                        nextIdString = 'password'
                    }
                    if(targetId == 'password'){
                        nextIdString = 'submitButton'
                    }
                    var $nextInput = jQuery('#' + nextIdString);
                    if($nextInput.is('button') || $nextInput.is('input') || $nextInput.is('textarea')){
                        $timeout(function(){
                            $nextInput.focus();
                        }, 0);
                    } else {
                        $timeout(function(){
                            //jQuery('#' + nextIdString + ' ' + 'input').last().focus();
                            $scope.$broadcast('login:SetFocus');
                        }, 0);
                    }
                }
            }
        };
//да, мне стыдно за этот костыль.
        $timeout(function(){
            jQuery('#login').focus();
        }, 50);


        var lastBuildDate = function(){
            /*
             $http(
             {method: 'GET', url: './sources/js/buildCreationDate.js'}
             ).then(
             function success(response){
             storage.lastBuildDate = {
             'date': response.data.short,
             'visible': false
             };

             }
             );
             */
            storage.lastBuildDate = {
                'clientBuild': $window._buildCreationDate.lastBuild,
                'date': $window._buildCreationDate.short,
                'visible': false
            };

        };

        vm.showBuildDate = function(){
            vm.storage.lastBuildDate.visible = !vm.storage.lastBuildDate.visible;


            /*            ws.$emit('changeBuildingAddresses',
             {
             'buildings': [
             {
             comment: null,
             houseno: "57/26",
             street: "Сердобольская улица"
             },
             {
             comment: "чтото",
             houseno: "26/57",
             street: "Белоостровская улица"
             }
             ],
             'x': 30.313755623142896,
             'y': 59.9875037374845,
             'command': 'set'
             }
             );*/


        };

        lastBuildDate();
// storage.socketStatus.isReconnecting = false;
// console.log('test: ', JSON.stringify(storage));

        $scope.$on('$viewContentLoaded', function(event){
            ws.$emit('dictionary', {locale: 'rus'});
/*
            console.log('>>>', $window);
            if($window.hasOwnProperty('autoLogin')){
                $window.autoLogin();
            }
*/
        });


// console.log(ws.$status());
        if(ReloadLoginPage === true){
            //TODO: функция для перезагрузки страницы ( 3 )
            if(storage.hasOwnProperty('fireUser') && storage.fireUser.hasOwnProperty('pwd') && storage.fireUser.hasOwnProperty('ACCESS')){
                $state.go(storage.fireUser.ACCESS.stateProvider);
            }
        }

    }
})
();
