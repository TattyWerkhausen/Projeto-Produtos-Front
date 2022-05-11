import { ActivatedRoute, Router } from '@angular/router';
import { DistribuidorService } from './../distribuidor.service';
import { DistribuidorViewModel } from './../distribuidor-view-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EnderecoViewModel } from '../../Shared/endereco-view-model';

@Component({
  selector: 'app-editar-distribuidor-nome',
  templateUrl: './editar-distribuidor-nome.component.html',
  styleUrls: ['./editar-distribuidor-nome.component.css']
})
export class EditarDistribuidorNomeComponent implements OnInit {
  formulario: FormGroup;
  distribuidor: string;
  distribuidores: DistribuidorViewModel | undefined;
  erros: string[] = [];

  constructor(private formBuilder: FormBuilder
    , private distribuidorService: DistribuidorService
    , private rotaAtiva: ActivatedRoute
    , private rota: Router) {
    this.formulario = formBuilder.group({
      nome: formBuilder.control('', [Validators.maxLength(10), Validators.required]),
      chaveAcesso: formBuilder.control('', Validators.required),
      cnpj: formBuilder.control('', [Validators.maxLength(20), Validators.required]),
      email: formBuilder.control('', Validators.required),
      telefone: formBuilder.control('', Validators.required),

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
    this.distribuidor = rotaAtiva.snapshot.params['nome'];
    distribuidorService.buscarDistribuidorNome(this.distribuidor).subscribe((result) => {
      this.distribuidores = result;
      this._preencherFormulario()
    });
  }
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
  editarDistribuidorNome(): void {
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
    this.distribuidorService.editarDistribuidorNome(this.distribuidor, editarDistribuidor).subscribe((result) => {
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
