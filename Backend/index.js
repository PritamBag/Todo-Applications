const express = require("express");
const app = express();
const cors = require("cors");
require("./connection/connection");
const auth = require("./routes/auth");
const list = require("./routes/list");
app.use(express.json());
app.use(cors());

app.get("/", (req,res) => {
    res.send("Hello")
})

app.use("/api/", auth);
app.use("/api/", list);


app.listen(1700, () => {
    console.log("Server started");
});