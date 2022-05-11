import { ActivatedRoute, Router } from '@angular/router';
import { MlServiceService } from './../ml-service.service';
import { MlViewModelId } from './../ml-view-model-id';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-excluir-ml',
  templateUrl: './excluir-ml.component.html',
  styleUrls: ['./excluir-ml.component.css']
})
export class ExcluirMlComponent implements OnInit {
  mls: MlViewModelId | undefined;
  mlMl: number;
  erros: string[] = [];

  constructor(private mlService: MlServiceService,
    private rotaAtiva: ActivatedRoute
    , private rota: Router) {
    this.mlMl = rotaAtiva.snapshot.params['ml'];
    mlService.buscarMl(this.mlMl).subscribe(result => {
      this.mls = result
    });
  }

  ngOnInit() {
  }
  private _sucesso(resultado: any): void {
    alert('Excluído com sucesso')
    this.rota.navigateByUrl('/telaprincipalMl')
  }
  private _erros(erro: any): void {
    this.erros = erro.error.erros.

      alert('Erro ao excluir')
  }

  excluirMl(): void {
    this.mlService.excluirMl(this.mlMl).subscribe(result => {
      this.mls = result
      this.rota.navigateByUrl('/telaPrincipalMl')
    });
  }
  naoExcluir(): void {
    this.rota.navigateByUrl('/telaPrincipalMl')
  }
}
