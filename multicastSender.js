//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
const dgram = require('dgram');

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
class multicastSender {
    //------------------------------------------------------------------------------
    //Multicast Server sending messages
    // var PORT = 41848;
    // var MCAST_ADDR = "230.185.192.108";
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
    //------------------------------------------------------------------------------
    start(_message) {
        this.message = _message;
        this.intervalID = setInterval(() => { this.broadcastNew() }, 3000);
    }
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    stop() {
        if (this.intervalID) {
            clearInterval(this.intervalID);
            this.intervalID = null;
        }
    }
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    broadcastNew() {
        this.server.send(this.message, 0, this.message.length, this.PORT, this.MCAST_ADDR);
    }
};
module.exports = multicastSender;