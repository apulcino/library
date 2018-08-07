// ------------------------------------------------------------------------------
// Cacher la liste des registry visible sur le réseau
// Chaque composant possède son instance et alimente la liste à partir des messages
// diffusés sur le réseau.
// ------------------------------------------------------------------------------
class RegistryMgr {
    //------------------------------------------------------------------------------
    // Se met à l'écoute des regiostry (udp multicast)
    //------------------------------------------------------------------------------
    constructor(ServerIpAddress, MCastAppPort, MCastAppAddr) {
        this.AFORegisteryUrl = [];
    }
    //------------------------------------------------------------------------------
    // Retourne une copie la liste des Registry connues
    //------------------------------------------------------------------------------
    getList() {
        var res = JSON.stringify(this.AFORegisteryUrl);
        return JSON.parse(res);
    }
    //------------------------------------------------------------------------------
    // Ajoute une Regisqtry à la liste
    //------------------------------------------------------------------------------
    add(host, port) {
        var regUrl = 'http://' + host + ':' + port;
        let idx = this.findIndexRegistryByUrl(regUrl);
        if (-1 === idx) {
            // Url + Compteur
            this.AFORegisteryUrl.push({
                regUrl: regUrl,
                cptrTO: 10
            });
        } else {
            let reg = this.AFORegisteryUrl[idx];
            reg.cptrTO = 10;
        }
        // Decrémenter tous les compteurs
        this.AFORegisteryUrl.forEach((reg, index) => {
            reg.cptrTO -= 1;
        });
        // Supprimer toutes les Registry qui ne répondent plus
        this.AFORegisteryUrl = this.AFORegisteryUrl.filter((reg) => {
            return (reg.cptrTO > 0);
        });
    }
    //------------------------------------------------------------------------------
    // Rechercher l'élément à partir de son Url
    //------------------------------------------------------------------------------
    findIndexRegistryByUrl(regUrl) {
        let idx = this.AFORegisteryUrl.findIndex((item) => {
            return (item.regUrl === regUrl);
        });
        return idx;
    }
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    delete(regUrl) {
        let idx = this.findIndexRegistryByUrl(regUrl);
        if (-1 !== idx) {
            this.AFORegisteryUrl.splice(idx, 1);
        }
    }
    //------------------------------------------------------------------------------
    // Supprime une registry de la liste
    //------------------------------------------------------------------------------
    error(failedRegistryUrl) {
        this.delete(failedRegistryUrl || '');
    }
};
module.exports = RegistryMgr;