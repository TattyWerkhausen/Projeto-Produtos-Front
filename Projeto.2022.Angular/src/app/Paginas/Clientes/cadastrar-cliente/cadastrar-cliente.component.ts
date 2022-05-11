import { EnderecoViewModel } from '../../Shared/endereco-view-model';
import { Router } from '@angular/router';
import { ClienteViewModel } from './../cliente-view-model';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.css']
})
export class CadastrarClienteComponent implements OnInit {
  formulario: FormGroup;
  Clientes: ClienteViewModel[] = [];

  constructor(private clienteService: ClienteService
    , private formBuilder: FormBuilder
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
    /* this.formulario.valueChanges.subscribe({
       next: () => {
         console.log(this.formulario.get('nome'));
       }
     })*/
  }

  ngOnInit() {
  }
  cadastrarCliente(): void {
    const novoCliente = new ClienteViewModel(
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

    this.clienteService.cadastrarCliente(novoCliente).subscribe(cliente => {
      this.rota.navigateByUrl('/telaPrincipalClientes');
    });

  }
  /*  exibirErro(controlName: string): boolean | undefined{
      return this.formulario.get(controlName)?.invalid && (this.formulario.get(controlName)?.dirty || this.formulario.get(controlName)?.touched);
    }*/
}
