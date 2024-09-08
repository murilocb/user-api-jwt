import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import swapiRoutes from "./routes/swapiRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { envs } from "./envs"

const app = express();
const PORT = envs.APP || 3000;

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/users", userRoutes);
app.use("/swapi", swapiRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
