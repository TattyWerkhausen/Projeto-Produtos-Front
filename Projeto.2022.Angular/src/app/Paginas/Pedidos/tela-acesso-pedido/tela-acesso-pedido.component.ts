import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-acesso-pedido',
  templateUrl: './tela-acesso-pedido.component.html',
  styleUrls: ['./tela-acesso-pedido.component.css']
})
export class TelaAcessoPedidoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  //preencher todos os dados detalhados do pedido
  preencherFormularioCompleto(){
const todosDados = 'todos os dados';
  }
  //preencher resumo do pedido como nome do cliente, data, numero de itens
  preencherFormularioResumido(){
    const resumo = 'dados resumidos';

  }
}
