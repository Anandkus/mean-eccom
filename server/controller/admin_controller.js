const userModel = require("../models/user_model");
const addressModel = require("../models/address_model");
const bcrypt = require("bcrypt");
const jwtProvider = require("../confiq/jwtprovider");

const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });;
        if (!user) {
            return res.status(404).send({ message: "invalid value  !.. :" })
        }
        if (user.role === 'seller' || user.role === "buyer") {
            return res.status(404).send({ message: "invalid value  !.. :" })
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(401).send({ message: "invalid value  !.. :" })
        }
        const { password: _, ...userDataWithoutPassword } = user.toObject()
        const jwt = jwtProvider.generateToken(user._id);
        return res.status(201).send({ message: "login success !!", jwt, user: userDataWithoutPassword });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const getSingelUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await userModel.findById({ _id: userId }).populate("address").select("-password");
        return res.status(200).send({ message: "success", user })
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}
const userUpdateByAdmin = async (req, res) => {
    const { fname, lname, email, mobile, age, dob, about, role, gender, agreetc, address1, address2, city, state, zipcode, addressId, photo } = req.body;
    const userId = req.params.id;
    const userData = { fname, lname, email, mobile, age, dob, about, photo, role, gender, agreetc };
    const addressData = { address1, address2, city, state, zipcode, mobile };
    try {
        if (req.file) {
            userData.photo = req.file.filename;
        }
        const userUpdate = await userModel.findByIdAndUpdate(userId, userData, { new: true });
        const addressUpdate = await addressModel.findByIdAndUpdate(addressId, addressData, { new: true });

        return res.status(201).send({ message: "updated success !!" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}
const deleteUser = async (req, res) => {
    const { userId, addressId } = req.body;
    try {
        const user = await userModel.findByIdAndDelete(userId);
        const address = await addressModel.findByIdAndDelete(addressId);
        return res.status(201).send({ message: "deleted success !" })
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = { adminLogin, getSingelUser, deleteUser, userUpdateByAdmin }