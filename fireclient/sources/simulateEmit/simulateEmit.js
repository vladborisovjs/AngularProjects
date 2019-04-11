const EMIT = {

    clearConsole: {
        description: 'Почистить консоль сервера',
    },

    doSomething1: {
        description: 'Переключить директорию поиска',
    },

    doSomething: {
        type: 'warning',
        description: 'LuceneIndexer',
    },

    doSomething2: {
        type: 'warning',
        description: 'OracleIndexer',
    },

    doSomething3: {
        description: 'OracleSomething',
    },

    rereadConfig: {
        description: 'Перечитать конфигурацию'
    },

    getSessions: {
        description: 'Прочитать сессии',
        request: {
            user: "444444",
            password: "444444"
        }
    },

    deleteAllFires: {
        type: 'danger',
        //type: 'disable',
        description: 'Удалить все пожары'
    },

    deleteAll112: {
        type: 'danger',
        //type: 'disable',
        description: 'Удалить все карточки 112'
    },
    doSomething4: {
        description: 'поднять трубку'
    },

    adminStruct: {
        description: 'Получить инфраструктуру',
        request: {
            mode: "get"
        }
    }
};
