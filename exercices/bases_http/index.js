const http = require('http');
const fs = require('fs');

// créer le serveur HTTP via le module http
// la fonction de callback possède la requête entrante et la réponse qui sera renvoyée en paramètre
// cette fonction sera appelée pour chaque requête effectuée vers le serveur
// req.url contient l'url appelée, en fonction de sa valeur, nous pouvons conditionner l'exécution du programme
const server = http.createServer(function (req, res) {
    if (req.url === '/welcome') {
        res.write('Bienvenue sur mon serveur HTTP !');
        res.end();
    } else if (req.url === '/read') {
        // si l'url de la requête est /read, nous lisons puis affichons le contenu du fichier dans la réponse
        fs.readFile('mon_fichier.txt', 'utf8', function(err, result) {
            res.write(result);
            res.end();
        });
    }

});

// le serveur écoute sur le port 8888
server.listen(8888);
server.on('connection', function() {
    console.log('connection');
})
server.on('close', function() {
    console.log('Terminating server...');
});
