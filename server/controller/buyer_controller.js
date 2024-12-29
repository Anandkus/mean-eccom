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
const addNewAddress = async (req, res) => {
    const user = req.user;
    const { address1, address2, city, state, zipcode, mobile } = req.body;
    try {
        const saveAddress = await addressModel.create({ address1, address2, city, state, zipcode, mobile });
        user.address.push(saveAddress._id);
        await user.save();
        return res.status(200).send({ message: "add new address !" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const deleteAddress = async (req, res) => {
    const addressId = req.params.id;
    const user = req.user;
    try {
        const address = await addressModel.findByIdAndDelete(addressId);
        user.address = user.address.filter(id => id.toString() !== addressId);
        await user.save();
        return res.status(200).send({ message: "deleted successfully " })
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}
module.exports = { getAllProduct, getUserAndAddress, getSingleProduct, addNewAddress, deleteAddress }