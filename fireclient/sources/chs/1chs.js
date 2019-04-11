var chsData = {}

if(chsData !== undefined){


//----------------------------------------------------------------------- Начало JSON
    chsData = {

        'chs1': {
            'Общие': {
                "fieldname": "chs1_gr1",
                "code": "1",
                "type": "group",
                "child": [{
                    "fieldname": "chs1_1",
                    "code": "1.1.",
                    "name": "Тип, вид происшедшей или предполагаемой ЧС",
                    "type": "reference",
                    "repeat": "storage.chsDict.chsTypes",
                    "check": "Справочник Вид ЧС "
                }, {
                    "fieldname": "chs1_2",
                    "code": "1.2.",
                    "name": "Область, район (объект ЧС)",
                    "type": "text",
                    "defval": "Адрес, объект"
                }, {
                    "fieldname": "chs1_3",
                    "code": "1.3.",
                    "name": "Площадь района (объекта) предполагаемой ЧС",
                    "type": "number"
                }, {
                    "fieldname": "chs1_sep1",
                    "code": "1.4.",
                    "name": "Время (предполагаемого) возникновения и масштабы ЧС",
                    "type": "separator"
                }, {
                    "fieldname": "chs1_4",
                    "code": "",
                    "name": "Дата, время (предполагаемого) возникновения ЧС",
                    "type": "datetime"
                }, {
                    "fieldname": "chs1_5",
                    "code": "",
                    "name": "Масштаб ЧС",
                    "type": "reference",
                    "repeat": "storage.chsDict.chsScales",
                    "check": "Справочник Масштаб ЧС "
                }, {
                    "fieldname": "chs1_sep2",
                    "code": "",
                    "name": "",
                    "type": "separator"
                }, {
                    "fieldname": "chs1_6",
                    "code": "1.5.",
                    "name": "Мероприятия (проводимые по недопущению развития ЧС и уменьшению возможных последствий и ущерба)",
                    "type": "textarea"
                }, {
                    "fieldname": "chs1_7",
                    "code": "1.6.",
                    "name": "Указать организацию, проводившую прогноз или мероприятия, другие источники информации",
                    "type": "textarea"
                }, {
                    "fieldname": "chs1_8",
                    "code": "1.7.",
                    "name": "Основная текстовая информация",
                    "type": "textarea"
                }
                ]
            }
        }



    };
//-----------------------------------------------------------------------

}

