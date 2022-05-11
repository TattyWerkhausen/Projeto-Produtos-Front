import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from './../cliente.service';
import { ClienteViewModelId } from './../cliente-view-model-id';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-excluir-cliente',
  templateUrl: './excluir-cliente.component.html',
  styleUrls: ['./excluir-cliente.component.css']
})
export class ExcluirClienteComponent implements OnInit {
 cliente:ClienteViewModelId | undefined;
  idCliente:string;
  erros:string[]=[];

  constructor(private clienteService:ClienteService ,
    private rotaAtiva: ActivatedRoute
    ,private rota: Router) {
      this.idCliente = rotaAtiva.snapshot.params['id'];
      clienteService.buscarClienteId(this.idCliente).subscribe(result => {
        this.cliente = result
      });
    }
  ngOnInit() {
  }
  private _sucesso(resultado:any): void {
    alert('Excluído com sucesso')
    this.rota.navigateByUrl('/telaPrincipalClientes')
  }
  private _erros(erro: any): void {
    this.erros = erro.error.erros.

    alert('Erro ao excluir')
  }

 excluirCliente():void{
  this.clienteService.excluirCliente(this.idCliente).subscribe(result => {
    this.cliente = result
    this.rota.navigateByUrl('/telaPrincipalClientes')
  });
 }
 naoExcluir():void{
   this.rota.navigateByUrl('/telaPrincipalClientes')
 }
}
