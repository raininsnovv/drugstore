const { Router } = require("express");
const {
  categoriesController,
} = require("../controllers/categories.controller");

const router = Router();

router.post("/admin/categories", categoriesController.addCategory);
router.delete("/admin/categories/:id", categoriesController.deleteCategory);
router.patch("/admin/categories/:id", categoriesController.updateCategory);
router.get("/admin/categories", categoriesController.getAllCategories);

module.exports = router;
