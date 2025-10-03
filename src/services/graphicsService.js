const jwt = require("jsonwebtoken");
const Graphics = require("../models/graphicsModel");
const User = require("../models/userModel");

const graphitoken = (user) => {
  try {
    const token = jwt.sign({ id: user._id }, "kamsdjasjdsajjdsa", {
      expiresIn: "30d",
    });
    return token;
  } catch (error) {
    console.error("Error a generar token:", error);
    throw new Error("Error a generar token");
  }
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, "kamsdjasjdsajjdsa");
    return decoded;
  } catch (error) {
    console.error("Error a verificar token:", error);
    throw new Error("Error a verificar token");
  }
};

module.exports = { graphitoken, verifyToken };
