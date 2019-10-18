var controllers = require("../controllers/controllers.js");

module.exports = (app, mongoConnection) => {
    app.route("/").get(controllers.sample);
};
