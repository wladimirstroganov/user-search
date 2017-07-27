var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var router = require("./server/routers/main");

// set up static servers
// first is for web-manager specific files
// app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(path.join(__dirname, "public")));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

// set up routing
router(app);

app.listen(3000, function() {
    console.log("Server started port:3000");
});
