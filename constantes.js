const os = require('os');
const fetch = require('node-fetch');

exports.MCastAppPort = 41848;
exports.MCastAppAddr = "230.185.192.108";
exports.MSRegistryUrl = process.env.MS_REGISTRY_URL || 'http://localhost:5555/registry';
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
exports.MSMessageTypeEnum = Object.freeze({
    "regAnnonce": 1
});
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
exports.MSTypeEnum = Object.freeze({
    "afoEvents": 1,
    "afoPaniers": 2,
    "afoAuthent": 3
});
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
exports.MSPathnameEnum = Object.freeze({
    "afoHealth": "/health",
    "afoEvents": "/api/events",
    "afoPaniers": "/api/selections",
    "afoAuthent": "/api/user"
});
//------------------------------------------------------------------------------
// http://localhost:5555/registry/declare/MSType?url=....
//------------------------------------------------------------------------------
exports.declareService = function (_MSRegistryUrlArray, type, host, port, pathname) {
    _MSRegistryUrlArray = _MSRegistryUrlArray || [];
    if (0 === _MSRegistryUrlArray.length) {
        return;
    }
    _MSRegistryUrlArray.forEach((_MSRegistryUrl) => {
        declareServiceOnce(_MSRegistryUrl, type, host, port, pathname);
    });
};
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
declareServiceOnce = function (_MSRegistryUrl, type, host, port, pathname) {
    _MSRegistryUrl = _MSRegistryUrl || '';
    if (0 === _MSRegistryUrl.length) {
        return;
    }
    const url = _MSRegistryUrl + '/registry/declare/' + type + '?host=' + host + '&port=' + port + '&pathname=' + pathname;
    console.log('GET : ', url);
    return new Promise(function (resolve, reject) {
        fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => {
            resolve(true);
        }).catch(err => {
            console.log('declareService : Error : ', err.message);
            resolve(false);
        });
    });
};
//------------------------------------------------------------------------------
// Demander à la Registry indiquée, la liste des services disponibles
// GET http://.../registry/list
// [{"type":"3","url":"http://158.50.163.7:3000","pathname":"/api/user","status":true,"cptr":331}]
//------------------------------------------------------------------------------
exports.getServiceList = function (MSRegistryUrl) {
    const url = MSRegistryUrl.regUrl + '/registry/list';
    console.log('GET : ', url);
    return new Promise(function (resolve, reject) {
        fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => {
            return response.json();
        }).then(function (json) {
            resolve(json);
        }).catch(err => {
            console.log('declareService : Error : ', err.message);
            reject(MSRegistryUrl);
        });
    });
};
//------------------------------------------------------------------------------
// Retrouver l'adresse IPV4 du serveur local
//------------------------------------------------------------------------------
exports.getServerIpAddress = function () {
    const ifaces = os.networkInterfaces();
    for (prop in ifaces) {
        var iface = ifaces[prop];
        console.log(prop + " => " + JSON.stringify(ifaces[prop]));
        for (let i = 0; i < iface.length; i++) {
            if (iface[i].family === "IPv4" && iface[i].internal === false) {
                return iface[i].address;
            }
        }
    }
    return '';
};
//------------------------------------------------------------------------------
// Rechercher l'url du service qui sait répondre à cette API
//------------------------------------------------------------------------------
exports.findActiveMService = function (MServiceList, reqUrl) {
    MServiceList = MServiceList || [];
    reqUrl = reqUrl || '';
    var resMService = MServiceList.find((value, index, array) => {
        if (true === value.status) {
            if (-1 !== reqUrl.indexOf(value.pathname)) {
                return value;
            }
        }
        return undefined;
    });
    return resMService;
};