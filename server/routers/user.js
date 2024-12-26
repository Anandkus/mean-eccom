const exp = require('express');
const { userRegistraion, userLogin, getAlluser, getUserProfile, userUpdateProfile,  } = require("../controller/user_auth_controller");
const upload = require("../confiq/multer");
const authenticate = require('../middleware/authenticate');
const router = exp.Router();

router.get("/home", (req, res) => {
    res.send("this is signup page ")
})
router.post("/sign-up", upload.single("photo"), userRegistraion);
router.post("/sign-in", userLogin);
router.get("/profile", getUserProfile);
router.put("/profile/:id", authenticate, upload.single("photo"), userUpdateProfile);
router.get("", authenticate, getAlluser);

module.exports = router;