import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IdentificacaoService } from './identificacao.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FuncionarioViewModelId } from '../Paginas/Funcionarios/funcionario-view-model-id';
import { ClienteService } from '../Paginas/Clientes/cliente.service';
import { FuncionarioService } from '../Paginas/Funcionarios/funcionario.service';
import { Injectable } from '@angular/core';
import { ClienteViewModelId } from '../Paginas/Clientes/cliente-view-model-id';

@Injectable({
  providedIn: 'root'
})
export class TipoAcessoService {
  readonly localStorageChave = {
    cliente: 'chaveCliente',
    funcionario: 'chaveFuncionario',
  }
  chaveFunci?: string | null;
  chaveCliente?: string | null;


  constructor() {
    this.chaveCliente = localStorage.getItem(this.localStorageChave.cliente);
    this.chaveFunci = localStorage.getItem(this.localStorageChave.funcionario);
    console.log(this.chaveFunci);
  }
  setarChaveFuncionario(chave: string): void {
    this.chaveFunci = chave;
    localStorage.setItem(this.localStorageChave.funcionario, this.chaveFunci);
    localStorage.removeItem(this.localStorageChave.cliente);
  }
  setarChaveCliente(chave: string): void {
    this.chaveCliente = chave;
    localStorage.setItem(this.localStorageChave.cliente, this.chaveCliente);
    localStorage.removeItem(this.localStorageChave.funcionario);
  }

  funcionarioEstaLogado(): boolean {
    const estaLogado = this.chaveFunci !== null && this.chaveFunci !== undefined && this.chaveFunci !== '';
    return estaLogado;
  }
  clienteEstaLogado(): boolean {
    const estaLogado = this.chaveCliente !== null && this.chaveCliente !== undefined && this.chaveCliente !== '';
    return estaLogado;
  }
}

