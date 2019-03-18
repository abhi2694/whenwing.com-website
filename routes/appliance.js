var express = require('express');
var router = express.Router();
var connection = require("../dbconn");

router.get('/acrepair', function(req, res, next) {
    res.render("acrepair", {
    	currentUser : req.user,
    	city :req.city
    });
});

router.post('/acrepair', (req, res) => {
    var prof = "AC Repair";
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
            prov_list : results,
            city : req.city
        })
    });
});

router.get('/refrepair', function(req, res, next) {
    res.render("refrepair", {
    	currentUser : req.user,
    	city:req.city
    });
});

router.post('/refrepair', (req, res) => {
    var prof = "Refrigerator";
    var spec = req.body.speciality;
    var minp = req.body.min_price;
    var maxp = req.body.max_price;
    /* price range may be added later */
    connection.query(`SELECT * FROM ww_provider WHERE profession = '${prof}' AND speciality = '${spec}' AND price BETWEEN ${minp} AND ${maxp}`,
    (err, results) => {
        if (err) throw err;
        // res.json(results);
        res.render("search_results", {
            city:req.city,
            currentUser : req.user,
            profession : prof,
            speciality : spec,
            min_price : minp,
            max_price : maxp,
            prov_list : results
        })
    });
});

router.get('/rorepair', function(req, res, next) {
    res.render("rorepair", {
    	currentUser : req.user,
    	city:req.city
    });
});

router.post('/rorepair', (req, res) => {
    var prof = "Refrigerator";
    var spec = req.body.speciality;
    var minp = req.body.min_price;
    var maxp = req.body.max_price;
    /* price range may be added later */
    connection.query(`SELECT * FROM ww_provider WHERE profession = '${prof}' AND speciality = '${spec}' AND price BETWEEN ${minp} AND ${maxp}`,
    (err, results) => {
        if (err) throw err;
        // res.json(results);
        res.render("search_results", {
            city:req.city,
            currentUser : req.user,
            profession : prof,
            speciality : spec,
            min_price : minp,
            max_price : maxp,
            prov_list : results
        })
    });
});

router.get('/microrepair', function(req, res, next) {
    res.render("microrepair");
});

router.get('/tvrepair', function(req, res, next) {
    res.render("tvrepair");
});

router.get('/geyserrepair', function(req, res, next) {
    res.render("geyserrepair");
});

router.get('/comprepair', function(req, res, next) {
    res.render("comprepair");
});

router.get('/mobrepair', function(req, res, next) {
    res.render("mobrepair");
});

 module.exports = router;
