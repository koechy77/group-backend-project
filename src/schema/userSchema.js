const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 20,
      select: false, // Exclude password from query results by default
    },
    passwordConfirm: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords are not the same!",
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },

  { timestamps: true },
);

// password hashing mongoDB middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  } else {
    // Hash the password before saving
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordConfirm = undefined; // Remove passwordConfirm field before saving
  }
});

userSchema.methods.correctPassword = function (
  candidatePassword,
  storedPassword,
) {
  return bcrypt.compare(candidatePassword, storedPassword);
};

module.exports = userSchema;
