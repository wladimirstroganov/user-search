(function() {
    var form = document.getElementsByTagName("form")[0];
    var inputs = form.getElementsByTagName("input");
    var displayArea = document.getElementsByClassName("display-area")[0];
    /**
     * Custom add event method, that handles IE8 event model
     */
    var addEvent = function() {
        var eventModel = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventPrefix = window.attachEvent ? "on" : "";

        return function(eventName, element, listener) {
            element[eventModel](eventPrefix + eventName, listener);
        }
    }();

    /**
     * Submit manager
     * @param evt
     * @returns {boolean}
     */
    function submitManager(evt) {
        evt = evt || event;

        evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);

        /**
         * Init search process
         */
        searchUsers();

        return false;
    }

    /**
     * Search users method that starts search process
     */
    function searchUsers() {
        var data = {};
        var input;

        /**
         * Combine data in data obj, last input field must be ignored
         */
        for(var i = 0; i < inputs.length - 1; i++) {
            input = inputs[i];

            data[input.name] = input.value;
        }

        ajax(data);
    }

    /**
     * Custom ajax method, handles IE8 Http Request model
     * @param data
     */
    function ajax(data) {
        var tr = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Msxml2.XMLHTTP");

        tr.onreadystatechange = function() {
            if(tr.readyState === 4) {
                displayUsers(JSON.parse(tr.response));
            }
        };

        tr.open("POST", "/api/users/", true);

        tr.setRequestHeader("Content-Type","application/json");
        tr.setRequestHeader("Accept","application/json");

        tr.send(JSON.stringify(data));
    }

    /**
     * Outputs data to the DOM
     * @param data
     */
    function displayUsers(data) {
        var user;
        var table;
        var tr;
        var td;

        table = document.createElement("TABLE");

        // create th separately
        attachTableHead(table);

        for(var i = 0; i < data.length; i++) {
            user = data[i];

            tr = document.createElement("TR");

            table.appendChild(tr);

            for(var key in user) {
                td = document.createElement("TD");

                td.innerHTML = user[key];

                tr.appendChild(td);
            }
        }

        // erase previous result's table
        displayArea.innerHTML = "";

        displayArea.appendChild(table);
    }

    /**
     * Attaches table head to table
     * @param table
     */
    function attachTableHead(table) {
        var fields = [
            "id",
            "email",
            "status",
            "first_name",
            "last_name",
            "display_name",
            "photo_url",
            "created_at",
            "updated_at",
            "last_login_at"
        ];
        var tr = document.createElement("TR");
        var td;

        for(var i = 0; i < fields.length; i++) {
            td = document.createElement("TD");

            td.innerHTML = fields[i].toUpperCase();

            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    /**
     * Capture default form submit event
     */
    addEvent("submit", form, submitManager);
})();