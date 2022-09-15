const { Router } = require("express");
const { usersController } = require("../controllers/users.controller");

const router = Router();

router.post("/admin/users", usersController.addUser);
router.delete("/admin/users/:id", usersController.deleteUser);
router.patch("/admin/users/:id", usersController.updateUser);
router.get("/admin/users", usersController.getAllUsers);

router.patch("/users/money/:userid", usersController.addMoney);
router.patch(
  "/users/:userId/drugs/:drugId/cart/add",
  usersController.addDrugToCart
);
router.patch(
  "/users/:userId/drugs/:drugId/cart/delete",
  usersController.deleteFromCart
);
router.patch("/users/:userId/cart/buy", usersController.buyDrugs);

module.exports = router;
