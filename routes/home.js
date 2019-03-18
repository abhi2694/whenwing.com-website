var express = require('express');
var router = express.Router();
var connection = require("../dbconn");

router.get('/carpenter', function(req, res, next) {
    res.render("carpenter");
});

router.get('/painter', function(req, res, next) {
    res.render("painter");
});

router.get('/plumber', function(req, res, next) {
    res.render("plumber");
});

router.get('/electrician', function(req, res, next) {
    res.render("electrician");
});

router.get('/glassmirror', function(req, res, next) {
    res.render("glassmirror");
});

router.get('/architect', function(req, res, next) {
    res.render("architect", {
    	currentUser : req.user
    });
});

router.post('/architect', (req, res) => {
    var prof = "Architect";
    var spec = req.body.speciality;
    var minp = req.body.min_price;
    var maxp = req.body.max_price;
    /* price range may be added later */
    connection.query(`SELECT * FROM ww_provider WHERE profession = '${prof}' AND speciality = '${spec}' AND price BETWEEN ${minp} AND ${maxp}`,
    (err, results) => {
        if (err) throw err;
        // res.json(results);
        res.render("search_results", {
            currentUser : req.user,
            profession : prof,
            speciality : spec,
            min_price : minp,
            max_price : maxp,
            prov_list : results
        })
    });
});

router.get('/builder', function(req, res, next) {
    res.render("builder");
});

router.get('/interiordesigner', function(req, res, next) {
    res.render("interiordesigner");
});

router.get('/internet', function(req, res, next) {
    res.render("internet");
});

module.exports = router;