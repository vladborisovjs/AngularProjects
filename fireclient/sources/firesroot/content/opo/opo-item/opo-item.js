(function () {
    'use strict';
    angular
        .module('app.opo')
        .controller('OpoItemController', OpoItemController);
    OpoItemController.$inject = ['ws', 'storage', '$rootScope', 'WMSURL', 'GSLAYERS', '$scope', 'growl', 'opo', '$state'];

    function OpoItemController(ws, storage, $rootScope, WMSURL, GSLAYERS, $scope, growl, opo, $state) {
        const vm = this;
        // get opo object from resolver
        vm.opo = opo;

        vm.save = () => {
            ws.$emit('adminOpo', {
                mode: 'save',
                opo: vm.opo
            });
        };

        vm.delete = () => {
            ws.$emit('adminOpo', {
                mode: 'delete',
                opo: vm.opo
            });
            $state.go('^');
        };

        vm.cancel = () => {
            $state.go('^');
        };

        vm.addOrg = () => {
            vm.opo.hydrantHolders.push({});
        };

        vm.deleteOrg = (idx) => {
            vm.opo.hydrantHolders = vm.opo.hydrantHolders.filter((holder, id) => id !== idx);
        };
    }
})();
