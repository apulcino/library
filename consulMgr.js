// var reg = {
//     "ID": ID,
//     "Name": ID,
//     "Tags": [
//         "authentication",
//         "v1"
//     ],
//     "Address": host,
//     "Port": port,
//     "Meta": {
//         "authent_version": "1.0"
//     },
//     "EnableTagOverride": false,
//     "Check": {
//         "DeregisterCriticalServiceAfter": "1m",
//         "HTTP": "http://" + host + ":" + port + "/health/status",
//         "Interval": "10s",
//         "TTL": "15s"
//     }
// }
'use strict';

var consulMgr = {
    consul: require('consul')({
        "secure": false,
        "host": "127.0.0.1"
    }),
    /**
     * Registration template
    */
    reg: {
        "ID": "",
        "Name": "",
        "Tags": [],
        "Address": "",
        "Port": 0,
        "Meta": {},
        "EnableTagOverride": false,
        "Check": {
            "DeregisterCriticalServiceAfter": "1m",
            "HTTP": "",
            "Interval": "10s",
            "TTL": "15s"
        }
    },
    /**
     * Register a service
     */
    Register: function (opts) {
        opts = opts || {};
        this.reg.ID = opts.Name + "_" + opts.Port;
        this.reg.Name = opts.Name;
        this.reg.Tags = opts.Tags;
        this.reg.Address = opts.Address;
        this.reg.Port = opts.Port;
        this.reg.Check.HTTP = "http://" + opts.Address + ":" + opts.Port + "/health/status";

        this.consul.agent.service.register(this.reg, function (err) {
            if (err) {
                throw err;
            }
        });
    },
    /**
     * get list of services
     * @param {requestCallback} _callbackErr - The callback that handles the error.
     * @param {requestCallback} _callbackOK - The callback that handles the success.
     */
    GetAllHealthyServices: function (_callbackErr, _callbackOK) {
        let callbackErr = _callbackErr || function () { };
        let callbackOK = _callbackOK || function () { };
        this.consul.agent.service.list(function (err, result) {
            if (err) {
                callbackErr(err);
            } else {
                let services = [];
                for (var name in result) {
                    services.push({
                        "address": result[name].Address,
                        "port": result[name].Port,
                        "name": result[name].Service,
                        "url": "http://" + result[name].Address + ":" + result[name].Port,
                        "id": result[name].ID
                    });
                }
                callbackOK(services);
            }
        });
    }
}

exports.consulMgr = consulMgr;