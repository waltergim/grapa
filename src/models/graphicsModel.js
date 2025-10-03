const mongoose = require("mongoose");
const { Schema } = mongoose;

const graphicsSchema = new Schema({
  title: String,
  description: String,
  url: String,
  author: String,
  image: [String],
  Date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Graphic", graphicsSchema);
