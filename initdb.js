var connection = require("./dbconn");

connection.query(`DROP TABLE IF EXISTS ww_provider`, (error, results) => {
	if (error) throw error;
	console.log(results);
});

connection.query(
    `CREATE TABLE ww_provider (
        prov_id 			bigint(11) 		NOT NULL AUTO_INCREMENT,
        prov_name 			varchar(256) 	NOT NULL,
        age 				int(11) 		NOT NULL,
        price               int(11)         NOT NULL,
        addr 				varchar(500) 	NOT NULL,
        profession 			varchar(50) 	NOT NULL,
        contact 			varchar(15) 	NOT NULL,
        workexp 			varchar(20) 	NOT NULL,
        prov_record 		varchar(250) 	NOT NULL,
        about 				varchar(500) 	NOT NULL,
        speciality 			varchar(100) 	NOT NULL,
        photo_id 			varchar(32) 	NOT NULL,
        reg_date 			datetime 		NOT NULL,
        prov_active_status 	tinyint(1) 		NOT NULL,
        PRIMARY KEY (prov_id)
      ) ENGINE=InnoDB AUTO_INCREMENT=1000000 DEFAULT CHARSET=latin1 COMMENT='Service Provider Information';`
     , (error, results) => {
            if (error) throw error;
            console.log('RESULT : ', results);
});

connection.query(
    `LOCK TABLES ww_provider WRITE;`,
    function(err,results){
        if(err){
            console.log(err)
        }
        else{
            console.log("Table locked successfully")
        }
    }
)

var generator = require("./generator");
connection.query(
    `INSERT INTO ww_provider 
        (prov_name, profession, speciality, price, contact, age, addr, workexp, prov_record, about, photo_id, reg_date, prov_active_status) 
        VALUES
        ${generator(2000)}
        `,
            (err, results) => {
        if(err){
            console.log(err)
        }
        else{
            console.log(results)
            console.log("Inserted successfully")
        }
    }
)

connection.query(
    `UNLOCK TABLES;`,
    function(err,results){
        if(err){
            console.log(err)
        }
        else{
            console.log(results)
            console.log("Table unlocked successfully")
        }
    }
)


connection.query(`DROP TABLE IF EXISTS users`, (error, results) => {
	if (error) throw error;
	console.log(results);
});

connection.query(
    `CREATE TABLE users (
        username 			varchar(50) 	NOT NULL,
        password 			varchar(512) 	NOT NULL,
        name 				varchar(50)		NOT NULL,
        email				varchar(50)		NOT NULL,
        mobile				varchar(50)		NOT NULL,
        reg_date            datetime        NOT NULL,
        PRIMARY KEY (username)
      ) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='User authentication table';`
     , (error, results) => {
            if (error) throw error;
            console.log('RESULT : ', results);
});

connection.query(`DROP TABLE IF EXISTS orders`, (error, results) => {
	if (error) throw error;
	console.log(results);
});

connection.query(
    `CREATE TABLE orders (
        order_id            bigint(11)      NOT NULL AUTO_INCREMENT,
        username 			varchar(50) 	NOT NULL,
        prov_id             bigint(11)      NOT NULL,
        order_date          datetime        NOT NULL,
        order_status        tinyint(1)      NOT NULL,
        PRIMARY KEY (order_id)
      ) ENGINE=InnoDB AUTO_INCREMENT=1000000 DEFAULT CHARSET=latin1 COMMENT='User orders table';`
     , (error, results) => {
            if (error) throw error;
            console.log('RESULT : ', results);
});