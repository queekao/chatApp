const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
    },
    users: Array,
    sender: {
      //to know which user send
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {timestamps: true} // timestamps will create 2 property to database(createdAt, updatedAt)
);
module.exports = mongoose.model("Messages", messageSchema);
