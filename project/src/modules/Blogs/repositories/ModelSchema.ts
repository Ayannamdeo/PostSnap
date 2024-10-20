import mongoose from "mongoose";
import { IBlog } from "../entities";

const blogSchema: mongoose.Schema<IBlog> = new mongoose.Schema<IBlog>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    userName: { type: String, required: true },
    imageUrl: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true },
);

const blogModel = mongoose.model("blog", blogSchema);

export { blogModel };
