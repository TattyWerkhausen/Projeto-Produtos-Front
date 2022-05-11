import { AcrescentoService } from './../acrescento.service';
import { AcrescentoViewModelId } from './../acrescento-view-model-id';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar-acrescento-id',
  templateUrl: './buscar-acrescento-id.component.html',
  styleUrls: ['./buscar-acrescento-id.component.css']
})
export class BuscarAcrescentoIdComponent implements OnInit {
  formulario: FormGroup;
  acrescentos: AcrescentoViewModelId[] = [];

  constructor(private acrescentoService: AcrescentoService, private formBuilder: FormBuilder) {
    this.formulario = formBuilder.group({
      id: formBuilder.control('')
    });
  }

  ngOnInit() {
  }
  buscarAcrescentoId(): void {
    const id = this.formulario.controls['id'].value;
    this.acrescentoService.buscarId(id).subscribe((result) => { this.acrescentos.push(result) });
  }
}
