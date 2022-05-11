import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteViewModelId } from '../cliente-view-model-id';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-excluir-cliente-nome',
  templateUrl: './excluir-cliente-nome.component.html',
  styleUrls: ['./excluir-cliente-nome.component.css']
})
export class ExcluirClienteNomeComponent implements OnInit {
  clientes:ClienteViewModelId | undefined;
  cliente:string;
  erros:string[]=[];

  constructor(private clienteService:ClienteService ,
    private rotaAtiva: ActivatedRoute
    ,private rota: Router) {
      this.cliente = rotaAtiva.snapshot.params['nome'];
      clienteService.buscarClienteNome(this.cliente).subscribe(result => {
        this.clientes = result
      });
    }
  ngOnInit() {
  }
  private _sucesso(resultado:any): void {
    alert('Excluído com sucesso')
    this.rota.navigateByUrl('/buscarTodosClientes')
  }
  private _erros(erro: any): void {
    this.erros = erro.error.erros.

    alert('Erro ao excluir')
  }

 excluirCliente():void{
  this.clienteService.excluirClienteNome(this.cliente).subscribe(result => {
    this.cliente = result
    this.rota.navigateByUrl('/buscarTodosClientes')
  });
 }
 naoExcluir():void{
   this.rota.navigateByUrl('/buscarTodosClientes')
 }
}
