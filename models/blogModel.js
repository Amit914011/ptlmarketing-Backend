import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true, // URL friendly unique identifier
    },
    author: {
      type: String,
      required: true,
      default: "Admin",
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "General",
    },

    featuredImage: {
      type: String, // URL of image
    },
    published: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
