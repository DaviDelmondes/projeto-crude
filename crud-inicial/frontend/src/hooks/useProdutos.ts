import { useEffect, useState } from "react";
import ColecaoProdutos from "../core/ColecaoProdutos";

export default function useProdutos() {
    const repo = new ColecaoProdutos();

    const [produtos, setProdutos] = useState<any[]>();

    useEffect(() => {
        (async () => {
            obterTodos();
        })();
    }, []);

    async function obterTodos() {
        const dados = await repo.obterTodos();
        setProdutos(dados);
    }

    async function obterPorCodigo(codigo: string) {
        const produto = await repo.obterPorCodigo(codigo);
        return produto;
    }

    async function excluirProduto(codigo: string) {
        await repo.excluir(codigo);
        obterTodos();
    }

    async function salvarProduto(nome: string, preco: number, codigo: string) {
        await repo.salvar(nome, preco, codigo);
        obterTodos();
    }

    return {
        produtos,
        salvarProduto,
        excluirProduto,
        obterTodos,
        obterPorCodigo,
    };
}
