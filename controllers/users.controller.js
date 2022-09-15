const User = require("../models/User.model");
const Drug = require("../models/Drug.model");

module.exports.usersController = {
  addUser: async (req, res) => {
    const { name, money, recipe, cart, total } = req.body;
    try {
      const data = await User.create({ name, money, recipe, cart, total });
      return res.json(data);
    } catch (e) {
      return res.json(e.message);
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndRemove(req.params.id);
      return res.json("User deleted");
    } catch (e) {
      return res.json(e.message);
    }
  },
  updateUser: async (req, res) => {
    try {
      const { name, money, recipe, cart, total } = req.body;
      const data = await User.findByIdAndUpdate(req.params.id, {
        name,
        money,
        recipe,
        cart,
        total,
      });
      return res.json(data);
    } catch (e) {
      return res.json(e.message);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const data = User.find({});
      return res.json(data);
    } catch (e) {
      return res.json(e.message);
    }
  },
  addMoney: async (req, res) => {
    const user = await User.findById(req.params.userid);
    try {
      await User.findByIdAndUpdate(req.params.userid, {
        money: user.money + req.body.money,
      });
      res.json("Кошелек пополнен на " + req.body.money);
    } catch (e) {
      res.json(e.message);
    }
  },
  addDrugToCart: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const drug = await Drug.findById(req.params.drugId);
      if (drug.needRecipe === true && user.recipe === false) {
        return res.json("WHERE IS YOUR RECIPE?");
      } else if (user.cart.includes(req.params.drugId)) {
        return res.json("Drug already added");
      } else {
        const currentTotal = Number(user.total) + Number(drug.price);
        await user.updateOne({
          $push: { cart: req.params.drugId },
          total: currentTotal,
        });
        const pay = await User.findById(req.params.userId);
        return res.json("Added,give me your money:", pay.total);
      }
    } catch (e) {
      return res.json(e.message);
    }
  },
  deleteFromCart: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const drug = await Drug.findById(req.params.drugId);
      if (!user.cart.includes(req.params.drugId)) {
        return res.json("Nothing to delete");
      } else {
        const currentTotal = Number(user.total) - Number(drug.price);
        await user.updateOne({
          $pull: { cart: req.params.drugId },
          total: currentTotal,
        });
        const pay = await User.findById(req.params.userId);
        return res.json("Drug deleted. Total:", pay.total);
      }
    } catch (e) {
      return res.json(e.message);
    }
  },
  buyDrugs: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (Number(user.money) < Number(user.money)) {
        const needMore = Number(user.total) - Number(user.money);
        return res.json("Please,add money:", needMore);
      } else {
        const currMoney = Number(user.money) - Number(user.total);
        await User.findByIdAndUpdate(req.params.userId, {
          cart: [],
          total: 0,
          money: currMoney,
        });
        const myMoney = await User.findById(req.params.userId);
        return res.json("Thanks, bruda, its your money:", myMoney.money);
      }
    } catch (e) {
      return res.json(e.message);
    }
  },
};
