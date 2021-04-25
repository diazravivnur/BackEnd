const express = require("express");
const routers = require("./src/router");

const app = express();

const port = 5000;

app.use(express.json());
app.use("/api/v1", routers);
app.listen(port, () => console.log(`Running on port ${port}`));
