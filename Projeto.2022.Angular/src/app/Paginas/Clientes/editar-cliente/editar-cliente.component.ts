import { ActivatedRoute, Router } from '@angular/router';
import { ClienteViewModel } from './../cliente-view-model';
import { ClienteService } from './../cliente.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EnderecoViewModel } from '../../Shared/endereco-view-model';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  formulario: FormGroup;
  idCliente: string;
  cliente: ClienteViewModel | undefined;
  erros: string[] = [];

  constructor(private formBuilder: FormBuilder
    , private clienteService: ClienteService
    , private rotaAtiva: ActivatedRoute
    , private rota: Router) {
    this.formulario = formBuilder.group({
      nome: formBuilder.control('', [Validators.maxLength(10), Validators.required]),
      chaveAcesso: formBuilder.control('', Validators.required),
      sobrenome: formBuilder.control('', [Validators.maxLength(20), Validators.required]),
      email: formBuilder.control('', Validators.required),
      telefone: formBuilder.control('', Validators.required),
      cpf: formBuilder.control('', Validators.required),
      dataNascimento: formBuilder.control('', Validators.required),

      enderecoModel: formBuilder.group({
        uf: formBuilder.control(''),
        cep: formBuilder.control(''),
        cidade: formBuilder.control(''),
        bairro: formBuilder.control(''),
        rua: formBuilder.control(''),
        numero: formBuilder.control(''),
        complemento: formBuilder.control(''),
      })
    });
    this.idCliente = rotaAtiva.snapshot.params['id'];
    clienteService.buscarClienteId(this.idCliente).subscribe((result) => {
      this.cliente = result;
      console.log(result);
      this._preencherFormulario()
    });
  }
  private _preencherFormulario() {
    this.formulario.controls['nome'].setValue(this.cliente?.nome);
    this.formulario.controls['chaveAcesso'].setValue(this.cliente?.chaveAcesso);
    this.formulario.controls['sobrenome'].setValue(this.cliente?.sobrenome);
    this.formulario.controls['email'].setValue(this.cliente?.email);
    this.formulario.controls['telefone'].setValue(this.cliente?.telefone);
    this.formulario.controls['cpf'].setValue(this.cliente?.cpf);
    this.formulario.controls['dataNascimento'].setValue(this.cliente?.dataNascimento);
    this.formulario.controls['enderecoModel'].setValue(this.cliente?.enderecoModel);
  }
  ngOnInit() {
  }
  editarCliente(): void {
    const nome = this.formulario.controls['nome'].value;
    const chaveAcesso = this.formulario.controls['chaveAcesso'].value;
    const sobrenome = this.formulario.controls['sobrenome'].value;
    const email = this.formulario.controls['email'].value;
    const telefone = this.formulario.controls['telefone'].value;
    const cpf = this.formulario.controls['cpf'].value;
    const dataNascimento = this.formulario.controls['dataNascimento'].value;

    const uf = this.formulario.controls['enderecoModel'].value['uf'];
    const cep = this.formulario.controls['enderecoModel'].value['cep'];
    const cidade = this.formulario.controls['enderecoModel'].value['cidade'];
    const bairro = this.formulario.controls['enderecoModel'].value['bairro'];
    const rua = this.formulario.controls['enderecoModel'].value['rua'];
    const numero = this.formulario.controls['enderecoModel'].value['numero'];
    const complemento = this.formulario.controls['enderecoModel'].value['complemento'];

    const editarCliente = new ClienteViewModel(
      nome, chaveAcesso, sobrenome, email, telefone, cpf, dataNascimento, new EnderecoViewModel(
        uf, cep, cidade, bairro, rua, numero, complemento
      )
    );
    this.clienteService.editarCliente(this.idCliente, editarCliente).subscribe((result) => {
      this._sucesso(result), (error: any) => this._erro(error);
    });
  }
  private _sucesso(resultado: any): void {
    this.rota.navigateByUrl('/telaPrincipalClientes');
  }

  private _erro(erroHttp: any): void {
    console.log(erroHttp);
    this.erros = erroHttp.error.erros;
  }
}
