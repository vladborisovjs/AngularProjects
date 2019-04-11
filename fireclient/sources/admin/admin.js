(function(){
    'use strict';
    angular
        .module('app.admin', [])
        .run(['ws', 'storage', '$rootScope', 'growl', '$log', '$state', '$timeout', '$anchorScroll', '$window', function(ws, storage, $rootScope, growl, $log, $state, $timeout, $anchorScroll, $window){
            function scrollToEnd(){
                $anchorScroll('message-row-' + (storage.operationalMessages.length - 1));
            }

/*
            ws.$on('addOperationalMessages', function(message){
                storage.operationalMessages.push(message);
                $timeout(scrollToEnd, 0);
                $rootScope.$apply();
            });
*/

        }])
        .controller('Admin', Admin)
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

    Admin.$inject = ['$log', '$rootScope', '$scope', 'ws', 'growl', 'storage', '$location', '$stateParams', '$state', '$cookies', '$window', '$interval', '$anchorScroll', '$timeout', '$filter', 'hotkeys', 'modalsService', 'logoutUserFromSystem', 'HTTPURLDesktop'];
    function Admin($log, $rootScope, $scope, ws, growl, storage, $location, $stateParams, $state, $cookies, $window, $interval, $anchorScroll, $timeout, $filter, hotkeys, modalsService, logoutUserFromSystem, HTTPURLDesktop){
        var vm = this;

        storage.superadmin = {
            usersOnline: [],
            consoleError: [],
            consoleInfo: [],
            consoleDebug: []
        };

        vm.storage = storage;

        var ticket;

        vm.closeOneSession = function(){
            ticket = $cookies.get('ticket');
            var eventName = "closeOneSession";
            logoutUserFromSystem();
            ws.$emit(eventName, ticket);
            ws.$emit('unlockDocument', true);
        };






        ws.$on('getSessions', function(message){
            if(!!message === true && message instanceof Array){

                message.forEach(function(elem, idx){
                    if(elem.hasOwnProperty('roles') && elem.roles instanceof Array && !!elem.roles.length === true){
                        message[idx].role = ACCESS.hasOwnProperty(elem.roles[0]) ? elem.roles[0] : 'pch';
                    }
                });
                storage.superadmin.usersOnline = message;
                message = null;
                $rootScope.$apply();
            }
        });

        ws.$on('console_error', function(message){
            if(!!message === true){

                storage.superadmin.consoleError.push(message);


                if(storage.superadmin.consoleError.length > 500){
                    storage.superadmin.consoleError.splice(0, storage.superadmin.consoleError.length - 500);
                }



/*
                storage.superadmin.consoleError.push({
                    message: message,
                    timestamp: new Date()
                });
*/
                $rootScope.$apply();
            }
        });

        ws.$on('console_info', function(message){
            if(!!message === true){

                storage.superadmin.consoleInfo.push(message);

                if(storage.superadmin.consoleInfo.length > 500){
                    storage.superadmin.consoleInfo.splice(0, storage.superadmin.consoleInfo.length - 500);
                }


/*
                storage.superadmin.console.push({
                    message: message,
                    timestamp: new Date()
                });
*/
                $rootScope.$apply();
            }
        });

        ws.$on('console_debug', function(message){
            if(!!message === true){

                storage.superadmin.consoleDebug.push(message);


                if(storage.superadmin.consoleDebug.length > 500){
                    storage.superadmin.consoleDebug.splice(0, storage.superadmin.consoleDebug.length - 500);
                }

                /*
                 storage.superadmin.consoleDebug.push({
                 message: message,
                 timestamp: new Date()
                 });
                 */
                $rootScope.$apply();
            }
        });



        function onResize(e){
            storage.layout.middle.style.height = ($window.innerHeight - storage.layout.height) + 'px';
        };

        angular.element($window).bind('resize', onResize);

        var _height = $window.document.body.querySelector('#navbarLayout').offsetHeight + $window.document.body.querySelector('#middleLayout').offsetHeight;
        storage.layout = {
            middle: $window.document.body.querySelector('#middleLayout'),
            height: _height
        };

        onResize();

        $scope.$on('$destroy', function(){
            storage.layout.middle = null;
        });


    };

})();

