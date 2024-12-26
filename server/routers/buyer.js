const exp = require('express');
const authenticate = require('../middleware/authenticate');
const { getAllProduct, getUserAndAddress, getSingleProduct } = require('../controller/buyer_controller');
const router = exp.Router();

router.get("/add", authenticate, getUserAndAddress);
router.get("", authenticate, getAllProduct);
router.get("/:id", authenticate, getSingleProduct)



module.exports = router;