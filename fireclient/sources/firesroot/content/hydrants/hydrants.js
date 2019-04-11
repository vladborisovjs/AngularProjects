(function () {
    'use strict';
    angular.module('app.hydrants', [])
        .controller('HydrantsCtrl', HydrantsCtrl);

    HydrantsCtrl.$inject = ['ws', 'storage', '$rootScope', 'WMSURL', 'GSLAYERS', '$scope', 'growl', 'gzip'];

    function HydrantsCtrl(ws, storage, $rootScope, WMSURL, GSLAYERS, $scope, growl, gzip) {
        const vm = this;
        vm.storage = storage;
        vm.groups = {};
        vm.period = getCurrentPeriod();
        vm.maxPeriod = getCurrentPeriod();

        vm.loading = true;
        vm.form = null;

        ws.$on('readOpoSummary', function (message) {
            vm.hydrantsSummary = message;
            // vm.hydrantsSummary = gzip.fromGzip(message);
            // console.log('readed', vm.hydrantsSummary);
            vm.loading = false;
            $scope.$apply();
        });

        ws.$on('writeOpoSummary', (message) => {
            vm.form.$setPristine();
            vm.loading = false;
            growl.success("Данные о гидрантах обновлены", {
                ttl: 4000,
                disableCountDown: false
            });
            vm.hydrantsSummary = message;
            // vm.hydrantsSummary = gzip.fromGzip(message);
            $scope.$apply();
        });

        vm.save = () => {
            const gzipped = vm.hydrantsSummary;
            // const gzipped = gzip.toGzip(vm.hydrantsSummary);
            ws.$emit('writeOpoSummary', gzipped);
            vm.loading = true;
        };

        vm.setPeriod = () => {
            ws.$emit('readOpoSummary', {
                month: vm.period.month - 1,
                year: vm.period.year
            });
            vm.loading = true;
        };

        vm.cancel = () => {
            // set model to null
            vm.hydrantsSummary = null;
            vm.form.$setPristine();
            vm.loading = false;
        };

        vm.getTotalDefective = (holder) => {
            if (!holder || !holder.hydrantInform) return 0;
            const infoKeys = Object.keys(holder.hydrantInform);
            // accumulate all keys accept sum
            return infoKeys.reduce((previous, current) => {
                if (current !== 'sum' && holder.hydrantInform.hasOwnProperty(current)) {
                    return previous + holder.hydrantInform[current]
                }
                return previous;
            }, 0);
        };

        vm.getTotalSrc = (holder) => {
            if (!holder || !holder.hydrantInform) return 0;
            const infoKeys = ['no_table', 'no_find', 'no_column', 'no_water_defect', 'no_water_off', 'no_water_winter'];
            return infoKeys.reduce((previous, current) => previous + holder.hydrantInform[current], 0);
        };

        vm.getRatio = (holder) => {
            let sum = 0;
            if (holder && holder.hydrantInform && holder.hydrantInform.sum) {
                sum = vm.getTotalSrc(holder) / holder.hydrantInform.sum * 100;
            }
            return sum.toFixed(2);
        };

        function getCurrentPeriod() {
            const date = new Date();
            return {
                month: date.getMonth() + 1,
                year: date.getFullYear()
            }
        }

        $scope.$on('$destroy', () => {
            ws.$un('readOpoSummary');
        });
    }
})();
