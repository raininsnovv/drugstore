const mongoose = require("mongoose");
const drugSchema = mongoose.Schema({
  name: { type: String, required: true },
  categoryId: { type: mongoose.SchemaTypes.ObjectId, required: true },
  needRecipe: { type: Boolean, required: true },
  price: { type: Number, required: true },
});

const Drug = mongoose.model("Drug", drugSchema);
module.exports = Drug;
