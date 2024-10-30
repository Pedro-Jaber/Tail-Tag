const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: String,
    cpf: String,
    pets: [
      {
        petId: mongoose.Schema.Types.ObjectId,
      },
    ],
    phone_number: String,
  },
  { timestamps: true, collection: "users" }
);

module.exports = mongoose.model("User", UserSchema);
