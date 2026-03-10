import express from "express";
import cors from "cors"
import rotasProdutos from "./routes/Produtos"

const app = express();
const porta = 4000;

app.use(cors())
app.use("/produtos", rotasProdutos)

app.listen(porta, () => {
    console.log(`rodando na porta ${porta}`);
});
