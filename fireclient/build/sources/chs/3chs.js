if(chsData !== undefined){

    var chsData3 = null;

//----------------------------------------------------------------------- Начало JSON
    chsData3 = {
        'chs3': {
            "Общие данные": {
                "fieldname": "chs3_gr1",
                "code": "",
                "type": "group",
                "child": [{
                    "fieldname": "chs3_1",
                    "code": "1.",
                    "name": "Наименование объектов экономики и населенных пунктов в зоне ЧС",
                    "type": "textarea"
                }, {
                    "fieldname": "chs3_2",
                    "code": "2.",
                    "name": "Общая площадь зоны ЧС, кв. км",
                    "type": "number"
                }
                ]
            },
            "Население": {
                "fieldname": "chs3_gr2",
                "code": "",
                "type": "group",
                "child": [{
                    "fieldname": "chs3_3",
                    "code": "3.",
                    "name": "Всего в зоне ЧС, чел.",
                    "type": "number"
                }, {
                    "fieldname" : "chs3_sep1",
                    "code": "",
                    "name": "в том числе:",
                    "type": "separator"
                }, {
                    "fieldname": "chs3_4",
                    "code": "4.",
                    "name": "взрослые, чел.",
                    "type": "number"
                }, {
                    "fieldname": "chs3_5",
                    "code": "5.",
                    "name": "дети, чел.",
                    "type": "number",
                    "check": "4-6 "
                }, {
                    "fieldname" : "chs3_sep2",
                    "code": "",
                    "name": "",
                    "type": "separator"
                }, {
                    "fieldname": "chs3_6",
                    "code": "6.",
                    "name": "Безвозвратные, всего, чел.",
                    "type": "number"
                }, {
                    "fieldname" : "chs3_sep3",
                    "code": "",
                    "name": "в том числе:",
                    "type": "separator"
                }, {
                    "fieldname": "chs3_7",
                    "code": "7.",
                    "name": "взрослые, чел.",
                    "type": "number"
                }, {
                    "fieldname": "chs3_8",
                    "code": "8.",
                    "name": "дети, чел.",
                    "type": "number",
                    "check": "8-10 "
                }, {
                    "fieldname" : "chs3_sep4",
                    "code": "",
                    "name": "",
                    "type": "separator"
                }, {
                    "fieldname": "chs3_9",
                    "code": "9.",
                    "name": "Санитарные, всего чел.",
                    "type": "number"
                }, {
                    "fieldname" : "chs3_sep5",
                    "code": "",
                    "name": "в том числе:",
                    "type": "separator"
                }, {
                    "fieldname": "chs3_10",
                    "code": "10.",
                    "name": "взрослые, чел.",
                    "type": "number"
                }, {
                    "fieldname": "chs3_11",
                    "code": "11.",
                    "name": "дети, чел.",
                    "type": "number",
                    "check": "12-14 "
                }, {
                    "fieldname" : "chs3_sep6",
                    "code": "",
                    "name": "",
                    "type": "separator"
                }, {
                    "fieldname": "chs3_12",
                    "code": "12.",
                    "name": "Дополнительная текстовая информация",
                    "type": "textarea"
                }, {
                    "fieldname": "chs3_13",
                    "code": "13.",
                    "name": "Выявлено в ходе спасательных работ, чел.",
                    "type": "number"
                }, {
                    "fieldname": "chs3_14",
                    "code": "14.",
                    "name": "В том числе детей, чел.",
                    "type": "number",
                    "check": "<=17 "
                }, {
                    "fieldname": "chs3_15",
                    "code": "15.",
                    "name": "Пропало без вести, чел.",
                    "type": "number"
                }, {
                    "fieldname": "chs3_16",
                    "code": "16.",
                    "name": "Дополнительная текстовая информация",
                    "type": "textarea"
                }
                ]
            },
            "Проведенные работы": {
                "fieldname": "chs3_gr3",
                "code": "",
                "type": "group",
                "child": [{
                    "fieldname": "chs3_17",
                    "code": "17.",
                    "name": "Оказана первая медицинская помощь на месте ЧС, чел.",
                    "type": "number"
                }, {
                    "fieldname": "chs3_18",
                    "code": "18.",
                    "name": "Оказана квалифицированная медицинская помощь на месте ЧС, чел.",
                    "type": "number"
                }, {
                    "fieldname": "chs3_19",
                    "code": "19.",
                    "name": "Госпитализировано, чел.",
                    "type": "number"
                }, {
                    "fieldname": "chs3_20",
                    "code": "20.",
                    "name": "Проведено прививок.",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs3_21",
                        "code": "",
                        "name": "Наименование",
                        "type": "text"
                    }, {
                        "fieldname": "chs3_22",
                        "code": "",
                        "name": "Количество, чел.",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs3_23",
                    "code": "21.",
                    "name": "Выдано препаратов",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs3_24",
                        "code": "",
                        "name": "Наименование",
                        "type": "text"
                    }, {
                        "fieldname": "chs3_25",
                        "code": "",
                        "name": "Количество, шт",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs3_26",
                    "code": "22.",
                    "name": "Выдано комплектов медицинских средств индивидуальной защиты и средств защиты органов дыхания",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs3_27",
                        "code": "",
                        "name": "Наименование",
                        "type": "text"
                    }, {
                        "fieldname": "chs3_28",
                        "code": "",
                        "name": "Количество, ед.",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs3_29",
                    "code": "23.",
                    "name": "Проведена санитарная обработка, чел.",
                    "type": "number"
                }, {
                    "fieldname": "chs3_30",
                    "code": "24.",
                    "name": "Извлечено из-под завалов, чел.",
                    "type": "number"
                }, {
                    "fieldname": "chs3_31",
                    "code": "25.",
                    "name": "Эвакуировано из зон ЧС, всего, чел.",
                    "type": "number"
                }, {
                    "fieldname" : "chs3_sep7",
                    "code": "",
                    "name": "в том числе:",
                    "type": "separator"
                }, {
                    "fieldname": "chs3_32",
                    "code": "26.",
                    "name": "женщин, детей",
                    "type": "number",
                    "check": "<=36 "

                }, {
                    "fieldname": "chs3_33",
                    "code": "27.",
                    "name": "Время начала эвакуации (дата)",
                    "type": "datetime"
                }, {
                    "fieldname": "chs3_34",
                    "code": "28.",
                    "name": "Время окончания эвакуации (дата)",
                    "type": "datetime"
                }, {
                    "fieldname": "chs3_35",
                    "code": "29.",
                    "name": "Количество транспортных средств, привлекаемых к эвакуации населения, всего, ед.",
                    "type": "number",
                    "check": ".=43+44+45+46 "
                }, {
                    "fieldname" : "chs3_sep8",
                    "code": "",
                    "name": "В том числе:",
                    "type": "separator"
                }, {
                    "fieldname": "chs3_36",
                    "code": "30.",
                    "name": "железнодорожных вагонов , ед.",
                    "type": "number"
                }, {
                    "fieldname": "chs3_37",
                    "code": "31.",
                    "name": "автомобильного транспорта, ед.",
                    "type": "number"
                }, {
                    "fieldname": "chs3_38",
                    "code": "32.",
                    "name": "речного (морского) транспорта, ед.",
                    "type": "number"
                }, {
                    "fieldname": "chs3_39",
                    "code": "33.",
                    "name": "авиационного транспорта, ед.",
                    "type": "number"
                }, {
                    "fieldname" : "chs3_sep9",
                    "code": "",
                    "name": "",
                    "type": "separator"
                }, {
                    "fieldname": "chs3_40",
                    "code": "34.",
                    "name": "Дополнительная текстовая информация",
                    "type": "textarea"
                }, {
                    "fieldname": "chs3_41",
                    "code": "35.",
                    "name": "Население пункты (районы) размещения пострадавших",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs3_42",
                        "code": "",
                        "name": "Наименование",
                        "type": "text"
                    }
                    ]
                }, {
                    "fieldname": "chs3_43",
                    "code": "36.",
                    "name": "Установленные режимы защиты",
                    "type": "text"
                }
                ]
            },
            "Сельскохозяйственные животные": {
                "fieldname": "chs3_gr4",
                "code": "",
                "type": "group",
                "child": [{
                    "fieldname": "chs3_44",
                    "code": "37.",
                    "name": "Выявлено заболевших, всего, тыс. голов",
                    "type": "number"
                }, {
                    "fieldname": "chs3_45",
                    "code": "38.",
                    "name": "В том числе по видам, тыс. голов",
                    "type": "text"
                }, {
                    "fieldname": "chs3_46",
                    "code": "39.",
                    "name": "Из них забито, тыс. голов",
                    "type": "number",
                    "check": "<=52 "
                }, {
                    "fieldname": "chs3_47",
                    "code": "40.",
                    "name": "Захоронено, тыс. голов",
                    "type": "number",
                    "check": "<=52 "
                }, {
                    "fieldname": "chs3_48",
                    "code": "41.",
                    "name": "Оказана ветеринарная помощь, тыс. голов",
                    "type": "number"
                }, {
                    "fieldname": "chs3_49",
                    "code": "42.",
                    "name": "Эвакуировано из опасных зон, тыс. голов",
                    "type": "number"
                }, {
                    "fieldname": "chs3_50",
                    "code": "43.",
                    "name": "Дополнительная текстовая информация",
                    "type": "textarea"
                }
                ]
            },
            "Сельскохозяйственные угодья, лесные насаждения": {
                "fieldname": "chs3_gr5",
                "code": "",
                "type": "group",
                "child": [{
                    "fieldname": "chs3_51",
                    "code": "44.",
                    "name": "Обработано зараженных с/х культур (мест скопления вредителей), тыс. га",
                    "type": "number"
                }, {
                    "fieldname": "chs3_52",
                    "code": "45.",
                    "name": "Затраты на ликвидацию последствий, тыс. руб.",
                    "type": "number"
                }, {
                    "fieldname": "chs3_53",
                    "code": "46.",
                    "name": "Выплаты компенсаций за причиненный ущерб, тыс. руб.",
                    "type": "number"
                }, {
                    "fieldname": "chs3_54",
                    "code": "47.",
                    "name": "Выплаты по социальному страхованию, тыс. руб.",
                    "type": "number"
                }, {
                    "fieldname": "chs3_55",
                    "code": "48.",
                    "name": "Дополнительная текстовая информация",
                    "type": "textarea"
                }, {
                    "fieldname": "chs3_56",
                    "code": "49.",
                    "name": "Эвакуировано материальных ценностей",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs3_57",
                        "code": "",
                        "name": "Наименование",
                        "type": "text"
                    }, {
                        "fieldname": "chs3_58",
                        "code": "",
                        "name": "Стоимость",
                        "type": "text"
                    }, {
                        "fieldname": "chs3_59",
                        "code": "",
                        "name": "Количество",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs3_60",
                    "code": "50.",
                    "name": "Дополнительная текстовая информация",
                    "type": "textarea"
                }, {
                    "fieldname": "chs3_61",
                    "code": "51.",
                    "name": "Локализовано источников (очагов) ЧС",
                    "type": "text"
                }, {
                    "fieldname": "chs3_62",
                    "code": "52.",
                    "name": "Обрушено зданий и сооружений, ед.",
                    "type": "number"
                }, {
                    "fieldname": "chs3_63",
                    "code": "53.",
                    "name": "Разработано завалов, куб.м",
                    "type": "number"
                }, {
                    "fieldname": "chs3_64",
                    "code": "54.",
                    "name": "Расчищено путей сообщения (железных дорог, автодорог, улиц и других путей сообщения)",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs3_65",
                        "code": "",
                        "name": "Наименование",
                        "type": "text"
                    }, {
                        "fieldname": "chs3_66",
                        "code": "",
                        "name": "Количество, км",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs3_67",
                    "code": "55.",
                    "name": "Восстановлены коммуникации",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs3_68",
                        "code": "",
                        "name": "Наименование",
                        "type": "text"
                    }
                    ]
                }, {
                    "fieldname": "chs3_69",
                    "code": "56.",
                    "name": "Установлен карантин",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs3_70",
                        "code": "",
                        "name": "Площадь",
                        "type": "text"
                    }, {
                        "fieldname": "chs3_71",
                        "code": "",
                        "name": "Наименование",
                        "type": "text"
                    }, {
                        "fieldname": "chs3_72",
                        "code": "",
                        "name": "Количество населенных пунктов",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs3_73",
                    "code": "57.",
                    "name": "Организованы карантинные посты",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs3_74",
                        "code": "",
                        "name": "Место",
                        "type": "text"
                    }, {
                        "fieldname": "chs3_75",
                        "code": "",
                        "name": "Количество",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs3_76",
                    "code": "58.",
                    "name": "Организована обсервация",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs3_77",
                        "code": "",
                        "name": "Место",
                        "type": "text"
                    }, {
                        "fieldname": "chs3_78",
                        "code": "",
                        "name": "Количество людей в обсервации",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs3_79",
                    "code": "59.",
                    "name": "Отремонтировано и восстановлено (ж/д путей, автодорог, мостов, гидротехнических сооружений)",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs3_80",
                        "code": "",
                        "name": "Наименование",
                        "type": "text"
                    }, {
                        "fieldname": "chs3_81",
                        "code": "",
                        "name": "Количество",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs3_82",
                    "code": "60.",
                    "name": "Дезактивировано, дегазировано, дезинфицировано (местность, здания, сооружения, техника, вид и количество используемого вещества)",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs3_83",
                        "code": "",
                        "name": "Наименование (местности, здания, сооружения, техники)",
                        "type": "text"
                    }, {
                        "fieldname": "chs3_84",
                        "code": "",
                        "name": "Вид используемого вещества",
                        "type": "text"
                    }, {
                        "fieldname": "chs3_85",
                        "code": "",
                        "name": "Количество используемого вещества",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs3_86",
                    "code": "61.",
                    "name": "Дополнительная текстовая информация",
                    "type": "textarea"
                }
                ]
            },
            "ЧС, связанные с нефтепродуктами": {
                "fieldname": "chs3_gr6",
                "code": "",
                "type": "group",
                "child": [{
                    "fieldname": "chs3_87",
                    "code": "62.",
                    "name": "Количество и марки разлитых нефтепродуктов, толщина слоя",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs3_88",
                        "code": "",
                        "name": "Количество",
                        "type": "number"
                    }, {
                        "fieldname": "chs3_89",
                        "code": "",
                        "name": "Марка",
                        "type": "text"
                    }, {
                        "fieldname": "chs3_90",
                        "code": "",
                        "name": "Толщина слоя",
                        "type": "number"
                    }
                    ]
                }, {
                    "fieldname": "chs3_91",
                    "code": "63.",
                    "name": "Скорость и направление дрейфа пятна нефтепродуктов (река, канал, озеро)",
                    "type": "extgroup",
                    "child": [{
                        "fieldname": "chs3_92",
                        "code": "",
                        "name": "Скорость",
                        "type": "number"
                    }, {
                        "fieldname": "chs3_93",
                        "code": "",
                        "name": "Направление",
                        "type": "text"
                    }
                    ]
                }, {
                    "fieldname": "chs3_94",
                    "code": "64.",
                    "name": "Какая угроза загрязнение ценных береговых (заповедных) зон",
                    "type": "textarea"
                }, {
                    "fieldname": "chs3_95",
                    "code": "65.",
                    "name": "Возможен ли сбор нефти механическим путем",
                    "type": "text"
                }, {
                    "fieldname": "chs3_96",
                    "code": "66.",
                    "name": "Возможно ли, нефть обработать сортированием",
                    "type": "text"
                }, {
                    "fieldname": "chs3_97",
                    "code": "67.",
                    "name": "Какие дополнительные силы могут потребоваться для сбора нефтепродуктов",
                    "type": "textarea"
                }, {
                    "fieldname": "chs3_98",
                    "code": "68.",
                    "name": "Какие меры принимаются для сбора нефтепродуктов по берегу",
                    "type": "textarea"
                }, {
                    "fieldname": "chs3_99",
                    "code": "69.",
                    "name": "Дополнительная текстовая информация",
                    "type": "textarea"
                }
                ]
            }
        }
    };
//-----------------------------------------------------------------------

    chsData = Object.assign(chsData, chsData3);

}
