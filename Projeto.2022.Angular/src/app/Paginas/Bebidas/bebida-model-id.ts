import { SaborViewModel } from './../Sabores/sabor-view-model';
export class BebidaModelId {
  constructor(
    public id: string,
    public nome: string,
    public ml: number,
    public teorAlcoolico: number,
    public valorCusto: number,
    public valorVenda: number,
  ) {};
}
