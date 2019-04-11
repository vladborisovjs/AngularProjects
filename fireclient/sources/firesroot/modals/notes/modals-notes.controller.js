angular.module('modals')
    .controller('NotesController', function NotesController($uibModalInstance, type, title, text, ws){
        var vm = this;
        var currDate = new Date();
        currDate.setDate(currDate.getDate() - 1);
        var prevDate = currDate;
        vm.type = type;
        vm.title = title;
        vm.text = text;
        vm.data = {
            notesDate: (currDate)
        };

        vm.singleDatePickerOptions = {
            "showDropdowns": true,
            "timePicker": false,
            "timePicker24Hour": true,
            "autoUpdateInput": true,
            "singleDatePicker": true,
            "timePickerSeconds": true,
            "locale": {
                "format": "DD-MM-YYYY",
                "applyLabel": "ОК",
                "cancelLabel": "Отмена",
                "fromLabel": "От",
                "toLabel": "До"
            }
        };
/*        vm.ok = function(){
            var a = (new Date(vm.data.currentNotesDate).getTime()) ? (new Date(vm.data.notesDate).getTime()) : prevDate.getTime()
            alert(
                // new Date(vm.data.currentNotesDate).getDate()
                vm.data.currentNotesDate
            );
        }*/
        vm.ok = function(){
            ws.$emit(
                'getArchivedDepts',
                {
                    'date': (new Date(vm.data.notesDate).getTime()) ? (new Date(vm.data.notesDate).getTime()) : prevDate.getTime()
                }
            );
            $uibModalInstance.close();
        }


        vm.cancel = () => $uibModalInstance.close();


    });
