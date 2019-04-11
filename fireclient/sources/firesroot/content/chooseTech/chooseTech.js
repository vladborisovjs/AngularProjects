(function () {

    'use strict';
    angular
        .module('app.chooseTech', [])
        .controller('ChooseTech', ChooseTech);

    ChooseTech.$inject = ['$log', '$scope', 'ws', 'storage', '$location', '$state'];
    function ChooseTech($log, $scope, ws, storage, $location, $state) {
        // $log.log('ChooseTech reloaded');
        var vm = this;
        vm.storage = storage;
        $scope.isActive = function (viewLocation) {
            var v1 = $location.path();
            return (viewLocation === $location.path());
        };
        vm.enableAllTechStates = function () {
            var state = _.find(storage.states, function (state) {
                return state.name === 'В РАСЧЕТЕ'
            });
            _.each(storage.fireDepartments, function (dept) {
                _.each(dept.fireEngines, function (engine) {
                    var command = {
                        deptId: dept.id,
                        engineId: engine.idFireEngine,
                        toStateId: state.id
                    };
                    ws.$emit('changeState', command);
                });
            })
        };
        vm.disableAllTechStates = function () {
            var state = _.find(storage.states, function (state) {
                return state.name === 'ВЫКЛ'
            });
            _.each(storage.fireDepartments, function (dept) {
                _.each(dept.fireEngines, function (engine) {
                    var command = {
                        deptId: dept.id,
                        engineId: engine.idFireEngine,
                        toStateId: state.id
                    };
                    ws.$emit('changeState', command);
                });
            })
        };

        vm.changeStateCorrect = function(){
            $state.go('fires.chooseTech.byStatus', {paramState: null});
        };
    }
})();
