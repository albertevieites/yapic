const { Schema, model } = require("mongoose");
const { POST_TAGS } = require("../constants");

const postSchema = new Schema(
  {
    postPhotoUrl: {
      type: String,
      default: "https://easterntradelinks.com/front/images/default.png",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Post must have an owner"],
    },
    title: {
      type: String,
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters long"],
      maxlength: [300, "Description cannot exceed 300 characters"],
    },
    tags: {
      type: [String],
      required: false,
      enum: POST_TAGS,
      validate: {
        validator: function (tags) {
          return tags.length <= 5;
        },
        message: "A post cannot have more than 5 tags",
      },
    },
    date: {
      type: Date,
      default: () => Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better performance
postSchema.index({ owner: 1 });
postSchema.index({ tags: 1 });
postSchema.index({ date: -1 }); // -1 for descending order (newest first)

const Post = model("Post", postSchema);

module.exports = Post;
