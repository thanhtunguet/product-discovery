const express = require("express");
const proxy = require("express-http-proxy");

const app = express();

app.use("/api", proxy("https://listing.services.teko.vn"));
app.use("/", proxy("http://localhost:3001"));

app.listen(3000, () => {
  console.log("Web server is up and running");
});
