const Category = require("../models/Category.model");

module.exports.categoriesController = {
  addCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const data = await Category.create({
        name,
      });
      return res.json(data);
    } catch (e) {
      return res.json(e.message);
    }
  },
  deleteCategory: async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      return res.json("Category deleted");
    } catch (e) {
      return res.json(e.message);
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const data = await Category.findByIdAndUpdate(req.params.id, {
        name,
      });
      return res.json(data);
    } catch (e) {
      return res.json(e.message);
    }
  },
  getAllCategories: async (req, res) => {
    try {
      const data = await Category.find({});
      return res.json(data);
    } catch (e) {
      return res.json(e.message);
    }
  },
};
