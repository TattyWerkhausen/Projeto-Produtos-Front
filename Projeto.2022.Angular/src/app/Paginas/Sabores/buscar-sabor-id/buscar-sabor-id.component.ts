import { SaborService } from './../sabor.service';
import { SaborViewModelId } from './../sabor-view-model-id';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar-sabor-id',
  templateUrl: './buscar-sabor-id.component.html',
  styleUrls: ['./buscar-sabor-id.component.css']
})
export class BuscarSaborIdComponent implements OnInit {
  formulario: FormGroup;
  sabores: SaborViewModelId[] = [];

  constructor(private saborService: SaborService, private formBuilder: FormBuilder) {
    this.formulario = formBuilder.group({
      id: formBuilder.control('')
    });
  }

  ngOnInit() {
  }
  buscarSaborId(): void {
    const id = this.formulario.controls['id'].value;
    this.saborService.buscarSabor(id).subscribe((result) => { this.sabores.push(result) });
  }
}
