import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./db";
import userRoutes from "./routes/userRoutes";
import sessionRoutes from "./routes/sessionRoutes";
import interactionRoutes from "./routes/interactionRoutes";
import adminRoutes from "./routes/adminRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize
  .authenticate()
  .then(async () => {
    await sequelize.sync({ force: false });
  })
  .catch((err: unknown) => {
    console.error("Unable to connect to the database:", err);
  });

app.use("/", userRoutes);
app.use("/session", sessionRoutes);
app.use("/interaction", interactionRoutes);
app.use("/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
