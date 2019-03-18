var LocalStrategy   = require('passport-local').Strategy;
var connection      = require('../dbconn');
var bcrypt          = require('bcrypt');

// generating a hash
var generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
var validPassword = (plainPassword, hash) => {
    return bcrypt.compareSync(plainPassword, hash);
};

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
		done(null, user.username);
    });

    passport.deserializeUser(function(username, done) {
		connection.query(`SELECT * FROM users WHERE username = '${username}'`, (err,rows) => {	
			done(err, rows[0]);
		});
    });

    passport.use('local-signup', new LocalStrategy({
            passReqToCallback : true
        }, (req, username, password, done) => {
            
        /* other details here */
        var name = req.body.name;
        var mobile = req.body.mobile;
        var email = req.body.email;
        var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        
        connection.query(`SELECT * FROM users WHERE username = '${username}'`, (err, rows) => {
			if (err) return done(err);
		    if (rows.length != 0) return done(null, false); /* username already exists */
            else {
                password = generateHash(password);
                connection.query(`INSERT INTO users (username, password, name, mobile, email, reg_date) 
                        VALUES ('${username}', '${password}', '${name}', '${mobile}', '${email}', '${date}')`, (err, rows) => {
				    if (err) throw err;
				    connection.query(`SELECT * FROM users WHERE username = '${username}'`, (err, rows) => {
				        if (err) throw err;
				        return done(null, rows[0]);
				    });
				});
            }	
		});
    }));

    passport.use('local-login', new LocalStrategy({
        passReqToCallback : true
    }, (req, username, password, done) => {
         connection.query(`SELECT * FROM users WHERE username = '${username}'`, (err, rows) => {
			 if (err) return done(err);
			 if (rows.length == 0) return done(null, false); // req.flash is the way to set flashdata using connect-flash
             if (!validPassword(password, rows[0].password)) return done(null, false); // create the loginMessage and save it to session as flashdata
             return done(null, rows[0]);			
		});
    }));

};