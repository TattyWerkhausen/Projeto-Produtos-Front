import { PedidoBebidaAcrecento } from './pedido-interfaces';
import { EnderecoViewModel } from './../../Shared/endereco-view-model';
import { Router, ActivatedRoute } from '@angular/router';
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
  // Acesso todos os dados do cliente inclusive ao endereço
  dadosDoCliente?: ClienteViewModelId;

  // Formulario é o recurso com campos preenchíveis utilizados para coleta de dados. Como instrumentos de armazenamento, para a sistematização de informações.
  // Neste caso pegando dados do pedido para salvar
  formulario: FormGroup;

  //variavel utilizada como auxiliar para criar um id TEMPORARIO para o control de pedido bebida
  // através desse id gerado, sera possivel obter o control de pedido bebida referenciando o id dado a ele.
  // cada vez que esse valor muda, o anterior fica salvo na lista de pedidoBebidasAdicionadas
  pedidoBebidaAdicionadoId = 0;

  acrescentoAdicionadoId = 0;

  //enderecoAdicionadoId = 0;

  // lista vazia que vai receber IDS TEMPORARIOS (cada id gerado pela variavel pedidoBebidaAdicionadoId)
  // utilizado para posteriomente resgatar um control de pedido bebida
  pedidoBebidasAdicionadas: number[] = [];

  acrescentoAdicionados: PedidoBebidaAcrecento[] = [];

  // enderecosAdicionados: number[] = [];

  // Lista vazia de clientes que será preenchida com a busca de todos os clientes do banco de dados
  clientes: ClienteViewModelId[] = [];

  //lista vazia de bebidas
  bebidas: BebidaModelId[] = [];

  //lista vazia de mls
  mls: MlViewModelId[] = [];

  //lista vazia de acrescentos
  acrescentos: AcrescentoViewModelId[] = [];

  //lista vazia de sabores
  sabores: SaborViewModelId[] = [];

  //lista vazia de pedidos bebidas
  //pedidosBebidas: PedidoBebidaViewModel[] = [];

  constructor(private formBuilder: FormBuilder
    , private clienteService: ClienteService
    , private pedidoBebidaService: PedidoBebidaServiceService
    , private bebidaService: BebidaService
    , private acrescentoService: AcrescentoService
    , private mlService: MlServiceService
    , private saborService: SaborService
    , private pedidoService: PedidoService
    , private rota: Router
    , private rotaAtiva: ActivatedRoute) {

    //campos que serao exibidos no pedido para preenchimento
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

    // cria uma inscrição para sempre que o id do cliente mudar no formulario, executar uma ação
    this.formulario.get('clienteId')?.valueChanges.subscribe((valorClienteId: string) => {
      this._buscarEnderecoClientePorId(valorClienteId);
    });

    // Buscando todos os clientes na api e armazenando na lista de clientes
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
  // Metodo privado(privado quando apenas usado no TS)
  // Tem como parametro o clienteId - acessa a api atraves da service e busca este cliente atravez do id passado no parametro, e busca todos os dados do cliente correspondente deste id
  // O subscribe serve para informar o que deverá ser feito com o dado que irá receber, neste caso o subscribe transcreve o recebido para a variavel result que criei,
  // E a variavel dadosDoCliente recebe os dados armazenados no result.
  // Feito isso chama o metodo de preencher formulario com o endereco achado atravez do cliente(pois nos dados do cliente está incluso o endereço dele)
  private _buscarEnderecoClientePorId(clienteId: string) {
    this.clienteService.buscarClienteId(clienteId).subscribe((result) => {
      this.dadosDoCliente = result;
      this._preencherFormulario();
    });
  }
  // Metodo que preenche o endereço atravez do...
  // Formulario - acessa o control enderecoPedido - seta o valor do enderecoModel que está Registrado nos dadosdoCliente(this.dadosDoCliente?.enderecoModel)
  private _preencherFormulario() {
    this.formulario.controls['enderecoPedido'].setValue(this.dadosDoCliente?.enderecoModel);
  }
  ngOnInit() {
  }
  // Metodo que adiciona cada subformulario para preenchimento do pedido bebida no pedido
  addPedidoBebida(): void {
    this.formulario.addControl('pedidoBebida-' + this.pedidoBebidaAdicionadoId, this.formBuilder.group({
      id: this.formBuilder.control(''),
      bebidaId: this.formBuilder.control(''),
      mlId: this.formBuilder.control(''),
      valorSubTotal: this.formBuilder.control(''),
      pedidoId: this.formBuilder.control(''),
      saborId: this.formBuilder.control(''),

    }));
    //adicionando o ID TEMPORARIO (pedidoBebidaAdicionadoId) do pedido bebida na lista de pedidos bebidas
    this.pedidoBebidasAdicionadas.push(this.pedidoBebidaAdicionadoId);

    // incrementa o valor para o proximo id, assim gerando sempre um id diferente para o control
    this.pedidoBebidaAdicionadoId++;
  }
  //subformulario de acrescentos
  addAcrescento(pedidoBebidaId: number): void {
    const formularioPedidoBebida = this.formulario.get('pedidoBebida-' + pedidoBebidaId) as FormGroup;
    formularioPedidoBebida.addControl('acrescento-' + this.acrescentoAdicionadoId, this.formBuilder.group({
      acrescentoId: this.formBuilder.control(''),
    }));
    const pedidoBebidaAcrecentosIds = new PedidoBebidaAcrecento(pedidoBebidaId, this.acrescentoAdicionadoId);
    this.acrescentoAdicionados.push(pedidoBebidaAcrecentosIds);
    this.acrescentoAdicionadoId++;
  }
  salvarPedido(): void {
    let pedidoBebidaViewModel: PedidoBebidaViewModel[] = [];
    for (let cont = 0; cont < this.pedidoBebidasAdicionadas.length; cont++) {
      let contador = this.pedidoBebidasAdicionadas[cont];
      // let pedidoBebida = new PedidoBebidaViewModel(contador.id, contador.bebidaId, contador.mlId,
      //   contador.acrescentoId, contador.valorSubTotal, contador.pedidoId, contador.saborId);
      // pedidoBebidaViewModel.push(pedidoBebida);
    }
    const pedidoNovo = new PedidoViewModel(
      this.formulario.controls['clienteId'].value,
      new EnderecoViewModel(
        this.formulario.controls['enderecoPedido'].value['uf'],
        this.formulario.controls['enderecoPedido'].value['cep'],
        this.formulario.controls['enderecoPedido'].value['cidade'],
        this.formulario.controls['enderecoPedido'].value['bairro'],
        this.formulario.controls['enderecoPedido'].value['rua'],
        this.formulario.controls['enderecoPedido'].value['numero'],
        this.formulario.controls['enderecoPedido'].value['complemento'],
      ),
      pedidoBebidaViewModel,
      this.formulario.controls['data'].value,
      this.valorTotalDoPedido(),
    );
    this.pedidoService.cadastrar(pedidoNovo).subscribe(result => {
      this.rota.navigateByUrl('/telaPrincipalPedidos');
    })


  }

  addOutroEndereco(): void {
    this.formulario.addControl('enderecoPedido', this.formBuilder.group({
      uf: this.formBuilder.control(''),
      cep: this.formBuilder.control(''),
      cidade: this.formBuilder.control(''),
      bairro: this.formBuilder.control(''),
      rua: this.formBuilder.control(''),
      numero: this.formBuilder.control(''),
      complemento: this.formBuilder.control('')
    }))
    this.formulario.controls['enderecoPedido'].reset();
  }
  valorTotalDoPedido(): number {
    let total = 0;
    for (let pedidoBebida = 0; pedidoBebida < this.pedidoBebidasAdicionadas.length; pedidoBebida++) {
      let idPedidoBebida = this.pedidoBebidasAdicionadas[pedidoBebida];
      this.pedidoBebidasAdicionadas[pedidoBebida];
      let subTotalPB = this.subTotal(idPedidoBebida);
      total += subTotalPB;
    }

    return total;
  }
  subTotal(pedidoBebidaAdicionadoId: number): number {
    let bebidaValor;
    let valorMl;
    let valorAcrescento;
    let valorAcrescentoSubForm;
    let saborValor;

    //variavel que recebe os dados do formulario de pedido bebida
    const valorFormularioPedidoBebida = this.formulario.get('pedidoBebida-' + pedidoBebidaAdicionadoId)!.value;

    //variavel que recebe o resultado da seleção feita lá no formulario, percorre a lista de bebidas, buscar o id da bebida e comparar, se ela for
    //igual ao valor da bebidaId passado no formulario acima
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
    const valorAcrecento = this.subTotalAcrecento(pedidoBebidaAdicionadoId);
    const soma = bebidaValor + valorMl + saborValor + valorAcrecento;
    return soma;
  }

  subTotalAcrecento(pedidoBebidaAdicionadoId: number): number {
    const pedidoBebida = this.formulario.get('pedidoBebida-' + pedidoBebidaAdicionadoId)!.value;
    const acrecentos = this.acrecentosPorBebidas(pedidoBebidaAdicionadoId);
    let valorTotal = 0;
    for (let contador = 0; contador < acrecentos.length; contador++) {
      const pedidoBebidaAcrecentoIds = acrecentos[contador];
      valorTotal += this._obterValorAcrecento(pedidoBebidaAcrecentoIds);

    }
    return valorTotal;
  }
  private _obterValorAcrecento(pedidoBebidaAcrecentoIds: PedidoBebidaAcrecento): number {

    const acrescento = this.acrescentos.find(acre => acre.id) as AcrescentoViewModelId;
    const valorAcre = acrescento.valorVenda;
    return valorAcre;
  }

  acrecentosPorBebidas(pedidoBebidaAddId: number): PedidoBebidaAcrecento[] {
    const acrecentosPorPedido = this.acrescentoAdicionados
      .filter(acrecento => acrecento.pedidoBebidaAddId === pedidoBebidaAddId);
    return acrecentosPorPedido;
  }

}
