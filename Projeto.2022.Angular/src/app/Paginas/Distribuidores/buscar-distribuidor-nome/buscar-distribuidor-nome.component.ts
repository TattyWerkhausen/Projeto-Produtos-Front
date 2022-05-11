import { Router } from '@angular/router';
import { DistribuidorService } from './../distribuidor.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DistribuidorViewModelId } from './../distribuidor-view-model-id';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar-distribuidor-nome',
  templateUrl: './buscar-distribuidor-nome.component.html',
  styleUrls: ['./buscar-distribuidor-nome.component.css']
})
export class BuscarDistribuidorNomeComponent implements OnInit {

  formulario: FormGroup;
  distribuidorEncontrado?: DistribuidorViewModelId;

  exibirMensagemNaoEncontrado?: boolean;

  classeAlerta = {
    vermelhoEscuro: 'vermelho-escuro',
    vermelhoClaro: 'vermelho-claro',
    resultado: ''
  }
  constructor(private distribuidorService: DistribuidorService
    , private formBuilder: FormBuilder
    , private rota: Router) {
    this.formulario = formBuilder.group({
      nome: formBuilder.control('')
    });
    this.exibirMensagemNaoEncontrado = false;
  }
  ngOnInit() {
    setInterval(() => {
      if (this.classeAlerta.resultado === this.classeAlerta.vermelhoClaro) {
        this.classeAlerta.resultado = this.classeAlerta.vermelhoEscuro;
      }
      else if (this.classeAlerta.resultado === this.classeAlerta.vermelhoEscuro) {
        this.classeAlerta.resultado = this.classeAlerta.vermelhoClaro;
      }
    }, 300)
  }
  buscarDistribuidorNome(): void {
    const distri = this.formulario.controls['nome'].value;
    this.distribuidorService.buscarDistribuidorNome(distri).subscribe((result) => {
      this.distribuidorEncontrado = result;
      if (result === null || result === undefined) {
        this.classeAlerta.resultado = this.classeAlerta.vermelhoClaro;
      }
      this.exibirMensagemNaoEncontrado = true;
    });
  }
  distribuidorFoiEncontrado(): boolean {
    let distribuidorAchado: boolean;
    if (this.distribuidorEncontrado !== null && this.distribuidorEncontrado !== undefined) {
      distribuidorAchado = true;
    }
    else {
      distribuidorAchado = false;
    }
    return distribuidorAchado;
  }
  encerrarAposNadaEncontrado(): void {
    if (this.distribuidorFoiEncontrado() === undefined) {
      this.rota.navigateByUrl('/buscarDistribuidorNome');
    }
    this.exibirMensagemNaoEncontrado = false;
    this.formulario.reset();
  }
}
