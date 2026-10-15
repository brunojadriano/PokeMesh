import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";

type PokeApiGeneration = {
    pokemon_species: {
        name: string;
        url: string;
    }[];
};

export async function syncFirstGenerationPokemons(req: Request, res: Response) {
    try {
        const response = await fetch(
            "https://pokeapi.co/api/v2/generation/1/",
            { signal: AbortSignal.timeout(10000) },
        );

        if (!response.ok) {
            return res.status(502).json({
                error: "Falha ao consultar a PokéAPI",
            });
        }

        const data = (await response.json()) as PokeApiGeneration;

        if (
            !Array.isArray(data.pokemon_species) ||
            data.pokemon_species.length !== 151
        ) {
            return res.status(502).json({
                error: "Resposta inesperada da PokéAPI",
            });
        }

        const pokemons = data.pokemon_species.map((pokemon) => ({
            name: pokemon.name.trim().toLowerCase(),
        }));

        const result = await prisma.pokemon.createMany({
            data: pokemons,
            skipDuplicates: true,
        });

        return res.status(200).json({
            received: pokemons.length,
            inserted: result.count,
            ignored: pokemons.length - result.count,
        });
    } catch (error) {
        console.error("Erro na sincronização:", error);

        return res.status(500).json({
            error: "Erro ao sincronizar Pokémon",
        });
    }
}

export async function listPokemons(req: Request, res: Response): Promise<void> {
    const pokemons = await prisma.pokemon.findMany({
        orderBy: {
            id: "asc",
        },
    });

    res.status(200).json(pokemons);
}
