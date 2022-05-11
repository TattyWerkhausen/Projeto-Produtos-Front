import { Router } from '@angular/router';
import { MlServiceService } from './../ml-service.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MlViewModel } from './../ml-view-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-ml',
  templateUrl: './cadastrar-ml.component.html',
  styleUrls: ['./cadastrar-ml.component.css']
})
export class CadastrarMlComponent implements OnInit {
  formulario: FormGroup;
  ml: MlViewModel[] = [];
  constructor(private mlService: MlServiceService
    , private formBuilder: FormBuilder
    , private rota: Router) {
    this.formulario = formBuilder.group({
      ml: formBuilder.control(''),
      valorCusto: formBuilder.control(''),
      valorVenda: formBuilder.control('')
    });
  }
  ngOnInit() {
  }
  cadastrarMl(): void {
    const novoMl = new MlViewModel(
      this.formulario.controls['ml'].value,
      this.formulario.controls['valorCusto'].value,
      this.formulario.controls['valorVenda'].value,
    );
    this.mlService.cadastrar(novoMl).subscribe(result => {
      this.formulario.controls['ml'].setValue(''),
        this.formulario.controls['valorCusto'].setValue(''),
        this.formulario.controls['valorVenda'].setValue('')
    });
    this.rota.navigateByUrl('/telaPrincipalMl');
  }
}
