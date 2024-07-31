import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/users.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB muvaffaqiyatli ulandi"))
  .catch((error) => console.error("MongoDB ulanmagani haqida xato", error));

app.get("/", (req, res) => {
  res.json("Server ishlamoqda");
});

app.use("/users", UserRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`${PORT} porti tinglanmoqda`));
