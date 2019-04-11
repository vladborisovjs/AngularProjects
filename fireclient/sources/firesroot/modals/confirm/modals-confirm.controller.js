angular.module('modals')
    .controller('ConfirmController', function ConfirmController($uibModalInstance, title, text) {
        var vm = this;
        vm.title = title;
        vm.text = text;
        vm.cancel = ()=>$uibModalInstance.dismiss();
        vm.ok = ()=>$uibModalInstance.close();
    });
