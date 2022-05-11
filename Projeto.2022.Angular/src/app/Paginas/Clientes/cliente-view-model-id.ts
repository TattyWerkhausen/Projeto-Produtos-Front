import { EnderecoViewModel } from '../Shared/endereco-view-model';
export class ClienteViewModelId {
  constructor(
    public id:string,
    public nome:string,
    public chaveAcesso:string,
    public sobrenome:string,
    public email:string,
    public telefone:string,
    public cpf:string,
    public dataNascimento:Date,
    public enderecoModel:EnderecoViewModel
  ){}
}
