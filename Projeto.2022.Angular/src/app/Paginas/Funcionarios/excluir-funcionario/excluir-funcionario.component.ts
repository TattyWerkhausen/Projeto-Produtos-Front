import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from './../funcionario.service';
import { FuncionarioViewModelId } from './../funcionario-view-model-id';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-excluir-funcionario',
  templateUrl: './excluir-funcionario.component.html',
  styleUrls: ['./excluir-funcionario.component.css']
})
export class ExcluirFuncionarioComponent implements OnInit {
  funcionarios: FuncionarioViewModelId | undefined;
  idFuncionario: string;
  erros: string[] = [];

  constructor(private funcionarioService: FuncionarioService,
    private rotaAtiva: ActivatedRoute
    , private rota: Router) {
    this.idFuncionario = rotaAtiva.snapshot.params['id'];
    funcionarioService.buscarFuncionarioId(this.idFuncionario).subscribe(result => {
      this.funcionarios = result
    });
  }

  ngOnInit() {
  }
  private _sucesso(resultado: any): void {
    alert('Excluído com sucesso')
    this.rota.navigateByUrl('/exibirTodasBebidas')
  }
  private _erros(erro: any): void {
    this.erros = erro.error.erros.

      alert('Erro ao excluir')
  }

  excluirFuncionario(): void {
    this.funcionarioService.excluirFuncionario(this.idFuncionario).subscribe(result => {
      this.funcionarios = result
      this.rota.navigateByUrl('/buscarTodosFuncionarios')
    });
  }
  naoExcluir(): void {
    this.rota.navigateByUrl('/buscarTodosFuncionarios')
  }
}
