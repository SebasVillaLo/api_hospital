import mongoose, { Schema } from "mongoose";
import moment from "moment";

const medicalReportSchema = new Schema({
  id_patient: { type: Schema.Types.ObjectId, required: true },
  id_doctor: { type: Schema.Types.ObjectId, required: true },
  id_hospital: { type: Schema.Types.ObjectId, required: true },
  specialization: { type: String, required: true },
  date: { type: String, default: moment().format('YYYY-MM-DD HH:mm:ss') },
  description: { type: String , required: true}
});

export default mongoose.model('medicalreports', medicalReportSchema);