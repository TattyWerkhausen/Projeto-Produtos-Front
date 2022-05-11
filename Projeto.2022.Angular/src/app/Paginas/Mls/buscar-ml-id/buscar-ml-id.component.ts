import { MlServiceService } from './../ml-service.service';
import { MlViewModelId } from './../ml-view-model-id';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar-ml-id',
  templateUrl: './buscar-ml-id.component.html',
  styleUrls: ['./buscar-ml-id.component.css']
})
export class BuscarMlIdComponent implements OnInit {
  formulario: FormGroup;
  ml: MlViewModelId[] = [];

  constructor(private mlService: MlServiceService, private formBuilder: FormBuilder) {
    this.formulario = formBuilder.group({
      id: formBuilder.control('')
    });
  }

  ngOnInit() {
  }
  buscarMlId(): void {
    const id = this.formulario.controls['id'].value;
    this.mlService.buscarMlId(id).subscribe((result) => { this.ml.push(result) });
  }
}
