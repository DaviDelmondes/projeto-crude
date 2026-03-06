import { useEffect, useState } from "react";
import Botao from "./Botao";
import Entrada from "./Entrada";
import useProdutos from "../hooks/useProdutos";
import useNavegar from "../hooks/useNavegar";

interface FormularioProps {
    codigo?: string;
}

export default function Formulario(props: FormularioProps) {
    const { voltarInicio } = useNavegar();
    const codigo = props.codigo ?? "";
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState(0);

    useEffect(() => {
        (async () => {
            if (props.codigo) {
            }
        })();
    }, []);

    return (
        <div>
            {codigo ? <Entrada somenteLeitura texto="Código" valor={codigo} className="mb-5" /> : false}
            <Entrada texto="Nome" valor={nome} valorMudou={setNome} className="mb-5" />
            <Entrada texto="Preço" tipo="number" valor={preco} valorMudou={setPreco} />
            <div className="flex justify-end mt-7">
                <Botao
                    cor="blue"
                    className="mr-2"
                    onClick={() => {
                        voltarInicio();
                    }}
                >
                    {codigo ? "Alterar" : "Salvar"}
                </Botao>
                <Botao
                    cor="red"
                    onClick={() => {
                        voltarInicio();
                    }}
                >
                    Cancelar
                </Botao>
            </div>
        </div>
    );
}
