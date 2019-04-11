(function(){
    'use strict';
    angular
        .module('app')
        .directive('contentEditableModel', ['$timeout', '$window', function($timeout, $window){
            return {
                scope: true,
                link: {

                    pre: function(scope, element, attrs, controller){
                        $(element).attr('spellcheck', 'false');
                        $(element).attr('contenteditable', 'true');
                    },

                    post: function(scope, element, attrs, controller){
                        function getCaretPos(element){
                            if($window.document.selection){
                                var sel = $window.document.selection.createRange();
                                var clone = sel.duplicate();
                                sel.collapse(true);
                                clone.moveToElementText(element);
                                clone.setEndPoint('EndToEnd', sel);
                                return clone.text.length;
                            } else {
                                return $window.getSelection().getRangeAt(0).startOffset;
                            }
                            return 0;
                        }


                        function setCaretPos(element, pos){


                            var sel = $window.getSelection();
                            var range = $window.document.createRange();


                            range.setStart(element.childNodes[0], pos);
                            range.collapse(true);


                            sel.removeAllRanges();
                            sel.addRange(range);
                            element.focus();
                        }

                        element.keydown(
                            function(event){
                                if(event.keyCode == 13){
                                    scope.$parent.fires.checkCommand();
                                    element.blur();
                                    event.preventDefault();
                                    event.stopPropagation();
                                }
                            }
                        );

                        element.keyup(
                            function(event){
                                var caretPos = getCaretPos(element);
                                scope.$parent.fires.messageBox = event.target.innerText;
                                scope.$apply();
                                setCaretPos(element[0], caretPos);
                            }
                        );
                    }
                }
            }
        }])
        .directive('flowFields', ['$timeout', function($timeout){
            return {
                scope: true,
                link: function(scope, elm){
                    var controls = null;
                    scope.$on('goToNextField', function(event, data){
                        focusNextField(data.from);
                    });
                    scope.goToNextField = function(fromField){
                        $timeout(function(){
                            scope.$broadcast('goToNextField', {from: fromField})
                        }, 0);
                    };

                    function focusNextField(fromField){
                        var curFocusedFieldNum = fromField;
                        var curFocusedField = _.find(controls, function(elem){
                            return $(elem).attr("data-flowControls") == curFocusedFieldNum;
                        });
                        var nextFieldNum = $(curFocusedField).attr("data-nextfield") || curFocusedFieldNum + 1; // если указано следующее поле - пробуем прыгнуть туда, иначе - на следующий после текущего элемента
                        var nextField = _.find(controls, function(elem){
                            return $(elem).attr("data-flowControls") == nextFieldNum;
                        });
                        if(nextField){ // есть ли нужный элемент
                            if($(nextField).attr("disabled") == "disabled" || $(nextField).parents('.ng-hide').length !== 0){ // доступен ли нужный элемент
                                nextField = _.find(controls, function(elem){ // если нет - ищем следующий доступный элемент
                                    return $(elem).attr("disabled") != "disabled" && $(elem).attr("data-flowControls") > nextFieldNum && $(elem).parents('.ng-hide').length === 0;
                                });
                            }
                            if(nextField === undefined){
                                $('*[data-flowControls-end]').focus();
                            }
                            else {
                                if($(nextField).hasClass('ui-select-container')){
                                    $(nextField).find('input').focus();
                                }
                                else {
                                    nextField.focus();
                                }
                            }
                        }
                        else {
                            $('*[data-flowControls-end]').focus();
                        }
                    }

                    $timeout(function(){
                        controls = $(elm[0]).find('*[data-flowControls]');
                        controls = _.sortBy(controls, function(elem){
                            return parseInt($(elem).attr("data-flowControls"));
                        });
                        _.map(controls, function(control){
                            $(control).bind("keypress", function(e){
                                    // e.preventDefault();
                                    if(e.keyCode === 13 || e.keyCode === 9){
                                        focusNextField(+$(this).attr("data-flowControls"));
                                    }
                                }
                            );
                        })
                    }, 0)
                }
            };
        }])
        .directive('highlightTabByItem', ['$timeout', function($timeout){
            return {
                scope: {
                    highlightTabByItem: "=highlightTabByItem"
                },
                link: function(scope, elm){

                    function getParent(node){
                        var found = null;

                        while(node.parentNode && !found){
                            node = node.parentNode;
                            if(node.id){
                                found = node.id.match(/\bp\d+\b/i);
                                if(found instanceof Array){
                                    found = found[0];
                                }
                            }
                        }
                        return found;
                    }

                    var items = elm.querySelectorAll('input, textarea, button');
                    for(var i = 0; i < items.length; i++){

                        if(items[i].nodeName.toLowerCase() !== 'span'){
                            items[i].onfocus = function(){
                                $timeout(() => scope.highlightTabByItem = getParent(this));
                            }
                        } else {
                            items[i].onclick = function(){
                                $timeout(() => scope.highlightTabByItem = getParent(this));
                            }
                        }
                    }
                }
            };
        }])
        .directive('selectNumbersOnClick', ['$window', function($window){
            return {
                restrict: 'A',
                link: function(scope, element, attrs){
                    element.on('click', function(e){
                        if(e.target && e.target.tagName === 'INPUT' && e.target.type === 'number'){
                            e.target.select();
                        }
                    });
                }
            };
        }])
        .directive('focusOn', function(){
            return function(scope, elem, attr){
                scope.$on(attr.focusOn, function(e){
                    elem[0].focus();
                });
            };
        })
        .directive('formaDateTimePicker', function(){
            return {
                template: `
                <div class="forma-date-time-picker">
                    <div class="forma-date-picker">
                        <div class="input-group">
                            <input type="text" class="form-control"
                                       uib-datepicker-popup="{{format || 'dd.MM.yyyy'}}"
                                       data-ng-class="validate"
                                       data-ng-model="date"
                                       data-is-open="opened"
                                       data-ng-required="f6Required"
                                       data-close-text="Закрыть"
                                       data-current-text="Сегодня"
                                       data-clear-text="Очистить"/>
                                <span class="input-group-btn">
                                    <button type="button" class="btn btn-default forma-date-picker-toggle" data-ng-click="opened = !opened">
                                        <i class="glyphicon glyphicon-calendar"></i>
                                    </button>
                                </span>
                            </div>
                    </div>
                    <div class="forma-time-picker">
                        <div uib-timepicker ng-model="date" data-ng-class="validate" data-ng-required="f6Required" show-spinners="false" show-meridian="false"></div>
                    </div>
                </div>
                `,
                scope: {
                    date: '=',
                    validate: '=',
                    f6Required: '=',
                    format: '='
                },
                link: function(scope){
                    scope.$watch('date', () =>{
                        if(scope.date && !angular.isDate(scope.date)){
                            scope.date = new Date(scope.date);
                        }
                    })
                }
            }
        })
        .directive('infoAboutRecruitedEngine', function(){
            return {
                template: `
                <div class="info-about-recruited-engine" data-ng-hide="engineListCtrl.showListButton()">
                    <button class="btn btn-xs btn-success default-gray-button" type="button" data-ng-click="engineListCtrl.showEngineList = !engineListCtrl.showEngineList;">
                        <i class="fa fa-truck"></i>&nbsp;{{engineListCtrl.enginesCount}}
                    </button>
                    <div class="info-panel" ng-show="!!engineListCtrl.showEngineList" data-ng-click="engineListCtrl.showEngineList = false;">
                   
                        <span data-ng-repeat="(key, value) in engineListCtrl.engines"
                          class="label label-primary default-gray-button"
                          style="font-size: 12px; display: inline-block; margin: 0 3px 2px 0;">
                            {{key}}
                            <span class="badge">{{value}}
                        </span>
                                            
                    </div>
                </div>
                `,
                scope: {
                    engines: '='
                },
                controllerAs: 'engineListCtrl',
                controller: function($scope){
                    var vm = this;
                    vm.showEngineList = false;


                    vm.showListButton = function(){
                        return !!vm.engines && Object.keys(vm.engines).length < 1;
                    };

                    vm.createEngineList = function(){
                        var type = null;
                        vm.engList = $scope.engines;
                        vm.engines = {};

                        if(!!vm.engList === true){

                            vm.enginesCount = 0;

                            for(var i in vm.engList){
                                type = null;
                                if(vm.engList.hasOwnProperty(i)){
                                    if(vm.engList[i].fireEngine.engineType.engineType.toUpperCase() == 'АЦ'){
                                        if(vm.engList[i].fireEngine.isFirstTank){
                                            type = vm.engList[i].fireEngine.engineType.engineType + '(1)';
                                        } else {
                                            type = vm.engList[i].fireEngine.engineType.engineType + '(2)';
                                        }
                                    } else {
                                        type = vm.engList[i].fireEngine.engineType.engineType;
                                    }

                                    if(!!type === true){

                                        if(!vm.engines.hasOwnProperty(type)){
                                            vm.engines[type] = 1;
                                        } else {
                                            ++vm.engines[type];
                                        }

                                        ++vm.enginesCount;
                                    }

                                }
                            }
                            if(Object.keys(vm.engines).length < 1){
                                vm.showEngineList = false;
                            }
                        }
                    };

                },

                link: function(scope, elem, attr, ctrl){
                    scope.$watch('engines', function(){
                        ctrl.createEngineList();
                    });
                }
            }
        })
        /*.directive('nodesOnTheFly', ['$window', 'storage', function($window, storage){
            return {
                /!*
                 scope: {
                 highlightTabByItem: "=highlightTabByItem"
                 },
                 *!/
                link: function(scope, element, attrs){

                    console.log('element 1>>>', storage.dataOfStates.newFireCard.chsData['3'])
                    console.log('element 2>>>', element)

                    function createNodesTree(data){

                        for(var i in data){
                            if(data.hasOwnProperty(i)){

                                data

                            }
                        }

                    }

                    element.appendChild(createNodesTree(storage.dataOfStates.newFireCard.chsData['3']));

                }
            };
        }]);*/
})();
