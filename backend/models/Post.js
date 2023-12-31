import mongoose from "mongoose";
const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lasttName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    // will try to update comments to show picture and name
    Comments: {
      type: Array,
      default: [],
    },
  },
  { timeStamp: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
