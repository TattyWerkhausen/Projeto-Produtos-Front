import { FuncionarioViewModelId } from './../Paginas/Funcionarios/funcionario-view-model-id';
import { FuncionarioViewModel } from './../Paginas/Funcionarios/funcionario-view-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdentificacaoService {
  identificado = false;
  constructor(private httpService: HttpClient) {
  }
  conexaoApi = "https://localhost:44323/";

  chaveAcesso(chaveAcesso: string): Observable<FuncionarioViewModelId> {
    return this.httpService.get<FuncionarioViewModelId>(this.conexaoApi + 'api/Funcionario/funcionarioChaveAcesso/' + chaveAcesso);
  }
 // tentarIdentificar(chave: string): void {

    // logica para identificar
    // se a logica ocorrer com sucesso:
  //  this.identificado = true;
//  }
}
