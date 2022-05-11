import { AcrescentoService } from './../acrescento.service';
import { AcrescentoViewModelId } from './../acrescento-view-model-id';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar-todos-acrescentos',
  templateUrl: './buscar-todos-acrescentos.component.html',
  styleUrls: ['./buscar-todos-acrescentos.component.css']
})
export class BuscarTodosAcrescentosComponent implements OnInit {
  acrescentos: AcrescentoViewModelId[] = [];
  constructor(private acrescentoService: AcrescentoService) { }

  ngOnInit() {
    this.acrescentoService.buscarTodos().subscribe(result => {
      this.acrescentos = result
    })
  }

}
