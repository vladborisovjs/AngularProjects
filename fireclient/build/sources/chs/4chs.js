if(chsData !== undefined){

    var chsData4 = null;

//----------------------------------------------------------------------- Начало JSON
    chsData4 = {

        'chs4': {
            "Личный состав:": {
                "fieldname": "chs4_gr1",
                "code": "",
                "type": "group",
                "child": [{
                    "fieldname": "chs4_1",
                    "code": "1.",
                    "name": "Формирований ГЗ, чел.",
                    "type": "number"
                }, {
                    "fieldname" : "chs4_sep1",
                    "code": "",
                    "name": " из них:",
                    "type": "separator"
                }, {
                    "fieldname": "chs4_2",
                    "code": "2.а",
                    "name": "общего назначения",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs4_3",
                        "code": "",
                        "name": "наименование формирования",
                        "type": "text"
                    }, {
                        "fieldname": "chs4_4",
                        "code": "",
                        "name": "от кого",
                        "type": "text"
                    }, {
                        "fieldname": "chs4_5",
                        "code": "",
                        "name": "количество чел.",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs4_6",
                    "code": "3.б",
                    "name": "специального назначения",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs4_7",
                        "code": "",
                        "name": "наименование формирования",
                        "type": "text"
                    }, {
                        "fieldname": "chs4_8",
                        "code": "",
                        "name": "от кого",
                        "type": "text"
                    }, {
                        "fieldname": "chs4_9",
                        "code": "",
                        "name": "количество чел.",
                        "type": "number"
                    }
                    ]

                }, {
                    "fieldname" : "chs4_sep2",
                    "code": "",
                    "name": "В том числе:",
                    "type": "separator"
                }, {
                    "fieldname": "chs4_10",
                    "code": "4.",
                    "name": "разведки, наблюдения и лабораторного контроля",
                    "type": "number"
                }, {
                    "fieldname": "chs4_11",
                    "code": "5.",
                    "name": "медицинские",
                    "type": "number"
                }, {
                    "fieldname": "chs4_12",
                    "code": "6.",
                    "name": "пожарные",
                    "type": "number"
                }, {
                    "fieldname": "chs4_13",
                    "code": "7.",
                    "name": "инженерные",
                    "type": "number"
                }, {
                    "fieldname": "chs4_14",
                    "code": "8.",
                    "name": "другие специализированные формирования",
                    "type": "number"

                }, {
                    "fieldname": "chs4_15",
                    "code": "9.",
                    "name": "Соединения и воинские части Министерства обороны Республики Узбекистан",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs4_16",
                        "code": "",
                        "name": "номер воинской части",
                        "type": "text"
                    }, {
                        "fieldname": "chs4_17",
                        "code": "",
                        "name": "количество чел.",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs4_18",
                    "code": "10.",
                    "name": "Части и подразделения службы противопожарных и аварийно-спасательных работ",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs4_19",
                        "code": "",
                        "name": "наименование",
                        "type": "text"
                    }, {
                        "fieldname": "chs4_20",
                        "code": "",
                        "name": "количество чел.",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs4_21",
                    "code": "11.",
                    "name": "Воинские части внутренних войск",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs4_22",
                        "code": "",
                        "name": "номер воинской части",
                        "type": "text"
                    }, {
                        "fieldname": "chs4_23",
                        "code": "",
                        "name": "количество чел.",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs4_24",
                    "code": "12.",
                    "name": "Силы и средства других министерств и ведомств",
                    "type": "number"
                }
                ]
            },
            "Техника": {
                "fieldname": "chs4_gr2",
                "code": "",
                "type": "group",
                "child": [{
                    "fieldname": "chs4_25",
                    "code": "13.",
                    "name": "Формирований ГЗ, всего ед.",
                    "type": "number"
                }, {
                    "fieldname" : "chs4_sep3",
                    "code": "",
                    "name": "в том числе:",
                    "type": "separator"
                }, {
                    "fieldname": "chs4_26",
                    "code": "14.",
                    "name": "инженерная",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs4_27",
                        "code": "",
                        "name": "наименование",
                        "type": "text"
                    }, {
                        "fieldname": "chs4_28",
                        "code": "",
                        "name": "количество, ед.",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs4_29",
                    "code": "15.",
                    "name": "автомобильная",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs4_30",
                        "code": "",
                        "name": "наименование",
                        "type": "text"
                    }, {
                        "fieldname": "chs4_31",
                        "code": "",
                        "name": "количество, ед.",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs4_32",
                    "code": "16.",
                    "name": "специальная",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs4_33",
                        "code": "",
                        "name": "наименование",
                        "type": "text"
                    }, {
                        "fieldname": "chs4_34",
                        "code": "",
                        "name": "количество, ед.",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs4_35",
                    "code": "17.",
                    "name": "специализированных формирований",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs4_36",
                        "code": "",
                        "name": "наименование",
                        "type": "text"
                    }, {
                        "fieldname": "chs4_37",
                        "code": "",
                        "name": "количество, ед.",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs4_38",
                    "code": "18.",
                    "name": "Соединений и воинских частей Министерства Обороны Республики Узбекистан, всего, ед.",
                    "type": "number"
                }, {
                    "fieldname" : "chs4_sep4",
                    "code": "",
                    "name": "в том числе:",
                    "type": "separator"
                }, {
                    "fieldname": "chs4_39",
                    "code": "19.",
                    "name": "инженерная",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs4_40",
                        "code": "",
                        "name": "наименование",
                        "type": "text"
                    }, {
                        "fieldname": "chs4_41",
                        "code": "",
                        "name": "количество, ед.",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs4_42",
                    "code": "20.",
                    "name": "автомобильная",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs4_43",
                        "code": "",
                        "name": "наименование",
                        "type": "text"
                    }, {
                        "fieldname": "chs4_44",
                        "code": "",
                        "name": "количество, ед.",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs4_45",
                    "code": "21.",
                    "name": "специальная",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs4_46",
                        "code": "",
                        "name": "наименование",
                        "type": "text"
                    }, {
                        "fieldname": "chs4_47",
                        "code": "",
                        "name": "количество, ед.",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs4_48",
                    "code": "22.",
                    "name": "специализированных формирований",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs4_49",
                        "code": "",
                        "name": "наименование",
                        "type": "text"
                    }, {
                        "fieldname": "chs4_50",
                        "code": "",
                        "name": "количество, ед.",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs4_51",
                    "code": "23.",
                    "name": "МВД РУз, всего, ед.",
                    "type": "number"
                }, {
                    "fieldname" : "chs4_sep5",
                    "code": "",
                    "name": "в том числе:",
                    "type": "separator"
                }, {
                    "fieldname": "chs4_52",
                    "code": "24.",
                    "name": "инженерная",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs4_53",
                        "code": "",
                        "name": "наименование",
                        "type": "text"
                    }, {
                        "fieldname": "chs4_54",
                        "code": "",
                        "name": "количество, ед.",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs4_55",
                    "code": "25.",
                    "name": "автомобильная",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs4_56",
                        "code": "",
                        "name": "наименование",
                        "type": "text"
                    }, {
                        "fieldname": "chs4_57",
                        "code": "",
                        "name": "количество, ед.",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs4_58",
                    "code": "26.",
                    "name": "специальная",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs4_59",
                        "code": "",
                        "name": "наименование",
                        "type": "text"
                    }, {
                        "fieldname": "chs4_60",
                        "code": "",
                        "name": "количество, ед.",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs4_61",
                    "code": "27.",
                    "name": "специализированных формирований",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs4_62",
                        "code": "",
                        "name": "наименование",
                        "type": "text"
                    }, {
                        "fieldname": "chs4_63",
                        "code": "",
                        "name": "количество, ед.",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs4_64",
                    "code": "28.",
                    "name": "Других министерств и ведомств",
                    "type": "text"
                }, {
                    "fieldname": "chs4_65",
                    "code": "29.",
                    "name": "Дополнительная текстовая информация",
                    "type": "textarea"
                }, {
                    "fieldname" : "chs4_sep6",
                    "code": "",
                    "name": "Потребность в дополнительных силах и средствах (указать по принадлежности)",
                    "type": "separator"
                }, {
                    "fieldname": "chs4_66",
                    "code": "30.",
                    "name": "Всего чел.",
                    "type": "number"
                }, {
                    "fieldname": "chs4_67",
                    "code": "31.",
                    "name": "Техники всего, ед.",
                    "type": "number"
                }, {
                    "fieldname" : "chs4_sep7",
                    "code": "",
                    "name": "в том числе:",
                    "type": "separator"
                }, {
                    "fieldname": "chs4_68",
                    "code": "",
                    "name": "инженерная",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs4_69",
                        "code": "",
                        "name": "наименование",
                        "type": "text"
                    }, {
                        "fieldname": "chs4_70",
                        "code": "",
                        "name": "количество, ед.",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs4_71",
                    "code": "",
                    "name": "автомобильная",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs4_72",
                        "code": "",
                        "name": "наименование",
                        "type": "text"
                    }, {
                        "fieldname": "chs4_73",
                        "code": "",
                        "name": "количество, ед.",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs4_74",
                    "code": "",
                    "name": "специальная",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs4_75",
                        "code": "",
                        "name": "наименование",
                        "type": "text"
                    }, {
                        "fieldname": "chs4_76",
                        "code": "",
                        "name": "количество, ед.",
                        "type": "number"
                    }
                    ]
                }

                ]
            }
        }
    };
//-----------------------------------------------------------------------

    chsData = Object.assign(chsData, chsData4);

}
