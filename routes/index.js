let express = require('express');
let router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/../views/index.html'));
});

/* XHR test. */
router.get('/xhr', function (req, res, next) {
    res.set("Access-Control-Allow-Origin", "https://www.google.com");
    res.send("My response");
});

module.exports = router;
