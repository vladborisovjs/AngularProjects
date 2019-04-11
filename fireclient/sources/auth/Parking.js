(function () {
    'use strict';
    angular
        .module('app.ParkingCtrl', ['ui.router'])
        .controller('ParkingCtrl', ParkingCtrl);
    ParkingCtrl.$inject = ['ws', 'storage', '$scope', 'WSURL'];
    function ParkingCtrl(ws, storage, $scope, WSURL) {
        var vm = this;
        vm.storage = storage;
        vm.ws = ws;
        storage.activeFires = [];
        vm.startWork = function () {
            console.log('START WORK');
            //TODO допилить логику в случае если сокет уже открыт или уже закрыт
            ws.$close();
            ws.$open();
            console.log(ws.$status());
        };
    }
})();