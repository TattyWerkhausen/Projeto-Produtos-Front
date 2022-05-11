import { AcrescentoViewModel } from './acrescento-view-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { AcrescentoViewModelId } from './acrescento-view-model-id';

@Injectable({
  providedIn: 'root'
})
export class AcrescentoService {

  constructor(private httpService: HttpClient) { }
  conexaoApi = "https://localhost:44323/api/Acrescento/";

  cadastrar(cadastrar: AcrescentoViewModel): Observable<any> {
    return this.httpService.post<any>(this.conexaoApi + 'registrarAcrescento', cadastrar);
  }
  buscarId(id: string): Observable<AcrescentoViewModelId> {
    return this.httpService.get<AcrescentoViewModelId>(this.conexaoApi + 'buscarAcrescentoId/' + id);
  }
  buscarNome(nome: string): Observable<AcrescentoViewModelId> {
    return this.httpService.get<AcrescentoViewModelId>(this.conexaoApi + 'buscarAcrescentoNome/' + nome);
  }
  buscarTodos(): Observable<any> {
    return this.httpService.get<any>(this.conexaoApi + 'buscarTodosAcrescentos');
  }
  editar(id: string, dados: AcrescentoViewModel): Observable<any> {
    return this.httpService.put<any>(this.conexaoApi + 'editarAcrescento/' + id, dados);
  }
  editarNome(nome: string, dados: AcrescentoViewModel): Observable<any> {
    return this.httpService.put<any>(this.conexaoApi + 'editarAcrescentoNome/' + nome, dados);
  }
  excluir(id: string): Observable<any> {
    return this.httpService.delete<any>(this.conexaoApi + 'excluirAcrescento/' + id);
  }
  excluirNome(nome: string): Observable<any> {
    return this.httpService.delete<any>(this.conexaoApi + 'excluirAcrescentoNome/' + nome);
  }
}
