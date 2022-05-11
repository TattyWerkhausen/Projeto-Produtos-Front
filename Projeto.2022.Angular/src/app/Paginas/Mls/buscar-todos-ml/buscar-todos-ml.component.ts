import { MlServiceService } from './../ml-service.service';
import { MlViewModelId } from './../ml-view-model-id';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar-todos-ml',
  templateUrl: './buscar-todos-ml.component.html',
  styleUrls: ['./buscar-todos-ml.component.css']
})
export class BuscarTodosMlComponent implements OnInit {
 ml: MlViewModelId[] = [];
  constructor(private mlService: MlServiceService) { }

  ngOnInit() {
    this.mlService.buscarTodos().subscribe(result => {
      this.ml = result
    })
  }

}
