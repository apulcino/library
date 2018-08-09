"use strict"

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
class traceMgr {
    //Multicast Client receiving sent messages
    constructor(_name) {
        this.name = _name;
        this.date = new Date();
    }
    error() {
        arguments[0] = '' + this.date.getTime() + ' : ERROR : ' + this.name + ' : ' + arguments[0];
        console.log.apply(null, arguments);
    }
    warn() {
        arguments[0] = '' + this.date.getTime() + ' : WARN  : ' + this.name + ' : ' + arguments[0];
        console.log.apply(null, arguments);
    }
    info() {
        arguments[0] = '' + this.date.getTime() + ' : INFO  : ' + this.name + ' : ' + arguments[0];
        console.log.apply(null, arguments);
    }
    debug() {
        arguments[0] = '' + this.date.getTime() + ' : DEBUG : ' + this.name + ' : ' + arguments[0];
        console.log.apply(null, arguments);
    }
    log() {
        arguments[0] = '' + this.date.getTime() + ' : DEBUG : ' + this.name + ' : ' + arguments[0];
        console.log.apply(null, arguments);
    }
};
module.exports = traceMgr;