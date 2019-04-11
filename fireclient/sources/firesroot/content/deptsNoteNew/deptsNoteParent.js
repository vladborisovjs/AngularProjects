(function () {

    'use strict';
    angular
        .module('app.deptsNotes', [])
        .controller('DeptsNotes', DeptsNote);

    DeptsNote.$inject = ['$log', '$scope', 'ws', 'storage', '$location', '$state'];
    function DeptsNote($log, $scope, ws, storage, $location, $state) {
        var vm = this;
        vm.storage = storage;










        $scope.isActive = function (viewLocation) {
            var v1 = $location.path();
            return (viewLocation === $location.path());
        };
        vm.enableAllTechStatuses = function () {
            var status = _.find(storage.statuses, function (status) {
                return status.name === 'В РАСЧЕТЕ'
            });
            _.each(storage.fireDepartments, function (dept) {
                _.each(dept.fireEngines, function (engine) {
                    var command = {
                        deptId: dept.id,
                        engineId: engine.idFireEngine,
                        toStatusId: status.id
                    };
                    ws.$emit('changeStatus', command);
                });
            })
        };
        vm.disableAllTechStatuses = function () {
            var status = _.find(storage.statuses, function (status) {
                return status.name === 'ВЫКЛ'
            });
            _.each(storage.fireDepartments, function (dept) {
                _.each(dept.fireEngines, function (engine) {
                    var command = {
                        deptId: dept.id,
                        engineId: engine.idFireEngine,
                        toStatusId: status.id
                    };
                    ws.$emit('changeStatus', command);
                });
            })
        };











    }
})();
