import { useLoaderData } from "react-router-dom";
import Formulario from "../components/Formulario";


export default function Novo() {
    const codigo: any = useLoaderData();
    return (
        <>
            <Formulario codigo={codigo} />
        </>
    );
}

export function editarLoader({ request, params }: any) {
    const codigo = params.codigo;
    return codigo;
}
