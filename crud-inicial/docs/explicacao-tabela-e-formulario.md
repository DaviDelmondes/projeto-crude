# Explicacao de `Tabela.tsx` e `Formulario.tsx`

Este arquivo explica os componentes `frontend/src/components/Tabela.tsx` e `frontend/src/components/Formulario.tsx`.

Esses dois componentes sao importantes porque representam a tela de listagem e a tela de cadastro/edicao do CRUD.

## Visao geral

- `Tabela.tsx`: mostra os produtos na listagem
- `Formulario.tsx`: mostra os campos para cadastrar ou editar um produto

No estado atual do projeto:

- a `Tabela.tsx` ainda usa dados fixos
- o `Formulario.tsx` ainda nao salva no backend

Mesmo assim, a estrutura do fluxo ja esta desenhada.

## Arquivo `Tabela.tsx`

Arquivo: `frontend/src/components/Tabela.tsx`

### Objetivo

Esse componente renderiza uma tabela de produtos e mostra as acoes de editar e excluir.

### Codigo comentado linha por linha

```ts
import { IconeEdicao, IconeLixo } from "./Icones";
```
Importa os icones usados nos botoes de editar e excluir.

```ts
import { Link } from "react-router-dom";
```
Importa `Link` para navegar entre rotas sem recarregar a pagina.

```ts
import useProdutos from "../hooks/useProdutos";
```
Importa o hook de produtos. Hoje ele esta importado, mas nao esta sendo usado de fato.

```ts
export default function Tabela() {
```
Cria o componente `Tabela`.

```ts
    const produtos = [
```
Define uma lista fixa de produtos dentro do proprio componente.

```ts
        { nome: "Apagador", codigo: "ab1", preco: 1.99 },
        { nome: "Garfo", codigo: "ab22", preco: 4.99 },
        { nome: "Colher", codigo: "ab3", preco: 4.99 },
```
Esses tres objetos sao os dados exibidos hoje na tela.

```ts
    ];
```
Fecha o array.

Esse e um ponto importante: a tabela ainda nao usa o backend. Ela ainda esta em modo estatico.

```ts
    function renderizarCabecalho() {
```
Cria uma funcao para montar o cabecalho da tabela.

```ts
        return (
            <tr>
                <th className="text-left p-4">CÃ³digo</th>
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">PreÃ§o</th>
                <th className="p-4">AÃ§Ãµes</th>
            </tr>
        );
```
Retorna uma linha de cabecalho com quatro colunas:

- codigo
- nome
- preco
- acoes

Os textos aparecem com caracteres estranhos por problema de codificacao do arquivo.

```ts
    }
```
Fecha `renderizarCabecalho`.

```ts
    function renderizarDados() {
```
Cria uma funcao para renderizar as linhas com os produtos.

```ts
        return produtos?.map((produto, i) => {
```
Percorre o array `produtos` com `map`.

- `produto` e o item atual
- `i` e o indice

```ts
            return (
                <tr key={produto.codigo} className={`${i % 2 === 0 ? "bg-purple-200" : "bg-purple-100"}`}>
```
Cria uma linha da tabela para cada produto.

- `key={produto.codigo}` ajuda o React a identificar cada item
- a classe alterna a cor da linha entre dois tons de roxo

```ts
                    <td className="text-left p-4">{produto.codigo}</td>
                    <td className="text-left p-4">{produto.nome}</td>
                    <td className="text-left p-4">{produto.preco}</td>
```
Renderiza as tres colunas principais com os valores do produto.

```ts
                    {renderizarAcoes(produto.codigo)}
```
Renderiza a coluna de acoes, passando o codigo do produto.

```ts
                </tr>
            );
```
Fecha a linha.

```ts
        });
```
Fecha o `map`.

```ts
    }
```
Fecha `renderizarDados`.

```ts
    function renderizarAcoes(codigo: string) {
```
Cria uma funcao para montar os botoes de acao.

```ts
        return (
            <td className="flex justify-center">
```
Cria a celula da tabela onde ficarao os botoes.

```ts
                <button
                    className={`
                        flex justify-center items-center
                        text-green-600 rounded-full p-2 m-1
                        hover:bg-purple-50
                    `}
                >
```
Cria o botao de editar, com classes de estilo.

```ts
                    <Link to={`/editar/${codigo}`}>{IconeEdicao}</Link>
```
Dentro do botao existe um `Link` para a rota de edicao do produto.

Se `codigo = "ab1"`, a rota sera:
`/editar/ab1`

```ts
                </button>
```
Fecha o botao de editar.

```ts
                <button
                    onClick={() => {}}
```
Cria o botao de excluir.

Hoje o `onClick` esta vazio, entao ele nao faz nada.

```ts
                    className={`
                        flex justify-center items-center
                        text-red-500 rounded-full p-2 m-1
                        hover:bg-purple-50
                    `}
                >
```
Aplica o estilo visual do botao de excluir.

```ts
                    {IconeLixo}
```
Mostra o icone de lixeira.

```ts
                </button>
            </td>
        );
```
Fecha a celula com os dois botoes.

```ts
    }
```
Fecha `renderizarAcoes`.

```ts
    return (
        <table className="w-full rounded-xl overflow-hidden">
```
Retorna a estrutura principal da tabela.

```ts
            <thead
                className={`
                text-gray-100
                bg-gradient-to-r from-purple-700 to-purple-900
            `}
            >
```
Cria o cabecalho visual da tabela com gradiente.

```ts
                {renderizarCabecalho()}
```
Insere o cabecalho gerado pela funcao anterior.

```ts
            </thead>
            <tbody>{renderizarDados()}</tbody>
```
No corpo da tabela, renderiza as linhas dos produtos.

```ts
        </table>
    );
}
```
Fecha o componente inteiro.

### Papel da `Tabela.tsx`

Ela e responsavel por mostrar a listagem e dar acesso as acoes de editar e excluir.

### Problemas atuais da `Tabela.tsx`

- importa `useProdutos`, mas nao usa
- ainda usa array fixo
- o botao excluir nao tem implementacao
- os textos estao com problema de codificacao

### Como deveria funcionar depois

O ideal seria algo proximo disto:

1. usar `const { produtos, excluirProduto } = useProdutos()`
2. renderizar `produtos` vindos do backend
3. chamar `excluirProduto(codigo)` no clique da lixeira

## Arquivo `Formulario.tsx`

Arquivo: `frontend/src/components/Formulario.tsx`

### Objetivo

Esse componente exibe os campos do formulario para criar ou editar um produto.

### Codigo comentado linha por linha

```ts
import { useEffect, useState } from "react";
```
Importa hooks do React.

```ts
import Botao from "./Botao";
```
Importa o componente de botao reutilizavel.

```ts
import Entrada from "./Entrada";
```
Importa o componente de campo de entrada.

```ts
import useProdutos from "../hooks/useProdutos";
```
Importa o hook com as operacoes de produto.

```ts
import useNavegar from "../hooks/useNavegar";
```
Importa o hook de navegacao.

```ts
interface FormularioProps {
    codigo?: string;
}
```
Define as props do componente.

`codigo` e opcional:
- se existir, o formulario esta em modo de edicao
- se nao existir, esta em modo de cadastro

```ts
export default function Formulario(props: FormularioProps) {
```
Declara o componente `Formulario`.

```ts
    const { voltarInicio } = useNavegar();
```
Pega do hook de navegacao a funcao que leva o usuario para `/inicio`.

```ts
    const codigo = props.codigo ?? "";
```
Se `props.codigo` existir, usa esse valor.
Se nao existir, usa string vazia.

Isso evita trabalhar com `undefined`.

```ts
    const [nome, setNome] = useState("");
```
Cria o estado para o nome do produto.

```ts
    const [preco, setPreco] = useState(0);
```
Cria o estado para o preco do produto.

```ts
    useEffect(() => {
```
Cria um efeito que roda na inicializacao.

```ts
        (async () => {
```
Abre uma funcao assincrona autoexecutavel.

```ts
            if (props.codigo) {
            }
```
Verifica se existe codigo, o que indicaria modo de edicao.

Mas o bloco esta vazio. Isso mostra que a logica para carregar os dados do produto ainda nao foi implementada.

```ts
        })();
```
Executa a funcao.

```ts
    }, []);
```
Roda uma vez quando o componente inicia.

```ts
    return (
        <div>
```
Comeca a renderizacao do formulario.

```ts
            {codigo ? <Entrada somenteLeitura texto="CÃ³digo" valor={codigo} className="mb-5" /> : false}
```
Se existir `codigo`, mostra um campo somente leitura com o codigo do produto.

Se nao existir, nao mostra esse campo.

```ts
            <Entrada texto="Nome" valor={nome} valorMudou={setNome} className="mb-5" />
```
Renderiza o campo de nome.

- `valor={nome}` conecta o estado ao input
- `valorMudou={setNome}` atualiza o estado quando o usuario digita

```ts
            <Entrada texto="PreÃ§o" tipo="number" valor={preco} valorMudou={setPreco} />
```
Renderiza o campo de preco.

Tambem esta ligado ao estado.

```ts
            <div className="flex justify-end mt-7">
```
Cria uma area alinhada a direita para os botoes.

```ts
                <Botao
                    cor="blue"
                    className="mr-2"
                    onClick={() => {
                        voltarInicio();
                    }}
                >
```
Cria o botao principal.

Hoje, ao clicar, ele so chama `voltarInicio()`.
Ou seja: ele navega para a tela inicial, mas nao salva nada.

```ts
                    {codigo ? "Alterar" : "Salvar"}
```
O texto do botao muda conforme o modo:

- com codigo: `Alterar`
- sem codigo: `Salvar`

```ts
                </Botao>
```
Fecha o primeiro botao.

```ts
                <Botao
                    cor="red"
                    onClick={() => {
                        voltarInicio();
                    }}
                >
```
Cria o botao de cancelar.

```ts
                    Cancelar
```
Texto exibido no botao.

```ts
                </Botao>
            </div>
        </div>
    );
}
```
Fecha a estrutura do formulario.

### Papel do `Formulario.tsx`

Ele controla os campos da tela de cadastro e edicao.

Hoje ele ja tem:

- estados locais
- modo cadastro/edicao baseado em `codigo`
- navegacao de volta
- estrutura visual pronta

### O que ainda falta no `Formulario.tsx`

- usar `useProdutos()`
- buscar os dados do produto quando estiver em modo edicao
- preencher `nome` e `preco`
- salvar no backend ao clicar em `Salvar` ou `Alterar`

### Como deveria funcionar depois

Fluxo esperado:

1. se houver `codigo`, buscar o produto no `useEffect`
2. preencher os campos com os dados recebidos
3. quando clicar em salvar, chamar `salvarProduto(nome, preco, codigo)`
4. depois voltar para `/inicio`

## Relacao entre os dois componentes

Os dois fazem parte do mesmo CRUD:

- `Tabela.tsx` mostra os produtos existentes
- `Formulario.tsx` cria ou altera produtos

Fluxo ideal:

1. o usuario entra em `/inicio`
2. a tabela mostra os produtos
3. ele clica em `Novo Produto` ou em editar
4. o formulario abre
5. ele salva
6. volta para a listagem com os dados atualizados

## Resumo final

`Tabela.tsx` e a tela de exibicao.

`Formulario.tsx` e a tela de entrada de dados.

O projeto ja tem a estrutura visual pronta, mas ainda falta ligar esses componentes ao hook `useProdutos` e ao backend para o CRUD funcionar por completo.
