import { ActivatedRoute, Router } from '@angular/router';
import { DistribuidorService } from './../distribuidor.service';
import { DistribuidorViewModel } from './../distribuidor-view-model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EnderecoViewModel } from '../../Shared/endereco-view-model';

@Component({
  selector: 'app-editar-distribuidor',
  templateUrl: './editar-distribuidor.component.html',
  styleUrls: ['./editar-distribuidor.component.css']
})
export class EditarDistribuidorComponent implements OnInit {
  formulario: FormGroup;
  idDistribuidor: string;
  distribuidores: DistribuidorViewModel | undefined;
  erros: string[] = [];
  constructor(private distribuidorService: DistribuidorService
    , private formBuilder: FormBuilder
    , private rotaAtiva: ActivatedRoute
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
    this.idDistribuidor = rotaAtiva.snapshot.params['id'];
    distribuidorService.buscarDistribuidorId(this.idDistribuidor).subscribe((result) => {
      this.distribuidores = result;
      this._preencherFormulario()
    });
  }
  //Metodo que tras os dados preenchidos da api no formulario quando aberto para edição
  private _preencherFormulario() {
    this.formulario.controls['nome'].setValue(this.distribuidores?.nome);
    this.formulario.controls['chaveAcesso'].setValue(this.distribuidores?.chaveAcesso);
    this.formulario.controls['cnpj'].setValue(this.distribuidores?.cnpj);
    this.formulario.controls['email'].setValue(this.distribuidores?.email);
    this.formulario.controls['telefone'].setValue(this.distribuidores?.telefone);
    this.formulario.controls['enderecoModel'].setValue(this.distribuidores?.enderecoModel);
  }
  ngOnInit() {
  }
  editarDistribuidor(): void {
    const nome = this.formulario.controls['nome'].value;
    const chaveAcesso = this.formulario.controls['chaveAcesso'].value;
    const cnpj = this.formulario.controls['cnpj'].value;
    const email = this.formulario.controls['email'].value;
    const telefone = this.formulario.controls['telefone'].value;

    const uf = this.formulario.controls['enderecoModel'].value['uf'];
    const cep = this.formulario.controls['enderecoModel'].value['cep'];
    const cidade = this.formulario.controls['enderecoModel'].value['cidade'];
    const bairro = this.formulario.controls['enderecoModel'].value['bairro'];
    const rua = this.formulario.controls['enderecoModel'].value['rua'];
    const numero = this.formulario.controls['enderecoModel'].value['numero'];
    const complemento = this.formulario.controls['enderecoModel'].value['complemento'];

    const editarDistribuidor = new DistribuidorViewModel(
      nome, chaveAcesso, cnpj, email, telefone, new EnderecoViewModel(
        uf, cep, cidade, bairro, rua, numero, complemento
      ));
    this.distribuidorService.editarDistribuidor(this.idDistribuidor, editarDistribuidor).subscribe((result) => {
      this._sucesso(result), (error: any) => this._erro(error);
    });
  }
  private _sucesso(resultado: any): void {
    this.rota.navigateByUrl('/telaPrincipalDistribuidores');
  }

  private _erro(erroHttp: any): void {
    console.log(erroHttp);
    this.erros = erroHttp.error.erros;
  }
}
