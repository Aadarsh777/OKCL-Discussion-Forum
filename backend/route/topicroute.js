const express = require("express");
const {
  postTopic,
  getAllTopics,
  getTopicDetails,
  createTopicReply,
  topicUpVote,
  topicDownVote,
  topicReplyUpVote,
  topicReplyDownVote,
} = require("../controller/topiccontroller");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/topics").get(getAllTopics);
router.route("/post/topic").post(isAuthenticatedUser, postTopic);
router.route("/topic/:id").get(getTopicDetails);
router.route("/reply").put(isAuthenticatedUser, createTopicReply);
router.route("/upvote").put(isAuthenticatedUser, topicUpVote);
router.route("/downvote").put(isAuthenticatedUser, topicDownVote);
router.route("/reply/upvote").put(isAuthenticatedUser, topicReplyUpVote);
router.route("/reply/downvote").put(isAuthenticatedUser, topicReplyDownVote);

module.exports = router;
