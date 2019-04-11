(function(){

    'use strict';
    angular
        .module('app.FormaProtocolCtrl', [])
        .controller('FormaProtocolCtrl', FormaProtocolCtrl)
        .run(['ws', 'storage', '$rootScope', 'growl', '$log', '$state', '$timeout', function(ws, storage, $rootScope, growl, $log, $state, $timeout){
            ws.$on('getForma6Edits', function(message){
                if(message != undefined){
                    storage.dataOfStates.f6EditsList = [];
                    _.each(message, function(mess){
                        _.each(mess.edits, function(edit){
                            storage.dataOfStates.f6EditsList.push({
                                date: mess.date,
                                user: mess.fireUser,
                                editField: edit.fieldname,
                                oldValue: edit.prevValue,
                                newValue: edit.nextValue
                            });
                        })
                    });
                }
                $rootScope.$apply();
            });

        }]);

    FormaProtocolCtrl.$inject = ['$log', '$scope', 'ws', '$window', 'storage', '$cookies', 'MAPURL', '$state', '$stateParams', '$filter', '$rootScope', 'printRequest'];
    function FormaProtocolCtrl($log, $scope, ws, $window, storage, $cookies, MAPURL, $state, $stateParams, $filter, $rootScope, printRequest){
        var vm = this;
        vm.storage = storage;
        storage.dataOfStates.f6EditsList = [];
        //vm.fire = storage.forma6;


        vm.doPrint = function(reportName){
            printRequest.init(
                {
                    'reportName': reportName,
                    'request': 'Parameter1=' + storage.forma6.fireActId + '&'
                }
            );
        };


        vm.formatDate = function(element, index){
            if(element != undefined){
                if(index != 0){
                    var shortDate = $filter('date')(element.date, 'dd-MM-yy');
                    var shortDateBefore = $filter('date')(vm.protocol[index - 1].date, 'dd-MM-yy');
                    if(shortDate === shortDateBefore) return $filter('date')(element.date, 'HH:mm:ss'); else return $filter('date')(element.date, 'dd-MM-yy HH:mm:ss');

                } else {
                    return $filter('date')(element.date, 'dd-MM-yy HH:mm:ss');
                }
            }

        };

        vm.showDecidion = function(){
            if(storage.forma6 != undefined){
                vm.protocol = storage.forma6.protocol;
                return true;
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


        if(storage.forma6 != undefined){
            ws.$emit('getForma6Edits', storage.forma6.id);
        }
    }
})();
