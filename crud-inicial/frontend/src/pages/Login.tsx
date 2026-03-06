import { Form, redirect } from "react-router-dom";
import Botao from "../components/Botao";
import { useState } from "react";
import Entrada from "../components/Entrada";
import Requisicao from "../core/Requisicao";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    return (
        <Form method="post" action="/login" className="flex flex-col align-center">
            <Entrada texto="Email" nome="email" valor={email} valorMudou={setEmail} className="mb-5" />
            <Entrada texto="Senha" nome="senha" tipo="text" valor={senha} valorMudou={setSenha} />
            <Botao cor="purple" className="mt-4">
                Login
            </Botao>
        </Form>
    );
}

export async function actionLogin({ request }: any) {
    const dadosFormulario = await request.formData();
    
    return null;
}
