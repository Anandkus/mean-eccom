const userModel = require("../models/user_model");
const addressModel = require("../models/address_model");
const jwtProvider = require("../confiq/jwtprovider");
const bcrypt = require("bcrypt");

const userRegistraion = async (req, res) => {
    const { fname, lname, email, password, mobile, age, dob, about, role, gender, agreetc, address1, address2, city, state, zipcode } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(500).send({ message: "user already exist !! " })
        }
        const hashPassword = await bcrypt.hash(password, 8);

        const addressSave = await addressModel.create({ address1, address2, city, state, zipcode, mobile });

        const userSave = await userModel.create({ fname, lname, email, password: hashPassword, mobile, age, dob, about, photo: req.file.filename, role, gender, agreetc, address: addressSave._id });

        //add user of id in address model and update
        addressSave.userid = userSave._id;
        await addressSave.save();
        const jwt = jwtProvider.generateToken(userSave._id);
        return res.status(201).send({ message: "register success !!", jwt });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "invalid value  !.. :" })
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(401).send({ message: "invalid value  !.. :" })
        }
        //to send user data but without password 
        const { password: _, ...userDataWithoutPassword } = user.toObject();

        const jwt = jwtProvider.generateToken(user._id);
        if (user.role == 'buyer' || user.role == 'seller') {
            return res.status(201).send({ message: "login success !!", jwt, user: userDataWithoutPassword });
        }
        return res.status(401).send({ message: "invalid value... !!" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}
const getAlluser = async (req, res) => {
    try {
        const user = await userModel.find().select('-password').populate("address");
        return res.status(201).send({ message: " success !!", user });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const getUserProfile = async (req, res) => {
    try {
        const jwtToken = req.headers.authorization?.split(" ")[1];
        if (!jwtToken) {
            return res.status(404).send({ message: "token not found  !" })
        }
        const userId = jwtProvider.getUserIdFromToken(jwtToken);
        const user = await userModel.findById(userId).select('-password');
        if (!user) {
            return res.status(404).send({ message: "user not found !" })
        }
        return res.status(200).send({ message: " success !!", user });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const userUpdateProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const reqData = req.body;
        if (req.file) {
            reqData.photo = req.file.filename;
        }
        const user = await userModel.findByIdAndUpdate(userId, reqData, { new: true });
        return res.status(200).send({ message: "update success !!", user });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}
module.exports = { userRegistraion, userLogin, getAlluser, getUserProfile, userUpdateProfile }