"use strict"
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
const dgram = require('dgram');


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
class multicastReceiver {
    //Multicast Client receiving sent messages
    constructor(_HOST, _PORT, _MCAST_ADDR, callback) {
        this.callback = callback || function () { };
        this.PORT = _PORT;
        this.MCAST_ADDR = _MCAST_ADDR; //same mcast address as Server
        this.HOST = _HOST; //this is your own IP
        this.client = dgram.createSocket({ type: 'udp4', reuseAddr: true });
        this.client.on('listening', () => {
            var address = this.client.address();
            console.log('UDP Client listening on ' + address.address + ":" + address.port);
            this.client.setBroadcast(true)
            this.client.setMulticastTTL(128);
            this.client.addMembership(this.MCAST_ADDR);
        });

        this.client.on('message', (message, remote) => {
            //console.log('MCast Msg: From: ' + remote.address + ':' + remote.port + ' - ' + message);
            this.callback(this.MCAST_ADDR, this.PORT, JSON.parse('' + message));
        });

        this.client.bind(this.PORT, this.HOST);
    }
};
module.exports = multicastReceiver;