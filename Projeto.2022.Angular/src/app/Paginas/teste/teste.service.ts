import { EnderecoTesteViewModel, MlViewModelTeste } from './endereco-teste.viewmodel';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TesteService {

  constructor() { }

  buscarEnderecosPadroes(): Observable<EnderecoTesteViewModel[]> {
    return of([new EnderecoTesteViewModel('sagres', 125), new EnderecoTesteViewModel('presidente lucena', 7)])
  }

  buscarMls(): Observable<MlViewModelTeste []> {
    return of([new MlViewModelTeste('1', '250 ml'), new MlViewModelTeste('2', '500 ml')])
  }
}
