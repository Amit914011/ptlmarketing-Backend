import slugify from "slugify";
import Blog from "../models/blogModel.js";

//  Create a new blog
const createBlog = async (req, res) => {
  try {
    const body= req.body;
     body.slug = slugify(body.title, { lower: true, strict: true });
    const existingSlug = await Blog.findOne({ slug:body.slug });
    if (existingSlug) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Slug already exists. Use a unique slug.",
        });
    }

    const blog = await Blog.create(body);

    return res
      .status(201)
      .json({
        success: true,
        message: "Blog created successfully",
        data: blog,
      });
  } catch (error) {
    console.error("Error creating blog:", error.message);
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};



export {createBlog}