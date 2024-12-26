const jwtProvider = require("../confiq/jwtprovider");
const userModel = require('../models/user_model');

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(404).send({ error: "token not found" });
        }
        const userId = jwtProvider.getUserIdFromToken(token);
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ error: "user not found !" })
        }
        req.user = user;
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
    next();
}

module.exports = authenticate;