import mongoose from "mongoose";
import validator from "validator";

const contactusScheme = new mongoose.Schema({
  name: String,
  number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Please Enter your Valid Email"],
  },
  service: String,
  companyName: String,
  budget: Number,
  subject: String,
  message: String,
});

const ContactUs = mongoose.model("ContactUs", contactusScheme);
export default ContactUs;
