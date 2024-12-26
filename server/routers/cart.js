const exp = require('express');
const router = exp.Router();
const authenticate = require("../middleware/authenticate");
const { addTocart, getToCart, deleteCart } = require("../controller/cart_controller");

router.post("/add/", authenticate, addTocart);
router.get("/", authenticate, getToCart);
router.delete("/del/:id", authenticate, deleteCart);


module.exports = router;