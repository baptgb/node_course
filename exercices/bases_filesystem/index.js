const fs = require('fs');

// process.argv est un tableau contenant toutes les informations sur la commande qui exécute ce script
// les deux premiers arguments sont 'node' (l'appel à Node.js) et 'index.js' le fichier appelé (ce script)
// ils sont donc inutiles pour notre programme
const args = process.argv.slice(2);
const action = args[0];

// en fonction du premier argument situé après la commande "node index.js" (eg. node index.js list dir)
// nous exécutons l'action désirée
switch(action) {
    case 'list':
        // readdir permet de lister le contenu d'un répertoire
        fs.readdir(args[1] || '.', 'utf8', function(err, files) {
            for (let i = 0; i < files.length; i++) {
                console.log(files[i]);
            }
        });
        break;
    case 'copy':
        // copyFile permet de copier le fichier source (ie. args[1]) à la destination (ie. args[2])
        fs.copyFile(args[1], args[2], function(err) {});
        break;
    case 'delete':
        // unlink supprime le fichier du système
        fs.unlink(args[1], function(err) {});
        break;
    case 'rename':
        // rename permet de renommer le fichier source (ie. args[1]) avec la valeur donnée (ie. args[2])
        fs.rename(args[1], args[2], function() {});
        break;

}
