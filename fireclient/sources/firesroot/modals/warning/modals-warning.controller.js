angular.module('modals')
    .controller('WarningController', function WarningController($uibModalInstance, title, text) {
        var vm = this;
        vm.title = title;
        vm.text = text;
        vm.ok = ()=>$uibModalInstance.close();
    });
