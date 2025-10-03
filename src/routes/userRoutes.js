const express = require("express");
const {
  createUser,
  longInUser,
  renewToken,
} = require("../controllers/userController");
const { body } = require("express-validator");
const { validarJwt } = require("../Middleware/validarJwt");
const router = express.Router();

router.post(
  "/users",
  [
    body("username")
      .not()
      .isEmpty()
      .withMessage("El nombre de usuario es obligatorio"),
    body("email")
      .isEmail()
      .withMessage("El email no es válido")
      .not()
      .isEmpty()
      .withMessage("El email es obligatorio"),
    body("password")
      .isLength({ min: 6 })

      .withMessage("La contraseña debe tener al menos 6 caracteres"),
  ],
  createUser
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("El email no es válido")
      .not()
      .isEmpty()
      .withMessage("El email es obligatorio"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres"),
  ],
  longInUser
);

router.get("/renew", validarJwt, renewToken);
module.exports = router;
