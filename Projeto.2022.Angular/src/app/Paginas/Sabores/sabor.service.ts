import { SaborViewModelId } from './sabor-view-model-id';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SaborViewModel } from './sabor-view-model';

@Injectable({
  providedIn: 'root'
})
export class SaborService {

  constructor(private httpService: HttpClient) { }
  conexaoApi = "https://localhost:44323/api/Sabor/";
  cadastrar(cadastrarSabor: SaborViewModel): Observable<any> {
    return this.httpService.post<any>(this.conexaoApi + 'registrarSabor', cadastrarSabor);
  }
  buscarSabor(id: string): Observable<SaborViewModelId> {
    return this.httpService.get<SaborViewModelId>(this.conexaoApi + 'buscarSabor/' + id);
  }
  buscarSaborNome(nome: string): Observable<SaborViewModelId> {
    return this.httpService.get<SaborViewModelId>(this.conexaoApi + 'buscarSaborNome/' + nome);
  }
  buscarTodos(): Observable<SaborViewModelId[]> {
    return this.httpService.get<SaborViewModelId[]>(this.conexaoApi + 'buscarTodosSabores');
  }
  editar(id: string, editarSabor: SaborViewModel): Observable<any> {
    return this.httpService.put<any>(this.conexaoApi + 'editarSabor/' + id, editarSabor);
  }
  editarNome(nome: string, editarSabor: SaborViewModel): Observable<any> {
    return this.httpService.put<any>(this.conexaoApi + 'editarSaborNome/' + nome, editarSabor);
  }
  excluir(id: string): Observable<any> {
    return this.httpService.delete<any>(this.conexaoApi + 'excluirSabor/' + id);
  }
  excluirNome(nome: string): Observable<any> {
    return this.httpService.delete<any>(this.conexaoApi + 'excluirSaborNome/' + nome);
  }
}

