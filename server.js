var express = require('express');
// var path = require('path');
var server = express();

var bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({extended:true}));

// server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');
server.use(express.static('public'));

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

/* ======================================================== */
var session         = require('express-session');
var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var connection      = require('./dbconn');
var ppStrats        = require('./config/passport')  /* strategies */

server.use(session({ secret : "teamxv3",
            resave : false,
            saveUninitialized : false
}));
server.use(passport.initialize()); /* use this middleware */
server.use(passport.session());
ppStrats(passport);
/* ======================================================== */
const expressip = require('express-ip');
server.use(expressip().getIpInfoMiddleware);
/* ======================================================== */

var applianceRouter = require('./routes/appliance');
var homeRouter = require('./routes/home');
var addRoute = require('./routes/add');
var ordersRoute  = require("./routes/order");
var userRoute   = require("./routes/user");

/* initialize */
// var initdb = require("./initdb");

server.get('/',function(req,res){
    console.log(req.ipInfo.city);
    res.render("index", {
    	currentUser : req.user,
    	city : req.ipInfo.city
    });
});

server.use('/appliance-repair',applianceRouter);
server.use('/home-services', homeRouter);
server.use(addRoute);
server.use(ordersRoute);
server.use(userRoute);

server.listen(process.env.PORT, process.env.IP ,console.log("Hi, i have started"));
