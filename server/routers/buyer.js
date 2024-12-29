const exp = require('express');
const authenticate = require('../middleware/authenticate');
const { getAllProduct, getUserAndAddress, getSingleProduct, addNewAddress, deleteAddress } = require('../controller/buyer_controller');
const router = exp.Router();

router.get("/add", authenticate, getUserAndAddress);
router.get("", authenticate, getAllProduct);
router.get("/:id", authenticate, getSingleProduct);
router.post("/address/create/", authenticate, addNewAddress);
router.delete("/address/delete/:id", authenticate, deleteAddress)



module.exports = router;