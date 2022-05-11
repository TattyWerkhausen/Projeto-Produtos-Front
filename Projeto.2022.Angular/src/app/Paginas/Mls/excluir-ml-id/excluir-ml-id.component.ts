import { ActivatedRoute, Router } from '@angular/router';
import { MlServiceService } from './../ml-service.service';
import { MlViewModelId } from './../ml-view-model-id';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-excluir-ml-id',
  templateUrl: './excluir-ml-id.component.html',
  styleUrls: ['./excluir-ml-id.component.css']
})
export class ExcluirMlIdComponent implements OnInit {
  ml: MlViewModelId | undefined;
  idMl: string;
  erros: string[] = [];

  constructor(private mlService: MlServiceService,
    private rotaAtiva: ActivatedRoute
    , private rota: Router) {
    this.idMl = rotaAtiva.snapshot.params['id'];
    mlService.buscarMlId(this.idMl).subscribe(result => {
      this.ml = result
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
    this.mlService.excluir(this.idMl).subscribe(result => {
      this.ml = result
      this.rota.navigateByUrl('/telaPrincipalMl')
    });
  }
  naoExcluir(): void {
    this.rota.navigateByUrl('/telaPrincipalMl')
  }
}
