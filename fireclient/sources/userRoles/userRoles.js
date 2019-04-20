// TODO: копия лежит в АДМИНКЕ ( КЛИЕНТЕ ), при изменении СКОПИРОВАТЬ или ИЗМЕНИТЬ и там !!!
// TODO: если нет поля (role: 'Старший диспетчер'), доступ по ней будет осуществляться, но в списке ролей не появится

const ACCESS = {

    dispatchersManager: {
        role: 'Старший диспетчер',
        isPCH: false, // Для правильного определения роли
        words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
            pch: 'ПЧ',
            frontNotes: 'Строевые записки',
            fireDept: 'Пожарная часть',
            pchEngine: 'ПЧ/ТИП/Гос№',
            fire: 'Пожар',
            fires: 'Пожары',
            incidents: 'пожаров',
            fireDepartment: 'Пожарная',
            fireDeptSel: 'Пожарную',
            fireEquipment: 'Пожарные части',
            OFPS: 'ОФПС',
            UPO: 'УПО',
            OPO: 'ОПО',
            'прибыла': 'прибыла',
            region: 'ЛО'
        },
        fireInfo: { // Верхняя строка информации о пожаре
            guard: true,
            number: true,
            address: true,
            state: true,
            externalSystem: true,
            pch: true,
            district: true,
            rank: true,
            type: true
        },
        mapStyles: { // Настройки для карты
            fireIcon: '\uf06d'
        },
        commonSwitches: { // Общие выключатели на весь комплекс
            rank: true, //Ранг
            rankMax: true, // Максимальный ранг
            modifiers: true, // Модификаторы
            firstTrunk: true, // Первый ствол
            LOG: true, // ЛОГ
            PO: true, // ПО
            GZDS: true, // ГЗДС
            halfAG: true, // 1/2/AG
            warehousePO: true, // ПО на складе
            SPT: true //СПТ

        },
        fireList: { // В таблице со списком пожаров
            rank: true,
            rankMax: true,
        },
        wrappers: { // Подложки дизайна
            selectedFireInfo: true, // Подложка для информации о выбранном пожаре
            fastCommandLine: true, // Подложка для строки поиска
            fastAdditionOfCars: true // Строка быстрого добавления машин
        },
        fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
            NZ: true, // Комманда"НЗ"
            SZ: true, // Комманда"СЗ"
            ST: true, // Комманда"СТ"
            NT: true, // Комманда"НТ"
            KR: true, // Комманда"КР"
            messages: true // Сообщение
        },
        mainMenu: { // Основоное меню
            fires: true, // Пожары
            newApplication: true, // Новая заявка
            technique: true, // Техника
            documentation: { // Документы
                view: true,
                subMenu: { // Архивы
                    reports: true, // Отчеты
                    downloadFromSHS: false // Загрузить из ШС
                }
            },
            archives: {
                view: true,
                subMenu: { // Архивы
                    archiveOfFires: true, // Архив пожаров
                    editingForms6: true, // Редактирование форм 6
                    cards: true, // Карточки пожаров
                    warNotes: true // Строевые записки
                }
            },
            warNotes: { // Строевые записки
                view: true,
                subMenu: { // Архивы
                    frontNotesOfPCH: true, // Строевые записки ПЧ
                    frontForGarrison: true, // Строевая за гарнизон
                    equipment: true, // Оборудование
                    protocol: true, // Протокол
                    officials: true, // Должностные лица
                    inCalculationAll: true, // В расчет все
                    disableAll: true // Выкл все
                }
            },
            bridges: true, // Мосты
            hydrants: true // Гидранты
        },
        map: true, // Карта справа от основного меню
        messages: true, // Сообщения справа от основного меню
        selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
        cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
        stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
        fastCommandLine: true, // Строка для ввода команд
        fastAdditionOfCars: true, // Строка быстрого добавления машин
        showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
        states: {
            frontNotes: {
                engineCondition: true // Кнопка "Состояние техники"
            },
            firebase: {
                fireCommands: true, // Команды для активного пожара
                buttons: {
                    firstStvol: true, // Кнопка подача первого ствола
                    LOG: true, // Кнопка ЛОГ
                    cancelTheOrder: true, // Кнопка Аннулировать заявку
                    specialTechnique: true, // Кнопки - Катер, Вертолет, Самолет
                    approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                    rankButtons: true, // Кнопки изменения ранга пожара
                    modifiersButtons: true // Кнопка Модификаторы
                }
            },
            newOrder: {
                buttons: {
                    unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                }
            },
            newFireCard: {
                fireCommands: true, // Команды для активного пожара
                buttons: {
                    recordingACall: true, // Кнопка Запись звонка
                    dialer: true, // Кнопка Дозвон
                    operator112: true, // Кнопка Оператор 112
                    stages: true, // Кнопка Этапы
                    removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                    listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                    unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                }

            },
            order: {
                editOrderButton: true, // Кнопка редактировать заявку
                tabs: {
                    notification: true, // Вкладка Оповещение
                    informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                },
                buttons: {
                    recordingACall: true, // Кнопка Запись звонка
                    dialer: true, // Кнопка Дозвон
                    operator112: true, // Кнопка Оператор 112
                    stages: true, // Кнопка Этапы
                    removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                    listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                    unloadingToTheStaffTable: false, // Кнопка Выгрузка в штабной стол
                    sendToLO: true // Кнопка Отправить в ЛО

                }
            },
            docs: {
                select: {
                    selectType: true, // Дропдаун - Выберите тип
                    chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                    chooseTheUser: true // Дропдаун - Выберите пользователя
                },
                reports: {
                    fir_10: true
                }
            },
            dept: {
                canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                showDeptList: true, // Отображать список департаментов.
                buttons: {
                    saveCaraul: true, // Кнопка Сохранить (караул)
                    closeDept: true, // Кнопка Закрыть
                    isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                    unloading: false // Кнопка Выгрузить
                }
            },
            protocol: {
                buttons: {
                    editTime: true // Кнопка редактирования времени в протоколе
                }
            }
        }

    },

    dispatchers: {
        role: 'Диспетчер',
        isPCH: false, // Для правильного определения роли
        words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
            pch: 'ПЧ',
            frontNotes: 'Строевые записки',
            fireDept: 'Пожарная часть',
            pchEngine: 'ПЧ/ТИП/Гос№',
            fire: 'Пожар',
            fires: 'Пожары',
            incidents: 'пожаров',
            fireDepartment: 'Пожарная',
            fireDeptSel: 'Пожарную',
            fireEquipment: 'Пожарные части',
            OFPS: 'ОФПС',
            UPO: 'УПО',
            OPO: 'ОПО',
            'прибыла': 'прибыла',
            region: 'ЛО'

        },
        fireInfo: { // Верхняя строка информации о пожаре
            guard: true,
            number: true,
            address: true,
            state: true,
            externalSystem: true,
            pch: true,
            district: true,
            rank: true,
            type: true
        },
        mapStyles: { // Настройки для карты
            fireIcon: '\uf06d'
        },
        commonSwitches: { // Общие выключатели на весь комплекс
            rank: true, //Ранг
            rankMax: true, // Максимальный ранг
            modifiers: true, // Модификаторы
            firstTrunk: true, // Первый ствол
            LOG: true, // ЛОГ
            PO: true, // ПО
            GZDS: true, // ГЗДС
            halfAG: true, // 1/2/AG
            warehousePO: true, // ПО на складе
            SPT: true //СПТ

        },
        fireList: { // В таблице со списком пожаров
            rank: true,
            rankMax: true,
        },
        wrappers: { // Подложки дизайна
            selectedFireInfo: true, // Подложка для информации о выбранном пожаре
            fastCommandLine: true, // Подложка для строки поиска
            fastAdditionOfCars: true // Строка быстрого добавления машин
        },
        fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
            NZ: true, // Комманда"НЗ"
            SZ: true, // Комманда"СЗ"
            ST: true, // Комманда"СТ"
            NT: true, // Комманда"НТ"
            KR: true, // Комманда"КР"
            messages: true // Сообщение
        },
        mainMenu: { // Основоное меню

            fires: true, // Пожары
            newApplication: true, // Новая заявка
            technique: true, // Техника
            documentation: { // Документы
                view: true,
                subMenu: { // Архивы
                    reports: true, // Отчеты
                    downloadFromSHS: false // Загрузить из ШС
                }
            },
            archives: {
                view: true,
                subMenu: { // Архивы
                    archiveOfFires: true, // Архив пожаров
                    editingForms6: true, // Редактирование форм 6
                    cards: true, // Карточки пожаров
                    warNotes: true // Строевые записки
                }
            },
            warNotes: { // Строевые записки
                view: true,
                subMenu: { // Архивы
                    frontNotesOfPCH: true, // Строевые записки ПЧ
                    frontForGarrison: true, // Строевая за гарнизон
                    equipment: true, // Оборудование
                    protocol: true, // Протокол
                    officials: true, // Должностные лица
                    inCalculationAll: true, // В расчет все
                    disableAll: true // Выкл все
                }
            },
            bridges: true, // Мосты
            hydrants: true // Гидранты
        },
        map: true, // Карта справа от основного меню
        messages: true, // Сообщения справа от основного меню
        selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
        cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
        stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
        fastCommandLine: true, // Строка для ввода команд
        fastAdditionOfCars: true, // Строка быстрого добавления машин
        showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
        states: {
            frontNotes: {
                engineCondition: true // Кнопка "Состояние техники"
            },
            firebase: {
                fireCommands: true, // Команды для активного пожара
                buttons: {
                    firstStvol: true, // Кнопка подача первого ствола
                    LOG: true, // Кнопка ЛОГ
                    cancelTheOrder: true, // Кнопка Аннулировать заявку
                    specialTechnique: true, // Кнопки - Катер, Вертолет, Самолет
                    approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                    rankButtons: true, // Кнопки изменения ранга пожара
                    modifiersButtons: true // Кнопка Модификаторы
                }
            },
            newOrder: {
                buttons: {
                    unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                }
            },
            newFireCard: {
                fireCommands: true, // Команды для активного пожара
                buttons: {
                    recordingACall: true, // Кнопка Запись звонка
                    dialer: true, // Кнопка Дозвон
                    operator112: true, // Кнопка Оператор 112
                    stages: true, // Кнопка Этапы
                    removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                    listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                    unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                }
            },
            order: {
                editOrderButton: true, // Кнопка редактировать заявку
                tabs: {
                    notification: true, // Вкладка Оповещение
                    informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                },
                buttons: {
                    recordingACall: true, // Кнопка Запись звонка
                    dialer: true, // Кнопка Дозвон
                    operator112: true, // Кнопка Оператор 112
                    stages: true, // Кнопка Этапы
                    removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                    listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                    unloadingToTheStaffTable: false, // Кнопка Выгрузка в штабной стол
                    sendToLO: true // Кнопка Отправить в ЛО

                }
            },
            docs: {
                select: {
                    selectType: true, // Дропдаун - Выберите тип
                    chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                    chooseTheUser: true // Дропдаун - Выберите пользователя
                },
                reports: {
                    fir_10: true
                }
            },
            dept: {
                canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                showDeptList: true, // Отображать список департаментов.
                buttons: {
                    saveCaraul: true, // Кнопка Сохранить (караул)
                    closeDept: true, // Кнопка Закрыть
                    isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                    unloading: false // Кнопка Выгрузить
                }
            },
            protocol: {
                buttons: {
                    editTime: false // Кнопка редактирования времени в протоколе
                }
            }
        }

    },

    investigatorsAdmin: {
        role: 'Старший дознователь',
        isPCH: false, // Для правильного определения роли
        words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
            pch: 'ПЧ',
            frontNotes: 'Строевые записки',
            fireDept: 'Пожарная часть',
            pchEngine: 'ПЧ/ТИП/Гос№',
            fire: 'Пожар',
            fires: 'Пожары',
            incidents: 'пожаров',
            fireDepartment: 'Пожарная',
            fireDeptSel: 'Пожарную',
            fireEquipment: 'Пожарные части',
            OFPS: 'ОФПС',
            UPO: 'УПО',
            OPO: 'ОПО',
            'прибыла': 'прибыла',
            region: 'ЛО'

        },
        fireInfo: { // Верхняя строка информации о пожаре
            guard: true,
            number: true,
            address: true,
            state: true,
            externalSystem: true,
            pch: true,
            district: true,
            rank: true,
            type: true
        },
        mapStyles: { // Настройки для карты
            fireIcon: '\uf06d'
        },
        commonSwitches: { // Общие выключатели на весь комплекс
            rank: true, //Ранг
            rankMax: true, // Максимальный ранг
            modifiers: true, // Модификаторы
            firstTrunk: true, // Первый ствол
            LOG: true, // ЛОГ
            PO: true, // ПО
            GZDS: true, // ГЗДС
            halfAG: true, // 1/2/AG
            warehousePO: true, // ПО на складе
            SPT: true //СПТ

        },
        fireList: { // В таблице со списком пожаров
            rank: true,
            rankMax: true,
        },
        wrappers: { // Подложки дизайна
            selectedFireInfo: true, // Подложка для информации о выбранном пожаре
            fastCommandLine: true, // Подложка для строки поиска
            fastAdditionOfCars: true // Строка быстрого добавления машин
        },
        fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
            NZ: true, // Комманда"НЗ"
            SZ: true, // Комманда"СЗ"
            ST: true, // Комманда"СТ"
            NT: true, // Комманда"НТ"
            KR: true, // Комманда"КР"
            messages: true // Сообщение
        },
        mainMenu: { // Основоное меню

            fires: true, // Пожары
            newApplication: true, // Новая заявка
            technique: true, // Техника
            documentation: { // Документы
                view: true,
                subMenu: { // Архивы
                    reports: true, // Отчеты
                    downloadFromSHS: false // Загрузить из ШС
                }
            },
            archives: {
                view: true,
                subMenu: { // Архивы
                    archiveOfFires: true, // Архив пожаров
                    editingForms6: true, // Редактирование форм 6
                    cards: false, // Карточки пожаров
                    warNotes: true // Строевые записки
                }
            },
            warNotes: { // Строевые записки
                view: true,
                subMenu: { // Архивы
                    frontNotesOfPCH: true, // Строевые записки ПЧ
                    frontForGarrison: true, // Строевая за гарнизон
                    equipment: true, // Оборудование
                    protocol: true, // Протокол
                    officials: true, // Должностные лица
                    inCalculationAll: true, // В расчет все
                    disableAll: true // Выкл все
                }
            },
            bridges: true, // Мосты
            hydrants: true // Гидранты

        },
        map: true, // Карта справа от основного меню
        messages: true, // Сообщения справа от основного меню
        selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
        cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
        stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
        fastCommandLine: true, // Строка для ввода команд
        fastAdditionOfCars: true, // Строка быстрого добавления машин
        showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
        states: {
            frontNotes: {
                engineCondition: true // Кнопка "Состояние техники"
            },
            firebase: {
                fireCommands: true, // Команды для активного пожара
                buttons: {
                    firstStvol: true, // Кнопка подача первого ствола
                    LOG: true, // Кнопка ЛОГ
                    cancelTheOrder: true, // Кнопка Аннулировать заявку
                    specialTechnique: true, // Кнопки - Катер, Вертолет, Самолет
                    approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                    rankButtons: true, // Кнопки изменения ранга пожара
                    modifiersButtons: true // Кнопка Модификаторы
                }
            },
            newFireCard: {
                fireCommands: true, // Команды для активного пожара
                buttons: {
                    recordingACall: true, // Кнопка Запись звонка
                    dialer: true, // Кнопка Дозвон
                    operator112: true, // Кнопка Оператор 112
                    stages: true, // Кнопка Этапы
                    removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                    listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                    unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                }
            },
            newOrder: {
                buttons: {
                    unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                }
            },
            order: {
                editOrderButton: true, // Кнопка редактировать заявку
                tabs: {
                    notification: true, // Вкладка Оповещение
                    informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                },
                buttons: {
                    recordingACall: true, // Кнопка Запись звонка
                    dialer: true, // Кнопка Дозвон
                    operator112: true, // Кнопка Оператор 112
                    stages: true, // Кнопка Этапы
                    removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                    listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                    unloadingToTheStaffTable: false, // Кнопка Выгрузка в штабной стол
                    sendToLO: true // Кнопка Отправить в ЛО

                }
            },
            docs: {
                select: {
                    selectType: true, // Дропдаун - Выберите тип
                    chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                    chooseTheUser: true // Дропдаун - Выберите пользователя
                },
                reports: {
                    fir_10: true
                }

            },
            dept: {
                canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                showDeptList: true, // Отображать список департаментов.
                buttons: {
                    saveCaraul: true, // Кнопка Сохранить (караул)
                    closeDept: true, // Кнопка Закрыть
                    isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                    unloading: false // Кнопка Выгрузить
                }
            },
            protocol: {
                buttons: {
                    editTime: false // Кнопка редактирования времени в протоколе
                }
            }
        }

    },

    investigators: {
        role: 'Дознователь',
        isPCH: false, // Для правильного определения роли
        words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
            pch: 'ПЧ',
            frontNotes: 'Строевые записки',
            fireDept: 'Пожарная часть',
            pchEngine: 'ПЧ/ТИП/Гос№',
            fire: 'Пожар',
            fires: 'Пожары',
            incidents: 'пожаров',
            fireDepartment: 'Пожарная',
            fireDeptSel: 'Пожарную',
            fireEquipment: 'Пожарные части',
            OFPS: 'ОФПС',
            UPO: 'УПО',
            OPO: 'ОПО',
            'прибыла': 'прибыла',
            region: 'ЛО'

        },
        fireInfo: { // Верхняя строка информации о пожаре
            guard: true,
            number: true,
            address: true,
            state: true,
            externalSystem: true,
            pch: true,
            district: true,
            rank: true,
            type: true
        },
        mapStyles: { // Настройки для карты
            fireIcon: '\uf06d'
        },
        commonSwitches: { // Общие выключатели на весь комплекс
            rank: true, //Ранг
            rankMax: true, // Максимальный ранг
            modifiers: true, // Модификаторы
            firstTrunk: true, // Первый ствол
            LOG: true, // ЛОГ
            PO: true, // ПО
            GZDS: true, // ГЗДС
            halfAG: true, // 1/2/AG
            warehousePO: true, // ПО на складе
            SPT: true //СПТ

        },
        fireList: { // В таблице со списком пожаров
            rank: true,
            rankMax: true,
        },
        wrappers: { // Подложки дизайна
            selectedFireInfo: false, // Подложка для информации о выбранном пожаре
            fastCommandLine: false, // Подложка для строки поиска
            fastAdditionOfCars: false // Строка быстрого добавления машин
        },
        fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
            NZ: true, // Комманда"НЗ"
            SZ: true, // Комманда"СЗ"
            ST: true, // Комманда"СТ"
            NT: true, // Комманда"НТ"
            KR: true, // Комманда"КР"
            messages: true // Сообщение
        },
        mainMenu: { // Основоное меню

            fires: false, // Пожары
            newApplication: false, // Новая заявка
            technique: false, // Техника
            documentation: { // Документы
                view: false,
                subMenu: { // Архивы
                    reports: false, // Отчеты
                    downloadFromSHS: false // Загрузить из ШС
                }
            },
            archives: {
                view: false,
                subMenu: { // Архивы
                    archiveOfFires: false, // Архив пожаров
                    editingForms6: false, // Редактирование форм 6
                    cards: false, // Карточки пожаров
                    warNotes: false // Строевые записки
                }
            },
            warNotes: { // Строевые записки
                view: false,
                subMenu: { // Архивы
                    frontNotesOfPCH: false, // Строевые записки ПЧ
                    frontForGarrison: false, // Строевая за гарнизон
                    equipment: false, // Оборудование
                    protocol: false, // Протокол
                    officials: false, // Должностные лица
                    inCalculationAll: false, // В расчет все
                    disableAll: false // Выкл все
                }
            },
            bridges: false, // Мосты
            hydrants: false // Гидранты
        },
        map: false, // Карта справа от основного меню
        messages: false, // Сообщения справа от основного меню
        selectedFireInfo: false, // Верхняя инфо-панель о выбранном пожаре
        cards112Alert: false, // Кнопка информирующая о поступлении карточки от 112
        stateProvider: 'fires.formaedit', // State на котором окажется пользователь после входа
        fastCommandLine: false, // Строка для ввода команд
        fastAdditionOfCars: false, // Строка быстрого добавления машин
        showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
        states: {
            frontNotes: {
                engineCondition: true // Кнопка "Состояние техники"
            },
            firebase: {
                fireCommands: false, // Команды для активного пожара
                buttons: {
                    firstStvol: true, // Кнопка подача первого ствола
                    LOG: true, // Кнопка ЛОГ
                    cancelTheOrder: false, // Кнопка Аннулировать заявку
                    specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                    approveButtonBlock: false, // Кнопки - 02, 03, 04, АТ, ЖКХ
                    rankButtons: false, // Кнопки изменения ранга пожара
                    modifiersButtons: false // Кнопка Модификаторы
                }
            },
            newFireCard: {
                fireCommands: false, // Команды для активного пожара
                buttons: {
                    recordingACall: false, // Кнопка Запись звонка
                    dialer: false, // Кнопка Дозвон
                    operator112: false, // Кнопка Оператор 112
                    stages: false, // Кнопка Этапы
                    removeEngineFromFire: false, // Кнопка отмены выезда машины на пожар
                    listNotRecruitedTechnicians: false, // Кнопки донабора техники на пожар
                    unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                }

            },
            newOrder: {
                buttons: {
                    unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                }
            },
            order: {
                editOrderButton: false, // Кнопка редактировать заявку
                tabs: {
                    notification: false, // Вкладка Оповещение
                    informationOfExternalSystem: false // Вкладка Инф.Внеш.Сист
                },
                buttons: {
                    recordingACall: false, // Кнопка Запись звонка
                    dialer: false, // Кнопка Дозвон
                    operator112: false, // Кнопка Оператор 112
                    stages: false, // Кнопка Этапы
                    removeEngineFromFire: false, // Кнопка отмены выезда машины на пожар
                    listNotRecruitedTechnicians: false, // Кнопки донабора техники на пожар
                    unloadingToTheStaffTable: false, // Кнопка Выгрузка в штабной стол
                    sendToLO: true // Кнопка Отправить в ЛО

                }
            },
            docs: {
                select: {
                    selectType: false, // Дропдаун - Выберите тип
                    chooseNumberOfGuard: false, // Дропдаун - Выберите тип
                    chooseTheUser: false // Дропдаун - Выберите пользователя
                },
                reports: {
                    fir_10: true
                }
            },
            dept: {
                canSaveCaraulDept: false, // Возможность редактирования Строевой записки.
                showDeptList: false, // Отображать список департаментов.
                buttons: {
                    saveCaraul: false, // Кнопка Сохранить (караул)
                    closeDept: false, // Кнопка Закрыть
                    isDeptNeedToSaveCaraul: false, // Кнопка смена караула
                    unloading: false // Кнопка Выгрузить
                }
            },
            protocol: {
                buttons: {
                    editTime: false // Кнопка редактирования времени в протоколе
                }
            }
        }

    },

    pch: {
        role: 'Пожарная часть',
        isPCH: true, // Для правильного определения роли
        words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
            pch: 'ПЧ',
            frontNotes: 'Строевая записка',
            fire: 'Пожар',
            fires: 'Пожары',
            incidents: 'пожаров',
            fireDepartment: 'Пожарная',
            fireDeptSel: 'Пожарную',
            fireEquipment: 'Пожарные части',
            OFPS: 'ОФПС',
            UPO: 'УПО',
            OPO: 'ОПО',
            'прибыла': 'прибыла',
            region: 'ЛО'

        },
        fireInfo: { // Верхняя строка информации о пожаре
            guard: true,
            number: true,
            address: true,
            state: true,
            externalSystem: true,
            pch: true,
            district: true,
            rank: true,
            type: true
        },
        mapStyles: { // Настройки для карты
            fireIcon: '\uf06d'
        },
        commonSwitches: { // Общие выключатели на весь комплекс
            rank: true, //Ранг
            rankMax: true, // Максимальный ранг
            modifiers: true, // Модификаторы
            firstTrunk: true, // Первый ствол
            LOG: true, // ЛОГ
            PO: true, // ПО
            GZDS: true, // ГЗДС
            halfAG: true, // 1/2/AG
            warehousePO: true, // ПО на складе
            SPT: true //СПТ

        },
        fireList: { // В таблице со списком пожаров
            rank: true,
            rankMax: true,
        },
        wrappers: { // Подложки дизайна
            selectedFireInfo: true, // Подложка для информации о выбранном пожаре
            fastCommandLine: true, // Подложка для строки поиска
            fastAdditionOfCars: false // Строка быстрого добавления машин
        },
        fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР, сообщения"
            NZ: false, // Комманда"НЗ"
            SZ: false, // Комманда"СЗ"
            ST: false, // Комманда"СТ"
            NT: false, // Комманда"НТ"
            KR: false, // Комманда"КР"
            messages: true // Сообщение
        },
        mainMenu: { // Основоное меню
            fires: true, // Пожары
            newApplication: false, // Новая заявка
            technique: false, // Техника
            documentation: { // Документы
                view: true,
                subMenu: { // Архивы
                    reports: true, // Отчеты
                    downloadFromSHS: true // Загрузить из ШС
                }
            },
            archives: {
                view: true,
                subMenu: { // Архивы
                    archiveOfFires: true, // Архив пожаров
                    editingForms6: true, // Редактирование форм 6
                    cards: false, // Карточки пожаров
                    warNotes: false // Строевые записки
                }
            },
            warNotes: { // Строевые записки
                view: true,
                subMenu: { // Архивы
                    frontNotesOfPCH: false, // Строевые записки ПЧ
                    frontForGarrison: false, // Строевая за гарнизон
                    equipment: false, // Оборудование
                    protocol: false, // Протокол
                    officials: false, // Должностные лица
                    inCalculationAll: false, // В расчет все
                    disableAll: false // Выкл все
                }
            },
            bridges: true, // Мосты
            hydrants: false // Гидранты
        },
        map: true, // Карта справа от основного меню
        messages: false, // Сообщения справа от основного меню
        selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
        cards112Alert: false, // Кнопка информирующая о поступлении карточки от 112
        stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
        fastCommandLine: true, // Строка для ввода команд
        fastAdditionOfCars: false, // Строка быстрого добавления машин
        showPCHnumber: true, // Отображение Номера ПЧ в верхней инфо-панеле
        states: {
            frontNotes: {
                engineCondition: false // Кнопка "Состояние техники"
            },
            firebase: {
                fireCommands: true, // Команды для активного пожара
                buttons: {
                    cancelTheOrder: false, // Кнопка Аннулировать заявку
                    specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                    approveButtonBlock: false, // Кнопки - 02, 03, 04, АТ, ЖКХ
                    rankButtons: false, // Кнопки изменения ранга пожара
                    modifiersButtons: false // Кнопка Модификаторы
                }
            },
            newFireCard: {
                fireCommands: true, // Команды для активного пожара
                buttons: {
                    recordingACall: false, // Кнопка Запись звонка
                    dialer: false, // Кнопка Дозвон
                    operator112: false, // Кнопка Оператор 112
                    stages: false, // Кнопка Этапы
                    removeEngineFromFire: false, // Кнопка отмены выезда машины на пожар
                    listNotRecruitedTechnicians: false, // Кнопки донабора техники на пожар
                    unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                }
            },
            newOrder: {
                buttons: {
                    unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                }
            },
            order: {
                editOrderButton: false, // Кнопка редактировать заявку
                tabs: {
                    notification: false, // Вкладка Оповещение
                    informationOfExternalSystem: false // Вкладка Инф.Внеш.Сист
                },
                buttons: {
                    recordingACall: false, // Кнопка Запись звонка
                    dialer: false, // Кнопка Дозвон
                    operator112: false, // Кнопка Оператор 112
                    stages: false, // Кнопка Этапы
                    removeEngineFromFire: false, // Кнопка отмены выезда машины на пожар
                    listNotRecruitedTechnicians: false, // Кнопки донабора техники на пожар
                    unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                    sendToLO: true // Кнопка Отправить в ЛО

                }
            },
            docs: {
                select: {
                    selectType: false, // Дропдаун - Выберите тип
                    chooseNumberOfGuard: false, // Дропдаун - Выберите тип
                    chooseTheUser: false // Дропдаун - Выберите пользователя
                },
                reports: {
                    fir_10: true
                }
            },
            dept: {
                canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                showDeptList: false, // Отображать список департаментов.
                buttons: {
                    saveCaraul: true, // Кнопка Сохранить (караул)
                    closeDept: false, // Кнопка Закрыть
                    isDeptNeedToSaveCaraul: false, // Кнопка смена караула
                    unloading: true // Кнопка Выгрузить
                }
            },
            protocol: {
                buttons: {
                    editTime: false // Кнопка редактирования времени в протоколе
                }
            }
        }
    },

    superadmins: {
        isPCH: false, // Для правильного определения роли
        words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
            pch: 'ПЧ',
            frontNotes: 'Строевые записки',
            fireDept: 'Пожарная часть',
            pchEngine: 'ПЧ/ТИП/Гос№',
            fire: 'Пожар',
            fires: 'Пожары',
            incidents: 'пожаров',
            fireDepartment: 'Пожарная',
            fireDeptSel: 'Пожарную',
            fireEquipment: 'Пожарные части',
            OFPS: 'ОФПС',
            UPO: 'УПО',
            OPO: 'ОПО',
            'прибыла': 'прибыла',
            region: 'ЛО'

        },
        fireInfo: { // Верхняя строка информации о пожаре
            guard: true,
            number: true,
            address: true,
            state: true,
            externalSystem: true,
            pch: true,
            district: true,
            rank: true,
            type: true
        },
        mapStyles: { // Настройки для карты
            fireIcon: '\uf06d'
        },
        commonSwitches: { // Общие выключатели на весь комплекс
            rank: true, //Ранг
            rankMax: true, // Максимальный ранг
            modifiers: true, // Модификаторы
            firstTrunk: true, // Первый ствол
            LOG: true, // ЛОГ
            PO: true, // ПО
            GZDS: true, // ГЗДС
            halfAG: true, // 1/2/AG
            warehousePO: true, // ПО на складе
            SPT: true //СПТ


        },
        fireList: { // В таблице со списком пожаров
            rank: true,
            rankMax: true,
        },
        wrappers: { // Подложки дизайна
            selectedFireInfo: true, // Подложка для информации о выбранном пожаре
            fastCommandLine: false, // Подложка для строки поиска
            fastAdditionOfCars: false // Строка быстрого добавления машин
        },
        fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
            NZ: true, // Комманда"НЗ"
            SZ: true, // Комманда"СЗ"
            ST: true, // Комманда"СТ"
            NT: true, // Комманда"НТ"
            KR: true, // Комманда"КР"
            messages: true // Сообщение
        },
        mainMenu: { // Основоное меню

            fires: false, // Пожары
            newApplication: false, // Новая заявка
            technique: false, // Техника
            documentation: { // Документы
                view: false,
                subMenu: { // Архивы
                    reports: false, // Отчеты
                    downloadFromSHS: false // Загрузить из ШС
                }
            },
            archives: {
                view: false,
                subMenu: { // Архивы
                    archiveOfFires: false, // Архив пожаров
                    editingForms6: false, // Редактирование форм 6
                    cards: false, // Карточки пожаров
                    warNotes: false // Строевые записки
                }
            },
            warNotes: { // Строевые записки
                view: false,
                subMenu: { // Архивы
                    frontNotesOfPCH: false, // Строевые записки ПЧ
                    frontForGarrison: false, // Строевая за гарнизон
                    equipment: false, // Оборудование
                    protocol: false, // Протокол
                    officials: false, // Должностные лица
                    inCalculationAll: false, // В расчет все
                    disableAll: false // Выкл все
                }
            },
            bridges: false, // Мосты
            hydrants: false // Гидранты
        },
        map: false, // Карта справа от основного меню
        messages: false, // Сообщения справа от основного меню
        selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
        cards112Alert: false, // Кнопка информирующая о поступлении карточки от 112
        stateProvider: 'admin.base', // State на котором окажется пользователь после входа
        fastCommandLine: false, // Строка для ввода команд
        fastAdditionOfCars: false, // Строка быстрого добавления машин
        showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
        states: {
            firebase: {
                fireCommands: true, // Команды для активного пожара
                buttons: {
                    firstStvol: true, // Кнопка подача первого ствола
                    LOG: true, // Кнопка ЛОГ
                    cancelTheOrder: false, // Кнопка Аннулировать заявку
                    specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                    approveButtonBlock: false, // Кнопки - 02, 03, 04, АТ, ЖКХ
                    rankButtons: false, // Кнопки изменения ранга пожара
                    modifiersButtons: false // Кнопка Модификаторы
                }
            },
            newFireCard: {
                fireCommands: true, // Команды для активного пожара
            },
            newOrder: {
                buttons: {
                    unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                }
            },
            order: {
                editOrderButton: false, // Кнопка редактировать заявку
                tabs: {
                    notification: false, // Вкладка Оповещение
                    informationOfExternalSystem: false // Вкладка Инф.Внеш.Сист
                },
                buttons: {
                    recordingACall: false, // Кнопка Запись звонка
                    dialer: false, // Кнопка Дозвон
                    operator112: false, // Кнопка Оператор 112
                    stages: false, // Кнопка Этапы
                    removeEngineFromFire: false, // Кнопка отмены выезда машины на пожар
                    listNotRecruitedTechnicians: false, // Кнопки донабора техники на пожар
                    unloadingToTheStaffTable: false, // Кнопка Выгрузка в штабной стол
                    sendToLO: false // Кнопка Отправить в ЛО
                }
            },
            docs: {
                select: {
                    selectType: false, // Дропдаун - Выберите тип
                    chooseNumberOfGuard: false, // Дропдаун - Выберите тип
                    chooseTheUser: false // Дропдаун - Выберите пользователя
                },
                reports: {
                    fir_10: true
                }
            },
            dept: {
                canSaveCaraulDept: false, // Возможность редактирования Строевой записки.
                showDeptList: false, // Отображать список департаментов.
                buttons: {
                    saveCaraul: false, // Кнопка Сохранить (караул)
                    closeDept: false, // Кнопка Закрыть
                    isDeptNeedToSaveCaraul: false, // Кнопка смена караула
                    unloading: false // Кнопка Выгрузить
                }
            },
            protocol: {
                buttons: {
                    editTime: false // Кнопка редактирования времени в протоколе
                }
            }
        }

    },

    /*



     TODO: Ветка для узбекистана



     */

    'Узбекистан': {
        role: 'Узбекистан',
        isPCH: false, // Для правильного определения роли
        words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
            pch: 'СЧ',
            frontNotes: 'Строевые записки',
            fireDept: 'Спасательная часть',
            pchEngine: 'СЧ/ТИП/Гос№',
            fire: 'Происшествие',
            fires: 'Происшествия',
            incidents: 'происшествий',
            fireDepartment: 'Спасательная',
            fireDeptSel: 'Спасательную',
            fireEquipment: 'Спасательные части',
            OFPS: 'СО',
            UPO: 'СО',
            OPO: 'СО',
            'прибыла': 'прибыла',
            region: 'Обл.'
        },
        fireInfo: { // Верхняя строка информации о пожаре
            guard: true,
            number: true,
            pchNumber: true,
            address: true,
            state: true,
            externalSystem: true,
            pch: true,
            district: true,
            rank: false,
            type: true
        },
        mapStyles: { // Настройки для карты
            fireIcon: '\uf0ad'
        },
        commonSwitches: { // Общие выключатели на весь комплекс
            rank: false, //Ранг
            rankMax: false, // Максимальный ранг
            modifiers: false, // Модификаторы
            firstTrunk: false, // Первый ствол
            LOG: false, // ЛОГ
            PO: false, // ПО
            GZDS: false, // ГЗДС
            halfAG: false, // 1/2/AG
            warehousePO: false, // ПО на складе
            SPT: false //СПТ
        },
        fireList: { // В таблице со списком пожаров
            rank: false,
            rankMax: false,
        },
        wrappers: { // Подложки дизайна
            selectedFireInfo: true, // Подложка для информации о выбранном пожаре
            fastCommandLine: true, // Подложка для строки поиска
            fastAdditionOfCars: true // Строка быстрого добавления машин
        },
        fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
            NZ: true, // Комманда"НЗ"
            SZ: true, // Комманда"СЗ"
            ST: true, // Комманда"СТ"
            NT: true, // Комманда"НТ"
            KR: true, // Комманда"КР"
            messages: true // Сообщение
        },
        mainMenu: { // Основоное меню

            fires: true, // Пожары
            newApplication: true, // Новая заявка
            technique: true, // Техника
            documentation: { // Документы
                view: true,
                subMenu: { // Архивы
                    reports: true, // Отчеты
                    downloadFromSHS: false // Загрузить из ШС
                }
            },
            archives: {
                view: true,
                subMenu: { // Архивы
                    archiveOfFires: true, // Архив пожаров
                    editingForms6: true, // Редактирование форм 6
                    cards: true, // Карточки пожаров
                    warNotes: true // Строевые записки
                }
            },
            warNotes: { // Строевые записки
                view: true,
                subMenu: { // Архивы
                    frontNotesOfPCH: true, // Строевые записки ПЧ
                    frontForGarrison: true, // Строевая за гарнизон
                    equipment: true, // Оборудование
                    protocol: true, // Протокол
                    officials: true, // Должностные лица
                    inCalculationAll: true, // В расчет все
                    disableAll: true // Выкл все
                }
            },
            bridges: false, // Мосты
            hydrants: false // Гидранты
        },
        map: true, // Карта справа от основного меню
        messages: true, // Сообщения справа от основного меню
        selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
        cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
        stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
        fastCommandLine: true, // Строка для ввода команд
        fastAdditionOfCars: true, // Строка быстрого добавления машин
        showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
        states: {
            frontNotes: {
                engineCondition: true // Кнопка "Состояние техники"
            },
            firebase: {
                fireCommands: true, // Команды для активного пожара
                buttons: {
                    firstStvol: false, // Кнопка подача первого ствола
                    LOG: false, // Кнопка ЛОГ
                    cancelTheOrder: true, // Кнопка Аннулировать заявку
                    specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                    approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                    rankButtons: false, // Кнопки изменения ранга пожара
                    modifiersButtons: false // Кнопка Модификаторы
                }
            },
            newFireCard: {
                fireCommands: true, // Команды для активного пожара
                buttons: {
                    recordingACall: true, // Кнопка Запись звонка
                    dialer: true, // Кнопка Дозвон
                    operator112: false, // Кнопка Оператор 112
                    stages: false, // Кнопка Этапы
                    removeEngineFromFire: false, // Кнопка отмены выезда машины на пожар
                    listNotRecruitedTechnicians: false, // Кнопки донабора техники на пожар
                    unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                }

            },

            newOrder: {
                buttons: {
                    unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                }
            },
            order: {
                editOrderButton: true, // Кнопка редактировать заявку
                tabs: {
                    notification: true, // Вкладка Оповещение
                    informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                },
                buttons: {
                    recordingACall: true, // Кнопка Запись звонка
                    dialer: true, // Кнопка Дозвон
                    operator112: true, // Кнопка Оператор 112
                    stages: true, // Кнопка Этапы
                    removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                    listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                    unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                    sendToLO: false // Кнопка Отправить в ЛО
                }
            },
            docs: {
                select: {
                    selectType: true, // Дропдаун - Выберите тип
                    chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                    chooseTheUser: true // Дропдаун - Выберите пользователя
                },
                reports: {
                    fir_10: false
                }
            },
            dept: {
                canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                showDeptList: true, // Отображать список департаментов.
                buttons: {
                    saveCaraul: true, // Кнопка Сохранить (караул)
                    closeDept: true, // Кнопка Закрыть
                    isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                    unloading: false // Кнопка Выгрузить
                }
            },
            protocol: {
                buttons: {
                    editTime: false // Кнопка редактирования времени в протоколе
                }
            }
        },

        superadmins: {
            isPCH: false, // Для правильного определения роли
            words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                pch: 'ПЧ',
                frontNotes: 'Строевые записки',
                fireDept: 'Пожарная часть',
                pchEngine: 'ПЧ/ТИП/Гос№',
                fire: 'Пожар',
                fires: 'Пожары',
                incidents: 'пожаров',
                fireDepartment: 'Пожарная',
                fireDeptSel: 'Пожарную',
                fireEquipment: 'Пожарные части',
                OFPS: 'ОФПС',
                UPO: 'УПО',
                OPO: 'ОПО',
                'прибыла': 'прибыла',
                region: 'ЛО'

            },
            fireInfo: { // Верхняя строка информации о пожаре
                guard: true,
                number: true,
                address: true,
                state: true,
                externalSystem: true,
                pch: true,
                district: true,
                rank: true,
                type: true
            },
            mapStyles: { // Настройки для карты
                fireIcon: '\uf06d'
            },
            commonSwitches: { // Общие выключатели на весь комплекс
                rank: true, //Ранг
                rankMax: true, // Максимальный ранг
                modifiers: true, // Модификаторы
                firstTrunk: true, // Первый ствол
                LOG: true, // ЛОГ
                PO: true, // ПО
                GZDS: true, // ГЗДС
                halfAG: true, // 1/2/AG
                warehousePO: true, // ПО на складе
                SPT: true //СПТ


            },
            fireList: { // В таблице со списком пожаров
                rank: true,
                rankMax: true,
            },
            wrappers: { // Подложки дизайна
                selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                fastCommandLine: false, // Подложка для строки поиска
                fastAdditionOfCars: false // Строка быстрого добавления машин
            },
            fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                NZ: true, // Комманда"НЗ"
                SZ: true, // Комманда"СЗ"
                ST: true, // Комманда"СТ"
                NT: true, // Комманда"НТ"
                KR: true, // Комманда"КР"
                messages: true // Сообщение
            },
            mainMenu: { // Основоное меню

                fires: false, // Пожары
                newApplication: false, // Новая заявка
                technique: false, // Техника
                documentation: { // Документы
                    view: false,
                    subMenu: { // Архивы
                        reports: false, // Отчеты
                        downloadFromSHS: false // Загрузить из ШС
                    }
                },
                archives: {
                    view: false,
                    subMenu: { // Архивы
                        archiveOfFires: false, // Архив пожаров
                        editingForms6: false, // Редактирование форм 6
                        cards: false, // Карточки пожаров
                        warNotes: false // Строевые записки
                    }
                },
                warNotes: { // Строевые записки
                    view: false,
                    subMenu: { // Архивы
                        frontNotesOfPCH: false, // Строевые записки ПЧ
                        frontForGarrison: false, // Строевая за гарнизон
                        equipment: false, // Оборудование
                        protocol: false, // Протокол
                        officials: false, // Должностные лица
                        inCalculationAll: false, // В расчет все
                        disableAll: false // Выкл все
                    }
                },
                bridges: false, // Мосты
                hydrants: false // Гидранты
            },
            map: false, // Карта справа от основного меню
            messages: false, // Сообщения справа от основного меню
            selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
            cards112Alert: false, // Кнопка информирующая о поступлении карточки от 112
            stateProvider: 'admin.base', // State на котором окажется пользователь после входа
            fastCommandLine: false, // Строка для ввода команд
            fastAdditionOfCars: false, // Строка быстрого добавления машин
            showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
            states: {
                firebase: {
                    fireCommands: true, // Команды для активного пожара
                    buttons: {
                        firstStvol: true, // Кнопка подача первого ствола
                        LOG: true, // Кнопка ЛОГ
                        cancelTheOrder: false, // Кнопка Аннулировать заявку
                        specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                        approveButtonBlock: false, // Кнопки - 02, 03, 04, АТ, ЖКХ
                        rankButtons: false, // Кнопки изменения ранга пожара
                        modifiersButtons: false // Кнопка Модификаторы
                    }
                },
                newFireCard: {
                    fireCommands: true, // Команды для активного пожара
                },
                newOrder: {
                    buttons: {
                        unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                    }
                },
                order: {
                    editOrderButton: false, // Кнопка редактировать заявку
                    tabs: {
                        notification: false, // Вкладка Оповещение
                        informationOfExternalSystem: false // Вкладка Инф.Внеш.Сист
                    },
                    buttons: {
                        recordingACall: false, // Кнопка Запись звонка
                        dialer: false, // Кнопка Дозвон
                        operator112: false, // Кнопка Оператор 112
                        stages: false, // Кнопка Этапы
                        removeEngineFromFire: false, // Кнопка отмены выезда машины на пожар
                        listNotRecruitedTechnicians: false, // Кнопки донабора техники на пожар
                        unloadingToTheStaffTable: false, // Кнопка Выгрузка в штабной стол
                        sendToLO: false // Кнопка Отправить в ЛО
                    }
                },
                docs: {
                    select: {
                        selectType: false, // Дропдаун - Выберите тип
                        chooseNumberOfGuard: false, // Дропдаун - Выберите тип
                        chooseTheUser: false // Дропдаун - Выберите пользователя
                    },
                    reports: {
                        fir_10: true
                    }
                },
                dept: {
                    canSaveCaraulDept: false, // Возможность редактирования Строевой записки.
                    showDeptList: false, // Отображать список департаментов.
                    buttons: {
                        saveCaraul: false, // Кнопка Сохранить (караул)
                        closeDept: false, // Кнопка Закрыть
                        isDeptNeedToSaveCaraul: false, // Кнопка смена караула
                        unloading: false // Кнопка Выгрузить
                    }
                },
                protocol: {
                    buttons: {
                        editTime: false // Кнопка редактирования времени в протоколе
                    }
                }
            }

        },

        dispatchers: {
            role: 'Диспетчер',
            isPCH: false, // Для правильного определения роли
            words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                pch: 'СЧ',
                frontNotes: 'Строевые записки',
                fireDept: 'Спасательная часть',
                pchEngine: 'СЧ/ТИП/Гос№',
                fire: 'Происшествие',
                fires: 'Происшествия',
                incidents: 'происшествий',
                fireDepartment: 'Спасательная',
                fireDeptSel: 'Спасательную',
                fireEquipment: 'Спасательные части',
                OFPS: 'СО',
                UPO: 'СО',
                OPO: 'СО',
                'прибыла': 'прибыла',
                region: 'Обл.'
            },
            fireInfo: { // Верхняя строка информации о пожаре
                guard: true,
                number: true,
                pchNumber: true,
                address: true,
                state: true,
                externalSystem: true,
                pch: true,
                district: true,
                rank: false,
                type: true
            },
            mapStyles: { // Настройки для карты
                fireIcon: '\uf0ad'
            },
            commonSwitches: { // Общие выключатели на весь комплекс
                rank: false, //Ранг
                rankMax: false, // Максимальный ранг
                modifiers: false, // Модификаторы
                firstTrunk: false, // Первый ствол
                LOG: false, // ЛОГ
                PO: false, // ПО
                GZDS: false, // ГЗДС
                halfAG: false, // 1/2/AG
                warehousePO: false, // ПО на складе
                SPT: false //СПТ
            },
            fireList: { // В таблице со списком пожаров
                rank: false,
                rankMax: false,
            },
            wrappers: { // Подложки дизайна
                selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                fastCommandLine: true, // Подложка для строки поиска
                fastAdditionOfCars: true // Строка быстрого добавления машин
            },
            fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                NZ: true, // Комманда"НЗ"
                SZ: true, // Комманда"СЗ"
                ST: true, // Комманда"СТ"
                NT: true, // Комманда"НТ"
                KR: true, // Комманда"КР"
                messages: true // Сообщение
            },
            mainMenu: { // Основоное меню

                fires: true, // Пожары
                newApplication: true, // Новая заявка
                technique: true, // Техника
                documentation: { // Документы
                    view: true,
                    subMenu: { // Архивы
                        reports: true, // Отчеты
                        downloadFromSHS: false // Загрузить из ШС
                    }
                },
                archives: {
                    view: true,
                    subMenu: { // Архивы
                        archiveOfFires: true, // Архив пожаров
                        editingForms6: true, // Редактирование форм 6
                        cards: true, // Карточки пожаров
                        warNotes: true // Строевые записки
                    }
                },
                warNotes: { // Строевые записки
                    view: true,
                    subMenu: { // Архивы
                        frontNotesOfPCH: true, // Строевые записки ПЧ
                        frontForGarrison: true, // Строевая за гарнизон
                        equipment: true, // Оборудование
                        protocol: true, // Протокол
                        officials: true, // Должностные лица
                        inCalculationAll: true, // В расчет все
                        disableAll: true // Выкл все
                    }
                },
                bridges: false, // Мосты
                hydrants: false // Гидранты
            },
            map: true, // Карта справа от основного меню
            messages: true, // Сообщения справа от основного меню
            selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
            cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
            stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
            fastCommandLine: true, // Строка для ввода команд
            fastAdditionOfCars: true, // Строка быстрого добавления машин
            showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
            states: {
                frontNotes: {
                    engineCondition: true // Кнопка "Состояние техники"
                },
                firebase: {
                    fireCommands: true, // Команды для активного пожара
                    buttons: {
                        firstStvol: false, // Кнопка подача первого ствола
                        LOG: false, // Кнопка ЛОГ
                        cancelTheOrder: true, // Кнопка Аннулировать заявку
                        specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                        approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                        rankButtons: false, // Кнопки изменения ранга пожара
                        modifiersButtons: false // Кнопка Модификаторы
                    }
                },
                newFireCard: {
                    fireCommands: true, // Команды для активного пожара
                    buttons: {
                        recordingACall: true, // Кнопка Запись звонка
                        dialer: true, // Кнопка Дозвон
                        operator112: false, // Кнопка Оператор 112
                        stages: true, // Кнопка Этапы
                        removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                        listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                        unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                    }
                },
                newOrder: {
                    buttons: {
                        unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                    }
                },
                order: {
                    editOrderButton: true, // Кнопка редактировать заявку
                    tabs: {
                        notification: true, // Вкладка Оповещение
                        informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                    },
                    buttons: {
                        recordingACall: true, // Кнопка Запись звонка
                        dialer: true, // Кнопка Дозвон
                        operator112: true, // Кнопка Оператор 112
                        stages: true, // Кнопка Этапы
                        removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                        listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                        unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                        sendToLO: false // Кнопка Отправить в ЛО
                    }
                },
                docs: {
                    select: {
                        selectType: true, // Дропдаун - Выберите тип
                        chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                        chooseTheUser: true // Дропдаун - Выберите пользователя
                    },
                    reports: {
                        fir_10: false
                    }
                },
                dept: {
                    canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                    showDeptList: true, // Отображать список департаментов.
                    buttons: {
                        saveCaraul: true, // Кнопка Сохранить (караул)
                        closeDept: true, // Кнопка Закрыть
                        isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                        unloading: false // Кнопка Выгрузить
                    }
                },
                protocol: {
                    buttons: {
                        editTime: false // Кнопка редактирования времени в протоколе
                    }
                }
            }
        },

        dispatchersManager: {
            role: 'Старший диспетчер',
            isPCH: false, // Для правильного определения роли
            words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                pch: 'СЧ',
                frontNotes: 'Строевые записки',
                fireDept: 'Спасательная часть',
                pchEngine: 'СЧ/ТИП/Гос№',
                fire: 'Происшествие',
                fires: 'Происшествия',
                incidents: 'происшествий',
                fireDepartment: 'Спасательная',
                fireDeptSel: 'Спасательную',
                fireEquipment: 'Спасательные части',
                OFPS: 'СО',
                UPO: 'СО',
                OPO: 'СО',
                'прибыла': 'прибыла',
                region: 'Обл.'
            },
            fireInfo: { // Верхняя строка информации о пожаре
                guard: true,
                number: true,
                pchNumber: true,
                address: true,
                state: true,
                externalSystem: true,
                pch: true,
                district: true,
                rank: false,
                type: true
            },
            mapStyles: { // Настройки для карты
                fireIcon: '\uf0ad'
            },
            commonSwitches: { // Общие выключатели на весь комплекс
                rank: false, //Ранг
                rankMax: false, // Максимальный ранг
                modifiers: false, // Модификаторы
                firstTrunk: false, // Первый ствол
                LOG: false, // ЛОГ
                PO: false, // ПО
                GZDS: false, // ГЗДС
                halfAG: false, // 1/2/AG
                warehousePO: false, // ПО на складе
                SPT: false //СПТ
            },
            fireList: { // В таблице со списком пожаров
                rank: false,
                rankMax: false,
            },
            wrappers: { // Подложки дизайна
                selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                fastCommandLine: true, // Подложка для строки поиска
                fastAdditionOfCars: true // Строка быстрого добавления машин
            },
            fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                NZ: true, // Комманда"НЗ"
                SZ: true, // Комманда"СЗ"
                ST: true, // Комманда"СТ"
                NT: true, // Комманда"НТ"
                KR: true, // Комманда"КР"
                messages: true // Сообщение
            },
            mainMenu: { // Основоное меню

                fires: true, // Пожары
                newApplication: true, // Новая заявка
                technique: true, // Техника
                documentation: { // Документы
                    view: true,
                    subMenu: { // Архивы
                        reports: true, // Отчеты
                        downloadFromSHS: false // Загрузить из ШС
                    }
                },
                archives: {
                    view: true,
                    subMenu: { // Архивы
                        archiveOfFires: true, // Архив пожаров
                        editingForms6: true, // Редактирование форм 6
                        cards: true, // Карточки пожаров
                        warNotes: true // Строевые записки
                    }
                },
                warNotes: { // Строевые записки
                    view: true,
                    subMenu: { // Архивы
                        frontNotesOfPCH: true, // Строевые записки ПЧ
                        frontForGarrison: true, // Строевая за гарнизон
                        equipment: true, // Оборудование
                        protocol: true, // Протокол
                        officials: true, // Должностные лица
                        inCalculationAll: true, // В расчет все
                        disableAll: true // Выкл все
                    }
                },
                bridges: false, // Мосты
                hydrants: false // Гидранты
            },
            map: true, // Карта справа от основного меню
            messages: true, // Сообщения справа от основного меню
            selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
            cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
            stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
            fastCommandLine: true, // Строка для ввода команд
            fastAdditionOfCars: true, // Строка быстрого добавления машин
            showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
            states: {
                frontNotes: {
                    engineCondition: true // Кнопка "Состояние техники"
                },
                firebase: {
                    fireCommands: true, // Команды для активного пожара
                    buttons: {
                        firstStvol: false, // Кнопка подача первого ствола
                        LOG: false, // Кнопка ЛОГ
                        cancelTheOrder: true, // Кнопка Аннулировать заявку
                        specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                        approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                        rankButtons: false, // Кнопки изменения ранга пожара
                        modifiersButtons: false // Кнопка Модификаторы
                    }
                },
                newFireCard: {
                    fireCommands: true, // Команды для активного пожара
                    buttons: {
                        recordingACall: true, // Кнопка Запись звонка
                        dialer: true, // Кнопка Дозвон
                        operator112: false, // Кнопка Оператор 112
                        stages: true, // Кнопка Этапы
                        removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                        listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                        unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                    }
                },
                newOrder: {
                    buttons: {
                        unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                    }
                },
                order: {
                    editOrderButton: true, // Кнопка редактировать заявку
                    tabs: {
                        notification: true, // Вкладка Оповещение
                        informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                    },
                    buttons: {
                        recordingACall: true, // Кнопка Запись звонка
                        dialer: true, // Кнопка Дозвон
                        operator112: true, // Кнопка Оператор 112
                        stages: true, // Кнопка Этапы
                        removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                        listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                        unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                        sendToLO: false // Кнопка Отправить в ЛО
                    }
                },
                docs: {
                    select: {
                        selectType: true, // Дропдаун - Выберите тип
                        chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                        chooseTheUser: true // Дропдаун - Выберите пользователя
                    },
                    reports: {
                        fir_10: false
                    }
                },
                dept: {
                    canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                    showDeptList: true, // Отображать список департаментов.
                    buttons: {
                        saveCaraul: true, // Кнопка Сохранить (караул)
                        closeDept: true, // Кнопка Закрыть
                        isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                        unloading: false // Кнопка Выгрузить
                    }
                },
                protocol: {
                    buttons: {
                        editTime: false // Кнопка редактирования времени в протоколе
                    }
                }
            }
        },

        'Республика Каракалпакстан': {
            dispatchers: {
                role: 'Диспетчер',
                isPCH: false, // Для правильного определения роли
                words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                    pch: 'СЧ',
                    frontNotes: 'Строевые записки',
                    fireDept: 'Спасательная часть',
                    pchEngine: 'СЧ/ТИП/Гос№',
                    fire: 'Происшествие',
                    fires: 'Происшествия',
                    incidents: 'происшествий',
                    fireDepartment: 'Спасательная',
                    fireDeptSel: 'Спасательную',
                    fireEquipment: 'Спасательные части',
                    OFPS: 'СО',
                    UPO: 'СО',
                    OPO: 'СО',
                    'прибыла': 'прибыла',
                    region: 'Обл.'
                },
                fireInfo: { // Верхняя строка информации о пожаре
                    guard: true,
                    number: true,
                    pchNumber: true,
                    address: true,
                    state: true,
                    externalSystem: true,
                    pch: true,
                    district: true,
                    rank: false,
                    type: true
                },
                mapStyles: { // Настройки для карты
                    fireIcon: '\uf0ad'
                },
                commonSwitches: { // Общие выключатели на весь комплекс
                    rank: false, //Ранг
                    rankMax: false, // Максимальный ранг
                    modifiers: false, // Модификаторы
                    firstTrunk: false, // Первый ствол
                    LOG: false, // ЛОГ
                    PO: false, // ПО
                    GZDS: false, // ГЗДС
                    halfAG: false, // 1/2/AG
                    warehousePO: false, // ПО на складе
                    SPT: false //СПТ
                },
                fireList: { // В таблице со списком пожаров
                    rank: false,
                    rankMax: false,
                },
                wrappers: { // Подложки дизайна
                    selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                    fastCommandLine: true, // Подложка для строки поиска
                    fastAdditionOfCars: true // Строка быстрого добавления машин
                },
                fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                    NZ: true, // Комманда"НЗ"
                    SZ: true, // Комманда"СЗ"
                    ST: true, // Комманда"СТ"
                    NT: true, // Комманда"НТ"
                    KR: true, // Комманда"КР"
                    messages: true // Сообщение
                },
                mainMenu: { // Основоное меню

                    fires: true, // Пожары
                    newApplication: true, // Новая заявка
                    technique: true, // Техника
                    documentation: { // Документы
                        view: true,
                        subMenu: { // Архивы
                            reports: true, // Отчеты
                            downloadFromSHS: false // Загрузить из ШС
                        }
                    },
                    archives: {
                        view: true,
                        subMenu: { // Архивы
                            archiveOfFires: true, // Архив пожаров
                            editingForms6: true, // Редактирование форм 6
                            cards: true, // Карточки пожаров
                            warNotes: true // Строевые записки
                        }
                    },
                    warNotes: { // Строевые записки
                        view: true,
                        subMenu: { // Архивы
                            frontNotesOfPCH: true, // Строевые записки ПЧ
                            frontForGarrison: true, // Строевая за гарнизон
                            equipment: true, // Оборудование
                            protocol: true, // Протокол
                            officials: true, // Должностные лица
                            inCalculationAll: true, // В расчет все
                            disableAll: true // Выкл все
                        }
                    },
                    bridges: false, // Мосты
                    hydrants: false // Гидранты
                },
                map: true, // Карта справа от основного меню
                messages: true, // Сообщения справа от основного меню
                selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
                cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
                stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
                fastCommandLine: true, // Строка для ввода команд
                fastAdditionOfCars: true, // Строка быстрого добавления машин
                showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
                states: {
                    frontNotes: {
                        engineCondition: true // Кнопка "Состояние техники"
                    },
                    firebase: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            firstStvol: false, // Кнопка подача первого ствола
                            LOG: false, // Кнопка ЛОГ
                            cancelTheOrder: true, // Кнопка Аннулировать заявку
                            specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                            approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                            rankButtons: false, // Кнопки изменения ранга пожара
                            modifiersButtons: false // Кнопка Модификаторы
                        }
                    },
                    newFireCard: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: false, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                        }
                    },
                    newOrder: {
                        buttons: {
                            unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                        }
                    },
                    order: {
                        editOrderButton: true, // Кнопка редактировать заявку
                        tabs: {
                            notification: true, // Вкладка Оповещение
                            informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                        },
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: true, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                            sendToLO: false // Кнопка Отправить в ЛО
                        }
                    },
                    docs: {
                        select: {
                            selectType: true, // Дропдаун - Выберите тип
                            chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                            chooseTheUser: true // Дропдаун - Выберите пользователя
                        },
                        reports: {
                            fir_10: false
                        }
                    },
                    dept: {
                        canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                        showDeptList: true, // Отображать список департаментов.
                        buttons: {
                            saveCaraul: true, // Кнопка Сохранить (караул)
                            closeDept: true, // Кнопка Закрыть
                            isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                            unloading: false // Кнопка Выгрузить
                        }
                    },
                    protocol: {
                        buttons: {
                            editTime: false // Кнопка редактирования времени в протоколе
                        }
                    }
                }
            },

            dispatchersManager: {
                role: 'Старший диспетчер',
                isPCH: false, // Для правильного определения роли
                words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                    pch: 'СЧ',
                    frontNotes: 'Строевые записки',
                    fireDept: 'Спасательная часть',
                    pchEngine: 'СЧ/ТИП/Гос№',
                    fire: 'Происшествие',
                    fires: 'Происшествия',
                    incidents: 'происшествий',
                    fireDepartment: 'Спасательная',
                    fireDeptSel: 'Спасательную',
                    fireEquipment: 'Спасательные части',
                    OFPS: 'СО',
                    UPO: 'СО',
                    OPO: 'СО',
                    'прибыла': 'прибыла',
                    region: 'Обл.'
                },
                fireInfo: { // Верхняя строка информации о пожаре
                    guard: true,
                    number: true,
                    pchNumber: true,
                    address: true,
                    state: true,
                    externalSystem: true,
                    pch: true,
                    district: true,
                    rank: false,
                    type: true
                },
                mapStyles: { // Настройки для карты
                    fireIcon: '\uf0ad'
                },
                commonSwitches: { // Общие выключатели на весь комплекс
                    rank: false, //Ранг
                    rankMax: false, // Максимальный ранг
                    modifiers: false, // Модификаторы
                    firstTrunk: false, // Первый ствол
                    LOG: false, // ЛОГ
                    PO: false, // ПО
                    GZDS: false, // ГЗДС
                    halfAG: false, // 1/2/AG
                    warehousePO: false, // ПО на складе
                    SPT: false //СПТ
                },
                fireList: { // В таблице со списком пожаров
                    rank: false,
                    rankMax: false,
                },
                wrappers: { // Подложки дизайна
                    selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                    fastCommandLine: true, // Подложка для строки поиска
                    fastAdditionOfCars: true // Строка быстрого добавления машин
                },
                fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                    NZ: true, // Комманда"НЗ"
                    SZ: true, // Комманда"СЗ"
                    ST: true, // Комманда"СТ"
                    NT: true, // Комманда"НТ"
                    KR: true, // Комманда"КР"
                    messages: true // Сообщение
                },
                mainMenu: { // Основоное меню

                    fires: true, // Пожары
                    newApplication: true, // Новая заявка
                    technique: true, // Техника
                    documentation: { // Документы
                        view: true,
                        subMenu: { // Архивы
                            reports: true, // Отчеты
                            downloadFromSHS: false // Загрузить из ШС
                        }
                    },
                    archives: {
                        view: true,
                        subMenu: { // Архивы
                            archiveOfFires: true, // Архив пожаров
                            editingForms6: true, // Редактирование форм 6
                            cards: true, // Карточки пожаров
                            warNotes: true // Строевые записки
                        }
                    },
                    warNotes: { // Строевые записки
                        view: true,
                        subMenu: { // Архивы
                            frontNotesOfPCH: true, // Строевые записки ПЧ
                            frontForGarrison: true, // Строевая за гарнизон
                            equipment: true, // Оборудование
                            protocol: true, // Протокол
                            officials: true, // Должностные лица
                            inCalculationAll: true, // В расчет все
                            disableAll: true // Выкл все
                        }
                    },
                    bridges: false, // Мосты
                    hydrants: false // Гидранты
                },
                map: true, // Карта справа от основного меню
                messages: true, // Сообщения справа от основного меню
                selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
                cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
                stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
                fastCommandLine: true, // Строка для ввода команд
                fastAdditionOfCars: true, // Строка быстрого добавления машин
                showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
                states: {
                    frontNotes: {
                        engineCondition: true // Кнопка "Состояние техники"
                    },
                    firebase: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            firstStvol: false, // Кнопка подача первого ствола
                            LOG: false, // Кнопка ЛОГ
                            cancelTheOrder: true, // Кнопка Аннулировать заявку
                            specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                            approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                            rankButtons: false, // Кнопки изменения ранга пожара
                            modifiersButtons: false // Кнопка Модификаторы
                        }
                    },
                    newFireCard: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: false, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                        }
                    },
                    newOrder: {
                        buttons: {
                            unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                        }
                    },
                    order: {
                        editOrderButton: true, // Кнопка редактировать заявку
                        tabs: {
                            notification: true, // Вкладка Оповещение
                            informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                        },
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: true, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                            sendToLO: false // Кнопка Отправить в ЛО
                        }
                    },
                    docs: {
                        select: {
                            selectType: true, // Дропдаун - Выберите тип
                            chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                            chooseTheUser: true // Дропдаун - Выберите пользователя
                        },
                        reports: {
                            fir_10: false
                        }
                    },
                    dept: {
                        canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                        showDeptList: true, // Отображать список департаментов.
                        buttons: {
                            saveCaraul: true, // Кнопка Сохранить (караул)
                            closeDept: true, // Кнопка Закрыть
                            isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                            unloading: false // Кнопка Выгрузить
                        }
                    },
                    protocol: {
                        buttons: {
                            editTime: false // Кнопка редактирования времени в протоколе
                        }
                    }
                }
            },

        },

        'Андижанская область': {
            dispatchers: {
                role: 'Диспетчер',
                isPCH: false, // Для правильного определения роли
                words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                    pch: 'СЧ',
                    frontNotes: 'Строевые записки',
                    fireDept: 'Спасательная часть',
                    pchEngine: 'СЧ/ТИП/Гос№',
                    fire: 'Происшествие',
                    fires: 'Происшествия',
                    incidents: 'происшествий',
                    fireDepartment: 'Спасательная',
                    fireDeptSel: 'Спасательную',
                    fireEquipment: 'Спасательные части',
                    OFPS: 'СО',
                    UPO: 'СО',
                    OPO: 'СО',
                    'прибыла': 'прибыла',
                    region: 'Обл.'
                },
                fireInfo: { // Верхняя строка информации о пожаре
                    guard: true,
                    number: true,
                    pchNumber: true,
                    address: true,
                    state: true,
                    externalSystem: true,
                    pch: true,
                    district: true,
                    rank: false,
                    type: true
                },
                mapStyles: { // Настройки для карты
                    fireIcon: '\uf0ad'
                },
                commonSwitches: { // Общие выключатели на весь комплекс
                    rank: false, //Ранг
                    rankMax: false, // Максимальный ранг
                    modifiers: false, // Модификаторы
                    firstTrunk: false, // Первый ствол
                    LOG: false, // ЛОГ
                    PO: false, // ПО
                    GZDS: false, // ГЗДС
                    halfAG: false, // 1/2/AG
                    warehousePO: false, // ПО на складе
                    SPT: false //СПТ
                },
                fireList: { // В таблице со списком пожаров
                    rank: false,
                    rankMax: false,
                },
                wrappers: { // Подложки дизайна
                    selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                    fastCommandLine: true, // Подложка для строки поиска
                    fastAdditionOfCars: true // Строка быстрого добавления машин
                },
                fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                    NZ: true, // Комманда"НЗ"
                    SZ: true, // Комманда"СЗ"
                    ST: true, // Комманда"СТ"
                    NT: true, // Комманда"НТ"
                    KR: true, // Комманда"КР"
                    messages: true // Сообщение
                },
                mainMenu: { // Основоное меню

                    fires: true, // Пожары
                    newApplication: true, // Новая заявка
                    technique: true, // Техника
                    documentation: { // Документы
                        view: true,
                        subMenu: { // Архивы
                            reports: true, // Отчеты
                            downloadFromSHS: false // Загрузить из ШС
                        }
                    },
                    archives: {
                        view: true,
                        subMenu: { // Архивы
                            archiveOfFires: true, // Архив пожаров
                            editingForms6: true, // Редактирование форм 6
                            cards: true, // Карточки пожаров
                            warNotes: true // Строевые записки
                        }
                    },
                    warNotes: { // Строевые записки
                        view: true,
                        subMenu: { // Архивы
                            frontNotesOfPCH: true, // Строевые записки ПЧ
                            frontForGarrison: true, // Строевая за гарнизон
                            equipment: true, // Оборудование
                            protocol: true, // Протокол
                            officials: true, // Должностные лица
                            inCalculationAll: true, // В расчет все
                            disableAll: true // Выкл все
                        }
                    },
                    bridges: false, // Мосты
                    hydrants: false // Гидранты
                },
                map: true, // Карта справа от основного меню
                messages: true, // Сообщения справа от основного меню
                selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
                cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
                stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
                fastCommandLine: true, // Строка для ввода команд
                fastAdditionOfCars: true, // Строка быстрого добавления машин
                showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
                states: {
                    frontNotes: {
                        engineCondition: true // Кнопка "Состояние техники"
                    },
                    firebase: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            firstStvol: false, // Кнопка подача первого ствола
                            LOG: false, // Кнопка ЛОГ
                            cancelTheOrder: true, // Кнопка Аннулировать заявку
                            specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                            approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                            rankButtons: false, // Кнопки изменения ранга пожара
                            modifiersButtons: false // Кнопка Модификаторы
                        }
                    },
                    newFireCard: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: false, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                        }
                    },
                    newOrder: {
                        buttons: {
                            unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                        }
                    },
                    order: {
                        editOrderButton: true, // Кнопка редактировать заявку
                        tabs: {
                            notification: true, // Вкладка Оповещение
                            informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                        },
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: true, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                            sendToLO: false // Кнопка Отправить в ЛО
                        }
                    },
                    docs: {
                        select: {
                            selectType: true, // Дропдаун - Выберите тип
                            chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                            chooseTheUser: true // Дропдаун - Выберите пользователя
                        },
                        reports: {
                            fir_10: false
                        }
                    },
                    dept: {
                        canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                        showDeptList: true, // Отображать список департаментов.
                        buttons: {
                            saveCaraul: true, // Кнопка Сохранить (караул)
                            closeDept: true, // Кнопка Закрыть
                            isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                            unloading: false // Кнопка Выгрузить
                        }
                    },
                    protocol: {
                        buttons: {
                            editTime: false // Кнопка редактирования времени в протоколе
                        }
                    }
                }
            },

            dispatchersManager: {
                role: 'Старший диспетчер',
                isPCH: false, // Для правильного определения роли
                words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                    pch: 'СЧ',
                    frontNotes: 'Строевые записки',
                    fireDept: 'Спасательная часть',
                    pchEngine: 'СЧ/ТИП/Гос№',
                    fire: 'Происшествие',
                    fires: 'Происшествия',
                    incidents: 'происшествий',
                    fireDepartment: 'Спасательная',
                    fireDeptSel: 'Спасательную',
                    fireEquipment: 'Спасательные части',
                    OFPS: 'СО',
                    UPO: 'СО',
                    OPO: 'СО',
                    'прибыла': 'прибыла',
                    region: 'Обл.'
                },
                fireInfo: { // Верхняя строка информации о пожаре
                    guard: true,
                    number: true,
                    pchNumber: true,
                    address: true,
                    state: true,
                    externalSystem: true,
                    pch: true,
                    district: true,
                    rank: false,
                    type: true
                },
                mapStyles: { // Настройки для карты
                    fireIcon: '\uf0ad'
                },
                commonSwitches: { // Общие выключатели на весь комплекс
                    rank: false, //Ранг
                    rankMax: false, // Максимальный ранг
                    modifiers: false, // Модификаторы
                    firstTrunk: false, // Первый ствол
                    LOG: false, // ЛОГ
                    PO: false, // ПО
                    GZDS: false, // ГЗДС
                    halfAG: false, // 1/2/AG
                    warehousePO: false, // ПО на складе
                    SPT: false //СПТ
                },
                fireList: { // В таблице со списком пожаров
                    rank: false,
                    rankMax: false,
                },
                wrappers: { // Подложки дизайна
                    selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                    fastCommandLine: true, // Подложка для строки поиска
                    fastAdditionOfCars: true // Строка быстрого добавления машин
                },
                fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                    NZ: true, // Комманда"НЗ"
                    SZ: true, // Комманда"СЗ"
                    ST: true, // Комманда"СТ"
                    NT: true, // Комманда"НТ"
                    KR: true, // Комманда"КР"
                    messages: true // Сообщение
                },
                mainMenu: { // Основоное меню

                    fires: true, // Пожары
                    newApplication: true, // Новая заявка
                    technique: true, // Техника
                    documentation: { // Документы
                        view: true,
                        subMenu: { // Архивы
                            reports: true, // Отчеты
                            downloadFromSHS: false // Загрузить из ШС
                        }
                    },
                    archives: {
                        view: true,
                        subMenu: { // Архивы
                            archiveOfFires: true, // Архив пожаров
                            editingForms6: true, // Редактирование форм 6
                            cards: true, // Карточки пожаров
                            warNotes: true // Строевые записки
                        }
                    },
                    warNotes: { // Строевые записки
                        view: true,
                        subMenu: { // Архивы
                            frontNotesOfPCH: true, // Строевые записки ПЧ
                            frontForGarrison: true, // Строевая за гарнизон
                            equipment: true, // Оборудование
                            protocol: true, // Протокол
                            officials: true, // Должностные лица
                            inCalculationAll: true, // В расчет все
                            disableAll: true // Выкл все
                        }
                    },
                    bridges: false, // Мосты
                    hydrants: false // Гидранты
                },
                map: true, // Карта справа от основного меню
                messages: true, // Сообщения справа от основного меню
                selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
                cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
                stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
                fastCommandLine: true, // Строка для ввода команд
                fastAdditionOfCars: true, // Строка быстрого добавления машин
                showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
                states: {
                    frontNotes: {
                        engineCondition: true // Кнопка "Состояние техники"
                    },
                    firebase: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            firstStvol: false, // Кнопка подача первого ствола
                            LOG: false, // Кнопка ЛОГ
                            cancelTheOrder: true, // Кнопка Аннулировать заявку
                            specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                            approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                            rankButtons: false, // Кнопки изменения ранга пожара
                            modifiersButtons: false // Кнопка Модификаторы
                        }
                    },
                    newFireCard: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: false, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                        }
                    },
                    newOrder: {
                        buttons: {
                            unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                        }
                    },
                    order: {
                        editOrderButton: true, // Кнопка редактировать заявку
                        tabs: {
                            notification: true, // Вкладка Оповещение
                            informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                        },
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: true, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                            sendToLO: false // Кнопка Отправить в ЛО
                        }
                    },
                    docs: {
                        select: {
                            selectType: true, // Дропдаун - Выберите тип
                            chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                            chooseTheUser: true // Дропдаун - Выберите пользователя
                        },
                        reports: {
                            fir_10: false
                        }
                    },
                    dept: {
                        canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                        showDeptList: true, // Отображать список департаментов.
                        buttons: {
                            saveCaraul: true, // Кнопка Сохранить (караул)
                            closeDept: true, // Кнопка Закрыть
                            isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                            unloading: false // Кнопка Выгрузить
                        }
                    },
                    protocol: {
                        buttons: {
                            editTime: false // Кнопка редактирования времени в протоколе
                        }
                    }
                }
            },

        },

        'Бухарская область': {
            dispatchers: {
                role: 'Диспетчер',
                isPCH: false, // Для правильного определения роли
                words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                    pch: 'СЧ',
                    frontNotes: 'Строевые записки',
                    fireDept: 'Спасательная часть',
                    pchEngine: 'СЧ/ТИП/Гос№',
                    fire: 'Происшествие',
                    fires: 'Происшествия',
                    incidents: 'происшествий',
                    fireDepartment: 'Спасательная',
                    fireDeptSel: 'Спасательную',
                    fireEquipment: 'Спасательные части',
                    OFPS: 'СО',
                    UPO: 'СО',
                    OPO: 'СО',
                    'прибыла': 'прибыла',
                    region: 'Обл.'
                },
                fireInfo: { // Верхняя строка информации о пожаре
                    guard: true,
                    number: true,
                    pchNumber: true,
                    address: true,
                    state: true,
                    externalSystem: true,
                    pch: true,
                    district: true,
                    rank: false,
                    type: true
                },
                mapStyles: { // Настройки для карты
                    fireIcon: '\uf0ad'
                },
                commonSwitches: { // Общие выключатели на весь комплекс
                    rank: false, //Ранг
                    rankMax: false, // Максимальный ранг
                    modifiers: false, // Модификаторы
                    firstTrunk: false, // Первый ствол
                    LOG: false, // ЛОГ
                    PO: false, // ПО
                    GZDS: false, // ГЗДС
                    halfAG: false, // 1/2/AG
                    warehousePO: false, // ПО на складе
                    SPT: false //СПТ
                },
                fireList: { // В таблице со списком пожаров
                    rank: false,
                    rankMax: false,
                },
                wrappers: { // Подложки дизайна
                    selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                    fastCommandLine: true, // Подложка для строки поиска
                    fastAdditionOfCars: true // Строка быстрого добавления машин
                },
                fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                    NZ: true, // Комманда"НЗ"
                    SZ: true, // Комманда"СЗ"
                    ST: true, // Комманда"СТ"
                    NT: true, // Комманда"НТ"
                    KR: true, // Комманда"КР"
                    messages: true // Сообщение
                },
                mainMenu: { // Основоное меню

                    fires: true, // Пожары
                    newApplication: true, // Новая заявка
                    technique: true, // Техника
                    documentation: { // Документы
                        view: true,
                        subMenu: { // Архивы
                            reports: true, // Отчеты
                            downloadFromSHS: false // Загрузить из ШС
                        }
                    },
                    archives: {
                        view: true,
                        subMenu: { // Архивы
                            archiveOfFires: true, // Архив пожаров
                            editingForms6: true, // Редактирование форм 6
                            cards: true, // Карточки пожаров
                            warNotes: true // Строевые записки
                        }
                    },
                    warNotes: { // Строевые записки
                        view: true,
                        subMenu: { // Архивы
                            frontNotesOfPCH: true, // Строевые записки ПЧ
                            frontForGarrison: true, // Строевая за гарнизон
                            equipment: true, // Оборудование
                            protocol: true, // Протокол
                            officials: true, // Должностные лица
                            inCalculationAll: true, // В расчет все
                            disableAll: true // Выкл все
                        }
                    },
                    bridges: false, // Мосты
                    hydrants: false // Гидранты
                },
                map: true, // Карта справа от основного меню
                messages: true, // Сообщения справа от основного меню
                selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
                cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
                stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
                fastCommandLine: true, // Строка для ввода команд
                fastAdditionOfCars: true, // Строка быстрого добавления машин
                showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
                states: {
                    frontNotes: {
                        engineCondition: true // Кнопка "Состояние техники"
                    },
                    firebase: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            firstStvol: false, // Кнопка подача первого ствола
                            LOG: false, // Кнопка ЛОГ
                            cancelTheOrder: true, // Кнопка Аннулировать заявку
                            specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                            approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                            rankButtons: false, // Кнопки изменения ранга пожара
                            modifiersButtons: false // Кнопка Модификаторы
                        }
                    },
                    newFireCard: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: false, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                        }
                    },
                    newOrder: {
                        buttons: {
                            unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                        }
                    },
                    order: {
                        editOrderButton: true, // Кнопка редактировать заявку
                        tabs: {
                            notification: true, // Вкладка Оповещение
                            informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                        },
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: true, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                            sendToLO: false // Кнопка Отправить в ЛО
                        }
                    },
                    docs: {
                        select: {
                            selectType: true, // Дропдаун - Выберите тип
                            chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                            chooseTheUser: true // Дропдаун - Выберите пользователя
                        },
                        reports: {
                            fir_10: false
                        }
                    },
                    dept: {
                        canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                        showDeptList: true, // Отображать список департаментов.
                        buttons: {
                            saveCaraul: true, // Кнопка Сохранить (караул)
                            closeDept: true, // Кнопка Закрыть
                            isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                            unloading: false // Кнопка Выгрузить
                        }
                    },
                    protocol: {
                        buttons: {
                            editTime: false // Кнопка редактирования времени в протоколе
                        }
                    }
                }
            },

            dispatchersManager: {
                role: 'Старший диспетчер',
                isPCH: false, // Для правильного определения роли
                words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                    pch: 'СЧ',
                    frontNotes: 'Строевые записки',
                    fireDept: 'Спасательная часть',
                    pchEngine: 'СЧ/ТИП/Гос№',
                    fire: 'Происшествие',
                    fires: 'Происшествия',
                    incidents: 'происшествий',
                    fireDepartment: 'Спасательная',
                    fireDeptSel: 'Спасательную',
                    fireEquipment: 'Спасательные части',
                    OFPS: 'СО',
                    UPO: 'СО',
                    OPO: 'СО',
                    'прибыла': 'прибыла',
                    region: 'Обл.'
                },
                fireInfo: { // Верхняя строка информации о пожаре
                    guard: true,
                    number: true,
                    pchNumber: true,
                    address: true,
                    state: true,
                    externalSystem: true,
                    pch: true,
                    district: true,
                    rank: false,
                    type: true
                },
                mapStyles: { // Настройки для карты
                    fireIcon: '\uf0ad'
                },
                commonSwitches: { // Общие выключатели на весь комплекс
                    rank: false, //Ранг
                    rankMax: false, // Максимальный ранг
                    modifiers: false, // Модификаторы
                    firstTrunk: false, // Первый ствол
                    LOG: false, // ЛОГ
                    PO: false, // ПО
                    GZDS: false, // ГЗДС
                    halfAG: false, // 1/2/AG
                    warehousePO: false, // ПО на складе
                    SPT: false //СПТ
                },
                fireList: { // В таблице со списком пожаров
                    rank: false,
                    rankMax: false,
                },
                wrappers: { // Подложки дизайна
                    selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                    fastCommandLine: true, // Подложка для строки поиска
                    fastAdditionOfCars: true // Строка быстрого добавления машин
                },
                fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                    NZ: true, // Комманда"НЗ"
                    SZ: true, // Комманда"СЗ"
                    ST: true, // Комманда"СТ"
                    NT: true, // Комманда"НТ"
                    KR: true, // Комманда"КР"
                    messages: true // Сообщение
                },
                mainMenu: { // Основоное меню

                    fires: true, // Пожары
                    newApplication: true, // Новая заявка
                    technique: true, // Техника
                    documentation: { // Документы
                        view: true,
                        subMenu: { // Архивы
                            reports: true, // Отчеты
                            downloadFromSHS: false // Загрузить из ШС
                        }
                    },
                    archives: {
                        view: true,
                        subMenu: { // Архивы
                            archiveOfFires: true, // Архив пожаров
                            editingForms6: true, // Редактирование форм 6
                            cards: true, // Карточки пожаров
                            warNotes: true // Строевые записки
                        }
                    },
                    warNotes: { // Строевые записки
                        view: true,
                        subMenu: { // Архивы
                            frontNotesOfPCH: true, // Строевые записки ПЧ
                            frontForGarrison: true, // Строевая за гарнизон
                            equipment: true, // Оборудование
                            protocol: true, // Протокол
                            officials: true, // Должностные лица
                            inCalculationAll: true, // В расчет все
                            disableAll: true // Выкл все
                        }
                    },
                    bridges: false, // Мосты
                    hydrants: false // Гидранты
                },
                map: true, // Карта справа от основного меню
                messages: true, // Сообщения справа от основного меню
                selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
                cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
                stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
                fastCommandLine: true, // Строка для ввода команд
                fastAdditionOfCars: true, // Строка быстрого добавления машин
                showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
                states: {
                    frontNotes: {
                        engineCondition: true // Кнопка "Состояние техники"
                    },
                    firebase: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            firstStvol: false, // Кнопка подача первого ствола
                            LOG: false, // Кнопка ЛОГ
                            cancelTheOrder: true, // Кнопка Аннулировать заявку
                            specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                            approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                            rankButtons: false, // Кнопки изменения ранга пожара
                            modifiersButtons: false // Кнопка Модификаторы
                        }
                    },
                    newFireCard: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: false, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                        }
                    },
                    newOrder: {
                        buttons: {
                            unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                        }
                    },
                    order: {
                        editOrderButton: true, // Кнопка редактировать заявку
                        tabs: {
                            notification: true, // Вкладка Оповещение
                            informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                        },
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: true, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                            sendToLO: false // Кнопка Отправить в ЛО
                        }
                    },
                    docs: {
                        select: {
                            selectType: true, // Дропдаун - Выберите тип
                            chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                            chooseTheUser: true // Дропдаун - Выберите пользователя
                        },
                        reports: {
                            fir_10: false
                        }
                    },
                    dept: {
                        canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                        showDeptList: true, // Отображать список департаментов.
                        buttons: {
                            saveCaraul: true, // Кнопка Сохранить (караул)
                            closeDept: true, // Кнопка Закрыть
                            isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                            unloading: false // Кнопка Выгрузить
                        }
                    },
                    protocol: {
                        buttons: {
                            editTime: false // Кнопка редактирования времени в протоколе
                        }
                    }
                }
            },

        },

        'Джизакская область': {
            dispatchers: {
                role: 'Диспетчер',
                isPCH: false, // Для правильного определения роли
                words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                    pch: 'СЧ',
                    frontNotes: 'Строевые записки',
                    fireDept: 'Спасательная часть',
                    pchEngine: 'СЧ/ТИП/Гос№',
                    fire: 'Происшествие',
                    fires: 'Происшествия',
                    incidents: 'происшествий',
                    fireDepartment: 'Спасательная',
                    fireDeptSel: 'Спасательную',
                    fireEquipment: 'Спасательные части',
                    OFPS: 'СО',
                    UPO: 'СО',
                    OPO: 'СО',
                    'прибыла': 'прибыла',
                    region: 'Обл.'
                },
                fireInfo: { // Верхняя строка информации о пожаре
                    guard: true,
                    number: true,
                    pchNumber: true,
                    address: true,
                    state: true,
                    externalSystem: true,
                    pch: true,
                    district: true,
                    rank: false,
                    type: true
                },
                mapStyles: { // Настройки для карты
                    fireIcon: '\uf0ad'
                },
                commonSwitches: { // Общие выключатели на весь комплекс
                    rank: false, //Ранг
                    rankMax: false, // Максимальный ранг
                    modifiers: false, // Модификаторы
                    firstTrunk: false, // Первый ствол
                    LOG: false, // ЛОГ
                    PO: false, // ПО
                    GZDS: false, // ГЗДС
                    halfAG: false, // 1/2/AG
                    warehousePO: false, // ПО на складе
                    SPT: false //СПТ
                },
                fireList: { // В таблице со списком пожаров
                    rank: false,
                    rankMax: false,
                },
                wrappers: { // Подложки дизайна
                    selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                    fastCommandLine: true, // Подложка для строки поиска
                    fastAdditionOfCars: true // Строка быстрого добавления машин
                },
                fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                    NZ: true, // Комманда"НЗ"
                    SZ: true, // Комманда"СЗ"
                    ST: true, // Комманда"СТ"
                    NT: true, // Комманда"НТ"
                    KR: true, // Комманда"КР"
                    messages: true // Сообщение
                },
                mainMenu: { // Основоное меню

                    fires: true, // Пожары
                    newApplication: true, // Новая заявка
                    technique: true, // Техника
                    documentation: { // Документы
                        view: true,
                        subMenu: { // Архивы
                            reports: true, // Отчеты
                            downloadFromSHS: false // Загрузить из ШС
                        }
                    },
                    archives: {
                        view: true,
                        subMenu: { // Архивы
                            archiveOfFires: true, // Архив пожаров
                            editingForms6: true, // Редактирование форм 6
                            cards: true, // Карточки пожаров
                            warNotes: true // Строевые записки
                        }
                    },
                    warNotes: { // Строевые записки
                        view: true,
                        subMenu: { // Архивы
                            frontNotesOfPCH: true, // Строевые записки ПЧ
                            frontForGarrison: true, // Строевая за гарнизон
                            equipment: true, // Оборудование
                            protocol: true, // Протокол
                            officials: true, // Должностные лица
                            inCalculationAll: true, // В расчет все
                            disableAll: true // Выкл все
                        }
                    },
                    bridges: false, // Мосты
                    hydrants: false // Гидранты
                },
                map: true, // Карта справа от основного меню
                messages: true, // Сообщения справа от основного меню
                selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
                cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
                stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
                fastCommandLine: true, // Строка для ввода команд
                fastAdditionOfCars: true, // Строка быстрого добавления машин
                showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
                states: {
                    frontNotes: {
                        engineCondition: true // Кнопка "Состояние техники"
                    },
                    firebase: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            firstStvol: false, // Кнопка подача первого ствола
                            LOG: false, // Кнопка ЛОГ
                            cancelTheOrder: true, // Кнопка Аннулировать заявку
                            specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                            approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                            rankButtons: false, // Кнопки изменения ранга пожара
                            modifiersButtons: false // Кнопка Модификаторы
                        }
                    },
                    newFireCard: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: false, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                        }
                    },
                    newOrder: {
                        buttons: {
                            unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                        }
                    },
                    order: {
                        editOrderButton: true, // Кнопка редактировать заявку
                        tabs: {
                            notification: true, // Вкладка Оповещение
                            informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                        },
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: true, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                            sendToLO: false // Кнопка Отправить в ЛО
                        }
                    },
                    docs: {
                        select: {
                            selectType: true, // Дропдаун - Выберите тип
                            chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                            chooseTheUser: true // Дропдаун - Выберите пользователя
                        },
                        reports: {
                            fir_10: false
                        }
                    },
                    dept: {
                        canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                        showDeptList: true, // Отображать список департаментов.
                        buttons: {
                            saveCaraul: true, // Кнопка Сохранить (караул)
                            closeDept: true, // Кнопка Закрыть
                            isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                            unloading: false // Кнопка Выгрузить
                        }
                    },
                    protocol: {
                        buttons: {
                            editTime: false // Кнопка редактирования времени в протоколе
                        }
                    }
                }
            },

            dispatchersManager: {
                role: 'Старший диспетчер',
                isPCH: false, // Для правильного определения роли
                words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                    pch: 'СЧ',
                    frontNotes: 'Строевые записки',
                    fireDept: 'Спасательная часть',
                    pchEngine: 'СЧ/ТИП/Гос№',
                    fire: 'Происшествие',
                    fires: 'Происшествия',
                    incidents: 'происшествий',
                    fireDepartment: 'Спасательная',
                    fireDeptSel: 'Спасательную',
                    fireEquipment: 'Спасательные части',
                    OFPS: 'СО',
                    UPO: 'СО',
                    OPO: 'СО',
                    'прибыла': 'прибыла',
                    region: 'Обл.'
                },
                fireInfo: { // Верхняя строка информации о пожаре
                    guard: true,
                    number: true,
                    pchNumber: true,
                    address: true,
                    state: true,
                    externalSystem: true,
                    pch: true,
                    district: true,
                    rank: false,
                    type: true
                },
                mapStyles: { // Настройки для карты
                    fireIcon: '\uf0ad'
                },
                commonSwitches: { // Общие выключатели на весь комплекс
                    rank: false, //Ранг
                    rankMax: false, // Максимальный ранг
                    modifiers: false, // Модификаторы
                    firstTrunk: false, // Первый ствол
                    LOG: false, // ЛОГ
                    PO: false, // ПО
                    GZDS: false, // ГЗДС
                    halfAG: false, // 1/2/AG
                    warehousePO: false, // ПО на складе
                    SPT: false //СПТ
                },
                fireList: { // В таблице со списком пожаров
                    rank: false,
                    rankMax: false,
                },
                wrappers: { // Подложки дизайна
                    selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                    fastCommandLine: true, // Подложка для строки поиска
                    fastAdditionOfCars: true // Строка быстрого добавления машин
                },
                fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                    NZ: true, // Комманда"НЗ"
                    SZ: true, // Комманда"СЗ"
                    ST: true, // Комманда"СТ"
                    NT: true, // Комманда"НТ"
                    KR: true, // Комманда"КР"
                    messages: true // Сообщение
                },
                mainMenu: { // Основоное меню

                    fires: true, // Пожары
                    newApplication: true, // Новая заявка
                    technique: true, // Техника
                    documentation: { // Документы
                        view: true,
                        subMenu: { // Архивы
                            reports: true, // Отчеты
                            downloadFromSHS: false // Загрузить из ШС
                        }
                    },
                    archives: {
                        view: true,
                        subMenu: { // Архивы
                            archiveOfFires: true, // Архив пожаров
                            editingForms6: true, // Редактирование форм 6
                            cards: true, // Карточки пожаров
                            warNotes: true // Строевые записки
                        }
                    },
                    warNotes: { // Строевые записки
                        view: true,
                        subMenu: { // Архивы
                            frontNotesOfPCH: true, // Строевые записки ПЧ
                            frontForGarrison: true, // Строевая за гарнизон
                            equipment: true, // Оборудование
                            protocol: true, // Протокол
                            officials: true, // Должностные лица
                            inCalculationAll: true, // В расчет все
                            disableAll: true // Выкл все
                        }
                    },
                    bridges: false, // Мосты
                    hydrants: false // Гидранты
                },
                map: true, // Карта справа от основного меню
                messages: true, // Сообщения справа от основного меню
                selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
                cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
                stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
                fastCommandLine: true, // Строка для ввода команд
                fastAdditionOfCars: true, // Строка быстрого добавления машин
                showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
                states: {
                    frontNotes: {
                        engineCondition: true // Кнопка "Состояние техники"
                    },
                    firebase: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            firstStvol: false, // Кнопка подача первого ствола
                            LOG: false, // Кнопка ЛОГ
                            cancelTheOrder: true, // Кнопка Аннулировать заявку
                            specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                            approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                            rankButtons: false, // Кнопки изменения ранга пожара
                            modifiersButtons: false // Кнопка Модификаторы
                        }
                    },
                    newFireCard: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: false, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                        }
                    },
                    newOrder: {
                        buttons: {
                            unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                        }
                    },
                    order: {
                        editOrderButton: true, // Кнопка редактировать заявку
                        tabs: {
                            notification: true, // Вкладка Оповещение
                            informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                        },
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: true, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                            sendToLO: false // Кнопка Отправить в ЛО
                        }
                    },
                    docs: {
                        select: {
                            selectType: true, // Дропдаун - Выберите тип
                            chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                            chooseTheUser: true // Дропдаун - Выберите пользователя
                        },
                        reports: {
                            fir_10: false
                        }
                    },
                    dept: {
                        canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                        showDeptList: true, // Отображать список департаментов.
                        buttons: {
                            saveCaraul: true, // Кнопка Сохранить (караул)
                            closeDept: true, // Кнопка Закрыть
                            isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                            unloading: false // Кнопка Выгрузить
                        }
                    },
                    protocol: {
                        buttons: {
                            editTime: false // Кнопка редактирования времени в протоколе
                        }
                    }
                }
            },

        },

        'Кашкадарьинская область': {
            dispatchers: {
                role: 'Диспетчер',
                isPCH: false, // Для правильного определения роли
                words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                    pch: 'СЧ',
                    frontNotes: 'Строевые записки',
                    fireDept: 'Спасательная часть',
                    pchEngine: 'СЧ/ТИП/Гос№',
                    fire: 'Происшествие',
                    fires: 'Происшествия',
                    incidents: 'происшествий',
                    fireDepartment: 'Спасательная',
                    fireDeptSel: 'Спасательную',
                    fireEquipment: 'Спасательные части',
                    OFPS: 'СО',
                    UPO: 'СО',
                    OPO: 'СО',
                    'прибыла': 'прибыла',
                    region: 'Обл.'
                },
                fireInfo: { // Верхняя строка информации о пожаре
                    guard: true,
                    number: true,
                    pchNumber: true,
                    address: true,
                    state: true,
                    externalSystem: true,
                    pch: true,
                    district: true,
                    rank: false,
                    type: true
                },
                mapStyles: { // Настройки для карты
                    fireIcon: '\uf0ad'
                },
                commonSwitches: { // Общие выключатели на весь комплекс
                    rank: false, //Ранг
                    rankMax: false, // Максимальный ранг
                    modifiers: false, // Модификаторы
                    firstTrunk: false, // Первый ствол
                    LOG: false, // ЛОГ
                    PO: false, // ПО
                    GZDS: false, // ГЗДС
                    halfAG: false, // 1/2/AG
                    warehousePO: false, // ПО на складе
                    SPT: false //СПТ
                },
                fireList: { // В таблице со списком пожаров
                    rank: false,
                    rankMax: false,
                },
                wrappers: { // Подложки дизайна
                    selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                    fastCommandLine: true, // Подложка для строки поиска
                    fastAdditionOfCars: true // Строка быстрого добавления машин
                },
                fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                    NZ: true, // Комманда"НЗ"
                    SZ: true, // Комманда"СЗ"
                    ST: true, // Комманда"СТ"
                    NT: true, // Комманда"НТ"
                    KR: true, // Комманда"КР"
                    messages: true // Сообщение
                },
                mainMenu: { // Основоное меню

                    fires: true, // Пожары
                    newApplication: true, // Новая заявка
                    technique: true, // Техника
                    documentation: { // Документы
                        view: true,
                        subMenu: { // Архивы
                            reports: true, // Отчеты
                            downloadFromSHS: false // Загрузить из ШС
                        }
                    },
                    archives: {
                        view: true,
                        subMenu: { // Архивы
                            archiveOfFires: true, // Архив пожаров
                            editingForms6: true, // Редактирование форм 6
                            cards: true, // Карточки пожаров
                            warNotes: true // Строевые записки
                        }
                    },
                    warNotes: { // Строевые записки
                        view: true,
                        subMenu: { // Архивы
                            frontNotesOfPCH: true, // Строевые записки ПЧ
                            frontForGarrison: true, // Строевая за гарнизон
                            equipment: true, // Оборудование
                            protocol: true, // Протокол
                            officials: true, // Должностные лица
                            inCalculationAll: true, // В расчет все
                            disableAll: true // Выкл все
                        }
                    },
                    bridges: false, // Мосты
                    hydrants: false // Гидранты
                },
                map: true, // Карта справа от основного меню
                messages: true, // Сообщения справа от основного меню
                selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
                cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
                stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
                fastCommandLine: true, // Строка для ввода команд
                fastAdditionOfCars: true, // Строка быстрого добавления машин
                showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
                states: {
                    frontNotes: {
                        engineCondition: true // Кнопка "Состояние техники"
                    },
                    firebase: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            firstStvol: false, // Кнопка подача первого ствола
                            LOG: false, // Кнопка ЛОГ
                            cancelTheOrder: true, // Кнопка Аннулировать заявку
                            specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                            approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                            rankButtons: false, // Кнопки изменения ранга пожара
                            modifiersButtons: false // Кнопка Модификаторы
                        }
                    },
                    newFireCard: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: false, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                        }
                    },
                    newOrder: {
                        buttons: {
                            unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                        }
                    },
                    order: {
                        editOrderButton: true, // Кнопка редактировать заявку
                        tabs: {
                            notification: true, // Вкладка Оповещение
                            informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                        },
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: true, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                            sendToLO: false // Кнопка Отправить в ЛО
                        }
                    },
                    docs: {
                        select: {
                            selectType: true, // Дропдаун - Выберите тип
                            chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                            chooseTheUser: true // Дропдаун - Выберите пользователя
                        },
                        reports: {
                            fir_10: false
                        }
                    },
                    dept: {
                        canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                        showDeptList: true, // Отображать список департаментов.
                        buttons: {
                            saveCaraul: true, // Кнопка Сохранить (караул)
                            closeDept: true, // Кнопка Закрыть
                            isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                            unloading: false // Кнопка Выгрузить
                        }
                    },
                    protocol: {
                        buttons: {
                            editTime: false // Кнопка редактирования времени в протоколе
                        }
                    }
                }
            },

            dispatchersManager: {
                role: 'Старший диспетчер',
                isPCH: false, // Для правильного определения роли
                words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                    pch: 'СЧ',
                    frontNotes: 'Строевые записки',
                    fireDept: 'Спасательная часть',
                    pchEngine: 'СЧ/ТИП/Гос№',
                    fire: 'Происшествие',
                    fires: 'Происшествия',
                    incidents: 'происшествий',
                    fireDepartment: 'Спасательная',
                    fireDeptSel: 'Спасательную',
                    fireEquipment: 'Спасательные части',
                    OFPS: 'СО',
                    UPO: 'СО',
                    OPO: 'СО',
                    'прибыла': 'прибыла',
                    region: 'Обл.'
                },
                fireInfo: { // Верхняя строка информации о пожаре
                    guard: true,
                    number: true,
                    pchNumber: true,
                    address: true,
                    state: true,
                    externalSystem: true,
                    pch: true,
                    district: true,
                    rank: false,
                    type: true
                },
                mapStyles: { // Настройки для карты
                    fireIcon: '\uf0ad'
                },
                commonSwitches: { // Общие выключатели на весь комплекс
                    rank: false, //Ранг
                    rankMax: false, // Максимальный ранг
                    modifiers: false, // Модификаторы
                    firstTrunk: false, // Первый ствол
                    LOG: false, // ЛОГ
                    PO: false, // ПО
                    GZDS: false, // ГЗДС
                    halfAG: false, // 1/2/AG
                    warehousePO: false, // ПО на складе
                    SPT: false //СПТ
                },
                fireList: { // В таблице со списком пожаров
                    rank: false,
                    rankMax: false,
                },
                wrappers: { // Подложки дизайна
                    selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                    fastCommandLine: true, // Подложка для строки поиска
                    fastAdditionOfCars: true // Строка быстрого добавления машин
                },
                fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                    NZ: true, // Комманда"НЗ"
                    SZ: true, // Комманда"СЗ"
                    ST: true, // Комманда"СТ"
                    NT: true, // Комманда"НТ"
                    KR: true, // Комманда"КР"
                    messages: true // Сообщение
                },
                mainMenu: { // Основоное меню

                    fires: true, // Пожары
                    newApplication: true, // Новая заявка
                    technique: true, // Техника
                    documentation: { // Документы
                        view: true,
                        subMenu: { // Архивы
                            reports: true, // Отчеты
                            downloadFromSHS: false // Загрузить из ШС
                        }
                    },
                    archives: {
                        view: true,
                        subMenu: { // Архивы
                            archiveOfFires: true, // Архив пожаров
                            editingForms6: true, // Редактирование форм 6
                            cards: true, // Карточки пожаров
                            warNotes: true // Строевые записки
                        }
                    },
                    warNotes: { // Строевые записки
                        view: true,
                        subMenu: { // Архивы
                            frontNotesOfPCH: true, // Строевые записки ПЧ
                            frontForGarrison: true, // Строевая за гарнизон
                            equipment: true, // Оборудование
                            protocol: true, // Протокол
                            officials: true, // Должностные лица
                            inCalculationAll: true, // В расчет все
                            disableAll: true // Выкл все
                        }
                    },
                    bridges: false, // Мосты
                    hydrants: false // Гидранты
                },
                map: true, // Карта справа от основного меню
                messages: true, // Сообщения справа от основного меню
                selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
                cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
                stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
                fastCommandLine: true, // Строка для ввода команд
                fastAdditionOfCars: true, // Строка быстрого добавления машин
                showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
                states: {
                    frontNotes: {
                        engineCondition: true // Кнопка "Состояние техники"
                    },
                    firebase: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            firstStvol: false, // Кнопка подача первого ствола
                            LOG: false, // Кнопка ЛОГ
                            cancelTheOrder: true, // Кнопка Аннулировать заявку
                            specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                            approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                            rankButtons: false, // Кнопки изменения ранга пожара
                            modifiersButtons: false // Кнопка Модификаторы
                        }
                    },
                    newFireCard: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: false, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                        }
                    },
                    newOrder: {
                        buttons: {
                            unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                        }
                    },
                    order: {
                        editOrderButton: true, // Кнопка редактировать заявку
                        tabs: {
                            notification: true, // Вкладка Оповещение
                            informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                        },
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: true, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                            sendToLO: false // Кнопка Отправить в ЛО
                        }
                    },
                    docs: {
                        select: {
                            selectType: true, // Дропдаун - Выберите тип
                            chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                            chooseTheUser: true // Дропдаун - Выберите пользователя
                        },
                        reports: {
                            fir_10: false
                        }
                    },
                    dept: {
                        canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                        showDeptList: true, // Отображать список департаментов.
                        buttons: {
                            saveCaraul: true, // Кнопка Сохранить (караул)
                            closeDept: true, // Кнопка Закрыть
                            isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                            unloading: false // Кнопка Выгрузить
                        }
                    },
                    protocol: {
                        buttons: {
                            editTime: false // Кнопка редактирования времени в протоколе
                        }
                    }
                }
            },

        },

        'Навоийская область': {
            dispatchers: {
                role: 'Диспетчер',
                isPCH: false, // Для правильного определения роли
                words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                    pch: 'СЧ',
                    frontNotes: 'Строевые записки',
                    fireDept: 'Спасательная часть',
                    pchEngine: 'СЧ/ТИП/Гос№',
                    fire: 'Происшествие',
                    fires: 'Происшествия',
                    incidents: 'происшествий',
                    fireDepartment: 'Спасательная',
                    fireDeptSel: 'Спасательную',
                    fireEquipment: 'Спасательные части',
                    OFPS: 'СО',
                    UPO: 'СО',
                    OPO: 'СО',
                    'прибыла': 'прибыла',
                    region: 'Обл.'
                },
                fireInfo: { // Верхняя строка информации о пожаре
                    guard: true,
                    number: true,
                    pchNumber: true,
                    address: true,
                    state: true,
                    externalSystem: true,
                    pch: true,
                    district: true,
                    rank: false,
                    type: true
                },
                mapStyles: { // Настройки для карты
                    fireIcon: '\uf0ad'
                },
                commonSwitches: { // Общие выключатели на весь комплекс
                    rank: false, //Ранг
                    rankMax: false, // Максимальный ранг
                    modifiers: false, // Модификаторы
                    firstTrunk: false, // Первый ствол
                    LOG: false, // ЛОГ
                    PO: false, // ПО
                    GZDS: false, // ГЗДС
                    halfAG: false, // 1/2/AG
                    warehousePO: false, // ПО на складе
                    SPT: false //СПТ
                },
                fireList: { // В таблице со списком пожаров
                    rank: false,
                    rankMax: false,
                },
                wrappers: { // Подложки дизайна
                    selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                    fastCommandLine: true, // Подложка для строки поиска
                    fastAdditionOfCars: true // Строка быстрого добавления машин
                },
                fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                    NZ: true, // Комманда"НЗ"
                    SZ: true, // Комманда"СЗ"
                    ST: true, // Комманда"СТ"
                    NT: true, // Комманда"НТ"
                    KR: true, // Комманда"КР"
                    messages: true // Сообщение
                },
                mainMenu: { // Основоное меню

                    fires: true, // Пожары
                    newApplication: true, // Новая заявка
                    technique: true, // Техника
                    documentation: { // Документы
                        view: true,
                        subMenu: { // Архивы
                            reports: true, // Отчеты
                            downloadFromSHS: false // Загрузить из ШС
                        }
                    },
                    archives: {
                        view: true,
                        subMenu: { // Архивы
                            archiveOfFires: true, // Архив пожаров
                            editingForms6: true, // Редактирование форм 6
                            cards: true, // Карточки пожаров
                            warNotes: true // Строевые записки
                        }
                    },
                    warNotes: { // Строевые записки
                        view: true,
                        subMenu: { // Архивы
                            frontNotesOfPCH: true, // Строевые записки ПЧ
                            frontForGarrison: true, // Строевая за гарнизон
                            equipment: true, // Оборудование
                            protocol: true, // Протокол
                            officials: true, // Должностные лица
                            inCalculationAll: true, // В расчет все
                            disableAll: true // Выкл все
                        }
                    },
                    bridges: false, // Мосты
                    hydrants: false // Гидранты
                },
                map: true, // Карта справа от основного меню
                messages: true, // Сообщения справа от основного меню
                selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
                cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
                stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
                fastCommandLine: true, // Строка для ввода команд
                fastAdditionOfCars: true, // Строка быстрого добавления машин
                showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
                states: {
                    frontNotes: {
                        engineCondition: true // Кнопка "Состояние техники"
                    },
                    firebase: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            firstStvol: false, // Кнопка подача первого ствола
                            LOG: false, // Кнопка ЛОГ
                            cancelTheOrder: true, // Кнопка Аннулировать заявку
                            specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                            approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                            rankButtons: false, // Кнопки изменения ранга пожара
                            modifiersButtons: false // Кнопка Модификаторы
                        }
                    },
                    newFireCard: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: false, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                        }
                    },
                    newOrder: {
                        buttons: {
                            unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                        }
                    },
                    order: {
                        editOrderButton: true, // Кнопка редактировать заявку
                        tabs: {
                            notification: true, // Вкладка Оповещение
                            informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                        },
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: true, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                            sendToLO: false // Кнопка Отправить в ЛО
                        }
                    },
                    docs: {
                        select: {
                            selectType: true, // Дропдаун - Выберите тип
                            chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                            chooseTheUser: true // Дропдаун - Выберите пользователя
                        },
                        reports: {
                            fir_10: false
                        }
                    },
                    dept: {
                        canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                        showDeptList: true, // Отображать список департаментов.
                        buttons: {
                            saveCaraul: true, // Кнопка Сохранить (караул)
                            closeDept: true, // Кнопка Закрыть
                            isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                            unloading: false // Кнопка Выгрузить
                        }
                    },
                    protocol: {
                        buttons: {
                            editTime: false // Кнопка редактирования времени в протоколе
                        }
                    }
                }
            },

            dispatchersManager: {
                role: 'Старший диспетчер',
                isPCH: false, // Для правильного определения роли
                words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                    pch: 'СЧ',
                    frontNotes: 'Строевые записки',
                    fireDept: 'Спасательная часть',
                    pchEngine: 'СЧ/ТИП/Гос№',
                    fire: 'Происшествие',
                    fires: 'Происшествия',
                    incidents: 'происшествий',
                    fireDepartment: 'Спасательная',
                    fireDeptSel: 'Спасательную',
                    fireEquipment: 'Спасательные части',
                    OFPS: 'СО',
                    UPO: 'СО',
                    OPO: 'СО',
                    'прибыла': 'прибыла',
                    region: 'Обл.'
                },
                fireInfo: { // Верхняя строка информации о пожаре
                    guard: true,
                    number: true,
                    pchNumber: true,
                    address: true,
                    state: true,
                    externalSystem: true,
                    pch: true,
                    district: true,
                    rank: false,
                    type: true
                },
                mapStyles: { // Настройки для карты
                    fireIcon: '\uf0ad'
                },
                commonSwitches: { // Общие выключатели на весь комплекс
                    rank: false, //Ранг
                    rankMax: false, // Максимальный ранг
                    modifiers: false, // Модификаторы
                    firstTrunk: false, // Первый ствол
                    LOG: false, // ЛОГ
                    PO: false, // ПО
                    GZDS: false, // ГЗДС
                    halfAG: false, // 1/2/AG
                    warehousePO: false, // ПО на складе
                    SPT: false //СПТ
                },
                fireList: { // В таблице со списком пожаров
                    rank: false,
                    rankMax: false,
                },
                wrappers: { // Подложки дизайна
                    selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                    fastCommandLine: true, // Подложка для строки поиска
                    fastAdditionOfCars: true // Строка быстрого добавления машин
                },
                fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                    NZ: true, // Комманда"НЗ"
                    SZ: true, // Комманда"СЗ"
                    ST: true, // Комманда"СТ"
                    NT: true, // Комманда"НТ"
                    KR: true, // Комманда"КР"
                    messages: true // Сообщение
                },
                mainMenu: { // Основоное меню

                    fires: true, // Пожары
                    newApplication: true, // Новая заявка
                    technique: true, // Техника
                    documentation: { // Документы
                        view: true,
                        subMenu: { // Архивы
                            reports: true, // Отчеты
                            downloadFromSHS: false // Загрузить из ШС
                        }
                    },
                    archives: {
                        view: true,
                        subMenu: { // Архивы
                            archiveOfFires: true, // Архив пожаров
                            editingForms6: true, // Редактирование форм 6
                            cards: true, // Карточки пожаров
                            warNotes: true // Строевые записки
                        }
                    },
                    warNotes: { // Строевые записки
                        view: true,
                        subMenu: { // Архивы
                            frontNotesOfPCH: true, // Строевые записки ПЧ
                            frontForGarrison: true, // Строевая за гарнизон
                            equipment: true, // Оборудование
                            protocol: true, // Протокол
                            officials: true, // Должностные лица
                            inCalculationAll: true, // В расчет все
                            disableAll: true // Выкл все
                        }
                    },
                    bridges: false, // Мосты
                    hydrants: false // Гидранты
                },
                map: true, // Карта справа от основного меню
                messages: true, // Сообщения справа от основного меню
                selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
                cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
                stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
                fastCommandLine: true, // Строка для ввода команд
                fastAdditionOfCars: true, // Строка быстрого добавления машин
                showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
                states: {
                    frontNotes: {
                        engineCondition: true // Кнопка "Состояние техники"
                    },
                    firebase: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            firstStvol: false, // Кнопка подача первого ствола
                            LOG: false, // Кнопка ЛОГ
                            cancelTheOrder: true, // Кнопка Аннулировать заявку
                            specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                            approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                            rankButtons: false, // Кнопки изменения ранга пожара
                            modifiersButtons: false // Кнопка Модификаторы
                        }
                    },
                    newFireCard: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: false, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                        }
                    },
                    newOrder: {
                        buttons: {
                            unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                        }
                    },
                    order: {
                        editOrderButton: true, // Кнопка редактировать заявку
                        tabs: {
                            notification: true, // Вкладка Оповещение
                            informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                        },
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: true, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                            sendToLO: false // Кнопка Отправить в ЛО
                        }
                    },
                    docs: {
                        select: {
                            selectType: true, // Дропдаун - Выберите тип
                            chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                            chooseTheUser: true // Дропдаун - Выберите пользователя
                        },
                        reports: {
                            fir_10: false
                        }
                    },
                    dept: {
                        canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                        showDeptList: true, // Отображать список департаментов.
                        buttons: {
                            saveCaraul: true, // Кнопка Сохранить (караул)
                            closeDept: true, // Кнопка Закрыть
                            isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                            unloading: false // Кнопка Выгрузить
                        }
                    },
                    protocol: {
                        buttons: {
                            editTime: false // Кнопка редактирования времени в протоколе
                        }
                    }
                }
            },

        },

        'Наманганская область': {
            dispatchers: {
                role: 'Диспетчер',
                isPCH: false, // Для правильного определения роли
                words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                    pch: 'СЧ',
                    frontNotes: 'Строевые записки',
                    fireDept: 'Спасательная часть',
                    pchEngine: 'СЧ/ТИП/Гос№',
                    fire: 'Происшествие',
                    fires: 'Происшествия',
                    incidents: 'происшествий',
                    fireDepartment: 'Спасательная',
                    fireDeptSel: 'Спасательную',
                    fireEquipment: 'Спасательные части',
                    OFPS: 'СО',
                    UPO: 'СО',
                    OPO: 'СО',
                    'прибыла': 'прибыла',
                    region: 'Обл.'
                },
                fireInfo: { // Верхняя строка информации о пожаре
                    guard: true,
                    number: true,
                    pchNumber: true,
                    address: true,
                    state: true,
                    externalSystem: true,
                    pch: true,
                    district: true,
                    rank: false,
                    type: true
                },
                mapStyles: { // Настройки для карты
                    fireIcon: '\uf0ad'
                },
                commonSwitches: { // Общие выключатели на весь комплекс
                    rank: false, //Ранг
                    rankMax: false, // Максимальный ранг
                    modifiers: false, // Модификаторы
                    firstTrunk: false, // Первый ствол
                    LOG: false, // ЛОГ
                    PO: false, // ПО
                    GZDS: false, // ГЗДС
                    halfAG: false, // 1/2/AG
                    warehousePO: false, // ПО на складе
                    SPT: false //СПТ
                },
                fireList: { // В таблице со списком пожаров
                    rank: false,
                    rankMax: false,
                },
                wrappers: { // Подложки дизайна
                    selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                    fastCommandLine: true, // Подложка для строки поиска
                    fastAdditionOfCars: true // Строка быстрого добавления машин
                },
                fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                    NZ: true, // Комманда"НЗ"
                    SZ: true, // Комманда"СЗ"
                    ST: true, // Комманда"СТ"
                    NT: true, // Комманда"НТ"
                    KR: true, // Комманда"КР"
                    messages: true // Сообщение
                },
                mainMenu: { // Основоное меню

                    fires: true, // Пожары
                    newApplication: true, // Новая заявка
                    technique: true, // Техника
                    documentation: { // Документы
                        view: true,
                        subMenu: { // Архивы
                            reports: true, // Отчеты
                            downloadFromSHS: false // Загрузить из ШС
                        }
                    },
                    archives: {
                        view: true,
                        subMenu: { // Архивы
                            archiveOfFires: true, // Архив пожаров
                            editingForms6: true, // Редактирование форм 6
                            cards: true, // Карточки пожаров
                            warNotes: true // Строевые записки
                        }
                    },
                    warNotes: { // Строевые записки
                        view: true,
                        subMenu: { // Архивы
                            frontNotesOfPCH: true, // Строевые записки ПЧ
                            frontForGarrison: true, // Строевая за гарнизон
                            equipment: true, // Оборудование
                            protocol: true, // Протокол
                            officials: true, // Должностные лица
                            inCalculationAll: true, // В расчет все
                            disableAll: true // Выкл все
                        }
                    },
                    bridges: false, // Мосты
                    hydrants: false // Гидранты
                },
                map: true, // Карта справа от основного меню
                messages: true, // Сообщения справа от основного меню
                selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
                cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
                stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
                fastCommandLine: true, // Строка для ввода команд
                fastAdditionOfCars: true, // Строка быстрого добавления машин
                showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
                states: {
                    frontNotes: {
                        engineCondition: true // Кнопка "Состояние техники"
                    },
                    firebase: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            firstStvol: false, // Кнопка подача первого ствола
                            LOG: false, // Кнопка ЛОГ
                            cancelTheOrder: true, // Кнопка Аннулировать заявку
                            specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                            approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                            rankButtons: false, // Кнопки изменения ранга пожара
                            modifiersButtons: false // Кнопка Модификаторы
                        }
                    },
                    newFireCard: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: false, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                        }
                    },
                    newOrder: {
                        buttons: {
                            unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                        }
                    },
                    order: {
                        editOrderButton: true, // Кнопка редактировать заявку
                        tabs: {
                            notification: true, // Вкладка Оповещение
                            informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                        },
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: true, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                            sendToLO: false // Кнопка Отправить в ЛО
                        }
                    },
                    docs: {
                        select: {
                            selectType: true, // Дропдаун - Выберите тип
                            chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                            chooseTheUser: true // Дропдаун - Выберите пользователя
                        },
                        reports: {
                            fir_10: false
                        }
                    },
                    dept: {
                        canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                        showDeptList: true, // Отображать список департаментов.
                        buttons: {
                            saveCaraul: true, // Кнопка Сохранить (караул)
                            closeDept: true, // Кнопка Закрыть
                            isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                            unloading: false // Кнопка Выгрузить
                        }
                    },
                    protocol: {
                        buttons: {
                            editTime: false // Кнопка редактирования времени в протоколе
                        }
                    }
                }
            },

            dispatchersManager: {
                role: 'Старший диспетчер',
                isPCH: false, // Для правильного определения роли
                words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                    pch: 'СЧ',
                    frontNotes: 'Строевые записки',
                    fireDept: 'Спасательная часть',
                    pchEngine: 'СЧ/ТИП/Гос№',
                    fire: 'Происшествие',
                    fires: 'Происшествия',
                    incidents: 'происшествий',
                    fireDepartment: 'Спасательная',
                    fireDeptSel: 'Спасательную',
                    fireEquipment: 'Спасательные части',
                    OFPS: 'СО',
                    UPO: 'СО',
                    OPO: 'СО',
                    'прибыла': 'прибыла',
                    region: 'Обл.'
                },
                fireInfo: { // Верхняя строка информации о пожаре
                    guard: true,
                    number: true,
                    pchNumber: true,
                    address: true,
                    state: true,
                    externalSystem: true,
                    pch: true,
                    district: true,
                    rank: false,
                    type: true
                },
                mapStyles: { // Настройки для карты
                    fireIcon: '\uf0ad'
                },
                commonSwitches: { // Общие выключатели на весь комплекс
                    rank: false, //Ранг
                    rankMax: false, // Максимальный ранг
                    modifiers: false, // Модификаторы
                    firstTrunk: false, // Первый ствол
                    LOG: false, // ЛОГ
                    PO: false, // ПО
                    GZDS: false, // ГЗДС
                    halfAG: false, // 1/2/AG
                    warehousePO: false, // ПО на складе
                    SPT: false //СПТ
                },
                fireList: { // В таблице со списком пожаров
                    rank: false,
                    rankMax: false,
                },
                wrappers: { // Подложки дизайна
                    selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                    fastCommandLine: true, // Подложка для строки поиска
                    fastAdditionOfCars: true // Строка быстрого добавления машин
                },
                fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                    NZ: true, // Комманда"НЗ"
                    SZ: true, // Комманда"СЗ"
                    ST: true, // Комманда"СТ"
                    NT: true, // Комманда"НТ"
                    KR: true, // Комманда"КР"
                    messages: true // Сообщение
                },
                mainMenu: { // Основоное меню

                    fires: true, // Пожары
                    newApplication: true, // Новая заявка
                    technique: true, // Техника
                    documentation: { // Документы
                        view: true,
                        subMenu: { // Архивы
                            reports: true, // Отчеты
                            downloadFromSHS: false // Загрузить из ШС
                        }
                    },
                    archives: {
                        view: true,
                        subMenu: { // Архивы
                            archiveOfFires: true, // Архив пожаров
                            editingForms6: true, // Редактирование форм 6
                            cards: true, // Карточки пожаров
                            warNotes: true // Строевые записки
                        }
                    },
                    warNotes: { // Строевые записки
                        view: true,
                        subMenu: { // Архивы
                            frontNotesOfPCH: true, // Строевые записки ПЧ
                            frontForGarrison: true, // Строевая за гарнизон
                            equipment: true, // Оборудование
                            protocol: true, // Протокол
                            officials: true, // Должностные лица
                            inCalculationAll: true, // В расчет все
                            disableAll: true // Выкл все
                        }
                    },
                    bridges: false, // Мосты
                    hydrants: false // Гидранты
                },
                map: true, // Карта справа от основного меню
                messages: true, // Сообщения справа от основного меню
                selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
                cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
                stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
                fastCommandLine: true, // Строка для ввода команд
                fastAdditionOfCars: true, // Строка быстрого добавления машин
                showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
                states: {
                    frontNotes: {
                        engineCondition: true // Кнопка "Состояние техники"
                    },
                    firebase: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            firstStvol: false, // Кнопка подача первого ствола
                            LOG: false, // Кнопка ЛОГ
                            cancelTheOrder: true, // Кнопка Аннулировать заявку
                            specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                            approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                            rankButtons: false, // Кнопки изменения ранга пожара
                            modifiersButtons: false // Кнопка Модификаторы
                        }
                    },
                    newFireCard: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: false, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                        }
                    },
                    newOrder: {
                        buttons: {
                            unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                        }
                    },
                    order: {
                        editOrderButton: true, // Кнопка редактировать заявку
                        tabs: {
                            notification: true, // Вкладка Оповещение
                            informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                        },
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: true, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                            sendToLO: false // Кнопка Отправить в ЛО
                        }
                    },
                    docs: {
                        select: {
                            selectType: true, // Дропдаун - Выберите тип
                            chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                            chooseTheUser: true // Дропдаун - Выберите пользователя
                        },
                        reports: {
                            fir_10: false
                        }
                    },
                    dept: {
                        canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                        showDeptList: true, // Отображать список департаментов.
                        buttons: {
                            saveCaraul: true, // Кнопка Сохранить (караул)
                            closeDept: true, // Кнопка Закрыть
                            isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                            unloading: false // Кнопка Выгрузить
                        }
                    },
                    protocol: {
                        buttons: {
                            editTime: false // Кнопка редактирования времени в протоколе
                        }
                    }
                }
            },

        },

        'Самаркандская область': {
            dispatchers: {
                role: 'Диспетчер',
                isPCH: false, // Для правильного определения роли
                words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                    pch: 'СЧ',
                    frontNotes: 'Строевые записки',
                    fireDept: 'Спасательная часть',
                    pchEngine: 'СЧ/ТИП/Гос№',
                    fire: 'Происшествие',
                    fires: 'Происшествия',
                    incidents: 'происшествий',
                    fireDepartment: 'Спасательная',
                    fireDeptSel: 'Спасательную',
                    fireEquipment: 'Спасательные части',
                    OFPS: 'СО',
                    UPO: 'СО',
                    OPO: 'СО',
                    'прибыла': 'прибыла',
                    region: 'Обл.'
                },
                fireInfo: { // Верхняя строка информации о пожаре
                    guard: true,
                    number: true,
                    pchNumber: true,
                    address: true,
                    state: true,
                    externalSystem: true,
                    pch: true,
                    district: true,
                    rank: false,
                    type: true
                },
                mapStyles: { // Настройки для карты
                    fireIcon: '\uf0ad'
                },
                commonSwitches: { // Общие выключатели на весь комплекс
                    rank: false, //Ранг
                    rankMax: false, // Максимальный ранг
                    modifiers: false, // Модификаторы
                    firstTrunk: false, // Первый ствол
                    LOG: false, // ЛОГ
                    PO: false, // ПО
                    GZDS: false, // ГЗДС
                    halfAG: false, // 1/2/AG
                    warehousePO: false, // ПО на складе
                    SPT: false //СПТ
                },
                fireList: { // В таблице со списком пожаров
                    rank: false,
                    rankMax: false,
                },
                wrappers: { // Подложки дизайна
                    selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                    fastCommandLine: true, // Подложка для строки поиска
                    fastAdditionOfCars: true // Строка быстрого добавления машин
                },
                fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                    NZ: true, // Комманда"НЗ"
                    SZ: true, // Комманда"СЗ"
                    ST: true, // Комманда"СТ"
                    NT: true, // Комманда"НТ"
                    KR: true, // Комманда"КР"
                    messages: true // Сообщение
                },
                mainMenu: { // Основоное меню

                    fires: true, // Пожары
                    newApplication: true, // Новая заявка
                    technique: true, // Техника
                    documentation: { // Документы
                        view: true,
                        subMenu: { // Архивы
                            reports: true, // Отчеты
                            downloadFromSHS: false // Загрузить из ШС
                        }
                    },
                    archives: {
                        view: true,
                        subMenu: { // Архивы
                            archiveOfFires: true, // Архив пожаров
                            editingForms6: true, // Редактирование форм 6
                            cards: true, // Карточки пожаров
                            warNotes: true // Строевые записки
                        }
                    },
                    warNotes: { // Строевые записки
                        view: true,
                        subMenu: { // Архивы
                            frontNotesOfPCH: true, // Строевые записки ПЧ
                            frontForGarrison: true, // Строевая за гарнизон
                            equipment: true, // Оборудование
                            protocol: true, // Протокол
                            officials: true, // Должностные лица
                            inCalculationAll: true, // В расчет все
                            disableAll: true // Выкл все
                        }
                    },
                    bridges: false, // Мосты
                    hydrants: false // Гидранты
                },
                map: true, // Карта справа от основного меню
                messages: true, // Сообщения справа от основного меню
                selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
                cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
                stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
                fastCommandLine: true, // Строка для ввода команд
                fastAdditionOfCars: true, // Строка быстрого добавления машин
                showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
                states: {
                    frontNotes: {
                        engineCondition: true // Кнопка "Состояние техники"
                    },
                    firebase: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            firstStvol: false, // Кнопка подача первого ствола
                            LOG: false, // Кнопка ЛОГ
                            cancelTheOrder: true, // Кнопка Аннулировать заявку
                            specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                            approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                            rankButtons: false, // Кнопки изменения ранга пожара
                            modifiersButtons: false // Кнопка Модификаторы
                        }
                    },
                    newFireCard: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: false, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                        }
                    },
                    newOrder: {
                        buttons: {
                            unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                        }
                    },
                    order: {
                        editOrderButton: true, // Кнопка редактировать заявку
                        tabs: {
                            notification: true, // Вкладка Оповещение
                            informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                        },
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: true, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                            sendToLO: false // Кнопка Отправить в ЛО
                        }
                    },
                    docs: {
                        select: {
                            selectType: true, // Дропдаун - Выберите тип
                            chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                            chooseTheUser: true // Дропдаун - Выберите пользователя
                        },
                        reports: {
                            fir_10: false
                        }
                    },
                    dept: {
                        canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                        showDeptList: true, // Отображать список департаментов.
                        buttons: {
                            saveCaraul: true, // Кнопка Сохранить (караул)
                            closeDept: true, // Кнопка Закрыть
                            isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                            unloading: false // Кнопка Выгрузить
                        }
                    },
                    protocol: {
                        buttons: {
                            editTime: false // Кнопка редактирования времени в протоколе
                        }
                    }
                }
            },

            dispatchersManager: {
                role: 'Старший диспетчер',
                isPCH: false, // Для правильного определения роли
                words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                    pch: 'СЧ',
                    frontNotes: 'Строевые записки',
                    fireDept: 'Спасательная часть',
                    pchEngine: 'СЧ/ТИП/Гос№',
                    fire: 'Происшествие',
                    fires: 'Происшествия',
                    incidents: 'происшествий',
                    fireDepartment: 'Спасательная',
                    fireDeptSel: 'Спасательную',
                    fireEquipment: 'Спасательные части',
                    OFPS: 'СО',
                    UPO: 'СО',
                    OPO: 'СО',
                    'прибыла': 'прибыла',
                    region: 'Обл.'
                },
                fireInfo: { // Верхняя строка информации о пожаре
                    guard: true,
                    number: true,
                    pchNumber: true,
                    address: true,
                    state: true,
                    externalSystem: true,
                    pch: true,
                    district: true,
                    rank: false,
                    type: true
                },
                mapStyles: { // Настройки для карты
                    fireIcon: '\uf0ad'
                },
                commonSwitches: { // Общие выключатели на весь комплекс
                    rank: false, //Ранг
                    rankMax: false, // Максимальный ранг
                    modifiers: false, // Модификаторы
                    firstTrunk: false, // Первый ствол
                    LOG: false, // ЛОГ
                    PO: false, // ПО
                    GZDS: false, // ГЗДС
                    halfAG: false, // 1/2/AG
                    warehousePO: false, // ПО на складе
                    SPT: false //СПТ
                },
                fireList: { // В таблице со списком пожаров
                    rank: false,
                    rankMax: false,
                },
                wrappers: { // Подложки дизайна
                    selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                    fastCommandLine: true, // Подложка для строки поиска
                    fastAdditionOfCars: true // Строка быстрого добавления машин
                },
                fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                    NZ: true, // Комманда"НЗ"
                    SZ: true, // Комманда"СЗ"
                    ST: true, // Комманда"СТ"
                    NT: true, // Комманда"НТ"
                    KR: true, // Комманда"КР"
                    messages: true // Сообщение
                },
                mainMenu: { // Основоное меню

                    fires: true, // Пожары
                    newApplication: true, // Новая заявка
                    technique: true, // Техника
                    documentation: { // Документы
                        view: true,
                        subMenu: { // Архивы
                            reports: true, // Отчеты
                            downloadFromSHS: false // Загрузить из ШС
                        }
                    },
                    archives: {
                        view: true,
                        subMenu: { // Архивы
                            archiveOfFires: true, // Архив пожаров
                            editingForms6: true, // Редактирование форм 6
                            cards: true, // Карточки пожаров
                            warNotes: true // Строевые записки
                        }
                    },
                    warNotes: { // Строевые записки
                        view: true,
                        subMenu: { // Архивы
                            frontNotesOfPCH: true, // Строевые записки ПЧ
                            frontForGarrison: true, // Строевая за гарнизон
                            equipment: true, // Оборудование
                            protocol: true, // Протокол
                            officials: true, // Должностные лица
                            inCalculationAll: true, // В расчет все
                            disableAll: true // Выкл все
                        }
                    },
                    bridges: false, // Мосты
                    hydrants: false // Гидранты
                },
                map: true, // Карта справа от основного меню
                messages: true, // Сообщения справа от основного меню
                selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
                cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
                stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
                fastCommandLine: true, // Строка для ввода команд
                fastAdditionOfCars: true, // Строка быстрого добавления машин
                showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
                states: {
                    frontNotes: {
                        engineCondition: true // Кнопка "Состояние техники"
                    },
                    firebase: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            firstStvol: false, // Кнопка подача первого ствола
                            LOG: false, // Кнопка ЛОГ
                            cancelTheOrder: true, // Кнопка Аннулировать заявку
                            specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                            approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                            rankButtons: false, // Кнопки изменения ранга пожара
                            modifiersButtons: false // Кнопка Модификаторы
                        }
                    },
                    newFireCard: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: false, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                        }
                    },
                    newOrder: {
                        buttons: {
                            unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                        }
                    },
                    order: {
                        editOrderButton: true, // Кнопка редактировать заявку
                        tabs: {
                            notification: true, // Вкладка Оповещение
                            informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                        },
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: true, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                            sendToLO: false // Кнопка Отправить в ЛО
                        }
                    },
                    docs: {
                        select: {
                            selectType: true, // Дропдаун - Выберите тип
                            chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                            chooseTheUser: true // Дропдаун - Выберите пользователя
                        },
                        reports: {
                            fir_10: false
                        }
                    },
                    dept: {
                        canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                        showDeptList: true, // Отображать список департаментов.
                        buttons: {
                            saveCaraul: true, // Кнопка Сохранить (караул)
                            closeDept: true, // Кнопка Закрыть
                            isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                            unloading: false // Кнопка Выгрузить
                        }
                    },
                    protocol: {
                        buttons: {
                            editTime: false // Кнопка редактирования времени в протоколе
                        }
                    }
                }
            },

        },

        'Сурхандарьинская область': {
            dispatchers: {
                role: 'Диспетчер',
                isPCH: false, // Для правильного определения роли
                words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                    pch: 'СЧ',
                    frontNotes: 'Строевые записки',
                    fireDept: 'Спасательная часть',
                    pchEngine: 'СЧ/ТИП/Гос№',
                    fire: 'Происшествие',
                    fires: 'Происшествия',
                    incidents: 'происшествий',
                    fireDepartment: 'Спасательная',
                    fireDeptSel: 'Спасательную',
                    fireEquipment: 'Спасательные части',
                    OFPS: 'СО',
                    UPO: 'СО',
                    OPO: 'СО',
                    'прибыла': 'прибыла',
                    region: 'Обл.'
                },
                fireInfo: { // Верхняя строка информации о пожаре
                    guard: true,
                    number: true,
                    pchNumber: true,
                    address: true,
                    state: true,
                    externalSystem: true,
                    pch: true,
                    district: true,
                    rank: false,
                    type: true
                },
                mapStyles: { // Настройки для карты
                    fireIcon: '\uf0ad'
                },
                commonSwitches: { // Общие выключатели на весь комплекс
                    rank: false, //Ранг
                    rankMax: false, // Максимальный ранг
                    modifiers: false, // Модификаторы
                    firstTrunk: false, // Первый ствол
                    LOG: false, // ЛОГ
                    PO: false, // ПО
                    GZDS: false, // ГЗДС
                    halfAG: false, // 1/2/AG
                    warehousePO: false, // ПО на складе
                    SPT: false //СПТ
                },
                fireList: { // В таблице со списком пожаров
                    rank: false,
                    rankMax: false,
                },
                wrappers: { // Подложки дизайна
                    selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                    fastCommandLine: true, // Подложка для строки поиска
                    fastAdditionOfCars: true // Строка быстрого добавления машин
                },
                fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                    NZ: true, // Комманда"НЗ"
                    SZ: true, // Комманда"СЗ"
                    ST: true, // Комманда"СТ"
                    NT: true, // Комманда"НТ"
                    KR: true, // Комманда"КР"
                    messages: true // Сообщение
                },
                mainMenu: { // Основоное меню

                    fires: true, // Пожары
                    newApplication: true, // Новая заявка
                    technique: true, // Техника
                    documentation: { // Документы
                        view: true,
                        subMenu: { // Архивы
                            reports: true, // Отчеты
                            downloadFromSHS: false // Загрузить из ШС
                        }
                    },
                    archives: {
                        view: true,
                        subMenu: { // Архивы
                            archiveOfFires: true, // Архив пожаров
                            editingForms6: true, // Редактирование форм 6
                            cards: true, // Карточки пожаров
                            warNotes: true // Строевые записки
                        }
                    },
                    warNotes: { // Строевые записки
                        view: true,
                        subMenu: { // Архивы
                            frontNotesOfPCH: true, // Строевые записки ПЧ
                            frontForGarrison: true, // Строевая за гарнизон
                            equipment: true, // Оборудование
                            protocol: true, // Протокол
                            officials: true, // Должностные лица
                            inCalculationAll: true, // В расчет все
                            disableAll: true // Выкл все
                        }
                    },
                    bridges: false, // Мосты
                    hydrants: false // Гидранты
                },
                map: true, // Карта справа от основного меню
                messages: true, // Сообщения справа от основного меню
                selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
                cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
                stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
                fastCommandLine: true, // Строка для ввода команд
                fastAdditionOfCars: true, // Строка быстрого добавления машин
                showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
                states: {
                    frontNotes: {
                        engineCondition: true // Кнопка "Состояние техники"
                    },
                    firebase: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            firstStvol: false, // Кнопка подача первого ствола
                            LOG: false, // Кнопка ЛОГ
                            cancelTheOrder: true, // Кнопка Аннулировать заявку
                            specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                            approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                            rankButtons: false, // Кнопки изменения ранга пожара
                            modifiersButtons: false // Кнопка Модификаторы
                        }
                    },
                    newFireCard: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: false, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                        }
                    },
                    newOrder: {
                        buttons: {
                            unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                        }
                    },
                    order: {
                        editOrderButton: true, // Кнопка редактировать заявку
                        tabs: {
                            notification: true, // Вкладка Оповещение
                            informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                        },
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: true, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                            sendToLO: false // Кнопка Отправить в ЛО
                        }
                    },
                    docs: {
                        select: {
                            selectType: true, // Дропдаун - Выберите тип
                            chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                            chooseTheUser: true // Дропдаун - Выберите пользователя
                        },
                        reports: {
                            fir_10: false
                        }
                    },
                    dept: {
                        canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                        showDeptList: true, // Отображать список департаментов.
                        buttons: {
                            saveCaraul: true, // Кнопка Сохранить (караул)
                            closeDept: true, // Кнопка Закрыть
                            isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                            unloading: false // Кнопка Выгрузить
                        }
                    },
                    protocol: {
                        buttons: {
                            editTime: false // Кнопка редактирования времени в протоколе
                        }
                    }
                }
            },

            dispatchersManager: {
                role: 'Старший диспетчер',
                isPCH: false, // Для правильного определения роли
                words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                    pch: 'СЧ',
                    frontNotes: 'Строевые записки',
                    fireDept: 'Спасательная часть',
                    pchEngine: 'СЧ/ТИП/Гос№',
                    fire: 'Происшествие',
                    fires: 'Происшествия',
                    incidents: 'происшествий',
                    fireDepartment: 'Спасательная',
                    fireDeptSel: 'Спасательную',
                    fireEquipment: 'Спасательные части',
                    OFPS: 'СО',
                    UPO: 'СО',
                    OPO: 'СО',
                    'прибыла': 'прибыла',
                    region: 'Обл.'
                },
                fireInfo: { // Верхняя строка информации о пожаре
                    guard: true,
                    number: true,
                    pchNumber: true,
                    address: true,
                    state: true,
                    externalSystem: true,
                    pch: true,
                    district: true,
                    rank: false,
                    type: true
                },
                mapStyles: { // Настройки для карты
                    fireIcon: '\uf0ad'
                },
                commonSwitches: { // Общие выключатели на весь комплекс
                    rank: false, //Ранг
                    rankMax: false, // Максимальный ранг
                    modifiers: false, // Модификаторы
                    firstTrunk: false, // Первый ствол
                    LOG: false, // ЛОГ
                    PO: false, // ПО
                    GZDS: false, // ГЗДС
                    halfAG: false, // 1/2/AG
                    warehousePO: false, // ПО на складе
                    SPT: false //СПТ
                },
                fireList: { // В таблице со списком пожаров
                    rank: false,
                    rankMax: false,
                },
                wrappers: { // Подложки дизайна
                    selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                    fastCommandLine: true, // Подложка для строки поиска
                    fastAdditionOfCars: true // Строка быстрого добавления машин
                },
                fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                    NZ: true, // Комманда"НЗ"
                    SZ: true, // Комманда"СЗ"
                    ST: true, // Комманда"СТ"
                    NT: true, // Комманда"НТ"
                    KR: true, // Комманда"КР"
                    messages: true // Сообщение
                },
                mainMenu: { // Основоное меню

                    fires: true, // Пожары
                    newApplication: true, // Новая заявка
                    technique: true, // Техника
                    documentation: { // Документы
                        view: true,
                        subMenu: { // Архивы
                            reports: true, // Отчеты
                            downloadFromSHS: false // Загрузить из ШС
                        }
                    },
                    archives: {
                        view: true,
                        subMenu: { // Архивы
                            archiveOfFires: true, // Архив пожаров
                            editingForms6: true, // Редактирование форм 6
                            cards: true, // Карточки пожаров
                            warNotes: true // Строевые записки
                        }
                    },
                    warNotes: { // Строевые записки
                        view: true,
                        subMenu: { // Архивы
                            frontNotesOfPCH: true, // Строевые записки ПЧ
                            frontForGarrison: true, // Строевая за гарнизон
                            equipment: true, // Оборудование
                            protocol: true, // Протокол
                            officials: true, // Должностные лица
                            inCalculationAll: true, // В расчет все
                            disableAll: true // Выкл все
                        }
                    },
                    bridges: false, // Мосты
                    hydrants: false // Гидранты
                },
                map: true, // Карта справа от основного меню
                messages: true, // Сообщения справа от основного меню
                selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
                cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
                stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
                fastCommandLine: true, // Строка для ввода команд
                fastAdditionOfCars: true, // Строка быстрого добавления машин
                showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
                states: {
                    frontNotes: {
                        engineCondition: true // Кнопка "Состояние техники"
                    },
                    firebase: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            firstStvol: false, // Кнопка подача первого ствола
                            LOG: false, // Кнопка ЛОГ
                            cancelTheOrder: true, // Кнопка Аннулировать заявку
                            specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                            approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                            rankButtons: false, // Кнопки изменения ранга пожара
                            modifiersButtons: false // Кнопка Модификаторы
                        }
                    },
                    newFireCard: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: false, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                        }
                    },
                    newOrder: {
                        buttons: {
                            unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                        }
                    },
                    order: {
                        editOrderButton: true, // Кнопка редактировать заявку
                        tabs: {
                            notification: true, // Вкладка Оповещение
                            informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                        },
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: true, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                            sendToLO: false // Кнопка Отправить в ЛО
                        }
                    },
                    docs: {
                        select: {
                            selectType: true, // Дропдаун - Выберите тип
                            chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                            chooseTheUser: true // Дропдаун - Выберите пользователя
                        },
                        reports: {
                            fir_10: false
                        }
                    },
                    dept: {
                        canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                        showDeptList: true, // Отображать список департаментов.
                        buttons: {
                            saveCaraul: true, // Кнопка Сохранить (караул)
                            closeDept: true, // Кнопка Закрыть
                            isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                            unloading: false // Кнопка Выгрузить
                        }
                    },
                    protocol: {
                        buttons: {
                            editTime: false // Кнопка редактирования времени в протоколе
                        }
                    }
                }
            },

        },

        'Сырдарьинская область': {
            dispatchers: {
                role: 'Диспетчер',
                isPCH: false, // Для правильного определения роли
                words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                    pch: 'СЧ',
                    frontNotes: 'Строевые записки',
                    fireDept: 'Спасательная часть',
                    pchEngine: 'СЧ/ТИП/Гос№',
                    fire: 'Происшествие',
                    fires: 'Происшествия',
                    incidents: 'происшествий',
                    fireDepartment: 'Спасательная',
                    fireDeptSel: 'Спасательную',
                    fireEquipment: 'Спасательные части',
                    OFPS: 'СО',
                    UPO: 'СО',
                    OPO: 'СО',
                    'прибыла': 'прибыла',
                    region: 'Обл.'
                },
                fireInfo: { // Верхняя строка информации о пожаре
                    guard: true,
                    number: true,
                    pchNumber: true,
                    address: true,
                    state: true,
                    externalSystem: true,
                    pch: true,
                    district: true,
                    rank: false,
                    type: true
                },
                mapStyles: { // Настройки для карты
                    fireIcon: '\uf0ad'
                },
                commonSwitches: { // Общие выключатели на весь комплекс
                    rank: false, //Ранг
                    rankMax: false, // Максимальный ранг
                    modifiers: false, // Модификаторы
                    firstTrunk: false, // Первый ствол
                    LOG: false, // ЛОГ
                    PO: false, // ПО
                    GZDS: false, // ГЗДС
                    halfAG: false, // 1/2/AG
                    warehousePO: false, // ПО на складе
                    SPT: false //СПТ
                },
                fireList: { // В таблице со списком пожаров
                    rank: false,
                    rankMax: false,
                },
                wrappers: { // Подложки дизайна
                    selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                    fastCommandLine: true, // Подложка для строки поиска
                    fastAdditionOfCars: true // Строка быстрого добавления машин
                },
                fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                    NZ: true, // Комманда"НЗ"
                    SZ: true, // Комманда"СЗ"
                    ST: true, // Комманда"СТ"
                    NT: true, // Комманда"НТ"
                    KR: true, // Комманда"КР"
                    messages: true // Сообщение
                },
                mainMenu: { // Основоное меню

                    fires: true, // Пожары
                    newApplication: true, // Новая заявка
                    technique: true, // Техника
                    documentation: { // Документы
                        view: true,
                        subMenu: { // Архивы
                            reports: true, // Отчеты
                            downloadFromSHS: false // Загрузить из ШС
                        }
                    },
                    archives: {
                        view: true,
                        subMenu: { // Архивы
                            archiveOfFires: true, // Архив пожаров
                            editingForms6: true, // Редактирование форм 6
                            cards: true, // Карточки пожаров
                            warNotes: true // Строевые записки
                        }
                    },
                    warNotes: { // Строевые записки
                        view: true,
                        subMenu: { // Архивы
                            frontNotesOfPCH: true, // Строевые записки ПЧ
                            frontForGarrison: true, // Строевая за гарнизон
                            equipment: true, // Оборудование
                            protocol: true, // Протокол
                            officials: true, // Должностные лица
                            inCalculationAll: true, // В расчет все
                            disableAll: true // Выкл все
                        }
                    },
                    bridges: false, // Мосты
                    hydrants: false // Гидранты
                },
                map: true, // Карта справа от основного меню
                messages: true, // Сообщения справа от основного меню
                selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
                cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
                stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
                fastCommandLine: true, // Строка для ввода команд
                fastAdditionOfCars: true, // Строка быстрого добавления машин
                showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
                states: {
                    frontNotes: {
                        engineCondition: true // Кнопка "Состояние техники"
                    },
                    firebase: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            firstStvol: false, // Кнопка подача первого ствола
                            LOG: false, // Кнопка ЛОГ
                            cancelTheOrder: true, // Кнопка Аннулировать заявку
                            specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                            approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                            rankButtons: false, // Кнопки изменения ранга пожара
                            modifiersButtons: false // Кнопка Модификаторы
                        }
                    },
                    newFireCard: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: false, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                        }
                    },
                    newOrder: {
                        buttons: {
                            unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                        }
                    },
                    order: {
                        editOrderButton: true, // Кнопка редактировать заявку
                        tabs: {
                            notification: true, // Вкладка Оповещение
                            informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                        },
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: true, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                            sendToLO: false // Кнопка Отправить в ЛО
                        }
                    },
                    docs: {
                        select: {
                            selectType: true, // Дропдаун - Выберите тип
                            chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                            chooseTheUser: true // Дропдаун - Выберите пользователя
                        },
                        reports: {
                            fir_10: false
                        }
                    },
                    dept: {
                        canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                        showDeptList: true, // Отображать список департаментов.
                        buttons: {
                            saveCaraul: true, // Кнопка Сохранить (караул)
                            closeDept: true, // Кнопка Закрыть
                            isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                            unloading: false // Кнопка Выгрузить
                        }
                    },
                    protocol: {
                        buttons: {
                            editTime: false // Кнопка редактирования времени в протоколе
                        }
                    }
                }
            },

            dispatchersManager: {
                role: 'Старший диспетчер',
                isPCH: false, // Для правильного определения роли
                words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                    pch: 'СЧ',
                    frontNotes: 'Строевые записки',
                    fireDept: 'Спасательная часть',
                    pchEngine: 'СЧ/ТИП/Гос№',
                    fire: 'Происшествие',
                    fires: 'Происшествия',
                    incidents: 'происшествий',
                    fireDepartment: 'Спасательная',
                    fireDeptSel: 'Спасательную',
                    fireEquipment: 'Спасательные части',
                    OFPS: 'СО',
                    UPO: 'СО',
                    OPO: 'СО',
                    'прибыла': 'прибыла',
                    region: 'Обл.'
                },
                fireInfo: { // Верхняя строка информации о пожаре
                    guard: true,
                    number: true,
                    pchNumber: true,
                    address: true,
                    state: true,
                    externalSystem: true,
                    pch: true,
                    district: true,
                    rank: false,
                    type: true
                },
                mapStyles: { // Настройки для карты
                    fireIcon: '\uf0ad'
                },
                commonSwitches: { // Общие выключатели на весь комплекс
                    rank: false, //Ранг
                    rankMax: false, // Максимальный ранг
                    modifiers: false, // Модификаторы
                    firstTrunk: false, // Первый ствол
                    LOG: false, // ЛОГ
                    PO: false, // ПО
                    GZDS: false, // ГЗДС
                    halfAG: false, // 1/2/AG
                    warehousePO: false, // ПО на складе
                    SPT: false //СПТ
                },
                fireList: { // В таблице со списком пожаров
                    rank: false,
                    rankMax: false,
                },
                wrappers: { // Подложки дизайна
                    selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                    fastCommandLine: true, // Подложка для строки поиска
                    fastAdditionOfCars: true // Строка быстрого добавления машин
                },
                fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                    NZ: true, // Комманда"НЗ"
                    SZ: true, // Комманда"СЗ"
                    ST: true, // Комманда"СТ"
                    NT: true, // Комманда"НТ"
                    KR: true, // Комманда"КР"
                    messages: true // Сообщение
                },
                mainMenu: { // Основоное меню

                    fires: true, // Пожары
                    newApplication: true, // Новая заявка
                    technique: true, // Техника
                    documentation: { // Документы
                        view: true,
                        subMenu: { // Архивы
                            reports: true, // Отчеты
                            downloadFromSHS: false // Загрузить из ШС
                        }
                    },
                    archives: {
                        view: true,
                        subMenu: { // Архивы
                            archiveOfFires: true, // Архив пожаров
                            editingForms6: true, // Редактирование форм 6
                            cards: true, // Карточки пожаров
                            warNotes: true // Строевые записки
                        }
                    },
                    warNotes: { // Строевые записки
                        view: true,
                        subMenu: { // Архивы
                            frontNotesOfPCH: true, // Строевые записки ПЧ
                            frontForGarrison: true, // Строевая за гарнизон
                            equipment: true, // Оборудование
                            protocol: true, // Протокол
                            officials: true, // Должностные лица
                            inCalculationAll: true, // В расчет все
                            disableAll: true // Выкл все
                        }
                    },
                    bridges: false, // Мосты
                    hydrants: false // Гидранты
                },
                map: true, // Карта справа от основного меню
                messages: true, // Сообщения справа от основного меню
                selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
                cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
                stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
                fastCommandLine: true, // Строка для ввода команд
                fastAdditionOfCars: true, // Строка быстрого добавления машин
                showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
                states: {
                    frontNotes: {
                        engineCondition: true // Кнопка "Состояние техники"
                    },
                    firebase: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            firstStvol: false, // Кнопка подача первого ствола
                            LOG: false, // Кнопка ЛОГ
                            cancelTheOrder: true, // Кнопка Аннулировать заявку
                            specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                            approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                            rankButtons: false, // Кнопки изменения ранга пожара
                            modifiersButtons: false // Кнопка Модификаторы
                        }
                    },
                    newFireCard: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: false, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                        }
                    },
                    newOrder: {
                        buttons: {
                            unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                        }
                    },
                    order: {
                        editOrderButton: true, // Кнопка редактировать заявку
                        tabs: {
                            notification: true, // Вкладка Оповещение
                            informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                        },
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: true, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                            sendToLO: false // Кнопка Отправить в ЛО
                        }
                    },
                    docs: {
                        select: {
                            selectType: true, // Дропдаун - Выберите тип
                            chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                            chooseTheUser: true // Дропдаун - Выберите пользователя
                        },
                        reports: {
                            fir_10: false
                        }
                    },
                    dept: {
                        canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                        showDeptList: true, // Отображать список департаментов.
                        buttons: {
                            saveCaraul: true, // Кнопка Сохранить (караул)
                            closeDept: true, // Кнопка Закрыть
                            isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                            unloading: false // Кнопка Выгрузить
                        }
                    },
                    protocol: {
                        buttons: {
                            editTime: false // Кнопка редактирования времени в протоколе
                        }
                    }
                }
            },

        },

        'Ташкентская область': {
            dispatchers: {
                role: 'Диспетчер',
                isPCH: false, // Для правильного определения роли
                words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                    pch: 'СЧ',
                    frontNotes: 'Строевые записки',
                    fireDept: 'Спасательная часть',
                    pchEngine: 'СЧ/ТИП/Гос№',
                    fire: 'Происшествие',
                    fires: 'Происшествия',
                    incidents: 'происшествий',
                    fireDepartment: 'Спасательная',
                    fireDeptSel: 'Спасательную',
                    fireEquipment: 'Спасательные части',
                    OFPS: 'СО',
                    UPO: 'СО',
                    OPO: 'СО',
                    'прибыла': 'прибыла',
                    region: 'Обл.'
                },
                fireInfo: { // Верхняя строка информации о пожаре
                    guard: true,
                    number: true,
                    pchNumber: true,
                    address: true,
                    state: true,
                    externalSystem: true,
                    pch: true,
                    district: true,
                    rank: false,
                    type: true
                },
                mapStyles: { // Настройки для карты
                    fireIcon: '\uf0ad'
                },
                commonSwitches: { // Общие выключатели на весь комплекс
                    rank: false, //Ранг
                    rankMax: false, // Максимальный ранг
                    modifiers: false, // Модификаторы
                    firstTrunk: false, // Первый ствол
                    LOG: false, // ЛОГ
                    PO: false, // ПО
                    GZDS: false, // ГЗДС
                    halfAG: false, // 1/2/AG
                    warehousePO: false, // ПО на складе
                    SPT: false //СПТ
                },
                fireList: { // В таблице со списком пожаров
                    rank: false,
                    rankMax: false,
                },
                wrappers: { // Подложки дизайна
                    selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                    fastCommandLine: true, // Подложка для строки поиска
                    fastAdditionOfCars: true // Строка быстрого добавления машин
                },
                fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                    NZ: true, // Комманда"НЗ"
                    SZ: true, // Комманда"СЗ"
                    ST: true, // Комманда"СТ"
                    NT: true, // Комманда"НТ"
                    KR: true, // Комманда"КР"
                    messages: true // Сообщение
                },
                mainMenu: { // Основоное меню

                    fires: true, // Пожары
                    newApplication: true, // Новая заявка
                    technique: true, // Техника
                    documentation: { // Документы
                        view: true,
                        subMenu: { // Архивы
                            reports: true, // Отчеты
                            downloadFromSHS: false // Загрузить из ШС
                        }
                    },
                    archives: {
                        view: true,
                        subMenu: { // Архивы
                            archiveOfFires: true, // Архив пожаров
                            editingForms6: true, // Редактирование форм 6
                            cards: true, // Карточки пожаров
                            warNotes: true // Строевые записки
                        }
                    },
                    warNotes: { // Строевые записки
                        view: true,
                        subMenu: { // Архивы
                            frontNotesOfPCH: true, // Строевые записки ПЧ
                            frontForGarrison: true, // Строевая за гарнизон
                            equipment: true, // Оборудование
                            protocol: true, // Протокол
                            officials: true, // Должностные лица
                            inCalculationAll: true, // В расчет все
                            disableAll: true // Выкл все
                        }
                    },
                    bridges: false, // Мосты
                    hydrants: false // Гидранты
                },
                map: true, // Карта справа от основного меню
                messages: true, // Сообщения справа от основного меню
                selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
                cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
                stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
                fastCommandLine: true, // Строка для ввода команд
                fastAdditionOfCars: true, // Строка быстрого добавления машин
                showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
                states: {
                    frontNotes: {
                        engineCondition: true // Кнопка "Состояние техники"
                    },
                    firebase: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            firstStvol: false, // Кнопка подача первого ствола
                            LOG: false, // Кнопка ЛОГ
                            cancelTheOrder: true, // Кнопка Аннулировать заявку
                            specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                            approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                            rankButtons: false, // Кнопки изменения ранга пожара
                            modifiersButtons: false // Кнопка Модификаторы
                        }
                    },
                    newFireCard: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: false, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                        }
                    },
                    newOrder: {
                        buttons: {
                            unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                        }
                    },
                    order: {
                        editOrderButton: true, // Кнопка редактировать заявку
                        tabs: {
                            notification: true, // Вкладка Оповещение
                            informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                        },
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: true, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                            sendToLO: false // Кнопка Отправить в ЛО
                        }
                    },
                    docs: {
                        select: {
                            selectType: true, // Дропдаун - Выберите тип
                            chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                            chooseTheUser: true // Дропдаун - Выберите пользователя
                        },
                        reports: {
                            fir_10: false
                        }
                    },
                    dept: {
                        canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                        showDeptList: true, // Отображать список департаментов.
                        buttons: {
                            saveCaraul: true, // Кнопка Сохранить (караул)
                            closeDept: true, // Кнопка Закрыть
                            isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                            unloading: false // Кнопка Выгрузить
                        }
                    },
                    protocol: {
                        buttons: {
                            editTime: false // Кнопка редактирования времени в протоколе
                        }
                    }
                }
            },

            dispatchersManager: {
                role: 'Старший диспетчер',
                isPCH: false, // Для правильного определения роли
                words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                    pch: 'СЧ',
                    frontNotes: 'Строевые записки',
                    fireDept: 'Спасательная часть',
                    pchEngine: 'СЧ/ТИП/Гос№',
                    fire: 'Происшествие',
                    fires: 'Происшествия',
                    incidents: 'происшествий',
                    fireDepartment: 'Спасательная',
                    fireDeptSel: 'Спасательную',
                    fireEquipment: 'Спасательные части',
                    OFPS: 'СО',
                    UPO: 'СО',
                    OPO: 'СО',
                    'прибыла': 'прибыла',
                    region: 'Обл.'
                },
                fireInfo: { // Верхняя строка информации о пожаре
                    guard: true,
                    number: true,
                    pchNumber: true,
                    address: true,
                    state: true,
                    externalSystem: true,
                    pch: true,
                    district: true,
                    rank: false,
                    type: true
                },
                mapStyles: { // Настройки для карты
                    fireIcon: '\uf0ad'
                },
                commonSwitches: { // Общие выключатели на весь комплекс
                    rank: false, //Ранг
                    rankMax: false, // Максимальный ранг
                    modifiers: false, // Модификаторы
                    firstTrunk: false, // Первый ствол
                    LOG: false, // ЛОГ
                    PO: false, // ПО
                    GZDS: false, // ГЗДС
                    halfAG: false, // 1/2/AG
                    warehousePO: false, // ПО на складе
                    SPT: false //СПТ
                },
                fireList: { // В таблице со списком пожаров
                    rank: false,
                    rankMax: false,
                },
                wrappers: { // Подложки дизайна
                    selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                    fastCommandLine: true, // Подложка для строки поиска
                    fastAdditionOfCars: true // Строка быстрого добавления машин
                },
                fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                    NZ: true, // Комманда"НЗ"
                    SZ: true, // Комманда"СЗ"
                    ST: true, // Комманда"СТ"
                    NT: true, // Комманда"НТ"
                    KR: true, // Комманда"КР"
                    messages: true // Сообщение
                },
                mainMenu: { // Основоное меню

                    fires: true, // Пожары
                    newApplication: true, // Новая заявка
                    technique: true, // Техника
                    documentation: { // Документы
                        view: true,
                        subMenu: { // Архивы
                            reports: true, // Отчеты
                            downloadFromSHS: false // Загрузить из ШС
                        }
                    },
                    archives: {
                        view: true,
                        subMenu: { // Архивы
                            archiveOfFires: true, // Архив пожаров
                            editingForms6: true, // Редактирование форм 6
                            cards: true, // Карточки пожаров
                            warNotes: true // Строевые записки
                        }
                    },
                    warNotes: { // Строевые записки
                        view: true,
                        subMenu: { // Архивы
                            frontNotesOfPCH: true, // Строевые записки ПЧ
                            frontForGarrison: true, // Строевая за гарнизон
                            equipment: true, // Оборудование
                            protocol: true, // Протокол
                            officials: true, // Должностные лица
                            inCalculationAll: true, // В расчет все
                            disableAll: true // Выкл все
                        }
                    },
                    bridges: false, // Мосты
                    hydrants: false // Гидранты
                },
                map: true, // Карта справа от основного меню
                messages: true, // Сообщения справа от основного меню
                selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
                cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
                stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
                fastCommandLine: true, // Строка для ввода команд
                fastAdditionOfCars: true, // Строка быстрого добавления машин
                showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
                states: {
                    frontNotes: {
                        engineCondition: true // Кнопка "Состояние техники"
                    },
                    firebase: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            firstStvol: false, // Кнопка подача первого ствола
                            LOG: false, // Кнопка ЛОГ
                            cancelTheOrder: true, // Кнопка Аннулировать заявку
                            specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                            approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                            rankButtons: false, // Кнопки изменения ранга пожара
                            modifiersButtons: false // Кнопка Модификаторы
                        }
                    },
                    newFireCard: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: false, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                        }
                    },
                    newOrder: {
                        buttons: {
                            unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                        }
                    },
                    order: {
                        editOrderButton: true, // Кнопка редактировать заявку
                        tabs: {
                            notification: true, // Вкладка Оповещение
                            informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                        },
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: true, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                            sendToLO: false // Кнопка Отправить в ЛО
                        }
                    },
                    docs: {
                        select: {
                            selectType: true, // Дропдаун - Выберите тип
                            chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                            chooseTheUser: true // Дропдаун - Выберите пользователя
                        },
                        reports: {
                            fir_10: false
                        }
                    },
                    dept: {
                        canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                        showDeptList: true, // Отображать список департаментов.
                        buttons: {
                            saveCaraul: true, // Кнопка Сохранить (караул)
                            closeDept: true, // Кнопка Закрыть
                            isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                            unloading: false // Кнопка Выгрузить
                        }
                    },
                    protocol: {
                        buttons: {
                            editTime: false // Кнопка редактирования времени в протоколе
                        }
                    }
                }
            },

        },

        'Ташкент': {
            dispatchers: {
                role: 'Диспетчер',
                isPCH: false, // Для правильного определения роли
                words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                    pch: 'СЧ',
                    frontNotes: 'Строевые записки',
                    fireDept: 'Спасательная часть',
                    pchEngine: 'СЧ/ТИП/Гос№',
                    fire: 'Происшествие',
                    fires: 'Происшествия',
                    incidents: 'происшествий',
                    fireDepartment: 'Спасательная',
                    fireDeptSel: 'Спасательную',
                    fireEquipment: 'Спасательные части',
                    OFPS: 'СО',
                    UPO: 'СО',
                    OPO: 'СО',
                    'прибыла': 'прибыла',
                    region: 'Обл.'
                },
                fireInfo: { // Верхняя строка информации о пожаре
                    guard: true,
                    number: true,
                    pchNumber: true,
                    address: true,
                    state: true,
                    externalSystem: true,
                    pch: true,
                    district: true,
                    rank: false,
                    type: true
                },
                mapStyles: { // Настройки для карты
                    fireIcon: '\uf0ad'
                },
                commonSwitches: { // Общие выключатели на весь комплекс
                    rank: false, //Ранг
                    rankMax: false, // Максимальный ранг
                    modifiers: false, // Модификаторы
                    firstTrunk: false, // Первый ствол
                    LOG: false, // ЛОГ
                    PO: false, // ПО
                    GZDS: false, // ГЗДС
                    halfAG: false, // 1/2/AG
                    warehousePO: false, // ПО на складе
                    SPT: false //СПТ
                },
                fireList: { // В таблице со списком пожаров
                    rank: false,
                    rankMax: false,
                },
                wrappers: { // Подложки дизайна
                    selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                    fastCommandLine: true, // Подложка для строки поиска
                    fastAdditionOfCars: true // Строка быстрого добавления машин
                },
                fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                    NZ: true, // Комманда"НЗ"
                    SZ: true, // Комманда"СЗ"
                    ST: true, // Комманда"СТ"
                    NT: true, // Комманда"НТ"
                    KR: true, // Комманда"КР"
                    messages: true // Сообщение
                },
                mainMenu: { // Основоное меню

                    fires: true, // Пожары
                    newApplication: true, // Новая заявка
                    technique: true, // Техника
                    documentation: { // Документы
                        view: true,
                        subMenu: { // Архивы
                            reports: true, // Отчеты
                            downloadFromSHS: false // Загрузить из ШС
                        }
                    },
                    archives: {
                        view: true,
                        subMenu: { // Архивы
                            archiveOfFires: true, // Архив пожаров
                            editingForms6: true, // Редактирование форм 6
                            cards: true, // Карточки пожаров
                            warNotes: true // Строевые записки
                        }
                    },
                    warNotes: { // Строевые записки
                        view: true,
                        subMenu: { // Архивы
                            frontNotesOfPCH: true, // Строевые записки ПЧ
                            frontForGarrison: true, // Строевая за гарнизон
                            equipment: true, // Оборудование
                            protocol: true, // Протокол
                            officials: true, // Должностные лица
                            inCalculationAll: true, // В расчет все
                            disableAll: true // Выкл все
                        }
                    },
                    bridges: false, // Мосты
                    hydrants: false // Гидранты
                },
                map: true, // Карта справа от основного меню
                messages: true, // Сообщения справа от основного меню
                selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
                cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
                stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
                fastCommandLine: true, // Строка для ввода команд
                fastAdditionOfCars: true, // Строка быстрого добавления машин
                showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
                states: {
                    frontNotes: {
                        engineCondition: true // Кнопка "Состояние техники"
                    },
                    firebase: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            firstStvol: false, // Кнопка подача первого ствола
                            LOG: false, // Кнопка ЛОГ
                            cancelTheOrder: true, // Кнопка Аннулировать заявку
                            specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                            approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                            rankButtons: false, // Кнопки изменения ранга пожара
                            modifiersButtons: false // Кнопка Модификаторы
                        }
                    },
                    newFireCard: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: false, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                        }
                    },
                    newOrder: {
                        buttons: {
                            unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                        }
                    },
                    order: {
                        editOrderButton: true, // Кнопка редактировать заявку
                        tabs: {
                            notification: true, // Вкладка Оповещение
                            informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                        },
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: true, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                            sendToLO: false // Кнопка Отправить в ЛО
                        }
                    },
                    docs: {
                        select: {
                            selectType: true, // Дропдаун - Выберите тип
                            chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                            chooseTheUser: true // Дропдаун - Выберите пользователя
                        },
                        reports: {
                            fir_10: false
                        }
                    },
                    dept: {
                        canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                        showDeptList: true, // Отображать список департаментов.
                        buttons: {
                            saveCaraul: true, // Кнопка Сохранить (караул)
                            closeDept: true, // Кнопка Закрыть
                            isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                            unloading: false // Кнопка Выгрузить
                        }
                    },
                    protocol: {
                        buttons: {
                            editTime: false // Кнопка редактирования времени в протоколе
                        }
                    }
                }
            },

            dispatchersManager: {
                role: 'Старший диспетчер',
                isPCH: false, // Для правильного определения роли
                words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                    pch: 'СЧ',
                    frontNotes: 'Строевые записки',
                    fireDept: 'Спасательная часть',
                    pchEngine: 'СЧ/ТИП/Гос№',
                    fire: 'Происшествие',
                    fires: 'Происшествия',
                    incidents: 'происшествий',
                    fireDepartment: 'Спасательная',
                    fireDeptSel: 'Спасательную',
                    fireEquipment: 'Спасательные части',
                    OFPS: 'СО',
                    UPO: 'СО',
                    OPO: 'СО',
                    'прибыла': 'прибыла',
                    region: 'Обл.'
                },
                fireInfo: { // Верхняя строка информации о пожаре
                    guard: true,
                    number: true,
                    pchNumber: true,
                    address: true,
                    state: true,
                    externalSystem: true,
                    pch: true,
                    district: true,
                    rank: false,
                    type: true
                },
                mapStyles: { // Настройки для карты
                    fireIcon: '\uf0ad'
                },
                commonSwitches: { // Общие выключатели на весь комплекс
                    rank: false, //Ранг
                    rankMax: false, // Максимальный ранг
                    modifiers: false, // Модификаторы
                    firstTrunk: false, // Первый ствол
                    LOG: false, // ЛОГ
                    PO: false, // ПО
                    GZDS: false, // ГЗДС
                    halfAG: false, // 1/2/AG
                    warehousePO: false, // ПО на складе
                    SPT: false //СПТ
                },
                fireList: { // В таблице со списком пожаров
                    rank: false,
                    rankMax: false,
                },
                wrappers: { // Подложки дизайна
                    selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                    fastCommandLine: true, // Подложка для строки поиска
                    fastAdditionOfCars: true // Строка быстрого добавления машин
                },
                fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                    NZ: true, // Комманда"НЗ"
                    SZ: true, // Комманда"СЗ"
                    ST: true, // Комманда"СТ"
                    NT: true, // Комманда"НТ"
                    KR: true, // Комманда"КР"
                    messages: true // Сообщение
                },
                mainMenu: { // Основоное меню

                    fires: true, // Пожары
                    newApplication: true, // Новая заявка
                    technique: true, // Техника
                    documentation: { // Документы
                        view: true,
                        subMenu: { // Архивы
                            reports: true, // Отчеты
                            downloadFromSHS: false // Загрузить из ШС
                        }
                    },
                    archives: {
                        view: true,
                        subMenu: { // Архивы
                            archiveOfFires: true, // Архив пожаров
                            editingForms6: true, // Редактирование форм 6
                            cards: true, // Карточки пожаров
                            warNotes: true // Строевые записки
                        }
                    },
                    warNotes: { // Строевые записки
                        view: true,
                        subMenu: { // Архивы
                            frontNotesOfPCH: true, // Строевые записки ПЧ
                            frontForGarrison: true, // Строевая за гарнизон
                            equipment: true, // Оборудование
                            protocol: true, // Протокол
                            officials: true, // Должностные лица
                            inCalculationAll: true, // В расчет все
                            disableAll: true // Выкл все
                        }
                    },
                    bridges: false, // Мосты
                    hydrants: false // Гидранты
                },
                map: true, // Карта справа от основного меню
                messages: true, // Сообщения справа от основного меню
                selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
                cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
                stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
                fastCommandLine: true, // Строка для ввода команд
                fastAdditionOfCars: true, // Строка быстрого добавления машин
                showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
                states: {
                    frontNotes: {
                        engineCondition: true // Кнопка "Состояние техники"
                    },
                    firebase: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            firstStvol: false, // Кнопка подача первого ствола
                            LOG: false, // Кнопка ЛОГ
                            cancelTheOrder: true, // Кнопка Аннулировать заявку
                            specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                            approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                            rankButtons: false, // Кнопки изменения ранга пожара
                            modifiersButtons: false // Кнопка Модификаторы
                        }
                    },
                    newFireCard: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: false, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                        }
                    },
                    newOrder: {
                        buttons: {
                            unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                        }
                    },
                    order: {
                        editOrderButton: true, // Кнопка редактировать заявку
                        tabs: {
                            notification: true, // Вкладка Оповещение
                            informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                        },
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: true, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                            sendToLO: false // Кнопка Отправить в ЛО
                        }
                    },
                    docs: {
                        select: {
                            selectType: true, // Дропдаун - Выберите тип
                            chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                            chooseTheUser: true // Дропдаун - Выберите пользователя
                        },
                        reports: {
                            fir_10: false
                        }
                    },
                    dept: {
                        canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                        showDeptList: true, // Отображать список департаментов.
                        buttons: {
                            saveCaraul: true, // Кнопка Сохранить (караул)
                            closeDept: true, // Кнопка Закрыть
                            isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                            unloading: false // Кнопка Выгрузить
                        }
                    },
                    protocol: {
                        buttons: {
                            editTime: false // Кнопка редактирования времени в протоколе
                        }
                    }
                }
            },

        },

        'Ферганская область': {
            dispatchers: {
                role: 'Диспетчер',
                isPCH: false, // Для правильного определения роли
                words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                    pch: 'СЧ',
                    frontNotes: 'Строевые записки',
                    fireDept: 'Спасательная часть',
                    pchEngine: 'СЧ/ТИП/Гос№',
                    fire: 'Происшествие',
                    fires: 'Происшествия',
                    incidents: 'происшествий',
                    fireDepartment: 'Спасательная',
                    fireDeptSel: 'Спасательную',
                    fireEquipment: 'Спасательные части',
                    OFPS: 'СО',
                    UPO: 'СО',
                    OPO: 'СО',
                    'прибыла': 'прибыла',
                    region: 'Обл.'
                },
                fireInfo: { // Верхняя строка информации о пожаре
                    guard: true,
                    number: true,
                    pchNumber: true,
                    address: true,
                    state: true,
                    externalSystem: true,
                    pch: true,
                    district: true,
                    rank: false,
                    type: true
                },
                mapStyles: { // Настройки для карты
                    fireIcon: '\uf0ad'
                },
                commonSwitches: { // Общие выключатели на весь комплекс
                    rank: false, //Ранг
                    rankMax: false, // Максимальный ранг
                    modifiers: false, // Модификаторы
                    firstTrunk: false, // Первый ствол
                    LOG: false, // ЛОГ
                    PO: false, // ПО
                    GZDS: false, // ГЗДС
                    halfAG: false, // 1/2/AG
                    warehousePO: false, // ПО на складе
                    SPT: false //СПТ
                },
                fireList: { // В таблице со списком пожаров
                    rank: false,
                    rankMax: false,
                },
                wrappers: { // Подложки дизайна
                    selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                    fastCommandLine: true, // Подложка для строки поиска
                    fastAdditionOfCars: true // Строка быстрого добавления машин
                },
                fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                    NZ: true, // Комманда"НЗ"
                    SZ: true, // Комманда"СЗ"
                    ST: true, // Комманда"СТ"
                    NT: true, // Комманда"НТ"
                    KR: true, // Комманда"КР"
                    messages: true // Сообщение
                },
                mainMenu: { // Основоное меню

                    fires: true, // Пожары
                    newApplication: true, // Новая заявка
                    technique: true, // Техника
                    documentation: { // Документы
                        view: true,
                        subMenu: { // Архивы
                            reports: true, // Отчеты
                            downloadFromSHS: false // Загрузить из ШС
                        }
                    },
                    archives: {
                        view: true,
                        subMenu: { // Архивы
                            archiveOfFires: true, // Архив пожаров
                            editingForms6: true, // Редактирование форм 6
                            cards: true, // Карточки пожаров
                            warNotes: true // Строевые записки
                        }
                    },
                    warNotes: { // Строевые записки
                        view: true,
                        subMenu: { // Архивы
                            frontNotesOfPCH: true, // Строевые записки ПЧ
                            frontForGarrison: true, // Строевая за гарнизон
                            equipment: true, // Оборудование
                            protocol: true, // Протокол
                            officials: true, // Должностные лица
                            inCalculationAll: true, // В расчет все
                            disableAll: true // Выкл все
                        }
                    },
                    bridges: false, // Мосты
                    hydrants: false // Гидранты
                },
                map: true, // Карта справа от основного меню
                messages: true, // Сообщения справа от основного меню
                selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
                cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
                stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
                fastCommandLine: true, // Строка для ввода команд
                fastAdditionOfCars: true, // Строка быстрого добавления машин
                showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
                states: {
                    frontNotes: {
                        engineCondition: true // Кнопка "Состояние техники"
                    },
                    firebase: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            firstStvol: false, // Кнопка подача первого ствола
                            LOG: false, // Кнопка ЛОГ
                            cancelTheOrder: true, // Кнопка Аннулировать заявку
                            specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                            approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                            rankButtons: false, // Кнопки изменения ранга пожара
                            modifiersButtons: false // Кнопка Модификаторы
                        }
                    },
                    newFireCard: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: false, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                        }
                    },
                    newOrder: {
                        buttons: {
                            unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                        }
                    },
                    order: {
                        editOrderButton: true, // Кнопка редактировать заявку
                        tabs: {
                            notification: true, // Вкладка Оповещение
                            informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                        },
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: true, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                            sendToLO: false // Кнопка Отправить в ЛО
                        }
                    },
                    docs: {
                        select: {
                            selectType: true, // Дропдаун - Выберите тип
                            chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                            chooseTheUser: true // Дропдаун - Выберите пользователя
                        },
                        reports: {
                            fir_10: false
                        }
                    },
                    dept: {
                        canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                        showDeptList: true, // Отображать список департаментов.
                        buttons: {
                            saveCaraul: true, // Кнопка Сохранить (караул)
                            closeDept: true, // Кнопка Закрыть
                            isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                            unloading: false // Кнопка Выгрузить
                        }
                    },
                    protocol: {
                        buttons: {
                            editTime: false // Кнопка редактирования времени в протоколе
                        }
                    }
                }
            },

            dispatchersManager: {
                role: 'Старший диспетчер',
                isPCH: false, // Для правильного определения роли
                words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                    pch: 'СЧ',
                    frontNotes: 'Строевые записки',
                    fireDept: 'Спасательная часть',
                    pchEngine: 'СЧ/ТИП/Гос№',
                    fire: 'Происшествие',
                    fires: 'Происшествия',
                    incidents: 'происшествий',
                    fireDepartment: 'Спасательная',
                    fireDeptSel: 'Спасательную',
                    fireEquipment: 'Спасательные части',
                    OFPS: 'СО',
                    UPO: 'СО',
                    OPO: 'СО',
                    'прибыла': 'прибыла',
                    region: 'Обл.'
                },
                fireInfo: { // Верхняя строка информации о пожаре
                    guard: true,
                    number: true,
                    pchNumber: true,
                    address: true,
                    state: true,
                    externalSystem: true,
                    pch: true,
                    district: true,
                    rank: false,
                    type: true
                },
                mapStyles: { // Настройки для карты
                    fireIcon: '\uf0ad'
                },
                commonSwitches: { // Общие выключатели на весь комплекс
                    rank: false, //Ранг
                    rankMax: false, // Максимальный ранг
                    modifiers: false, // Модификаторы
                    firstTrunk: false, // Первый ствол
                    LOG: false, // ЛОГ
                    PO: false, // ПО
                    GZDS: false, // ГЗДС
                    halfAG: false, // 1/2/AG
                    warehousePO: false, // ПО на складе
                    SPT: false //СПТ
                },
                fireList: { // В таблице со списком пожаров
                    rank: false,
                    rankMax: false,
                },
                wrappers: { // Подложки дизайна
                    selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                    fastCommandLine: true, // Подложка для строки поиска
                    fastAdditionOfCars: true // Строка быстрого добавления машин
                },
                fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                    NZ: true, // Комманда"НЗ"
                    SZ: true, // Комманда"СЗ"
                    ST: true, // Комманда"СТ"
                    NT: true, // Комманда"НТ"
                    KR: true, // Комманда"КР"
                    messages: true // Сообщение
                },
                mainMenu: { // Основоное меню

                    fires: true, // Пожары
                    newApplication: true, // Новая заявка
                    technique: true, // Техника
                    documentation: { // Документы
                        view: true,
                        subMenu: { // Архивы
                            reports: true, // Отчеты
                            downloadFromSHS: false // Загрузить из ШС
                        }
                    },
                    archives: {
                        view: true,
                        subMenu: { // Архивы
                            archiveOfFires: true, // Архив пожаров
                            editingForms6: true, // Редактирование форм 6
                            cards: true, // Карточки пожаров
                            warNotes: true // Строевые записки
                        }
                    },
                    warNotes: { // Строевые записки
                        view: true,
                        subMenu: { // Архивы
                            frontNotesOfPCH: true, // Строевые записки ПЧ
                            frontForGarrison: true, // Строевая за гарнизон
                            equipment: true, // Оборудование
                            protocol: true, // Протокол
                            officials: true, // Должностные лица
                            inCalculationAll: true, // В расчет все
                            disableAll: true // Выкл все
                        }
                    },
                    bridges: false, // Мосты
                    hydrants: false // Гидранты
                },
                map: true, // Карта справа от основного меню
                messages: true, // Сообщения справа от основного меню
                selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
                cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
                stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
                fastCommandLine: true, // Строка для ввода команд
                fastAdditionOfCars: true, // Строка быстрого добавления машин
                showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
                states: {
                    frontNotes: {
                        engineCondition: true // Кнопка "Состояние техники"
                    },
                    firebase: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            firstStvol: false, // Кнопка подача первого ствола
                            LOG: false, // Кнопка ЛОГ
                            cancelTheOrder: true, // Кнопка Аннулировать заявку
                            specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                            approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                            rankButtons: false, // Кнопки изменения ранга пожара
                            modifiersButtons: false // Кнопка Модификаторы
                        }
                    },
                    newFireCard: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: false, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                        }
                    },
                    newOrder: {
                        buttons: {
                            unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                        }
                    },
                    order: {
                        editOrderButton: true, // Кнопка редактировать заявку
                        tabs: {
                            notification: true, // Вкладка Оповещение
                            informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                        },
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: true, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                            sendToLO: false // Кнопка Отправить в ЛО
                        }
                    },
                    docs: {
                        select: {
                            selectType: true, // Дропдаун - Выберите тип
                            chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                            chooseTheUser: true // Дропдаун - Выберите пользователя
                        },
                        reports: {
                            fir_10: false
                        }
                    },
                    dept: {
                        canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                        showDeptList: true, // Отображать список департаментов.
                        buttons: {
                            saveCaraul: true, // Кнопка Сохранить (караул)
                            closeDept: true, // Кнопка Закрыть
                            isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                            unloading: false // Кнопка Выгрузить
                        }
                    },
                    protocol: {
                        buttons: {
                            editTime: false // Кнопка редактирования времени в протоколе
                        }
                    }
                }
            },

        },

        'Хорезмская область': {
            dispatchers: {
                role: 'Диспетчер',
                isPCH: false, // Для правильного определения роли
                words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                    pch: 'СЧ',
                    frontNotes: 'Строевые записки',
                    fireDept: 'Спасательная часть',
                    pchEngine: 'СЧ/ТИП/Гос№',
                    fire: 'Происшествие',
                    fires: 'Происшествия',
                    incidents: 'происшествий',
                    fireDepartment: 'Спасательная',
                    fireDeptSel: 'Спасательную',
                    fireEquipment: 'Спасательные части',
                    OFPS: 'СО',
                    UPO: 'СО',
                    OPO: 'СО',
                    'прибыла': 'прибыла',
                    region: 'Обл.'
                },
                fireInfo: { // Верхняя строка информации о пожаре
                    guard: true,
                    number: true,
                    pchNumber: true,
                    address: true,
                    state: true,
                    externalSystem: true,
                    pch: true,
                    district: true,
                    rank: false,
                    type: true
                },
                mapStyles: { // Настройки для карты
                    fireIcon: '\uf0ad'
                },
                commonSwitches: { // Общие выключатели на весь комплекс
                    rank: false, //Ранг
                    rankMax: false, // Максимальный ранг
                    modifiers: false, // Модификаторы
                    firstTrunk: false, // Первый ствол
                    LOG: false, // ЛОГ
                    PO: false, // ПО
                    GZDS: false, // ГЗДС
                    halfAG: false, // 1/2/AG
                    warehousePO: false, // ПО на складе
                    SPT: false //СПТ
                },
                fireList: { // В таблице со списком пожаров
                    rank: false,
                    rankMax: false,
                },
                wrappers: { // Подложки дизайна
                    selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                    fastCommandLine: true, // Подложка для строки поиска
                    fastAdditionOfCars: true // Строка быстрого добавления машин
                },
                fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                    NZ: true, // Комманда"НЗ"
                    SZ: true, // Комманда"СЗ"
                    ST: true, // Комманда"СТ"
                    NT: true, // Комманда"НТ"
                    KR: true, // Комманда"КР"
                    messages: true // Сообщение
                },
                mainMenu: { // Основоное меню

                    fires: true, // Пожары
                    newApplication: true, // Новая заявка
                    technique: true, // Техника
                    documentation: { // Документы
                        view: true,
                        subMenu: { // Архивы
                            reports: true, // Отчеты
                            downloadFromSHS: false // Загрузить из ШС
                        }
                    },
                    archives: {
                        view: true,
                        subMenu: { // Архивы
                            archiveOfFires: true, // Архив пожаров
                            editingForms6: true, // Редактирование форм 6
                            cards: true, // Карточки пожаров
                            warNotes: true // Строевые записки
                        }
                    },
                    warNotes: { // Строевые записки
                        view: true,
                        subMenu: { // Архивы
                            frontNotesOfPCH: true, // Строевые записки ПЧ
                            frontForGarrison: true, // Строевая за гарнизон
                            equipment: true, // Оборудование
                            protocol: true, // Протокол
                            officials: true, // Должностные лица
                            inCalculationAll: true, // В расчет все
                            disableAll: true // Выкл все
                        }
                    },
                    bridges: false, // Мосты
                    hydrants: false // Гидранты
                },
                map: true, // Карта справа от основного меню
                messages: true, // Сообщения справа от основного меню
                selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
                cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
                stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
                fastCommandLine: true, // Строка для ввода команд
                fastAdditionOfCars: true, // Строка быстрого добавления машин
                showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
                states: {
                    frontNotes: {
                        engineCondition: true // Кнопка "Состояние техники"
                    },
                    firebase: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            firstStvol: false, // Кнопка подача первого ствола
                            LOG: false, // Кнопка ЛОГ
                            cancelTheOrder: true, // Кнопка Аннулировать заявку
                            specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                            approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                            rankButtons: false, // Кнопки изменения ранга пожара
                            modifiersButtons: false // Кнопка Модификаторы
                        }
                    },
                    newFireCard: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: false, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                        }
                    },
                    newOrder: {
                        buttons: {
                            unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                        }
                    },
                    order: {
                        editOrderButton: true, // Кнопка редактировать заявку
                        tabs: {
                            notification: true, // Вкладка Оповещение
                            informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                        },
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: true, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                            sendToLO: false // Кнопка Отправить в ЛО
                        }
                    },
                    docs: {
                        select: {
                            selectType: true, // Дропдаун - Выберите тип
                            chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                            chooseTheUser: true // Дропдаун - Выберите пользователя
                        },
                        reports: {
                            fir_10: false
                        }
                    },
                    dept: {
                        canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                        showDeptList: true, // Отображать список департаментов.
                        buttons: {
                            saveCaraul: true, // Кнопка Сохранить (караул)
                            closeDept: true, // Кнопка Закрыть
                            isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                            unloading: false // Кнопка Выгрузить
                        }
                    },
                    protocol: {
                        buttons: {
                            editTime: false // Кнопка редактирования времени в протоколе
                        }
                    }
                }
            },

            dispatchersManager: {
                role: 'Старший диспетчер',
                isPCH: false, // Для правильного определения роли
                words: { //Список слов вставляемых в HTML для разных ролей могут быть разные
                    pch: 'СЧ',
                    frontNotes: 'Строевые записки',
                    fireDept: 'Спасательная часть',
                    pchEngine: 'СЧ/ТИП/Гос№',
                    fire: 'Происшествие',
                    fires: 'Происшествия',
                    incidents: 'происшествий',
                    fireDepartment: 'Спасательная',
                    fireDeptSel: 'Спасательную',
                    fireEquipment: 'Спасательные части',
                    OFPS: 'СО',
                    UPO: 'СО',
                    OPO: 'СО',
                    'прибыла': 'прибыла',
                    region: 'Обл.'
                },
                fireInfo: { // Верхняя строка информации о пожаре
                    guard: true,
                    number: true,
                    pchNumber: true,
                    address: true,
                    state: true,
                    externalSystem: true,
                    pch: true,
                    district: true,
                    rank: false,
                    type: true
                },
                mapStyles: { // Настройки для карты
                    fireIcon: '\uf0ad'
                },
                commonSwitches: { // Общие выключатели на весь комплекс
                    rank: false, //Ранг
                    rankMax: false, // Максимальный ранг
                    modifiers: false, // Модификаторы
                    firstTrunk: false, // Первый ствол
                    LOG: false, // ЛОГ
                    PO: false, // ПО
                    GZDS: false, // ГЗДС
                    halfAG: false, // 1/2/AG
                    warehousePO: false, // ПО на складе
                    SPT: false //СПТ
                },
                fireList: { // В таблице со списком пожаров
                    rank: false,
                    rankMax: false,
                },
                wrappers: { // Подложки дизайна
                    selectedFireInfo: true, // Подложка для информации о выбранном пожаре
                    fastCommandLine: true, // Подложка для строки поиска
                    fastAdditionOfCars: true // Строка быстрого добавления машин
                },
                fastCommands: { // Комманды в строке ввода "НЗ, СЗ, СТ, НТ, КР"
                    NZ: true, // Комманда"НЗ"
                    SZ: true, // Комманда"СЗ"
                    ST: true, // Комманда"СТ"
                    NT: true, // Комманда"НТ"
                    KR: true, // Комманда"КР"
                    messages: true // Сообщение
                },
                mainMenu: { // Основоное меню

                    fires: true, // Пожары
                    newApplication: true, // Новая заявка
                    technique: true, // Техника
                    documentation: { // Документы
                        view: true,
                        subMenu: { // Архивы
                            reports: true, // Отчеты
                            downloadFromSHS: false // Загрузить из ШС
                        }
                    },
                    archives: {
                        view: true,
                        subMenu: { // Архивы
                            archiveOfFires: true, // Архив пожаров
                            editingForms6: true, // Редактирование форм 6
                            cards: true, // Карточки пожаров
                            warNotes: true // Строевые записки
                        }
                    },
                    warNotes: { // Строевые записки
                        view: true,
                        subMenu: { // Архивы
                            frontNotesOfPCH: true, // Строевые записки ПЧ
                            frontForGarrison: true, // Строевая за гарнизон
                            equipment: true, // Оборудование
                            protocol: true, // Протокол
                            officials: true, // Должностные лица
                            inCalculationAll: true, // В расчет все
                            disableAll: true // Выкл все
                        }
                    },
                    bridges: false, // Мосты
                    hydrants: false // Гидранты
                },
                map: true, // Карта справа от основного меню
                messages: true, // Сообщения справа от основного меню
                selectedFireInfo: true, // Верхняя инфо-панель о выбранном пожаре
                cards112Alert: true, // Кнопка информирующая о поступлении карточки от 112
                stateProvider: 'fires.firesbase', // State на котором окажется пользователь после входа
                fastCommandLine: true, // Строка для ввода команд
                fastAdditionOfCars: true, // Строка быстрого добавления машин
                showPCHnumber: false, // Отображение Номера ПЧ в верхней инфо-панеле
                states: {
                    frontNotes: {
                        engineCondition: true // Кнопка "Состояние техники"
                    },
                    firebase: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            firstStvol: false, // Кнопка подача первого ствола
                            LOG: false, // Кнопка ЛОГ
                            cancelTheOrder: true, // Кнопка Аннулировать заявку
                            specialTechnique: false, // Кнопки - Катер, Вертолет, Самолет
                            approveButtonBlock: true, // Кнопки - 02, 03, 04, АТ, ЖКХ
                            rankButtons: false, // Кнопки изменения ранга пожара
                            modifiersButtons: false // Кнопка Модификаторы
                        }
                    },
                    newFireCard: {
                        fireCommands: true, // Команды для активного пожара
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: false, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: false // Кнопка Выгрузка в штабной стол
                        }
                    },
                    newOrder: {
                        buttons: {
                            unloadingToTheStaffTable: true // Кнопка Выгрузка в штабной стол
                        }
                    },
                    order: {
                        editOrderButton: true, // Кнопка редактировать заявку
                        tabs: {
                            notification: true, // Вкладка Оповещение
                            informationOfExternalSystem: true // Вкладка Инф.Внеш.Сист
                        },
                        buttons: {
                            recordingACall: true, // Кнопка Запись звонка
                            dialer: true, // Кнопка Дозвон
                            operator112: true, // Кнопка Оператор 112
                            stages: true, // Кнопка Этапы
                            removeEngineFromFire: true, // Кнопка отмены выезда машины на пожар
                            listNotRecruitedTechnicians: true, // Кнопки донабора техники на пожар
                            unloadingToTheStaffTable: true, // Кнопка Выгрузка в штабной стол
                            sendToLO: false // Кнопка Отправить в ЛО
                        }
                    },
                    docs: {
                        select: {
                            selectType: true, // Дропдаун - Выберите тип
                            chooseNumberOfGuard: true, // Дропдаун - Выберите тип
                            chooseTheUser: true // Дропдаун - Выберите пользователя
                        },
                        reports: {
                            fir_10: false
                        }
                    },
                    dept: {
                        canSaveCaraulDept: true, // Возможность редактирования Строевой записки.
                        showDeptList: true, // Отображать список департаментов.
                        buttons: {
                            saveCaraul: true, // Кнопка Сохранить (караул)
                            closeDept: true, // Кнопка Закрыть
                            isDeptNeedToSaveCaraul: true, // Кнопка смена караула
                            unloading: false // Кнопка Выгрузить
                        }
                    },
                    protocol: {
                        buttons: {
                            editTime: false // Кнопка редактирования времени в протоколе
                        }
                    }
                }
            },

        }
    }

    // ng-show="docsCtrl.storage.fireUser.ACCESS.states.order.buttons.unloadingToTheStaffTable"
    // ng-show="docsCtrl.storage.fireUser.ACCESS.states.docs.select.selectType"
    // ng-show="fires.storage.fireUser.ACCESS.mainMenu.warNotes.subMenu.disableAll"

};
