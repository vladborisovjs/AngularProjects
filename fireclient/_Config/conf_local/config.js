angular.module('configfile', [])
    .constant("WSURLMobile", "ws://an-01-appsrv.test.telda/socket") //stend
    // .constant("WSURLDesktop", "ws://an-01-appsrv.test.telda:9000/socket") //stend
    // .constant("WSURLDesktop", "ws://172.16.6.15:9000/socket") //ilya
    .constant("WSURLDesktop", "ws://172.16.5.54:9000/socket") //vit
    //.constant("WSURLDesktop", "ws://localhost:9000/socket") //local
    //.constant("WSURLDesktop", "ws://stend01.telda.ru/socket")
    .constant("MAPURL", "./map.html")
    .constant('WMSURL', 'http://an-01-appsrv.test.telda/geoserver/telda/wms')
    .constant('WFSURL', 'http://stend01.telda.ru/geoserver/telda/wfs')
    .constant('LOGOUTURL', './index.html')
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
        'telda:firedivisionptn')
    .constant('adminUser', {user: "admin", password: "admin"})
    //.constant('cuksUser', {})
    .constant('cuksUser', {user: "80808", password: "80808"})
;