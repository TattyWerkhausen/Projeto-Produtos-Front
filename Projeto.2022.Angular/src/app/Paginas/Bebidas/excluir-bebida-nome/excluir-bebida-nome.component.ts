import { ActivatedRoute, Router } from '@angular/router';
import { BebidaService } from './../bebida.service';
import { BebidaModelId } from './../bebida-model-id';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-excluir-bebida-nome',
  templateUrl: './excluir-bebida-nome.component.html',
  styleUrls: ['./excluir-bebida-nome.component.css']
})
export class ExcluirBebidaNomeComponent implements OnInit {
  bebidas: BebidaModelId | undefined;
  bebida: string;
  erros: string[] = [];

  constructor(private bebidaService: BebidaService
    , private rotaAtiva: ActivatedRoute
    , private rota: Router) {
    this.bebida = rotaAtiva.snapshot.params['nome'];
    bebidaService.buscarBebidaNome(this.bebida).subscribe(result => {
      this.bebidas = result
    });
  }
  ngOnInit() {
  }
  private _sucesso(resultado: any): void {
    alert('Excluído com sucesso')
    this.rota.navigateByUrl('/telaPrincipalBebidas')
  }
  private _erros(erro: any): void {
    this.erros = erro.error.erros.

      alert('Erro ao excluir')
  }

  excluirBebida(): void {
    this.bebidaService.excluirBebidaNome(this.bebida).subscribe(result => {
      this.bebidas = result
      this.rota.navigateByUrl('/telaPrincipalBebidas')
    });
  }
  naoExcluir(): void {
    this.rota.navigateByUrl('/telaPrincipalBebidas')
  }
}
