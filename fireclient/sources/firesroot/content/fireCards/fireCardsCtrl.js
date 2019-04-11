(function(){
    'use strict';
    angular
        .module('app.fireCards', [])
        .controller('FireCards', FireCards)
        .run(['$rootScope', 'ws', '$log', 'storage', 'growl', '$state', function($rootScope, ws, $log, storage, growl, $state){
            ws.$on('getInvestigatorsForma6', function(message){
                if(Array.isArray(message)) storage.dataOfStates.fireCards = message;
                var currentListOfFormsId = _.map(storage.dataOfStates.fireCards, function(forma){
                    return forma.fireActId + ':forma';
                });
                ws.$emit('listLocks', currentListOfFormsId);
                storage.hideLoadingOverlay = true;
                $rootScope.$apply();
            });
        }]);

    FireCards.$inject = ['$log', '$scope', 'ws', 'storage', '$location', '$state', '$stateParams', '$anchorScroll', '$interval', '$window', '$timeout'];
    function FireCards($log, $scope, ws, storage, $location, $state, $stateParams, $anchorScroll, $interval, $window, $timeout){
        var vm = this;
        vm.storage = storage;
        var updateFormsLockState = $interval(function(){
            if(storage.dataOfStates && storage.dataOfStates.fireCards && storage.dataOfStates.fireCards.length > 0){
                var currentListOfFormsId = _.map(storage.dataOfStates.fireCards, function(forma){
                    return forma.fireActId + ':forma';
                });
                ws.$emit('listLocks', currentListOfFormsId);
            }
        }, 10000);
        $scope.$on('$destroy', function(){
            $interval.cancel(updateFormsLockState);
            updateFormsLockState = undefined;
        });


        var sufferers = {
            totaldied25: false,
            totalinjured26: false,
            peopleaved40_1: false
        };


        vm.showPeopleByCount = function(check){
            if(!!check === true){
                sufferers[check] = !sufferers[check];
            }

            vm.protocolGridApi.grid.rows.forEach(function(row){
                var found = false,
                    foundBefore = false;

                for(var i in sufferers){
                    if(sufferers.hasOwnProperty(i)){
                        if(sufferers[i] === true){
                            foundBefore = true;
                            if(!isNaN(parseInt(row.entity[i], 10)) && row.entity[i] * 1 > 0){
                                found = true;
                            }
                        }
                    }
                }
                if(found){
                    vm.protocolGridApi.core.clearRowInvisible(row);
                } else {
                    if(foundBefore){
                        vm.protocolGridApi.core.setRowInvisible(row);
                    } else {
                        vm.protocolGridApi.core.clearRowInvisible(row);
                    }
                }

            });
        };


        function cellTmp(title, from){

            return '<div class="firecards-header-template ">' +
                '<div role="button" tabindex="0" class="ui-grid-header-cell-primary-focus ui-grid-cell-contents" col-index="renderIndex">' +
                '<span class="ui-grid-header-cell-label ng-binding" ui-grid-one-bind-id-grid="col.uid + \'-header-text\'" id="col.uid + \'-header-text\'">' +
                title +
                '</span> ' +
                '<span ui-grid-one-bind-id-grid="col.uid + \'-sortdir-text\'" ui-grid-visible="col.sort.direction" aria-label="Sort None" class="ui-grid-invisible" id="col.uid + \'-sortdir-text\'">' +
                '<i ng-class="{ \'ui-grid-icon-up-dir\': col.sort.direction == asc, \'ui-grid-icon-down-dir\': col.sort.direction == desc, \'ui-grid-icon-blank\': !col.sort.direction }" title="" aria-hidden="true" class="ui-grid-icon-blank">' +
                '</i> ' +
                '<sub class="ui-grid-sort-priority-number ng-binding"></sub>' +
                '</span>' +
                '</div>' +
                '<input type="checkbox" ng-click="grid.appScope.formaedit.showPeopleByCount(\'' + from + '\')">&nbsp;<i class="fa fa-male" aria-hidden="true"></i>' +
                '</div>';

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
                name: '№ приказа',
                field: "orderNumber76",
                width: 40,
                enableColumnMenu: false
            }, {
                name: 'Субъект',
                field: "subjectRF1.text",
                maxWidth: 150,
                enableColumnMenu: false,
                resizable: true
            }, {
                name: 'Район',
                field: "district",
                enableColumnMenu: false
            }, {
                name: 'Адрес',
                field: "address",
                enableColumnMenu: false,
                resizable: true

            }, {
                name: 'Объект',
                field: "objectName",
                enableColumnMenu: false,
                resizable: true

            }, {
                name: 'СЧ',
                field: "districtOut78",
                width: 60,
                enableColumnMenu: false,
                resizable: true
            },
/*

             {
                name: 'Ранг',
                field: "fireRang79",
                width: 60,
                enableColumnMenu: false
            },

*/
             {
                name: 'Тип',
                field: "typeFire80",
                width: 90,
                enableColumnMenu: false
            }, {
                name: 'Погибло',
                field: "totaldied25",
                width: 100,
                enableFiltering: false,
                enableColumnMenu: false,
                headerCellTemplate: cellTmp('Погибло', 'totaldied25')
            }, {
                name: 'Травмировано',
                field: "totalinjured26",
                width: 100,
                enableFiltering: false,
                enableColumnMenu: false,
                headerCellTemplate: cellTmp('Травмировано', 'totalinjured26')
            }, {
                name: 'Спасено',
                field: "peopleaved40_1",
                width: 100,
                enableFiltering: false,
                enableColumnMenu: false,
                headerCellTemplate: cellTmp('Спасено', 'peopleaved40_1')
            }, {
                name: 'На учет',
                field: "recordOwner81.text",
                width: 90,
                enableColumnMenu: false
            }, {
                name: 'Эвакуированы',
                field: "totalevacuated40",
                width: 90,
                enableColumnMenu: false
            }, {
                name: 'Исполнитель',
                cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.formaedit.getExecutor(row.entity.user)}}</div>',
                // field: "grid.appScope.formaedit.getExecutor(row)",
                width: 90,
                enableColumnMenu: false
            }, {
                name: 'Просмотр',
                cellTemplate: '<button class="btn btn-default" ng-click="grid.appScope.formaedit.selectF6(row.entity)" >Открыть</button>',
                enableColumnMenu: false,
                width: 80,
                enableSorting: false,
                enableFiltering: false
            }
        ];

        vm.getExecutor = function(user){
            if(!!user === true){
                return user.lastName + ' ' + user.firstName;
            }
            return '';
        };

        vm.selectF6 = function(forma6){
            ws.$emit('getForma6', forma6.fireActId);
            storage.dataOfStates.formaViewOnly = true;
        };
        $scope.$watch(function(){
                return storage.dataOfStates.fireCards;
            },
            function(newValue, oldValue){
                vm.gridOptions.data = storage.dataOfStates.fireCards;
            }
        );

        vm.gridOptions = {
            columnDefs: columnDefs,
            data: storage.dataOfStates.fireCards,
            enableColumnResizing: true,
            enableSorting: true,
            enableFiltering: true,
            enableRowSelection: true,
            enableSelectAll: false,
            enableRowHeaderSelection: false,
            multiSelect: false,
            fastWatch: true,
            showGridFooter: false
        };


        vm.gridOptions.onRegisterApi = function(gridApi){
            vm.protocolGridApi = gridApi;

            vm.protocolGridApi.core.on.canvasHeightChanged($scope, function(){
                $timeout(function(){
                    var viewport = $window.document.body.querySelector('.ui-grid-viewport');
                    if(!!viewport === true && !!storage.dataOfStates.fireCardsGridControl.selectedRow === true && vm.gridOptions.data.length > 0){

                        viewport.scrollLeft = storage.dataOfStates.fireCardsGridControl.scroll.x;
                        viewport.scrollTop = storage.dataOfStates.fireCardsGridControl.scroll.y;
                    }
                }, 100);
            });


            vm.protocolGridApi.selection.on.rowSelectionChanged($scope,
                function(row, event){
                    vm.registerSelectedRow(row, event);
                }
            );

            if(!!storage.dataOfStates.fireCardsGridControl.selectedRow === true && vm.gridOptions.data.length > 0){
                var found = 0;
                var sRow = storage.dataOfStates.fireCardsGridControl.selectedRow;
                vm.gridOptions.data.find(function(grData, idx){
                    if(grData.fireActId === sRow){
                        found = idx;
                    }
                });


                vm.protocolGridApi.grid.modifyRows(vm.gridOptions.data);
                vm.protocolGridApi.selection.selectRow(vm.gridOptions.data[found]);
            }
        };

        vm.registerSelectedRow = function(row, event){
            if(storage.dataOfStates.fireCardsGridControl.selectedRow !== row.entity.fireActId){
                storage.dataOfStates.fireCardsGridControl.selectedRow = row.entity.fireActId;
                storage.dataOfStates.fireCardsGridControl.scroll.x = vm.protocolGridApi.grid.renderContainers.body.prevScrollLeft;
                storage.dataOfStates.fireCardsGridControl.scroll.y = vm.protocolGridApi.grid.renderContainers.body.prevScrollTop;
            }
        };


        $scope.$on('$viewContentLoaded', function(event, toState, toParams, fromState, fromParams){


        });


    }


})
();
