import http from "http";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";;

// Configure Dotenv to read environment variables

dotenv.config();

// Importing Routes & Middleware --------------------------------------------------------------------------------

import indexRouter from "./routes/index.routes.js";

// Initializing Server -------------------------------------------------------------------------------------------

const app = express();
let server = http.createServer(app);

// Using Middleware ----------------------------------------------------------------------------------------------

// Whitelist for domains
const whitelist = ["http://localhost:3000", ""];

// Function to deny access to domains except those in whitelist.
const corsOptions = {
    origin(
        origin,
        callback
    ) {
        // Find request domain and check in whitelist.
        if (origin && whitelist.indexOf(origin) !== -1) {
            // Accept request
            callback(null, true);
        } else {
            // Send CORS error.
            callback(new Error("Not allowed by CORS"));
        }
    },
};

// Limit each IP to 30 requests per minute
const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30,
});

// Rate Limit
app.use(limiter);
// Parses request body.
app.use(express.urlencoded({ extended: true }));
// Adds security to the server.
app.use(helmet());
// Removes the "X-Powered-By" HTTP header from Express responses.
app.disable("x-powered-by");
// Parses JSON passed inside body.
app.use(express.json());
// Enable CORS
app.use(cors());

// Routes ------------------------------------------------------------------------------------------------------------

// Default route to check if server is working.
app.get("/", (_, res) => {
    res.status(200).send("We are good to go!");
    return;
});


// Routes -----------------------------------------------------------------------------------------------------

// Auth Routes
app.use("/api/v1/test", indexRouter);

// Listening on PORT -------------------------------------------------------------------------------------------

server.listen(process.env.PORT || 4000, () => {
    console.log(`Server running on port ${process.env.PORT || 4000}`);
});
