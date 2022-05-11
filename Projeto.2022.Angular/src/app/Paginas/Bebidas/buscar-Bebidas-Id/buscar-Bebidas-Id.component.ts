import { FormGroup, FormBuilder } from '@angular/forms';
import { BebidaModelId } from './../bebida-model-id';
import { BebidaService } from './../bebida.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar-Bebidas-Id',
  templateUrl: './buscar-Bebidas-Id.component.html',
  styleUrls: ['./buscar-Bebidas-Id.component.css']
})
export class BuscarBebidasIdComponent implements OnInit {
 bebidas: BebidaModelId [] = [];
formulario:FormGroup;

  constructor(private bebidaService:BebidaService, private formBuilder:FormBuilder) {
    this.formulario = formBuilder.group({
      id: formBuilder.control('')
    });
   }

  ngOnInit() {
  }
buscarBebidaId():void{
const idBebida = this.formulario.controls['id'].value;
this.bebidaService.buscarBebidaId(idBebida).subscribe((resultado) => {
  this.bebidas.push(resultado);
});
}
}
