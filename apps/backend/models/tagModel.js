const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  tagName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TagModel = mongoose.model("Tag", TagSchema);

module.exports = TagModel;
