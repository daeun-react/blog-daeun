import mongoose from "mongoose";
import moment from "moment";

const commentSchema = mongoose.Schema({
  contents: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: moment().format("YYYY-MM-DD hh:mm:ss"),
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  creatorName: { type: String },
});

const Comment = mongoose.model("comment", commentSchema);
export default Comment;
