import { Router } from "express";
import { PORT } from "../index.js";

const router = Router();

router.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", PORT });
});

export default router;
