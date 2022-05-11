import { BebidaModelId } from './bebida-model-id';
import { BebidaModel } from './bebida-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';

@Injectable()
export class BebidaService {

constructor(private httpService:HttpClient) {}
 conexaoApi = "https://localhost:44323/";
 cadastrar(cadastroBebida:BebidaModel):Observable<any>{
   return this.httpService.post<any>(this.conexaoApi + 'api/Bebida/registrarBebida', cadastroBebida);
 }
 buscarTodasBebidas():Observable<BebidaModelId[]>{
   return this.httpService.get<BebidaModelId[]>(this.conexaoApi + 'api/Bebida/buscarTodasBebidas');
 }
 buscarBebidaId(id:string):Observable<BebidaModelId>{
   return this.httpService.get<BebidaModelId>(this.conexaoApi + 'api/Bebida/buscarBebida/' + id);
 }
 buscarBebidaNome(nome:string):Observable<BebidaModelId>{
  return this.httpService.get<BebidaModelId>(this.conexaoApi + 'api/Bebida/buscarBebidaNome/' + nome);
}
 editarBebida(id:string, bebidaEdicao:BebidaModel):Observable<any>{
   return this.httpService.put<any>(this.conexaoApi + 'api/Bebida/editarBebida/' + id, bebidaEdicao);
 }
 editarBebidaNome(nome:string, bebidaEdicao:BebidaModel):Observable<any>{
  return this.httpService.put<any>(this.conexaoApi + 'api/Bebida/editarBebidaNome/' + nome, bebidaEdicao);
}
 excluirBebida(id:string):Observable<any>{
   return this.httpService.delete<any>(this.conexaoApi + 'api/Bebida/excluirBebida/' + id);
 }
 excluirBebidaNome(nome:string):Observable<any>{
  return this.httpService.delete<any>(this.conexaoApi + 'api/Bebida/excluirBebidaNome/' + nome);
}
}
