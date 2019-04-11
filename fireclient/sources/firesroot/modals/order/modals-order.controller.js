angular.module('modals')
    .controller('OrderController', function OrderController($uibModalInstance, type, title, text) {
        var vm = this;
        vm.type = type;
        vm.title = title;
        vm.text = text;
        vm.ok = () => $uibModalInstance.close();
    });
