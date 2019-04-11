angular.module('modals')
    .controller('MatchAdressController', MatchAdressController);

        MatchAdressController.$inject = ['$uibModalInstance', 'title', 'text', '$state'];

        function MatchAdressController($uibModalInstance, title, text, $state){

        var vm = this;
        vm.title = title;
        vm.text = text;
        vm.text.orders = text.orders.join(', ');


        vm.cancel = function(){
            $uibModalInstance.dismiss('test');
            $state.go('fires.firesbase', {deptId: undefined, engineId: undefined, fireId: undefined}, {location: true});
        };

        vm.ok = function(){
            $uibModalInstance.close();
        };

    };
