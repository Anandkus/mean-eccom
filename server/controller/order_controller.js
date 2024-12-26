const orderModel = require("../models/order_model");
const userModel = require("../models/user_model");

const placeOrder = async (req, res) => {
    const user = req.user;
    const { fullname, email, contact, addressId, sellerId, productId, status, deliveryDate } = req.body;
    try {
        const orderPlace = await orderModel.create({ fullname, email, contact, addressId, sellerId, productId, status, deliveryDate });
        user.orderId.push(orderPlace._id);
        await user.save();
        if (user.cartId.length > 0) {
            user.cartId = user.cartId.filter(id => id.toString() !== productId);
            await user.save();
        }
        return res.status(200).send({ message: "order place success!" })
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const myOrder = async (req, res) => {
    const userId = req.user._id;
    try {
        //only get specific field of value  orderId
        const allOrder = await userModel.findById(userId, { orderId: 1, _id: 0 })
            .populate({
                path: 'orderId',
                populate: [
                    { path: 'addressId' },         // Populate addressId field
                    { path: 'productId' }          // Populate productId field
                ]
            });

        const myOrder = allOrder.orderId;
        return res.status(200).send({ message: "success !", myOrder })
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const sellerOrders = async (req, res) => {
    const userId = req.user._id;
    try {
        const allOrder = await orderModel.find({ sellerId: userId }).populate("productId").populate("addressId");

        return res.status(200).send({ message: "success", allOrder })
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}
const updateOrder = async (req, res) => {
    const orderId = req.params.id;
    try {
        const editOrder = await orderModel.findByIdAndUpdate(orderId, req.body);
        return res.status(200).send({ message: "update Successfully!", })
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}
const deleteOrder = async (req, res) => {
    const orderId = req.params.id;
    const user = req.user;
    const userId = user._id;
    try {
        const deletedOrder = await orderModel.findByIdAndDelete(orderId);
        user.orderId = user.orderId.filter(id => id.toString() !== orderId);
        await user.save();
        res.status(200).send({ message: "deleted Successfully !" })
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}
const AllOrderGetByAdmin = async (req, res) => {
    try {
        const allOrder = await orderModel.find().populate("productId").populate("addressId");
        return res.status(201).send({ message: "success ", allOrder })
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}
module.exports = { placeOrder, myOrder, sellerOrders, updateOrder, deleteOrder, AllOrderGetByAdmin }