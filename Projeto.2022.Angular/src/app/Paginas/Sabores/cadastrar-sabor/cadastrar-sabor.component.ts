import { Router } from '@angular/router';
import { SaborService } from './../sabor.service';
import { SaborViewModel } from './../sabor-view-model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-sabor',
  templateUrl: './cadastrar-sabor.component.html',
  styleUrls: ['./cadastrar-sabor.component.css']
})
export class CadastrarSaborComponent implements OnInit {
  formulario: FormGroup;
  sabor: SaborViewModel[] = [];
  constructor(private saborService: SaborService
    , private formBuilder: FormBuilder
    ,private rota:Router) {
    this.formulario = formBuilder.group({
      nome: formBuilder.control(''),
      valorCusto:formBuilder.control(''),
      valorVenda:formBuilder.control('')
    });
  }
  ngOnInit() {
  }
  cadastrarSabor(): void {
    const novoSabor = new SaborViewModel(
      this.formulario.controls['nome'].value,
      this.formulario.controls['valorCusto'].value,
      this.formulario.controls['valorVenda'].value,
    );
    this.saborService.cadastrar(novoSabor).subscribe(result => {
      this.formulario.controls['nome'].setValue(''),
      this.formulario.controls['valorCusto'].setValue(''),
      this.formulario.controls['valorVenda'].setValue('')
    });
    this.rota.navigateByUrl('/telaPrincipalSabores');
  }
}
