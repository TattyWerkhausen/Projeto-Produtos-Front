import { PedidoViewModel } from './pedido-view-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidoIdViewModel } from './pedido-id-view-model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private httpService: HttpClient) { }
  conexaoApi = "https://localhost:44323/api/Pedido/";
  cadastrar(cadastrarPedido: PedidoViewModel): Observable<any> {
    return this.httpService.post<any>(this.conexaoApi + 'cadastrarPedido', cadastrarPedido);
  }
  buscarTodos(): Observable<any> {
    return this.httpService.get<any>(this.conexaoApi + 'buscarTodosPedidos');
  }
  buscarPedidoId(id: string): Observable<PedidoIdViewModel> {
    return this.httpService.get<PedidoIdViewModel>(this.conexaoApi + 'buscarPedidoId/' + id);
  }
  buscarPedidoCliente(clienteNome: string): Observable<PedidoViewModel> {
    return this.httpService.get<PedidoViewModel>(this.conexaoApi + 'buscarPedidoNomeCliente/' + clienteNome)
  }
  buscarPedidoData(data: Date): Observable<PedidoViewModel> {
    return this.httpService.get<PedidoViewModel>(this.conexaoApi + 'buscarPedidoData/' + data);
  }
  editarPedidoId(id: string, dadosPedido: PedidoIdViewModel): Observable<any> {
    return this.httpService.put<any>(this.conexaoApi + 'editarPedidoId/' + id, dadosPedido);
  }
  editarPedidoCliente(clienteNome: string, dadosPedido: PedidoViewModel): Observable<any> {
    return this.httpService.put<any>(this.conexaoApi + 'editarPedidoCliente/' + clienteNome, dadosPedido);
  }
  editarPedidoData(data: Date, dadosPedido: PedidoViewModel): Observable<any> {
    return this.httpService.put<any>(this.conexaoApi + 'editarPedidoData/' + data, dadosPedido);
  }
  excluirPedidoId(id: string): Observable<any> {
    return this.httpService.delete<any>(this.conexaoApi + 'excluirPedido/' + id);
  }
  excluirPedidoCliente(clienteNome: string): Observable<any> {
    return this.httpService.delete<any>(this.conexaoApi + 'excluirPedidoNomeCliente/' + clienteNome);
  }
  excluirPedidoData(data: Date): Observable<any> {
    return this.httpService.delete<any>(this.conexaoApi + 'excluirPedidoData/' + data);
  }
}
