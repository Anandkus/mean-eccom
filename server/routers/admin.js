const exp = require('express');
const { adminLogin, getSingelUser, deleteUser, userUpdateByAdmin } = require('../controller/admin_controller');
const authenticate = require('../middleware/authenticate');
const upload = require("../confiq/multer");
const router = exp.Router();



router.post("/login", adminLogin);
router.get("/:id", authenticate, getSingelUser);
router.post("/delete", authenticate, deleteUser);
router.put("/edit/:id", authenticate,upload.single("photo"), userUpdateByAdmin)


module.exports = router;