const express = require("express");
const Graphic = require("../models/graphicsModel");
const { validationResult } = require("express-validator");
const { verifyToken } = require("../services/graphicsService");

const { uploadToCloudinary } = require("../config/cloudinary");

const postGraphics = async (req, res) => {
  try {
    const { title, description, author } = req.body;

    console.log(req.files);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), ok: false });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "No se subieron imágenes", ok: false });
    }

    const uploadPromises = req.files.map((file) =>
      uploadToCloudinary(file.path)
    );
    const imageUrl = await Promise.all(uploadPromises);

    const newGraphic = new Graphic({
      title,
      description,
      author,
      image: imageUrl,
    });

    const exist = await Graphic.findOne({ title });
    console.log(exist);

    if (exist) {
      return res
        .status(400)
        .json({ message: "El titulo ya existe", ok: false });
    }

    await newGraphic.save();

    res.json({ message: "Grafica creada", ok: true, newGraphic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor", ok: false });
    console.log(req.body);
  }
};

const getGraphics = async (req, res) => {
  try {
    const getpost = await Graphic.find().sort({ createdAt: -1 });

    res.json({
      message: "Post recuperados",
      ok: true,
      getpost,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "No se pudieron recuperar los post", ok: false });
  }
};

const getGraphicById = async (req, res) => {
  try {
    const { id } = req.params;
    const getpost = await Graphic.findById(id);

    res.json({
      message: "Post recuperados",
      ok: true,
      getpost,
    });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ message: "No se pudieron recuperar los posts", ok: false });
  }
};

const putGraphics = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, author, image } = req.body;

    const validationResults = validationResult(req);
    if (!validationResults.isEmpty()) {
      return res.status(400).json({
        errors: validationResults.array(),
        ok: false,
        message: "Errores de validacion",
      });
    }

    const exist = await Graphic.findOne({ title });

    if (exist) {
      return res
        .status(400)
        .json({ message: "El titulo ya existe", ok: false });
    }

    const updateGraphic = await Graphic.findByIdAndUpdate(
      id,
      { title, description, author, image },
      { new: true }
    );
    res.json({ message: "Grafica actualizada", ok: true, updateGraphic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor", ok: false });
  }
};

const deleteGraphics = async (req, res) => {
  try {
    const { id } = req.params;
    await Graphic.findByIdAndDelete(id);
    res.json({ message: "Grafica eliminada", ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor", ok: false });
  }
};

module.exports = {
  getGraphics,
  postGraphics,
  putGraphics,
  deleteGraphics,
  getGraphicById,
};
