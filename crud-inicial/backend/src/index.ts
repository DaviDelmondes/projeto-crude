import express from "express";
import rotasProdutos from "./routes/produtos"

const app = express();
const porta = 4000;

app.use("/produtos", rotasProdutos)

app.listen(porta, () => {
    console.log(`rodando na porta ${porta}`);
});
