const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 3302;
//To grab information that is posted, we need to use the following statement
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/"));
app.use(cors({
    origin: "*"
}));
app.listen(port, () => console.log(`server is running at ${port}`));
var data = JSON.parse(fs.readFileSync(__dirname + "/notes.json"));
data.notes.sort(sortByProperty("id"));
app.get("/notes", (req, res) => {
    console.log(data);
    res.status(200).json(data);
});

app.get("/edit/:noteId", (req, res) => {
    let edt;
    let id = parseInt(req.params.noteId);
    for (let i in data.notes) {
        if (data.notes[ i ].id == id)
            edt = data.notes[ i ];
    }
    console.log(edt);
    if (edt == null) res.sendStatus(404);
    else res.status(200).json(edt);
});

app.get("/add", (req, res) => {
    let add = { id: data.notes[ data.notes.length - 1 ].id + 1, title: "", desc: "" };
    console.log(add);
    res.status(200).json(add);
});

app.post("/save", (req, res) => {
    console.log(req.body);
    req.body.id = parseInt(req.body.id);
    let exists = false;
    for (let i in data.notes) {
        if (data.notes[ i ].id == req.body.id) exists = true;
    }
    if (exists) {
        res.sendStatus(409);
    }
    data.notes.push(req.body);
    fs.writeFile(__dirname + "/notes.json", JSON.stringify(data), (err) => {
        if (err) {
            console.error("error on writing file");
            res.status(501).redirect("/");
        } else {
            console.log("Success");
            data = JSON.parse(fs.readFileSync(__dirname + "/notes.json"));
            res.status(201).redirect("/");
        }

    });
});

app.post("/save/:noteId", (req, res) => {
    console.log(req.body);
    req.body.id = parseInt(req.body.id);
    for (let i in data.notes) {
        if (data.notes[ i ].id == req.body.id) {
            data.notes[ i ].id = req.body.id;
            data.notes[ i ].title = req.body.title;
            data.notes[ i ].desc = req.body.desc;
        }
    }
    fs.writeFile(__dirname + "/notes.json", JSON.stringify(data), (err) => {
        if (err) {
            console.error("error on writing file");
            res.status(501).redirect("/");
        } else {
            console.log("Success");
            data = JSON.parse(fs.readFileSync(__dirname + "/notes.json"));
            res.status(202).redirect("/");
        }

    });
});

app.delete("/delete/:noteId", (req, res) => {
    console.log(req.body);
    data.notes = deleteNotesArray(data.notes, req.params.noteId);
    console.log(data.notes);
    fs.writeFile(__dirname + "/notes.json", JSON.stringify(data), (err) => {
        if (err) {
            console.error("error on writing file");
            res.sendStatus(501);
        } else {
            console.log("Success");
            data = JSON.parse(fs.readFileSync(__dirname + "/notes.json"));
            res.sendStatus(202);
        }

    });
});

function sortByProperty(property) {
    return function (a, b) {
        if (a[ property ] > b[ property ])
            return 1;
        else if (a[ property ] < b[ property ])
            return -1;

        return 0;
    };
}

function deleteNotesArray(arr, index) {
    return arr.filter((ele) => {
        return ele.id != index;
    });
}