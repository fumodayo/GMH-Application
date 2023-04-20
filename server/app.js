import express from "express";
import usersRoute from "./routes/user.route.js";
import shippersRoute from "./routes/shipper.route.js";
import dishesRoute from "./routes/dishes.route.js";
import suppliersRoute from "./routes/suppliers.route.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
  })
);
app.use(cors());

app.use("/api/v1/user", usersRoute);
app.use("/api/v1/shipper", shippersRoute);
app.use("/api/v1/dishes", dishesRoute);
app.use("/api/v1/suppliers", suppliersRoute);
