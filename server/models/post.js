import mongoose from "mongoose";
import moment from "moment";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
    index: true,
  },
  contents: {
    type: String,
    require: true,
  },
  views: {
    type: Number,
    default: -2,
  },
  fileUrl: {
    type: String,
    default: "https://source.unsplash.com/random/301x201",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  date: {
    type: String,
    default: moment().format("YYYY-MM-DD hh:mm:ss"),
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const Post = mongoose.model("post", postSchema);
export default Post;
