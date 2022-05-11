import { Router } from '@angular/router';
import { FuncionarioService } from './../funcionario.service';
import { FuncionarioViewModelId } from './../funcionario-view-model-id';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { style } from '@angular/animations';

@Component({
  selector: 'app-buscar-funcionario-nome',
  templateUrl: './buscar-funcionario-nome.component.html',
  styleUrls: ['./buscar-funcionario-nome.component.css']
})
export class BuscarFuncionarioNomeComponent implements OnInit {
  formulario: FormGroup;

  funcionarioEncontrado?: FuncionarioViewModelId;
  classAlerta = {
    vermelhoEscuro: 'vermelho-escuro',
    vermelhoClaro: 'vermelho-claro',
    classSelecionada: ''
  }

  mensagemBuscarFuncionario?: boolean;

  constructor(private funcionarioService: FuncionarioService
    , private formBuilder: FormBuilder
    , private rota: Router) {
    this.formulario = formBuilder.group({
      nome: formBuilder.control('')
    });
    this.mensagemBuscarFuncionario = false;
  }

  ngOnInit() {
    setInterval(() => {
      if (this.classAlerta.classSelecionada === this.classAlerta.vermelhoEscuro) {
        this.classAlerta.classSelecionada = this.classAlerta.vermelhoClaro;
      } else if (this.classAlerta.classSelecionada === this.classAlerta.vermelhoClaro) {
        this.classAlerta.classSelecionada = this.classAlerta.vermelhoEscuro;
      }
    }, 300);
  }
  buscarFuncionarioNome(): void {
    const funcionario = this.formulario.controls['nome'].value;
    this.funcionarioService.buscarFuncionarioNome(funcionario).subscribe((result) => {
      this.funcionarioEncontrado = result;

      if (result === null || result === undefined) {
        this.classAlerta.classSelecionada = this.classAlerta.vermelhoClaro;
      }
      this.mensagemBuscarFuncionario = true;
    });
  }

  funcionarioFoiEncontrado(): boolean {
    let funcionarioFoiEncontrado: boolean;
    if (this.funcionarioEncontrado !== undefined && this.funcionarioEncontrado !== null) {
      funcionarioFoiEncontrado = true;
    } else {
      funcionarioFoiEncontrado = false;
    }
    return funcionarioFoiEncontrado;
  }
  /*haIdPreenchido(): boolean {
    const foiDigitado = this.formulario.controls['nome'].value.length > 0;
    if (foiDigitado) return true;
    else return false;
  }*/
  encerrarAposNenhumFuncionarioEncontrado(): void {
    if (this.funcionarioFoiEncontrado() === undefined)
      this.rota.navigateByUrl('/buscarFuncionarioNome');
    this.mensagemBuscarFuncionario = false;
    this.formulario.reset();
  }
}
