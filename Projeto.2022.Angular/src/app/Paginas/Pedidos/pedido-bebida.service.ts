import { SaborViewModelId } from './../Sabores/sabor-view-model-id';
import { MlViewModelId } from './../Mls/ml-view-model-id';
import { BebidaModelId } from './../Bebidas/bebida-model-id';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidoBebidaServiceService {

constructor(private httpService:HttpClient) { }
conexaoApi = "https://localhost:44323/api/";

buscarTodosAcrescentos(): Observable<any> {
  return this.httpService.get<any>(this.conexaoApi + 'Acrescento/buscarTodosAcrescentos');
}
buscarTodasBebidas():Observable<BebidaModelId[]>{
  return this.httpService.get<BebidaModelId[]>(this.conexaoApi + 'Bebida/buscarTodasBebidas');
}
buscarTodosMl(): Observable<MlViewModelId[]> {
  return this.httpService.get<MlViewModelId[]>(this.conexaoApi + 'Ml/buscarTodosMl');
}
buscarTodosSabores(): Observable<SaborViewModelId[]> {
  return this.httpService.get<SaborViewModelId[]>(this.conexaoApi + 'Sabor/buscarTodosSabores');
}
}
