import mongoose, { Schema } from "mongoose";
import moment from "moment";

const userSchema = new Schema({
  identification: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  id_doctor: { type: String },
  id_hospital: { type: String },
  phone: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  data_birth: { type: String },
  createdAt: { type: String, default: moment().format('YYYY-MM-DD HH:mm:ss') },
  medical_provided: { type: String },
  first_login: { type: Boolean, default: false },
  rol: { type: String, required: true, enum: ['Hospital', 'Doctor', 'Patient'] }
});


export default mongoose.model('Users', userSchema);