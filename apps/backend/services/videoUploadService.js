const multer = require("multer");
const fs = require("fs");
const util = require("util");
const path = require("path");
const Queue = require("bull");
const Video = require("../models/videoModel");
const User = require("../models/userModel");
const TagModel = require("../models/tagModel");

// Constants
const MAX_FILE_SIZE = 1000 * 1024 * 1024; // 100MB
const ALLOWED_VIDEO_TYPES = /mp4|mkv|mov|avi/;
const VIDEO_STORAGE_PATH = "./public/AllVideos";

// Create video upload queue
const videoUploadQueue = new Queue("video-uploads", {
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379,
  },
});

// Promisify fs functions
const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);
const access = util.promisify(fs.access);

// Configure Multer storage
const storage = multer.memoryStorage();

// File type and size validator
const fileFilter = (req, file, cb) => {
  const isValidExtension = ALLOWED_VIDEO_TYPES.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const isValidMimeType = ALLOWED_VIDEO_TYPES.test(file.mimetype);

  if (isValidExtension && isValidMimeType) {
    return cb(null, true);
  }
  cb(new Error("Invalid file type. Only video files are allowed."));
};

// Multer upload configuration
const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
}).array("videoPath", 10);

// Process video upload jobs
videoUploadQueue.process(async (job) => {
  const { userId, file, storageLimit, title, tags: tagName } = job.data;

  try {
    // Ensure storage directory exists
    console.log(title);
    try {
      await access(VIDEO_STORAGE_PATH);
    } catch (err) {
      if (err.code === "ENOENT") {
        await mkdir(VIDEO_STORAGE_PATH, { recursive: true });
      } else {
        throw err;
      }
    }
    // Generate unique filename
    const timestamp = Date.now();
    const filename = `videoPath-${timestamp}.mp4`;
    const filepath = path.join(VIDEO_STORAGE_PATH, filename);
    // Save file to disk
    await writeFile(filepath, Buffer.from(file.buffer));

    // Create video document
    const video = await Video.create({
      title: title || file.originalname, // Use provided title or fallback to original filename
      originalName: file.originalname,
      videoPath: filename,
      videoSize: file.size,
      user: userId,
    });

    // Check if tags were provided in the job data
    if (tagName && tagName.length > 0) {
      const tagIds = [];

      // Process each tag
      {
        // Find existing tag or create a new one
        console.log(tagName);
        let tag = await TagModel.findOne({ tagName });

        if (!tag) {
          // Create new tag if it doesn't exist
          tag = await TagModel.create({
            tagName: tagName.trim().toLowerCase(),
          });
        }

        tagIds.push(tag._id);
      }

      // Update the video with the tags
      if (tagIds.length > 0) {
        await Video.findByIdAndUpdate(video._id, {
          $addToSet: { tags: { $each: tagIds } },
        });
      }
    }
    // Update user storage limit
    await User.findByIdAndUpdate(userId, {
      $inc: { storageLimit: -file.size },
      $push: { videos: video._id },
    });

    return {
      status: "success",
      video,
    };
  } catch (error) {
    console.error("Error in video upload job:", error);
    throw error;
  }
});

// Handle completed jobs
videoUploadQueue.on("completed", (job, result) => {
  console.log(`Job ${job.id} completed with result:`, result);
});

// Handle failed jobs
videoUploadQueue.on("failed", (job, error) => {
  console.error(`Job ${job.id} failed:`, error);
});

// Export the upload middleware and queue
module.exports = {
  uploadMiddleware: upload,
  videoUploadQueue,
};
