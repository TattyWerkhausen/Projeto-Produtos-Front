import { DistribuidorService } from './../distribuidor.service';
import { Router } from '@angular/router';
import { DistribuidorViewModelId } from './../distribuidor-view-model-id';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acesso-distribuidor',
  templateUrl: './acesso-distribuidor.component.html',
  styleUrls: ['./acesso-distribuidor.component.css']
})
export class AcessoDistribuidorComponent implements OnInit {
  formulario: FormGroup;
  distribuidor: DistribuidorViewModelId[] = [];
  chaveExistente!: string;
  constructor(
    private distribuidorService:DistribuidorService
    ,private formBuilder: FormBuilder,
    private rota: Router) {
    this.formulario = formBuilder.group({
      chaveAcesso: formBuilder.control('')
    });
  }

  ngOnInit() {
  }
  buscarChave(): void {
    const chave = this.formulario.controls['chaveAcesso'].value;
    this.distribuidorService.buscarDistribuidorChave(chave).subscribe((resultado) => {
      this.distribuidor.push(resultado);
    });
  }
}
