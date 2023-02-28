const Topic = require("../models/topicmodel");
const ErrorHandler = require("../middleware/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../middleware/apifeatures");

// Create a Topic

exports.postTopic = catchAsyncErrors(async (req, res, next) => {
  const { topicName, topicQuestion, topicDescription } = req.body;
  const user = req.user._id;
  const topic = await Topic.create({
    topicName,
    topicQuestion,
    topicDescription,
    user,
  });

  res.status(201).json({
    success: true,
    topic,
  });
});

//  Get All Products

exports.getAllTopics = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const topicsCount = await Topic.countDocuments();

  const apiFeature = new ApiFeatures(Topic.find(), req.query).search();
  let topics = await apiFeature.query;
  let filteredTopicsCount = topics.length;
  apiFeature.pagination(resultPerPage);
  topics = await apiFeature.query.clone();

  res.status(200).json({
    sucess: true,
    topics,
    topicsCount,
    resultPerPage,
    filteredTopicsCount,
  });
});

// Get Topic Details

exports.getTopicDetails = catchAsyncErrors(async (req, res, next) => {
  const topic = await Topic.findById(req.params.id);

  if (!topic) {
    return next(new ErrorHandler("product not found", 404));
  }

  res.status(200).json({
    sccess: true,
    topic,
  });
});

// Create New Reply or update the Reply

exports.createTopicReply = catchAsyncErrors(async (req, res, next) => {
  const { comment, topicId } = req.body;

  const reply = {
    user: req.user._id,
    name: req.user.name,
    comment,
  };

  const topic = await Topic.findById(topicId);

  const isReplied = topic.replies.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReplied) {
    topic.replies.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.comment = comment;
      }
    });
  } else {
    topic.replies.push(reply);
  }

  await topic.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

exports.topicUpVote = catchAsyncErrors(async (req, res, next) => {
  const { topicId } = req.body;

  const vote = {
    user: req.user._id,
    count: 1,
    isUpVoted: true,
  };

  const topic = await Topic.findById(topicId);

  const isupVoted = topic.upVote.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isupVoted) {
    topic.upVote.forEach((rev, index) => {
      if (rev.user.toString() === req.user._id.toString()) {
        topic.upVote.splice(index, 1);
      }
    });
  } else {
    const isdownVoted = topic.downVote.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
    if(isdownVoted) {
      topic.downVote.forEach((rev, index) => {
        if (rev.user.toString() === req.user._id.toString()) {
          topic.downVote.splice(index, 1);
        }
      });
    }
    topic.upVote.push(vote);
  }

  await topic.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

exports.topicDownVote = catchAsyncErrors(async (req, res, next) => {
  const { topicId } = req.body;

  const vote = {
    user: req.user._id,
    count: 1,
    isDownVoted: true,
  };

  const topic = await Topic.findById(topicId);

  const isdownVoted = topic.downVote.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isdownVoted) {
    topic.downVote.forEach((rev, index) => {
      if (rev.user.toString() === req.user._id.toString()) {
        topic.downVote.splice(index, 1);
      }
    });
  } else {
    const isupVoted = topic.upVote.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
    if(isupVoted) {
      topic.upVote.forEach((rev, index) => {
        if (rev.user.toString() === req.user._id.toString()) {
          topic.upVote.splice(index, 1);
        }
      });
    }
    topic.downVote.push(vote);
  }

  await topic.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

exports.topicReplyUpVote = catchAsyncErrors(async (req, res, next) => {
  const { topicId, repliesId } = req.body;

  const replyVote = {
    user: req.user._id,
    count: 1,
    isUpVoted: true,
  };

  const topic = await Topic.findById(topicId);

  const reply = topic.replies.find((rev) => rev._id.toString() === repliesId.toString());

  const isReplyupVoted = reply.repliesupVote.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReplyupVoted) {
    reply.repliesupVote.forEach((rev, index) => {
      if (rev.user.toString() === req.user._id.toString()) {
        reply.repliesupVote.splice(index, 1);
      }
    });
  } else {
    const isReplydownVoted = reply.repliesdownVote.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
    if(isReplydownVoted) {
      reply.repliesdownVote.forEach((rev, index) => {
        if (rev.user.toString() === req.user._id.toString()) {
          reply.repliesdownVote.splice(index, 1);
        }
      });
    }
    reply.repliesupVote.push(replyVote);
  }

  await topic.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

exports.topicReplyDownVote = catchAsyncErrors(async (req, res, next) => {
  const { topicId, repliesId } = req.body;

  const replyvote = {
    user: req.user._id,
    count: 1,
    isDownVoted: true,
  };

  const topic = await Topic.findById(topicId);

  const reply = topic.replies.find((rev) => rev._id.toString() === repliesId.toString());

  const isReplydownVoted = reply.repliesdownVote.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReplydownVoted) {
    reply.repliesdownVote.forEach((rev, index) => {
      if (rev.user.toString() === req.user._id.toString()) {
        reply.downVote.splice(index, 1);
      }
    });
  } else {
    const isReplyupVoted = reply.repliesupVote.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
    if(isReplyupVoted) {
      reply.repliesupVote.forEach((rev, index) => {
        if (rev.user.toString() === req.user._id.toString()) {
          reply.repliesupVote.splice(index, 1);
        }
      });
    }
    reply.repliesdownVote.push(replyvote);
  }

  await topic.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
