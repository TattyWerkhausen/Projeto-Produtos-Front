import { ActivatedRoute, Router } from '@angular/router';
import { BebidaService } from './../bebida.service';
import { BebidaModel } from './../bebida-model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-bebida-nome',
  templateUrl: './editar-bebida-nome.component.html',
  styleUrls: ['./editar-bebida-nome.component.css']
})
export class EditarBebidaNomeComponent implements OnInit {
  formulario: FormGroup;
  bebida: string;
  bebidas: BebidaModel | undefined;
  erros: string[] = [];

  constructor(private bebidaService: BebidaService
    , private formBuilder: FormBuilder
    , private rotaAtiva: ActivatedRoute
    , private rota: Router) {

    this.formulario = formBuilder.group({
      nome: formBuilder.control(''),
      teorAlcoolico: formBuilder.control(''),
      valorCusto: formBuilder.control(''),
      valorVenda: formBuilder.control(''),
    });
    this.bebida = rotaAtiva.snapshot.params['nome'];
    bebidaService.buscarBebidaNome(this.bebida).subscribe((result) => {
      this.bebidas = result;
      this._preencherFormulario()
    });
  }
  //Metodo que tras os dados preenchidos da api no formulario quando aberto para edição
  private _preencherFormulario() {
    this.formulario.controls['nome'].setValue(this.bebidas?.nome);
    this.formulario.controls['teorAlcoolico'].setValue(this.bebidas?.teorAlcoolico);
    this.formulario.controls['valorCusto'].setValue(this.bebidas?.valorCusto);
    this.formulario.controls['valorVenda'].setValue(this.bebidas?.valorVenda);
  }
  ngOnInit() {
  }
  editarBebida(): void {
    const nome = this.formulario.controls['nome'].value;
    const teorAlcoolico = this.formulario.controls['teorAlcoolico'].value;
    const valorCusto = this.formulario.controls['valorCusto'].value;
    const valorVenda = this.formulario.controls['valorVenda'].value;

    const editarBebida = new BebidaModel(
      nome, teorAlcoolico, valorCusto, valorVenda
    );
    this.bebidaService.editarBebidaNome(this.bebida, editarBebida).subscribe((result) => {
      this._sucesso(result), (error: any) => this._erro(error);
    });
  }
  private _sucesso(resultado: any): void {
    this.rota.navigateByUrl('/telaPrincipalBebidas');
  }

  private _erro(erroHttp: any): void {
    console.log(erroHttp);
    this.erros = erroHttp.error.erros;
  }
}
