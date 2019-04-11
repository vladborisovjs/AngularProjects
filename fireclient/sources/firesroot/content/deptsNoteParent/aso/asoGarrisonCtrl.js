(function () {

    'use strict';
    angular
        .module('app.deptsNote.asoGarrison', [])
        .controller('AsoGarrison', AsoGarrison);

    AsoGarrison.$inject = ['$log', '$scope', 'ws', 'storage', '$location', '$stateParams', '$state', '$rootScope', '$timeout', '$anchorScroll', '$cookies', 'engineTypeSortingAlgorythm'];

    function AsoGarrison($log, $scope, ws, storage, $location, $stateParams, $state, $rootScope, $timeout, $anchorScroll, $cookies, engineTypeSortingAlgorythm) {
        var vm = this;
        var depts = storage.fireDepartments;
        vm.storage = storage;

        vm.groupedAsoList = [];

        function countAllAso() {
            var fullAsoList = [];
            _.each(depts, function (dept) {
                _.each(dept.fireEquipments, function (aso) {
                    fullAsoList.push({aso:aso,dept:dept.fireDeptName});
                });
                _.each(dept.fireEngines, function (eng) {
                    _.each(eng.equipmentsOnBoard, function (aso) {
                        fullAsoList.push({aso:aso,dept:dept.fireDeptName});
                    })
                })
            });
            vm.groupedAsoList = _.groupBy(fullAsoList, function (aso) {
                // console.log('aso >>>>', aso);
                if(!!aso.aso !== false){
                    return aso.aso.eqType.name
                }
                return '';
            });
        }

        countAllAso();
    }
})();
