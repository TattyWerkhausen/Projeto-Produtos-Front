import { ActivatedRoute, Router } from '@angular/router';
import { SaborService } from './../sabor.service';
import { SaborViewModel } from './../sabor-view-model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-sabor-nome',
  templateUrl: './editar-sabor-nome.component.html',
  styleUrls: ['./editar-sabor-nome.component.css']
})
export class EditarSaborNomeComponent implements OnInit {
  formulario: FormGroup;
  nomeSabor: string;
  sabores: SaborViewModel | undefined;
  erros: string[] = [];
  constructor(private saborService: SaborService
    , private formBuilder: FormBuilder
    , private rotaAtiva: ActivatedRoute
    , private rota: Router) {
    this.formulario = formBuilder.group({
      nome: formBuilder.control(''),
      valorCusto: formBuilder.control(''),
      valorVenda: formBuilder.control(''),
    });
    this.nomeSabor = rotaAtiva.snapshot.params['nome'];
    saborService.buscarSaborNome(this.nomeSabor).subscribe((result) => {
      this.sabores = result;
      this._preencherFormulario()
    });
  }
  //Metodo que tras os dados preenchidos da api no formulario quando aberto para edição
  private _preencherFormulario() {
    this.formulario.controls['nome'].setValue(this.sabores?.nome);
    this.formulario.controls['valorCusto'].setValue(this.sabores?.valorCusto);
    this.formulario.controls['valorVenda'].setValue(this.sabores?.valorVenda);
  }
  ngOnInit() {
  }
  editarSabor(): void {
    const nome = this.formulario.controls['nome'].value;
    const valorCusto = this.formulario.controls['valorCusto'].value;
    const valorVenda = this.formulario.controls['valorVenda'].value;

    const editarsabor = new SaborViewModel(
      nome, valorCusto, valorVenda
    );
    this.saborService.editarNome(this.nomeSabor, editarsabor).subscribe((result) => {
      this._sucesso(result), (error: any) => this._erro(error);
    });
  }
  private _sucesso(resultado: any): void {
    this.rota.navigateByUrl('/telaPrincipalSabores');
  }

  private _erro(erroHttp: any): void {
    console.log(erroHttp);
    this.erros = erroHttp.error.erros;
  }
}
