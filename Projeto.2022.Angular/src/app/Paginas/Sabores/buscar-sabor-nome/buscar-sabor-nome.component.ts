import { SaborService } from './../sabor.service';
import { SaborViewModelId } from './../sabor-view-model-id';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar-sabor-nome',
  templateUrl: './buscar-sabor-nome.component.html',
  styleUrls: ['./buscar-sabor-nome.component.css']
})
export class BuscarSaborNomeComponent implements OnInit {
  formulario: FormGroup;
  sabores: SaborViewModelId[] = [];

  constructor(private saborService: SaborService, private formBuilder: FormBuilder) {
    this.formulario = formBuilder.group({
      nome: formBuilder.control('')
    });
  }

  ngOnInit() {
  }
  buscarSaborNome(): void {
    const nome = this.formulario.controls['nome'].value;
    this.saborService.buscarSaborNome(nome).subscribe((result) => { this.sabores.push(result) });
  }
}

