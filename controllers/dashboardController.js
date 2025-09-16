import Blog from "../models/blogModel.js";
import ContactUs from "../models/contactusModel.js";
import User from "../models/userModels.js";

const getTotalData = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBlogs = await Blog.countDocuments();
    const totalContacts = await ContactUs.countDocuments();
    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalBlogs,
        totalContacts,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export { getTotalData };
