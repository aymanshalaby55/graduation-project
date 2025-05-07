const mongoose = require("mongoose");

const pipelineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "pipeline must have a username"],
    },
    flowData: {
      type: String,
      required: [true, "schem is required"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    starCount: { type: Number, default: 0 },
    isPublic: {
      type: Boolean,
      default: false,
    },
    starredBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

const Pipeline = mongoose.model("Pipeline", pipelineSchema);

module.exports = Pipeline;
