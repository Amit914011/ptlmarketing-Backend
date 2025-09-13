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
    tags: {
      type: [String],
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
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
