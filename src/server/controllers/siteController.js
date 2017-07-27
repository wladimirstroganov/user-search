var path = require("path");
var fs = require('fs');

module.exports = {
    Index: function(req, res) {
        res.sendFile(path.join(__dirname, "../../public/index.html"));
    }
};