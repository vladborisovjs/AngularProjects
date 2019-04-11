(function () {

    'use strict';
    angular
        .module('app.deptsNote.headCaraul', [])
        .controller('HeadCaraul', HeadCaraul)
        .run(['ws', 'storage', '$rootScope', 'growl', '$log', '$state', '$timeout', function (ws, storage, $rootScope, growl, $log, $state, $timeout) {
            ws.$on('updateHeadCaraul', function (message) {
                if(message!=undefined){
                    var caraulFromServer = message;
                    var realCaraul = _.find(storage.headCarauls, function (caraul) {
                        return caraul.caraulNum === caraulFromServer.caraulNum;
                    });
                    angular.copy(caraulFromServer, realCaraul);
                }
            });
        }])
    ;

    HeadCaraul.$inject = ['$log', '$scope', 'ws', 'storage', '$location', '$stateParams', '$state', '$rootScope', '$timeout', '$anchorScroll', '$cookies', 'engineTypeSortingAlgorythm'];

    function HeadCaraul($log, $scope, ws, storage, $location, $stateParams, $state, $rootScope, $timeout, $anchorScroll, $cookies, engineTypeSortingAlgorythm) {
        var vm = this;
        vm.storage = storage;
        vm.currentHeadCaraul = jQuery.extend({},
            _.find(storage.headCarauls, function (caraul) {
                return caraul.caraulNum === storage.globalSettings.currentCaraul;
            })
        );

        console.log(vm.currentHeadCaraul);

        // {{headCaraul.storage.fireUser.ACCESS.words.UPO}}


        vm.saveHeadCaraul = function () {
            if (vm.currentHeadCaraul != undefined) {
                ws.$emit('updateHeadCaraul', vm.currentHeadCaraul);
            }
        }
    }
})();
