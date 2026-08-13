const mongoose = require("mongoose");
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
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },

  { timestamps: true },
);

// password hashing middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    // Hash the password before saving
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }
});

module.exports = userSchema;
