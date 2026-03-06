import { IconeEdicao, IconeLixo } from "./Icones";
import { Link } from "react-router-dom";
import useProdutos from "../hooks/useProdutos";

export default function Tabela() {
    const produtos = [
        { nome: "Apagador", codigo: "ab1", preco: 1.99 },
        { nome: "Garfo", codigo: "ab22", preco: 4.99 },
        { nome: "Colher", codigo: "ab3", preco: 4.99 },
    ];
    function renderizarCabecalho() {
        return (
            <tr>
                <th className="text-left p-4">Código</th>
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">Preço</th>
                <th className="p-4">Ações</th>
            </tr>
        );
    }

    function renderizarDados() {
        return produtos?.map((produto, i) => {
            return (
                <tr key={produto.codigo} className={`${i % 2 === 0 ? "bg-purple-200" : "bg-purple-100"}`}>
                    <td className="text-left p-4">{produto.codigo}</td>
                    <td className="text-left p-4">{produto.nome}</td>
                    <td className="text-left p-4">{produto.preco}</td>
                    {renderizarAcoes(produto.codigo)}
                </tr>
            );
        });
    }

    function renderizarAcoes(codigo: string) {
        return (
            <td className="flex justify-center">
                <button
                    className={`
                        flex justify-center items-center
                        text-green-600 rounded-full p-2 m-1
                        hover:bg-purple-50
                    `}
                >
                    <Link to={`/editar/${codigo}`}>{IconeEdicao}</Link>
                </button>

                <button
                    onClick={() => {}}
                    className={`
                        flex justify-center items-center
                        text-red-500 rounded-full p-2 m-1
                        hover:bg-purple-50
                    `}
                >
                    {IconeLixo}
                </button>
            </td>
        );
    }

    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead
                className={`
                text-gray-100
                bg-gradient-to-r from-purple-700 to-purple-900
            `}
            >
                {renderizarCabecalho()}
            </thead>
            <tbody>{renderizarDados()}</tbody>
        </table>
    );
}
