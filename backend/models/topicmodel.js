const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  topicName: {
    type: String,
    required: [true, "Please Enter Topic Name"],
  },
  topicQuestion: {
    type: String,
    required: [true, "Please Enter Topic Question"],
    maxLength: [30, "Question should be of 30 charcters only"],
  },
  topicDescription: {
    type: String,
    required: [true, "Please Enter Topic Description"],
    minLength: [30, "Question should be of more than 30 charcters"],
  },
  upVote: [
    {
      count: {
        type: Number,
        default: 0,
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      isUpVoted: {
        type: Boolean,
        default: false,
      }
    },
  ],
  downVote: [
    {
      count: {
        type: Number,
        default: 0,
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      isDownVoted: {
        type: Boolean,
        default: false,
      }
    },
  ],
  replies: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      name: {
        type: String,
      },
      comment: {
        type: String,
        required: true,
      },
      repliesupVote: [
        {
          count: {
            type: Number,
            default: 0,
          },
          user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
          },
          isUpVoted: {
            type: Boolean,
            default: false,
          }
        },
      ],
      repliesdownVote: [
        {
          count: {
            type: Number,
            default: 0,
          },
          user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
          },
          isUpVoted: {
            type: Boolean,
            default: false,
          }
        },
      ],
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Topic", topicSchema);
