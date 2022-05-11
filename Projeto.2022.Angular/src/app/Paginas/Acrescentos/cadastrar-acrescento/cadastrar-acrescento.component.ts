import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AcrescentoService } from './../acrescento.service';
import { Component, OnInit } from '@angular/core';
import { AcrescentoViewModel } from '../acrescento-view-model';

@Component({
  selector: 'app-cadastrar-acrescento',
  templateUrl: './cadastrar-acrescento.component.html',
  styleUrls: ['./cadastrar-acrescento.component.css']
})
export class CadastrarAcrescentoComponent implements OnInit {
  formulario: FormGroup;
  acrescento: AcrescentoViewModel[] = [];
  constructor(private acrescentoService: AcrescentoService
    , private formBuilder: FormBuilder
    , private rota: Router) {
    this.formulario = formBuilder.group({
      nome: formBuilder.control(''),
      valorCusto: formBuilder.control(''),
      valorVenda: formBuilder.control(''),
      gramagem: formBuilder.control('')
    });
  }
  ngOnInit() {
  }
  cadastrarAcrescento(): void {
    const novoAcrescento = new AcrescentoViewModel(
      this.formulario.controls['nome'].value,
      this.formulario.controls['valorCusto'].value,
      this.formulario.controls['valorVenda'].value,
      this.formulario.controls['gramagem'].value,
    );
    this.acrescentoService.cadastrar(novoAcrescento).subscribe(result => {
      this.formulario.controls['nome'].setValue(''),
        this.formulario.controls['valorCusto'].setValue(''),
        this.formulario.controls['valorVenda'].setValue(''),
        this.formulario.controls['gramagem'].setValue('')
    });
    this.rota.navigateByUrl('/telaPrincipalAcrescentos');
  }
}
