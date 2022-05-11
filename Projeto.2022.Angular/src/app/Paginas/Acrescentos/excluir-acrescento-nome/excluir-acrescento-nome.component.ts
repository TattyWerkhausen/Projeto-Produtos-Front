import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcrescentoViewModelId } from '../acrescento-view-model-id';
import { AcrescentoService } from '../acrescento.service';

@Component({
  selector: 'app-excluir-acrescento-nome',
  templateUrl: './excluir-acrescento-nome.component.html',
  styleUrls: ['./excluir-acrescento-nome.component.css']
})
export class ExcluirAcrescentoNomeComponent implements OnInit {
  acrescento: AcrescentoViewModelId | undefined;
  nomeAcrescento: string;
  erros: string[] = [];

  constructor(private acrescentoService: AcrescentoService,
    private rotaAtiva: ActivatedRoute
    , private rota: Router) {
    this.nomeAcrescento = rotaAtiva.snapshot.params['nome'];
    acrescentoService.buscarNome(this.nomeAcrescento).subscribe(result => {
      this.acrescento = result
    });
  }

  ngOnInit() {
  }
  private _sucesso(resultado: any): void {
    alert('Excluído com sucesso')
    this.rota.navigateByUrl('/telaPrincipalAcrescentos')
  }
  private _erros(erro: any): void {
    this.erros = erro.error.erros.

      alert('Erro ao excluir')
  }

  excluirAcrescento(): void {
    this.acrescentoService.excluirNome(this.nomeAcrescento).subscribe(result => {
      this.acrescento = result
      this.rota.navigateByUrl('/telaPrincipalAcrescentos')
    });
  }
  naoExcluir(): void {
    this.rota.navigateByUrl('/telaPrincipalAcrescentos')
  }
}
