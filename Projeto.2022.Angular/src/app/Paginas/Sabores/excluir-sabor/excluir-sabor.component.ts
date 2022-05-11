import { ActivatedRoute, Router } from '@angular/router';
import { SaborService } from './../sabor.service';
import { SaborViewModelId } from './../sabor-view-model-id';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-excluir-sabor',
  templateUrl: './excluir-sabor.component.html',
  styleUrls: ['./excluir-sabor.component.css']
})
export class ExcluirSaborComponent implements OnInit {
  sabor: SaborViewModelId | undefined;
  idSabor: string;
  erros: string[] = [];

  constructor(private saborService: SaborService,
    private rotaAtiva: ActivatedRoute
    , private rota: Router) {
    this.idSabor = rotaAtiva.snapshot.params['id'];
    saborService.buscarSabor(this.idSabor).subscribe(result => {
      this.sabor = result
    });
  }

  ngOnInit() {
  }
  private _sucesso(resultado: any): void {
    alert('Excluído com sucesso')
    this.rota.navigateByUrl('/telaPrincipalSabores')
  }
  private _erros(erro: any): void {
    this.erros = erro.error.erros.

      alert('Erro ao excluir')
  }

  excluirSabor(): void {
    this.saborService.excluir(this.idSabor).subscribe(result => {
      this.sabor = result
      this.rota.navigateByUrl('/telaPrincipalSabores')
    });
  }
  naoExcluir(): void {
    this.rota.navigateByUrl('/telaPrincipalSabores')
  }
}
