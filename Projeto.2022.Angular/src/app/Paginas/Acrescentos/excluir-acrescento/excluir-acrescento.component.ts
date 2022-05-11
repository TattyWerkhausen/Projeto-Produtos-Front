import { ActivatedRoute, Router } from '@angular/router';
import { AcrescentoService } from './../acrescento.service';
import { AcrescentoViewModelId } from './../acrescento-view-model-id';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-excluir-acrescento',
  templateUrl: './excluir-acrescento.component.html',
  styleUrls: ['./excluir-acrescento.component.css']
})
export class ExcluirAcrescentoComponent implements OnInit {
  acrescento: AcrescentoViewModelId | undefined;
  idAcrescento: string;
  erros: string[] = [];

  constructor(private acrescentoService: AcrescentoService,
    private rotaAtiva: ActivatedRoute
    , private rota: Router) {
    this.idAcrescento = rotaAtiva.snapshot.params['id'];
    acrescentoService.buscarId(this.idAcrescento).subscribe(result => {
      this.acrescento = result
    });
  }

  ngOnInit() {
  }
  private _sucesso(resultado: any): void {
    alert('Excluído com sucesso')
    this.rota.navigateByUrl('/exibirTodosAcrescentos')
  }
  private _erros(erro: any): void {
    this.erros = erro.error.erros.

      alert('Erro ao excluir')
  }

  excluirAcrescento(): void {
    this.acrescentoService.excluir(this.idAcrescento).subscribe(result => {
      this.acrescento = result
      this.rota.navigateByUrl('/telaPrincipalAcrescentos')
    });
  }
  naoExcluir(): void {
    this.rota.navigateByUrl('/telaPrincipalAcrescentos')
  }
}
