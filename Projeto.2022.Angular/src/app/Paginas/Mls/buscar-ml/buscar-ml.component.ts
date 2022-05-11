import { ActivatedRoute } from '@angular/router';
import { MlServiceService } from './../ml-service.service';
import { MlViewModelId } from './../ml-view-model-id';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar-ml',
  templateUrl: './buscar-ml.component.html',
  styleUrls: ['./buscar-ml.component.css']
})
export class BuscarMlComponent implements OnInit {
  formulario: FormGroup;
  ml: MlViewModelId[] = [];

  constructor(private mlService: MlServiceService, private formBuilder: FormBuilder) {
    this.formulario = formBuilder.group({
      ml: formBuilder.control('')
    });
  }

  ngOnInit() {
  }
  buscarMl(): void {
    const nome = this.formulario.controls['ml'].value;
    this.mlService.buscarMl(nome).subscribe((result) => { this.ml.push(result) });
  }
}
