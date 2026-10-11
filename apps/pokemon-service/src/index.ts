import express from "express";
import morgan from "morgan";
import pokemonRouter from "./routes/pokemon.routes.js";

const app = express();
export const PORT = 3002;

app.use(morgan("dev"));
app.use(express.json());
app.use(pokemonRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
