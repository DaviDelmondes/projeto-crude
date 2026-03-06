import Requisicao from "./Requisicao";

export default class ColecaoProdutos {
    async salvar(nome: string, preco: number, codigo: string) {
        let dados;
        if (codigo) {
            dados = await Requisicao.put(`/produtos/${codigo}`, { nome, preco, codigo });
        } else {
            dados = await Requisicao.post("/produtos", { nome, preco });
        }
        return dados;
    }

    async excluir(codigo: string) {
        const dados = await Requisicao.delete(`/produtos/${codigo}`);
        return dados;
    }

    async obterTodos() {
        const dados = await Requisicao.get(`/produtos`);
        return dados;
    }

    async obterPorCodigo(codigo: string) {
        const dados = await Requisicao.get(`/produtos/${codigo}`);
        return dados;
    }
}
