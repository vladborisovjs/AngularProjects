/**
 * Created by k.ganya on 19.02.2018.
 */
angular.module('configfile', [])
    .constant("WSURLMobile", "ws://an-01-appsrv.test.telda/socket") //stend
    // .constant("WSURLDesktop", "ws://172.16.6.165:9000/socket") //Sasha
    .constant("WSURLDesktop", "ws://192.168.11.132:9000/socket") //Sasha
    .constant("WSURLPrefix", ':9000/socket') //Хвост для адреса сокета

    // .constant("WSURLDesktop", "ws://an-01-appsrv.test.telda/socket") //stend
    // .constant("WSURLDesktop", "ws://172.16.6.15:9000/socket") //ilya
    // .constant("WSURLDesktop", "ws://172.16.5.54:9000/socket") //vit
    // .constant("WSURLDesktop", "ws://localhost:9000/socket") //local


    //  .constant('WSURLCluster', ['172.16.6.165'])//Sasha




/*

    // СПБ


    .constant('WSURLCluster', ['172.16.7.165'])// Узбекистан
    .constant('cuksUser', {user: "U222U", password: "1"}) // CX Узбекистан
*/

    // .constant('WSURLCluster', ['192.168.11.132', '172.16.7.165'])//stend


/*
    .constant('WSURLCluster', ['192.168.11.132', '172.16.6.165'])//stend
    .constant('WMSURL', 'http://stend01.telda.ru/geoserver/telda/wms')
    .constant('WFSURL', 'http://stend01.telda.ru/geoserver/telda/wfs')
    .constant('cuksUser', {user: "4", password: "4"}) // Диспетчер ЦУКСа
*/



    // .constant('cuksUser', {user: "h33333h", password: "h33333h"}) // ПЧ
    // .constant('cuksUser', {user: "90909", password: "90909"}) // Дознаватель
    // .constant('cuksUser', {user: "SUPERADMIN", password: "SUPERADMIN"}) // Диспетчер ЦУКСа







    //Узбекистан
    // .constant('WSURLCluster', ['172.16.7.246'])// Узбекистан внутренний


/*

    .constant('WSURLCluster', ['192.168.11.176'])// Узбекистан внешний
    .constant('WSURLCluster', ['192.168.11.176'])// Узбекистан внешний
    .constant('WMSURL', 'http://192.168.11.176:8080/geoserver/telda/wms')// Узбекистан
    .constant('WFSURL', 'http://192.168.11.176:8080/geoserver/telda/wfs')// Узбекистан
*/



    .constant('WSURLCluster', ['10.50.110.220'])// Узбекистан внешний
    .constant('WSURLCluster', ['10.50.110.220'])// Узбекистан внешний
    .constant('WMSURL', 'http://10.50.110.220:8080/geoserver/telda/wms')// Узбекистан
    .constant('WFSURL', 'http://10.50.110.220:8080/geoserver/telda/wfs')// Узбекистан



    .constant('cuksUser', {user: "DISP1002", password: "1"}) // Узбекистан
    // .constant('cuksUser', {user: "u222u", password: "1"}) // Узбекистан область










    // .constant('WSURLCluster', ['192.168.11.132', '172.16.6.124', '172.16.6.165'])
    //.constant("WSURLDesktop", "ws://stend01.telda.ru/socket")
    .constant('PRINTURL', 'http://10.50.110.220:8080/jasperserver/rest_v2/reports/edds/templates/')
    // .constant("HTTPURLDesktop", "http://172.16.6.165:9000") // Sasha
    .constant("HTTPURLDesktop", "http://stend01.telda.ru") // stend
    .constant("MAPURL", "./map.html")
    // .constant('WMSURL', 'http://an-01-appsrv.test.telda/geoserver/telda/wms')


    .constant('LOGOUTURL', './index.html')
    .constant('ReloadLoginPage', true)
    .constant('ShowZippedEmitsInConsole', false)
    .constant('ShowZippedDebug', true)
    .constant('ShowSentTicket', 0) //Окошко с номером сокета и пункт в меню 'Завалить' для массового отправления запросов на сервер. Количество повторений либо 0(для отключения). Перейти в строевые записки и выбрать департамент, потом нажать.
    .constant('ShowNewFireCard', false) // переход из пункта меню "Сообщения"
    /*
    .constant('GlobalExtend', [3200000.0, 8300000.0, 3450000.0, 8550000.0]) //[3200000.0, 8300000.0, 3450000.0, 8550000.0];

    .constant('InitialCenter', [30.306995, 59.944377]) //[30.306995, 59.944377];
    .constant('MapResolutions', [30.306995, 59.944377]) //[30.306995, 59.944377];
*/

    .constant('GlobalExtend', [3200000.0, 8300000.0, 3450000.0, 8550000.0])
    .constant('InitialCenter', [30.306995, 59.944377])
    .constant('MapResolutions', [98.0, 56.0, 22.4, 11.2, 5.6, 2.8, 1.26, 0.56, 0.28]) //питерские резолюшены

    .constant('GSLAYERS',
        'telda:landuse-polygon3857,' +
        'telda:poi-polygon3857,' +
        'telda:water-line3857,' +
        'telda:water-polygon3857,' +
        'telda:vegetation-polygon3857,' +
        'telda:building_spb_polygon,' +
        'telda:allroads,' +
        'telda:railway-line3857,' +
        'telda:railway-station-point3857,' +
        'telda:responsybilitypol,' +
        'telda:firepoints,' +
        'telda:firedivisionptn')
// .constant('adminUser', {user: "444444", password: "444444"})
//.constant('cuksUser', {})
// .constant('cuksUser', {user: "SUPERADMIN", password: "SUPERADMIN"})
// .constant('cuksUser', {user: "88888", password: "88888"}) // Диспетчер ЦУКСа
// .constant('cuksUser', {user: "7777777", password: "7777777"}) // Узбекистан


// .constant('cuksUser', {user: "80808", password: "80808"}) // Диспетчер ЦУКСа
// .constant('cuksUser', {user: "55555", password: "55555"}) // Диспетчер ЦУКСа
// .constant('cuksUser', {user: "444444", password: "444444"}) // Диспетчер ЦУКСа
// .constant('cuksUser', {user: "11111", password: "11111"}) // Дознаватель
// .constant('cuksUser', {user: "0101010", password: "0101010"}) // Сотрудник ПЧ 1
// .constant('cuksUser', {user: "15151", password: "15151"}) // Сотрудник ПЧ 15


;
