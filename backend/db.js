const mongoose = require("mongoose");

const connectToMongo = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rohitraj250310:juQmWBDv3GnAMA7E@cluster0.qxjouj1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
      }
    );
    console.log("connected to mongoDB");
  } catch (error) {
    console.log("error connection to MongoDB:", error.message);
  }
};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,

    minlength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,

    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,

    maxlength: 50,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },

  balence: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
