const express = require("express");
var router = express.Router();
var connection = require("../dbconn");
var middleware = require("../middleware/index");


router.get("/orders/place", middleware.isLogged, (req, res) => {
    res.render("order_place");
})

router.get("/orders/cancel", middleware.isLogged, (req, res) => {
    res.render("order_cancel");
})
router.get("/orders/place/:id", middleware.isLogged, (req, res) => {
    var prov_id = req.params.id;
    connection.query(`SELECT * FROM ww_provider WHERE prov_id = ${prov_id}`, (err, rows) => {
        if (err) throw err;
        if (rows.length == 0) res.send("No such provider exists");
        else {
            var username = req.user.username;
            connection.query(`SELECT * FROM orders WHERE username = '${username}' AND prov_id = ${prov_id} AND order_status = 0`, (err, rows) => {
                if (err) throw err;
                if (rows.length != 0) res.send("That provider is already in your list");
                else {
                    var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
                    connection.query(`INSERT INTO orders (username, prov_id, order_date, order_status)
                            VALUES ('${username}', ${prov_id}, '${date}', 0)`, (err, rows) => {
                                if (err) throw err;
                                res.redirect("/orders");
                    });
                }
            })
            
        }
    })
})

router.get("/orders", middleware.isLogged, (req, res) => {
    connection.query(`SELECT * FROM orders, ww_provider WHERE username = '${req.user.username}' AND ww_provider.prov_id = orders.prov_id`, (err, rows) => {
        if (err) throw err;
        res.render("orders", {
            orders : rows,
            currentUser : req.user,
            city: req.city
        })
    })
})

router.post("/orders/cancel", middleware.isLogged, (req, res) => {
    var order_id = req.body.order_id;
    connection.query(`SELECT * FROM orders WHERE username = '${req.user.username}' AND order_id = ${order_id} AND order_status = 0`, (err, rows) => {
        if (err) throw err;
        if (rows.length == 0) res.send("Either that order is finalized or it is not in your list");
        else {
            connection.query(`DELETE FROM orders WHERE order_id = ${order_id}`, (err, result) => {
                if (err) throw err;
                res.render("/orders", {
    	currentUser : req.user
    });
            })
        }
        
    })
})

router.get("/orders/checkout", middleware.isLogged, (req, res) => {
    connection.query(`UPDATE orders SET order_status = 1 WHERE username = '${req.user.username}'`, (err, rows) => {
        if (err) throw err;
        res.redirect("/orders");
    })
})
module.exports = router;