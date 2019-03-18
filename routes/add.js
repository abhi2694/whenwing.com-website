const express   = require("express");
var router      = express.Router();
var connection  = require("../dbconn");
const path      = require("path");
const fs        = require("fs");
const multer    = require("multer");

/* temp directory of uploaded files */
const upload = multer({
    dest : "./resources",
});

router.get("/add", (req, res) => {
    res.render("add_prov");
})

router.post("/add", upload.single("file"), (req, res) => {
    var prov_name   = req.body.prov_name;
    var price       = req.body.price;
    var age         = req.body.age;
    var profession  = req.body.profession;
    var addr        = req.body.addr;
    var contact     = req.body.contact;
    var workexp     = req.body.workexp;
    var about       = req.body.about;
    var speciality  = req.body.speciality;
    var prov_record = req.body.prov_record;
    var date        = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var photo_id    = "NONE";   /* assuming no photo */
    var prov_status = 1;        /* dummy data */
    connection.query(`INSERT INTO ww_provider (
            prov_name,
            price,
            age,
            addr,
            profession,
            contact,
            workexp,
            prov_record,
            about,
            speciality,
            reg_date,
            photo_id,
            prov_active_status
        ) VALUES (
            '${prov_name}',
            '${price}',
            '${age}',
            '${addr}',
            '${profession}',
            '${contact}',
            '${workexp}',
            '${prov_record}',
            '${about}',
            '${speciality}',
            '${date}',
            '${photo_id}',
            '${prov_status}'
        )`, (err, results) => {
            if (err) throw err;
            var prov_id = results.insertId
            if (req.file) { /* if photo provided */
                /* current naming scheme is : */
				var photo_id = "img_" + prov_id;
				
				const tempPath = req.file.path;
			    const targetPath = "./resources/" + photo_id + ".png";
			    	
			    var extension = path.extname(req.file.originalname).toLowerCase();
			    if (extension === ".png" || extension === ".jpg") {
			        fs.rename(tempPath, targetPath, (err) => {
			            if (err) throw err;
			        	connection.query(`UPDATE ww_provider SET photo_id = '${photo_id}' WHERE prov_id = '${prov_id}'`, (err, results) =>{
			        		if (err) throw err;
			        		
			        		/* response upon adding provider, photo provided */
			        	// 	res.send("ADD PROVIDER : OK");
			        	    res.redirect("/getprov/" + prov_id);
			        	})
			        })
			    }
			    else {
			    	fs.unlink(tempPath, (err) => {
			    		if (err) throw err;
			    		
			    		/* response upon uploading unsupported file extension */
			    		res.send("Unsupported Image extension");
			    	})
			    }
    		}
			else {
			    /* response upon adding provider, photo not provided */
        // 		res.send("ADD PROVIDER : NO PHOTO, OK");
                res.redirect("/getprov/" + prov_id);
        	}
            });
})

router.get("/img/:id", (req, res) => {
	connection.query(`SELECT * FROM ww_provider WHERE prov_id = ${req.params.id}`, (err, results) => {
		if (err) throw err;
		if (results.length == 0) res.send("not found");
		else {
		    if (results[0].photo_id === "NONE") res.send("No photo");
		    else res.sendFile(path.join(__dirname, "/../resources/" + results[0].photo_id + ".png"));
		}
	})
})
/*
const handleErr = (err, res) => {
	res
		.status(500)
		.contentType("text/plain")
		.end("Something went wrong!");
};
*/

router.get("/getprov", (req, res) => {
    connection.query(`SELECT * FROM ww_provider`, (error, results) => {
        if (error) throw error;
        // res.json(results);
        res.render("prov_list", {
            number : results.length,
            prov_list : results
        })
    });
});

router.get("/getprov/:id", (req, res) => {
	connection.query(`SELECT * FROM ww_provider WHERE prov_id = ${req.params.id}`, (error, result) => {
        if (error) throw error;
        /* result should have a single result, the inserted row, if everything works properly */
        if (result.length == 0) res.send("Provider with id : " + req.params.id + " not found");
        else res.render("show_prov", {prov : result[0]});
	});
});

module.exports = router;
