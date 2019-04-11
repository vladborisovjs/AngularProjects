(function () {
    'use strict';
    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', 'growlProvider', '$compileProvider', '$logProvider', appConfig]);

    function appConfig($stateProvider, $urlRouterProvider, growlProvider, $compileProvider, $logProvider) {

        const productionMode = false;
        if (productionMode) {
            $compileProvider.debugInfoEnabled(false);
            $logProvider.debugEnabled(false);
        }

        growlProvider.onlyUniqueMessages(false);
        growlProvider.globalTimeToLive({
            success: 5000,
            error: -1,
            warning: 5000,
            info: 5000
        });
        growlProvider.globalDisableCountDown(true);

        $stateProvider
            .state('login', {
                url: '/',
                templateUrl: 'sources/auth/login.html',
                controller: 'LoginPageCtrl',
                controllerAs: 'loginPageCtrl',
                onEnter: function () {
                    // console.log("Login entered");
                }
            })
            .state('changePassword', {
                url: '/changepass',
                templateUrl: 'sources/auth/changepassword.html',
                controller: 'ChangePassPageCtrl',
                controllerAs: 'changePassPageCtrl',
                onEnter: function () {
                    console.log("ChangePass entered");
                }
            })
/*
            .state('parking', {
                url: '/parking',
                templateUrl: 'sources/auth/parking.html',
                controller: 'ParkingCtrl',
                controllerAs: 'parkingCtrl',
                onEnter: function () {
                    // console.log("parking entered");
                }
            })
            .state('reconnect', {
                url: '/reconnect',
                templateUrl: 'sources/auth/parking.reconnect.html',
                onEnter: function () {
                    // console.log("parking.reconnect entered");
                }
            })
*/
            .state('fires', {
                url: '/fires?fireId&deptId&fireType&engineId&paramState&additionalType&calledFrom&scrollTo',
                abstract: true,
                templateUrl: 'sources/firesroot/fires.html',
                controller: 'Fires',
                controllerAs: 'fires'
            })
            .state('fires.firesbase', {
                url: '/firebase',
                views: {
                    'command': {
                        templateUrl: 'sources/firesroot/command/command.html',
                        controller: 'Commands',
                        controllerAs: 'command'
                    },
                    'content': {
                        templateUrl: 'sources/firesroot/content/firesbase/firebase.html',
                        controller: 'FireBase',
                        controllerAs: 'fireBase'
                    }
                }
            })
            .state('fires.archive', {
                url: '/archive?dateFrom&dateTo',
                views: {
                    'command': {
                        templateUrl: 'sources/firesroot/command/archiveCommand.html',
                        controller: 'ArchiveCommand',
                        controllerAs: 'command'
                    },
                    'content': {
                        templateUrl: 'sources/firesroot/content/archive/archive.html',
                        controller: 'Archive',
                        controllerAs: 'archive'
                    }
                }
            })
            .state('fires.chooseTech', {
                url: '/chooseTech',
                views: {
                    'command': {
                        templateUrl: 'sources/firesroot/command/command.html',
                        controller: 'Commands',
                        controllerAs: 'command'
                    },
                    'content': {
                        templateUrl: 'sources/firesroot/content/chooseTech/chooseTech.html',
                        controller: 'ChooseTech',
                        controllerAs: 'chooseTech'
                    }

                }
            })
            .state('fires.chooseTech.bydept', {
                url: '/bydept',
                //reloadOnSearch: false,
                views: {
                    'deptsmain': {
                        templateUrl: 'sources/firesroot/content/chooseTech/bydept/bydept.html',
                        controller: 'BydeptTech',
                        controllerAs: 'bydeptTech'
                    }

                }
            })
            .state('fires.chooseTech.byStatus', {
                url: '/bystates',
                //reloadOnSearch: false,
                views: {
                    'deptsmain': {
                        templateUrl: 'sources/firesroot/content/chooseTech/bystates/bystatus.html',
                        controller: 'ByState',
                        controllerAs: 'byState'
                    }

                }
            })
            .state('fires.chooseTech.bytypes', {
                url: '/bytypes',
                views: {
                    'deptsmain': {
                        templateUrl: 'sources/firesroot/content/chooseTech/bytypes/bytypes.html',
                        controller: 'Bytypes',
                        controllerAs: 'bytypes'
                    }

                }
            })
            .state('fires.chooseTech.engineStatesHistory', {
                url: '/engineStatesHistory',
                views: {
                    'deptsmain': {
                        templateUrl: 'sources/firesroot/content/chooseTech/engineStatesHistory/engineStatesHistory.html',
                        controller: 'EngineHistory',
                        controllerAs: 'history'
                    }

                }
            })



            .state('fires.docs', {
                url: '/docs',
                views: {
                    'command': {
                        templateUrl: 'sources/firesroot/command/docCommand.html',
                        controller: 'DocCommand',
                        controllerAs: 'command'
                    },
                    'content': {
                        templateUrl: 'sources/firesroot/content/docs/docs.html',
                        controller: 'Docs',
                        controllerAs: 'docsCtrl'
                    }
                }
            })
            .state('fires.requestReports' , {
                url: '/requestCommand',
                views: {
                    'command': {
                        templateUrl: 'sources/firesroot/command/requestCommand.html',
                        controller: 'Reqc',
                        controllerAs: 'reqCom'
                    },
                    'content': {
                        templateUrl: 'sources/firesroot/content/requestReports/requestReports.html',
                        controller: 'Docs',
                        controllerAs: 'docsCtrl'
                    }
                }
            })



            .state('fires.forma', {
                url: '/forma',
                views: {
                    'command': {
                        templateUrl: 'sources/firesroot/command/protocolForF6.html',
                        controller: 'FormaProtocolCtrl',
                        controllerAs: 'command'
                    },
                    'content': {
                        templateUrl: 'sources/firesroot/content/forma/forma.html',
                        controller: 'Forma',
                        controllerAs: 'forma'
                    }

                }
            })
            .state('fires.formaedit', {
                url: '/formaedit',
                views: {
                    'command': {
                        templateUrl: 'sources/firesroot/command/formsFiltersCommand.html',
                        controller: 'FormsFilterCommand',
                        controllerAs: 'command'
                    },
                    'content': {
                        templateUrl: 'sources/firesroot/content/formaedit/formaedit.html',
                        controller: 'Formaedit',
                        controllerAs: 'formaedit'
                    }
                }
            })
            .state('fires.fireCards', {
                url: '/firecards',
                views: {
                    'command': {
                        templateUrl: 'sources/firesroot/command/formsFiltersCommand.html',
                        controller: 'FormsFilterCommand',
                        controllerAs: 'command'
                    },
                    'content': {
                        templateUrl: 'sources/firesroot/content/fireCards/fireCards.html',
                        controller: 'FireCards',
                        controllerAs: 'formaedit'
                    }
                }
            })






            .state('fires.newFireCard', {
                url: '/fireCard',
                views: {
                    'command': {
                        templateUrl: 'sources/firesroot/command/command.html',
                        controller: 'Commands',
                        controllerAs: 'command'
                    },
                    'content': {
                        templateUrl: 'sources/firesroot/content/newFireCard/newFireCard.html',
                        controller: 'NewFireCard',
                        controllerAs: 'newFireCard'
                    }

                }
            })



/*

            .state('fires.newFireOrder', {
                url: '/newfire',
                views: {
                    'command': {
                        templateUrl: 'sources/firesroot/command/command.html',
                        controller: 'Commands',
                        controllerAs: 'command'
                    },
                    'content': {
                        templateUrl: 'sources/firesroot/content/newFireOrder/newFireOrder.html',
                        controller: 'NewFireOrder',
                        controllerAs: 'newFireOrder'
                    }

                }
            })
            .state('fires.orderEdit', {
                url: '/editfire',
                views: {
                    'command': {
                        templateUrl: 'sources/firesroot/command/command.html',
                        controller: 'Commands',
                        controllerAs: 'command'
                    },
                    'content': {
                        templateUrl: 'sources/firesroot/content/orderEdit/orderEdit.html',
                        controller: 'OrderEdit',
                        controllerAs: 'orderEdit'
                    }

                }
            })
            .state('fires.order', {
                url: '/order',
                views: {
                    'command': {
                        templateUrl: 'sources/firesroot/command/command.html',
                        controller: 'Commands',
                        controllerAs: 'command'
                    },
                    'content': {
                        templateUrl: 'sources/firesroot/content/order/order.html',
                        controller: 'Order',
                        controllerAs: 'order'
                    }

                }
            })

*/



            .state('fires.card112', {
                url: '/card112',
                views: {
                    'command': {
                        templateUrl: 'sources/firesroot/command/command.html',
                        controller: 'Commands',
                        controllerAs: 'command'
                    },
                    'content': {
                        templateUrl: 'sources/firesroot/content/card112/card112.html',
                        controller: 'Card112',
                        controllerAs: 'card112'
                    }
                }
            })
            .state('fires.protocol', {
                url: '/protocol',
                views: {
                    'command': {
                        templateUrl: 'sources/firesroot/command/command.html',
                        controller: 'Commands',
                        controllerAs: 'command'
                    },
                    'content': {
                        templateUrl: 'sources/firesroot/content/protocol/protocol.html',
                        controller: 'Protocol',
                        controllerAs: 'protocol'
                    }

                }
            })
            .state('fires.bridges', {
                url: '/bridges',
                views: {
                    'content': {
                        templateUrl: 'sources/firesroot/content/bridges/bridges.html',
                        controller: 'BridgesCtrl',
                        controllerAs: 'bridgesCtrl'
                    }

                }
            })




            .state('fires.deptsNotes', {
                url: '/deptsNotes',
                views: {
/*
                    'command': {
                        templateUrl: 'sources/firesroot/command/command.html',
                        controller: 'Commands',
                        controllerAs: 'command'
                    },
*/
                    'content': {
                        templateUrl: 'sources/firesroot/content/deptsNoteNew/deptsNoteParent.html',
                        controller: 'DeptsNotes',
                        controllerAs: 'deptsNotes'
                    }

                }
            })
            .state('fires.deptsNotes.bydept', {
                url: '/bydepts',
                views: {
                    'deptmain': {
                        templateUrl: 'sources/firesroot/content/deptsNoteNew/bydept/bydept.html',
                        controller: 'Bydepts',
                        controllerAs: 'bydepts'
                    }

                }
            })








/*


            .state('fires.deptsNote', {
                url: '/deptsNote',
                views: {
                    'command': {
                        templateUrl: 'sources/firesroot/command/command.html',
                        controller: 'Commands',
                        controllerAs: 'command'
                    },
                    'content': {
                        templateUrl: 'sources/firesroot/content/deptsNoteParent/deptsNoteParent.html',
                        controller: 'DeptsNote',
                        controllerAs: 'deptsNote'
                    }

                }
            })
            .state('fires.deptsNote.bydept', {
                url: '/bydept',
                views: {
                    'deptsmain': {
                        templateUrl: 'sources/firesroot/content/deptsNoteParent/bydept/bydept.html',
                        controller: 'Bydept',
                        controllerAs: 'bydept'
                    }

                }
            })
            .state('fires.deptsNote.garrison', {
                url: '/garrison',
                views: {
                    'deptsmain': {
                        templateUrl: 'sources/firesroot/content/deptsNoteParent/garrison/garrison.html',
                        controller: 'Garrison',
                        controllerAs: 'garrison'
                    }
                }
            })
            .state('fires.deptsNote.asoGarrison', {
                url: '/asogarrison',
                views: {
                    'deptsmain': {
                        templateUrl: 'sources/firesroot/content/deptsNoteParent/aso/asogarrison.html',
                        controller: 'AsoGarrison',
                        controllerAs: 'asoGar'
                    }
                }
            })
            .state('fires.deptsNote.protocol', {
                url: '/notesprotocol',
                views: {
                    'deptsmain': {
                        templateUrl: 'sources/firesroot/content/deptsNoteParent/protocol/notesProtocolCtrl.html',
                        controller: 'NotesProtocol',
                        controllerAs: 'deptProtocol'
                    }
                }
            })
            .state('fires.deptsNote.headCaraul', {
                url: '/headCaraul',
                views: {
                    'deptsmain': {
                        templateUrl: 'sources/firesroot/content/deptsNoteParent/headCaraulCrew/headCaraul.html',
                        controller: 'HeadCaraul',
                        controllerAs: 'headCaraul'
                    }
                }
            })

*/





            .state('fires.opo', {
                url: '/opo',
                views: {
                    'content': {
                        templateUrl: 'sources/firesroot/content/opo/opo.html',
                        controller: 'OpoCtrl',
                        controllerAs: 'opoCtrl',
                    }

                }
            })
            .state('fires.opo.item', {
                url: '/:id',
                views: {
                    'item@fires.opo': {
                        templateUrl: 'sources/firesroot/content/opo/opo-item/opo-item.html',
                        controller: 'OpoItemController',
                        controllerAs: 'opoItemCtrl',
                    }
                },
                resolve: {
                    'opo': ['storage', '$stateParams', '$q', function (storage, $stateParams, $q) {
                        if ($stateParams.id !== 'new') {
                            const item = storage.opo.find(item => item.id === $stateParams.id);
                            if (item) {
                                return angular.copy(item);
                            }
                            return $q.reject('there is no opo with such id');
                        }
                        else {
                            return {
                                hydrantHolders: []
                            };
                        }
                    }]
                }
            })
            .state('fires.hydrants', {
                url: '/hydrants',
                views: {
                    'content': {
                        templateUrl: 'sources/firesroot/content/hydrants/hydrants.html',
                        controller: 'HydrantsCtrl',
                        controllerAs: 'hydrants',
                    }

                },
                onEnter: function () {
                    // console.log("opo entered");
                }
            })


            .state('admin', {
                url: '/admin',
                abstract: true,
                templateUrl: 'sources/admin/admin.html',
                controller: 'Admin',
                controllerAs: 'admin'
            })
            .state('admin.base', {
                url: '/base',
                views: {
                    'command': {
                        templateUrl: 'sources/admin/command/admin.command.html',
                        controller: 'AdminCommands',
                        controllerAs: 'adminCommands'
                    },
                    'content': {
                        templateUrl: 'sources/admin/base/admin.base.html',
                        controller: 'AdminBase',
                        controllerAs: 'adminBase'
                    }
                }
            });

        $urlRouterProvider.otherwise("/");


    }
})();
