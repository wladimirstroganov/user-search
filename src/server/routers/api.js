var apiController = require("../controllers/apiController");

module.exports = function(app) {
    /** User **/
    app.post("/api/users/", apiController.getUsers);
};