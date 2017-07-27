var siteRouter = require("./site"); // this contains html routes via browser address bar
var apiRouter = require("./api"); // this contains api routes via javascript

module.exports = function(app) {
    /**
     * @Description Serves html views to client
     */
    siteRouter(app);

    /**
     * @Description Work with apis
     */
    apiRouter(app);
};