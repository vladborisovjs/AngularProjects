angular.module('modals')
    .controller('ASRReportsController', function ASRReportsController($uibModalInstance, reportName, ws, storage, printRequest, $scope){

        var vm = this;
        vm.storage = storage;
        var currDate = new Date();
        currDate.setDate(currDate.getDate() - 1);
        var prevDate = currDate;

        vm.report = vm.storage.reports[reportName];
        vm.report.reportName = reportName;
        vm.data = null;
        vm.dateStart = new Date().getTime();
        vm.selectedASR = [];
        vm.selectedSubASR = [];

        vm.singleDatePickerOptions = {
            "showDropdowns": true,
            "timePicker": false,
            "timePicker24Hour": false,
            "autoUpdateInput": true,
            "singleDatePicker": true,
            "timePickerSeconds": false,
            "locale": {
                "format": "DD/MM/YYYY",
                "applyLabel": "ОК",
                "cancelLabel": "Отмена",
                "fromLabel": "От",
                "toLabel": "До"
            }
        };


        vm.selectASR = function(asr, arr){
            if(!!arr === true && !!asr === true){
                if(arr.includes(asr.code)){
                    arr.splice(arr.indexOf(asr.code), 1);
                } else {
                    arr.push(asr.code);
                }
            }
        };


        vm.isParentChecked = function(code){
            if(!!vm.data === true && !vm.selectedASR.includes(code)){
                for(var i in vm.data){
                    if(vm.data.hasOwnProperty(i)){
                        if(vm.data[i].hasOwnProperty('code') && vm.data[i].code === code && vm.data[i].hasOwnProperty('subType')){
                            vm.data[i].subType.forEach(function(type){
                                if(vm.selectedSubASR.includes(type.code)){
                                    vm.selectedSubASR.splice(vm.selectedSubASR.indexOf(type.code), 1);
                                }
                            });
                        }
                    }
                }
            }
            return !vm.selectedASR.includes(code);
        };


        function prepareJasperRequest(){
            return 'DATE_START=' + ((!!vm.dateStart === true) ? vm.dateStart : new Date().getTime()) + '&ASR_TYPE=' + vm.selectedASR.join(',') + '&ASR_SUB_TYPE=' + vm.selectedSubASR.join(',') + '&';
        }


        vm.ok = function(){


            printRequest.init(
                {
                    'reportName': vm.report.reportName,
                    'request': prepareJasperRequest()
                }
            );


            $uibModalInstance.close();
            vm.data = null;
            vm.storage.forma6Solutions = null;

        };


        vm.cancel = function(){
            $uibModalInstance.close();
            vm.data = null;
            vm.storage.forma6Solutions = null;
        };


        ws.$emit('findForma6Solutions', 78);


        $scope.$watch(function(){
                return vm.storage.forma6Solutions;
            },
            function(newValue, oldValue){
                if(!!newValue === true){
                    if(!!vm.data === false){
                        vm.data = {};

                        newValue.forEach(function(asr){
                            vm.data[asr.code] = Object.assign({}, asr);
                            vm.data[asr.code].subType = [];
                            ws.$emit('findAsrSubType', vm.data[asr.code]);
                        });
                    }

                    if(!!vm.data === true){


                        if(Array.isArray(newValue) && newValue.length > 0){
                            if(newValue[0].hasOwnProperty('parent') && vm.data.hasOwnProperty(newValue[0].parent)){
                                vm.data[newValue[0].parent].subType = newValue;
                            }
                        }


                    }
                }

            }
        );


    });
