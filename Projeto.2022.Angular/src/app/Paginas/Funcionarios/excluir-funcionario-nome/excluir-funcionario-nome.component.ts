import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from './../funcionario.service';
import { FuncionarioViewModelId } from './../funcionario-view-model-id';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-excluir-funcionario-nome',
  templateUrl: './excluir-funcionario-nome.component.html',
  styleUrls: ['./excluir-funcionario-nome.component.css']
})
export class ExcluirFuncionarioNomeComponent implements OnInit {
  funcionarios: FuncionarioViewModelId | undefined;
  funcionario: string;
  erros: string[] = [];

  constructor(private funcionarioService: FuncionarioService,
    private rotaAtiva: ActivatedRoute
    , private rota: Router) {
    this.funcionario = rotaAtiva.snapshot.params['nome'];
    funcionarioService.buscarFuncionarioNome(this.funcionario).subscribe(result => {
      this.funcionarios = result
    });
  }
  ngOnInit() {
  }
  private _sucesso(resultado: any): void {
    alert('Excluído com sucesso')
    this.rota.navigateByUrl('/telaPrincipalFuncionario')
  }
  private _erros(erro: any): void {
    this.erros = erro.error.erros.

      alert('Erro ao excluir')
  }

  excluirFuncionario(): void {
    this.funcionarioService.excluirFuncionarioNome(this.funcionario).subscribe(result => {
      this.funcionario = result
      this.rota.navigateByUrl('/telaPrincipalFuncionario')
    });
  }
  naoExcluir(): void {
    this.rota.navigateByUrl('/telaPrincipalFuncionario')
  }
}
