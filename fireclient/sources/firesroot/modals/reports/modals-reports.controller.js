angular.module('modals')
    .controller('ReportsController', function ReportsController($uibModalInstance, reportName, ws, storage, printRequest){
        var vm = this;
        vm.storage = storage;
        var currDate = new Date();
        currDate.setDate(currDate.getDate() - 1);
        var prevDate = currDate;

        vm.report = vm.storage.reports[reportName];
        // vm.report = vm.storage.reports[reportName];
        vm.report.reportName = reportName;

        vm.data = {};

        for(var i in vm.report.fields){
            if(vm.report.fields.hasOwnProperty(i)){
                vm.data[i] = null;
            }
        }

        vm.singleDatePickerOptions = {
            "showDropdowns": true,
            "timePicker": true,
            "timePicker24Hour": true,
            "autoUpdateInput": true,
            "singleDatePicker": true,
            "timePickerSeconds": true,
            "locale": {
                "format": "DD/MM/YYYY HH:mm",
                "applyLabel": "ОК",
                "cancelLabel": "Отмена",
                "fromLabel": "От",
                "toLabel": "До"
            }
        };


        function prepareJasperRequest(){
            var params = '';

            for(var i in vm.data){
                if(vm.data.hasOwnProperty(i)){
                    params += i + '=' + ((vm.data[i] instanceof Date)? Date.parse(vm.data[i]) : vm.data[i]) + '&';
                }
            }
            return params;
        }


        vm.ok = function(){

            printRequest.init(
                {
                    'reportName': vm.report.reportName,
                    'request': prepareJasperRequest()
                }
            );

            $uibModalInstance.close();
        }


        vm.cancel = () => $uibModalInstance.close();


    });
