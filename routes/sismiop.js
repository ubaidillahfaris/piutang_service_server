const sismiopConntroller = require('../controller/sismiopController')

var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    return res.send({
        message: 'Api sismiop endpoint'
    })
});

router.get('/data', new sismiopConntroller().getData);

module.exports = router;
