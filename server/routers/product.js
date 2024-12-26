const exp = require("express");
const router = exp.Router();
const { addNewProduct, allProudct, updateProduct, deleteProduct, singleProduct, getAllProductByAdmin, deleteProudctByAdmin } = require("../controller/product_controller");
const authenticate = require("../middleware/authenticate");

router.post("/add", authenticate, addNewProduct);
router.get("/all", authenticate, allProudct);
router.get("/admin", authenticate, getAllProductByAdmin)
router.get("/:id", authenticate, singleProduct)
router.put("/edit/:id", authenticate, updateProduct);
router.delete("/del/:id", authenticate, deleteProduct);
router.delete("/admin/del/:id", authenticate, deleteProudctByAdmin)

module.exports = router;