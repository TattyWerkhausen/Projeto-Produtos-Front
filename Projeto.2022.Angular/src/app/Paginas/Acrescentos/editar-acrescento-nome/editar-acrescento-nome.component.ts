import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AcrescentoViewModel } from '../acrescento-view-model';
import { AcrescentoService } from '../acrescento.service';

@Component({
  selector: 'app-editar-acrescento-nome',
  templateUrl: './editar-acrescento-nome.component.html',
  styleUrls: ['./editar-acrescento-nome.component.css']
})
export class EditarAcrescentoNomeComponent implements OnInit {
  formulario: FormGroup;
  nomeAcrescento: string;
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
    this.nomeAcrescento = rotaAtiva.snapshot.params['nome'];
    acrescentoService.buscarNome(this.nomeAcrescento).subscribe((result) => {
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
    this.acrescentoService.editarNome(this.nomeAcrescento, editarAcrescento).subscribe((result) => {
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
