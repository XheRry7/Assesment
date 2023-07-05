import express from "express";
import "dotenv/config";
import { connectDB } from "./config/database.js";
import router from "./routes/index.js";
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;
connectDB();

app.use("/api", router);
app.listen(port, () => console.log(`Server running on port :  ${port}`));
