import express from "express";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js";

const app = express();
export const PORT = 3003;

app.use(morgan("dev"));
app.use(express.json());
app.use(authRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
