import { Router, Routes } from '@angular/router';
import { BebidaService } from './../bebida.service';
import { BebidaModel } from './../bebida-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-Bebidas',
  templateUrl: './cadastrar-Bebidas.component.html',
  styleUrls: ['./cadastrar-Bebidas.component.css']
})
//Cadastrar dados da bebida, e depois no pedido chamar para selecao ml, sabores, acrescentos,
// e dar valor a cada diferencial
export class CadastrarBebidasComponent implements OnInit {
  formulario: FormGroup;
  bebidas: BebidaModel[] = [];

  constructor(private formBuilder: FormBuilder, private bebidaService: BebidaService, private rota: Router) {
    this.formulario = formBuilder.group({
      nome: formBuilder.control(''),
      teorAlcoolico: formBuilder.control(''),
      valorCusto: formBuilder.control(''),
      valorVenda: formBuilder.control(''),
    });
  }
  ngOnInit() {
  }
  cadastrar(): void {
    const bebida = new BebidaModel(
      //this.formulario.controls['id'].value,
      this.formulario.controls['nome'].value,
      this.formulario.controls['teorAlcoolico'].value,
      this.formulario.controls['valorCusto'].value,
      this.formulario.controls['valorVenda'].value,
    );
    this.bebidaService.cadastrar(bebida).subscribe(bebida => {
      this.formulario.controls['nome'].setValue('');
      this.formulario.controls['teorAlcoolico'].setValue('');
      this.formulario.controls['valorCusto'].setValue('');
      this.formulario.controls['valorVenda'].setValue('');
    })
    this.rota.navigateByUrl('/telaPrincipalBebidas');
  }
}
