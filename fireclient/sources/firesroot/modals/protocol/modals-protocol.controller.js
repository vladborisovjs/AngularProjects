(function(){

    'use strict';

    angular.module('modals')
        .controller('ProtocolController', ProtocolController);


    ProtocolController.$inject = ['$uibModalInstance', 'fire', 'title', 'type', 'action', 'storage', 'ws', 'engineTypeDecoratorFilter'];

    function ProtocolController($uibModalInstance, fire, title, type, action, storage, ws, engineTypeDecoratorFilter){

        var vm = this;
        vm.storage = storage;
        vm.fire = fire;
        vm.title = title;
        vm.type = type;
        vm.action = action;
        vm.data = {
            currentProtocolDate: vm.fire.date || (new Date().getTime()),
            message: null
        }

        /*

         vm.currentProtocolDate = vm.fire.date;
         vm.message = '';

         */


        vm.singleDatePickerOptions = {
            "showDropdowns": true,
            "timePicker": true,
            "timePicker24Hour": true,
            "autoUpdateInput": true,
            "singleDatePicker": true,
            "timePickerSeconds": true,
            "locale": {
                "format": "DD-MM-YYYY HH:mm:ss",
                "applyLabel": "ОК",
                "cancelLabel": "Отмена",
                "fromLabel": "От",
                "toLabel": "До"
            }
        };


        vm.getDeptForAppendProtocol = function(){

            var dept = null;

            if(vm.storage.fireUser){


                if(dept == null){
                    if(_.contains(vm.storage.fireUser.roles, 'dispatchers')){
                        dept = "СОО"
                    }
                    if(_.contains(vm.storage.fireUser.roles, 'dispatchersManager')){
                        dept = 'СОО'
                    }
                }
            }
            return dept;
        };


        vm.ok = function(){


            let emitObj = {
                date: (new Date(vm.data.currentProtocolDate).getTime())? (new Date(vm.data.currentProtocolDate).getTime()) : (new Date(new Date()).getTime()),
                user: vm.storage.fireUser,
                fromState: vm.type
            }


            if(vm.type == 'archive'){
                emitObj.where = 'arh';
            } else {
                if(vm.type == 'firesbase'){
                    emitObj.where = 'act';
                }
            }


            if(action == 'date'){

                emitObj.protocolId = vm.fire.id;
                emitObj.id = vm.fire.fireActId;


            } else {

                emitObj.id = vm.fire.fireAct.id;
                emitObj.message = (vm.data.message && vm.data.message.trim().length)? vm.data.message.trim() : '';
            }


            ws.$emit('changeProtocol', emitObj);

            $uibModalInstance.close();
        }
        vm.cancel = () => $uibModalInstance.dismiss();
    }

})();
