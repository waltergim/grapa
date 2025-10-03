const express = require("express");
const connectDB = require("./src/config/Db.js"); // Adjust the path as necessary
const graphicsRoutes = require("./src/routes/graphicsRoutes");
const userRoutes = require("./src/routes/userRoutes");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors());

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/uploads", express.static("uploads"));

app.use("/api", graphicsRoutes);
app.use("/api", userRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`La aplicacion esta corriendo en el puerto :  ${port}`);
});
