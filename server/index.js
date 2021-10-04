const express = require("express");
const cors = require("cors");
const fs = require("fs");
// let jsonData = require("./data.json");

const app = express();
let datajson = [];

const getDataJson = () => {
    fs.readFile("./data.json", "utf8", (err, data) => {
        if (err) {
            datajson = [];
            throw err;
        } else datajson = JSON.parse(data);

        // datajson = data;
    });
};

const setDataJson = () => {
    let jd = JSON.stringify(datajson);
    console.log(jd);
    fs.writeFile("data.json", jd, () => {});
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get("/api/get", (req, response) => {
    getDataJson();
    response.send(datajson);
});

app.delete("/api/delete/:id", (req, res) => {
    let key = req.params.id;
    console.log("voici le id: " + key);
    for (var i = datajson.length - 1; i >= 0; i--) {
        if (datajson[i].id === Number(key)) {
            console.log("c bon");
            datajson.splice(i, 1); //k
        }
    }
    setDataJson();
});
app.post("/api/insert", (req, res) => {
    const titren = req.body.titre;
    const todon = req.body.todo;
    const color = req.body.color;
    let objTodo = {
        id: Math.floor((1 + Math.random()) * 0x10000),
        titre: titren,
        todo: todon,
        color: color,
    };
    datajson.push(objTodo);
    setDataJson();
});

app.listen(3001, () => {
    console.log("écoute sur le port 3001");
});