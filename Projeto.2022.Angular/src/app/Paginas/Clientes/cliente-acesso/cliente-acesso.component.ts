import { ClienteViewModelId } from './../cliente-view-model-id';
import { ClienteService } from './../cliente.service';
import { ClienteViewModel } from './../cliente-view-model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TipoAcessoService } from 'src/app/servicos-gerais/tipo-acesso.service';

@Component({
  selector: 'app-cliente-acesso',
  templateUrl: './cliente-acesso.component.html',
  styleUrls: ['./cliente-acesso.component.css']
})
export class ClienteAcessoComponent implements OnInit {
  chave!: string;
  formulario: FormGroup;
  clientes: ClienteViewModelId[] = [];
  constructor(private clienteService: ClienteService
    , private _tipoAcessoService: TipoAcessoService
    , private formBuilder: FormBuilder) {
    this.formulario = formBuilder.group({
      chaveAcesso: formBuilder.control('')
    });
  }
  ngOnInit() {
  }
  buscarClienteChave(): void {
    const chaveA = this.formulario.controls['chaveAcesso'].value;
    this.chave = chaveA;
    this.clienteService.buscarClienteChave(chaveA).subscribe((result) => {
      this.clientes.push(result);
      this._tipoAcessoService.setarChaveCliente(this.chave);
    });
  }
 /*tirarBotaoCadastro():void{
 quando o imput for clicado desabilita o botao de cadastro abaixo e quanto clicado fora ativa
 }*/
  }

