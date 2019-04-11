(function () {
    'use strict';
    angular
        .module('app.ChangePassPageCtrl', [])
        .controller('ChangePassPageCtrl', ChangePassPageCtrl);
    ChangePassPageCtrl.$inject = ['ws', 'storage', '$scope', 'growl', '$state'];
    function ChangePassPageCtrl(ws, storage, $scope, growl, $state) {
        var vm = this;
        var eventName = "changePassword";
        vm.storage = storage;
        vm.ws = ws;
        vm.oldPass = '';
        vm.newPass = '';
        vm.newPassRepeat = '';

        vm.cancel = function () {
            $state.go('fires.firesbase');
        };

        vm.changePass = function () {
            if (vm.newPass == vm.newPassRepeat) {
                ws.$emit(eventName, {
                    oldPass: vm.oldPass,
                    newPass: vm.newPass
                });
            } else {
                growl.warning('Поля не совпадают!');
            }
        };
    }
})();
