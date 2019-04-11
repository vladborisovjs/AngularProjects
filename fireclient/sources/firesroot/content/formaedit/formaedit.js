(function(){
    'use strict';
    angular
        .module('app.formaedit', [])
        .controller('Formaedit', Formaedit)
        .run(['$rootScope', 'ws', '$log', 'storage', 'growl', '$state', function($rootScope, ws, $log, storage, growl, $state){
        }]);

    Formaedit.$inject = ['$log', '$scope', 'ws', 'storage', '$location', '$state', '$stateParams', '$anchorScroll', '$interval'];
    function Formaedit($log, $scope, ws, storage, $location, $state, $stateParams, $anchorScroll, $interval){
        var vm = this;
        vm.storage = storage;
        vm.selectedF6 = undefined;


        vm.selectF6 = function(forma6){
            ws.$emit('lockDocument', {'id': forma6.fireActId + ':forma', 'typeDelivery': 'all'});
            storage.dataOfStates.formaViewOnly = false;
        };
        var updateFormsLockState = $interval(function(){
            if(storage.dispForms6.length > 0){
                var currentListOfFormsId = _.map(storage.dispForms6, function(forma){
                    return forma.fireActId + ':forma';
                });
                ws.$emit('listLocks', currentListOfFormsId);
            }
        }, 10000);
        $scope.$on('$destroy', function(){
            $interval.cancel(updateFormsLockState);
            updateFormsLockState = undefined;
        });
        vm.isFormaInEdit = function(forma){
            if(forma != undefined){
                var formInEdit = _.find(storage.listOfLocks, function(formaInEdit){
                    return formaInEdit.document == forma.fireActId + ':forma';
                });
                if(formInEdit != undefined){
                    return formInEdit.fireUser.lastName;
                }
            }
        };
        var columnDefs = [
            {
                name: 'Дата',
                field: "fireBeginingDate5",
                cellFilter: "date:'dd-MM-yy HH:mm'",
                width: 120,
                filterCellFiltered: true,
                enableColumnMenu: false
            }, {
                name: '№',
                field: "orderNumber76",
                width: 40,
                enableColumnMenu: false
            }, {
                name: 'Субъект',
                field: "subjectRF1.text",
                width: 150,
                enableColumnMenu: false
            }, {
                name: 'Район',
                field: "district",
                width: 150,
                enableColumnMenu: false
            }, {
                name: 'Адрес',
                field: "address",
                enableColumnMenu: false

            }, {
                name: 'Объект',
                field: "objectName",
                enableColumnMenu: false
            }, {
                name: vm.storage.fireUser.ACCESS.words.pch,
                field: "districtOut78",
                width: 60,
                enableColumnMenu: false
            }, {
                name: 'Ранг',
                field: "fireRang79",
                width: (vm.storage.fireUser.ACCESS.commonSwitches.rank === true)? 60 : 0,
                enableColumnMenu: false
            }, {
                name: 'Тип',
                field: "typeFire80",
                width: 90,
                enableColumnMenu: false
            }, {
                name: 'Редакт.',
                cellTemplate: '<button class="btn btn-default" ng-click="grid.appScope.formaedit.selectF6(row.entity)" ng-hide="grid.appScope.formaedit.isFormaInEdit(row.entity)">Ред.</button><span ng-show="grid.appScope.formaedit.isFormaInEdit(row.entity)">{{grid.appScope.formaedit.isFormaInEdit(row.entity)}}</span>',
                enableColumnMenu: false,
                width: 80,
                enableSorting: false,
                enableFiltering: false
            }
        ];
        $scope.$watch(function(){
                return storage.dispForms6;
            },
            function(newValue, oldValue){
                vm.gridOptions.data = storage.dispForms6;
            }
        );
        vm.gridOptions = {
            columnDefs: columnDefs,
            data: storage.dispForms6,
            enableSorting: true,
            enableFiltering: true,
            enableRowSelection: true,
            enableSelectAll: false,
            enableRowHeaderSelection: false,
            multiSelect: false,
            fastWatch: true
        };
        vm.gridOptions.onRegisterApi = function(gridApi){
            vm.protocolGridApi = gridApi;
        };
    }


})();
