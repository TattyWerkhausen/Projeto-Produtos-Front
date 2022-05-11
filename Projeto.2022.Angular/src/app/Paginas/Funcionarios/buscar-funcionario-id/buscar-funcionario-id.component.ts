import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FuncionarioService } from './../funcionario.service';
import { FuncionarioViewModelId } from './../funcionario-view-model-id';
import { Component, Directive, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-buscar-funcionario-id',
  templateUrl: './buscar-funcionario-id.component.html',
  styleUrls: ['./buscar-funcionario-id.component.css']
})
export class BuscarFuncionarioIdComponent implements OnInit {
  formulario: FormGroup;

  //objeto do tipo funcionario ainda sem valor definido
  funcionarioEncontrado?: FuncionarioViewModelId;

  //classe de alerta que chama o objeto de acordo com a escolha selecionada
  classAlerta = {
    vermelhoEscuro: 'vermelho-escuro',
    vermelhoClaro: 'vermelho-claro',
    classSelecionada: ''
  }
  // OU
  //
  //variavel boleana que dirá se exibe a mensagem e aonde sera verdadeira para exibir
  exibirMensagemBuscaInvalida?: boolean;

  constructor(private funcionarioService: FuncionarioService
    , private formBuilder: FormBuilder
    , private rota: Router
  ) {
    //seta o que sera digitado, neste caso um id do formulario
    this.formulario = formBuilder.group({
      id: formBuilder.control('')
    });
    //seta a mensagem como inexistente quando apenas digitado no campo
    this.exibirMensagemBuscaInvalida = false;
  }

  ngOnInit() {
    //metodo que cria alerta e troca a cor do alerta a cada x segundos,
    // usando a classe de alerta conforme selecao
    setInterval(() => {
      //se a classe alerta selecionada for vermelho escuro
      if (this.classAlerta.classSelecionada === this.classAlerta.vermelhoEscuro) {
        //ela muda para vermelho claro a cada 0,3 segundos
        this.classAlerta.classSelecionada = this.classAlerta.vermelhoClaro;
      } else if (this.classAlerta.classSelecionada === this.classAlerta.vermelhoClaro) {
        this.classAlerta.classSelecionada = this.classAlerta.vermelhoEscuro;
      }
    }, 300);
  }
  //metodo do botao buscar
  buscarFuncionarioId(): void {
    //id digitado pelo usuario
    const funcionarioId = this.formulario.controls['id'].value;
    //busca na service que esta indo na API e conferindo se id existe la, ai armazena no result
    this.funcionarioService.buscarFuncionarioId(funcionarioId).subscribe((result) => {
      //aqui meu objeto funcionarioEncontrado recebe o valor que result retornou da API
      this.funcionarioEncontrado = result;
      //se o resultado for indefinido ou nulo recebe a classe do metodo setInterval
      if (result === undefined || result === null) {
        this.classAlerta.classSelecionada = this.classAlerta.vermelhoClaro;
      }
      //exibe a mensagem se o funcionario nao for encontrado
      this.exibirMensagemBuscaInvalida = true;
    });
  }
  //metodo que verifica se o funcionario foi achado ou nao
  funcionarioFoiEncontrado(): boolean {
    //variavel que recebera o valor existente ou nao
    let funcionarioFoiEncontrado: boolean;
    //o funcionarioEncontrado recebeu o result na busca da API e agora esta sendo conferido
    //se ele é diferente de nulo ou indefinido, ai ele é verdadeiro, ou seja ELE EXISTE
    if (this.funcionarioEncontrado !== undefined && this.funcionarioEncontrado !== null) {
      //existe
      funcionarioFoiEncontrado = true;
    } else {
      //nao existe
      funcionarioFoiEncontrado = false;
    }
    //retona o valor this.funcionarioEncontrado, seja existente, ou nao
    return funcionarioFoiEncontrado;
  }

  /*
  metodo que verifica se foi digitado algo
   haIdPreenchido(): boolean {
     const foiDigitado = this.formulario.controls['id'].value.length > 0;
     if (foiDigitado) return true;
     else return false;
   }*/

  //metodo que encerra a busca atual fecha o alerta e limpa o input,
  // atualizando a busca para uma nova tentativa
  encerrarAposNenhumFuncionarioEncontrado(): void {
    //verifica se o metodo funcionarioFoiEncontrado for igual a  indefinido
    if (this.funcionarioFoiEncontrado() === undefined)
      //redireciona para a mesma pagina de busca apos clicar no botao que chama o encerrar
      this.rota.navigateByUrl('/buscarFuncionario');
    //para de exibir a mensagem
    this.exibirMensagemBuscaInvalida = false;
    //limpa o formulario
    this.formulario.reset();
  }
}
