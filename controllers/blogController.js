import slugify from "slugify";
import Blog from "../models/blogModel.js";

//  Create a new blog
const createBlog = async (req, res) => {
  try {
    const body = req.body;

    // Slug generate karo
    body.slug = slugify(body.title, { lower: true, strict: true });

    // Duplicate slug check
    const existingSlug = await Blog.findOne({ slug: body.slug });
    if (existingSlug) {
      return res.status(400).json({
        success: false,
        message: "Slug already exists. Use a unique slug.",
      });
    }

    // Image handle karo
    body.featuredImage = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : "https://via.placeholder.com/800x400.png?text=Blog+Image";

    // Blog create
    const blog = await Blog.create(body);

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
      console.error("Error creating blog:", error.message);
       if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
        console.log("⚠️ Uploaded file deleted due to error");
      } catch (unlinkErr) {
        console.error("Error deleting file:", unlinkErr.message);
      }
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export { createBlog };
