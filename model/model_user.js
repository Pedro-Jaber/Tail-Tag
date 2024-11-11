const mongoose = require("mongoose");
const { Schema } = mongoose;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const saltRounds = 10;

//TODO add user roles list
//admin, normal user

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    lastname: {
      type: String,
      required: [true, "Please enter your last name"],
    },
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

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(saltRounds);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await this.comparePassword(password, user.password);
    if (auth) {
      return user;
    }
  }
  throw Error("incorrect credentials");
};

UserSchema.statics.comparePassword = async function (password, hash) {
  return await bcrypt.compare(password, hash);
  //return password === hash;
};

module.exports = mongoose.model("User", UserSchema);
