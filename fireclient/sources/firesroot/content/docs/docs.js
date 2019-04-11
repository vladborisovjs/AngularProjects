(function(){

    'use strict';
    angular
        .module('app.docs', [])
        .controller('Docs', Docs)
        .filter('docsPropsFilter', function(){
            return function(items, props){
                var allKeysUndefined = true;
                var keys = Object.keys(props);
                for(var i = 0; i < keys.length; i++){
                    if(props[keys[i]] !== undefined){
                        allKeysUndefined = false;
                        break;
                    }
                }
                if(allKeysUndefined){
                    return items;
                } else {
                    var propertiesToSearch = {};
                    for(var i = 0; i < keys.length; i++){
                        if(props[keys[i]] !== undefined){
                            propertiesToSearch[keys[i]] = props[keys[i]];
                        }
                    }
                    return _.where(items, propertiesToSearch);
                }
            }
        })
        .filter('uiSelectsFilter', function(){
            return function(items, search){
                var out = [];
                if(angular.isArray(items)){
                    items.forEach(function(item){
                        if(item.toString().toLowerCase().indexOf(search) !== -1){
                            out.push(item);
                        }
                    });
                } else {
                    out = items;
                }

                return out;
            }
        })
        .run(['$rootScope', 'ws', '$log', 'storage', 'growl', function($rootScope, ws, $log, storage, growl){

            function reInitSelects(){
                var tempList = _.map(storage.docs, function(Doc){
                    return Doc.typeDoc;
                });
                storage.dataOfStates.docs.listOfDocTypes = _.uniq(tempList);
                tempList = _.map(storage.docs, function(Doc){
                    return Doc.user;
                });
                storage.dataOfStates.docs.listOfDocUsers = _.uniq(tempList);
                tempList = _.map(storage.docs, function(Doc){
                    return Doc.numDoc;
                });
                storage.dataOfStates.docs.listOfDocNums = _.uniq(tempList);
                tempList = _.map(storage.docs, function(Doc){
                    return Doc.caraulNum;
                });
                storage.dataOfStates.docs.listOfDocCaraulNums = _.uniq(tempList);
            }

            ws.$on('addDoc', function(message){
                storage.docs.push(message);
                reInitSelects();
                $rootScope.$apply();
            });

            ws.$on('getDocsByTags', function(message){
                storage.docs = [];
                if(Array.isArray(message)) storage.docs = message;
                reInitSelects();
                $rootScope.$apply();
            });

        }]);

    Docs.$inject = ['$log', '$scope', 'ws', 'storage', '$location', '$state', '$stateParams', '$filter', '$sce'];
    function Docs($log, $scope, ws, storage, $location, $state, $stateParams, $filter, $sce){
        var vm = this;
        vm.storage = storage;

        vm.today = new Date();
        vm.datePicker = {
            startDate: new Date(new Date().setDate(new Date().getDate() - 1)),
            endDate: new Date()
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

        vm.getDocsByTags = function(){
            var command = {
                fireActId: undefined,
                creationDateFrom: new Date().setDate(new Date().getDate() - 1),
                creationDateTo: Date.now()
            };
            if(angular.isDefined($stateParams.fireId)){
                command.fireActId = $stateParams.fireId;
            }
            ws.$emit('getDocsByTags', command);
        };
        vm.getDocsByTags();

        vm.applyDateFilter = function(){
            console.log(vm.datePicker.startDate);
            console.log(vm.datePicker.endDate);
            var command = {
                fireActId: $stateParams.fireId ? $stateParams.fireId : undefined,
                creationDateFrom: vm.datePicker.startDate.valueOf(),
                creationDateTo: vm.datePicker.endDate.valueOf()
            };
            console.log(command);
            ws.$emit('getDocsByTags', command);
        };
        vm.cancelDateFilter = function(){
            vm.datePicker = {
                startDate: new Date(new Date().setDate(new Date().getDate() - 1)),
                endDate: new Date()
            };
            vm.storage.dataOfStates.docs.selectedUser = null;
            vm.storage.dataOfStates.docs.selectedDocNum = null;
            vm.storage.dataOfStates.docs.selectedDocCaraulNum = null;
            vm.storage.dataOfStates.docs.typeDoc = null;
            vm.getDocsByTags();
        };
        vm.getDownloadName = function(doc, mimeType){
            var temp = doc.typeDoc + ' ' + $filter('date')(doc.creationDate, 'dd-MM-yy HH:mm') + '.' + mimeType;
            return temp;
        };

        vm.onSelectRefreshFilters = function(){
            var collection = vm.filtredDocs;
            var tempList = _.map(collection, function(Doc){
                return Doc.typeDoc;
            });
            vm.storage.dataOfStates.docs.listOfDocTypes = angular.merge([], _.uniq(tempList));
            tempList = _.map(collection, function(Doc){
                return Doc.user;
            });
            vm.storage.dataOfStates.docs.listOfDocUsers = angular.merge([], _.uniq(tempList));
            tempList = _.map(collection, function(Doc){
                return Doc.numDoc;
            });
            vm.storage.dataOfStates.docs.listOfDocNums = angular.merge([], _.uniq(tempList));
            tempList = _.map(collection, function(Doc){
                return Doc.caraulNum;
            });
            vm.storage.dataOfStates.docs.listOfDocCaraulNums = angular.merge([], _.uniq(tempList));
        };
        vm.getUrlDoc = function(url, type){
            /*            console.clear();

             console.log(vm.storage.docs);
             console.log(type);
             console.log(url);*/

            return url;
        };
        vm.filterHTMLOnly = function(docList){
            var output = _.filter(docList, function(doc){
                return doc.mimeType === 'html'
            });
            return output;
        };
        vm.filterNotHTML = function(docList){
            var output = _.filter(docList, function(doc){
                return doc.mimeType !== 'html'
            });
            return output;
        }
    }
})
();
