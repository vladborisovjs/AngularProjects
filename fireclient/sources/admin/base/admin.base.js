(function(){

    'use strict';
    angular
        .module('app.admin.base', [])
        .controller('AdminBase', AdminBase);

    AdminBase.$inject = ['$log', '$scope', 'ws', 'storage', '$cookies', '$stateParams', '$state', '$rootScope', '$timeout', '$window', 'ngTableParams', '$filter'];
    function AdminBase($log, $scope, ws, storage, $cookies, $stateParams, $state, $rootScope, $timeout, $window, ngTableParams, $filter){


        var vm = this;
        vm.storage = storage;




/*
        $scope.$on('ngTableAfterReloadData', function(event){
            console.log(event);
        });
*/

/*
        console.log('ngTableEventsChannel', ngTableEventsChannel);
        ngTableEventsChannel.onDatasetChanged(function(event){
            console.log('event', event);
        }, $scope);
*/


        vm.openSessionsTable = new ngTableParams({}, {dataset: vm.storage.superadmin.usersOnline});
        vm.openSessionsTable = new ngTableParams({
            sorting: {
                uid: 'asc'
            }
        }, {
            getData: function($defer, params){
                vm.storage.superadmin.usersOnline = $filter('orderBy')(vm.storage.superadmin.usersOnline, params.orderBy());
                $defer.resolve(vm.storage.superadmin.usersOnline);

            }
        });

        vm.errorsFromServerTable = new ngTableParams({}, {dataset: vm.storage.superadmin.consoleError});
        vm.errorsFromServerTable = new ngTableParams({
            sorting: {
                timestamp: 'desc'
            }
        }, {
            getData: function($defer, params){
                vm.storage.superadmin.consoleError = $filter('orderBy')(vm.storage.superadmin.consoleError, params.orderBy());
                $defer.resolve(vm.storage.superadmin.consoleError);
            }
        });

        vm.consoleFromServerTable = new ngTableParams({}, {dataset: vm.storage.superadmin.consoleInfo});
        vm.consoleFromServerTable = new ngTableParams({
            sorting: {
                timestamp: 'desc'
            }
        }, {
            getData: function($defer, params){
                vm.storage.superadmin.consoleInfo = $filter('orderBy')(vm.storage.superadmin.consoleInfo, params.orderBy());
                $defer.resolve(vm.storage.superadmin.consoleInfo);
            }
        });

        vm.debugFromServerTable = new ngTableParams({}, {dataset: vm.storage.superadmin.consoleDebug});
        vm.debugFromServerTable = new ngTableParams({
            sorting: {
                timestamp: 'desc'
            }
        }, {
            getData: function($defer, params){
                vm.storage.superadmin.consoleDebug = $filter('orderBy')(vm.storage.superadmin.consoleDebug, params.orderBy());
                $defer.resolve(vm.storage.superadmin.consoleDebug);
            }
        });


        vm.getUsersOnline = function(){
            // console.log('vm.storage.superadmin >>>', vm.storage.superadmin);
            ws.$emit('getSessions', true);
        };

        vm.clearHistory = function(from){
            if(!!from === true){
                vm.storage.superadmin[from] = [];
/*
                switch(from){
                    case 'errors':
                        vm.storage.superadmin.consoleError = [];
                        break;
                    case 'console':
                        vm.storage.superadmin.console = [];
                        break;
                }
*/
            }
        };


        vm.maximizeWindow = function(event){

            if(event.currentTarget.classList.contains('fill-window')){
                event.currentTarget.classList.remove('fill-window');
            } else {
                event.currentTarget.classList.add('fill-window');
            }

        }


        function onStateEnter(){
            // vm.getUsersOnline();
        };


        $scope.$on('$viewContentLoaded', function(event, toState, toParams, fromState, fromParams){
            onStateEnter();
        });


    }

})();
