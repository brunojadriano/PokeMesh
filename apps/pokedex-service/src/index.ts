import express from "express";
import pokedexRouter from "./routes/pokedex.routes.js";

const app = express();
export const PORT = 3001;

app.use(express.json());
app.use(pokedexRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
