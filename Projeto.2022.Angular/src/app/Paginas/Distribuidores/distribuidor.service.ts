import { DistribuidorViewModelId } from './distribuidor-view-model-id';
import { Observable } from 'rxjs';
import { DistribuidorViewModel } from './distribuidor-view-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DistribuidorService {

  constructor(private httpService:HttpClient) { }
  conexaoApi = "https://localhost:44323/";
   cadastrar(cadastroDistribuidor:DistribuidorViewModel):Observable<any>{
     return this.httpService.post<any>(this.conexaoApi + 'api/Distribuidor/cadastrarDistribuidor', cadastroDistribuidor);
   }
   buscarTodosDistribuidores():Observable<DistribuidorViewModelId[]>{
     return this.httpService.get<DistribuidorViewModelId[]>(this.conexaoApi + 'api/Distribuidor/buscarTodosDistribuidores');
   }
   buscarDistribuidorChave(chave:string):Observable<DistribuidorViewModelId>{
    return this.httpService.get<DistribuidorViewModelId>(this.conexaoApi + 'api/Distribuidor/buscarDistribuidorChave/' + chave);
   }
   buscarDistribuidorId(id:string):Observable<DistribuidorViewModelId>{
     return this.httpService.get<DistribuidorViewModelId>(this.conexaoApi + 'api/Distribuidor/buscarDistribuidorId/' + id);
   }
   buscarDistribuidorNome(nome:string):Observable<DistribuidorViewModelId>{
    return this.httpService.get<DistribuidorViewModelId>(this.conexaoApi + 'api/Distribuidor/buscarDistribuidorNome/' + nome);
  }
   editarDistribuidor(id:string, DistribuidorEdicao:DistribuidorViewModel):Observable<any>{
     return this.httpService.put<any>(this.conexaoApi + 'api/Distribuidor/editarDistribuidor/' + id, DistribuidorEdicao);
   }
   editarDistribuidorNome(nome:string, DistribuidorEdicao:DistribuidorViewModel):Observable<any>{
    return this.httpService.put<any>(this.conexaoApi + 'api/Distribuidor/editarDistribuidorNome/' + nome, DistribuidorEdicao);
  }
   excluirDistribuidor(id:string):Observable<any>{
     return this.httpService.delete<any>(this.conexaoApi + 'api/Distribuidor/excluirDistribuidor/' + id);
   }
   excluirDistribuidorNome(nome:string):Observable<any>{
    return this.httpService.delete<any>(this.conexaoApi + 'api/Distribuidor/excluirDistribuidorNome/' + nome);
  }
}
