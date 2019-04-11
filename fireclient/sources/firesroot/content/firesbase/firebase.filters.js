(function(){

    'use strict';
    angular
        .module('app.firebase')
        .filter('activeFiresSort', function activeFiresSortFilter(){
            return function(array){

                function sortFires(a, b){
                    // return (a.startDate > b.startDate)? -1 : 1;
                    if(!!a.startDate === true){
                        return b.startDate - a.startDate;
                    } else {
                        return b.createDate - a.createDate;
                    }
                };

                var splitSort = {
                    center: {
                        date: [],
                        f6: [],
                        tmp: []
                    },
                    region: {
                        date: [],
                        f6: [],
                        tmp: []
                    }
                };

                var terra = 'center';


                array.forEach(function(elem){

                    terra = (!!elem.firePlace.address === true && elem.firePlace.address.code == 141)? 'center' : 'region';

                    if(!!elem.firePlace === true){
                        if(!!elem.startDate === true){
                            if(!!elem.isReadyForF6 === false){
                                splitSort[terra].date.push(elem);
                            }
                        } else {
                            splitSort[terra].tmp.push(elem);
                        }

                        if(!!elem.isReadyForF6 === true){
                            splitSort[terra].f6.push(elem);
                        }

                    }
                });


                for(var i in splitSort){
                    if(splitSort.hasOwnProperty(i)){

                        Object.entries(splitSort[i]).forEach(function(ent){
                            ent[1].sort(function(a, b){
                                return sortFires(a, b);
                            });
                        });
                    }

                }


                return splitSort['center'].date.concat(splitSort['center'].f6, splitSort['center'].tmp, splitSort['region'].date.concat(splitSort['region'].f6, splitSort['region'].tmp));


                // return splitSort.date.concat(splitSort.f6, splitSort.tmp);

                /*
                 array.sort((a, b) => {
                 var isReady = a.isReadyForF6 - b.isReadyForF6;
                 if (a.startDate && b.startDate) {
                 var dateDiffer = b.startDate - a.startDate;
                 return isReady || dateDiffer;
                 }
                 else if (!a.startDate && !b.startDate) {
                 return isReady || 0;
                 }
                 else {
                 return a.startDate ? -1 : 1;
                 }
                 });
                 */


                // return array;
            };
        })
})();
