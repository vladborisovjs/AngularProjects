(function(){
    'use strict';
    angular
        .module('app')
        .filter('abbreviation', function(){
            return function(input){
                if(input === 'АВАРИЙНО-СПАСАТЕЛЬНЫЕ РАБОТЫ (АСР)'){
                    return 'АСР';
                } else {
                    return input;
                }
            };
        })
        .filter('viewedOrNot', function(){
            return function(input){
                if(input){
                    return 'ДА';
                } else {
                    return 'НЕТ';
                }
            };
        })


        //TODO: Рабочая версия строки быстрого набора техники 1
        .filter('groupEngineTypes', function(storage){
            return function(input){

                var types = input.filter(function(engType){
                    return !!engType.group;
                });
                types.forEach(function(type){

                    if(!!storage.enginesByTypes === true){
                        storage.enginesByTypes.find(function(engByTypes){
                            if(engByTypes.engineType === type.engineType){
                                type.countCanUse = engByTypes.countCanUse;
                                type.engineCount = engByTypes.engineCount;
                            }
                        });
                    }
                    if(!!storage.enginesAdvise === true){
                        storage.enginesAdvise.find(function(engAdvise){
                            if(engAdvise.engineType === type.engineType){
                                type.deptId = engAdvise.deptId;
                                type.deptName = engAdvise.deptName;
                                type.deptDist = engAdvise.deptDist;
                                type.fireActId = engAdvise.fireActId;
                            }
                        });
                    }


                });

                return types;
            };
        })
        .filter('trueOrNot', function(){
            return function(input){
                if(input){
                    return 'ДА';
                } else {
                    return 'НЕТ';
                }
            };
        })
        .filter('historicalNumFilter', function(){
            return function(inputArray){
                if(inputArray != undefined){
                    if(inputArray.length > 1){
                        var tmp = inputArray.slice();
                        tmp.pop();
                        var reversedWithoutLast = tmp.reverse();
                        var output = _.last(inputArray) + ' (';
                        for(var i = 0; i < reversedWithoutLast.length; i++){
                            output += reversedWithoutLast[i];
                            if(i != reversedWithoutLast.length - 1){
                                output += ','
                            }
                        }
                        output += ')';
                        return output;
                    } else {
                        return inputArray[0]
                    }
                }
            };
        })
        .filter('formatF6Edits', ['$filter', function($filter){
            return function(input){
                if(input != undefined){
                    if(input.id !== undefined){
                        return input.text;
                    }
                    if(angular.isString(input)){
                        return input;
                    }
                    if(angular.isNumber(input)){
                        if(input < 10000){
                            return input;
                        } else {
                            return $filter('date')(new Date(input), 'dd-MM-yy HH:mm:ss')
                        }
                    }
                }
                return input;
            };
        }])
        .filter('engineTypeDecorator', function(){
            return function(engineType, isFirstTank, isGD){

                if(engineType){
                    if(engineType.asGD){
                        if(isGD){
                            return 'АГ (' + engineType.engineType + ')';
                        }
                    }
                    if(engineType.isAC){
                        var str = engineType.engineType;
                        if(isFirstTank){
                            str += '(1)';
                        } else {
                            str += '(2)';
                        }
                        return str;
                    }
                    return (!!engineType.engineType === true)? engineType.engineType : (!!engineType === true)? engineType : '';
                }
            };
        })
        .filter('firePlaceFilter', function(){
            return function(firePlace){
                var output = '';
                if(firePlace != undefined){
                    if(firePlace.region != undefined){
                        if(firePlace.region.code === 1141){
                            output = firePlace.address.settName;
                        } else {
                            if(firePlace.address != null){
                                if(firePlace.address.street != null){
                                    output = firePlace.address.street;
                                    if(firePlace.address.house != null){
                                        output += " " + ((firePlace.address.manualHouse !== null) ? firePlace.address.manualHouse : firePlace.address.house);
                                    }
                                    if(firePlace.crossStreet != null){
                                        output += '\n' + firePlace.crossStreet.street;
                                    }
                                } else {
                                    output = firePlace.address.settName;
                                }
                            } else {
                                output = firePlace.region.text;
                            }
                        }
                    }
                }

                return output;
            };
        })
        .filter('textOf112nCardState', function(){
            return function(card112Bean){
                var output = '';
                if(card112Bean != undefined && card112Bean.nCardState != undefined){
                    switch(card112Bean.nCardState){
                        case "2":
                            output = 'поступила в ДДС';
                            break;
                        case "3":
                            output = 'подключены Силы и Средства (в работе)';
                            break;
                        case "4":
                            output = 'заполнена форма 6';
                            break;
                        case "5":
                            output = 'отработана';
                            break;
                        case "6":
                            output = 'просмотрена оператором';
                            break;
                        case "7":
                            output = 'отказ';
                            break;
                        case "8":
                            output = 'изменение КО информации';
                            break;
                        case "9":
                            output = 'изменение информации ЭС';
                            break;
                        case "10":
                            output = 'изменение карточки';
                            break;
                        default:
                            output = '??';
                            break;
                    }
                }
                return output;
            };
        })
        .filter('address112Filter', function(){
            return function(card112){
                var output = '';
                if(card112 != undefined){
                    if(card112.strAddressString != null){
                        output += card112.strAddressString;
                        if(card112.strBuilding != null){
                            output += ' ' + card112.strBuilding;
                            if(card112.strCorps != null && !!card112.strCorps){
                                output += ' к' + card112.strCorps;
                            }
                        }
                    }
                }

                return output;
            };
        })
        .filter('tripletFilter', function(){
            return function(triplet, firstDeptName){
                if(triplet != undefined){
                    if(firstDeptName != undefined){
                        if(triplet.dept1 === firstDeptName){
                            return triplet.dept1 + '-' + triplet.dept2 + '-' + triplet.dept3;
                        }
                        if(triplet.dept2 === firstDeptName){
                            return triplet.dept2 + '-' + triplet.dept1 + '-' + triplet.dept3;
                        }
                        if(triplet.dept3 === firstDeptName){
                            return triplet.dept3 + '-' + triplet.dept2 + '-' + triplet.dept1;
                        }
                    } else {
                        return triplet.dept1 + '-' + triplet.dept2 + '-' + triplet.dept3;
                    }
                }
            };
        })
        .filter('newOrNot', function(){
            return function(input){
                if(input){
                    return 'Изм';
                } else {
                    return 'Нов';
                }
            };
        })
        .filter('viewedByDecorator', function(){
            return function(input){
                if(input){
                    return '(' + input + ')';
                } else {
                    return '';
                }
            };
        })
        .filter('newOrderHousesFilter', ['$filter', function($filter){
            return function(addressesArray, string, currentAddress){
                if(addressesArray != undefined && currentAddress != undefined){
                    if(string != ''){
                        var fictiveAddress = _.find(addressesArray, function(house){
                            return house.naHouse === true;
                        });
/*
                        if(fictiveAddress === undefined){
                            fictiveAddress = {};
                            fictiveAddress.house = string;
                            if(fictiveAddress.district && !fictiveAddress.district.trim().length){
                                fictiveAddress.district = "***РУЧНОЙ ВВОД***";
                            } else if(currentAddress.district){
                                fictiveAddress.district = currentAddress.district;
                            }


                            fictiveAddress.naHouse = true;
                            fictiveAddress.naStreet = currentAddress.naStreet;
                            fictiveAddress.street = currentAddress.street;
                            fictiveAddress.settId = currentAddress.settId;
                            fictiveAddress.settName = "***РУЧНОЙ ВВОД***";
                            addressesArray.push(fictiveAddress);
                        } else {
                            fictiveAddress.house = string;
                        }
                        console.log(fictiveAddress);
*/
                    }

                    return $filter('filter')(addressesArray, function(address){
                        if(string.length > 0){
                            if(address.house != null){
                                return (address.house.indexOf(string) > -1)
                            } else {
                                return false;
                            }
                        } else {
                            return true
                        }
                    });
                }

            };

        }
        ])
        .filter('rankChangeFilter', ['$filter', function($filter){
            return function(ranks, changeUp, currentRank, searchString){
                var output = [];
                if(ranks != undefined && currentRank != undefined){
                    var ranksWithoutAutomatic = _.filter(ranks, function(rank){
                        // return !rank.namefirerank.includes('1-');
                        return rank.namefirerank;
                    });
                    var sortedRanksWithoutAutomatic = _.sortBy(ranksWithoutAutomatic, function(rank){
                        return rank.namefirerank;
                    });
                    if(currentRank.namefirerank.includes('1-')){
                        if(changeUp){
                            output = _.without(sortedRanksWithoutAutomatic, sortedRanksWithoutAutomatic[0]);
                        } else {
                            output.push(sortedRanksWithoutAutomatic[0]);
                        }
                    } else {
                        output = _.filter(sortedRanksWithoutAutomatic, function(rank){
                            if(changeUp){
                                return rank.namefirerank > currentRank.namefirerank
                            } else {
                                return rank.namefirerank < currentRank.namefirerank
                            }
                        })
                    }
                }
                return $filter('filter')(output, {sidfirerank: searchString});
            };
        }
        ])
        .filter('propsFilter', function(){
            return function(items, props){
                var out = [];
                if(angular.isArray(items)){
                    items.forEach(function(item){
                        var itemMatches = false;
                        var keys = Object.keys(props);
                        for(var i = 0; i < keys.length; i++){
                            var prop = keys[i];
                            var text = props[prop].toLowerCase();
                            if(item[prop].toString().toLowerCase().indexOf(text) !== -1){
                                itemMatches = true;
                                break;
                            }
                        }

                        if(itemMatches){
                            out.push(item);
                        }
                    });
                } else {
                    out = items;
                }
                return out;
            }
        })
        .filter('searchHolderInOpos', function(){
            return function(input, search){
                if(!input || !search) return input;
                const expected = ('' + search).toLowerCase();
                return input.filter(opo =>{
                    let flag = false;
                    for(let i = 0; i < opo.hydrantHolders.length; i++){
                        if(opo.hydrantHolders[i].ownerName.toLocaleLowerCase().indexOf(expected) + 1){
                            flag = true;
                            break;
                        }
                    }
                    return flag;
                });
            };
        })
        .filter('sortPCHList', function(){
            return function(v1, v2){
                var list = {
                    v1: parseInt(v1, 10),
                    v2: parseInt(v2, 10)
                };
                console.log(list.v1, '<>', list.v2)
                // if(v1.type !== 'string' || v2.type !== 'string'){
                if(!isNaN(list.v1) && !isNaN(list.v2)){
                    return (list.v1 - list.v2);
                    // return (list.v1 < list.v2) ? -1 : (list.v1 > list.v2) ? 1 : 0
                    // return (v1.index < v2.index) ? -1 : 1;
                }
                return list.v1.value.localeCompare(list.v2.value);
            };
        });


})
();


/*

 vm.sortPCHList = function(v1, v2){
 var list = {
 v1: parseInt(v1, 10),
 v2: parseInt(v2, 10)
 };
 // if(v1.type !== 'string' || v2.type !== 'string'){
 if(!isNaN(list.v1) && !isNaN(list.v2)){
 return (v1.index < v2.index) ? -1 : 1;
 }
 return v1.value.localeCompare(v2.value);
 };


 */
