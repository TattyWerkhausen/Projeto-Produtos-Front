import { FuncionarioViewModelId } from './../funcionario-view-model-id';
import { Router } from '@angular/router';
import { FuncionarioViewModel } from './../funcionario-view-model';
import { IdentificacaoService } from './../../../servicos-gerais/identificacao.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tela-principal-funcionario',
  templateUrl: './tela-principal-funcionario.component.html',
  styleUrls: ['./tela-principal-funcionario.component.css']
})
export class TelaPrincipalFuncionarioComponent implements OnInit {
  formulario: FormGroup;
  funcionarios: FuncionarioViewModelId[] = [];

  constructor(public dialog: MatDialog, private identificacaoService: IdentificacaoService
    ,private rota:Router, private formBuilder: FormBuilder) {
    this.formulario = formBuilder.group({
      chaveAcesso: formBuilder.control('')
    })
  }

  ngOnInit() {
  }

  buscarFuncionarioAcesso(): void {
    const acessoFuncionario = this.formulario.controls['chaveAcesso'].value;
    this.identificacaoService.chaveAcesso(acessoFuncionario).subscribe((resultado) => {
    this.funcionarios.push(resultado);
    });
  }

}
