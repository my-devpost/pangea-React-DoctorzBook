import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

import indexRoutes from "./routes/index.routes.mjs";
import { ValidationError } from "express-validation";

const app = express();

const port = process.env.PORT || 5000;

mongoose.connect(
  process.env.MONGO_URL,
  {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  (error) => {
    if (!error) {
      console.log("MongoDb Connection: ", process.env.MONGO_URL);
    } else {
	    console.error(error.message);
      console.log("database not working");
    }
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use("/api", indexRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// module.exports = app;
