import { TipoAcessoService } from './../../../servicos-gerais/tipo-acesso.service';
import { FuncionarioViewModelId } from './../funcionario-view-model-id';
import { Router } from '@angular/router';
import { FuncionarioViewModel } from './../funcionario-view-model';
import { IdentificacaoService } from './../../../servicos-gerais/identificacao.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css']
})
export class AcessoComponent implements OnInit {
  chave!: string;
  formulario: FormGroup;
  funcionarios:FuncionarioViewModelId[] = [];
  chaveExistente!:string;

  constructor( private identificacaoService: IdentificacaoService,
    private _tipoAcessoService: TipoAcessoService,
    private formBuilder: FormBuilder,
    private rota:Router) {
    this.formulario = formBuilder.group({
      chaveAcesso: formBuilder.control('')
    });
  }

  ngOnInit() {
  }
  buscarChave():void{
    const chave = this.formulario.controls['chaveAcesso'].value;
    this.identificacaoService.chaveAcesso(chave).subscribe((resultado) => {
      this._tipoAcessoService.setarChaveFuncionario(chave);
      this.funcionarios.push(resultado);
    });
  }
  funcionarioExistente():boolean{
    if(this.chaveExistente) return true;
    return false;
  }

}
