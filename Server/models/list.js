const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
    },
    category: {
      type: String,
      enum: ["In Progress", "Completed", "Other"],
      default: "Other",
    },
    user: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("List", listSchema);
