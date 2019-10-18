//! Credit: https://dev.to/zellwk/three-useful-express-middleware-1di
const omitEmpty = require("omit-empty");

module.exports = (req, res, next) => {
    req.body = omitEmpty(req.body);
    req.params = omitEmpty(req.params);
    req.query = omitEmpty(req.query);
    next();
};

