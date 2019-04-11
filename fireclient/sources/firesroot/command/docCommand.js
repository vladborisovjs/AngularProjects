(function(){

    'use strict';
    angular
        .module('app.DocCommand', ['ui.bootstrap'])
        .controller('DocCommand', DocCommand);

    DocCommand.$inject = ['$log', '$scope', 'ws', '$window', 'storage', '$cookies', 'MAPURL', '$state', '$stateParams', 'growl', 'printRequest', 'modalsService'];
    function DocCommand($log, $scope, ws, $window, storage, $cookies, MAPURL, $state, $stateParams, growl, printRequest, modalsService){
        var vm = this;
        vm.storage = storage;
        vm.generMessName = '';
        vm.today = new Date();
        vm.yesterday = new Date();
        vm.yesterday.setDate(vm.yesterday.getDate() - 1);

        vm.showWell = false;
        vm.showTime = false;

        vm.propsDatePicker = {
            startDate: new Date(new Date().setDate(new Date().getDate() - 1)),
            endDate: new Date()
        };
        vm.propsDatePickerOptions = {
            "showDropdowns": true,
            "autoApply": true,
            "opens": 'left',
            "drops": "up",
            "locale": {
                "format": "DD/MM/YYYY HH:mm",
                "separator": " - ",
                "applyLabel": "ОК",
                "cancelLabel": "Отмена",
                "fromLabel": "От",
                "toLabel": "До"
            }
        };
        vm.singleDatePicker = vm.today;
        vm.singleDatePickerOptions = {
            "showDropdowns": true,
            "timePicker": true,
            "timePicker24Hour": true,
            "autoUpdateInput": true,
            "singleDatePicker": true,
            "locale": {
                "format": "DD/MM/YYYY HH:mm",
                "applyLabel": "ОК",
                "cancelLabel": "Отмена",
                "fromLabel": "От",
                "toLabel": "До"
            }
        };

        vm.filtMyOnly = true;
        vm.checkRole = function(){
            if(storage.fireUser){
                return (storage.fireUser.role.indexOf('dispatchersManager') !== -1)
            } else {
                return false;
            }
        };

        vm.includeReports = ['info_chs', 'info_dtp', 'fir_10', 'GPS_10_10', 'signalTrips', 'info_ignition', 'info_dtp_svod', 'info_tech_regul', 'multiselect_ASR', 'burning_grass'];
        // vm.includeReports = ['info_chs', 'info_dtp', 'fir_10', 'GPS_10_10', 'signalTrips', 'info_ignition', 'info_dtp_svod', 'info_tech_regul', 'multiselect_ASR', 'dtp_list_people', 'burning_grass'];



        for(var i in vm.storage.fireUser.ACCESS.states.docs.reports){
            if(vm.storage.fireUser.ACCESS.states.docs.reports.hasOwnProperty(i) && !!vm.storage.fireUser.ACCESS.states.docs.reports[i] === false){
                var idx = vm.includeReports.indexOf(i);
                if(idx !== -1){
                    vm.includeReports.splice(idx, 1);
                }
            }
        }








        vm.doPrint = function(reportName){

            if(vm.storage.reports.hasOwnProperty(reportName) && !!vm.storage.reports[reportName].fields === true){
                if(!vm.storage.reports[reportName].fields.hasOwnProperty('MODAL')){
                    modalsService.reports(reportName);
                } else {
                    modalsService[vm.storage.reports[reportName].fields.MODAL](reportName);
                }
            }

            /*
             printRequest.init(
             {
             'reportName': reportName,
             'fireActId': storage.forma6.fireActId
             }
             );
             */


        };


        vm.isCommandDefined = function(){
            return vm.checkRole();
            //return angular.isDefined(storage.selectedFire) && !storage.selectedFire.isReadyForF6;
        };
        vm.getHeadManagerReport = function(){
            var command = {
                DATE_START: Date.now()
            }
            ws.$emit('generateHeadManagerReport', command);
            /*
             var command = {
             fireActId: undefined,
             creationDateFrom: Date.now(),
             creationDateTo: Date.now()
             };
             if(angular.isDefined($stateParams.fireId)){
             command.fireActId = $stateParams.fireId;
             ws.$emit('generateHeadManagerReport', command);
             } else {
             growl.warning('НЕТ ВЫДЕЛЕННОГО ПОЖАРА');
             }
             */
        };
        vm.generateOS1SpbReport = function(){
            ws.$emit('generateOS1SpbReport', {dateOn: vm.singleDatePicker.valueOf()});
            vm.showWell = false;
            vm.showTime = false;
        };
        vm.generateOS2SpbReport = function(){
            ws.$emit('generateOS2SpbReport', {dateOn: vm.singleDatePicker.valueOf()});
            vm.showWell = false;
            vm.showTime = false;
        };
        vm.generateOS4SpbReport = function(){
            ws.$emit('generateOS4SpbReport', {dateOn: vm.singleDatePicker.valueOf()});
            vm.showWell = false;
            vm.showTime = false;
        };
        vm.generateAsrSpbReport = function(){
            ws.$emit('generateAsrSpbReport', {});
            vm.showWell = false;
            vm.showTime = false;
        };
        vm.generateGuardsPerDayReport = function(){

            vm.showWell = false;
            vm.showTime = false;


            /*
             vm.showWell = true;
             vm.showTime = true;
             */
            // vm.generMessName = 'generateGuardsPerDayReport';

            ws.$emit('generateGuardsPerDayReport', {
                dateOn: new Date()
            });
        };
        vm.GenerateOSguardsSPBReport = function(){
            ws.$emit('generateOSguardsSPBReport', {dateOn: vm.singleDatePicker.valueOf()});
            vm.showWell = false;
            vm.showTime = false;
        };
        vm.generateTechConditionReport = function(){
            ws.$emit('generateTechConditionReport', {});
            vm.showWell = false;
            vm.showTime = false;
        };
        vm.GenerateVYKLReport = function(){
            ws.$emit('generateVYKLReport', {})
        };
        vm.GenerateVPPReport = function(){
            vm.showWell = true;
            vm.showTime = true;
            vm.generMessName = 'generateVPPReport';
        };
        vm.GenerateVPPLReport = function(){
            vm.showWell = true;
            vm.showTime = true;
            vm.generMessName = 'generateVPPLReport';
        };
        vm.generateWithProps = function(){
            var message = {};
            switch(vm.generMessName){
                case 'generateVPPReport':{
                    message = {
                        dateFrom: vm.propsDatePicker.startDate.valueOf(),
                        dateTo: vm.propsDatePicker.endDate.valueOf()
                    };
                    ws.$emit(vm.generMessName, message);
                    break;
                }
                case 'generateVPPLReport':{
                    message = {
                        dateFrom: vm.propsDatePicker.startDate.valueOf(),
                        dateTo: vm.propsDatePicker.endDate.valueOf()
                    };
                    ws.$emit(vm.generMessName, message);
                    break;
                }
                /*
                 case 'generateGuardsPerDayReport':{

                 message = {
                 dateFrom: vm.propsDatePicker.startDate.valueOf(),
                 dateTo: vm.propsDatePicker.endDate.valueOf()
                 };
                 ws.$emit(vm.generMessName, message);
                 break;
                 }
                 */
            }
            vm.showWell = false;
            vm.showTime = false;
            vm.generMessName = '';
        };


        vm.generateFireDeptDaily = function(){
            ws.$emit('generateFireDeptDaily', {
                OID: null
            });
        };


        vm.onSelectRefreshFilters = function(){
            var collection = vm.filtredDocs;
            var tempList = _.map(collection, function(Doc){
                return Doc.typeDoc;
            });
            vm.storage.pages.docs.listOfDocTypes = angular.merge([], _.uniq(tempList));
            tempList = _.map(collection, function(Doc){
                return Doc.user;
            });
            vm.storage.pages.docs.listOfDocUsers = angular.merge([], _.uniq(tempList));
            tempList = _.map(collection, function(Doc){
                return Doc.numDoc;
            });
            vm.storage.pages.docs.listOfDocNums = angular.merge([], _.uniq(tempList));
            tempList = _.map(collection, function(Doc){
                return Doc.caraulNum;
            });
            vm.storage.pages.docs.listOfDocCaraulNums = angular.merge([], _.uniq(tempList));
        };
    }
})();
