var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    // l'appel à la fonction render() permet d'appeler le moteur de templates configuré
    // sur un fichier du répertoire views/
    // le deuxième argument constitue les variables passées au template pour son rendu
    res.render('ma_page', {
        title: 'Express + Mustache',
        text: 'Some text ...',
        list: ['Hello', 'world'],

        object: {
            a: 1,
            b: '2',
            c: true
        },
        func: function() {
            return this.title + this.text;
        }
    });
});

module.exports = router;
