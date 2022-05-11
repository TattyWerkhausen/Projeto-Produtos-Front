import { SaborViewModel } from './../Sabores/sabor-view-model';
export class BebidaModel {
  constructor(
    public nome: string,
    public teorAlcoolico: number,
    public valorCusto: number,
    public valorVenda: number,
  ) { };
}
