import express from "express";
import morgan from "morgan";
import pokedexRouter from "./routes/pokedex.routes.js";

const app = express();
export const PORT = 3001;

app.use(morgan("dev"));
app.use(express.json());
app.use(pokedexRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
