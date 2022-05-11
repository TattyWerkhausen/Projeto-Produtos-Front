import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from './../funcionario.service';
import { FuncionarioViewModel } from './../funcionario-view-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EnderecoViewModel } from '../../Shared/endereco-view-model';

@Component({
  selector: 'app-editar-funcionario-nome',
  templateUrl: './editar-funcionario-nome.component.html',
  styleUrls: ['./editar-funcionario-nome.component.css']
})
export class EditarFuncionarioNomeComponent implements OnInit {
  formulario: FormGroup;
  funcionario: string;
  funcionarios: FuncionarioViewModel | undefined;
  erros: string[] = [];

  constructor(private formBuilder: FormBuilder
    , private funcionarioService: FuncionarioService
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
    this.funcionario = rotaAtiva.snapshot.params['nome'];
    funcionarioService.buscarFuncionarioNome(this.funcionario).subscribe((result) => {
      this.funcionarios = result;
      this._preencherFormulario()
    });
  }
  private _preencherFormulario() {
    this.formulario.controls['nome'].setValue(this.funcionarios?.nome);
    this.formulario.controls['chaveAcesso'].setValue(this.funcionarios?.chaveAcesso);
    this.formulario.controls['sobrenome'].setValue(this.funcionarios?.sobrenome);
    this.formulario.controls['email'].setValue(this.funcionarios?.email);
    this.formulario.controls['telefone'].setValue(this.funcionarios?.telefone);
    this.formulario.controls['cpf'].setValue(this.funcionarios?.cpf);
    this.formulario.controls['dataNascimento'].setValue(this.funcionarios?.dataNascimento);
    this.formulario.controls['enderecoModel'].setValue(this.funcionarios?.enderecoModel);
  }
  ngOnInit() {
  }
  editarFuncionarioNome(): void {
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

    const editarfuncionario = new FuncionarioViewModel(
      nome, chaveAcesso, sobrenome, email, telefone, cpf, dataNascimento, new EnderecoViewModel(
        uf, cep, cidade, bairro, rua, numero, complemento
      )
    );
    this.funcionarioService.editarFuncionarioNome(this.funcionario, editarfuncionario).subscribe((result) => {
      this._sucesso(result), (error: any) => this._erro(error);
    });
  }
  private _sucesso(resultado: any): void {
    this.rota.navigateByUrl('/telaPrincipalFuncionario');
  }

  private _erro(erroHttp: any): void {
    console.log(erroHttp);
    this.erros = erroHttp.error.erros;
  }
}

