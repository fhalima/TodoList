const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "halima",
    password: "ferraoun",
    database: "movie_reviews",
});

// app.get("/", (req, res) => {
//     const sqlInsert =
//         "INSERT INTO movie_reviews (movieName,movieReview) VALUES ('movie1', 'Good Movie');";
//     db.query(sqlInsert, (err, result) => {
//         console.log(result);
//         res.send("Ajout nouveau film");
//     });
// });
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
});
app.delete("/api/delete:movie", (req, res) => {
    const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?";
    const movie = req.params.movie;
    db.query(sqlDelete, movie, (err, result) => {
        if (err) console.log(err);
    });
});
app.post("/api/insert", (req, res) => {
    const sqlInsert =
        "INSERT INTO movie_reviews (movieName,movieReview) VALUES (?,?)";
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(result);
    });
});

app.listen(3001, () => {
    console.log("écoute sur le port 3001");
});