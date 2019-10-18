var controllers = require("../controllers/controllers.js");

module.exports = (app) => {
    app.route("/").get(controllers.sample);
};
