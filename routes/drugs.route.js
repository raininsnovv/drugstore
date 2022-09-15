const { Router } = require("express");
const { drugsController } = require("../controllers/drugs.controller");

const router = Router();

router.post("/admin/drugs", drugsController.addDrug);
router.delete("/admin/drugs/:id", drugsController.deleteDrug);
router.patch("/admin/drugs/:id", drugsController.updateDrug);
router.get("/admin/drugs", drugsController.getAllDrugs);

router.get("/user/drugs", drugsController.getAllDrugs);
router.get(
  "/user/drugs/categories/:categoryId",
  drugsController.getByCategoryId
);

module.exports = router;
