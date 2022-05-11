import { SaborService } from './../sabor.service';
import { SaborViewModelId } from './../sabor-view-model-id';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar-todos-sabores',
  templateUrl: './buscar-todos-sabores.component.html',
  styleUrls: ['./buscar-todos-sabores.component.css']
})
export class BuscarTodosSaboresComponent implements OnInit {
  sabores: SaborViewModelId[] = [];
  constructor(private saborService: SaborService) { }

  ngOnInit() {
    this.saborService.buscarTodos().subscribe(result => {
      this.sabores = result
    })
  }

}
