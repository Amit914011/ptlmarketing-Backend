import ContactUs from "../models/contactusModel.js";
import { sendEmailToAdmin, sendEmailToClient } from "../utils/sendEmail.js";

const createContactUs = async (req, res) => {
  try {
    const body = req.body;
    const data = await ContactUs.create(body);
    //  // Send emails
    // await sendEmailToAdmin(data);
    // await sendEmailToClient(data);
    
    return res.status(201).json({
      success: true,
      message: "Your request has been submitted successfully!",
      data: data,
    });
  } catch (error) {
    console.error("Error creating contact:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to submit form",
      error: error.message,
    });
  }
};

const getAllContactusData = async (req, res) => {
  try {
    const data = await ContactUs.find({});
    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error("Error fetching contact data:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch contact data",
      error: error.message,
    });
  }
};

const getConatctusDataById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await ContactUs.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Data not found!" });
    }

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching contact by ID:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteContactusDataById=async(req,res)=>{
  try {
    const id = req.params.id
    const user=await ContactUs.findByIdAndDelete(id)
    if(!user){
      return res.status(404).json({success:false,message:"Data not found"})
    }
    return res.status(200).json({success:true,message:"Data deleted Successfully"})
  } catch (error) {
      console.error("Error deleting contact by ID:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

export { createContactUs, getAllContactusData, getConatctusDataById,deleteContactusDataById };
