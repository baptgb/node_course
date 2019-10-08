var express = require('express');
var fs = require('fs');

var router = express.Router();

// affiche le compteur du nombre de requêtes
router.get('/counter', function (req, res, next) {
    res.write('Nombre de requêtes : ' + req.app.locals.counter);
    res.send();
});

// :id est un paramètre autorisé dans l'url
// on peut récupérer sa valeur via req.params.id
router.get('/produits?/:id', function (req, res, next) {
    console.log(req.params.id);
    res.write('Produit recherché : ' + req.params.id);
    res.send();
});

router.get('/liste_produits', function (req, res, next) {
    // le module fs nous permet de lire un fichier du serveur
    // nous renvoyons le contenu de ce fichier via res.send()
    fs.readFile('./views/exercice.html', 'utf8', function(err, result) {
        console.log(result);
        res.send(result);
    });
});

// récupère et affiche le contenu du corps de la requête (POST)
router.post('/ajouter_produit', function (req, res, next) {
    res.send(req.body);
});

router.get('/products.:type', function (req, res, next) {
    var type = req.params.type;
    // conditionner le type accepté, dans le cas inverse, nous passons la requête à un autre middleware
    if (type == 'json' || type == 'xml') {
        res.send('ok');
    } else {
        next();
    }
});
















router.post('/ajouter_produit', function (req, res, next) {
    console.log(req.body);
    res.send(JSON.stringify(req.body));
});












router.get(/products.(json|xml)/, function (req, res, next) {

});

/*router.get('/counter', function (req, res, next) {
    res.end('Nombre de requetes : ' + req.app.locals.counter);
});*/

module.exports = router;
