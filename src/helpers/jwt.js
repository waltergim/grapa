const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return new Promise((resolve, reject) => {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_KEY,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};
module.exports = { generateToken };
