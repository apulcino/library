//------------------------------------------------------------------------------
// Diffuseur d'annonce multicast
//------------------------------------------------------------------------------
"use strict"
const dgram = require('dgram');
const frequency = 10000;

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
class multicastSender {
    //------------------------------------------------------------------------------
    // Multicast Server diffuseur de messages
    //------------------------------------------------------------------------------
    constructor(_PORT, _MCAST_ADDR) {
        this.intervalID = null;
        this.PORT = _PORT;
        this.MCAST_ADDR = _MCAST_ADDR;
        this.server = dgram.createSocket({ type: 'udp4', reuseAddr: true });
        this.server.bind(this.PORT, () => {
            this.server.setBroadcast(true);
            this.server.setMulticastTTL(128);
            this.server.addMembership(this.MCAST_ADDR);
        });
    }
    //------------------------------------------------------------------------------
    // Demarrer les diffusions
    //------------------------------------------------------------------------------
    start(_message) {
        this.message = _message;
        this.intervalID = setInterval(() => { this.broadcastNew() }, frequency);
    }
    //------------------------------------------------------------------------------
    // Arreter les diffusions
    //------------------------------------------------------------------------------
    stop() {
        if (this.intervalID) {
            clearInterval(this.intervalID);
            this.intervalID = null;
        }
    }
    //------------------------------------------------------------------------------
    // Envoyer les messages
    //------------------------------------------------------------------------------
    broadcastNew() {
        this.server.send(this.message, 0, this.message.length, this.PORT, this.MCAST_ADDR);
    }
};
module.exports = multicastSender;