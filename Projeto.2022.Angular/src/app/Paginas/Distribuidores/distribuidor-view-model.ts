import { EnderecoViewModel } from '../Shared/endereco-view-model';
export class DistribuidorViewModel {
  constructor(
    public nome:string,
    public chaveAcesso:string,
    public cnpj:string,
    public email:string,
    public telefone:string,
    public enderecoModel:EnderecoViewModel
  ){}
}
