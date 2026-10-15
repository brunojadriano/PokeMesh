import type { Request, Response } from "express";

export async function listPokemons(req: Request, res: Response): Promise<void> {
    try {
        const response = await fetch("http://localhost:3002/pokemons", {
            signal: AbortSignal.timeout(5000),
        });

        if (!response.ok) {
            res.status(502).json({
                error: "Erro ao consultar Pokémon Service",
            });
            return;
        }

        const pokemons = await response.json();

        res.status(200).json(pokemons);
    } catch (error) {
        console.error("Erro na comunicação:", error);

        res.status(502).json({
            error: "Pokémon Service indisponível",
        });
    }
}
