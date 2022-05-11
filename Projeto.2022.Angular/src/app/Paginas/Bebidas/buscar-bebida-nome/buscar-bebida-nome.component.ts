import { BebidaService } from './../bebida.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BebidaModelId } from './../bebida-model-id';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar-bebida-nome',
  templateUrl: './buscar-bebida-nome.component.html',
  styleUrls: ['./buscar-bebida-nome.component.css']
})
export class BuscarBebidaNomeComponent implements OnInit {
  bebidas: BebidaModelId[] = [];
  formulario: FormGroup;

  constructor(private bebidaService: BebidaService, private formBuilder: FormBuilder) {
    this.formulario = formBuilder.group({
      nome: formBuilder.control('')
    });
  }

  ngOnInit() {
  }
  buscarBebidaNome(): void {
    const bebida = this.formulario.controls['nome'].value;
    this.bebidaService.buscarBebidaNome(bebida).subscribe((resultado) => {
      this.bebidas.push(resultado);
    });
  }
}
