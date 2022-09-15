const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  cart: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Drug" }],
  money: { type: Number, default: 0 },
  recipe: { type: Boolean, require: true },
  total: { type: Number, default: 0 },
});
const User = mongoose.model("User", userSchema);

module.exports = User
