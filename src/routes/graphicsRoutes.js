const express = require("express");
const { body } = require("express-validator");
const {
  getGraphics,
  postGraphics,
  getGraphicById,
  putGraphics,
  deleteGraphics,
} = require("../controllers/graphicsController");

const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/graphics",
  upload.single("image"),

  [
    body("title").not().isEmpty().withMessage("El titulo es obligatorio"),
    body("description")
      .not()
      .isEmpty()
      .withMessage("La descripcion es obligatoria"),
    body("author").not().isEmpty().withMessage("El autor es obligatorio"),
  ],

  postGraphics
);

router.get("/graphics", getGraphics);

router.get("/graphics/:id", getGraphicById);

router.put(
  "/graphics/:id",

  [
    body("title").not().isEmpty().withMessage("El titulo es obligatorio"),
    body("description")
      .not()
      .isEmpty()
      .withMessage("La descripcion es obligatoria"),
    body("author").not().isEmpty().withMessage("El autor es obligatorio"),
  ],

  putGraphics
);
router.delete("/graphics/:id", deleteGraphics);
module.exports = router;
