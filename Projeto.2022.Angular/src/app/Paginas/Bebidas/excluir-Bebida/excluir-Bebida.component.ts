import { Router, ActivatedRoute } from '@angular/router';
import { BebidaService } from './../bebida.service';
import { BebidaModelId } from './../bebida-model-id';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-excluir-Bebida',
  templateUrl: './excluir-Bebida.component.html',
  styleUrls: ['./excluir-Bebida.component.css']
})
export class ExcluirBebidaComponent implements OnInit {
  bebidas: BebidaModelId | undefined;
  idBebida: string;
  erros: string[] = [];

  constructor(private bebidaService: BebidaService
    , private rotaAtiva: ActivatedRoute
    , private rota: Router) {
    this.idBebida = rotaAtiva.snapshot.params['id'];
    bebidaService.buscarBebidaId(this.idBebida).subscribe(result => {
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
    this.bebidaService.excluirBebida(this.idBebida).subscribe(result => {
      this.bebidas = result
      this.rota.navigateByUrl('/telaPrincipalBebidas')
    });
  }
  naoExcluir(): void {
    this.rota.navigateByUrl('/telaPrincipalBebidas')
  }
}
