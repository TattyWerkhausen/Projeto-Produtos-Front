import { TipoAcessoService } from './../../../servicos-gerais/tipo-acesso.service';
import { Router } from '@angular/router';
import { PedidoService } from './../pedido.service';
import { PedidoIdViewModel } from './../pedido-id-view-model';
import { PedidoViewModel } from './../pedido-view-model';
import { FuncionarioViewModelId } from './../../Funcionarios/funcionario-view-model-id';
import { ClienteViewModelId } from './../../Clientes/cliente-view-model-id';
import { IdentificacaoService } from './../../../servicos-gerais/identificacao.service';
import { FuncionarioService } from './../../Funcionarios/funcionario.service';
import { ClienteService } from './../../Clientes/cliente.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-principal-pedido',
  templateUrl: './tela-principal-pedido.component.html',
  styleUrls: ['./tela-principal-pedido.component.css']
})
export class TelaPrincipalPedidoComponent implements OnInit {
  formulario: FormGroup;
  chaveCliente!: string;
  clienteAcessando?: ClienteViewModelId;
  chaveFunci!: string;
  funcionarioAcessando?: FuncionarioViewModelId;
  pedidoss: PedidoViewModel[] = [];

  constructor(private formBuilder: FormBuilder
    , private clienteService: ClienteService
    , private funcionarioService: IdentificacaoService
    , private pedidoService: PedidoService
    , private rota: Router
    , private tipoAcesso: TipoAcessoService) {
    this.formulario = formBuilder.group({
      chaveAcesso: formBuilder.control('')
    })
  }
  ngOnInit() {

  }
  funcionarioAcessandoAqui(): boolean {
    return this.tipoAcesso.funcionarioEstaLogado();
  }
  clienteAcessandoAqui(): boolean {
    console.log('this.tipoAcesso.clienteEstaLogado()');
    console.log(this.tipoAcesso.clienteEstaLogado());
    return this.tipoAcesso.clienteEstaLogado();
  }
  buscarTodosPedidos(): void {
    this.pedidoService.buscarTodos().subscribe(result => { this.pedidoss = result });
  }
  pedidos(): boolean {
    if (this.buscarTodosPedidos.length > 0)
      return true;
    return true;
  }
}
