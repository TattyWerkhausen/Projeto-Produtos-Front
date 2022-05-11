import { ActivatedRoute, Router } from '@angular/router';
import { AcrescentoService } from './../acrescento.service';
import { AcrescentoViewModel } from './../acrescento-view-model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-acrescento',
  templateUrl: './editar-acrescento.component.html',
  styleUrls: ['./editar-acrescento.component.css']
})
export class EditarAcrescentoComponent implements OnInit {
  formulario: FormGroup;
  idAcrescento: string;
  acrescentos: AcrescentoViewModel | undefined;
  erros: string[] = [];
  constructor(private acrescentoService: AcrescentoService
    , private formBuilder: FormBuilder
    , private rotaAtiva: ActivatedRoute
    , private rota: Router) {
    this.formulario = formBuilder.group({
      nome: formBuilder.control(''),
      valorCusto: formBuilder.control(''),
      valorVenda: formBuilder.control(''),
      gramagem: formBuilder.control('')
    });
    this.idAcrescento = rotaAtiva.snapshot.params['id'];
    acrescentoService.buscarId(this.idAcrescento).subscribe((result) => {
      this.acrescentos = result;
      this._preencherFormulario()
    });
  }
  //Metodo que tras os dados preenchidos da api no formulario quando aberto para edição
  private _preencherFormulario() {
    this.formulario.controls['nome'].setValue(this.acrescentos?.nome);
    this.formulario.controls['valorCusto'].setValue(this.acrescentos?.valorCusto);
    this.formulario.controls['valorVenda'].setValue(this.acrescentos?.valorVenda);
    this.formulario.controls['gramagem'].setValue(this.acrescentos?.gramagem);
  }
  ngOnInit() {
  }
  editarAcrescento(): void {
    const nome = this.formulario.controls['nome'].value;
    const valorCusto = this.formulario.controls['valorCusto'].value;
    const valorVenda = this.formulario.controls['valorVenda'].value;
    const gramagem = this.formulario.controls['gramagem'].value;

    const editarAcrescento = new AcrescentoViewModel(
      nome, valorCusto, valorVenda, gramagem
    );
    this.acrescentoService.editar(this.idAcrescento, editarAcrescento).subscribe((result) => {
      this._sucesso(result), (error: any) => this._erro(error);
    });
  }
  private _sucesso(resultado: any): void {
    this.rota.navigateByUrl('/telaPrincipalAcrescentos');
  }

  private _erro(erroHttp: any): void {
    console.log(erroHttp);
    this.erros = erroHttp.error.erros;
  }
}
