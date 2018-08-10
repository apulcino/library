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
        this.date = new Date();
        arguments[0] = '' + this.date.getTime() + ' : ERROR : ' + this.name + ' : ' + arguments[0];
        console.log.apply(null, arguments);
    }
    warn() {
        this.date = new Date();
        arguments[0] = '' + this.date.getTime() + ' : WARN  : ' + this.name + ' : ' + arguments[0];
        console.log.apply(null, arguments);
    }
    info() {
        this.date = new Date();
        arguments[0] = '' + this.date.getTime() + ' : INFO  : ' + this.name + ' : ' + arguments[0];
        console.log.apply(null, arguments);
    }
    debug() {
        this.date = new Date();
        arguments[0] = '' + this.date.getTime() + ' : DEBUG : ' + this.name + ' : ' + arguments[0];
        console.log.apply(null, arguments);
    }
    log() {
        this.date = new Date();
        arguments[0] = '' + this.date.getTime() + ' : DEBUG : ' + this.name + ' : ' + arguments[0];
        console.log.apply(null, arguments);
    }
};
module.exports = traceMgr;