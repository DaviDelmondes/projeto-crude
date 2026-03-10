import Id from "../shared/id"

export default class Produto{
    codigo:string
    preco: number
    nome: string

    constructor(nome:string, preco:number){
        this.nome = nome
        this.preco = preco
        this.codigo = Id.novo()
    }
}