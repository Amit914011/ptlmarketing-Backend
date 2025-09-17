import slugify from "slugify";
import Blog from "../models/blogModel.js";
import fs from "fs";
import path from "path";

//  Create a new blog
const createBlog = async (req, res) => {
  try {
    const body = req.body;

    // Slug generate karo
    let baseSlug = slugify(body.title, { lower: true, strict: true });
    let slug = baseSlug;

    // Duplicate slug check with increment logic
    let counter = 1;
    while (await Blog.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    body.slug = slug;
    // Image handle karo
    body.featuredImage = req.file
      ? `${process.env.BASE_URL}uploads/${req.file.filename}`
      : "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg";

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
        // console.log("⚠️ Uploaded file deleted due to error");
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

// Get All Blogs

const getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 12, search = "" } = req.query;

    const query = search ? { title: { $regex: search, $options: "i" } } : {};

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Blog.countDocuments(query);

    res.status(200).json({
      success: true,
      data: blogs,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    if (body.title) {
      body.slug = slugify(body.title, { lower: true, strict: true });
    }

    if (req.file) {
      body.featuredImage = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }

    const blog = await Blog.findByIdAndUpdate(id, body, { new: true });

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        data: blog,
        message: "Blog Updated Successfully",
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    // Local image delete karo (agar default placeholder nahi hai)
    if (blog.featuredImage && blog.featuredImage.includes("/uploads/")) {
      // filename extract karo
      const filename = blog.featuredImage.split("/uploads/")[1];
      // correct absolute path
      const filePath = path.join(process.cwd(), "uploads", filename);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        // console.log("🗑 Image deleted:", filePath);
      } else {
        // console.log("⚠️ Image file not found:", filePath);
      }
    }
    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { createBlog, getBlogs, getBlogBySlug, updateBlog, deleteBlog };
