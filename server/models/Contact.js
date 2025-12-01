// server/models/Contact.js
import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema(
  {
    firstname:     { type: String, required: true },
    lastname:      { type: String, required: true },
    contactNumber: { type: String },
    email:         { type: String, required: true },
    message:       { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Contact', ContactSchema);
