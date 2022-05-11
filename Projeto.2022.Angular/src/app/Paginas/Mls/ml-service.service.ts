import { MlViewModelId } from './ml-view-model-id';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MlViewModel } from './ml-view-model';

@Injectable({
  providedIn: 'root'
})
export class MlServiceService {

  constructor(private httpService: HttpClient) { }
  conexaoApi = "https://localhost:44323/api/Ml/";
  cadastrar(cadastrarMl: MlViewModel): Observable<any> {
    return this.httpService.post<any>(this.conexaoApi + 'registrarMl', cadastrarMl);
  }
  buscarMlId(id: string): Observable<MlViewModelId> {
    return this.httpService.get<MlViewModelId>(this.conexaoApi + 'buscarMlId/' + id);
  }
  buscarMl(ml: number): Observable<MlViewModelId> {
    return this.httpService.get<MlViewModelId>(this.conexaoApi + 'buscarMl/' + ml);
  }
  buscarTodos(): Observable<MlViewModelId[]> {
    return this.httpService.get<MlViewModelId[]>(this.conexaoApi + 'buscarTodosMl');
  }
  editarMlId(id: string, editarMl: MlViewModel): Observable<any> {
    return this.httpService.put<any>(this.conexaoApi + 'editarMlId/' + id, editarMl);
  }
  editarMl(ml: number, editarMl: MlViewModel): Observable<any> {
    return this.httpService.put<any>(this.conexaoApi + 'editarMl/' + ml, editarMl);
  }
  excluir(id: string): Observable<any> {
    return this.httpService.delete<any>(this.conexaoApi + 'excluirMlId/' + id);
  }
  excluirMl(ml:number): Observable<any> {
    return this.httpService.delete<any>(this.conexaoApi + 'excluirMl/' + ml);
  }
}

