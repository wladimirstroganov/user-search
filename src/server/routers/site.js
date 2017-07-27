var siteController = require("../controllers/siteController");

module.exports = function(app) {
    app.get("/", siteController.Index);
};