(function(){

    'use strict';
    angular
        .module('app.archive', [])
        .controller('Archive', Archive)
        .run(['$rootScope', 'ws', '$location', '$log', '$cookies', '$state', '$stateParams', 'storage', 'growl', '$window', 'hotkeys', '$timeout', function($rootScope, ws, $location, $log, $cookies, $state, $stateParams, storage, growl, $window, hotkeys, $timeout){
            ws.$on('getArchivedFires', function(message){
                storage.archFireActs = [];
                if(Array.isArray(message)){
                    // _.each(message, function (mess) {
                    //     storage.archFireActs.push(mess)
                    // });


                    message.forEach(function(mess){

                        if(!!mess.fireAct.firePlace === false && !!mess.fireAct.card112WithBean.fireActTemplate === true){
                            mess.fireAct.firePlace = JSON.parse(JSON.stringify(mess.fireAct.card112WithBean.fireActTemplate.firePlace));
                        }
                        mess.fireAct.messageBuffer.forEach(function(buff){
                            mess.isCanceled = /АННУЛИРОВАН/gi.test(buff.message);
                        });
                    });

                    var result = [];

                    if($stateParams.endDate !== undefined && $stateParams.endDate === 'true'){

                        message.forEach(function(mess){
                            if((!!mess.fireAct.endDate).toString() == $stateParams.endDate){
                                result.push(mess);
                            }

                        });

                    } else {
                        result = message;
                    }



                    // storage.archFireActs = message
                    storage.archFireActs = result;
                }
                storage.hideLoadingOverlay = true;
                $rootScope.$apply();
                // console.log(storage.archFireActs);
            });
        }]);

    Archive.$inject = ['$log', '$scope', 'ws', 'storage', '$location', '$state', '$stateParams', '$filter', 'modalsService', 'printRequest', 'PRINTURL_CHS'];

    function Archive($log, $scope, ws, storage, $location, $state, $stateParams, $filter, modalsService, printRequest, PRINTURL_CHS){
        var vm = this;
        vm.storage = storage;
        vm.stateCalledFrom = $state.current.name || null;
        vm.matchTable = {
            emergency_1: '1/ЧС',
            emergency_2: '2/ЧС',
            emergency_3: '3/ЧС',
            emergency_4: '4/ЧС',
            emergency_fire: 'Пожар'
        };
        vm.PRINTURL_CHS = PRINTURL_CHS;




        vm.isFireCanceled = function(canceled){
            if(!!canceled === true && canceled.isCanceled === true){
                return '1';
            } else {
                return '';
            }
        };

        vm.getDept = function(mess){
            if(mess){
                if(mess.hasOwnProperty('engine') && mess.engine !== undefined && mess.engine){
                    return mess.engineDeptName;
                } else {
                    return mess.userDeptName;
                }
            }
        };



        var columnDefs = [
            /*, {
             name: 'Дата приказа',
             field: "fireAct.ordered",
             cellFilter: "date: 'dd-MM-yy HH:mm:ss'",
             width: 150,
             enableColumnMenu: false,
             cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
             return row.entity.isCanceled ? "grid-canceled-row" : '';
             }
             }*/
            /*
             {
             name: 'Ред Ф6',
             cellTemplate: '<button class="btn-sm btn-default" ng-click="grid.appScope.goEditF6(row)">Ред.</button>',
             width: 80,
             enableColumnMenu: false,
             cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
             return row.entity.isCanceled ? "grid-canceled-row" : '';
             }
             },

             */
            {
                name: '№',
                field: "fireAct.numFireAct",
                width: 50,
                enableColumnMenu: false,
                cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex){
                    return row.entity.isCanceled? "grid-canceled-row" : '';
                }
            },

            {
                name: vm.storage.fireUser.ACCESS.words.pch,
                field: "fireAct.firePlace.pchName",
                width: 60,
                enableColumnMenu: false,
                cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex){
                    return row.entity.isCanceled? "grid-canceled-row" : '';
                }
            }, {
                name: 'Адрес',
                field: "fireAct.firePlace.address",
                cellFilter: "firePlaceFilter",
                cellTemplate: '<span ng-bind-html="grid.appScope.displayAdress(row.entity)"></span>',
                filterCellFiltered: true,
                enableColumnMenu: false,
                width: 200,
                sortingAlgorithm: function(a, b, rowA, rowB, direction){
                    return vm.compareFirePlace(a, b, rowA, rowB, direction);
                },
                cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex){
                    return row.entity.isCanceled? "grid-canceled-row" : '';
                }

            }, {
                name: 'Район',
                field: "fireAct.firePlace.address.raionName",
                filterCellFiltered: true,
                enableColumnMenu: false,
                width: 200,
                sortingAlgorithm: function(a, b, rowA, rowB, direction){
                    return vm.compareFirePlace(a, b, rowA, rowB, direction);
                },
                cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex){
                    return row.entity.isCanceled? "grid-canceled-row" : '';
                }
            }, {
                name: 'Населенный пункт',
                field: "fireAct.firePlace.address.district",
                filterCellFiltered: true,
                enableColumnMenu: false,
                width: 200,
                sortingAlgorithm: function(a, b, rowA, rowB, direction){
                    return vm.compareFirePlace(a, b, rowA, rowB, direction);
                },
                cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex){
                    return row.entity.isCanceled? "grid-canceled-row" : '';
                }
            }, {
                name: 'Время начала',
                field: "fireAct.startDate",
                cellFilter: "date: 'dd-MM-yy HH:mm:ss'",
                width: 150,
                filterCellFiltered: true,
                enableColumnMenu: false,
                cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex){
                    return row.entity.isCanceled? "grid-canceled-row" : '';
                }
            },


            /*

             {
             name: 'Ранг',
             field: "fireAct.rank.sidfirerank",
             width: (vm.storage.fireUser.ACCESS.commonSwitches.rank === true)? 60 : 0,
             enableColumnMenu: false,
             cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
             return row.entity.isCanceled ? "grid-canceled-row" : '';
             }
             }, {
             name: 'Ранг(МАХ)',
             field: "fireAct.maxRank",
             width: (vm.storage.fireUser.ACCESS.commonSwitches.rankMax === true)? 90 : 0,
             enableColumnMenu: false,
             cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
             return row.entity.isCanceled ? "grid-canceled-row" : '';
             }
             },
             */




            {
                name: 'Тип',
                field: "fireAct.incidentType.name",
                width: 80,
                enableColumnMenu: false,
                cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex){
                    return row.entity.isCanceled? "grid-canceled-row" : '';
                }
            }, {
                name: 'Комментарий',
                field: "fireAct.comment",
                width: 350,
                enableColumnMenu: false,
                cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex){
                    return row.entity.isCanceled? "grid-canceled-row" : '';
                }
            }, {
                name: 'Статус',
                cellTemplate: "<span>{{grid.appScope.archive.isFireCanceled(row.entity)}}</span>",
                width: 70,
                enableColumnMenu: false,
                cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex){
                    return row.entity.isCanceled? "grid-canceled-row" : '';
                }
            }, {
                name: 'Исполн',
                field: 'fireAct.user.lastName',
                width: 100,
                enableColumnMenu: false,
                cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex){
                    return row.entity.isCanceled? "grid-canceled-row" : '';
                }
            }, {
                name: 'Источник',
                field: 'fireAct.incidentSource.text',
                width: 150,
                enableColumnMenu: false,
                cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex){
                    return row.entity.isCanceled? "grid-canceled-row" : '';
                }
            }
        ];
        $scope.$watch(function(){
                return storage.archFireActs;
            },
            function(newValue, oldValue){
                // console.log( storage.archFireActs);
                vm.gridOptions.data = storage.archFireActs;
                vm.protocolGridApi.grid.modifyRows(vm.gridOptions.data);
                vm.protocolGridApi.selection.selectRow(vm.gridOptions.data[0]);
            }
        );
        //endDate
        vm.gridOptions = {
            columnDefs: columnDefs,
            data: storage.archFireActs,
            enableSorting: true,
            enableFiltering: true,
            enableRowSelection: true,
            enableSelectAll: false,
            enableRowHeaderSelection: false,
            multiSelect: false,
            fastWatch: true,
            // rowTemplate:'<div ng-class="{ \'grid-inactive-row\': row.entity.isCanceled }"> <div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="{ "ui-grid-row-header-cell": col.isRowHeader }"  ui-grid-cell></div></div>'
            /*            rowTemplate: '<div ng-class="{ \'grid-inactive-row\': row.entity.isCanceled }">' +
             '  <div ng-if="row.entity.merge">{{row.entity.title}}</div>' +
             '  <div ng-if="!row.entity.merge" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell role="gridcell"></div>' +
             '</div>'*/
            /*

             rowTemplate: '<div ng-class="{ \'grid-canceled-row\': row.entity.isCanceled }" <div ng-repeat="col in colContainer.renderedColumns track by col.colDef.name"  class="ui-grid-cell" ui-grid-cell></div></div>'
             */

        };




        $scope.displayAdress = function(row){
            return row.fireAct.firePlace.address.street + '&nbsp;' + row.fireAct.firePlace.address.house;



        };




        $scope.goEditF6 = function(f6Id){
            ws.$emit('lockDocument', {'id': f6Id.entity.fireAct.id + ':forma', 'typeDelivery': 'all'});
            // ws.$emit('getForma6', f6Id.entity.fireAct.id);
        };


        vm.gridOptions.onRegisterApi = function(gridApi){
            vm.protocolGridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function(row){
                vm.selectFire(row.entity);
            });
        };

        storage.dataOfStates.archiveCommand.activeFire = undefined;
        vm.selectFire = function(fire){
            if(fire == storage.dataOfStates.archiveCommand.activeFire){
                storage.dataOfStates.archiveCommand.activeFire = undefined;
                vm.storage.docs = [];
            } else {
                storage.dataOfStates.archiveCommand.activeFire = fire;
                var command = {
                    fireActId: fire.fireAct.id,
                    creationDateFrom: Date.now(),
                    creationDateTo: Date.now()
                };
                ws.$emit('getDocsByTags', command);
            }
            // console.log('row.entity >>>', storage.dataOfStates.archiveCommand.activeFire);
        };
        vm.compareFirePlace = function(a, b, rowA, rowB, direction){
            var str1 = $filter('firePlaceFilter')(a);
            var str2 = $filter('firePlaceFilter')(b);
            return (str1 > str2)? 1 : -1
        };
        vm.chooseBackgrownColor = function(activeFire){
            if(activeFire == storage.dataOfStates.archiveCommand.activeFire){
                return 'rowbkgselected'
            }
            else {
                return ''
            }
        };


        vm.selectDoc = function(fireAct){

        };

        vm.getUrlDoc = function(url, type){
            return url;
        };
        vm.filterHTMLOnly = function(docList){
            var output = _.filter(docList, function(doc){
                return doc.mimeType === 'html'
            });
            return output;
        };
        vm.filterNotHTML = function(docList){
            var output = _.filter(docList, function(doc){
                return doc.mimeType !== 'html'
            });
            return output;
        };
        vm.returnSortableData = function(a, b, c, d, e){
            // return data
        };


        /*
         $scope.$on('$destroy', function () {
         console.log(vm.storage.stateKeeper);
         delete vm.storage.dataOfStates.archiveCommand.activeFire;
         });
         */


        /*
         $scope.$on('$destroy', function () {

         if (vm.storage.forma6 != undefined) {

         }

         });
         */




    }
})();
