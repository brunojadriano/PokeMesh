import type { Request, Response } from "express";
import argon2 from "argon2";
import { Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";

export async function register(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body ?? {};

    if (typeof email !== "string" || typeof password !== "string") {
        res.status(400).json({
            error: "Email e senha são obrigatórios",
        });
        return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
        res.status(400).json({ error: "Email inválido" });
        return;
    }

    if (password.length < 15) {
        res.status(400).json({
            error: "A senha deve conter pelo menos 15 caracteres",
        });
        return;
    }

    try {
        const passwordHash = await argon2.hash(password, {
            type: argon2.argon2id,
        });

        const user = await prisma.user.create({
            data: {
                email: normalizedEmail,
                passwordHash,
            },
            select: {
                id: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });

        res.status(201).json(user);
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            res.status(409).json({
                error: "Email já cadastrado",
            });
            return;
        }

        console.error("Erro ao cadastrar usuário:", error);

        res.status(500).json({
            error: "Erro interno ao cadastrar usuário",
        });
    }
}
