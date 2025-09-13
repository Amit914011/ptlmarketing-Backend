import ContactUs from "../models/contactusModel.js";

const createContactUs = async (req, res) => {
  try {
    const body = req.body;

    // Model ke upar .create() call karna hoga
    const data = await ContactUs.create(body);

    return res
      .status(201)
      .json({
        success: true,
        message: "Contact Us Form has been Submitted Thank you!",
        data: data
      });
  } catch (error) {
    console.error("Error creating contact:", error.message);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to submit form",
        error: error.message
      });
  }
};



const getAllContactusData = async (req, res) => {
  try {
    const data = await ContactUs.find({});
    return res
      .status(200)
      .json({ success: true, data: data });
  } catch (error) {
    console.error("Error fetching contact data:", error.message);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch contact data",
        error: error.message,
      });
  }
};


export { createContactUs, getAllContactusData};
