(function(){

    'use strict';
    angular
        .module('app.adminCommands', ['ui.bootstrap'])
        .controller('AdminCommands', AdminCommands);

    AdminCommands.$inject = ['$log', '$scope', 'ws', '$window', 'storage', '$cookies', '$state', '$timeout'];
    function AdminCommands($log, $scope, ws, $window, storage, $cookies, $state, $timeout){
        var vm = this;
        vm.storage = storage;
        vm.EMIT = [];


        if(!!EMIT === true){
            for(var i in EMIT){
                if(EMIT.hasOwnProperty(i)){
                    vm.EMIT.push(
                        {
                            key: i,
                            value: EMIT[i]
                        }

                    );
                }
            }
        };

        console.log('vm.EMIT >', vm.EMIT);

        vm.disableTechButton = function(){
            ws.$emit('makeerror', true);
        };


        vm.simulateEmit = function(data){
            if(data !== undefined && !!data === true){

                if(data.value.hasOwnProperty('type') && !!data.value.type === true){

                    if(confirm("Подтверждение: " + data.value.description)){

                        ws.$emit(data.key, data.value.request);

                    }

                } else {
                    ws.$emit(data.key, data.value.request);
                }

            }
        };


    }
})();
