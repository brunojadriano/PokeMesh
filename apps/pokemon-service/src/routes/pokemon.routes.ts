import { Router } from "express";
import { PORT } from "../index.js";
import {
    listPokemons,
    syncFirstGenerationPokemons,
} from "../controllers/pokemon.controller.js";

const router = Router();

router.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", PORT });
});

router.get("/pokemons", listPokemons);
router.post("/pokemons/sync", syncFirstGenerationPokemons);

export default router;
