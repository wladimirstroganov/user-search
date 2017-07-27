var path = require("path");
var fs = require('fs');

/**
 * Util function
 * @param user
 * @param query
 * @returns {boolean}
 */
function userMatchQuery(user, query) {
    var match = true;

    for(var prop in query) {
        if(query[prop] === "") continue;

        if(user[prop] != query[prop]) {
            match = false;

            break;
        }
    }

    return match;
}

module.exports = {
    /**
     * Users API
     */
    getUsers: function(req, res) {
        var query = req.body || {};

        fs.readFile(path.join(__dirname, "../data/users.json"), "utf8", function(err, data) {
            var json = JSON.parse(data);
            var user;
            var result = [];

            /**
             * Sort out relevant results
             */
            for(var i = 0; i < json.length; i++) {
                user = json[i];

                if(userMatchQuery(user, query)) {
                    result.push(user);
                }
            }

            res.send(result);
        });
    }
};