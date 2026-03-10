import { Router } from "express";
import RepositorioProdutos from "../core/produtos/RepositorioProdutos";

const repo = new RepositorioProdutos()
const router = Router()

router.get("/", (req,res)=>{
    const dados = repo.obtertTodos()
    res.status(200).send(dados)
})

export default router