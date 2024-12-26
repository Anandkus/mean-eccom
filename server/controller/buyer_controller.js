const productModel = require("../models/product_model");
const addressModel = require("../models/address_model");
const userModel = require("../models/user_model");

const getAllProduct = async (req, res) => {
    try {
        const allProduct = await productModel.find().select("-userId")
        return res.status(200).send({ message: "success !!", allProduct });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}
const getSingleProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const Product = await productModel.findOne({ _id: productId });
        return res.status(200).send({ message: "success !!", Product });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const getUserAndAddress = async (req, res) => {
    const userId = req.user._id;
    try {
        const userAndaddress = await userModel.findById({ _id: userId }).populate("address").select("-password");
        return res.status(200).send({ message: "success", userAndaddress })
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = { getAllProduct, getUserAndAddress, getSingleProduct }