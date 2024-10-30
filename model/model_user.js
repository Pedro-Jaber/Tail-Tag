const mongoose = require("mongoose");
const { isEmail } = require("validator");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Minimum password length is 6 characters"],
    },
    name: String,
    cpf: String,
    address: {
      street: String,
      number: String,
      city: String,
      state: String,
      country: String,
      zip_code: String,
    },
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
// List possible informations to be stored in user
