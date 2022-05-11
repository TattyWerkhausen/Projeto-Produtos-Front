import { FuncionarioViewModel } from './../funcionario-view-model';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from './../funcionario.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EnderecoViewModel } from '../../Shared/endereco-view-model';

@Component({
  selector: 'app-editar-funcionario',
  templateUrl: './editar-funcionario.component.html',
  styleUrls: ['./editar-funcionario.component.css']
})
export class EditarFuncionarioComponent implements OnInit {
  formulario: FormGroup;
  idFuncionario: string;
  funcionarios: FuncionarioViewModel | undefined;
  erros: string[] = [];
  constructor(private funcionarioService: FuncionarioService
    , private formBuilder: FormBuilder
    , private rotaAtiva: ActivatedRoute
    , private rota: Router) {
    this.formulario = formBuilder.group({
      nome: formBuilder.control(''),
      chaveAcesso: formBuilder.control(''),
      sobrenome: formBuilder.control(''),
      email: formBuilder.control(''),
      telefone: formBuilder.control(''),
      cpf: formBuilder.control(''),
      dataNascimento: formBuilder.control(''),

      enderecoModel: formBuilder.group({
        uf: formBuilder.control(''),
        cep: formBuilder.control(''),
        cidade: formBuilder.control(''),
        bairro: formBuilder.control(''),
        rua: formBuilder.control(''),
        numero: formBuilder.control(''),
        complemento: formBuilder.control('')
      })
    });
    this.idFuncionario = rotaAtiva.snapshot.params['id'];
    funcionarioService.buscarFuncionarioId(this.idFuncionario).subscribe((result) => {
      this.funcionarios = result;
      this._preencherFormulario()
    });
  }
  //Metodo que tras os dados preenchidos da api no formulario quando aberto para edição
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
  editarFuncionario(): void {
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

    const editarFuncionario = new FuncionarioViewModel(
      nome, chaveAcesso, sobrenome, email, telefone, cpf, dataNascimento, new EnderecoViewModel(
        uf, cep, cidade, bairro, rua, numero, complemento
      )
    );
    this.funcionarioService.editarFuncionario(this.idFuncionario, editarFuncionario).subscribe((result) => {
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
