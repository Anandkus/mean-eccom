const exp = require("express");
const router = exp.Router();
const authenticate = require("../middleware/authenticate");
const { placeOrder, myOrder, sellerOrders, updateOrder, deleteOrder, AllOrderGetByAdmin } = require("../controller/order_controller");

router.post("/place", authenticate, placeOrder);
router.get("/my-order", authenticate, myOrder);
router.get("/get", authenticate, sellerOrders);
router.put("/:id", authenticate, updateOrder);
router.delete("/delete/:id", authenticate, deleteOrder);
router.get("/admin", authenticate, AllOrderGetByAdmin);

module.exports = router;