const cors = require('cors');
const dotenv = require('dotenv');
const express = require("express");
const mongoose = require('mongoose')
const notFound = require("./errors/notFound");
const router = require("./routes");
const errorHandlerMiddleware = require('./middleware/errorHandler');

const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    // allowedHeaders: ["Content-Type", "Accept"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

// Load environment variables
dotenv.config();

// Create Express server
const app = express();





// ADD THIS IS YOUR CONNECTION FILE
mongoose.set('strictQuery', true);

// Connecting Database
const MONGO_URI = process.env.MONGO_URI 
const connectDB = mongoose.connect(MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(console.log("DB Connected Succesfully...."))
.catch((err)=>{
    console.log("DB Connection Failed!")
    process.exit(1)
});

// Express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

// CORS configuration
app.use(cors(corsOptions));
app.options("*", cors);

app.use(router);

// Error handling
app.use(errorHandlerMiddleware)
app.use(notFound);

app.listen(process.env.PORT,()=>{
    console.log("App is running at http://localhost:%d ",process.env.PORT);
});

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);
// Shutdown express server gracefully.

function shutDown() {
    console.log("Received kill signal, shutting down gracefully");
    server.close(() => {
        console.log("Closed out remaining connections");
        process.exit(0);
    });

    setTimeout(() => {
        console.log("Could not close connections in time, forcefully shutting down");
        process.exit(1);
    }, 10000);
}
module.exports = app;
