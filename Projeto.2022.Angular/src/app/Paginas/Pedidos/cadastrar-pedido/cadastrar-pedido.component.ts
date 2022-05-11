import { PedidoBebidaViewModel } from './../pedido-bebida-view-model';
import { PedidoIdViewModel } from './../pedido-id-view-model';
import { PedidoService } from './../pedido.service';
import { SaborService } from './../../Sabores/sabor.service';
import { MlServiceService } from './../../Mls/ml-service.service';
import { AcrescentoService } from './../../Acrescentos/acrescento.service';
import { SaborViewModelId } from './../../Sabores/sabor-view-model-id';
import { AcrescentoViewModelId } from './../../Acrescentos/acrescento-view-model-id';
import { MlViewModelId } from './../../Mls/ml-view-model-id';
import { PedidoBebidaServiceService } from './../pedido-bebida.service';
import { ClienteViewModelId } from './../../Clientes/cliente-view-model-id';
import { BebidaModelId } from './../../Bebidas/bebida-model-id';
import { BebidaService } from './../../Bebidas/bebida.service';
import { ClienteService } from './../../Clientes/cliente.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PedidoViewModel } from './../pedido-view-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-pedido',
  templateUrl: './cadastrar-pedido.component.html',
  styleUrls: ['./cadastrar-pedido.component.css']
})
export class CadastrarPedidoComponent implements OnInit {

  formulario: FormGroup;

  //lista vazia de clientes
  clientes: ClienteViewModelId[] = [];

  //variavel utilizada como auxiliar para criar um id TEMPORARIO para o control de pedido bebida
  // através desse id gerado, sera possivel obter o control de pedido bebida referenciando o id dado a ele.
  // cada vez que esse valor muda, o anterior fica salvo na lista de pedidoBebidasAdicionadas
  pedidoBebidaAdicionadoId = 0;

  // lista vazia que vai receber IDS TEMPORARIOS (cada id gerado pela variavel pedidoBebidaAdicionadoId)
  // utilizado para posteriomente resgatar um control de pedido bebida
  pedidoBebidasAdicionadas: number[] = [];

  //lista vazia de bebidas
  bebidas: BebidaModelId[] = [];

  //lista vazia de mls
  mls: MlViewModelId[] = [];

  //lista vazia de acrescentos
  acrescentos: AcrescentoViewModelId[] = [];

  //lista vazia de sabores
  sabores: SaborViewModelId[] = [];

  //lista vazia de pedidos bebidas
  pedidosBebidas: PedidoBebidaViewModel[] = [];

  constructor(private formBuilder: FormBuilder
    , private clienteService: ClienteService
    , private pedidoBebidaService: PedidoBebidaServiceService
    , private bebidaService: BebidaService
    , private acrescentoService: AcrescentoService
    , private mlService: MlServiceService
    , private saborService: SaborService
    , private pedidoService: PedidoService) {

    //campos que serao exibidos no pedido
    this.formulario = formBuilder.group({
      clienteId: formBuilder.control(''),

      enderecoPedido: formBuilder.group({
        uf: formBuilder.control(''),
        cep: formBuilder.control(''),
        cidade: formBuilder.control(''),
        bairro: formBuilder.control(''),
        rua: formBuilder.control(''),
        numero: formBuilder.control(''),
        complemento: formBuilder.control('')
      }),
      data: formBuilder.control(''),
      valorTotal: formBuilder.control('')
    });
    //buscando todos clientes da api e armazenando na lista de clientes
    clienteService.buscarTodosClientes().subscribe({
      next: (clienteApi) => { this.clientes = clienteApi; }
    });
    bebidaService.buscarTodasBebidas().subscribe({
      next: bebidasApi => {
        this.bebidas = bebidasApi;
      }
    });
    mlService.buscarTodos().subscribe({
      next: mlsApi => {
        this.mls = mlsApi;
      }
    });
    acrescentoService.buscarTodos().subscribe({
      next: acrescentosApi => {
        this.acrescentos = acrescentosApi;
      }
    });
    saborService.buscarTodos().subscribe({
      next: saboresApi => {
        this.sabores = saboresApi;
      }
    });
  }
  ngOnInit() {
  }
  //metodo que adiciona cada formulario para preenchimento do pedido bebida no pedido
  addPedidoBebida(): void {
    this.formulario.addControl('pedidoBebida-' + this.pedidoBebidaAdicionadoId, this.formBuilder.group({
      id: this.formBuilder.control(''),
      bebidaId: this.formBuilder.control(''),
      mlId: this.formBuilder.control(''),
      acrescentoId: this.formBuilder.control(''),
      valorSubTotal: this.formBuilder.control(''),
      pedidoId: this.formBuilder.control(''),
      saborId: this.formBuilder.control('')
    }))
    //adicionando o ID TEMPORARIO (pedidoBebidaAdicionadoId) do pedido bebida na lista de pedidos bebidas
    this.pedidoBebidasAdicionadas.push(this.pedidoBebidaAdicionadoId);

    // incrementa o valor para o proximo id, assim gerando sempre um id diferente para o control
    this.pedidoBebidaAdicionadoId++;
  }
  salvarPedido(): void {
    const pedidoNovo = new PedidoViewModel(
      this.formulario.controls['clienteId'].value,
      this.formulario.controls['enderecoPedido'].value,
      this.formulario.controls['listaPedidoBebida'].value,
      this.formulario.controls['data'].value,
      this.formulario.controls['valorTotal'].value,
    )
    this.pedidoService.cadastrar(pedidoNovo).subscribe({
      next: result => {
        this.formulario.controls['clienteId'].setValue('');

        this.formulario.controls['enderecoPedido'].setValue('');

        this.formulario.controls['listaPedidoBebida'].setValue('');

        this.formulario.controls['data'].setValue('');

        this.formulario.controls['valorTotal'].setValue('');
      }
    })
    this.formulario.reset();
  }
  subTotal(pedidoBebidaAdicionadoId: number): number {
    console.log('teste');
    let bebidaValor;
    let valorMl;
    let valorAcrescento;
    let saborValor;
    //variavel que recebe os dados do formulario de pedido bebida
    const valorFormularioPedidoBebida = this.formulario.get('pedidoBebida-' + pedidoBebidaAdicionadoId)!.value;

    //variavel que recebe o resultado de - percorrer a lista de bebidas, buscar o id da bebida e comparar, se ela for igual ao valor da
    // bebidaId passado no formulario acima
    const bebidaSelecionado = this.bebidas.find(be => be.id === valorFormularioPedidoBebida.bebidaId) as BebidaModelId;
    if (bebidaSelecionado === undefined) {
      bebidaValor = 0;
    }
    else {
      //aqui já com o valor armazenado acesso o valor de venda
      bebidaValor = bebidaSelecionado.valorVenda;
    }
    const mlSelecionado = this.mls.find(ml => ml.id === valorFormularioPedidoBebida.mlId) as MlViewModelId;
    if (mlSelecionado === undefined) {
      valorMl = 0;
    }
    else {
      valorMl = mlSelecionado.valorVenda;
    }

    const acrescentoSelecionado = this.acrescentos.find(acre => acre.id === valorFormularioPedidoBebida.acrescentoId) as AcrescentoViewModelId;
    if (acrescentoSelecionado === undefined) {
      valorAcrescento = 0;
    }
    else {
      valorAcrescento = acrescentoSelecionado.valorVenda;
    }

    const saborSelecionado = this.sabores.find(sa => sa.id === valorFormularioPedidoBebida.saborId) as SaborViewModelId;
    if (saborSelecionado === undefined) {
      saborValor = 0;
    }
    else {
      saborValor = saborSelecionado.valorVenda;
    }

    // const pedidoB = this.pedidosBebidas.filter(pe => pe.valorSubTotal);
    const soma = bebidaValor + valorMl + valorAcrescento + saborValor;
    return soma;
  }
}
