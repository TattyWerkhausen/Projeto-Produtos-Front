import { Router } from '@angular/router';
import { DistribuidorService } from './../distribuidor.service';
import { DistribuidorViewModelId } from './../distribuidor-view-model-id';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar-distribuidor-id',
  templateUrl: './buscar-distribuidor-id.component.html',
  styleUrls: ['./buscar-distribuidor-id.component.css']
})
export class BuscarDistribuidorIdComponent implements OnInit {
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
      id: formBuilder.control('')
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
  buscarDistribuidorId(): void {
    const distribuidorId = this.formulario.controls['id'].value;
    this.distribuidorService.buscarDistribuidorId(distribuidorId).subscribe((result) => {
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
      this.rota.navigateByUrl('/buscarDistribuidor');
    }
    this.exibirMensagemNaoEncontrado = false;
    this.formulario.reset();
  }
}
