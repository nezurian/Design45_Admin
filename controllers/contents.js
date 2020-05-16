const express = require("express");
const router = express.Router();
const Content = require("../models/content");
const ImageKit = require("imagekit");
const { documentValidation } = require("./validation");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const imagekit = new ImageKit({
  publicKey: process.env.PUBLICKEY,
  privateKey: process.env.PRIVATEKEY,
  urlEndpoint: process.env.URLENDPOINT,
});

const path = require("path");
const Datauri = require("datauri");
const dUri = new Datauri();

const dataUri = (req) =>
  dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

router.post("/upload/images", upload.single("image"), (req, res) => {
  const file = dataUri(req).content;
  imagekit
    .upload({
      file: file,
      fileName: req.file.originalname,
    })
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      res.json({ error: error, message: "Image Upload is failed!" });
    });
});

router.post("/upload/data", async (req, res) => {
  const { error } = await documentValidation.validate(req.body);
  if (error)
    return res
      .status(400)
      .send(`Validation Error: ${error.details[0].message}`);
  const content = new Content({
    images: req.body.images,
    title: req.body.title,
    text: req.body.text,
    type: req.body.type,
  });
  try {
    const savedContent = await content.save();
    res.send(savedContent);
  } catch (error) {
    res.json({ Error: error, message: "MongoDB Upload Failed!" });
  }
});

router.get("/", async (req, res) => {
  try {
    const content = await Content.find();
    res.json(content);
  } catch (error) {
    res.json({ Error: error, message: "Could Not Get Data from MongoDB" });
  }
});

// Delete Pictures
router.post("/delete/images", async (req, res) => {
  imagekit
    .bulkDeleteFiles(req.body)
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      res.send(error);
    });
});

// Add or Remove Images to MongoDB
router.put("/update/images/:ProjectID", async (req, res) => {
  try {
    const project = await Content.findOneAndUpdate(
      { _id: req.params.ProjectID },
      {
        $set: {
          images: req.body.images,
        },
      },
      { new: true }
    );
    res.send(project);
  } catch (error) {
    res.json({ error: error, message: "Could Not Update MongoDB" });
  }
});

// Add or Remove Data to MongoDB
router.put("/update/:ProjectID", async (req, res) => {
  const { error } = await documentValidation.validate(req.body);
  if (error)
    return res
      .status(400)
      .send(`Validation Error: ${error.details[0].message}`);
  try {
    const project = await Content.findOneAndUpdate(
      { _id: req.params.ProjectID },
      {
        $set: {
          title: req.body.title,
          text: req.body.text,
          type: req.body.type,
          images: req.body.images,
        },
      },
      { new: true }
    );
    res.send(project);
  } catch (error) {
    res.json({ error: error, message: "Could Not Update MongoDB" });
  }
});

// Delete Document
router.get("/delete/:DocID", async (req, res) => {
  try {
    const deletedDocument = await Content.findByIdAndDelete(req.params.DocID);
    res.json({
      message: "Document is deleted successfully from Mongo DB. ",
      document: deletedDocument,
    });
  } catch (error) {
    res.json({ message: "Error on Document Deletion: ", Error: error });
  }
});

module.exports = router;
