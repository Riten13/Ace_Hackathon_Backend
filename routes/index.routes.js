import { Router } from "express";
import { testFunction } from "../controllers/index.controller.js";

// Create a router.
const router = Router();

// Default route to check if auth routes are accessible.
router.get("/", (_, res) => {
    res.status(200).send({ data: "Auth Route" });
});

// ---------------------------------------------------------------------

// USER ROUTES

// Test Route
router.get("/test-route", testFunction);

// ---------------------------------------------------------------------

export default router;
