(function(){
    'use strict';
    angular
        .module('app.forma', [])
        .controller('Forma', Forma);

    Forma.$inject = ['$log', '$scope', 'ws', 'storage', '$location', '$state', '$stateParams', '$anchorScroll', '$timeout', 'growl', '$interval', 'modalsService', '$window'];

    function Forma($log, $scope, ws, storage, $location, $state, $stateParams, $anchorScroll, $timeout, growl, $interval, modalsService, $window){

        var vm = this;
        vm.storage = storage;


        storage.controllers.forma = vm;


        vm.currentSolutionNum = undefined;
        vm.prop = undefined;
        vm.currItem = undefined;
        vm.showSolution = false;
        vm.codeInput = '';
        vm.position = {
            top: '500px',
            left: '500px'
        };
        vm.currentTabArea = null;
        vm.showSolution = false;
        vm.today = new Date();
        const formContainer = document.querySelector('#form6-container');
        // vm.k = {
        vm.k = vm.singleDatePickerOptions = {
            "showDropdowns": true,
            "timePicker": false,
            "timePicker24Hour": true,
            "separator": ':',
            "singleDatePicker": true,
            "autoApply": true,
            "minuteStep": 1,
            "locale": {
                "format": "DD/MM/YYYY",
                "separator": " - ",
                "applyLabel": "ОК",
                "cancelLabel": "Отмена",
                "fromLabel": "От",
                "toLabel": "До"
            }
        };


        // console.log('6 > ', vm.storage.forma6);

        if(vm.storage.forma6.detectiontime44 == null){
            vm.storage.forma6.detectiontime44 = vm.storage.forma6.messagetime45;
        }


        if(vm.storage.forma6.hasOwnProperty('inspectionCode2') && vm.storage.forma6.inspectionCode2 == null){
            vm.storage.forma6.inspectionCode2 = vm.storage.forma6.administrationDistrict2;
        }


        vm.getPCHTitle = function(param){
            return param + vm.storage.fireUser.ACCESS.words.pch;
        };


        vm.scroll = function(p){
            $location.hash(p);
            $anchorScroll();
        };

        vm.showSolutionsModal = (relativeTo) =>{
            const offset = relativeTo.getBoundingClientRect();
            const containerScroll = formContainer.scrollTop;
            const containerOffset = formContainer.getBoundingClientRect();

            // vm.position.top = offset.bottom - containerOffset.top + containerScroll + 10;
            vm.position.top = offset.bottom - containerOffset.top + containerScroll + 4;
            /*
             if(offset.left + 400 > containerOffset.right){
             vm.position.left = offset.right - 400 - containerOffset.left;
             } else {
             vm.position.left = offset.left - containerOffset.left;
             }
             */

            vm.position.left = '0';


            /*

             var wrapper = $window.document.querySelector('#codeInput-wrapper');
             if(!!wrapper === true && wrapper.nodeType === 1){
             console.log(wrapper);
             }
             */


            vm.showSolution = !vm.showSolution;

            $timeout(function(){
                $('#codeInput').focus();
            }, 100);
        };

        vm.findSolutions = function(event, item, prop, num){
            vm.codeInput = '';
            ws.$emit('findForma6Solutions', num);
            vm.currentSolutionNum = num;
            vm.currItem = item;
            vm.prop = prop;
            vm.currElement = event.target;

            vm.showSolutionsModal(vm.currElement);
        };


        vm.closeSolutions = function(){
            vm.showSolution = false;

            $timeout(function(){
                vm.currElement.focus();
                vm.currElement = null;
                //     $("input[ng-click*='," + solution.table + ")']")[0].focus();
            }, 100);
            vm.currentSolutionNum = undefined;
            vm.prop = undefined;
            storage.forma6Solutions = undefined;
        };

        vm.findAsrSubType = function(event, item, prop){
            ws.$emit('findAsrSubType', storage.forma6.asrType80);
            vm.currItem = item;
            vm.prop = prop;
            vm.currElement = event.target;
            vm.showSolutionsModal(vm.currElement);
        };

        vm.asrSubType80Disabled = function(){
            if(storage.forma6 != undefined){
                if(storage.forma6.asrType80){
                    return !storage.forma6.asrType80.text;
                } else {
                    return true;
                }
            }
        };

        vm.chooseSolution = function(solution){
            vm.codeInput = '';
            if(angular.isDefined(vm.prop)){
                if(vm.prop != ''){
                    vm.currItem[vm.prop] = jQuery.extend({}, solution);
                } else {
                    vm.currItem.code = solution.code;
                    vm.currItem.id = solution.id;
                    vm.currItem.num = solution.num;
                    vm.currItem.parent = solution.parent;
                    vm.currItem.table = solution.table;
                    vm.currItem.text = solution.text;
                }
                vm.closeSolutions();
            }
        };

        vm.removeSolution = () =>{
            vm.codeInput = '';
            if(angular.isDefined(vm.prop)){
                vm.currItem[vm.prop] = null;
                vm.closeSolutions();
            }
        };


        vm.addInjure = function(forma6, event){
            forma6.injuryCauses74_75.push({reason: {}, count: 0});
        };


        vm.addFireCondition53 = function(forma6){
            forma6.fireConditions52.push({});
        };

        vm.addfireMembers53 = function(forma6){
            forma6.fireMembers53.push({});
        };

        vm.addStvol = function(forma6){
            forma6.aboutStvol56_57.push({stvol: {}, count: 0});
        };
        vm.addEngine = function(forma6){
            forma6.carsOnFire54_55.push({techtype: {}, count: 0});
        };

        vm.addextinguishingReagents58 = function(forma6){
            forma6.extinguishingReagents58.push({});
        };

        vm.addprimaryExtinguishing59 = function(forma6){
            forma6.primaryExtinguishing59.push({});
        };

        vm.addfireWaterSupply61 = function(forma6){
            forma6.fireWaterSupply61.push({});
        };

        vm.addheadsExtinguishing64 = function(forma6){
            forma6.headsExtinguishing64.push({});
        };

        vm.addFireAutomaticInfo = function(forma6){
            forma6.fireAutomaticInfo62_63.push({automatic: {}, result: {}});
        };

        vm.addDiedInfo = function(){
            vm.storage.forma6.totaldied25++;
            vm.storage.forma6.diedPersonsInfo67_73.push({
                age67: 0,
                gender68: null,
                socialStatus69: null,
                education70: null,
                deadCause71: null,
                deathConditions72: null,
                deathMoment73: null
            });
        };

        vm.deleteDiedInfo = function(diedPerson){
            vm.storage.forma6.totaldied25--;
            vm.storage.forma6.diedPersonsInfo67_73 = _.filter(vm.storage.forma6.diedPersonsInfo67_73, function(diedPersonInfo){
                return diedPersonInfo != diedPerson;
            })
        };


        vm.addGdzTechInfo = () =>{
            vm.storage.forma6.gdzTechInfoes86_89.push({
                pch87: null,
                qtyGroups88: 0,
                totalTime89: 0,
                typeApparature90: null
            });
        };

        vm.deleteGdzTechInfo = (tech) =>{
            vm.storage.forma6.gdzTechInfoes86_89 = vm.storage.forma6.gdzTechInfoes86_89.filter(t => t !== tech)
        };

        vm.addBaseTechInfo = () =>{
            vm.storage.forma6.baseTechInfoes82_85.push({
                workFromGydrant83: 0,
                totalTime86: 0
            });
        };

        vm.deleteBaseTechInfo = (tech) =>{
            vm.storage.forma6.baseTechInfoes82_85 = vm.storage.forma6.baseTechInfoes82_85.filter(t => t !== tech)
        };

        vm.removeItem = function(array, index, event){
            array.splice(index, 1);
        };


        const highlightFields = {
            fire: {
                red: ['address', '5', '77', '81', '76', '78', '79', '80', '6po', '6nas', '2admDistr', '2insp', '16mesto', '12obj', '12prot', '24PchDist', '44', '46', '45', '54', '51', '64', '59', '58', '56Stvol', '57sCount', 'text', 'reportDate', '64-extinguishingLeaders'],
                green: ['33rg-from', '34rg-from', '40_1-saved-people', '08-participant', '47', '48', '49', '50', '15dgr-from', '25all', '26all', '40totalevacuated', '13-participationOfGasAndSmokeProtection', '65-fireFightingHeadquarters', '66-departureOfOperational-investigationsGroup', '58-fireExtinguishingAgents', '59-primaryMeans']
            },
            ignition: {
                red: ['address', '5', '77', '81', '76', '78', '79', '80', '6po', '6nas', '2admDistr', '2insp', '16mesto', '12obj', '12prot', '24PchDist', '44', '46', '45', '54', '51', '64', '59', '58', '56Stvol', '57sCount', 'text', 'reportDate', '64-extinguishingLeaders'],
                green: ['08-participant', '47', '48', '49', '50', '50rg-from', '58-fireExtinguishingAgents', '59-primaryMeans']
            },
            asr: {
                red: ['address', '2admDistr', '2insp', '5', '76', '78', '77', '79', '80', '80asr', '80asrSub', '81', 'text', '24PchDist', '40saved', '44', '45', '46', '51', 'reportDate', '64-extinguishingLeaders', '53-extinguishingParticipants'],
                green: ['25all', '26all', '40_1-saved-people', '08-participant', 'hydraulicTools91', '50', '47', '48', '49', '58-fireExtinguishingAgents', '59-primaryMeans', '40totalevacuated']
            },
            other: {
                red: ['address', '2admDistr', '2insp', '5', '76', '78', '77', '79', '80', '81', '44', '45', '51', 'text', 'reportDate'],
                green: ['50', '47', '48', '49', '46', '08-participant', '58-fireExtinguishingAgents', '59-primaryMeans', '64-extinguishingLeaders']
            },
            none: {
                red: ['80']
            }
        };

        function getTypeFire(typeFire){
            if(typeFire === null || typeFire === undefined || typeFire.code === undefined){
                return 'none';
            }
            switch(typeFire.code){
                case 1: //пожар
                    return 'fire';
                case 2: //загорание(мусор)
                    return 'ignition';
                case 4: //ЛСС
                    return 'other';
                case 9: //ЛВ
                    return 'other';
                case 14: //Прочие не аср
                    return 'other';
                case 15: //АСР
                    return 'asr';
            }
            return 'none'
        };


        function checkValidBeforeSave(){
            var nodes = Array.from(document.querySelectorAll('.red-highlight-f6')),
                temporaryNodes = [],
                errors = {},
                legend,
                current = null;


            nodes.forEach(function(node, idx){
                if(node.nodeName.toLowerCase() !== 'input' || node.nodeName.toLowerCase() !== 'textarea' && node.nodeType === 1){
                    temporaryNodes = Array.from(node.querySelectorAll('INPUT'));
                    if(temporaryNodes instanceof Array && temporaryNodes.length > 0){
                        Array.prototype.push.apply(nodes, temporaryNodes);
                    }
                }
            });

            for(var i = 0; i < nodes.length; i++){
                if(nodes[i].nodeName.toLowerCase() === 'input' || nodes[i].nodeName.toLowerCase() === 'textarea'){
                    if(nodes[i].value.trim().length === 0){
                        legend = null;
                        current = nodes[i];
                        while(current.parentNode && !!legend !== true){
                            legend = current.querySelector('LEGEND');
                            if(!!legend === true){
                                // console.log(legend.innerHTML);
                                if(errors[legend.innerHTML] === undefined){
                                    errors[legend.innerHTML] = 1;
                                } else {
                                    ++errors[legend.innerHTML];
                                }

                            }

                            current = current.parentNode;

                        }


                    }
                }
            }
            var message = '';

            if(Object.keys(errors).length > 0){
                for(var i in errors){
                    if(i in errors){
                        message += "раздел " + i + ": " + errors[i] + "<br>";
                    }
                }


                modalsService.warning('Обязательные поля', message)
                    .then(function(response){
                    })
                    .catch(function(response){
                        }
                    );
                return false;
            } else {
                return true;
            }
        };


        vm.validate = function(field, value){
            var found = false;
            if(!!field === true){
                var fireType = getTypeFire(vm.storage.forma6.typeFire80);
                if(!!fireType === true && highlightFields.hasOwnProperty(fireType)){
                    for(var i in highlightFields[fireType]){
                        if(i in highlightFields[fireType] && highlightFields[fireType][i].includes(field)){
                            found = true;
                            return i + '-highlight-f6';
                        }
                    }
                }
            }
            if(!found){
                return 'f6-transparent-panel';
            }
        };


        vm.saveF6 = function(){
            ws.$emit('saveF6', vm.storage.forma6);

            ws.$emit('getForma6Edits', storage.forma6.id);
        };


        /*
         const highlightByTypeFire = {
         fire: ['33rg-from', '34rg-from', '40_1-saved-people', '08-participant', '09-resources'],
         ignition: ['08-participant', '09-resources'],
         asr: ['25all', '26all']
         };

         const validateByTypeFire = {
         fire: ['address', '5', '77', '81', '76', '78', '79', '80', '6po', '6nas', '2admDistr', '2insp', '16mesto', '12obj', '12prot', '24PchDist', '44', '48', '47', '46', '45', '54', '51', '50', '49', '64', '59', '58', '56Stvol', '57sCount', 'text'],
         asr: ['address', '2admDistr', '2insp', '5', '76', '78', '77', '79', '80', '80asr', '80asrSub', '81', 'text', '25all', '26all', '24PchDist', '40saved', '44', '45', '46', '50', '51', '40totalevacuated'],
         other: ['address', '2admDistr', '2insp', '5', '76', '78', '77', '79', '80', '81', '44', '45', '46', '50', '51', 'text'],
         none: ['80']
         };

         const getLocalTypeFire = (typeFire) =>{
         if(typeFire === null || typeFire === undefined || typeFire.code === undefined){
         return 'none';
         }
         switch(typeFire.code){
         case 1: //пожар
         return 'fire';
         case 2: //загорание(мусор)
         return 'fire';
         case 4: //ЛСС
         return 'other';
         case 9: //ЛВ
         return 'other';
         case 14: //Прочие не аср
         return 'other';
         case 15: //АСР
         return 'asr';
         }
         return 'none'
         };

         vm.validate = function(paragraph, value){
         const localTypeName = getLocalTypeFire(vm.storage.forma6.typeFire80);

         if(_.contains(validateByTypeFire[localTypeName], paragraph)){
         if(angular.isUndefined(value) || value === null){
         return 'f6-invalid'
         }
         if(angular.isString(value)){
         return (value.length > 0) ? 'f6-valid' : 'f6-invalid'
         }
         if(angular.isDate(value)){
         return 'f6-valid'
         }
         if(angular.isObject(value) && jQuery.isEmptyObject(value)){
         return 'f6-invalid';
         }
         if(value != null){
         return 'f6-valid'
         }
         } else {
         return '';
         }
         };


         function getTypeFire(typeFire){
         if(typeFire === null || typeFire === undefined || typeFire.code === undefined){
         return 'none';
         }
         switch(typeFire.code){
         case 1: //пожар
         return 'fire';
         case 2: //загорание(мусор)
         return 'ignition';
         case 4: //ЛСС
         return 'other';
         case 9: //ЛВ
         return 'other';
         case 14: //Прочие не аср
         return 'other';
         case 15: //АСР
         return 'asr';
         }
         return 'none'
         };




         vm.highlightByType = function(field){
         if(!!field === true){
         var typeName = getTypeFire(vm.storage.forma6.typeFire80);
         if(!!typeName === true && highlightByTypeFire.hasOwnProperty(typeName)){
         console.log('->', field, highlightByTypeFire[typeName].includes(field));
         if(highlightByTypeFire[typeName].includes(field)){
         return 'green-highlight';
         }
         }
         }
         };

         */


        vm.closeFire = function(){
            if(checkValidBeforeSave()){

                $state.go('fires.firesbase', {
                    deptId: undefined,
                    engineId: undefined,
                    fireId: undefined
                }, {location: true});

                ws.$emit('saveF6', vm.storage.forma6);
                ws.$emit('closeFire', vm.storage.forma6);
                ws.$emit('unlockDocument', vm.storage.forma6.fireActId + ':forma');
            }
        };
        vm.codeFilter = function(item){
            if(vm.codeInput != ''){
                var str = item.code.toString();
                return str.includes(vm.codeInput);
            }
            else {
                return true
            }
        };
        vm.selectTypedCodeItem = function(event){
            if(event.which == 13){
                var element = $('.typedCodeF6');
                if(element.length !== 0){
                    var solution = _.find(storage.forma6Solutions, function(solution){
                        return solution.code == vm.codeInput;
                    });
                    if(solution != undefined){
                        vm.chooseSolution(solution);
                    }
                } else {
                    growl.warning('Нет элемента с таким КОДОМ')
                }
            }

        };
        vm.moveToArchiveButtonHide = function(){
            var pureFire = _.find(storage.activeFires, function(fire){
                return fire.id === vm.storage.forma6.fireActId
            });
            return pureFire != undefined;
        };
        vm.goBack = function(){
            window.history.back();
        };


        vm.investigationResultChanged = function(){
            if(storage.forma6 && storage.forma6.investigationResult22 && storage.forma6.investigationResult22.code !== 1){
                storage.forma6.agencyStartCriminalCase = null;
                storage.forma6.criminalCaseArticle = null;
            }
        };

        let watcher1 = $scope.$watch(() =>{
            return storage.forma6? storage.forma6.investigationResult22 : null;
        }, vm.investigationResultChanged);

        var relockForma6 = $interval(function(){
            if(vm.storage.forma6 != undefined){
                ws.$emit('relockDocument', vm.storage.forma6.fireActId + ':forma');
                // ws.$emit('relockDocument', vm.storage.forma6.fireActId);
            }
        }, 10000);

        vm.getLastEdit = () =>{
            const f6Edits = storage.dataOfStates.f6EditsList;
            if(f6Edits && f6Edits.length){
                return f6Edits[f6Edits.length - 1]
            }
        };

        $scope.$on('$destroy', function(){
            $interval.cancel(relockForma6);
            relockForma6 = undefined;
            if(vm.storage.forma6 != undefined){
                ws.$emit('unlockDocument', vm.storage.forma6.fireActId + ':forma');
                // ws.$emit('unlockDocument', vm.storage.forma6.fireActId);
            }
            watcher1();
        });



        /*vm.tablesWithInputs = {
            'fireConditions52': {
                data: {}
            },
            'fireMembers53': {
                data: {}
            },
            'injuryCauses74_75': {
                data: {reason: {}, count: 0}
            },
            'carsOnFire54_55': {
                data: {techtype: {}, count: 0}
            },
            'aboutStvol56_57': {
                data: {stvol: {}, count: 0}
            },
            'extinguishingReagents58': {
                data: {}
            },
            'primaryExtinguishing59': {
                data: {}
            },
            'fireWaterSupply61': {
                data: {}
            },
            'fireAutomaticInfo62_63': {
                data: {automatic: {}, result: {}}
            },
            'headsExtinguishing64': {
                data: {}
            },
            'diedPersonsInfo67_73': {
                data: {
                    age67: 0,
                    gender68: null,
                    socialStatus69: null,
                    education70: null,
                    deadCause71: null,
                    deathConditions72: null,
                    deathMoment73: null
                }
            },
            'baseTechInfoes82_85': {
                data: {
                    workFromGydrant83: 0,
                    totalTime86: 0
                }
            },
            'gdzTechInfoes86_89': {
                data: {
                    pch87: null,
                    qtyGroups88: 0,
                    totalTime89: 0,
                    typeApparature90: null
                }
            }

        };*/

        vm.tablesWithInputs = {
            'headsExtinguishing64': {
                data: {}
            }

        };

        vm.checkTableData = function(){



            for(var i in vm.tablesWithInputs){

                if(vm.tablesWithInputs.hasOwnProperty(i) && vm.storage.forma6.hasOwnProperty(i)){

                    // console.log(i, ' >', vm.storage.forma6[i].length);
                    // vm.storage.forma6[i];
                    if(!!vm.storage.forma6[i].length === false){
                        vm.storage.forma6[i] = new Array(vm.tablesWithInputs[i].data);
                    }
                }

            }





        };




        $scope.$on('$viewContentLoaded', function(){


            vm.checkTableData();


/*
            var nodes = Array.from(document.querySelectorAll('.glyphicon-plus')),
                attr = [];

            if(!!nodes === true){


                for(var i = 0, l = nodes.length; i < l; i++){

                    if(!!nodes[i].parentNode === true && nodes[i].parentNode.nodeType === 1 && nodes[i].parentNode.nodeName === 'BUTTON' && !!nodes[i].parentNode.attributes === true){

                        attr = Array.from(nodes[i].parentNode.attributes);

                        var req = (nodes[i].parentNode.attributes.getNamedItem('ng-click').value.toString()).replace(/forma\./gi, 'vm.');
                        console.log(' j>', req);
                        eval(req);
                    }
                }
            }
*/





        });


    }
})();
