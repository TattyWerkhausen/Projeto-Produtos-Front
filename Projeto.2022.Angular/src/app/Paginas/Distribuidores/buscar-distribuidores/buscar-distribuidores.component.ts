import { DistribuidorService } from './../distribuidor.service';
import { DistribuidorViewModelId } from './../distribuidor-view-model-id';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar-distribuidores',
  templateUrl: './buscar-distribuidores.component.html',
  styleUrls: ['./buscar-distribuidores.component.css']
})
export class BuscarDistribuidoresComponent implements OnInit {
  distribuidores: DistribuidorViewModelId[] = [];

  constructor(private distribuidorService: DistribuidorService) { }

  ngOnInit() {
    this.distribuidorService.buscarTodosDistribuidores().subscribe(result => { this.distribuidores = result })
  }
  buscarTodosDistribuidores(): void {
    this.distribuidorService.buscarTodosDistribuidores().subscribe(result => { this.distribuidores = result })
  }
}
