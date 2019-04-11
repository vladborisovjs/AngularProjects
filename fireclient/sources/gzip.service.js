(function () {
    'use strict';
    angular
        .module('app')
        .service('gzip', [function () {
            this.fromGzip = (message) => {
                const base64Decoded = atob(message);
                const gzipDecoded = pako.ungzip(base64Decoded, {to: 'string'});
                return JSON.parse(gzipDecoded);
            };
            this.toGzip = (object) => {
                const jsonString = JSON.stringify(object);
                const gzipEncoded = pako.gzip(jsonString, {to: 'string'});
                return btoa(gzipEncoded);
            };
        }])
})();
