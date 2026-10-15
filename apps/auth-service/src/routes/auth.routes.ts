import { Router } from "express";
import { PORT } from "../index.js";
import { register } from "../controllers/auth.controller.js";

const router = Router();

router.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", PORT });
});

router.post("/auth/register", register);

export default router;
