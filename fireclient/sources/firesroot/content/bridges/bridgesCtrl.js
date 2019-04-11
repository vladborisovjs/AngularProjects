(function () {
    'use strict';
    angular
        .module('app.Bridges', ['ui.router', 'angular-growl'])
        .controller('BridgesCtrl', BridgesCtrl);
    BridgesCtrl.$inject = ['ws', 'storage', '$scope', 'growl', '$rootScope'];

    function BridgesCtrl(ws, storage, $scope, growl, $rootScope) {
        const vm = this;

        var eventBridge = "adminChangeBridgeScheduler";
        vm.storage = storage;
        vm.ws = ws;
        vm.selectedBridge = null;

        vm.onKeydown = (e) => {
            if (!vm.selectedBridge) return;
            if (e.keyCode === 38) {
                //let len = storage.bridges;
                let id = _.findIndex(storage.bridges, (item) => item.id === vm.selectedBridge.id);
                if (id - 1 >= 0) {
                    vm.selectBridge(storage.bridges[id - 1]);
                }
            }
            else if (e.keyCode === 40) {
                let len = storage.bridges.length;
                let id = _.findIndex(storage.bridges, (item) => item.id === vm.selectedBridge.id);
                if (id + 1 < len) {
                    vm.selectBridge(storage.bridges[id + 1]);
                }
            }
        };

        vm.makeWatchers = function (time) {
            $scope.$watch(function () {
                    return time.bridgeTimeCloseH;
                },
                function (newVal, oldVal) {
                    var closeH = newVal;
                    var closeM = time.bridgeTimeCloseM;
                    var openH = time.bridgeTimeOpenH;
                    var openM = time.bridgeTimeOpenM;
                    if (openH > closeH) {
                        time.correct = true;
                    }
                    else {
                        if (openH === closeH) {
                            time.correct = openM > closeM;
                        }
                        else {
                            time.correct = false;
                        }
                    }

                }
            );
            $scope.$watch(function () {
                    return time.bridgeTimeCloseM;
                },
                function (newVal, oldVal) {
                    var closeH = time.bridgeTimeCloseH;
                    var closeM = newVal;
                    var openH = time.bridgeTimeOpenH;
                    var openM = time.bridgeTimeOpenM;
                    if (openH > closeH) {
                        time.correct = true;
                    }
                    else {
                        if (openH === closeH) {
                            time.correct = openM > closeM;
                        }
                        else {
                            time.correct = false;
                        }
                    }

                }
            );
            $scope.$watch(function () {
                    return time.bridgeTimeOpenH;
                },
                function (newVal, oldVal) {
                    var closeH = time.bridgeTimeCloseH;
                    var closeM = time.bridgeTimeCloseM;
                    var openH = newVal;
                    var openM = time.bridgeTimeOpenM;
                    if (openH > closeH) {
                        time.correct = true;
                    }
                    else {
                        if (openH === closeH) {
                            time.correct = openM > closeM;
                        }
                        else {
                            time.correct = false;
                        }
                    }
                }
            );
            $scope.$watch(function () {
                    return time.bridgeTimeOpenM;
                },
                function (newVal, oldVal) {
                    var closeH = time.bridgeTimeCloseH;
                    var closeM = time.bridgeTimeCloseM;
                    var openH = time.bridgeTimeOpenH;
                    var openM = newVal;
                    if (openH > closeH) {
                        time.correct = true;
                    }
                    else {
                        if (openH === closeH) {
                            time.correct = openM > closeM;
                        }
                        else {
                            time.correct = false;
                        }
                    }

                }
            );
        };
        _.each(vm.storage.bridges, function (bridge) {
            bridge.bridgeName = bridge.bridgeName.replace('����', '');//some magic here
        });
        vm.bridgeTimeCloseChanged = function (bridge, time) {
            if (time.bridgeTimeClose === null) {
                time.bridgeTimeCloseH = 0;
                time.bridgeTimeCloseM = 0;
            } else {
                time.bridgeTimeCloseH = time.bridgeTimeClose.getHours();
                time.bridgeTimeCloseM = time.bridgeTimeClose.getMinutes();
            }
        };
        vm.bridgeTimeOpenChanged = function (bridge, time) {
            if (time.bridgeTimeOpen === null) {
                time.bridgeTimeOpenH = 0;
                time.bridgeTimeOpenM = 0;
            } else {
                time.bridgeTimeOpenH = time.bridgeTimeOpen.getHours();
                time.bridgeTimeOpenM = time.bridgeTimeOpen.getMinutes();
            }
        };
        vm.closeBridge = function (bridge) {
            bridge.isEnabled = false;
            ws.$emit(eventBridge, {
                mode: 'closeBridge',
                bridge: bridge
            })
        };
        vm.openBridge = function (bridge) {
            bridge.isEnabled = true;
            ws.$emit(eventBridge, {
                mode: 'openBridge',
                bridge: bridge
            })
        };
        vm.addTime = function (bridge) {
            var newTime = {
                bridgeTimeCloseH: 0,
                bridgeTimeCloseM: 0,
                bridgeTimeOpenH: 0,
                bridgeTimeOpenM: 0,
                isEnabled: false
            };
            newTime.bridgeTimeClose = new Date(1, 1, 1, newTime.bridgeTimeCloseH, newTime.bridgeTimeCloseM);
            newTime.bridgeTimeOpen = new Date(1, 1, 1, newTime.bridgeTimeOpenH, newTime.bridgeTimeOpenM);
            bridge.times.push(newTime);
            var timeToWatchers = _.find(bridge.times, function (time) {
                return newTime == time;
            });
            vm.makeWatchers(timeToWatchers);
        };
        vm.saveBridge = function (bridge) {
            ws.$emit(eventBridge, {mode: 'saveBridge', bridge: bridge});
            $scope.$broadcast('focus-list');
        };
        vm.deleteTime = function (bridge, delTime) {
            var timeIndex = _.findIndex(bridge.times, function (time) {
                return time === delTime;
            });
            bridge.times.splice(timeIndex, 1);
        };
        vm.selectBridge = function (bridge) {
            vm.selectedBridge = angular.copy(bridge);
            _.each(vm.selectedBridge.times, function (time) {
                time.bridgeTimeClose = new Date(1, 1, 1, time.bridgeTimeCloseH, time.bridgeTimeCloseM);
                time.bridgeTimeOpen = new Date(1, 1, 1, time.bridgeTimeOpenH, time.bridgeTimeOpenM);
                vm.makeWatchers(time);
            });
        };
        vm.disableSave = function () {
            if (vm.selectedBridge !== null) {
                var incorrectTime = _.find(vm.selectedBridge.times, function (time) {
                    return !time.correct;
                });
            }
            return incorrectTime ? true : false;
        }
    }
})();
