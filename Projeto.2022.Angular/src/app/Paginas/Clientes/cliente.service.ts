import { ClienteViewModelId } from './cliente-view-model-id';
import { Observable, observable } from 'rxjs';
import { ClienteViewModel } from './cliente-view-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private httpService: HttpClient) { }
  conexaoApi = "https://localhost:44323/";
  cadastrarCliente(cadastrarCliente: ClienteViewModel): Observable<any> {
    return this.httpService.post<any>(this.conexaoApi + 'api/Cliente/cadastrarCliente', cadastrarCliente);
  }
  buscarTodosClientes(): Observable<ClienteViewModelId[]> {
    return this.httpService.get<ClienteViewModelId[]>(this.conexaoApi + 'api/Cliente/buscarTodosClientes');
  }
  buscarClienteId(id: string): Observable<ClienteViewModelId> {
    return this.httpService.get<ClienteViewModelId>(this.conexaoApi + 'api/Cliente/buscarClienteId/' + id);
  }
  buscarClienteNome(nome: string): Observable<ClienteViewModelId> {
    return this.httpService.get<ClienteViewModelId>(this.conexaoApi + 'api/Cliente/buscarClienteNome/' + nome);
  }
  buscarClienteChave(chave: string): Observable<ClienteViewModelId> {
    return this.httpService.get<ClienteViewModelId>(this.conexaoApi + 'api/Cliente/buscarClienteChave/' + chave);
  }
  editarCliente(id: string, cliente: ClienteViewModel): Observable<any> {
    return this.httpService.put<any>(this.conexaoApi + 'api/Cliente/editarCliente/' + id, cliente);
  }
  editarClienteNome(nome: string, cliente: ClienteViewModel): Observable<any> {
    return this.httpService.put<any>(this.conexaoApi + 'api/Cliente/editarClienteNome/' + nome, cliente);
  }
  excluirCliente(id: string): Observable<any> {
    return this.httpService.delete<any>(this.conexaoApi + 'api/Cliente/excluirCliente/' + id);
  }
  excluirClienteNome(nome: string): Observable<any> {
    return this.httpService.delete<any>(this.conexaoApi + 'api/Cliente/excluirClienteNome/' + nome);
  }
  editarClienteChave(chave: string, cliente: ClienteViewModel): Observable<any> {
    return this.httpService.put<any>(this.conexaoApi + 'api/Cliente/atualizarDadosClienteChave/' + chave, cliente);
  }

}
