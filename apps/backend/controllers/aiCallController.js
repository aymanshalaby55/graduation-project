/* eslint-disable */
const catchAsync = require("express-async-handler");
const aiProcessingQueue = require("../services/aiQueues");
const AiModel = require("../models/AiModel");

// Add videos to the queue
exports.addVideosToQueue = catchAsync(async (req, res, next) => {
  try {
    const { videos, modelsId } = req.body;
    if (!videos || !Array.isArray(videos) || videos.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Invalid video array provided",
      });
    }
    
    if (!modelsId || !Array.isArray(modelsId) || modelsId.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Invalid models array provided",
      });
    }
    // search model by id
    await Promise.all(modelsId.map(async (id) => {
      // model id
      const model = await AiModel.findById(id);
        // if not found.
      if (model) {
        await Promise.all(
          videos.map((video) =>
            aiProcessingQueue
              .add({ videoPath: video, model: model })
              .then((job) =>
                console.log(`Video added to queue: ${video}, jobId: ${job.id}`),
              ),
          ),
        );
      }
    }));

    res.json({
      status: "success",
      message: "Videos added to the queue",
    });
  } catch (error) {
    next(error);
  }
});
