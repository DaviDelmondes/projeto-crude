export default class Requisicao {
    static headers: any = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    };

    static porta: number = 4000;
    static urlBase: string = `http://localhost:${this.porta}`;

    static adicionaToken(token: string) {
        Requisicao.headers = { ...Requisicao.headers, Authorization: `Bearer ${token}` };
        return;
    }

    static apagaToken() {
        delete Requisicao.headers.Authorization;
        return;
    }

    static async requisicaoGenerica(metodo: string, complementoURL: string, dadosBody?: any) {
        const dados = await fetch(Requisicao.urlBase + `${complementoURL}`, {
            method: metodo,
            headers: Requisicao.headers,
            body: JSON.stringify(dadosBody),
        });
        const resultado = await dados.json();
        return resultado;
    }

    static async get(complementoURL: string) {
        const resultado = await Requisicao.requisicaoGenerica("GET", complementoURL);
        return resultado;
    }

    static async post(complementoURL: string, dadosBody: any) {
        const resultado = await Requisicao.requisicaoGenerica("POST", complementoURL, dadosBody);
        return resultado;
    }

    static async put(complementoURL: string, dadosBody: any) {
        const resultado = await Requisicao.requisicaoGenerica("PUT", complementoURL, dadosBody);
        return resultado;
    }

    static async delete(complementoURL: string) {
        const resultado = await Requisicao.requisicaoGenerica("DELETE", complementoURL);
        return resultado;
    }
}
