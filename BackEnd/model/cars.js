import mongoose from "mongoose";

const { Schema } = mongoose;

const carSchema = new Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  registrationNo: {
    type: String,
    required: true,
    unique: true,
  },
});

const Car = mongoose.model("car", carSchema);

export default Car;
