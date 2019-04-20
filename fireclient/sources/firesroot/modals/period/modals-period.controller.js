angular
.module('modals')
.controller('PeriodController', PeriodController)
PeriodController.$inject = ['$uibModalInstance', '$log', '$scope', 'ws', 'storage', '$location', '$state', '$stateParams', '$filter', '$sce', 'reportName', 'printRequest','modalsService'];
function PeriodController($uibModalInstance, $log, $scope, ws, storage, $location, $state, $stateParams, $filter, $sce, reportName, printRequest, modalsService){
    var vm = this;
    vm.command = {};
    vm.storage = storage;
    vm.report = vm.storage.reports[reportName];
    vm.report.reportName = reportName;
    vm.command = {};
    vm.today = new Date();
    vm.year = new Date();
    vm.saveCurrentYear = null;
    vm.listYears = [];
    vm.listOtherYears = [];
    vm.listMonths = storage.clientSettings.periods.listMonths;
    vm.listQuarters = storage.clientSettings.periods.listQuarters;
    vm.listHalfYear = storage.clientSettings.periods.listHalfYear;
    vm.listStatus = storage.clientSettings.periods.listStatus;

    vm.listMonths.selected = {};
    vm.listYears.selected = {name: new Date().getFullYear()};
    vm.listOtherYears.selected = {name: new Date().getFullYear() - 1};
    vm.listQuarters.selected = {};
    vm.listHalfYear.selected = {};
    vm.listStatus.selected = {};

    vm.datePicker = {
        startDate: new Date(new Date().setDate(new Date().getDate() - 1)),
        endDate: new Date()
    };

    vm.getYears = function() {
        for (var i = 0; i <= 50; i++) {
            vm.listYears.push({name:new Date().getFullYear() - i});
        }
        JSON.stringify({array: vm.listYears});
        return vm.listYears;
    };
    vm.getOtherYears = function() {
        for (var i = 0; i <= 50; i++) {
            vm.listOtherYears.push({name:new Date().getFullYear() - i});
        }
        JSON.stringify({array: vm.listOtherYears});
        return vm.listOtherYears;
    };

    vm.applyMonthFilter = function() {
        vm.command = {
            dateFrom: new Date(
                vm.listYears.selected.name,
                vm.listMonths.selected.indexMonth,
                1).valueOf(),
            dateTo: new Date(
                vm.listYears.selected.name,
                vm.listMonths.selected.indexMonth + 1,
                0).valueOf(),
            freeDate: false
        };
    };

    vm.applyQuarterFilter = function() {
        if (vm.listQuarters.selected.name == "Первый квартал") {
            vm.command = {
                dateFrom: new Date(
                    vm.listYears.selected.name, 0, 1).valueOf(),
                dateTo: new Date(
                    vm.listYears.selected.name, 2, 29).valueOf(),
                freeDate: false
            };
        }
        else if(vm.listQuarters.selected.name == "Второй квартал") {
            vm.command = {
                dateFrom: new Date(
                    vm.listYears.selected.name, 3, 1).valueOf(),
                dateTo: new Date(
                    vm.listYears.selected.name, 5, 30).valueOf(),
                freeDate: false
            };
        }
        else if(vm.listQuarters.selected.name == "Третий квартал") {
            vm.command = {
                dateFrom: new Date(
                    vm.listYears.selected.name, 6, 1).valueOf(),
                dateTo: new Date(
                    vm.listYears.selected.name, 8, 30).valueOf(),
                freeDate: false
            };
        }
        else if(vm.listQuarters.selected.name == "Четвертый квартал") {
            vm.command = {
                dateFrom: new Date(
                    vm.listYears.selected.name, 9, 1).valueOf(),
                dateTo: new Date(
                    vm.listYears.selected.name, 11, 31).valueOf(),
                freeDate: false
            };
        }
    };

    vm.applyHalfYearFilter = function() {
        if (vm.listHalfYear.selected.name == "Первое полугодие") {
            vm.command = {
                dateFrom: new Date(
                    vm.listYears.selected.name, 0, 1).valueOf(),
                dateTo: new Date(
                    vm.listYears.selected.name, 5, 30).valueOf(),
                freeDate: false,
            };
        }
        else if(vm.listHalfYear.selected.name == "Второе полугодие") {
            vm.command = {
                dateFrom: new Date(
                    vm.listYears.selected.name, 6, 1).valueOf(),
                dateTo: new Date(
                    vm.listYears.selected.name, 11, 31).valueOf(),
                freeDate: false,
            };
        }
    };

    vm.applyYearFilter = function() {
        vm.command = {
            dateFrom: new Date(
                vm.listYears.selected.name, 0, 1).valueOf(),
            dateTo: new Date(
                vm.listYears.selected.name, 11, 31).valueOf(),
            freeDate: false,
        };
    };

    vm.applyFreeDateFilter = function(){
        if (vm.datePicker.endDate != undefined) {
        let date = vm.datePicker.endDate.valueOf();
        vm.year.setTime(date);
        vm.saveCurrentYear = vm.year.getFullYear();
        vm.command = {
            dateFrom: vm.datePicker.startDate.valueOf(),
            dateTo: vm.datePicker.endDate.valueOf(),
            freeDate: true,
        };
    }
    };

    vm.addParameters = function() {
        if (vm.report.name == "Аналитическая справка" ||
            vm.report.name == "ЧС по регионам" ||
            vm.report.name == "Сравнительная таблица" ||
            vm.report.name == "Сравнение по типам") {
            if (vm.listOtherYears.selected.name == undefined) {
                vm.command.currYear = new Date(vm.saveCurrentYear,0,1).valueOf();
            } else {
                vm.command.currYear = new Date(vm.listOtherYears.selected.name,0,1).valueOf();
            }
        } else if (vm.report.name == "Краткий детализированный отчет" ||
            vm.report.name == "Подробный детализированный отчет") {
            vm.command.status = vm.listStatus.selected.name;
        }
        vm.command.report = vm.report.key_name;
        vm.command.name = vm.report.name;
    };

    vm.mainFilter = function() {
        if (vm.listMonths.selected.name != null && vm.listYears.selected.name != null) {
            vm.applyMonthFilter();
        } else if (vm.listQuarters.selected.name != null && vm.listYears.selected.name != null) {
            vm.applyQuarterFilter();
        } else if (vm.listHalfYear.selected.name != null && vm.listYears.selected.name != null) {
            vm.applyHalfYearFilter();
        } else if (vm.listYears.selected.name != null) {
            vm.applyYearFilter();
        } else {
            vm.applyFreeDateFilter();
        }
        vm.addParameters();
        console.log(vm.command);
        ws.$emit('generateReport', vm.command);
    };

    function prepareJasperRequest(){
        vm.mainFilter();
        if (vm.command.currYear != undefined ) {
            // console.log(vm.command);
            return 'dat1=' + vm.command.dateFrom +
            '&dat2=' + vm.command.dateTo +
            '&otherYear=' + vm.command.currYear +
            '&freeDate=' + vm.command.freeDate +
            '&status=' + ((vm.command.status != undefined) ? vm.command.status : "");
        }
        else {
            // console.log(vm.command);
            return 'dat1=' + vm.command.dateFrom +
            '&dat2=' + vm.command.dateTo +
            '&freeDate=' + vm.command.freeDate +
            '&status=' + ((vm.command.status != undefined) ? vm.command.status : "");
        }
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

    vm.cancelDateFilter = function(){
        vm.datePicker = {
            startDate: undefined,
            endDate: undefined
        };
        vm.listMonths.selected = {};
        vm.listYears.selected = {};
        vm.listOtherYears.selected = {};
        vm.listQuarters.selected = {};
        vm.listHalfYear.selected = {};
        vm.listStatus.selected = {};
    };

    vm.datePickerOptions = {
        "showDropdowns": true,
        "timePicker": true,
        "timePicker24Hour": true,
        "separator": ':',
        "autoApply": true,
        "locale": {
            "format": "DD/MM/YYYY HH:mm",
            "separator": " - ",
            "applyLabel": "ОК",
            "cancelLabel": "Отмена",
            "fromLabel": "От",
            "toLabel": "До"
        }
    };
}

