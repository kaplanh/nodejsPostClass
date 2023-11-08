const jwt = require("jsonwebtoken");
module.exports = function (user, isRefresh = false) {
    const data = {
        access: user.toJSON(),
        refresh: { _id: user._id, password: user.password },
        shortExpiresIn: "10m",
        longExpiresIn: "3d",
    };
    const token = {};
    token.access = jwt.sign(data.access, process.env.ACCESS_KEY, {
        expiresIn: data.shortExpiresIn,
    });
    if (isRefresh) {
        token.refresh = jwt.sign(data.refresh, process.env.REFRESH_KEY, {
            expiresIn: data.longExpiresIn,
        });
    }

    return token;
};
