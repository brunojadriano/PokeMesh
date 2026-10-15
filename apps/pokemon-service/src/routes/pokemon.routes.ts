import { Router } from "express";
import { PORT } from "../index.js";
import { prisma } from "../../lib/prisma.js";

const router = Router();

router.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", PORT });
});

router.get("/pokemons", async (_req, res) => {
    const total = await prisma.pokemon.count();

    const pokemon = await prisma.pokemon.create({
        data: {
            name: `Pikachu ${total + 1}`,
        },
    });

    res.status(201).json(pokemon);
});

export default router;
