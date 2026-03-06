import express from "express";
const app = express();
const porta = 4000;


app.listen(porta, () => {
    console.log(`rodando na porta ${porta}`);
});
