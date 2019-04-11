angular.module('modals')
    .service('modalsService', function modalsService($uibModal) {



        var getDefaultModalConfig = (title, text) => {
            return {
                animation: false,
                size: 'md',
                keyboard: false,
                backdrop: 'static',
                resolve: {
                    "text": () => text,
                    "title": () => title
                }
            }
        };


        var getNotesModalConfig = (title, text) => {
            return {
                animation: false,
                size: 'sm',
                keyboard: false,
                backdrop: 'static',
                resolve: {
                    "text": () => text,
                    "title": () => title
                }
            }
        };

        var getWarningModalConfig = (title, text) => {
            return {
                animation: false,
                size: 'sm',
                keyboard: false,
                backdrop: 'static',
                resolve: {
                    "text": () => text,
                    "title": () => title
                }
            }
        };

        var getMatchAdressModalConfig = (title, text) => {
            return {
                animation: false,
                size: 'sm',
                keyboard: false,
                backdrop: 'static',
                resolve: {
                    "text": () => text,
                    "title": () => title
                }
            }
        };


        var getProtocolModalConfig = (fire, title, type, action) => {
            return {
                animation: false,
                size: 'md',
                keyboard: false,
                backdrop: 'static',
                resolve: {
                    "fire": () => fire || {},
                    "title": () => title,
                    "type": () => type || null,
                    "action": () => action || null
                }
            }
        };

        var getReportsModalConfig = (reportName) => {
            return {
                animation: false,
                size: 'sm',
                keyboard: false,
                backdrop: 'static',
                resolve: {
                    "reportName": () => reportName
                }
            }
        };

        var getASRReportsModalConfig = (reportName) => {
            return {
                animation: false,
                size: 'md',
                keyboard: false,
                backdrop: 'static',
                resolve: {
                    "reportName": () => reportName
                }
            }
        };

        var getPeriodModalConfig = (reportName) => {
            return {
                animation: false,
                size: 'md',
                keyboard: false,
                backdrop: 'static',
                resolve: {
                    "reportName": () => reportName
                }
            }
        };


/*
        this.modalWithValueReturn = (title, restServiceUrl, templateUrlString, controllerName, controllerAsName, matchAdressFieldString) =>{
*/
        this.modalWithValueReturn = (title, templateUrlString, controllerName, controllerAsName, matchAdressFieldString) =>{

            var confirmModalConfig = {
                animation: true,
                size: 'md',
                keyboard: false,
                backdrop: 'static',
                resolve: {
                    modalTitle: function(){
                        return title;
                    },
                    matchAdressFieldString: function(){
                        return matchAdressFieldString;
                    }


/*
                    ,
                    restServiceUrl: function(){
                        return restServiceUrl;
                    }
*/
                }
            };
            angular.extend(confirmModalConfig, {
                templateUrl: templateUrlString, //'src/modules/modals/confirm/modals-confirm.template.html',
                controller: controllerName,
                controllerAs: controllerAsName,
                matchAdressFieldString: matchAdressFieldString
            });
            console.log('confirmModalConfig: ', confirmModalConfig);
            var modalInstance = $uibModal.open(confirmModalConfig);
            return modalInstance;
        };


        var warning = (title, text) => {
            var warningModalConfig = getWarningModalConfig(title, text);
            angular.extend(warningModalConfig, {
                templateUrl: 'sources/firesroot/modals/warning/modals-warning.template.html',
                controller: 'WarningController',
                controllerAs: 'warningCtrl'
            });
            var modalInstance = $uibModal.open(warningModalConfig);
            return modalInstance.result;
        };

        this.confirm = (title, text) => {
            var confirmModalConfig = getDefaultModalConfig(title, text);
            angular.extend(confirmModalConfig, {
                templateUrl: 'sources/firesroot/modals/confirm/modals-confirm.template.html',
                controller: 'ConfirmController',
                controllerAs: 'confirmCtrl'
            });
            // console.log('confirmModalConfig: ', confirmModalConfig);
            var modalInstance = $uibModal.open(confirmModalConfig);
            return modalInstance.result;
        };



        var matchAdress = (title, text) => {
            var matchAdressModalConfig = getMatchAdressModalConfig(title, text);
            angular.extend(matchAdressModalConfig, {
                templateUrl: 'sources/firesroot/modals/matchAdress/modals-matchAdress.template.html',
                controller: 'MatchAdressController',
                controllerAs: 'matchAdressCtrl'
            });
            var modalInstance = $uibModal.open(matchAdressModalConfig);
            return modalInstance.result;
        };


        var protocol = (fire, type, action) => {
            let title = (action == 'date'? 'Изменение времени' : 'Добавление записи');

            var protocolModalConfig = getProtocolModalConfig(
                fire,
                title,
                type,
                action
            );
            protocolModalConfig.size = (action == 'date'? 'sm' : 'md');
            angular.extend(protocolModalConfig, {
                templateUrl: 'sources/firesroot/modals/protocol/modals-protocol.template.html',
                controller: 'ProtocolController',
                controllerAs: 'protocolCtrl'
            });
            // orderModalConfig.resolve["type"] = () => type;
            var modalInstance = $uibModal.open(protocolModalConfig);
            return modalInstance.result;
        };






        var order = (type, title, text) => {
            var orderModalConfig = getDefaultModalConfig(title, text);
            angular.extend(orderModalConfig, {
                templateUrl: 'sources/firesroot/modals/order/modals-order.template.html',
                controller: 'OrderController',
                controllerAs: 'orderCtrl',
            });
            orderModalConfig.resolve["type"] = () => type;
            // console.log('alertModalConfig: ', alertModalConfig);
            var modalInstance = $uibModal.open(orderModalConfig);
            return modalInstance.result;
        };


        var notes = (type, title, text) => {
            var notesModalConfig = getNotesModalConfig(title, text);
            angular.extend(notesModalConfig, {
                templateUrl: 'sources/firesroot/modals/notes/modals-notes.template.html',
                controller: 'NotesController',
                controllerAs: 'notesCtrl',
            });
            notesModalConfig.resolve["type"] = () => type;
            // console.log('alertModalConfig: ', alertModalConfig);
            var modalInstance = $uibModal.open(notesModalConfig);
            return modalInstance.result;
        };



        var reports = (type) => {

            var reportsModalConfig = getReportsModalConfig(type);
            angular.extend(reportsModalConfig, {
                templateUrl: 'sources/firesroot/modals/reports/modals-reports.template.html',
                controller: 'ReportsController',
                controllerAs: 'reportsCtrl',
            });
            reportsModalConfig.resolve["type"] = () => type;
            var modalInstance = $uibModal.open(reportsModalConfig);
            return modalInstance.result;
        };

        var ASRReports = (type) => {
            var ASRReportsModalConfig = getASRReportsModalConfig(type);
            angular.extend(ASRReportsModalConfig, {
                templateUrl: 'sources/firesroot/modals/ASR/modals-ASRReports.template.html',
                controller: 'ASRReportsController',
                controllerAs: 'ASRReportsCtrl',
            });
            ASRReportsModalConfig.resolve["type"] = () => type;
            var modalInstance = $uibModal.open(ASRReportsModalConfig);
            return modalInstance.result;
        };


        var period = (type) => {
            var periodModalConfig = getPeriodModalConfig(type);
            angular.extend(periodModalConfig, {
                templateUrl: 'sources/firesroot/modals/period/modals-period.template.html',
                controller: 'PeriodController',
                controllerAs: 'PeriodCtrl',
            });
            periodModalConfig.resolve["type"] = () => type;
            var modalInstance = $uibModal.open(periodModalConfig);
            return modalInstance.result;
        };



        this.protocol = function(fire, type, action){
            protocol(fire, type, action);
        };
        this.order = (title, text) => order('order', title, text);
        this.notes = (title, text) => notes('notes', title, text);
        this.matchAdress = (title, text) => matchAdress(title, text);
        this.reports = (title, text) => reports(title, text);
        this.period = (title, text) => period(title, text);
        this.ASRReports = (title, text) => ASRReports(title, text);
        this.warning = (title, text) => warning(title, text);
    });
