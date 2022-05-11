export class EnderecoViewModel {
  constructor(
    public uf: string,
    public cep: string,
    public cidade: string,
    public bairro: string,
    public rua: string,
    public numero: number,
    public complemento: string
  ) {};
}
