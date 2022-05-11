import { SaborViewModel } from './../sabor-view-model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SaborService } from '../sabor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-sabor',
  templateUrl: './editar-sabor.component.html',
  styleUrls: ['./editar-sabor.component.css']
})
export class EditarSaborComponent implements OnInit {
  formulario: FormGroup;
  idSabor: string;
  sabores: SaborViewModel | undefined;
  erros: string[] = [];
  constructor(private saborService: SaborService
    , private formBuilder: FormBuilder
    , private rotaAtiva: ActivatedRoute
    , private rota: Router) {
    this.formulario = formBuilder.group({
      nome: formBuilder.control(''),
      valorCusto: formBuilder.control(''),
      valorVenda: formBuilder.control('')
    });
    this.idSabor = rotaAtiva.snapshot.params['id'];
    saborService.buscarSabor(this.idSabor).subscribe((result) => {
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

    const editarSabor = new SaborViewModel(
      nome, valorCusto, valorVenda
    );
    this.saborService.editar(this.idSabor, editarSabor).subscribe((result) => {
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

