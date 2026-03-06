import { Link } from "react-router-dom";
import Botao from "../components/Botao";
import Tabela from "../components/Tabela";
import Requisicao from "../core/Requisicao";
import useNavegar from "../hooks/useNavegar";
export default function Home() {
    return (
        <>
            <div className="flex justify-end">
                <Botao cor="green" className="mb-4 mx-3">
                    <Link to="/novo">Novo Produto</Link>
                </Botao>
            </div>
            <Tabela />
        </>
    );
}
