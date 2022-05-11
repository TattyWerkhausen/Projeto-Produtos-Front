import { EnderecoViewModel } from '../../Shared/endereco-view-model';
import { Router } from '@angular/router';
import { FuncionarioViewModel } from './../funcionario-view-model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../funcionario.service';

@Component({
  selector: 'app-cadastrar-funcionario',
  templateUrl: './cadastrar-funcionario.component.html',
  styleUrls: ['./cadastrar-funcionario.component.css']
})
export class CadastrarFuncionarioComponent implements OnInit {
  formulario: FormGroup;
  funcionarios: FuncionarioViewModel[] = [];

  constructor(private formBuilder: FormBuilder
    , private funcionarioService: FuncionarioService
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
  }

  ngOnInit() {
  }
  cadastrarFuncionario(): void {
    const funcionario = new FuncionarioViewModel(
      this.formulario.controls['nome'].value,
      this.formulario.controls['chaveAcesso'].value,
      this.formulario.controls['sobrenome'].value,
      this.formulario.controls['email'].value,
      this.formulario.controls['telefone'].value,
      this.formulario.controls['cpf'].value,
      this.formulario.controls['dataNascimento'].value,
      new EnderecoViewModel(
        this.formulario.controls['enderecoModel'].value['uf'],
        this.formulario.controls['enderecoModel'].value['cep'],
        this.formulario.controls['enderecoModel'].value['cidade'],
        this.formulario.controls['enderecoModel'].value['bairro'],
        this.formulario.controls['enderecoModel'].value['rua'],
        this.formulario.controls['enderecoModel'].value['numero'],
        this.formulario.controls['enderecoModel'].value['complemento'],
      ));
    this.funcionarioService.cadastrar(funcionario).subscribe(funcionario => {
      this.rota.navigateByUrl('/telaPrincipalFuncionario')
    });
  }
}
