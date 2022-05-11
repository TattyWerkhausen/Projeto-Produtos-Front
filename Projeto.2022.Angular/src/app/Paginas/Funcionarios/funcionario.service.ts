import { FuncionarioViewModelId } from './funcionario-view-model-id';
import { FuncionarioViewModel } from './funcionario-view-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

constructor(private httpService:HttpClient) { }
conexaoApi = "https://localhost:44323/";
 cadastrar(cadastroFuncionario:FuncionarioViewModel):Observable<any>{
   return this.httpService.post<any>(this.conexaoApi + 'api/Funcionario/registrarFuncionario', cadastroFuncionario);
 }
 buscarTodosFuncionarios():Observable<FuncionarioViewModelId[]>{
   return this.httpService.get<FuncionarioViewModelId[]>(this.conexaoApi + 'api/Funcionario/buscarTodosFuncionarios');
 }
 buscarFuncionarioId(id:string):Observable<FuncionarioViewModelId>{
   return this.httpService.get<FuncionarioViewModelId>(this.conexaoApi + 'api/Funcionario/buscarFuncionario/' + id);
 }
 buscarFuncionarioNome(nome:string):Observable<FuncionarioViewModelId>{
  return this.httpService.get<FuncionarioViewModelId>(this.conexaoApi + 'api/Funcionario/buscarFuncionarioNome/' + nome);
}
 editarFuncionario(id:string, FuncionarioEdicao:FuncionarioViewModel):Observable<any>{
   return this.httpService.put<any>(this.conexaoApi + 'api/Funcionario/editarFuncionario/' + id, FuncionarioEdicao);
 }
 editarFuncionarioNome(nome:string, FuncionarioEdicao:FuncionarioViewModel):Observable<any>{
  return this.httpService.put<any>(this.conexaoApi + 'api/Funcionario/editarFuncionarioNome/' + nome, FuncionarioEdicao);
}
 excluirFuncionario(id:string):Observable<any>{
   return this.httpService.delete<any>(this.conexaoApi + 'api/Funcionario/excluirFuncionario/' + id);
 }
 excluirFuncionarioNome(nome:string):Observable<any>{
  return this.httpService.delete<any>(this.conexaoApi + 'api/Funcionario/excluirFuncionarioNome/' + nome);
}
}
