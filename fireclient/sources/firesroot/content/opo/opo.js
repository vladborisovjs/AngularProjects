(function () {
    'use strict';
    angular
        .module('app.opo', ['ui.router', 'angular-growl'])
        .controller('OpoCtrl', OpoCtrl)
        .filter('opoSort', () => {
            const reg = /^(\d)+/g; // starts with number
            return (items) => {
                if (!angular.isArray(items)) {
                    return items;
                }
                const result = items;
                result.sort((a, b) => {
                    a = a.opoName;
                    b = b.opoName;
                    const aNums = a.match(reg);
                    const bNums = b.match(reg);
                    if (aNums !== null && bNums !== null) {
                        const res = parseInt(aNums[0]) - parseInt(bNums[0]);
                        if (res === 0) {
                            return a > b ? 1 : (a < b) ? -1 : 0;
                        }
                        return res;
                    } else if (aNums !== null) {
                        return -1
                    } else if (bNums !== null) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                return result;
            }
        });
    OpoCtrl.$inject = ['ws', 'storage'];

    function OpoCtrl(ws, storage) {
        const vm = this;
        vm.storage = storage;
        vm.collection = storage.opo;
        vm.ws = ws;
    }
})();
