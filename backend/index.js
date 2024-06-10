const express = require("express");
const cors = require("cors");
app.use(cors);

//add body parser
app.use(express.json());

const mainRouter = require("./routes/index");

const app = express();

app.use("/api/v1", mainRouter);

app.listen(3000);
