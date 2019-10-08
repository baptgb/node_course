// Chargement du fichier ‘mon_module.js’
const distance = 100;
const temps = 9.58;
const get_vitesse = () => {
    return distance / temps;
};

// lors de l'appel à require("mon_module"), les éléments présents dans module.exports seront utilisables
// les autres variables seront uniquement disponible à l'intérieur du module (ici même)
module.exports.distance = distance;
module.exports.temps = temps;
module.exports.get_vitesse = get_vitesse;

//console.log(module.exports === this); -> true
