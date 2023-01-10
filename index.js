const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const debug = true;
const con = mysql.createConnection({
    "host": "localhost",
    "user": "root",
    "password": "Root@123",
    "database": "hms"
});
const port = 3302;
const app = express();
app.use(bodyParser.urlencoded({ "extended": false }));
app.use(bodyParser.json());
if (debug) org = [ "http://127.0.0.1:5501" ];
else org = [ "*" ];
app.use(cors({
    origin: org
}));
app.listen(port, () => console.log(`Server running at ${port}`));

app.all("/user", (req, res) => {
    console.log("Method:", req.method);
    switch (req.method) {
        case "GET":
            if (Object.keys(req.query).length == 0) {
                con.query("Select * from user order by uid", (err, result) => {
                    if (debug) console.log(result);
                    if (err)
                        res.status(404).end("Error");
                    else
                        res.status(200).send(result);
                });
            } else {
                que = Object.entries(req.query);
                console.log(que);
                sql = `select * from user where ${que[ 0 ][ 0 ]} like '%${que[ 0 ][ 1 ]}%' order by uid`;
                con.query(sql, (err, result) => {
                    if (debug) console.log(result);
                    if (err)
                        res.status(404).end("Error");
                    else
                        res.status(200).send(result);
                });
            }
            break;
        case "POST":
            data = req.body;
            if (debug) console.log(data);
            sql = "insert into user values (?)";
            values = [ null, req.body.uname, req.body.pass, req.body.type, req.body.email, req.body.phone ];
            con.query(sql, [ values ], (err, result) => {
                if (debug) console.log(result);
                if (err)
                    res.status(500).end("Error");
                else
                    if (result.affectedRows == 1) res.sendStatus(201);
            });
            break;
        case "PUT":
            uid = req.query.uid;
            sql = `update user set
                uname = '${req.body.uname}',
                pass = '${req.body.pass}',
                type = '${req.body.type}',
                email = '${req.body.email}',
                phone = '${req.body.phone}'
                where uid = ${uid}
             `;
            con.query(sql, (err, result) => {
                if (debug) console.log(result);
                if (err)
                    res.status(500).end("Error");
                else
                    res.sendStatus(200);
            });
            break;
        case "DELETE":
            uid = req.query.uid;
            sql = `delete from user where uid = ${uid}`;
            con.query(sql, (err, result) => {
                if (debug) console.log(result);
                if (err)
                    res.status(500).end("Error");
                else
                    res.sendStatus(200);
            });
            break;
        default:
            res.status(405).end();
    }
});