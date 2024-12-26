const orderModel = require("../models/order_model");
const userModel = require("../models/user_model");

const addTocart = async (req, res) => {
    const { productId } = req.body;
    const user = req.user;
    try {
        user.cartId.push(productId);
        await user.save();
        return res.status(201).send({ message: "add to cart successfull !" })
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const getToCart = async (req, res) => {
    const userId = req.user._id;
    try {
        const productDetials = await userModel.findById(userId, { cartId: 1, _id: 0 }).populate("cartId");
        const product = productDetials.cartId;
        return res.status(200).send({ message: "success", product });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const deleteCart = async (req, res) => {
    const cartId = req.params.id;
    const user = req.user;
    try {
        const del = user.cartId = user.cartId.filter(id => id.toString() !== cartId);
        await user.save();
        return res.status(200).send({ message: "deleted successfully !" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = { addTocart, getToCart, deleteCart };