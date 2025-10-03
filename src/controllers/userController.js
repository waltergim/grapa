const { validationResult } = require("express-validator");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const { generateToken } = require("../helpers/jwt");

const createUser = (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exist = User.findOne({ email });
    if (exist) {
      return res
        .status(400)
        .json({ message: "El email ya está en uso", ok: false });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), ok: false });
    }

    const bcryptedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: bcryptedPassword,
    });
    newUser.save();
    res.status(201).json({ message: "Usuario creado con éxito", ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el usuario", ok: false });
  }
};

const longInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Credenciales inválidas", ok: false });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Credenciales inválidas", ok: false });
    }

    const token = await generateToken(user);

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      ok: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión", ok: false });
  }
};

const renewToken = async (req, res) => {
  const id = req.id;
  const email = req.email;

  const token = await generateToken({ id, email });

  res.json({
    ok: true,

    token,
    message: "Token renovado",
  });
};
module.exports = {
  createUser,
  longInUser,
  renewToken,
};
