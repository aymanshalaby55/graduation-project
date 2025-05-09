const router = require("express").Router();

const videoController = require("../controllers/videoConroller");
const { protect, verifyTokenAndAdmin } = require("../middleware/verifyToken");
const filesSizeValidation = require("../middleware/filesSizeValidation");

router.get("/streamVideo/:videoIds", videoController.streamVideos);

router.use(protect);
router.get("/getAllVideos", protect, videoController.getAllVideos);
router.get("/getUserVideos", protect, videoController.getUserVideos);
router.post("/uploadVideo", videoController.uploadVideo);
router.post("/addTag/:videoId", videoController.addVideoTag);
router.get("/getAllTags", videoController.getTags);
router.get("/deleteVideos", videoController.deleteVideos);

router.delete("/deleteVideo/:videoId", videoController.deleteVideo);
//router.get('/analyzeVideo/:videourl', videoController.analyzeVideo);
module.exports = router;
