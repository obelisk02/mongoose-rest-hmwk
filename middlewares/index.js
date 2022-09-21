const jwt = require("jsonwebtoken");
const config = require("../config");

exports.authRequired = function (req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const verified = jwt.verify(token, config.secret);
        req.user = verified;

        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid token!" });
    }
};
