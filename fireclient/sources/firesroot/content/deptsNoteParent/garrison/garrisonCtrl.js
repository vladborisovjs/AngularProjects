(function(){
    'use strict';
    angular
        .module('app.deptsNote.garrison', [])
        .controller('Garrison', Garrison);

    Garrison.$inject = ['$log', '$scope', 'ws', 'storage', '$location', '$stateParams', '$state', '$rootScope', '$timeout', '$anchorScroll', '$cookies', 'engineTypeSortingAlgorythm', '$filter', 'uiGridConstants', 'isDeptNeedToSaveCaraul'];

    function Garrison($log, $scope, ws, storage, $location, $stateParams, $state, $rootScope, $timeout, $anchorScroll, $cookies, engineTypeSortingAlgorythm, $filter, uiGridConstants, isDeptNeedToSaveCaraul){
        var vm = this;
        vm.storage = storage;

/*
        vm.initializeCurrentDeptAndCaraul = function(selectedDeptId){
            console.log('selectedDeptId >', selectedDeptId);
            var selectedDept = _.find(storage.fireDepartments, function(dept){
                return dept.id === selectedDeptId;
            });
            var tempCurrentCaraul = _.find(selectedDept.caraulCrews, function(caraul){
                return caraul.caraulNum === storage.globalSettings.currentCaraul;
            });
            vm.currentCaraul = Object.assign({}, tempCurrentCaraul);
            // var currentCaraul = angular.merge({}, tempCurrentCaraul);
            //Массив в котором хранятся копии значений количества ПО в машинах
            vm.foamerOnEngines = _.map(selectedDept.fireEngines, function(engine){
                return {idFireEngine: engine.idFireEngine, foamerCount: engine.foamerCount};
            })
        };
*/

        vm.countEnginesInDeptByName = function(dept, engineName){
            return (_.filter(dept.fireEngines, function(engine){
                return engine.engineType === engineName;
            })).length
        };
        vm.groupEnginesInDeptByName = function(dept, caraul){

            var tempGroupedArray = _.groupBy(dept.fireEngines, function(engine){
                return engine.engineType.engineType;
            });

            _.each(tempGroupedArray, function(engineType){
                _.each(engineType, function(engine){
                    var temp = (_.find(caraul.caraulEngines, function(carEngine){
                        return carEngine.idFireEngine === engine.idFireEngine;
                    }));
                    if(temp != undefined){
                        engine.engineStatuseString = temp.caraulEngine.fireEngineStatus.name;
                    }
                });
            });
            return tempGroupedArray;
        };
        vm.getTotalBaseCrewCount = function(currentCaraul){
            var totalCount = 0;
            if(currentCaraul){
                _.each(currentCaraul.caraulEngines, function(engine){
                    totalCount += engine.caraulEngine.baseCrewCount;
                    totalCount += engine.caraulEngine.additionalSmokeProtectionCrewCount;
                });
            }
            return totalCount;
        };
        vm.deptCollection = _.map(storage.fireDepartments, function(dept){
            var tempCurrentCaraul = _.find(dept.caraulCrews, function(caraul){
                return caraul.caraulNum === storage.globalSettings.currentCaraul;
            });
            var deptEngineGroups = vm.groupEnginesInDeptByName(dept, tempCurrentCaraul);
            var showPoint = isDeptNeedToSaveCaraul(dept);
            return {
                dept: dept,
                showPoint: showPoint,
                caraul: tempCurrentCaraul,
                deptEngineGroups: deptEngineGroups
            }
        });
        var engines = [];
        _.each(storage.fireDepartments, function(dept){
            _.each(dept.fireEngines, function(eng){
                engines.push(eng);
            })
        });
        vm.engineTypes = _.keys(_.groupBy(engines, function(engine){
            return engine.engineType.engineType;
        })).sort();
        vm.engineTypes = $filter('orderBy')(vm.engineTypes, engineTypeSortingAlgorythm, true);
        var columnDefs = [
            {
                name: "",
                field: "showPoint",
                pinnedLeft: true,
                enableColumnMenu: false,
                enableFiltering: false,
                width: 20,
                cellTemplate: '<div ng-if="row.entity[col.field]" class="small-red-marker-of-change"> </div>'
            },
            {
                name: vm.storage.fireUser.ACCESS.words.pch,
                pinnedLeft: true,
                field: "dept.fireDeptName",
                suppressRemoveSort: true,
                enableColumnMenu: false,
                width: 70,
                sort: {
                    direction: uiGridConstants.ASC
                    //priority: false
                },
                sortingAlgorithm: function(a, b, rowA, rowB, direction){
                    return vm.deptSorting(a, b, rowA, rowB, direction);
                }
            },
            //{
            //    name: "Караул",
            //    pinnedLeft: true,
            //    field: "dept.totalCaraulNum",
            //    enableColumnMenu: false,
            //    width: 70
            //},
            //здесь должен быть крутой алгоритм по набору колонок
            {
                name: 'По штату',
                field: "caraul.totalCrewCount",
                enableColumnMenu: false,
                width: 100
            },
            {
                name: 'По Списку',
                field: "caraul.atListCrewCount",
                enableColumnMenu: false,
                width: 100
            },
            {
                name: 'На лицо',
                field: "caraul.byFaceCrewCount",
                enableColumnMenu: false,
                width: 100
            },
            {
                name: 'В БР',
                cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.countBR(grid,row)}}</div>',
                enableColumnMenu: false,
                width: 100,
                sortingAlgorithm: function(a, b, rowA, rowB, direction){
                    return vm.compareBR(a, b, rowA, rowB, direction);
                }
            },
            {
                name: 'Отсутст',
                cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.countGone(grid, row)}}</div>',
                enableColumnMenu: false,
                width: 100,
                sortingAlgorithm: function(a, b, rowA, rowB, direction){
                    return vm.compareGone(a, b, rowA, rowB, direction);
                }
            },
            {
                name: 'Больничн',
                field: "caraul.illCrewCount",
                enableColumnMenu: false,

                width: 100
            },
            {
                name: 'Отпуск',
                field: "caraul.restCrewCount",
                enableColumnMenu: false,

                width: 100
            },
            {
                name: 'Ком-ка',
                field: "caraul.detachedCrewCount",
                enableColumnMenu: false,

                width: 80
            },
            {
                name: 'Отгул',
                field: "caraul.freeCrewCount",
                enableColumnMenu: false,

                width: 80
            },
            {
                name: 'Нач.кар.',
                field: "caraul.headCaraul",
                enableColumnMenu: false,

                width: 160
            }, {
                name: 'Телеф-т',
                field: "caraul.phoneMan",
                enableColumnMenu: false,

                width: 160
            }, {
                name: 'Стенд-ый',
                field: "caraul.standerMan",
                enableColumnMenu: false,

                width: 160
            }, {
                name: 'Деж.' + vm.storage.fireUser.ACCESS.words.OFPS,
                field: "caraul.galloper",
                enableColumnMenu: false,

                width: 160
            },
            {
                name: "Польз.",
                field: "caraul.lastEditUser.lastName",
                enableColumnMenu: false,
                width: 190
            }
        ];
        vm.makeColumnsFromEngines = function(columnDefs){
            _.each(vm.engineTypes, function(engineType){
                var col = {};
                col.name = engineType;
                col.enableColumnMenu = false;
                col.headerCellClass = 'longTableEngineTypeCol';
                col.width = 100;
                col.enableSorting = true;
                col.sort = {
                    priority: 0
                };
                col.enableFiltering = false;
                col.cellTemplate = '<div class="ui-grid-cell-contents grid-engine-cell">{{grid.appScope.countEngineByName(grid,row,col.name)}}</div>';
                if(col.name === 'АЦ'){
                    var colAC2 = jQuery.extend({}, col, true);
                    colAC2.name = engineType + '(2)';
                    colAC2.sortingAlgorithm = function(a, b, rowA, rowB, direction, colName){
                        return vm.enginesSorting(a, b, rowA, rowB, direction, colAC2.name);
                    };
                    columnDefs.splice(15, 0, colAC2);
                    var colAC1 = jQuery.extend({}, col, true);
                    colAC1.name = engineType + '(1)';
                    colAC1.sortingAlgorithm = function(a, b, rowA, rowB, direction, colName){
                        return vm.enginesSorting(a, b, rowA, rowB, direction, colAC1.name);
                    };
                    columnDefs.splice(15, 0, colAC1);
                } else {
                    columnDefs.splice(15, 0, col);
                    col.sortingAlgorithm = function(a, b, rowA, rowB, direction, colName){
                        return vm.enginesSorting(a, b, rowA, rowB, direction, col.name);
                    };
                }


            })
        };
        vm.makeColumnsFromEngines(columnDefs);
        vm.gridOptions = {
            columnDefs: columnDefs,
            data: vm.deptCollection,
            //flatEntityAccess: true,
            enableSorting: true,
            enableFiltering: true,
            enableRowSelection: true,
            enableSelectAll: false,
            enableRowHeaderSelection: false,
            multiSelect: false,
            fastWatch: true
        };
        vm.countGonePeople = function(caraul){
            return caraul.illCrewCount + caraul.restCrewCount + caraul.detachedCrewCount + caraul.freeCrewCount;
        };
        // scope functions needed to generate cells

        $scope.countGone = function(grid, row){
            return vm.countGonePeople(row.entity.caraul);
        };
        $scope.countBR = function(grid, row){
            return vm.getTotalBaseCrewCount(row.entity.caraul);
        };
        $scope.countEngineByName = function(grid, row, name){
            var enginesList = row.entity.dept.fireEngines;
            var countedEngines = _.filter(enginesList, function(engine){
                if(name === 'АЦ(1)'){
                    return engine.engineType.engineType === 'АЦ' && engine.isFirstTank;
                }
                if(name === 'АЦ(2)'){
                    return engine.engineType.engineType === 'АЦ' && !engine.isFirstTank;
                }
                return engine.engineType.engineType === name;

            });
            var outputString = '';
            _.each(countedEngines, function(engine, index){
                var temp = _.find(row.entity.caraul.caraulEngines, function(caraulEngine){
                    return caraulEngine.idFireEngine === engine.idFireEngine;
                });
                if(temp != undefined){
                    var br = temp.caraulEngine.baseCrewCount;
                    var gd = temp.caraulEngine.additionalSmokeProtectionCrewCount;
                    var gdzs = temp.caraulEngine.smokeProtectionCrewCount;
                    outputString += br;
                    if(gd != 0){
                        outputString += '/' + gd;
                    }
                    if(gdzs != 0){
                        outputString += '/' + gdzs;
                    }
                }
                outputString += '; '
            });
            return outputString;
        };
        vm.compareBR = function(a, b, rowA, rowB, direction){
            return vm.getTotalBaseCrewCount(rowA.entity.caraul) - vm.getTotalBaseCrewCount(rowB.entity.caraul);
        };
        vm.compareGone = function(a, b, rowA, rowB, direction){
            return vm.countGonePeople(rowA.entity.caraul) - vm.countGonePeople(rowB.entity.caraul);
        };
        vm.deptSorting = function(a, b, rowA, rowB, direction){
            var numA = parseInt(a);
            var numB = parseInt(b);
            if(isNaN(numA)){
                numA = 999;
            }
            if(isNaN(numB)){
                numB = 999;
            }
            return numA - numB;


        };
        vm.enginesSorting = function(a, b, rowA, rowB, direction, colName){
            var numOfEngA = 0;
            var numOfEngB = 0;
            if(colName !== 'АЦ(1)' && colName !== 'АЦ(2)'){
                if(rowA.entity.deptEngineGroups[colName] != undefined){
                    numOfEngA = rowA.entity.deptEngineGroups[colName].length;
                }
                if(rowB.entity.deptEngineGroups[colName] != undefined){
                    numOfEngB = rowB.entity.deptEngineGroups[colName].length;
                }
            } else {
                if(colName === 'АЦ(1)'){
                    if(rowA.entity.deptEngineGroups['АЦ'] != undefined){
                        numOfEngA = (_.filter(rowA.entity.deptEngineGroups['АЦ'], function(engine){
                            return engine.isFirstTank
                        })).length;
                    }
                    if(rowB.entity.deptEngineGroups['АЦ'] != undefined){
                        numOfEngB = (_.filter(rowB.entity.deptEngineGroups['АЦ'], function(engine){
                            return engine.isFirstTank
                        })).length;
                    }
                }
                if(colName === 'АЦ(2)'){
                    if(rowA.entity.deptEngineGroups['АЦ'] != undefined){
                        numOfEngA = (_.filter(rowA.entity.deptEngineGroups['АЦ'], function(engine){
                            return !engine.isFirstTank
                        })).length;
                    }
                    if(rowB.entity.deptEngineGroups['АЦ'] != undefined){
                        numOfEngB = (_.filter(rowB.entity.deptEngineGroups['АЦ'], function(engine){
                            return !engine.isFirstTank
                        })).length;
                    }
                }
            }

            return numOfEngA - numOfEngB;
        };



        $scope.$on('$viewContentLoaded', function(event, toState, toParams, fromState, fromParams){
            // vm.initializeCurrentDeptAndCaraul(selectedDeptId);
        });


    }
})();
