const jwt = require("jsonwebtoken");
const User = require("../models/user");
const setToken = require("../helpers/setToken");

module.exports = {
    login: async (req, res) => {
        const { username, email, password } = req.body;
        if (!((username || email) && password)) {
            res.errorStatusCode = 400;
            throw new Error("Enter username or email and password");
        }
        const user = await User.findOne({
            $or: [{ username }, { email }],
            password,
        });
        // const user = await User.findOne( {password}).or([ {username }, { email }])
        if (!user) {
            res.errorStatusCode = 400;
            throw new Error("authentication is invalid");
        }
        if (!user.isActive) {
            res.errorStatusCode = 400;
            throw new Error("User is not Active");
        }

        res.send({
            error: false,

            token: setToken(user, true),
        });
    },
    register: async (req, res) => {
        req.body.isAdmin = false;
        req.body.isStaff = false;

        const user = await User.create(req.body);

        res.send({
            error: false,

            token: setToken(user, true),
        });
    },
    refresh: async (req, res) => {
        const refreshToken = req.body.token?.refresh;
        if (!refreshToken) {
            res.errorStatusCode = 401;
            throw new Error("Refresh is necessary");
        }

        jwt.verify(refreshToken, process.env.REFRESH_KEY, async function (err, userData) {
            if (err) {
                 res.errorStatusCode = 401;
                throw new Error("Authentication is invalid");
                
            } 
            const { _id,password } = userData
            const user = await User.findOne({ _id })
            if (!user.password==password) {
                res.errorStatusCode = 401;
                throw new Error("Authentication is invalid");
            }
            if (!user.isActive) {res.errorStatusCode = 400;
                throw new Error("User is not Active")
            };
            
            res.send({
                error: false,
                token:setToken(user)
            })

        });

        const data = {
            access: user,
            refresh: { _id: user._id, password: user.password },
            shortExpiresIn: "10m",
            longExpiresIn: "3d",
        };

        const access = jwt.sign(data.access, SECRET_KEY, {
            expiresIn: data.shortExpiresIn,
        });
        const refresh = jwt.sign(data.refresh, SECRET_KEY, {
            expiresIn: data.longExpiresIn,
        });

        res.send({
            error: false,
            // token: {
            //     access,
            //     refresh,
            // },

            token: setToken(user, true),
        });
    },
    logout: async (req, res) => {
        res.send({
            error: false,
            message:
                "No need any doing for logout. You must deleted Bearer Token from your browser.",
        });
    },
};
