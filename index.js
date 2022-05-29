const express = require("express");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
// app.use(cors());
app.set("view engine", "ejs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "--" + file.originalname);
    },
});

const upload = multer({
    storage,
});

app.get("/", (req, res) => {
    res.render("home");
});
app.get("/next", (req, res) => {
    res.render("next");
});

app.post("/api/upload", upload.single("images"), (req, res, next) => {
    // res.render("next");
    // res.end("File uploded successfully");
    res.redirect("/next");
});

app.listen(5000, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
