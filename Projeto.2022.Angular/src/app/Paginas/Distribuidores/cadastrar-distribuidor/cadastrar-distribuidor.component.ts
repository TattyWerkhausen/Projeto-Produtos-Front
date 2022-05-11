import { EnderecoViewModel } from '../../Shared/endereco-view-model';
import { Router } from '@angular/router';
import { DistribuidorViewModel } from './../distribuidor-view-model';
import { DistribuidorService } from './../distribuidor.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-distribuidor',
  templateUrl: './cadastrar-distribuidor.component.html',
  styleUrls: ['./cadastrar-distribuidor.component.css']
})
export class CadastrarDistribuidorComponent implements OnInit {
  formulario: FormGroup;
  distribuidores: DistribuidorViewModel[] = [];

  constructor(private formBuilder: FormBuilder
    , private distribuidorService: DistribuidorService
    , private rota: Router) {
    this.formulario = formBuilder.group({
      nome: formBuilder.control(''),
      chaveAcesso: formBuilder.control(''),
      cnpj: formBuilder.control(''),
      email: formBuilder.control(''),
      telefone: formBuilder.control(''),

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
  cadastrarDistribuidor(): void {
    const distribuidor = new DistribuidorViewModel(
      this.formulario.controls['nome'].value,
      this.formulario.controls['chaveAcesso'].value,
      this.formulario.controls['cnpj'].value,
      this.formulario.controls['email'].value,
      this.formulario.controls['telefone'].value,

      new EnderecoViewModel(
        this.formulario.controls['enderecoModel'].value['uf'],
        this.formulario.controls['enderecoModel'].value['cep'],
        this.formulario.controls['enderecoModel'].value['cidade'],
        this.formulario.controls['enderecoModel'].value['bairro'],
        this.formulario.controls['enderecoModel'].value['rua'],
        this.formulario.controls['enderecoModel'].value['numero'],
        this.formulario.controls['enderecoModel'].value['complemento']
      ));
    this.distribuidorService.cadastrar(distribuidor).subscribe(distribuidor => {
      this.rota.navigateByUrl('/telaPrincipalDistribuidores');
    });

  }

}
