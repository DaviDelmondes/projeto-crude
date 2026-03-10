# Explicacao da pasta `core` e do hook `useProdutos`

Este arquivo resume a explicacao sobre os arquivos da pasta `frontend/src/core` e o hook `frontend/src/hooks/useProdutos.ts`.

## Visao geral

A pasta `core` do frontend e a camada que faz a ponte entre a interface React e o backend.

Ela tem dois arquivos:

- `frontend/src/core/Requisicao.ts`
- `frontend/src/core/ColecaoProdutos.ts`

O fluxo geral e este:

1. Um componente ou hook precisa de dados.
2. O hook chama `ColecaoProdutos`.
3. `ColecaoProdutos` usa `Requisicao`.
4. `Requisicao` faz o `fetch` para o backend.
5. O resultado volta para a tela.

## Arquivo `Requisicao.ts`

Arquivo: `frontend/src/core/Requisicao.ts`

Essa classe centraliza as chamadas HTTP.

### Codigo comentado linha por linha

```ts
export default class Requisicao {
```
Cria a classe `Requisicao` e exporta como padrao.

```ts
    static headers: any = {
```
Define um objeto estatico de headers.

```ts
        "Content-Type": "application/json",
```
Indica que os dados enviados no corpo serao em JSON.

```ts
        "Access-Control-Allow-Origin": "*",
```
Tenta liberar acesso de qualquer origem. Na pratica, esse header deveria ser configurado no backend.

```ts
    };
```
Fecha o objeto `headers`.

```ts
    static porta: number = 4000;
```
Define a porta usada pelo backend.

```ts
    static urlBase: string = `http://localhost:${this.porta}`;
```
Monta a URL base da API.

```ts
    static adicionaToken(token: string) {
```
Metodo para adicionar token de autenticacao.

```ts
        Requisicao.headers = { ...Requisicao.headers, Authorization: `Bearer ${token}` };
```
Mantem os headers atuais e adiciona `Authorization`.

```ts
        return;
```
Encerra o metodo.

```ts
    }
```
Fecha `adicionaToken`.

```ts
    static apagaToken() {
```
Metodo para remover o token.

```ts
        delete Requisicao.headers.Authorization;
```
Apaga o header `Authorization`.

```ts
        return;
```
Encerra o metodo.

```ts
    }
```
Fecha `apagaToken`.

```ts
    static async requisicaoGenerica(metodo: string, complementoURL: string, dadosBody?: any) {
```
Metodo principal que faz a chamada HTTP.

```ts
        const dados = await fetch(Requisicao.urlBase + `${complementoURL}`, {
```
Executa um `fetch` na URL base mais o complemento.

```ts
            method: metodo,
```
Define o metodo HTTP, por exemplo `GET`, `POST`, `PUT` ou `DELETE`.

```ts
            headers: Requisicao.headers,
```
Envia os headers configurados na classe.

```ts
            body: JSON.stringify(dadosBody),
```
Converte o corpo para JSON.

```ts
        });
```
Fecha a chamada do `fetch`.

```ts
        const resultado = await dados.json();
```
Converte a resposta em JSON.

```ts
        return resultado;
```
Retorna o resultado convertido.

```ts
    }
```
Fecha `requisicaoGenerica`.

```ts
    static async get(complementoURL: string) {
```
Atalho para requisicoes `GET`.

```ts
        const resultado = await Requisicao.requisicaoGenerica("GET", complementoURL);
```
Chama o metodo generico com `GET`.

```ts
        return resultado;
```
Retorna a resposta.

```ts
    }
```
Fecha `get`.

```ts
    static async post(complementoURL: string, dadosBody: any) {
```
Atalho para `POST`.

```ts
        const resultado = await Requisicao.requisicaoGenerica("POST", complementoURL, dadosBody);
```
Chama o metodo generico com `POST`.

```ts
        return resultado;
```
Retorna a resposta.

```ts
    }
```
Fecha `post`.

```ts
    static async put(complementoURL: string, dadosBody: any) {
```
Atalho para `PUT`.

```ts
        const resultado = await Requisicao.requisicaoGenerica("PUT", complementoURL, dadosBody);
```
Chama o metodo generico com `PUT`.

```ts
        return resultado;
```
Retorna a resposta.

```ts
    }
```
Fecha `put`.

```ts
    static async delete(complementoURL: string) {
```
Atalho para `DELETE`.

```ts
        const resultado = await Requisicao.requisicaoGenerica("DELETE", complementoURL);
```
Chama o metodo generico com `DELETE`.

```ts
        return resultado;
```
Retorna a resposta.

```ts
    }
}
```
Fecha o metodo `delete` e a classe.

### Papel desse arquivo

`Requisicao.ts` sabe como falar com a API. Ele nao sabe nada especifico sobre produtos; ele so sabe fazer chamadas HTTP.

## Arquivo `ColecaoProdutos.ts`

Arquivo: `frontend/src/core/ColecaoProdutos.ts`

Essa classe usa `Requisicao` e traduz as chamadas HTTP em operacoes de produto.

### Codigo comentado linha por linha

```ts
import Requisicao from "./Requisicao";
```
Importa a classe `Requisicao`.

```ts
export default class ColecaoProdutos {
```
Cria a classe `ColecaoProdutos`.

```ts
    async salvar(nome: string, preco: number, codigo: string) {
```
Metodo para criar ou atualizar produto.

```ts
        let dados;
```
Variavel que guardara a resposta da API.

```ts
        if (codigo) {
```
Se existir codigo, significa edicao.

```ts
            dados = await Requisicao.put(`/produtos/${codigo}`, { nome, preco, codigo });
```
Faz `PUT` para atualizar o produto.

```ts
        } else {
```
Se nao existir codigo, significa cadastro novo.

```ts
            dados = await Requisicao.post("/produtos", { nome, preco });
```
Faz `POST` para criar um novo produto.

```ts
        }
```
Fecha o bloco condicional.

```ts
        return dados;
```
Retorna a resposta da API.

```ts
    }
```
Fecha `salvar`.

```ts
    async excluir(codigo: string) {
```
Metodo para excluir um produto.

```ts
        const dados = await Requisicao.delete(`/produtos/${codigo}`);
```
Faz `DELETE /produtos/:codigo`.

```ts
        return dados;
```
Retorna a resposta.

```ts
    }
```
Fecha `excluir`.

```ts
    async obterTodos() {
```
Metodo para listar todos os produtos.

```ts
        const dados = await Requisicao.get(`/produtos`);
```
Faz `GET /produtos`.

```ts
        return dados;
```
Retorna a lista.

```ts
    }
```
Fecha `obterTodos`.

```ts
    async obterPorCodigo(codigo: string) {
```
Metodo para buscar um produto por codigo.

```ts
        const dados = await Requisicao.get(`/produtos/${codigo}`);
```
Faz `GET /produtos/:codigo`.

```ts
        return dados;
```
Retorna o produto encontrado.

```ts
    }
}
```
Fecha a classe.

### Papel desse arquivo

`ColecaoProdutos.ts` sabe quais endpoints de produto existem. Ele ja trabalha em um nivel mais proximo da regra do sistema.

Resumo:

- `Requisicao`: sabe fazer HTTP
- `ColecaoProdutos`: sabe manipular produtos

## Hook `useProdutos.ts`

Arquivo: `frontend/src/hooks/useProdutos.ts`

Esse hook conecta a camada `core` com o React.

### Codigo comentado linha por linha

```ts
import { useEffect, useState } from "react";
```
Importa hooks do React.

```ts
import ColecaoProdutos from "../core/ColecaoProdutos";
```
Importa a classe de acesso aos produtos.

```ts
export default function useProdutos() {
```
Cria o hook customizado.

```ts
    const repo = new ColecaoProdutos();
```
Cria uma instancia da classe `ColecaoProdutos`.

```ts
    const [produtos, setProdutos] = useState<any[]>();
```
Cria o estado que guardara a lista de produtos.

```ts
    useEffect(() => {
```
Executa um efeito quando o hook e iniciado.

```ts
        (async () => {
```
Cria uma funcao assincrona autoexecutavel.

```ts
            obterTodos();
```
Carrega os produtos ao iniciar.

```ts
        })();
```
Executa a funcao.

```ts
    }, []);
```
Roda uma vez, na inicializacao.

```ts
    async function obterTodos() {
```
Funcao para buscar todos os produtos.

```ts
        const dados = await repo.obterTodos();
```
Busca os produtos no backend.

```ts
        setProdutos(dados);
```
Atualiza o estado com os dados recebidos.

```ts
    }
```
Fecha `obterTodos`.

```ts
    async function obterPorCodigo(codigo: string) {
```
Funcao para buscar um produto pelo codigo.

```ts
        const produto = await repo.obterPorCodigo(codigo);
```
Busca um item especifico.

```ts
        return produto;
```
Retorna o produto.

```ts
    }
```
Fecha `obterPorCodigo`.

```ts
    async function excluirProduto(codigo: string) {
```
Funcao para excluir um produto.

```ts
        await repo.excluir(codigo);
```
Chama a API para excluir.

```ts
        obterTodos();
```
Recarrega a lista depois da exclusao.

```ts
    }
```
Fecha `excluirProduto`.

```ts
    async function salvarProduto(nome: string, preco: number, codigo: string) {
```
Funcao para salvar um produto.

```ts
        await repo.salvar(nome, preco, codigo);
```
Cria ou atualiza um produto.

```ts
        obterTodos();
```
Recarrega a lista depois do salvamento.

```ts
    }
```
Fecha `salvarProduto`.

```ts
    return {
```
Retorna um objeto com estado e funcoes para a interface usar.

```ts
        produtos,
        salvarProduto,
        excluirProduto,
        obterTodos,
        obterPorCodigo,
```
Expõe a lista e as operacoes do hook.

```ts
    };
}
```
Fecha o objeto retornado e o hook.

## Fluxo completo

Exemplo de listagem:

1. Um componente usa `useProdutos()`.
2. O hook executa `obterTodos()`.
3. `obterTodos()` chama `repo.obterTodos()`.
4. `repo.obterTodos()` chama `Requisicao.get("/produtos")`.
5. `Requisicao` faz o `fetch` para `http://localhost:4000/produtos`.
6. O backend responde com os dados.
7. O hook salva esses dados em `produtos`.
8. O componente renderiza a lista.

## Observacoes importantes

- A estrutura esta bem separada por responsabilidade.
- O backend atual ainda nao implementa todas as rotas esperadas pelo frontend.
- O componente `Tabela.tsx` ainda usa dados fixos em vez do estado vindo de `useProdutos`.
- O formulario ainda nao esta usando toda a logica de salvar e editar.

## Resumo final

- `Requisicao.ts` e a base HTTP.
- `ColecaoProdutos.ts` e a camada especifica de produto.
- `useProdutos.ts` liga essa camada ao React.

Juntos, esses arquivos formam a estrutura de acesso a dados do frontend.
