const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const port = 3302;
const app = express();
app.use(bodyParser.urlencoded({ "extended": false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(cors({
    origin: "*"
}));
app.listen(port, hostname, () => console.log(`Server running at ${hostname} on port ${port}`));

const con = mysql.createConnection({
    "host": "localhost",
    "user": "root",
    "password": "<Use root pass i.e. 'admin'>",
    "database": "<own>"
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected successfully");
});
