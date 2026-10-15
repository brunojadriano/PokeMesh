import { Router } from "express";
import { PORT } from "../index.js";
import { listPokemons } from "../controllers/pokedex.controller.js";

const router = Router();

router.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", PORT });
});

router.get("/pokemons", listPokemons);

export default router;
