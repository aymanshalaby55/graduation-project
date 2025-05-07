const Pipeline = require("../models/PipleModel");

async function getAllPipelines(req, res) {
  try {
    const pipelines = await Pipeline.find().populate("user");
    res.status(200).json({ pipelines });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getUserPipeline(req, res) {
  try {
    const { user } = req;
    const userId = user._id;
    const pipelines = await Pipeline.find({ user: userId }).populate("user");
    res.status(200).json({ pipelines });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function createPipeline(req, res) {
  try {
    const { user } = req;
    const userId = user._id;
    const pipeline = await Pipeline.create({ ...req.body, user: userId });
    res.status(201).json(pipeline);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getPipeline(req, res) {
  try {
    const pipeline = await Pipeline.findById(req.params.id);
    if (!pipeline) {
      res.status(404).json({ message: "Pipeline not found" });
    } else {
      res.status(200).json(pipeline);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function updatePipeline(req, res) {
  try {
    const pipeline = await Pipeline.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!pipeline) {
      res.status(404).json({ message: "Pipeline not found" });
    } else {
      res.status(200).json(pipeline);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function deletePipeline(req, res) {
  try {
    await Pipeline.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Pipeline deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const toggleFavorite = async (req, res) => {
  try {
    const userId = req.user._id;
    const pipeline = await Pipeline.findById(req.params.id);

    if (!pipeline) {
      return res.status(404).json({ message: "Pipeline not found" });
    }

    const alreadyStarred = pipeline.starredBy.includes(userId);

    if (alreadyStarred) {
      pipeline.starredBy.pull(userId);
    } else {
      pipeline.starredBy.push(userId);
    }

    await pipeline.save();

    res.status(200).json({ isFavorite: !alreadyStarred });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFavoritePipelines = async (req, res) => {
  try {
    const userId = req.user._id;

    const pipelines = await Pipeline.find({
      starredBy: userId,
    }).populate("user", "username");

    res.status(200).json({ pipelines });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllPipelines,
  getUserPipeline,
  createPipeline,
  getPipeline,
  updatePipeline,
  deletePipeline,
  toggleFavorite,
  getFavoritePipelines,
};
