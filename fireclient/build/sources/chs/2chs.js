if(chsData !== undefined){

    var chsData2 = null;

//----------------------------------------------------------------------- Начало JSON
    chsData2 = {
        "chs2" : {
            "Общие данные" : {
                "fieldname": "chs2-gr1",
                "code" : "1",
                "type" : "group",
                "child" : [{
                    "fieldname" : "chs2_1",
                    "code" : "1.1.",
                    "name" : "Характер чрезвычайной ситуации",
                    "type" : "text"
                }, {
                    "fieldname" : "chs2_2",
                    "code" : "1.1.",
                    "name" : "Масштаб чрезвычайной ситуации",
                    "type" : "reference",
                    "repeat" : "storage.chsDict.chsScales",
                    "defval" : "Масштаб ЧС формы 1/ЧС"
                }, {
                    "fieldname" : "chs2_3",
                    "code" : "1.2., 1.3.",
                    "name" : "Дата время возникновения чрезвычайной ситуации (число, месяц, год) (час, мин.)",
                    "type" : "datetime",
                    "defval" : "Дата время возникновения ЧС формы 1/ЧС"
                }, {
                    "fieldname" : "chs2_4",
                    "code" : "1.4.",
                    "name" : "Наименование области",
                    "type" : "text",
                    "defval" : "РЕГИОН формы 1/ЧС"
                }, {
                    "fieldname" : "chs2_5",
                    "code" : "1.5.",
                    "name" : "Наименование района",
                    "type" : "text",
                    "defval" : "РАЙОН формы 1/ЧС"
                }, {
                    "fieldname" : "chs2_6",
                    "code" : "1.6.",
                    "name" : "Город (населенный пункт, поселок, кишлак хозяйство и др.)",
                    "type" : "text",
                    "defval" : "НАСЕЛЕННЫЙ ПУНКТ формы 1/ЧС"
                }, {
                    "fieldname" : "chs2_7",
                    "code" : "1.7.",
                    "name" : "Объект экономики",
                    "type" : "textarea",
                    "defval" : "Наименование объекта из формы 1/ЧС"
                }, {
                    "fieldname" : "chs2_8",
                    "code" : "1.8.",
                    "name" : "Тип строения, здания, сооружения",
                    "type" : "text"
                }, {
                    "fieldname" : "chs2_9",
                    "code" : "1.9.",
                    "name" : "Форма собственности",
                    "type" : "text"
                }, {
                    "fieldname" : "chs2_10",
                    "code" : "1.10.",
                    "name" : "Подчиненность (министерство, ведомство, компания и др.)",
                    "type" : "text"
                }, {
                    "fieldname" : "chs2_11",
                    "code" : "1.11.",
                    "name" : "Причины возникновения ЧС",
                    "type" : "textarea"
                }, {
                    "fieldname" : "chs2_12",
                    "code" : "1.12.",
                    "name" : "Краткая характеристика ЧС",
                    "type" : "textarea"
                }
                ]
            },
            "Метеоданные (определяются по данным ближайшего пункта измерений)" : {
                "fieldname": "chs2-gr2",
                "code" : "2.",
                "type" : "group",
                "child" : [{
                    "fieldname" : "chs2_13",
                    "code" : "2.1.",
                    "name" : "Температура воздуха, градусов",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_14",
                    "code" : "2.2.",
                    "name" : "Направление ветра, град.",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_15",
                    "code" : "2.2.",
                    "name" : "Скорость ветра, м/с",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_16",
                    "code" : "2.3.",
                    "name" : "Влажность",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_17",
                    "code" : "2.4.",
                    "name" : "Осадки",
                    "type" : "text"
                }, {
                    "fieldname" : "chs2_18",
                    "code" : "2.4.",
                    "name" : "Вид",
                    "type" : "text"
                }, {
                    "fieldname" : "chs2_19",
                    "code" : "2.4.",
                    "name" : "Количество, мм.",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_20",
                    "code" : "2.5.",
                    "name" : "Видимость",
                    "type" : "text"
                }, {
                    "fieldname" : "chs2_21",
                    "code" : "2.6.",
                    "name" : "Общая погодная обстановка",
                    "type" : "text"
                }
                ]
            },
            "Основные параметры чрезвычайной ситуации" : {
                "fieldname": "chs2-gr3",
                "code" : "",
                "type" : "group",
                "child" : [{
                    "fieldname" : "chs2_sep1",
                    "code" : "3.",
                    "name" : "Землетрясение",
                    "type" : "separator"
                }, {
                    "fieldname" : "chs2_22",
                    "code" : "3.1.",
                    "name" : "Магнитуда в эпицентре, баллов",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_23",
                    "code" : "3.2.",
                    "name" : "Глубина от поверхности земли в км",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_24",
                    "code" : "3.3.",
                    "name" : "Координаты: широта, град., мин., с.",
                    "type" : "text",
                    "check" : "Формат:__°__’__”"
                }, {
                    "fieldname" : "chs2_25",
                    "code" : "3.3.",
                    "name" : "Координаты: долгота, град., мин., с.",
                    "type" : "text",
                    "check" : "Формат:__°__’__”"
                }, {
                    "fieldname" : "chs2_26",
                    "code" : "3.4.",
                    "name" : "Интенсивность землетрясения в крупных населенных пунктах, текст, балл",
                    "type" : "text"
                }, {
                    "fieldname" : "chs2_27",
                    "code" : "3.5.",
                    "name" : "Дополнительная текстовая информация",
                    "type" : "textarea"
                },  {
                    "fieldname" : "chs2_sep2",
                    "code" : "4.",
                    "name" : "Радиоактивное загрязнение",
                    "type" : "separator"
                }, {
                    "fieldname" : "chs2_28",
                    "code" : "4.1.",
                    "name" : "Источник радиоактивного загрязнения",
                    "type" : "text"
                }, {
                    "fieldname" : "chs2_29",
                    "code" : "4.2.",
                    "name" : "Уровень радиации вблизи источника",
                    "type" : "extgroup",
                    "child" : [{
                        "fieldname" : "chs2_30",
                        "code" : "",
                        "name" : "Расстояние от источника р/а загрязнения",
                        "type" : "text"
                    }, {
                        "fieldname" : "chs2_31",
                        "code" : "",
                        "name" : "Уровень радиации, мР/ч, Р/ч",
                        "type" : "number"
                    }
                    ]
                }, {
                    "fieldname" : "chs2_32",
                    "code" : "4.3.а",
                    "name" : "Удаленность внешней границы зоны экстренных мероприятий, м",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_33",
                    "code" : "4.3.б",
                    "name" : "Удаленность внешней границы зоны профилактических мероприятий, м",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_34",
                    "code" : "4.3.в",
                    "name" : "Удаленность внешней границы зоны ограничений, м",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_35",
                    "code" : "4.4.а",
                    "name" : "Уровень радиации зоны экстренных мероприятий, мР/ч, Р/ч",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_36",
                    "code" : "4.4.б",
                    "name" : "Уровень радиации зоны профилактических мероприятий, мР/ч, Р/ч",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_37",
                    "code" : "4.4.в",
                    "name" : "Уровень радиации зоны ограничений, мР/ч, Р/ч",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_38",
                    "code" : "4.5.",
                    "name" : "Дополнительная текстовая информация",
                    "type" : "textarea"
                },  {
                    "fieldname" : "chs2_sep3",
                    "code" : "5.",
                    "name" : "Затопление (наводнение)",
                    "type" : "separator"
                }, {
                    "fieldname" : "chs2_39",
                    "code" : "5.1.",
                    "name" : "Причины затопления",
                    "type" : "text"
                }, {
                    "fieldname" : "chs2_40",
                    "code" : "5.2.",
                    "name" : "Уровень подъема воды от допустимой нормы (определяется по данным ближайшего пункта измерений), м",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_41",
                    "code" : "5.3.",
                    "name" : "Продолжительность затопления, ч",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_42",
                    "code" : "5.4.",
                    "name" : "Скорость подъема воды (определяется по данным ближайшего пункта измерений), м/ч",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_43",
                    "code" : "5.5.",
                    "name" : "Время добегания волны прорыва до населенных пунктов и крупных объектов экономики, (визуально, при помощи расчётов), ч",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_44",
                    "code" : "5.6.",
                    "name" : "Размер прорыва в плотине, дамбе (визуально, при помощи прямых или дистанционных измерений) кв.м",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_45",
                    "code" : "5.7.",
                    "name" : "Дополнительная текстовая информация",
                    "type" : "textarea"

                }, {
                    "fieldname" : "chs2_sep4",
                    "code" : "6.",
                    "name" : "Бактериальное заражение",
                    "type" : "separator"
                }, {
                    "fieldname" : "chs2_46",
                    "code" : "6.1.",
                    "name" : "Эпидемия, эпизоотия, эпифитотия",
                    "type" : "text"
                }, {
                    "fieldname" : "chs2_47",
                    "code" : "6.2.",
                    "name" : "Вид биологического (бактериального) средства",
                    "type" : "text"
                }, {
                    "fieldname" : "chs2_48",
                    "code" : "6.3.",
                    "name" : "Какая угроза населению, проживающему в заражённом регионе",
                    "type" : "text"
                }, {
                    "fieldname" : "chs2_49",
                    "code" : "6.4.",
                    "name" : "Какие меры принимаются по устранению",
                    "type" : "text"
                }, {
                    "fieldname" : "chs2_50",
                    "code" : "6.5.",
                    "name" : "Дополнительная текстовая информация",
                    "type" : "textarea"
                }, {
                    "fieldname" : "chs2_sep5",
                    "code" : "7.",
                    "name" : "Химическое заражение",
                    "type" : "separator"
                }, {
                    "fieldname" : "chs2_51",
                    "code" : "7.1.",
                    "name" : "Источник химического заражения",
                    "type" : "text"
                }, {
                    "fieldname" : "chs2_52",
                    "code" : "7.2.",
                    "name" : "Наименование СДЯВ",
                    "type" : "text"
                }, {
                    "fieldname" : "chs2_53",
                    "code" : "7.3.",
                    "name" : "Количество СДЯВ выброшенного в атмосферу, кг, т. (куб. м)",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_54",
                    "code" : "7.4.",
                    "name" : "Количество СДЯВ всего в емкостях, хранилище, кг, т. (куб. м)",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_55",
                    "code" : "7.5.",
                    "name" : "Площадь разлива (объём выброса)",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_56",
                    "code" : "7.6.",
                    "name" : "Высота поддона (обваловки), м.",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_57",
                    "code" : "7.7.",
                    "name" : "Какая угроза населению, проживающему в заражённом регионе",
                    "type" : "text"
                }, {
                    "fieldname" : "chs2_58",
                    "code" : "7.8",
                    "name" : "Какие меры принимаются по устранению",
                    "type" : "text"
                }, {
                    "fieldname" : "chs2_59",
                    "code" : "7.9.",
                    "name" : "Дополнительная текстовая информация",
                    "type" : "textarea"
                }, {
                    "fieldname" : "chs2_sep6",
                    "code" : "8.",
                    "name" : "Пожары",
                    "type" : "separator"
                }, {
                    "fieldname" : "chs2_60",
                    "code" : "8.1.",
                    "name" : "Общая площадь возникших пожаров, кв. м",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_61",
                    "code" : "8.1.1.",
                    "name" : "Отдельные, кв. м",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_62",
                    "code" : "8.1.2.",
                    "name" : "Сплошные, кв. м",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_63",
                    "code" : "8.1.3.",
                    "name" : "Огневых штормов, кв. м",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_64",
                    "code" : "8.1.4.",
                    "name" : "В завалах, кв. м",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_65",
                    "code" : "8.2.",
                    "name" : "Оказавшиеся в зоне поражения",
                    "type" : "text"
                }, {
                    "fieldname" : "chs2_sep7",
                    "code" : "8.2.1.",
                    "name" : "Городов, в том числе:",
                    "type" : "separator"
                }, {
                    "fieldname" : "chs2_66",
                    "code" : "8.2.1.",
                    "name" : "областного значения к-во",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_67",
                    "code" : "8.2.1.",
                    "name" : "с населением от 1000 000 и более к-во",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_68",
                    "code" : "8.2.1.",
                    "name" : "с населением от 100 000 и более к-во",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_69",
                    "code" : "8.2.1.",
                    "name" : "с населением от 50 000 и более к-во",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_70",
                    "code" : "8.2.1.",
                    "name" : "с населением от 10 000 и до 5 000 к-во",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_71",
                    "code" : "8.2.1.",
                    "name" : "посёлки городского типа",
                    "type" : "number"
                },  {
                    "fieldname" : "chs2_sep8",
                    "code" : "8.2.2.",
                    "name" : "Населённых пунктов, в том числе:",
                    "type" : "separator"
                }, {
                    "fieldname" : "chs2_72",
                    "code" : "8.2.2.",
                    "name" : "сельские посёлки с населением 2 000 и более к-во",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_73",
                    "code" : "8.2.2.",
                    "name" : "сельские посёлки с населением 2 000 к-во",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_sep9",
                    "code" : "",
                    "name" : "",
                    "type" : "separator"
                }, {
                    "fieldname" : "chs2_74",
                    "code" : "8.2.3.",
                    "name" : "Особо важных категорированных объектов и объектов жизнеобеспечения к-во",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_75",
                    "code" : "8.2.4.",
                    "name" : "Лесной территории, кв. м",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_76",
                    "code" : "8.2.5.",
                    "name" : "Сельхоз угодий, кв. м",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_77",
                    "code" : "8.2.6.",
                    "name" : "Общественных зданий и сооружений к-во",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_78",
                    "code" : "8.2.7.",
                    "name" : "Производственных объектов к-во",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_79",
                    "code" : "8.3.",
                    "name" : "Дополнительная текстовая информация",
                    "type" : "textarea"
                }, {
                    "fieldname" : "chs2_sep10",
                    "code" : "9.",
                    "name" : "Потери",
                    "type" : "separator"
                }, {
                    "fieldname" : "chs2_80",
                    "code" : "9.1.",
                    "name" : "Всего, чел.",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_81",
                    "code" : "9.2.",
                    "name" : "В том числе безвозвратные, чел.",
                    "type" : "number",
                    "check" : "<= 92"
                }, {
                    "fieldname" : "chs2_82",
                    "code" : "9.3.",
                    "name" : "Из них детей, чел.",
                    "type" : "number",
                    "check" : "<= 93"
                }, {
                    "fieldname" : "chs2_83",
                    "code" : "9.4.",
                    "name" : "Дополнительная текстовая информация",
                    "type" : "textarea"
                }, {
                    "fieldname" : "chs2_sep11",
                    "code" : "10.",
                    "name" : "Состояние зданий и сооружений",
                    "type" : "separator"
                }, {
                    "fieldname" : "chs2_sep12",
                    "code" : "10.1.",
                    "name" : "Разрушено:",
                    "type" : "separator"
                }, {
                    "fieldname" : "chs2_84",
                    "code" : "10.1.1.",
                    "name" : "объектов экономики",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_85",
                    "code" : "10.1.2.",
                    "name" : "жилых домов, ед.",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_86",
                    "code" : "10.1.3.",
                    "name" : "зданий лечебных учреждений, ед.",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_87",
                    "code" : "10.1.4.",
                    "name" : "других зданий и сооружений",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_sep13",
                    "code" : "10.2.",
                    "name" : "Повреждено:",
                    "type" : "separator"
                }, {
                    "fieldname" : "chs2_88",
                    "code" : "10.2.1.",
                    "name" : "объектов экономики",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_89",
                    "code" : "10.2.2.",
                    "name" : "жилых домов, ед.",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_90",
                    "code" : "10.2.3.",
                    "name" : "зданий лечебных учреждений, ед.",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_91",
                    "code" : "10.2.4.",
                    "name" : "других зданий и сооружений",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_sep14",
                    "code" : "",
                    "name" : "",
                    "type" : "separator"
                }, {
                    "fieldname" : "chs2_92",
                    "code" : "10.3.",
                    "name" : "Дополнительная текстовая информация",
                    "type" : "textarea"
                }, {
                    "fieldname" : "chs2_sep15",
                    "code" : "11.",
                    "name" : "Состояние коммуникаций (Вышло из строя)",
                    "type" : "separator"
                }, {
                    "fieldname" : "chs2_93",
                    "code" : "11.1.",
                    "name" : "В населенных пунктах:",
                    "type" : "text"
                }, {
                    "fieldname" : "chs2_94",
                    "code" : "11.1.1.",
                    "name" : "ЛЭП, км",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_95",
                    "code" : "11.1.3.",
                    "name" : "линий связи, км",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_96",
                    "code" : "11.1.4.",
                    "name" : "железных дорог, км",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_97",
                    "code" : "11.1.5.",
                    "name" : "мостов, шт.",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_98",
                    "code" : "11.1.6.",
                    "name" : "водопроводов, м",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_99",
                    "code" : "11.1.7.",
                    "name" : "газопроводов, м",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_100",
                    "code" : "11.1.8.",
                    "name" : "теплотрасс, м",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_101",
                    "code" : "11.1.9.",
                    "name" : "канализационных сетей, м",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_102",
                    "code" : "11.1.10.",
                    "name" : "сооружений (указать вышедшие из строя участки путепроводов, насосные станции, бройлерные, котельные и т.д., шт.)",
                    "type" : "extgroup",
                    "child" : [{
                        "fieldname" : "chs2_103",
                        "code" : "",
                        "name" : "Наименование",
                        "type" : "text"
                    }, {
                        "fieldname" : "chs2_104",
                        "code" : "",
                        "name" : "Количество, длина",
                        "type" : "number"
                    }
                    ]
                }, {
                    "fieldname" : "chs2_sep16",
                    "code" : "11.2.",
                    "name" : "Магистральных:",
                    "type" : "separator"
                }, {
                    "fieldname" : "chs2_105",
                    "code" : "11.2.1.",
                    "name" : "ЛЭП, км",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_106",
                    "code" : "11.2.2.",
                    "name" : "линий связи, км",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_sep17",
                    "code" : "",
                    "name" : "",
                    "type" : "separator"
                }, {
                    "fieldname" : "chs2_107",
                    "code" : "11.3.",
                    "name" : "Продуктопроводов:",
                    "type" : "extgroup",
                    "child" : [{
                        "fieldname" : "chs2_108",
                        "code" : "11.3.1.",
                        "name" : "наименование",
                        "type" : "text"
                    }, {
                        "fieldname" : "chs2_109",
                        "code" : "11.3.2.",
                        "name" : "количество, м",
                        "type" : "number"
                    }
                    ]
                }, {
                    "fieldname" : "chs2_110",
                    "code" : "11.4.",
                    "name" : "Мостов и дорожных сооружений:",
                    "type" : "extgroup",
                    "child" : [{
                        "fieldname" : "chs2_111",
                        "code" : "11.4.1.",
                        "name" : "наименование",
                        "type" : "text"
                    }, {
                        "fieldname" : "chs2_112",
                        "code" : "11.4.2.",
                        "name" : "количество, шт.",
                        "type" : "number"
                    }
                    ]
                }, {
                    "fieldname" : "chs2_113",
                    "code" : "11.5.",
                    "name" : "Дополнительная текстовая информация",
                    "type" : "textarea"
                }, {
                    "fieldname" : "chs2_sep18",
                    "code" : "12.",
                    "name" : "Сельскохозяйственные животные",
                    "type" : "separator"
                }, {
                    "fieldname" : "chs2_114",
                    "code" : "12.1.",
                    "name" : "Всего по учету, тыс. голов",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_115",
                    "code" : "12.1.",
                    "name" : "в том числе: по видам, тыс. голов",
                    "type" : "text"
                }, {
                    "fieldname" : "chs2_116",
                    "code" : "12.2.",
                    "name" : "Потери всего, тыс. голов",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_117",
                    "code" : "12.2.",
                    "name" : "в том числе: по видам, тыс. голов",
                    "type" : "text"
                }, {
                    "fieldname" : "chs2_118",
                    "code" : "12.3",
                    "name" : "Дополнительная текстовая информация",
                    "type" : "textarea"
                }, {
                    "fieldname" : "chs2_sep19",
                    "code" : "13.",
                    "name" : "Сельскохозяйственные угодья, лесные насаждения",
                    "type" : "separator"
                }, {
                    "fieldname" : "chs2_119",
                    "code" : "13.1.",
                    "name" : "Всего по учету, тыс. га",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_120",
                    "code" : "13.2.",
                    "name" : "В том числе по видам, тыс. га",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_121",
                    "code" : "13.3.",
                    "name" : "Потери всего, тыс. га",
                    "type" : "number"
                }, {
                    "fieldname" : "chs2_122",
                    "code" : "13.4.",
                    "name" : "Ущерб в денежном выражении",
                    "type" : "text"
                }, {
                    "fieldname" : "chs2_123",
                    "code" : "13.5.",
                    "name" : "Дополнительная текстовая информация",
                    "type" : "textarea"
                }
                ]
            }
        }

    };
//-----------------------------------------------------------------------

    chsData = Object.assign(chsData, chsData2);

}
