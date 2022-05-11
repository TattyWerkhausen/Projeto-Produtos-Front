import { ActivatedRoute, Router } from '@angular/router';
import { DistribuidorService } from './../distribuidor.service';
import { DistribuidorViewModelId } from './../distribuidor-view-model-id';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-excluir-distribuidores',
  templateUrl: './excluir-distribuidores.component.html',
  styleUrls: ['./excluir-distribuidores.component.css']
})
export class ExcluirDistribuidoresComponent implements OnInit {
  distribuidores:DistribuidorViewModelId | undefined;
  idDistribuidor:string;
  erros:string[]=[];

  constructor(private distribuidorService:DistribuidorService ,
    private rotaAtiva: ActivatedRoute
    ,private rota: Router) {
      this.idDistribuidor = rotaAtiva.snapshot.params['id'];
      distribuidorService.buscarDistribuidorId(this.idDistribuidor).subscribe(result => {
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
  this.distribuidorService.excluirDistribuidor(this.idDistribuidor).subscribe(result => {
    this.distribuidores = result
    this.rota.navigateByUrl('/telaPrincipalDistribuidores')
  });
 }
 naoExcluir():void{
   this.rota.navigateByUrl('/telaPrincipalDistribuidores')
 }

}
