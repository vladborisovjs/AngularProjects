if(chsData !== undefined){

    var fireData = null;

//----------------------------------------------------------------------- Начало JSON
    fireData = {
        "fire": {

            "ОБЩИЕ СВЕДЕНИЯ": {

                "fieldname": "fire_gr1",
                "code": "I  .",
                "type": "group",
                "child": [{
                    "fieldname": "fire_1",
                    "code": "1.",
                    "name": "Регион",
                    "type": "text"
                }, {
                    "fieldname": "fire_2",
                    "code": "2",
                    "name": "Код органа (района, населенного пункта) - составителя карточки",
                    "type": "text"
                }, {
                    "fieldname": "fire_3",
                    "code": "3",
                    "name": "Номер карточки; основная (0), дополнительная(1 - 9)",
                    "type": "text"
                }, {
                    "fieldname": "fire_4",
                    "code": "4",
                    "name": "Дата возникновения пожара (дд/мм/гг)",
                    "type": "datetime"
                }, {
                    "fieldname": "fire_5",
                    "code": "5",
                    "name": "Вид: населенного пункта (табл. 2); пожарной охраны населенного пункта (табл. 3)",
                    "type": "text"
                }
                ]
            },
            "ОБЪЕКТ ПОЖАРА": {
                "fieldname": "fire_gr2",
                "code": "II.",
                "type": "group",
                "child": [{
                    "fieldname": "fire_6",
                    "code": "6",
                    "name": "Форма собственности (табл. 4)",
                    "type": "text"
                }, {
                    "fieldname": "fire_7",
                    "code": "7",
                    "name": "Организационно-правовая форма организации (табл. 5)",
                    "type": "text"
                }, {
                    "fieldname": "fire_8",
                    "code": "8",
                    "name": "Ведомственная принадлежность организации (табл. 6)",
                    "type": "text"
                }, {
                    "fieldname": "fire_9",
                    "code": "9",
                    "name": "Тип предприятия, организации, учреждения (табл. 7)",
                    "type": "text"
                }, {
                    "fieldname": "fire_10",
                    "code": "10",
                    "name": "Объект пожара (табл. 8). Вид охраны объекта (табл. 9). Состояние транспорта или новостройки",
                    "type": "text"
                }, {
                    "fieldname": "fire_11",
                    "code": "11",
                    "name": "Место возникновения пожара (табл. 10, 11)",
                    "type": "text"
                }, {
                    "fieldname": "fire_12",
                    "code": "12",
                    "name": "Изделие, устройство, материал (источник возникновения пожара) (табл. 12)",
                    "type": "text"
                }, {
                    "fieldname": "fire_13",
                    "code": "13",
                    "name": "Причина пожара (табл. 13)",
                    "type": "text"
                }, {
                    "fieldname": "fire_14",
                    "code": "14",
                    "name": "Категория виновника пожара (табл. 14, 15)",
                    "type": "text"
                }, {
                    "fieldname": "fire_15",
                    "code": "15",
                    "name": "Возраст виновника пожара",
                    "type": "text"
                }, {
                    "fieldname": "fire_16",
                    "code": "16",
                    "name": "Результат дознания по пожару",
                    "type": "text"
                }
                ]
            },
            "ХАРАКТЕРИСТИКА ОБЪЕКТА ПОЖАРА": {
                "fieldname": "fire_gr3",
                "code": "III.",
                "type": "group",
                "child": [{
                    "fieldname": "fire_17",
                    "code": "17",
                    "name": "Этажность здания, эт.; ",
                    "type": "number"
                }, {
                    "fieldname": "fire_18",
                    "code": "17",
                    "name": "Этаж, на котором возник пожар, эт.",
                    "type": "number"
                }, {
                    "fieldname": "fire_19",
                    "code": "18",
                    "name": "Степень огнестойкости (табл. 16)",
                    "type": "text"
                }, {
                    "fieldname": "fire_20",
                    "code": "19",
                    "name": "Площадь здания, противопожарного отсека, квартиры",
                    "type": "text"
                }, {
                    "fieldname": "fire_21",
                    "code": "20",
                    "name": "Стоимость здания",
                    "type": "number"
                }, {
                    "fieldname": "fire_22",
                    "code": "21",
                    "name": "Стоимость материальных ценностей",
                    "type": "number"
                }, {
                    "fieldname": "fire_23",
                    "code": "22",
                    "name": "Дата последнего детального обследования",
                    "type": "datetime"
                }, {
                    "fieldname": "fire_24",
                    "code": "23",
                    "name": "Количество выявленных нарушений ППБ",
                    "type": "number"
                }, {
                    "fieldname": "fire_25",
                    "code": "24",
                    "name": "Расстояние до пожарной части, км",
                    "type": "number"
                }
                ]
            },
            "ПОСЛЕДСТВИЯ ПОЖАРА": {
                "fieldname": "fire_gr4",
                "code": "IV.",
                "type": "group",
                "child": [{
                    "fieldname": "fire_26",
                    "code": "25",
                    "name": "Погибло людей: всего, чел. ",
                    "type": "number"
                }, {
                    "fieldname": "fire_27",
                    "code": "",
                    "name": "из них детей, чел.",
                    "type": "number"
                }, {
                    "fieldname": "fire_28",
                    "code": "",
                    "name": "работников ПО, чел.",
                    "type": "number"
                }, {
                    "fieldname": "fire_29",
                    "code": "26",
                    "name": "Травмировано людей: всего, чел. ",
                    "type": "number"
                }, {
                    "fieldname": "fire_30",
                    "code": "",
                    "name": "из них детей, чел.",
                    "type": "number"
                }, {
                    "fieldname": "fire_31",
                    "code": "",
                    "name": "работников ПО, чел.",
                    "type": "number"
                }, {
                    "fieldname" : "fire_sep1",
                    "code": "",
                    "name": "МАТЕРИАЛЬНЫЙ УЩЕРБ ОТ ПОЖАРА",
                    "type": "separator"
                }, {
                    "fieldname": "fire_32",
                    "code": "27",
                    "name": "Суммарный ущерб от пожара",
                    "type": "text"
                }, {
                    "fieldname": "fire_33",
                    "code": "28",
                    "name": "По строению",
                    "type": "text"
                }, {
                    "fieldname": "fire_34",
                    "code": "29",
                    "name": "По оборудованию, материалам  и имуществу",
                    "type": "text"
                }, {
                    "fieldname" : "fire_sep2",
                    "code": "",
                    "name": "УНИЧТОЖЕНО, ПОВРЕЖДЕНО ПОЖАРОМ",
                    "type": "separator"
                }, {
                    "fieldname" : "fire_sep3",
                    "code": "30",
                    "name": "Строений",
                    "type": "separator"
                }, {
                    "fieldname": "fire_35",
                    "code": "",
                    "name": "Уничтожено, ед.",
                    "type": "number"
                }, {
                    "fieldname": "fire_36",
                    "code": "",
                    "name": "повреждено, ед",
                    "type": "number"
                }, {
                    "fieldname" : "fire_sep4",
                    "code": "31",
                    "name": "Жилых квартир",
                    "type": "separator"
                }, {
                    "fieldname": "fire_37",
                    "code": "",
                    "name": "уничтожено, ед.",
                    "type": "number"
                }, {
                    "fieldname": "fire_38",
                    "code": "",
                    "name": "повреждено, ед.",
                    "type": "number"
                }, {
                    "fieldname" : "fire_sep5",
                    "code": "32",
                    "name": "Комнат ",
                    "type": "separator"
                }, {
                    "fieldname": "fire_39",
                    "code": "",
                    "name": "уничтожено, ед.",
                    "type": "number"
                }, {
                    "fieldname": "fire_40",
                    "code": "",
                    "name": "повреждено, ед.",
                    "type": "number"
                }, {
                    "fieldname" : "fire_sep6",
                    "code": "33",
                    "name": "Общая площадь пожара ",
                    "type": "separator"
                }, {
                    "fieldname": "fire_41",
                    "code": "",
                    "name": "уничтожено, ед.",
                    "type": "number"
                }, {
                    "fieldname": "fire_42",
                    "code": "",
                    "name": "повреждено, ед.",
                    "type": "number"
                }, {
                    "fieldname" : "fire_sep7",
                    "code": "34",
                    "name": "Автотракторной и др. техники ",
                    "type": "separator"
                }, {
                    "fieldname": "fire_43",
                    "code": "",
                    "name": "уничтожено, ед.",
                    "type": "number"
                }, {
                    "fieldname": "fire_44",
                    "code": "",
                    "name": "повреждено, ед.",
                    "type": "number"
                }, {
                    "fieldname" : "fire_sep8",
                    "code": "35",
                    "name": "Зерновых культур ",
                    "type": "separator"
                }, {
                    "fieldname": "fire_45",
                    "code": "",
                    "name": "уничтожено, тонн",
                    "type": "number"
                }, {
                    "fieldname": "fire_46",
                    "code": "",
                    "name": "повреждено, тонн",
                    "type": "number"
                }, {
                    "fieldname" : "fire_sep9",
                    "code": "36",
                    "name": "Кормов ",
                    "type": "separator"
                }, {
                    "fieldname": "fire_47",
                    "code": "",
                    "name": "уничтожено, тонн",
                    "type": "number"
                }, {
                    "fieldname": "fire_48",
                    "code": "",
                    "name": "повреждено, тонн",
                    "type": "number"
                }, {
                    "fieldname" : "fire_sep10",
                    "code": "37",
                    "name": "Зерновые культуры на корню ",
                    "type": "separator"
                }, {
                    "fieldname": "fire_49",
                    "code": "",
                    "name": "уничтожено, га",
                    "type": "number"
                }, {
                    "fieldname": "fire_50",
                    "code": "",
                    "name": "повреждено, га",
                    "type": "number"
                }, {
                    "fieldname" : "fire_sep11",
                    "code": "38",
                    "name": "Хлопок волокно и сырец ",
                    "type": "separator"
                }, {
                    "fieldname": "fire_51",
                    "code": "",
                    "name": "уничтожено, кг",
                    "type": "number"
                }, {
                    "fieldname": "fire_52",
                    "code": "",
                    "name": "повреждено, кг",
                    "type": "number"
                }, {
                    "fieldname": "fire_53",
                    "code": "39",
                    "name": "Скота крупного, голов",
                    "type": "number"
                }, {
                    "fieldname": "fire_54",
                    "code": "40",
                    "name": "Скота мелкого, голов",
                    "type": "number"
                }, {
                    "fieldname": "fire_55",
                    "code": "41",
                    "name": "Зверей и других животных, голов",
                    "type": "number"
                }, {
                    "fieldname": "fire_56",
                    "code": "42",
                    "name": "Птицы, штук ",
                    "type": "number"
                }
                ]
            },
            "СПАСЕНО НА ПОЖАРЕ": {
                "fieldname": "fire_gr5",
                "code": "V.",
                "type": "group",
                "child": [{
                    "fieldname": "fire_57",
                    "code": "43",
                    "name": "Людей, человек",
                    "type": "number"
                }, {
                    "fieldname" : "fire_sep12",
                    "code": "44",
                    "name": "Скота: ",
                    "type": "separator"
                }, {
                    "fieldname": "fire_58",
                    "code": "",
                    "name": "крупного, голов",
                    "type": "number"
                }, {
                    "fieldname": "fire_59",
                    "code": "",
                    "name": "мелкого, голов",
                    "type": "number"
                }, {
                    "fieldname": "fire_60",
                    "code": "45",
                    "name": "Автотракторной и другой техники, ед.",
                    "type": "number"
                }
                ]
            },
            "ДИНАМИКА РАЗВИТИЯ И ТУШЕНИЯ ПОЖАРА": {
                "fieldname": "fire_gr6",
                "code": "VI.",
                "type": "group",
                "child": [{
                    "fieldname": "fire_61",
                    "code": "46",
                    "name": "Дата и время обнаружения пожара",
                    "type": "datetime"
                }, {
                    "fieldname": "fire_62",
                    "code": "47",
                    "name": "Дата и время сообщения о пожаре",
                    "type": "datetime"
                }, {
                    "fieldname": "fire_63",
                    "code": "48",
                    "name": "Дата и время прибытия на пожар 1-го пож. подразделения",
                    "type": "datetime"
                }, {
                    "fieldname": "fire_64",
                    "code": "48",
                    "name": "Дата и время локализации пожара",
                    "type": "datetime"
                }, {
                    "fieldname": "fire_65",
                    "code": "50",
                    "name": "Дата и время ликвидации пожара",
                    "type": "datetime"
                }, {
                    "fieldname": "fire_66",
                    "code": "52",
                    "name": "Условия, способствовавшие развитию пожара (табл. 17)",
                    "type": "text"
                }
                ]
            },
            "СИЛЫ И СРЕДСТВА ПОЖАРОТУШЕНИЯ": {
                "fieldname": "fire_gr7",
                "code": "VII.",
                "type": "group",
                "child": [{
                    "fieldname": "fire_67",
                    "code": "53",
                    "name": "Участники тушения пожара (табл. 18)",
                    "type": "text"
                }, {
                    "fieldname": "fire_68",
                    "code": "53.1",
                    "name": "Количество участников тушения пожара",
                    "type": "number"
                }, {
                    "fieldname": "fire_69",
                    "code": "54",
                    "name": "Техника, использованная при тушении пожара (табл. 19)",
                    "type": "text"
                }, {
                    "fieldname": "fire_70",
                    "code": "55",
                    "name": "Количество техники, ед.",
                    "type": "number"
                }, {
                    "fieldname": "fire_71",
                    "code": "55.1",
                    "name": "Из них отказало в пути следования или во время тушения",
                    "type": "number"
                }, {
                    "fieldname": "fire_72",
                    "code": "56",
                    "name": "Подано пожарных стволов на тушение пожара (табл. 20)",
                    "type": "text"
                }, {
                    "fieldname": "fire_73",
                    "code": "57",
                    "name": "Количество поданных пожарных стволов, ед.",
                    "type": "number"
                }, {
                    "fieldname": "fire_74",
                    "code": "58",
                    "name": "Огнетушащие средства, применявшиеся для тушения (табл. 21)",
                    "type": "text"
                }, {
                    "fieldname": "fire_75",
                    "code": "59",
                    "name": "Количество израсходованных огнетушащих средств при тушении пожара",
                    "type": "text"
                }, {
                    "fieldname": "fire_76",
                    "code": "60",
                    "name": "Первичные средства пожаротушения (табл. 22)",
                    "type": "text"
                }, {
                    "fieldname": "fire_77",
                    "code": "61",
                    "name": "Водоснабжение на пожаре (табл. 23)",
                    "type": "text"
                }, {
                    "fieldname": "fire_78",
                    "code": "62",
                    "name": "Работа установок пожарной автоматики (табл. 24, 25)",
                    "type": "text"
                }, {
                    "fieldname": "fire_79",
                    "code": "62.1",
                    "name": "Год введения в эксплуатацию установки пожарной автоматики",
                    "type": "text"
                }, {
                    "fieldname": "fire_80",
                    "code": "63",
                    "name": "Руководитель тушения пожара (табл. 26)",
                    "type": "text"
                }, {
                    "fieldname": "fire_81",
                    "code": "64",
                    "name": "Выезд следственно-оперативной группы",
                    "type": "text"
                }
                ]
            },
            "СВЕДЕНИЯ О ПОГИБШИХ И ТРАВМИРОВАННЫХ": {
                "fieldname": "fire_gr8",
                "code": "VIII.",
                "type": "group",
                "child": [{
                    "fieldname" : "fire_sep13",
                    "code": "",
                    "name": "СВЕДЕНИЯ О ПОГИБШИХ",
                    "type": "separator"
                }, {
                    "fieldname": "fire_82",
                    "code": "65",
                    "name": "Возраст погибшего лица",
                    "type": "text"
                }, {
                    "fieldname": "fire_83",
                    "code": "66",
                    "name": "Пол погибшего лица: мужской (1), женский (2)",
                    "type": "text"
                }, {
                    "fieldname": "fire_84",
                    "code": "67",
                    "name": "Отношение погибшего лица к объекту пожара (табл. 15)",
                    "type": "text"
                }, {
                    "fieldname": "fire_85",
                    "code": "68",
                    "name": "Социальное положение, погибшего при пожаре лица (табл. 27)",
                    "type": "text"
                }, {
                    "fieldname": "fire_86",
                    "code": "69",
                    "name": "Семейное положение, погибшего при пожаре лица (табл. 28)",
                    "type": "text"
                }, {
                    "fieldname": "fire_87",
                    "code": "70",
                    "name": "Образование лица, погибшего при пожаре (табл. 29)",
                    "type": "text"
                }, {
                    "fieldname": "fire_88",
                    "code": "71",
                    "name": "Причина гибели людей при пожаре (табл. 30)",
                    "type": "text"
                }, {
                    "fieldname": "fire_89",
                    "code": "72",
                    "name": "Условия, способствовавшие гибели людей (табл. 31)",
                    "type": "text"
                }, {
                    "fieldname": "fire_90",
                    "code": "73",
                    "name": "Момент наступления смерти (табл. 32)",
                    "type": "text"
                }, {
                    "fieldname" : "fire_sep14",
                    "code": "",
                    "name": "СВЕДЕНИЯ О ТРАВМИРОВАННЫХ",
                    "type": "separator"
                }, {
                    "fieldname": "fire_91",
                    "code": "74",
                    "name": "Возраст травмированного лица",
                    "type": "text"
                }, {
                    "fieldname": "fire_92",
                    "code": "75",
                    "name": "Пол травмированного лица: мужской (1), женский (2)",
                    "type": "text"
                }, {
                    "fieldname": "fire_93",
                    "code": "76",
                    "name": "Отношение травмированного лица к объекту пожара (табл. 15)",
                    "type": "text"
                }, {
                    "fieldname": "fire_94",
                    "code": "77",
                    "name": "Условия, способствовавшие травмированию людей (табл. 31)",
                    "type": "text"
                }, {
                    "fieldname" : "fire_sep15",
                    "code": "78",
                    "name": "Закрепление объекта",
                    "type": "separator"
                }, {
                    "fieldname": "fire_95",
                    "code": "",
                    "name": "ФИО",
                    "type": "text"
                }, {
                    "fieldname": "fire_96",
                    "code": "",
                    "name": "Должность ",
                    "type": "text"
                }, {
                    "fieldname": "fire_97",
                    "code": "",
                    "name": "Звание",
                    "type": "text"
                }
                ]
            },
            "Карточку составил": {
                "fieldname": "fire_gr9",
                "code": "",
                "type": "group",
                "child": [{
                    "fieldname": "fire_98",
                    "code": "",
                    "name": "ФИО",
                    "type": "text"
                }, {
                    "fieldname": "fire_99",
                    "code": "",
                    "name": "Должность ",
                    "type": "text"
                }, {
                    "fieldname": "fire_100",
                    "code": "",
                    "name": "Звание",
                    "type": "text"
                }, {
                    "fieldname": "fire_101",
                    "code": "",
                    "name": "Дата",
                    "type": "datetime"
                }
                ]
            },
            "fieldname": "fire_gr10",
            "Карточку проверил и подтверждаю": {
                "code": "",
                "type": "group",
                "child": [{
                    "fieldname": "fire_102",
                    "code": "",
                    "name": "ФИО",
                    "type": "text"
                }, {
                    "fieldname": "fire_103",
                    "code": "",
                    "name": "Должность ",
                    "type": "text"
                }, {
                    "fieldname": "fire_104",
                    "code": "",
                    "name": "Звание",
                    "type": "text"
                }, {
                    "fieldname": "fire_105",
                    "code": "",
                    "name": "Дата",
                    "type": "datetime"
                }
                ]
            }
        }
    };
//-----------------------------------------------------------------------

    chsData = Object.assign(chsData, fireData);

}
