import { ActivatedRoute, Router } from '@angular/router';
import { MlServiceService } from './../ml-service.service';
import { MlViewModel } from './../ml-view-model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-ml-id',
  templateUrl: './editar-ml-id.component.html',
  styleUrls: ['./editar-ml-id.component.css']
})
export class EditarMlIdComponent implements OnInit {
  formulario: FormGroup;
  idMl: string;
  mls: MlViewModel | undefined;
  erros: string[] = [];
  constructor(private mlService: MlServiceService
    , private formBuilder: FormBuilder
    , private rotaAtiva: ActivatedRoute
    , private rota: Router) {
    this.formulario = formBuilder.group({
      ml: formBuilder.control(''),
      valorCusto: formBuilder.control(''),
      valorVenda: formBuilder.control('')
    });
    this.idMl = rotaAtiva.snapshot.params['id'];
    mlService.buscarMlId(this.idMl).subscribe((result) => {
      this.mls = result;
      this._preencherFormulario()
    });
  }
  //Metodo que tras os dados preenchidos da api no formulario quando aberto para edição
  private _preencherFormulario() {
    this.formulario.controls['ml'].setValue(this.mls?.ml);
    this.formulario.controls['valorCusto'].setValue(this.mls?.valorCusto);
    this.formulario.controls['valorVenda'].setValue(this.mls?.valorVenda);
  }
  ngOnInit() {
  }
  editarMlId(): void {
    const ml = this.formulario.controls['ml'].value;
    const valorCusto = this.formulario.controls['valorCusto'].value;
    const valorVenda = this.formulario.controls['valorVenda'].value;

    const editarMl = new MlViewModel(
      ml, valorCusto, valorVenda
    );
    this.mlService.editarMlId(this.idMl, editarMl).subscribe((result) => {
      this._sucesso(result), (error: any) => this._erro(error);
    });
  }
  private _sucesso(resultado: any): void {
    this.rota.navigateByUrl('/telaPrincipalMl');
  }

  private _erro(erroHttp: any): void {
    console.log(erroHttp);
    this.erros = erroHttp.error.erros;
  }
}


