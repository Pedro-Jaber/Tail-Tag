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
      validate: {
        validator: function (v) {
          // This regex ensures the password has:
          // - At least one lowercase letter
          // - At least one uppercase letter
          // - At least one digit
          // - At least one special character from @$!%*?&
          // - Minimum length of 6 characters
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
            v
          );
        },
        message:
          "Password must have at least 6 characters, one lowercase letter, one uppercase letter, one number, and one special character",
      },
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

//TODO hash password with bcrypt

module.exports = mongoose.model("User", UserSchema);
