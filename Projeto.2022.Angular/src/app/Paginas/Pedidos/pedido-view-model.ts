import { PedidoBebidaViewModel } from './pedido-bebida-view-model';
import { EnderecoViewModel } from './../Shared/endereco-view-model';
export class PedidoViewModel {
  constructor(
    public clienteId: string,
    public enderecoPedido: EnderecoViewModel,
    public listaPedidoBebida: PedidoBebidaViewModel[],
    public data: Date,
    public valorTotal: number,
  ) { }
}
