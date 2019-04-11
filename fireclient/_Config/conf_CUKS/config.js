angular.module('configfile', [])
    .constant("WSURLMobile", "ws://172.16.1.200/socket") //stend
    .constant("WSURLDesktop", "ws://172.16.1.200:9000/socket") //stend
    .constant("MAPURL", "./map.html")
    .constant('WMSURL', 'http://172.16.1.200/geoserver/telda/wms')
    .constant('WFSURL', 'http://172.16.1.200/geoserver/telda/wfs')
    .constant('LOGOUTURL', './index.html')
    .constant('GSLAYERS',
        'telda:landuse-polygon3857,' +
        'telda:poi-polygon3857,' +
        'telda:water-line3857,' +
        'telda:water-polygon3857,' +
        'telda:vegetation-polygon3857,' +
        'telda:building_spb_polygon,' +
        'telda:allroads,telda:railway-line3857,' +
        'telda:railway-station-point3857,' +
        'telda:responsybilitypol,' +
        'telda:firedivisionptn')
    .constant('adminUser', null)
    .constant('cuksUser', null)
;