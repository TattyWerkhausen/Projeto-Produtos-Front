import { ActivatedRoute, Router } from '@angular/router';
import { DistribuidorService } from './../distribuidor.service';
import { DistribuidorViewModelId } from './../distribuidor-view-model-id';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-excluir-distribuidor-nome',
  templateUrl: './excluir-distribuidor-nome.component.html',
  styleUrls: ['./excluir-distribuidor-nome.component.css']
})
export class ExcluirDistribuidorNomeComponent implements OnInit {
  distribuidores:DistribuidorViewModelId | undefined;
  distribuidor:string;
  erros:string[]=[];

  constructor(private distribuidorService:DistribuidorService ,
    private rotaAtiva: ActivatedRoute
    ,private rota: Router) {
      this.distribuidor = rotaAtiva.snapshot.params['nome'];
      distribuidorService.buscarDistribuidorNome(this.distribuidor).subscribe(result => {
        this.distribuidores = result
      });
    }
  ngOnInit() {
  }
  private _sucesso(resultado:any): void {
    alert('Excluído com sucesso')
    this.rota.navigateByUrl('/telaPrincipalDistribuidores')
  }
  private _erros(erro: any): void {
    this.erros = erro.error.erros.

    alert('Erro ao excluir')
  }

 excluirDistribuidor():void{
  this.distribuidorService.excluirDistribuidorNome(this.distribuidor).subscribe(result => {
    this.distribuidor = result
    this.rota.navigateByUrl('/telaPrincipalDistribuidores')
  });
 }
 naoExcluir():void{
   this.rota.navigateByUrl('/telaPrincipalDistribuidores')
 }
}
