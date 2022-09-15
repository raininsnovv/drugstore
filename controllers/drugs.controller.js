const Drug = require("../models/Drug.model");

module.exports.drugsController = {
  addDrug: async (req, res) => {
    try {
      const { name, CategoryId, needRecipe, price } = req.body;
      const data = await Drug.create({
        name,
        CategoryId,
        needRecipe,
        price,
      });
      return res.json(data);
    } catch (e) {
      return res.json(e.message);
    }
  },
  deleteDrug: async (req, res) => {
    try {
      await Drug.findByIdAndRemove(req.params.id);
      return res.json("Drug deleted");
    } catch (e) {
      return res.json(e.message);
    }
  },
  updateDrug: async (req, res) => {
    try {
      const { name, CategoryId, needRecipe, price } = req.body;
      const data = await Drug.findByIdAndUpdate(req.params.id, {
        name,
        CategoryId,
        needRecipe,
        price,
      });
      return res.json(data);
    } catch (e) {
      return res.json(e.message);
    }
  },
  getAllDrugs: async (req, res) => {
    try {
      const data = Drug.find().populate("CategoryId");
      return res.json(data);
    } catch (e) {
      return res.json(e.message);
    }
  },
  getByCategoryId: async (req, res) => {
    try {
      const data = await Drug.find({
        _categoryId: req.params.categoryId,
      }).populate("_categoryId", "name");
      return res.json(data);
    } catch (e) {
      return res.json(e.message);
    }
  },
};
