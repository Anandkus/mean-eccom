const productModel = require("../models/product_model");
const userModel = require("../models/user_model");

const addNewProduct = async (req, res) => {
    const { productName, desc, price, discountPrice, status, productUrl } = req.body;
    const user = req.user;
    try {
        const productSave = await productModel.create({
            productName, desc, price, discountPrice, status, productUrl, userId: user._id
        })
        user.productId.push(productSave._id); // Push the new product ID into 
        await user.save(); // Save the updated user document
        return res.status(201).send({ message: "add new product success !!" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}
const allProudct = async (req, res) => {
    const user = req.user;
    const userId = user._id;
    try {
        const userProduct = await userModel.findById(userId).populate("productId");
        return res.status(200).send({ message: "success !!", product: userProduct.productId })
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}
const getAllProductByAdmin = async (req, res) => {
    try {
        const product = await productModel.find();
        return res.status(200).send({ message: "success !!", product })
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}
const singleProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productModel.findOne({ _id: productId });
        return res.status(200).send({ message: "success !", product: product })
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}
const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;
    try {
        const product = await productModel.findByIdAndUpdate(productId, productData, { new: true });
        return res.status(200).send({ message: "updated successfully !" })
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    const userId = req.user._id;
    try {
        const product = await productModel.findByIdAndDelete({ _id: productId });
        const user = await userModel.findById(userId);
        if (user) {
            user.productId = user.productId.filter(id => id.toString() !== productId);
            await user.save(); // Save the updated document
        }
        return res.status(200).send({ message: "deleted successfully !" })
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const deleteProudctByAdmin = async (req, res) => {
    const productId = req.params.id;
    try {
        const productDetails = await productModel.findOne({ _id: productId });
        const userId = productDetails.userId;
        const user = await userModel.findById(userId);
        if (user) {
            const product = await productModel.findByIdAndDelete(productId);
            user.productId = user.productId.filter(id => id.toString() !== productId);
            await user.save(); // Save the updated document
        }
        else {
            return res.status(501).send({ message: "User Not found !" });
        }
        return res.status(200).send({ message: "deleted successfully !" })

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = { addNewProduct, allProudct, deleteProduct, updateProduct, singleProduct, getAllProductByAdmin, deleteProudctByAdmin };