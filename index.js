// importing packages

import express from "express"
import  colors  from "colors"
import multer from "multer"
import cors from "cors"
import dotenv from "dotenv"
//

import connectDB from "./config/db.js"
import {errorHandler ,notFound} from "./middelwares/errorMiddelware.js"

//import Routes

import useRoute from "./routers/userRoute.js"
import fileRoutes from "./routers/fileRoutes.js"
import contactRoutes from "./routers/contactRoutes.js"
import morgan from "morgan"

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))


//frontend
app.use("/", express.static("frontend/build"))


//routing
app.use("/api/users",useRoute);
app.use("/api/contacts",contactRoutes)
app.use("/file",fileRoutes)

//static files
app.use("/images",express.static("uploads"))
app.use("/qrcodes",express. static("qrcodes"))


//Middelwares
app.use(notFound)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>{
    console.log(`Server is running on http://localhost:${PORT}`.yellow.underline)
})
